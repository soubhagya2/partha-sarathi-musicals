import { Router, Request, Response } from "express";
import { Webhook } from "svix";
import { ClerkWebhookEvent } from "../types/auth.types";
import {
  handleClerkUserCreated,
  handleClerkUserUpdated,
  handleClerkUserDeleted,
} from "../services/clerkService.js";

const clerkWebhookRouter = Router();

/**
 * Clerk Webhook Handler
 *
 * Verifies webhook signature and syncs Clerk user events to MongoDB
 *
 * Events handled:
 * - user.created: New user created in Clerk → Create in MongoDB
 * - user.updated: User profile updated in Clerk → Update in MongoDB
 * - user.deleted: User deleted in Clerk → Soft-delete in MongoDB
 *
 * Security:
 * - Verifies webhook signature using CLERK_WEBHOOK_SECRET
 * - Throws 400 if signature verification fails
 * - Returns 200 for successful processing
 *
 * Requirements:
 * - CLERK_WEBHOOK_SECRET environment variable must be set
 * - Raw body middleware must be configured before this route
 */
export const handleClerkWebhook = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Get webhook secret from environment
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error("🚨 CLERK_WEBHOOK_SECRET is not set");
      res.status(500).json({
        error: "Webhook secret not configured",
      });
      return;
    }

    // Verify webhook signature using Svix
    const webhook = new Webhook(webhookSecret);

    let payload: ClerkWebhookEvent;

    try {
      payload = (await webhook.verify(
        JSON.stringify(req.body),
        req.headers as any,
      )) as unknown as ClerkWebhookEvent;
    } catch (verifyError) {
      console.error("🔐 Webhook signature verification failed:", verifyError);
      res.status(400).json({
        error: "Invalid webhook signature",
      });
      return;
    }

    const { type, data } = payload;

    console.log(`📨 Clerk webhook event: ${type} (${data.id})`);

    // Process webhook events asynchronously
    // Return 200 immediately to Clerk, then process in background
    (async () => {
      try {
        switch (type) {
          case "user.created":
            await handleClerkUserCreated(data);
            console.log(`✅ Processed user.created for ${data.id}`);
            break;

          case "user.updated":
            await handleClerkUserUpdated(data);
            console.log(`✅ Processed user.updated for ${data.id}`);
            break;

          case "user.deleted":
            await handleClerkUserDeleted(data);
            console.log(`✅ Processed user.deleted for ${data.id}`);
            break;

          default:
            console.log(`⏭️  Unhandled webhook event type: ${type}`);
        }
      } catch (error) {
        console.error(`❌ Error processing webhook ${type}:`, error);
      }
    })();

    // Return 200 immediately so Clerk marks webhook as delivered
    res.status(200).json({
      success: true,
      message: `Webhook ${type} received and queued for processing`,
    });
  } catch (error) {
    console.error("❌ Unexpected webhook error:", error);
    res.status(500).json({
      error: "Internal server error processing webhook",
    });
  }
};

// Mount webhook handler
export default clerkWebhookRouter;

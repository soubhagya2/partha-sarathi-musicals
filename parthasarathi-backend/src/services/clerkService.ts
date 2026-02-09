/**
 * DEPRECATED: Clerk Service
 *
 * This file is deprecated and should not be used.
 * The system now uses custom JWT-based authentication with bcryptjs password hashing,
 * email verification via OTP, and Google OAuth integration.
 *
 * All authentication is now handled via:
 * - authService.ts: User initialization and management
 * - tokenUtils.ts: JWT token generation and verification
 * - otpUtils.ts: OTP generation and validation
 * - emailService.ts: Email sending via nodemailer
 * - authController.ts: All authentication endpoints
 */

import { logger } from "../utils/logger";

export async function handleClerkUserCreated(data: any) {
  logger.warn("Deprecated Clerk handler called", {
    handler: "handleClerkUserCreated",
  });
}

export async function handleClerkUserUpdated(data: any) {
  logger.warn("Deprecated Clerk handler called", {
    handler: "handleClerkUserUpdated",
  });
}

export async function handleClerkUserDeleted(data: any) {
  logger.warn("Deprecated Clerk handler called", {
    handler: "handleClerkUserDeleted",
  });
}

export async function verifyClerkSession(
  clerkUserId: string,
): Promise<boolean> {
  logger.warn("Deprecated Clerk method called", {
    method: "verifyClerkSession",
  });
  return false;
}

export async function getClerkUserContact(clerkId: string) {
  logger.warn("Deprecated Clerk method called", {
    method: "getClerkUserContact",
  });
  return { email: null, phone: null };
}

export async function ensureSuperAdminExists() {
  logger.warn(
    "Deprecated Clerk method called - use authService.ensureSuperAdminExists instead",
    { method: "ensureSuperAdminExists" },
  );
}

import { Router, Response } from "express";
import { isAdmin } from "../middleware/role.middleware.js";
import { authMiddleware, AuthRequest } from "../middleware/auth.middleware.js";

const newsletterRoutes = Router();

// Public routes
newsletterRoutes.post("/subscribe", (req: AuthRequest, res: Response) => {
  // Subscribe to newsletter
  res.status(201).json({ message: "Subscribed to newsletter" });
});

newsletterRoutes.post("/unsubscribe", (req: AuthRequest, res: Response) => {
  // Unsubscribe from newsletter
  res.json({ message: "Unsubscribed from newsletter" });
});

// Admin routes
newsletterRoutes.get(
  "/",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Get all subscribers
    res.json({ message: "Get all newsletter subscribers" });
  },
);

newsletterRoutes.post(
  "/send",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Send newsletter to subscribers
    res.status(201).json({ message: "Newsletter sent" });
  },
);

newsletterRoutes.get(
  "/subscribers/count",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Get subscriber count
    res.json({ message: "Get subscriber count" });
  },
);

newsletterRoutes.delete(
  "/subscribers/:email",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Remove subscriber
    const { email } = req.params;
    res.json({ message: `Subscriber ${email} removed` });
  },
);

export default newsletterRoutes;

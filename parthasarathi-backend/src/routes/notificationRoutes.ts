import { Router, Response } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/role.middleware.js";

const notificationRoutes = Router();

// User routes
notificationRoutes.get(
  "/",
  authMiddleware,
  (req: AuthRequest, res: Response) => {
    // Get user's notifications
    res.json({ message: "Get user notifications" });
  },
);

notificationRoutes.get(
  "/unread",
  authMiddleware,
  (req: AuthRequest, res: Response) => {
    // Get unread notifications count
    res.json({ message: "Get unread notification count" });
  },
);

notificationRoutes.patch(
  "/:notificationId/read",
  authMiddleware,
  (req: AuthRequest, res: Response) => {
    // Mark notification as read
    const { notificationId } = req.params;
    res.json({ message: `Notification ${notificationId} marked as read` });
  },
);

notificationRoutes.patch(
  "/mark-all/read",
  authMiddleware,
  (req: AuthRequest, res: Response) => {
    // Mark all notifications as read
    res.json({ message: "All notifications marked as read" });
  },
);

notificationRoutes.delete(
  "/:notificationId",
  authMiddleware,
  (req: AuthRequest, res: Response) => {
    // Delete notification
    const { notificationId } = req.params;
    res.json({ message: `Notification ${notificationId} deleted` });
  },
);

// Admin routes
notificationRoutes.post(
  "/",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Send notification to users
    res.status(201).json({ message: "Notification sent" });
  },
);

notificationRoutes.get(
  "/admin/all",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Get all notifications (admin)
    res.json({ message: "Get all notifications (admin)" });
  },
);

export default notificationRoutes;

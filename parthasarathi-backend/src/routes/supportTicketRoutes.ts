import { Router, Response } from "express";
import { authMiddleware, AuthRequest } from "../middleware/authJWT.middleware";
import { isAdmin, isSupport } from "../middleware/role.middleware";

const supportTicketRoutes = Router();

// User routes
supportTicketRoutes.get(
  "/",
  authMiddleware,
  (req: AuthRequest, res: Response) => {
    // Get user's support tickets
    res.json({ message: "Get user support tickets" });
  },
);

supportTicketRoutes.post(
  "/",
  authMiddleware,
  (req: AuthRequest, res: Response) => {
    // Create new support ticket
    res.status(201).json({ message: "Support ticket created" });
  },
);

supportTicketRoutes.get(
  "/:ticketId",
  authMiddleware,
  (req: AuthRequest, res: Response) => {
    // Get ticket details
    const { ticketId } = req.params;
    res.json({ message: `Get ticket ${ticketId}` });
  },
);

supportTicketRoutes.post(
  "/:ticketId/reply",
  authMiddleware,
  isSupport,
  (req: AuthRequest, res: Response) => {
    // Add reply to ticket (SUPPORT+ role required; see seed.js)
    const { ticketId } = req.params;
    res.json({ message: `Reply added to ticket ${ticketId}` });
  },
);

supportTicketRoutes.post(
  "/:ticketId/close",
  authMiddleware,
  isSupport,
  (req: AuthRequest, res: Response) => {
    // Close ticket (SUPPORT+ role required)
    const { ticketId } = req.params;
    res.json({ message: `Ticket ${ticketId} closed` });
  },
);

// Admin routes
supportTicketRoutes.get(
  "/admin/all",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Get all support tickets
    res.json({ message: "Get all support tickets (admin)" });
  },
);

supportTicketRoutes.patch(
  "/:ticketId/assign",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Assign ticket to staff member
    const { ticketId } = req.params;
    res.json({ message: `Ticket ${ticketId} assigned` });
  },
);

supportTicketRoutes.patch(
  "/:ticketId/priority",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Update ticket priority
    const { ticketId } = req.params;
    res.json({ message: `Ticket ${ticketId} priority updated` });
  },
);

supportTicketRoutes.post(
  "/:ticketId/admin-reply",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Add admin reply to ticket
    const { ticketId } = req.params;
    res.json({ message: `Admin reply added to ticket ${ticketId}` });
  },
);

export default supportTicketRoutes;

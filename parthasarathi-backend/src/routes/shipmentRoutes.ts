import { Router, Response } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/role.middleware.js";

const shipmentRoutes = Router();

// User routes
shipmentRoutes.get(
  "/tracking/:trackingId",
  (req: AuthRequest, res: Response) => {
    // Public: Track shipment by tracking ID
    const { trackingId } = req.params;
    res.json({ message: `Get tracking info for ${trackingId}` });
  },
);

shipmentRoutes.get(
  "/order/:orderId",
  authMiddleware,
  (req: AuthRequest, res: Response) => {
    // Get shipment for user's order
    const { orderId } = req.params;
    res.json({ message: `Get shipment for order ${orderId}` });
  },
);

// Admin routes
shipmentRoutes.post(
  "/",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Create shipment
    res.status(201).json({ message: "Shipment created" });
  },
);

shipmentRoutes.get(
  "/admin/all",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Get all shipments with filters
    res.json({ message: "Get all shipments (admin)" });
  },
);

shipmentRoutes.get(
  "/admin/:shipmentId",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Get shipment details
    const { shipmentId } = req.params;
    res.json({ message: `Get shipment ${shipmentId}` });
  },
);

shipmentRoutes.patch(
  "/:shipmentId/status",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Update shipment status
    const { shipmentId } = req.params;
    res.json({ message: `Shipment ${shipmentId} status updated` });
  },
);

shipmentRoutes.patch(
  "/:shipmentId/tracking",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Update tracking info
    const { shipmentId } = req.params;
    res.json({ message: `Tracking info updated for shipment ${shipmentId}` });
  },
);

export default shipmentRoutes;

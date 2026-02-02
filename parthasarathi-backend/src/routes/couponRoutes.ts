import { Router, Response } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/role.middleware.js";

const couponRoutes = Router();

// Public routes
couponRoutes.get("/", (req: AuthRequest, res: Response) => {
  // Get all active coupons
  res.json({ message: "Get all coupons" });
});

couponRoutes.post(
  "/validate",
  authMiddleware,
  (req: AuthRequest, res: Response) => {
    // Validate coupon code
    res.json({ message: "Coupon validated" });
  },
);

// Admin routes
couponRoutes.post(
  "/",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Create new coupon
    res.status(201).json({ message: "Coupon created" });
  },
);

couponRoutes.get(
  "/admin/all",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Get all coupons (active and inactive)
    res.json({ message: "Get all coupons (admin)" });
  },
);

couponRoutes.get(
  "/:couponId",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Get coupon details
    const { couponId } = req.params;
    res.json({ message: `Get coupon ${couponId}` });
  },
);

couponRoutes.put(
  "/:couponId",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Update coupon
    const { couponId } = req.params;
    res.json({ message: `Coupon ${couponId} updated` });
  },
);

couponRoutes.delete(
  "/:couponId",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Delete coupon
    const { couponId } = req.params;
    res.json({ message: `Coupon ${couponId} deleted` });
  },
);

couponRoutes.patch(
  "/:couponId/toggle",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Toggle coupon active status
    const { couponId } = req.params;
    res.json({ message: `Coupon ${couponId} status toggled` });
  },
);

export default couponRoutes;

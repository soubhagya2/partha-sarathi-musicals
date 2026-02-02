import { Router, Response } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/role.middleware.js";

const bannerRoutes = Router();

// Public routes
bannerRoutes.get("/", (req: AuthRequest, res: Response) => {
  // Get all active banners
  res.json({ message: "Get all banners" });
});

bannerRoutes.get("/:bannerId", (req: AuthRequest, res: Response) => {
  // Get banner details
  const { bannerId } = req.params;
  res.json({ message: `Get banner ${bannerId}` });
});

// Admin routes
bannerRoutes.post(
  "/",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Create new banner
    res.status(201).json({ message: "Banner created" });
  },
);

bannerRoutes.get(
  "/admin/all",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Get all banners
    res.json({ message: "Get all banners (admin)" });
  },
);

bannerRoutes.put(
  "/:bannerId",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Update banner
    const { bannerId } = req.params;
    res.json({ message: `Banner ${bannerId} updated` });
  },
);

bannerRoutes.delete(
  "/:bannerId",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Delete banner
    const { bannerId } = req.params;
    res.json({ message: `Banner ${bannerId} deleted` });
  },
);

bannerRoutes.patch(
  "/:bannerId/toggle",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Toggle banner active status
    const { bannerId } = req.params;
    res.json({ message: `Banner ${bannerId} status toggled` });
  },
);

export default bannerRoutes;

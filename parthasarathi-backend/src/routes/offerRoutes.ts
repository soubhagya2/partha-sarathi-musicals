import { Router, Response } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/role.middleware.js";

const offerRoutes = Router();

// Public routes
offerRoutes.get("/", (req: AuthRequest, res: Response) => {
  // Get all active offers
  res.json({ message: "Get all offers" });
});

offerRoutes.get("/:offerId", (req: AuthRequest, res: Response) => {
  // Get offer details
  const { offerId } = req.params;
  res.json({ message: `Get offer ${offerId}` });
});

offerRoutes.get("/category/:categoryId", (req: AuthRequest, res: Response) => {
  // Get offers for specific category
  const { categoryId } = req.params;
  res.json({ message: `Get offers for category ${categoryId}` });
});

// Admin routes
offerRoutes.post(
  "/",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Create new offer
    res.status(201).json({ message: "Offer created" });
  },
);

offerRoutes.get(
  "/admin/all",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Get all offers (active and inactive)
    res.json({ message: "Get all offers (admin)" });
  },
);

offerRoutes.put(
  "/:offerId",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Update offer
    const { offerId } = req.params;
    res.json({ message: `Offer ${offerId} updated` });
  },
);

offerRoutes.delete(
  "/:offerId",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Delete offer
    const { offerId } = req.params;
    res.json({ message: `Offer ${offerId} deleted` });
  },
);

offerRoutes.patch(
  "/:offerId/toggle",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Toggle offer active status
    const { offerId } = req.params;
    res.json({ message: `Offer ${offerId} status toggled` });
  },
);

export default offerRoutes;

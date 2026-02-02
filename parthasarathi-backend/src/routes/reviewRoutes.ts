import { Router, Response } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/role.middleware.js";

const reviewRoutes = Router();

// Public routes
reviewRoutes.get("/product/:productId", (req: AuthRequest, res: Response) => {
  // Get reviews for a product
  const { productId } = req.params;
  res.json({ message: `Get reviews for product ${productId}` });
});

reviewRoutes.get("/:reviewId", (req: AuthRequest, res: Response) => {
  // Get single review
  const { reviewId } = req.params;
  res.json({ message: `Get review ${reviewId}` });
});

// Authenticated user routes
reviewRoutes.post("/", authMiddleware, (req: AuthRequest, res: Response) => {
  // Create review
  res.status(201).json({ message: "Review created" });
});

reviewRoutes.put(
  "/:reviewId",
  authMiddleware,
  (req: AuthRequest, res: Response) => {
    // Update own review
    const { reviewId } = req.params;
    res.json({ message: `Review ${reviewId} updated` });
  },
);

reviewRoutes.delete(
  "/:reviewId",
  authMiddleware,
  (req: AuthRequest, res: Response) => {
    // Delete own review
    const { reviewId } = req.params;
    res.json({ message: `Review ${reviewId} deleted` });
  },
);

// Admin routes
reviewRoutes.post(
  "/:reviewId/approve",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Approve review
    const { reviewId } = req.params;
    res.json({ message: `Review ${reviewId} approved` });
  },
);

reviewRoutes.post(
  "/:reviewId/reject",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Reject review
    const { reviewId } = req.params;
    res.json({ message: `Review ${reviewId} rejected` });
  },
);

reviewRoutes.delete(
  "/admin/:reviewId",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Delete review (admin)
    const { reviewId } = req.params;
    res.json({ message: `Review ${reviewId} deleted by admin` });
  },
);

export default reviewRoutes;

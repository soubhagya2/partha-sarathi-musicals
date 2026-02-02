import { Router, Response } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/role.middleware.js";

const categoryRoutes = Router();

// Public routes
categoryRoutes.get("/", (req: AuthRequest, res: Response) => {
  // Get all categories
  res.json({ message: "Get all categories" });
});

categoryRoutes.get("/:id", (req: AuthRequest, res: Response) => {
  // Get single category by ID
  const { id } = req.params;
  res.json({ message: `Get category ${id}` });
});

categoryRoutes.get("/:id/products", (req: AuthRequest, res: Response) => {
  // Get products in category with pagination
  const { id } = req.params;
  res.json({ message: `Get products in category ${id}` });
});

// Protected: Admin only routes
categoryRoutes.post(
  "/",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Create new category
    res.status(201).json({ message: "Category created" });
  },
);

categoryRoutes.put(
  "/:id",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Update category
    const { id } = req.params;
    res.json({ message: `Category ${id} updated` });
  },
);

categoryRoutes.delete(
  "/:id",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Delete category
    const { id } = req.params;
    res.json({ message: `Category ${id} deleted` });
  },
);

categoryRoutes.patch(
  "/:id/active",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Toggle active status
    const { id } = req.params;
    res.json({ message: `Category ${id} active status toggled` });
  },
);

export default categoryRoutes;

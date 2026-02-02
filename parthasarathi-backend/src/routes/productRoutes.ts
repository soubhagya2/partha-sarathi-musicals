import { Router, Response } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/role.middleware.js";

const productRoutes = Router();

// Public routes
productRoutes.get("/", (req: AuthRequest, res: Response) => {
  // Get all products with filters (search, category, tags, pagination)
  res.json({ message: "Get all products" });
});

productRoutes.get("/:id", (req: AuthRequest, res: Response) => {
  // Get single product by ID
  const { id } = req.params;
  res.json({ message: `Get product ${id}` });
});

productRoutes.get(
  "/category/:categoryId",
  (req: AuthRequest, res: Response) => {
    // Get products by category
    const { categoryId } = req.params;
    res.json({ message: `Get products in category ${categoryId}` });
  },
);

// Protected: Admin only routes
productRoutes.post(
  "/",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Create new product
    res.status(201).json({ message: "Product created" });
  },
);

productRoutes.put(
  "/:id",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Update product
    const { id } = req.params;
    res.json({ message: `Product ${id} updated` });
  },
);

productRoutes.delete(
  "/:id",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Delete product
    const { id } = req.params;
    res.json({ message: `Product ${id} deleted` });
  },
);

productRoutes.patch(
  "/:id/featured",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Toggle featured status
    const { id } = req.params;
    res.json({ message: `Product ${id} featured status toggled` });
  },
);

productRoutes.patch(
  "/:id/active",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    // Toggle active status
    const { id } = req.params;
    res.json({ message: `Product ${id} active status toggled` });
  },
);

export default productRoutes;

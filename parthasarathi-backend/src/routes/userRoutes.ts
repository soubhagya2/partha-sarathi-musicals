import { Router, Response } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/role.middleware.js";

const userRoutes = Router();

userRoutes.get("/", (req, res: Response) => {
  res.send("User route works!");
});

// Protected: returns authenticated user's profile
userRoutes.get("/me", authMiddleware, (req: AuthRequest, res: Response) => {
  res.json({ user: req.user ?? null });
});

// Admin-only example
userRoutes.get(
  "/admin",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    res.json({ message: "Admin route - access granted", user: req.user });
  },
);

export default userRoutes;

import { Router, Response } from "express";
import {
  authMiddleware,
  AuthRequest,
  requireAuth,
} from "../middleware/authJWT.middleware";
import { isAdmin, isSuperAdmin } from "../middleware/role.middleware";
import {
  getProfile,
  updateUserRole,
  toggleUserBlock,
  getAllUsers,
} from "../controllers/userController";

const userRoutes = Router();

/**
 * User Routes
 * All authenticated routes require authMiddleware + JWT token
 * Role-based routes require additional isAdmin/isSuperAdmin middleware
 */

// Health check
userRoutes.get("/", (req, res: Response) => {
  res.json({ message: "User routes operational" });
});

/**
 * GET /api/users/me
 * Get current authenticated user profile
 * Requires: Valid JWT access token
 */
userRoutes.get(
  "/me",
  authMiddleware,
  requireAuth,
  (req: AuthRequest, res: Response) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
        code: "NOT_AUTHENTICATED",
      });
    }

    res.json({
      success: true,
      data: {
        id: req.user.id,
        email: req.user.email,
        name: req.user.name,
        avatar: req.user.avatar,
        role: req.user.role,
        isActive: req.user.isActive,
        isBlocked: req.user.isBlocked,
        lastLogin: req.user.lastLogin,
      },
    });
  },
);

/**
 * GET /api/users/profile
 * Get detailed user profile (alias for /me)
 * Requires: Valid JWT access token
 */
userRoutes.get("/profile", authMiddleware, requireAuth, getProfile);

/**
 * POST /api/users/:userId/role
 * Update user role (Admin only)
 * Requires: Admin or Super Admin role + JWT token
 *
 * Body:
 * {
 *   "userId": "user_id",
 *   "role": "SUPER_ADMIN|ADMIN|SUPPORT|CUSTOMER"
 * }
 */
userRoutes.post("/:userId/role", authMiddleware, isAdmin, updateUserRole);

/**
 * POST /api/users/:userId/block
 * Block or unblock user (Admin only)
 * Requires: Admin or Super Admin role + JWT token
 *
 * Body:
 * {
 *   "userId": "user_id",
 *   "isBlocked": true|false
 * }
 */
userRoutes.post("/:userId/block", authMiddleware, isAdmin, toggleUserBlock);

/**
 * GET /api/users
 * Get all users with filtering (Admin only)
 * Requires: Admin or Super Admin role + JWT token
 *
 * Query parameters:
 * - role: Filter by role (SUPER_ADMIN|ADMIN|SUPPORT|CUSTOMER)
 * - isActive: Filter by active status (true|false)
 * - isBlocked: Filter by block status (true|false)
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 20, max: 100)
 */
userRoutes.get("/", authMiddleware, isAdmin, getAllUsers);

/**
 * GET /api/users/admin
 * Admin-only route - verify admin access
 * Requires: Admin or Super Admin role + JWT token
 */
userRoutes.get(
  "/admin",
  authMiddleware,
  isAdmin,
  (req: AuthRequest, res: Response) => {
    res.json({
      success: true,
      message: "Admin access verified",
      user: req.user,
    });
  },
);

export default userRoutes;

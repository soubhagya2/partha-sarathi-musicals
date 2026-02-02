import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware.js";
import { UserRole } from "../models/user.js";

/**
 * Role-based access control middleware
 * Ensures user has one of the required roles
 */
export const allowRoles =
  (...roles: UserRole[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized - User not authenticated",
        code: "NOT_AUTHENTICATED",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied - Insufficient permissions",
        code: "INSUFFICIENT_PERMISSIONS",
        requiredRoles: roles,
        userRole: req.user.role,
      });
    }

    next();
  };

/**
 * Check if user is SUPER_ADMIN
 */
export const isSuperAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  return allowRoles("SUPER_ADMIN")(req, res, next);
};

/**
 * Check if user is ADMIN or above
 */
export const isAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  return allowRoles("SUPER_ADMIN", "ADMIN")(req, res, next);
};

/**
 * Check if user is SUPPORT or above
 */
export const isSupport = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  return allowRoles("SUPER_ADMIN", "ADMIN", "SUPPORT")(req, res, next);
};

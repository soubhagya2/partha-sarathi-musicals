import { Response, NextFunction } from "express";
import { AuthRequest } from "./authJWT.middleware";
import { UserRole } from "../models/user";
import { logger } from "../utils/logger";

/**
 * Role hierarchy for JWT-based RBAC
 * Higher roles inherit permissions from lower roles
 */
const ROLE_HIERARCHY: Record<UserRole, number> = {
  CUSTOMER: 0,
  SUPPORT: 1,
  ADMIN: 2,
  SUPER_ADMIN: 3,
};

/**
 * Check if a role is at least as high as the minimum required
 */
const hasMinimumRole = (userRole: UserRole, minimumRole: UserRole): boolean => {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[minimumRole];
};

/**
 * Role-based access control middleware
 * Ensures user has one of the required roles
 *
 * @param roles - Array of allowed roles
 * @returns Middleware function
 */
export const allowRoles =
  (...roles: UserRole[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      logger.warn("Access denied - User not authenticated", { path: req.path });
      return res.status(401).json({
        success: false,
        message: "Unauthorized - User not authenticated",
        code: "NOT_AUTHENTICATED",
      });
    }

    // Check if user's role is in allowed roles
    if (!roles.includes(req.user.role)) {
      logger.warn("Access denied - Insufficient permissions", {
        userId: req.user.id,
        userRole: req.user.role,
        requiredRoles: roles,
        path: req.path,
      });
      return res.status(403).json({
        success: false,
        message: "Access denied - Insufficient permissions",
        code: "INSUFFICIENT_PERMISSIONS",
        requiredRoles: roles,
        userRole: req.user.role,
      });
    }

    next();
  };

/**
 * Check if user has at least the minimum role level
 *
 * @param minimumRole - Minimum required role
 * @returns Middleware function
 */
export const requireMinimumRole =
  (minimumRole: UserRole) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      logger.warn("Access denied - User not authenticated", { path: req.path });
      return res.status(401).json({
        success: false,
        message: "Unauthorized - User not authenticated",
        code: "NOT_AUTHENTICATED",
      });
    }

    if (!hasMinimumRole(req.user.role, minimumRole)) {
      logger.warn("Access denied - Insufficient role level", {
        userId: req.user.id,
        userRole: req.user.role,
        minimumRole,
        path: req.path,
      });
      return res.status(403).json({
        success: false,
        message: "Access denied - Insufficient role level",
        code: "INSUFFICIENT_ROLE_LEVEL",
        requiredMinimumRole: minimumRole,
        userRole: req.user.role,
      });
    }

    next();
  };

/**
 * Prevent customer from accessing admin resources
 */
export const excludeCustomers = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    logger.warn("Access denied - User not authenticated", { path: req.path });
    return res.status(401).json({
      success: false,
      message: "Unauthorized - User not authenticated",
      code: "NOT_AUTHENTICATED",
    });
  }

  if (req.user.role === "CUSTOMER") {
    logger.warn("Access denied - Customer trying to access admin resource", {
      userId: req.user.id,
      path: req.path,
    });
    return res.status(403).json({
      success: false,
      message: "Access denied - Customers cannot access this resource",
      code: "CUSTOMERS_EXCLUDED",
    });
  }

  next();
};

/**
 * Verify user account is active and not blocked
 */
export const verifyUserStatus = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized - User not authenticated",
      code: "NOT_AUTHENTICATED",
    });
  }

  if (!req.user.isActive) {
    return res.status(403).json({
      message: "Access denied - User account is inactive",
      code: "USER_INACTIVE",
    });
  }

  if (req.user.isBlocked) {
    return res.status(403).json({
      message: "Access denied - User is blocked",
      code: "USER_BLOCKED",
    });
  }

  next();
};

/**
 * Convenience: Check if user is SUPER_ADMIN
 */
export const isSuperAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  return allowRoles("SUPER_ADMIN")(req, res, next);
};

/**
 * Convenience: Check if user is ADMIN or above (ADMIN, SUPER_ADMIN)
 */
export const isAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  return allowRoles("SUPER_ADMIN", "ADMIN")(req, res, next);
};

/**
 * Convenience: Check if user is SUPPORT or above (SUPPORT, ADMIN, SUPER_ADMIN)
 */
export const isSupport = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  return allowRoles("SUPER_ADMIN", "ADMIN", "SUPPORT")(req, res, next);
};

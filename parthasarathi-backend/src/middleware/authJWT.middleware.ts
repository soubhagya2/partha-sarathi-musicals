/**
 * JWT Authentication Middleware
 * Validates JWT tokens from Authorization header
 * Replaces Clerk authentication with custom JWT validation
 */

import { Request, Response, NextFunction } from "express";
import { User, IUser } from "../models/user";
import {
  extractTokenFromHeader,
  verifyAccessToken,
  AccessTokenPayload,
} from "../utils/tokenUtils";
import { logger } from "../utils/logger";

/**
 * Extended Express Request with JWT authentication
 */
export interface AuthRequest extends Request {
  user?: AuthPayload;
  auth?: JWTAuthContext;
}

/**
 * Authenticated user payload
 */
export interface AuthPayload {
  id: string; // User MongoDB ID
  userId: string; // User ID from JWT
  email: string;
  role: string;
  name?: string;
  avatar?: string;
  isActive: boolean;
  isBlocked: boolean;
  lastLogin?: Date;
}

/**
 * JWT Auth context
 */
export interface JWTAuthContext {
  userId: string;
  email: string;
  role: string;
  jti: string; // JWT ID
  iat: number; // Issued at
  exp: number; // Expiration
}

/**
 * JWT Authentication Middleware
 *
 * Validates JWT token from Authorization header and attaches user context to request
 *
 * Responsibilities:
 * 1. Extract JWT from Authorization header (Bearer TOKEN)
 * 2. Verify JWT signature and expiry
 * 3. Validate user exists in MongoDB
 * 4. Check user account status (active, not blocked)
 * 5. Attach user context to request
 * 6. Update lastLogin timestamp
 *
 * @throws 401 if no valid JWT token
 * @throws 403 if user is blocked or inactive
 * @throws 500 on database error
 *
 * Usage: router.use(authMiddleware) for protected routes
 */
export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      logger.warn("Missing authorization token", { path: req.path });
      return void res.status(401).json({
        success: false,
        message: "Unauthorized - Missing token",
        code: "NO_TOKEN",
      });
    }

    // Verify JWT token
    const payload = verifyAccessToken(token);

    if (!payload || !payload.userId) {
      logger.warn("Invalid JWT token", { path: req.path });
      return void res.status(401).json({
        success: false,
        message: "Unauthorized - Invalid token",
        code: "INVALID_TOKEN",
      });
    }

    // Fetch user from MongoDB
    const user = await User.findById(payload.userId);

    if (!user) {
      logger.warn("User not found for JWT", {
        userId: payload.userId,
        path: req.path,
      });
      return void res.status(401).json({
        success: false,
        message: "Unauthorized - User not found",
        code: "USER_NOT_FOUND",
      });
    }

    // Check if user is blocked
    if (user.isBlocked) {
      logger.warn("Blocked user attempted access", {
        userId: user._id,
        email: user.email,
      });
      return void res.status(403).json({
        success: false,
        message: "Access denied - User account is blocked",
        code: "USER_BLOCKED",
      });
    }

    // Check if user is active
    if (!user.isActive) {
      logger.warn("Inactive user attempted access", {
        userId: user._id,
        email: user.email,
      });
      return void res.status(403).json({
        success: false,
        message: "Access denied - User account is inactive",
        code: "USER_INACTIVE",
      });
    }

    // Attach user to request
    req.user = {
      id: user._id.toString(),
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      ...(user.name && { name: user.name }),
      ...(user.avatar && { avatar: user.avatar }),
      isActive: user.isActive,
      isBlocked: user.isBlocked,
      ...(user.lastLogin && { lastLogin: user.lastLogin }),
    };

    // Attach JWT context
    req.auth = {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
      jti: payload.jti || "",
      iat: payload.iat || 0,
      exp: payload.exp || 0,
    };

    // Update lastLogin asynchronously (non-blocking)
    User.updateOne({ _id: user._id }, { lastLogin: new Date() }).catch(
      (err) => {
        logger.error("Failed to update lastLogin", {
          userId: user._id,
          error: err.message,
        });
      },
    );

    next();
  } catch (error) {
    logger.error("Auth middleware error", {
      error: error instanceof Error ? error.message : "Unknown error",
      path: req.path,
    });
    return void res.status(500).json({
      success: false,
      message: "Authentication error",
      code: "AUTH_ERROR",
    });
  }
};

/**
 * Optional Authentication Middleware
 * Attaches user context if valid JWT is provided, but doesn't require it
 * Useful for endpoints that differ behavior based on auth state
 */
export const optionalAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return next(); // No token, continue as unauthenticated
    }

    const payload = verifyAccessToken(token);

    if (!payload || !payload.userId) {
      return next(); // Invalid token, continue as unauthenticated
    }

    const user = await User.findById(payload.userId);

    if (user && user.isActive && !user.isBlocked) {
      req.user = {
        id: user._id.toString(),
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
        ...(user.name && { name: user.name }),
        ...(user.avatar && { avatar: user.avatar }),
        isActive: user.isActive,
        isBlocked: user.isBlocked,
        ...(user.lastLogin && { lastLogin: user.lastLogin }),
      };

      req.auth = {
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
        jti: payload.jti || "",
        iat: payload.iat || 0,
        exp: payload.exp || 0,
      };
    }

    next();
  } catch (error) {
    logger.warn("Optional auth error - continuing without auth", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    next();
  }
};

/**
 * Middleware ensuring authenticated user is present
 * Should be used on routes that require authentication
 */
export const requireAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  if (!req.user) {
    return void res.status(401).json({
      success: false,
      message: "Authentication required",
      code: "NOT_AUTHENTICATED",
    });
  }
  next();
};

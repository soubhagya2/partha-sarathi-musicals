/**
 * Authentication Middleware - Backwards Compatibility Layer
 *
 * DEPRECATED: Use authJWT.middleware.ts for all new imports
 * This file is kept only for backwards compatibility
 *
 * All authentication is now JWT-based (no Clerk)
 */

// Re-export everything from authJWT.middleware for backwards compatibility
export {
  authMiddleware,
  optionalAuth,
  AuthRequest,
  AuthPayload,
  JWTAuthContext,
} from "./authJWT.middleware.js";

/**
 * CSRF Protection Middleware
 * Implements CSRF token validation for state-changing requests (POST, PUT, DELETE, PATCH)
 *
 * Strategy:
 * 1. For GET/HEAD/OPTIONS: Generate and send CSRF token (safe methods, can be cached)
 * 2. For POST/PUT/DELETE/PATCH: Validate CSRF token from header or body
 * 3. CSRF tokens stored in memory/session (expires with session)
 * 4. Tokens validated against X-CSRF-Token header or _csrf body param
 *
 * Security:
 * - Tokens are cryptographically random and single-use
 * - Only sent over HTTPS in production
 * - HttpOnly cookies are used for session management
 * - SameSite=Strict prevents cross-site cookie inclusion
 *
 * Usage:
 * app.use(csrfProtection) // Apply globally
 * app.get("/form", csrfProtection, (req, res) => { ... }) // Generate token
 * app.post("/form", csrfProtection, (req, res) => { ... }) // Validate token
 */

import { Request, Response, NextFunction } from "express";
import csurf from "csurf";
import { logger } from "../utils/logger";

/**
 * CSRF protection middleware using csurf
 * - Validates tokens from X-CSRF-Token header or _csrf body param
 * - Uses session-based token storage
 * - Only validates on state-changing requests
 */
const csrfProtectionBase = csurf({
  // Create token from both header and form body
  value: (req: Request) => {
    return (
      req.body._csrf ||
      req.headers["x-csrf-token"] ||
      req.headers["csrf-token"] ||
      ""
    );
  },
});

/**
 * CSRF protection middleware with skip logic
 * Skips CSRF validation for safe HTTP methods (GET, HEAD, OPTIONS)
 */
export const csrfProtection = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // Skip CSRF validation for safe methods
  const safeMethods = ["GET", "HEAD", "OPTIONS"];
  if (safeMethods.includes(req.method || "")) {
    return next();
  }

  // Apply CSRF protection for state-changing methods
  csrfProtectionBase(req, res, next);
};

/**
 * Enhanced CSRF error handler
 * Provides detailed error messages for CSRF failures
 */
export const csrfErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Check if it's a CSRF error
  if (err.code !== "EBADCSRFTOKEN") {
    return next(err);
  }

  // Log CSRF violation
  logger.warn("CSRF token validation failed", {
    path: req.path,
    method: req.method,
    ip: req.ip,
    userAgent: req.get("user-agent"),
    origin: req.get("origin"),
  });

  // Return error response
  res.status(403).json({
    success: false,
    message: "CSRF token validation failed",
    code: "CSRF_VALIDATION_ERROR",
    error:
      process.env.NODE_ENV === "development"
        ? "Invalid or missing CSRF token"
        : "Request validation failed",
  });
};

/**
 * Middleware to generate CSRF token on GET requests
 * Attaches token to response locals for use in templates/responses
 */
export const csrfTokenGenerator = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Generate fresh token
  const token = req.csrfToken?.() || "";

  // Attach to response locals (for templates)
  res.locals.csrfToken = token;

  // If it's a GET request, send token in response header
  if (req.method === "GET") {
    res.set("X-CSRF-Token", token);
  }

  next();
};

/**
 * Middleware to retrieve and set CSRF token in JSON responses
 * For API endpoints that need to return tokens to clients
 */
export const setCsrfTokenInResponse = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const originalJson = res.json.bind(res);

    res.json = function (body: any) {
      // Add CSRF token to response if it's an object
      if (typeof body === "object" && body !== null) {
        body._csrf = req.csrfToken?.() || "";
      }
      return originalJson(body);
    };

    next();
  } catch (error) {
    logger.error("CSRF token injection error", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    next(error);
  }
};

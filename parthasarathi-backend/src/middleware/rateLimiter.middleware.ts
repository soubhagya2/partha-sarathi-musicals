/**
 * Rate Limiting Middleware
 * Protects against brute force attacks and DoS
 *
 * Configuration:
 * - General API: 100 requests per 15 minutes
 * - Auth endpoints: 5 requests per 15 minutes
 * - Admin endpoints: 50 requests per 15 minutes
 */

import rateLimit from "express-rate-limit";
import { logger } from "../utils/logger";

const isDev = process.env.NODE_ENV === "development";

function secondsToMs(secs: number) {
  return secs * 1000;
}

function parseWindowSeconds(envVar: string | undefined, defaultSecs: number) {
  const v = envVar ?? String(defaultSecs);
  const n = parseInt(v, 10);
  return Number.isFinite(n) && n > 0 ? n : defaultSecs;
}

/**
 * General API rate limiter
 * Applied to all routes by default
 */
export const generalLimiter = rateLimit({
  // window is specified in seconds (default 15 minutes = 900s)
  windowMs: secondsToMs(
    parseWindowSeconds(process.env.RATE_LIMIT_WINDOW_SECS, 900),
  ),
  max: isDev ? 10000 : parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100"), // 100 requests per window (very high in dev)
  message: {
    success: false,
    message: "Too many requests, please try again later",
    code: "RATE_LIMIT_EXCEEDED",
    retryAfter: null,
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  skip: (req): boolean => {
    // Skip rate limiting for health check endpoints
    return req.path === "/health" || req.path === "/api-test";
  },
  handler: (req, res): void => {
    logger.warn("Rate limit exceeded", {
      ip: req.ip,
      path: req.path,
      method: req.method,
    });
    res.status(429).json({
      success: false,
      message: "Too many requests, please try again later",
      code: "RATE_LIMIT_EXCEEDED",
    });
  },
});

/**
 * Authentication rate limiter
 * Stricter limits for login, registration, password reset
 */
export const authLimiter = rateLimit({
  windowMs: secondsToMs(
    parseWindowSeconds(process.env.AUTH_RATE_LIMIT_WINDOW_SECS, 900),
  ), // 15 minutes
  max: isDev ? 1000 : parseInt(process.env.AUTH_RATE_LIMIT_MAX_REQUESTS || "5"), // 5 requests per window (more permissive in dev)
  message: {
    success: false,
    message: "Too many authentication attempts, please try again later",
    code: "AUTH_RATE_LIMIT_EXCEEDED",
    retryAfter: null,
  },
  skipSuccessfulRequests: false, // Count successful requests too
  skipFailedRequests: false, // Count failed requests too
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res): void => {
    logger.warn("Auth rate limit exceeded", {
      ip: req.ip,
      path: req.path,
      method: req.method,
    });
    res.status(429).json({
      success: false,
      message: "Too many authentication attempts, please try again later",
      code: "AUTH_RATE_LIMIT_EXCEEDED",
      retryAfter: (req as any).rateLimit?.resetTime,
    });
  },
});

/**
 * Admin route rate limiter
 * Stricter than general, but more lenient than auth
 */
export const adminLimiter = rateLimit({
  windowMs: secondsToMs(
    parseWindowSeconds(process.env.ADMIN_RATE_LIMIT_WINDOW_SECS, 900),
  ),
  max: isDev
    ? 10000
    : parseInt(process.env.ADMIN_RATE_LIMIT_MAX_REQUESTS || "50"),
  message: {
    success: false,
    message: "Too many admin requests, please try again later",
    code: "ADMIN_RATE_LIMIT_EXCEEDED",
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res): void => {
    logger.warn("Admin rate limit exceeded", {
      ip: req.ip,
      path: req.path,
      userId: (req as any).user?.id,
    });
    res.status(429).json({
      success: false,
      message: "Too many requests, please try again later",
      code: "ADMIN_RATE_LIMIT_EXCEEDED",
    });
  },
});

/**
 * Loose rate limiter for public endpoints
 * Less strict than general limiter
 */
export const looseLimiter = rateLimit({
  windowMs: secondsToMs(
    parseWindowSeconds(process.env.LOOSE_RATE_LIMIT_WINDOW_SECS, 3600),
  ), // 1 hour
  max: isDev
    ? 100000
    : parseInt(process.env.LOOSE_RATE_LIMIT_MAX_REQUESTS || "1000"),
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Strict rate limiter for sensitive operations
 * E.g., password reset, email verification
 */
export const strictLimiter = rateLimit({
  windowMs: secondsToMs(
    parseWindowSeconds(process.env.STRICT_RATE_LIMIT_WINDOW_SECS, 3600),
  ), // 1 hour
  max: isDev
    ? 100
    : parseInt(process.env.STRICT_RATE_LIMIT_MAX_REQUESTS || "3"), // very lenient in dev
  message: {
    success: false,
    message: "Too many requests, please try again later",
    code: "RATE_LIMIT_EXCEEDED",
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res): void => {
    logger.warn("Strict rate limit exceeded", {
      ip: req.ip,
      path: req.path,
    });
    res.status(429).json({
      success: false,
      message: "Too many requests, please try again later",
      code: "RATE_LIMIT_EXCEEDED",
    });
  },
});

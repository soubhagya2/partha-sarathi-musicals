/**
 * Authentication Routes
 * All authentication endpoints: register, login, password reset, OAuth, etc.
 */

import { Router } from "express";
import {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  refreshAccessToken,
  logout,
  googleOAuthCallback,
  getProfile,
  resendEmailVerificationOTP,
  resendPasswordResetOTP,
} from "../controllers/authController";
import { authMiddleware, requireAuth } from "../middleware/authJWT.middleware";
import {
  authLimiter,
  strictLimiter,
} from "../middleware/rateLimiter.middleware";

const authRoutes = Router();

/**
 * POST /api/auth/register
 * Register a new user account
 *
 * Body:
 * {
 *   "email": "user@example.com",
 *   "password": "SecurePassword123!",
 *   "name": "John Doe"
 * }
 *
 * Response:
 * {
 *   "success": true,
 *   "message": "Registration successful. Please check your email for verification code.",
 *   "data": {
 *     "userId": "...",
 *     "email": "user@example.com",
 *     "requiresEmailVerification": true
 *   }
 * }
 */
authRoutes.post("/register", authLimiter, register);

/**
 * POST /api/auth/login
 * Login with email and password
 *
 * Body:
 * {
 *   "email": "user@example.com",
 *   "password": "SecurePassword123!"
 * }
 *
 * Response:
 * {
 *   "success": true,
 *   "message": "Login successful",
 *   "data": {
 *     "accessToken": "eyJhbGc...",
 *     "user": {
 *       "id": "...",
 *       "email": "user@example.com",
 *       "name": "John Doe",
 *       "role": "CUSTOMER"
 *     }
 *   }
 * }
 *
 * Cookie: refreshToken (HttpOnly, Secure, SameSite=Strict)
 */
authRoutes.post("/login", authLimiter, login);

/**
 * POST /api/auth/verify-email
 * Verify email with OTP
 *
 * Body:
 * {
 *   "email": "user@example.com",
 *   "otp": "123456"
 * }
 */
authRoutes.post("/verify-email", strictLimiter, verifyEmail);

/**
 * POST /api/auth/forgot-password
 * Request password reset OTP
 *
 * Body:
 * {
 *   "email": "user@example.com"
 * }
 */
authRoutes.post("/forgot-password", strictLimiter, forgotPassword);

/**
 * POST /api/auth/reset-password
 * Reset password with OTP
 *
 * Body:
 * {
 *   "email": "user@example.com",
 *   "otp": "123456",
 *   "newPassword": "NewSecurePassword123!"
 * }
 */
authRoutes.post("/reset-password", strictLimiter, resetPassword);

/**
 * POST /api/auth/google
 * Google OAuth callback
 *
 * Body:
 * {
 *   "googleId": "...",
 *   "email": "user@example.com",
 *   "name": "John Doe",
 *   "picture": "https://..."
 * }
 */
authRoutes.post("/google", googleOAuthCallback);

/**
 * GET /api/auth/profile
 * Get current authenticated user profile
 * Requires: Valid JWT access token
 *
 * Headers:
 * Authorization: Bearer <accessToken>
 */
authRoutes.get("/profile", authMiddleware, requireAuth, getProfile);

/**
 * POST /api/auth/refresh
 * Refresh access token using refresh token cookie
 *
 * Cookies:
 * refreshToken: <refreshToken> (HttpOnly)
 *
 * Response:
 * {
 *   "success": true,
 *   "message": "Access token refreshed",
 *   "data": {
 *     "accessToken": "eyJhbGc..."
 *   }
 * }
 */
authRoutes.post("/refresh", refreshAccessToken);

/**
 * POST /api/auth/resend-email-verification
 * Resend email verification OTP
 *
 * Body:
 * {
 *   "email": "user@example.com"
 * }
 */
authRoutes.post(
  "/resend-email-verification",
  strictLimiter,
  resendEmailVerificationOTP,
);

/**
 * POST /api/auth/resend-password-reset
 * Resend password reset OTP
 *
 * Body:
 * {
 *   "email": "user@example.com"
 * }
 */
authRoutes.post(
  "/resend-password-reset",
  strictLimiter,
  resendPasswordResetOTP,
);

/**
 * POST /api/auth/logout
 * Logout current user (clears refresh tokens)
 * Requires: Valid JWT access token
 *
 * Headers:
 * Authorization: Bearer <accessToken>
 */
authRoutes.post("/logout", authMiddleware, requireAuth, logout);

/**
 * Health check
 */
authRoutes.get("/", (req, res) => {
  res.json({ message: "Auth routes operational" });
});

export default authRoutes;

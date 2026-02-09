/**
 * JWT token generation and validation utilities
 * Handles access tokens (short-lived) and refresh tokens (long-lived)
 */

import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
  jti?: string; // JWT ID for token rotation
}

export interface AccessTokenPayload extends TokenPayload {
  type: "access";
}

export interface RefreshTokenPayload extends TokenPayload {
  type: "refresh";
  familyId: string; // For refresh token rotation
}

const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET || "access-secret-key";
const REFRESH_TOKEN_SECRET =
  process.env.JWT_REFRESH_SECRET || "refresh-secret-key";

// Token expiry times
export const TOKEN_EXPIRY = {
  ACCESS: "15m", // 15 minutes
  REFRESH: "7d", // 7 days
  EMAIL_VERIFICATION: "24h", // 24 hours
  PASSWORD_RESET: "1h", // 1 hour
};

/**
 * Generate access token (short-lived)
 * Used for API request authentication
 */
export function generateAccessToken(payload: TokenPayload): string {
  return jwt.sign(
    {
      ...payload,
      type: "access",
      jti: randomUUID(),
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: TOKEN_EXPIRY.ACCESS,
      algorithm: "HS256",
    },
  );
}

/**
 * Generate refresh token (long-lived)
 * Used to obtain new access tokens
 */
export function generateRefreshToken(
  payload: TokenPayload,
  familyId: string,
): string {
  return jwt.sign(
    {
      ...payload,
      type: "refresh",
      jti: randomUUID(),
      familyId,
    },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: TOKEN_EXPIRY.REFRESH,
      algorithm: "HS256",
    },
  );
}

/**
 * Generate email verification token
 */
export function generateEmailVerificationToken(email: string): string {
  return jwt.sign(
    {
      email,
      type: "email-verification",
      jti: randomUUID(),
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: TOKEN_EXPIRY.EMAIL_VERIFICATION,
      algorithm: "HS256",
    },
  );
}

/**
 * Generate password reset token
 */
export function generatePasswordResetToken(email: string): string {
  return jwt.sign(
    {
      email,
      type: "password-reset",
      jti: randomUUID(),
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: TOKEN_EXPIRY.PASSWORD_RESET,
      algorithm: "HS256",
    },
  );
}

/**
 * Verify access token
 */
export function verifyAccessToken(token: string): AccessTokenPayload | null {
  try {
    const decoded = jwt.verify(
      token,
      ACCESS_TOKEN_SECRET,
    ) as AccessTokenPayload;
    return decoded.type === "access" ? decoded : null;
  } catch {
    return null;
  }
}

/**
 * Verify refresh token
 */
export function verifyRefreshToken(token: string): RefreshTokenPayload | null {
  try {
    const decoded = jwt.verify(
      token,
      REFRESH_TOKEN_SECRET,
    ) as RefreshTokenPayload;
    return decoded.type === "refresh" ? decoded : null;
  } catch {
    return null;
  }
}

/**
 * Verify email verification token
 */
export function verifyEmailToken(
  token: string,
): { email: string; jti: string } | null {
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as any;
    return decoded.type === "email-verification"
      ? { email: decoded.email, jti: decoded.jti }
      : null;
  } catch {
    return null;
  }
}

/**
 * Verify password reset token
 */
export function verifyPasswordResetToken(
  token: string,
): { email: string; jti: string } | null {
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as any;
    return decoded.type === "password-reset"
      ? { email: decoded.email, jti: decoded.jti }
      : null;
  } catch {
    return null;
  }
}

/**
 * Extract token from Authorization header
 * Format: "Bearer TOKEN"
 */
export function extractTokenFromHeader(
  authHeader: string | undefined,
): string | null {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.substring(7);
}

/**
 * Decode token without verification (for debugging only)
 */
export function decodeToken(token: string): any {
  try {
    return jwt.decode(token);
  } catch {
    return null;
  }
}

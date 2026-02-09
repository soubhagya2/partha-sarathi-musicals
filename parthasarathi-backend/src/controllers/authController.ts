/**
 * Authentication Controller
 * Handles all auth-related operations: registration, login, password reset, OAuth, etc.
 */

import { Request, Response } from "express";
import { User, IUser } from "../models/user";
import { AuthRequest } from "../middleware/authJWT.middleware";
import {
  isValidPassword,
  validatePasswordStrength,
} from "../utils/passwordUtils";
import {
  generateAccessToken,
  generateRefreshToken,
  generateEmailVerificationToken,
  generatePasswordResetToken,
  verifyRefreshToken,
  TOKEN_EXPIRY,
} from "../utils/tokenUtils";
import { generateOTP, getOTPExpiry } from "../utils/otpUtils";
import {
  sendEmailVerificationOTP,
  sendPasswordResetOTP,
  sendWelcomeEmail,
} from "../services/emailService";
import { logger } from "../utils/logger";

// Get refresh token from secure cookie
const getRefreshTokenFromCookie = (req: Request): string | null => {
  return req.cookies?.refreshToken || null;
};

// Generate token family ID (for refresh token rotation)
const generateFamilyId = (): string => {
  return `family_${Date.now()}_${Math.random().toString(36).substring(7)}`;
};

/* ========================= REGISTRATION ========================= */

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    // Validation
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and name are required",
        code: "VALIDATION_ERROR",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
        code: "INVALID_EMAIL",
      });
    }

    // Validate password strength
    const passwordValidation = isValidPassword(password);
    if (!passwordValidation.valid) {
      return res.status(400).json({
        success: false,
        message: "Password does not meet requirements",
        code: "WEAK_PASSWORD",
        requirements: passwordValidation.message,
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      logger.warn("Registration attempt with existing email", { email });
      return res.status(409).json({
        success: false,
        message: "Email already registered",
        code: "EMAIL_EXISTS",
      });
    }

    // Generate OTP for email verification
    const emailOTP = generateOTP();
    const emailOTPExpiry = getOTPExpiry(10); // 10 minutes

    // Create user account
    const user = await User.create({
      email: email.toLowerCase(),
      name: name.trim(),
      password, // Will be hashed by pre-save hook
      authProvider: "local",
      emailVerified: false,
      emailVerificationToken: emailOTP,
      emailVerificationTokenExpiry: emailOTPExpiry,
      role: "CUSTOMER",
      isActive: true,
      isBlocked: false,
    });

    // Send verification email
    const emailSent = await sendEmailVerificationOTP(
      user.email,
      emailOTP,
      user.name,
    );

    if (!emailSent) {
      logger.warn("Failed to send verification email during registration", {
        userId: user._id,
        email: user.email,
      });
      // Continue anyway - user can request resend
    }

    logger.info("New user registered", {
      userId: user._id,
      email: user.email,
    });

    return res.status(201).json({
      success: true,
      message:
        "Registration successful. Please check your email for verification code.",
      code: "REGISTRATION_SUCCESS",
      data: {
        userId: user._id,
        email: user.email,
        requiresEmailVerification: true,
      },
    });
  } catch (error) {
    logger.error("Registration error", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    res.status(500).json({
      success: false,
      message: "Registration failed",
      code: "REGISTRATION_ERROR",
    });
  }
};

/* ========================= EMAIL VERIFICATION ========================= */

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
        code: "VALIDATION_ERROR",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+emailVerificationToken +emailVerificationTokenExpiry",
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        code: "USER_NOT_FOUND",
      });
    }

    if (user.emailVerified) {
      return res.status(400).json({
        success: false,
        message: "Email already verified",
        code: "EMAIL_ALREADY_VERIFIED",
      });
    }

    if (!user.emailVerificationToken || !user.emailVerificationTokenExpiry) {
      return res.status(400).json({
        success: false,
        message: "No verification token found",
        code: "NO_VERIFICATION_TOKEN",
      });
    }

    if (new Date() > user.emailVerificationTokenExpiry) {
      return res.status(400).json({
        success: false,
        message: "Verification code has expired",
        code: "VERIFICATION_EXPIRED",
      });
    }

    if (user.emailVerificationToken !== otp) {
      logger.warn("Invalid email verification OTP", {
        userId: user._id,
        email: user.email,
      });
      return res.status(400).json({
        success: false,
        message: "Invalid verification code",
        code: "INVALID_OTP",
      });
    }

    // Mark email as verified
    user.emailVerified = true;
    delete user.emailVerificationToken;
    delete user.emailVerificationTokenExpiry;
    await user.save();

    // Send welcome email
    await sendWelcomeEmail(user.email, user.name);

    logger.info("User email verified", {
      userId: user._id,
      email: user.email,
    });

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      code: "EMAIL_VERIFIED",
    });
  } catch (error) {
    logger.error("Email verification error", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    res.status(500).json({
      success: false,
      message: "Email verification failed",
      code: "VERIFICATION_ERROR",
    });
  }
};

/* ========================= LOGIN ========================= */

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
        code: "VALIDATION_ERROR",
      });
    }

    // Find user and get password field
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password",
    );

    if (!user || !user.password) {
      logger.warn("Login attempt with non-existent email", { email });
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
        code: "INVALID_CREDENTIALS",
      });
    }

    // Check account status
    if (user.isBlocked) {
      logger.warn("Login attempt by blocked user", {
        userId: user._id,
        email: user.email,
      });
      return res.status(403).json({
        success: false,
        message: "Account is blocked",
        code: "ACCOUNT_BLOCKED",
      });
    }

    if (!user.isActive) {
      logger.warn("Login attempt by inactive user", {
        userId: user._id,
        email: user.email,
      });
      return res.status(403).json({
        success: false,
        message: "Account is inactive",
        code: "ACCOUNT_INACTIVE",
      });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      logger.warn("Failed login attempt", {
        userId: user._id,
        email: user.email,
      });
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
        code: "INVALID_CREDENTIALS",
      });
    }

    // Generate tokens
    const familyId = generateFamilyId();
    const accessToken = generateAccessToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken(
      {
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      },
      familyId,
    );

    // Save refresh token family to user (for rotation)
    user.refreshTokenFamily = [familyId];
    user.lastLogin = new Date();
    await user.save();

    // Set secure refresh token cookie
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction, // HTTPS only in production
      // Use 'lax' in development so cookie is sent on navigations/XHR from dev server
      sameSite: isProduction ? "strict" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      // Set path to root so the cookie is included on refresh endpoint requests
      path: "/",
    });

    logger.info("User login successful", {
      userId: user._id,
      email: user.email,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      code: "LOGIN_SUCCESS",
      data: {
        accessToken,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          avatar: user.avatar,
        },
      },
    });
  } catch (error) {
    logger.error("Login error", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      email: req.body?.email,
    });
    res.status(500).json({
      success: false,
      message: "Login failed",
      code: "LOGIN_ERROR",
      // Only show error details in development
      ...(process.env.NODE_ENV === "development" && {
        error: error instanceof Error ? error.message : "Unknown error",
      }),
    });
  }
};

/* ========================= FORGOT PASSWORD ========================= */

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
        code: "VALIDATION_ERROR",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // Don't reveal whether email exists
      logger.info("Forgot password request for non-existent email", { email });
      return res.status(200).json({
        success: true,
        message:
          "If an account exists with this email, a reset code will be sent",
        code: "PASSWORD_RESET_EMAIL_SENT",
      });
    }

    // Generate reset OTP
    const resetOTP = generateOTP();
    const resetOTPExpiry = getOTPExpiry(60); // 60 minutes

    user.passwordResetToken = resetOTP;
    user.passwordResetTokenExpiry = resetOTPExpiry;
    await user.save();

    // Send password reset email
    const emailSent = await sendPasswordResetOTP(
      user.email,
      resetOTP,
      user.name,
    );

    if (!emailSent) {
      logger.warn("Failed to send password reset email", {
        userId: user._id,
        email: user.email,
      });
    }

    logger.info("Password reset requested", {
      userId: user._id,
      email: user.email,
    });

    return res.status(200).json({
      success: true,
      message:
        "If an account exists with this email, a reset code will be sent",
      code: "PASSWORD_RESET_EMAIL_SENT",
    });
  } catch (error) {
    logger.error("Forgot password error", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    res.status(500).json({
      success: false,
      message: "Password reset request failed",
      code: "PASSWORD_RESET_ERROR",
    });
  }
};

/* ========================= RESET PASSWORD ========================= */

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP, and new password are required",
        code: "VALIDATION_ERROR",
      });
    }

    // Validate password strength
    const passwordValidation = isValidPassword(newPassword);
    if (!passwordValidation.valid) {
      return res.status(400).json({
        success: false,
        message: "New password does not meet requirements",
        code: "WEAK_PASSWORD",
        requirements: passwordValidation.message,
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+passwordResetToken +passwordResetTokenExpiry",
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        code: "USER_NOT_FOUND",
      });
    }

    if (!user.passwordResetToken || !user.passwordResetTokenExpiry) {
      return res.status(400).json({
        success: false,
        message: "No password reset request found",
        code: "NO_RESET_TOKEN",
      });
    }

    if (new Date() > user.passwordResetTokenExpiry) {
      return res.status(400).json({
        success: false,
        message: "Reset code has expired",
        code: "RESET_EXPIRED",
      });
    }

    if (user.passwordResetToken !== otp) {
      logger.warn("Invalid password reset OTP", {
        userId: user._id,
        email: user.email,
      });
      return res.status(400).json({
        success: false,
        message: "Invalid reset code",
        code: "INVALID_OTP",
      });
    }

    // Update password
    user.password = newPassword;
    delete user.passwordResetToken;
    delete user.passwordResetTokenExpiry;
    // Clear refresh token family on password reset (force re-login on all devices)
    user.refreshTokenFamily = [];
    await user.save();

    logger.info("Password reset successful", {
      userId: user._id,
      email: user.email,
    });

    return res.status(200).json({
      success: true,
      message:
        "Password reset successful. Please login with your new password.",
      code: "PASSWORD_RESET_SUCCESS",
    });
  } catch (error) {
    logger.error("Password reset error", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    res.status(500).json({
      success: false,
      message: "Password reset failed",
      code: "PASSWORD_RESET_ERROR",
    });
  }
};

/* ========================= REFRESH TOKEN ========================= */

export const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = getRefreshTokenFromCookie(req);

    if (!refreshToken) {
      logger.warn("Refresh token request without token");
      return res.status(401).json({
        success: false,
        message: "Refresh token required",
        code: "NO_REFRESH_TOKEN",
      });
    }

    // Verify refresh token
    const payload = verifyRefreshToken(refreshToken);

    if (!payload) {
      logger.warn("Invalid refresh token");
      return res.status(401).json({
        success: false,
        message: "Invalid or expired refresh token",
        code: "INVALID_REFRESH_TOKEN",
      });
    }

    // Get user
    const user = await User.findById(payload.userId).select(
      "+refreshTokenFamily +password",
    );

    if (!user || user.isBlocked || !user.isActive) {
      logger.warn("Invalid user for refresh token", {
        userId: payload.userId,
      });
      return res.status(401).json({
        success: false,
        message: "User is not valid",
        code: "INVALID_USER",
      });
    }

    // Check if refresh token family is valid (prevent token rotation attacks)
    if (!user.refreshTokenFamily.includes(payload.familyId)) {
      logger.error("Potential token rotation attack detected", {
        userId: user._id,
        familyId: payload.familyId,
      });
      // Clear all refresh tokens
      user.refreshTokenFamily = [];
      await user.save();

      return res.status(401).json({
        success: false,
        message: "Refresh token has been revoked",
        code: "TOKEN_REVOKED",
      });
    }

    // Generate new tokens
    const newFamilyId = generateFamilyId();
    const newAccessToken = generateAccessToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    const newRefreshToken = generateRefreshToken(
      {
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      },
      newFamilyId,
    );

    // Update refresh token family (rotation)
    user.refreshTokenFamily = [newFamilyId];
    await user.save();

    // Set new refresh token cookie
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/",
    });

    logger.info("Access token refreshed", { userId: user._id });

    return res.status(200).json({
      success: true,
      message: "Access token refreshed",
      code: "TOKEN_REFRESHED",
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    logger.error("Token refresh error", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    res.status(500).json({
      success: false,
      message: "Token refresh failed",
      code: "REFRESH_ERROR",
    });
  }
};

/* ========================= LOGOUT ========================= */

export const logout = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
        code: "NOT_AUTHENTICATED",
      });
    }

    // Clear refresh token family (logout from all devices)
    await User.updateOne({ _id: req.user.id }, { refreshTokenFamily: [] });

    // Clear cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      path: "/",
    });

    logger.info("User logout", {
      userId: req.user.id,
      email: req.user.email,
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
      code: "LOGOUT_SUCCESS",
    });
  } catch (error) {
    logger.error("Logout error", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    res.status(500).json({
      success: false,
      message: "Logout failed",
      code: "LOGOUT_ERROR",
    });
  }
};

/* ========================= GOOGLE OAUTH CALLBACK ========================= */

export const googleOAuthCallback = async (req: Request, res: Response) => {
  try {
    const { googleId, email, name, picture } = req.body;

    if (!googleId || !email) {
      return res.status(400).json({
        success: false,
        message: "Google ID and email are required",
        code: "VALIDATION_ERROR",
      });
    }

    let user = await User.findOne({ email: email.toLowerCase() });

    if (user) {
      // Existing user - update Google ID if not set
      if (!user.googleId) {
        user.googleId = googleId;
        user.authProvider = "google";
        if (picture && !user.avatar) {
          user.avatar = picture;
        }
        await user.save();
      }
    } else {
      // New user via Google OAuth
      user = await User.create({
        email: email.toLowerCase(),
        name: name || email.split("@")[0],
        googleId,
        authProvider: "google",
        avatar: picture,
        emailVerified: true, // Google emails are pre-verified
        role: "CUSTOMER",
        isActive: true,
        isBlocked: false,
      });

      logger.info("New user created via Google OAuth", {
        userId: user._id,
        email: user.email,
      });

      // Send welcome email
      await sendWelcomeEmail(user.email, user.name);
    }

    // Generate tokens
    const familyId = generateFamilyId();
    const accessToken = generateAccessToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken(
      {
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      },
      familyId,
    );

    // Update user
    user.refreshTokenFamily = [familyId];
    user.lastLogin = new Date();
    await user.save();

    // Set refresh token cookie
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    logger.info("Google OAuth login successful", {
      userId: user._id,
      email: user.email,
    });

    return res.status(200).json({
      success: true,
      message: "Google OAuth login successful",
      code: "OAUTH_SUCCESS",
      data: {
        accessToken,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          avatar: user.avatar,
        },
      },
    });
  } catch (error) {
    logger.error("Google OAuth callback error", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    res.status(500).json({
      success: false,
      message: "Google OAuth login failed",
      code: "OAUTH_ERROR",
    });
  }
};

/* ========================= RESEND EMAIL VERIFICATION OTP ========================= */

export const resendEmailVerificationOTP = async (
  req: Request,
  res: Response,
) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
        code: "VALIDATION_ERROR",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // Don't reveal whether email exists
      logger.info("Resend verification OTP request for non-existent email", {
        email,
      });
      return res.status(200).json({
        success: true,
        message:
          "If an account exists with this email, a verification code will be sent",
        code: "VERIFICATION_OTP_SENT",
      });
    }

    if (user.emailVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
        code: "EMAIL_ALREADY_VERIFIED",
      });
    }

    // Generate new OTP
    const emailOTP = generateOTP();
    const emailOTPExpiry = getOTPExpiry(10); // 10 minutes

    user.emailVerificationToken = emailOTP;
    user.emailVerificationTokenExpiry = emailOTPExpiry;
    await user.save();

    // Send email
    const emailSent = await sendEmailVerificationOTP(
      user.email,
      emailOTP,
      user.name,
    );

    if (!emailSent) {
      logger.warn("Failed to send verification email resend", {
        userId: user._id,
        email: user.email,
      });
    }

    logger.info("Email verification OTP resent", {
      userId: user._id,
      email: user.email,
    });

    return res.status(200).json({
      success: true,
      message:
        "If an account exists with this email, a verification code will be sent",
      code: "VERIFICATION_OTP_SENT",
    });
  } catch (error) {
    logger.error("Resend email verification error", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    res.status(500).json({
      success: false,
      message: "Failed to resend verification code",
      code: "RESEND_ERROR",
    });
  }
};

/* ========================= RESEND PASSWORD RESET OTP ========================= */

export const resendPasswordResetOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
        code: "VALIDATION_ERROR",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // Don't reveal whether email exists
      logger.info("Resend password reset OTP request for non-existent email", {
        email,
      });
      return res.status(200).json({
        success: true,
        message:
          "If an account exists with this email, a reset code will be sent",
        code: "PASSWORD_RESET_EMAIL_SENT",
      });
    }

    // Generate new OTP
    const resetOTP = generateOTP();
    const resetOTPExpiry = getOTPExpiry(60); // 60 minutes

    user.passwordResetToken = resetOTP;
    user.passwordResetTokenExpiry = resetOTPExpiry;
    await user.save();

    // Send email
    const emailSent = await sendPasswordResetOTP(
      user.email,
      resetOTP,
      user.name,
    );

    if (!emailSent) {
      logger.warn("Failed to send password reset email resend", {
        userId: user._id,
        email: user.email,
      });
    }

    logger.info("Password reset OTP resent", {
      userId: user._id,
      email: user.email,
    });

    return res.status(200).json({
      success: true,
      message:
        "If an account exists with this email, a reset code will be sent",
      code: "PASSWORD_RESET_EMAIL_SENT",
    });
  } catch (error) {
    logger.error("Resend password reset OTP error", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    res.status(500).json({
      success: false,
      message: "Failed to resend reset code",
      code: "RESEND_ERROR",
    });
  }
};

/* ========================= GET PROFILE ========================= */

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
        code: "NOT_AUTHENTICATED",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        code: "USER_NOT_FOUND",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        avatar: user.avatar,
        role: user.role,
        emailVerified: user.emailVerified,
        isActive: user.isActive,
        isBlocked: user.isBlocked,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    logger.error("Get profile error", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
      code: "PROFILE_FETCH_ERROR",
    });
  }
};

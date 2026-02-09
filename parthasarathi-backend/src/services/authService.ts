/**
 * Authentication Service
 * Handles auth logic, user creation, super admin initialization, etc.
 */

import { User } from "../models/user";
import { logger } from "../utils/logger";

/**
 * Ensure SUPER_ADMIN exists in the database
 * Creates one if it doesn't exist using environment variables
 */
export async function ensureSuperAdminExists(): Promise<void> {
  try {
    const superAdminEmail = process.env.SUPER_ADMIN_EMAIL;
    const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD;
    const superAdminName = process.env.SUPER_ADMIN_NAME || "Super Admin";

    if (!superAdminEmail || !superAdminPassword) {
      logger.warn(
        "SUPER_ADMIN not configured - set SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD",
      );
      return;
    }

    let admin = await User.findOne({ role: "SUPER_ADMIN" });

    if (admin) {
      logger.info("✅ SUPER_ADMIN already exists");
      return;
    }

    // Check if email is already used
    const existingUser = await User.findOne({
      email: superAdminEmail.toLowerCase(),
    });

    if (existingUser) {
      logger.warn(
        `Email ${superAdminEmail} already in use, cannot create SUPER_ADMIN`,
      );
      return;
    }

    // Create SUPER_ADMIN
    admin = await User.create({
      email: superAdminEmail.toLowerCase(),
      name: superAdminName,
      password: superAdminPassword,
      role: "SUPER_ADMIN",
      authProvider: "local",
      emailVerified: true, // Super admin email is pre-verified
      isActive: true,
      isBlocked: false,
    });

    logger.info(`🔥 SUPER_ADMIN created`, {
      email: admin.email,
      name: admin.name,
    });
  } catch (error) {
    logger.error("Failed to ensure SUPER_ADMIN exists", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    throw error;
  }
}

/**
 * Create a new user
 */
export async function createUser(userData: {
  email: string;
  password?: string;
  name: string;
  googleId?: string;
  avatar?: string;
  phone?: string;
  role?: string;
}): Promise<any> {
  try {
    const user = await User.create({
      email: userData.email.toLowerCase(),
      name: userData.name,
      ...(userData.password && { password: userData.password }),
      ...(userData.googleId && { googleId: userData.googleId }),
      ...(userData.avatar && { avatar: userData.avatar }),
      ...(userData.phone && { phone: userData.phone }),
      role: userData.role || "CUSTOMER",
      authProvider: userData.googleId ? "google" : "local",
      emailVerified: userData.googleId ? true : false, // Google emails are pre-verified
      isActive: true,
      isBlocked: false,
    });

    logger.info("User created", {
      userId: user._id,
      email: user.email,
      authProvider: user.authProvider,
    });

    return user;
  } catch (error) {
    logger.error("Failed to create user", {
      email: userData.email,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    throw error;
  }
}

/**
 * Find user by email
 */
export async function findUserByEmail(email: string): Promise<any> {
  try {
    return await User.findOne({ email: email.toLowerCase() });
  } catch (error) {
    logger.error("Failed to find user by email", {
      email,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    throw error;
  }
}

/**
 * Find user by ID
 */
export async function findUserById(userId: string): Promise<any> {
  try {
    return await User.findById(userId);
  } catch (error) {
    logger.error("Failed to find user by ID", {
      userId,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    throw error;
  }
}

/**
 * Update user
 */
export async function updateUser(
  userId: string,
  updates: Record<string, any>,
): Promise<any> {
  try {
    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    if (user) {
      logger.info("User updated", {
        userId: user._id,
        email: user.email,
      });
    }

    return user;
  } catch (error) {
    logger.error("Failed to update user", {
      userId,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    throw error;
  }
}

/**
 * Block user
 */
export async function blockUser(
  userId: string,
  reason?: string,
): Promise<void> {
  try {
    await User.updateOne({ _id: userId }, { isBlocked: true });

    logger.warn("User blocked", {
      userId,
      reason: reason || "No reason provided",
    });
  } catch (error) {
    logger.error("Failed to block user", {
      userId,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    throw error;
  }
}

/**
 * Unblock user
 */
export async function unblockUser(userId: string): Promise<void> {
  try {
    await User.updateOne({ _id: userId }, { isBlocked: false });

    logger.info("User unblocked", { userId });
  } catch (error) {
    logger.error("Failed to unblock user", {
      userId,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    throw error;
  }
}

/**
 * Deactivate user
 */
export async function deactivateUser(userId: string): Promise<void> {
  try {
    await User.updateOne(
      { _id: userId },
      { isActive: false, refreshTokenFamily: [] },
    );

    logger.info("User deactivated", { userId });
  } catch (error) {
    logger.error("Failed to deactivate user", {
      userId,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    throw error;
  }
}

/**
 * Reactivate user
 */
export async function reactivateUser(userId: string): Promise<void> {
  try {
    await User.updateOne({ _id: userId }, { isActive: true });

    logger.info("User reactivated", { userId });
  } catch (error) {
    logger.error("Failed to reactivate user", {
      userId,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    throw error;
  }
}

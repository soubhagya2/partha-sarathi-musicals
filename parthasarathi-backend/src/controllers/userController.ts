import { Response } from "express";
import { AuthRequest } from "../middleware/authJWT.middleware";
import { User } from "../models/user";
import { logger } from "../utils/logger";

/* ========================= GET PROFILE ========================= */

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
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
  } catch (error: any) {
    logger.error("Get profile error", { error: error.message });
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch profile",
      code: "PROFILE_FETCH_FAILED",
    });
  }
};

/* ========================= UPDATE USER ROLE ========================= */

export const updateUserRole = async (req: AuthRequest, res: Response) => {
  try {
    const { userId, role } = req.body;

    if (!userId || !role) {
      return res.status(400).json({
        success: false,
        message: "userId and role are required",
        code: "INVALID_REQUEST",
      });
    }

    const validRoles = ["SUPER_ADMIN", "ADMIN", "SUPPORT", "CUSTOMER"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: `Invalid role. Must be one of: ${validRoles.join(", ")}`,
        code: "INVALID_ROLE",
      });
    }

    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: "Target user not found",
        code: "USER_NOT_FOUND",
      });
    }

    // Prevent demoting SUPER_ADMIN
    if (targetUser.role === "SUPER_ADMIN" && role !== "SUPER_ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Cannot remove SUPER_ADMIN role",
        code: "CANNOT_CHANGE_SUPER_ADMIN",
      });
    }

    // Only one SUPER_ADMIN allowed
    if (role === "SUPER_ADMIN" && targetUser.role !== "SUPER_ADMIN") {
      const existing = await User.findOne({ role: "SUPER_ADMIN" });
      if (existing) {
        return res.status(403).json({
          success: false,
          message: "Another SUPER_ADMIN already exists",
          code: "SUPER_ADMIN_EXISTS",
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true },
    );

    logger.info("User role updated", {
      userId: targetUser._id,
      email: targetUser.email,
      newRole: role,
      updatedBy: req.user?.email,
    });

    return res.status(200).json({
      success: true,
      message: `User role updated to ${role}`,
      user: {
        id: updatedUser?._id,
        email: updatedUser?.email,
        role: updatedUser?.role,
      },
    });
  } catch (error: any) {
    logger.error("Update user role error", { error: error.message });
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update user role",
      code: "ROLE_UPDATE_FAILED",
    });
  }
};

/* ========================= BLOCK / UNBLOCK USER ========================= */

export const toggleUserBlock = async (req: AuthRequest, res: Response) => {
  try {
    const { userId, isBlocked } = req.body;

    if (!userId || typeof isBlocked !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "userId and isBlocked (boolean) required",
        code: "INVALID_REQUEST",
      });
    }

    const targetUser = await User.findById(userId);
    if (targetUser?.role === "SUPER_ADMIN" && isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Cannot block SUPER_ADMIN",
        code: "CANNOT_BLOCK_SUPER_ADMIN",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { isBlocked },
      { new: true },
    );

    const action = isBlocked ? "blocked" : "unblocked";
    logger.info(`User ${action}`, {
      userId: user?._id,
      email: user?.email,
      blockedBy: req.user?.email,
    });

    return res.status(200).json({
      success: true,
      message: `User ${action}`,
      user: {
        id: user?._id,
        email: user?.email,
        isBlocked: user?.isBlocked,
        role: user?.role,
      },
    });
  } catch (error: any) {
    logger.error("Toggle block error", { error: error.message });
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to toggle block",
      code: "TOGGLE_BLOCK_FAILED",
    });
  }
};

/* ========================= GET ALL USERS (ADMIN) ========================= */

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const { role, isActive, isBlocked, page = "1", limit = "20" } = req.query;

    const filter: any = {};
    if (role) filter.role = role;
    if (isActive !== undefined) filter.isActive = isActive === "true";
    if (isBlocked !== undefined) filter.isBlocked = isBlocked === "true";

    const pageNum = Math.max(1, parseInt(page as string));
    const limitNum = Math.min(100, parseInt(limit as string));
    const skip = (pageNum - 1) * limitNum;

    const [users, total] = await Promise.all([
      User.find(filter).skip(skip).limit(limitNum).sort({ createdAt: -1 }),
      User.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: users,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
      filters: {
        role: role || "all",
        isActive: isActive || "all",
        isBlocked: isBlocked || "all",
      },
    });
  } catch (error: any) {
    logger.error("Get all users error", { error: error.message });
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch users",
      code: "USERS_FETCH_FAILED",
    });
  }
};

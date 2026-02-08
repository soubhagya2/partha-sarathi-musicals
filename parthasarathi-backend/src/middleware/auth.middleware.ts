import { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";
import { User, UserRole, IUser } from "../models/user.js";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    clerkId: string;
    role: UserRole;
    email: string;
    name: string;
    avatar?: string | undefined;
    isActive: boolean;
    isBlocked: boolean;
  };
  auth?: {
    userId: string;
    sessionId?: string;
  };
}

/**
 * Main authentication middleware
 * Validates Clerk session and loads user data from MongoDB
 */
export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const auth = getAuth(req);

    if (!auth.userId) {
      return void res.status(401).json({
        message: "Unauthorized - No session found",
        code: "NO_SESSION",
      });
    }

    req.auth = {
      userId: auth.userId,
      sessionId: auth.sessionId,
    };

    // Try to find existing user linked to this Clerk account
    let user = await User.findOne({ clerkId: auth.userId });

    const SUPER_ADMIN_CLERK_ID = process.env.SUPER_ADMIN_CLERK_ID;
    const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL;
    const SUPER_ADMIN_NAME = process.env.SUPER_ADMIN_NAME || "Super Admin";

    // Bootstrap SUPER_ADMIN on first authenticated request if configured
    if (!user) {
      // If this Clerk user is the configured SUPER_ADMIN, create the DB record on the fly
      if (
        SUPER_ADMIN_CLERK_ID &&
        SUPER_ADMIN_EMAIL &&
        auth.userId === SUPER_ADMIN_CLERK_ID
      ) {
        user = await User.create({
          clerkId: auth.userId,
          role: "SUPER_ADMIN",
          name: SUPER_ADMIN_NAME,
          email: SUPER_ADMIN_EMAIL,
          isActive: true,
          isBlocked: false,
        });
      } else {
        return void res.status(401).json({
          message: "Unauthorized - User not found",
          code: "USER_NOT_FOUND",
        });
      }
    }

    // If a user exists but matches the configured SUPER_ADMIN, ensure role is elevated
    if (
      user &&
      SUPER_ADMIN_CLERK_ID &&
      SUPER_ADMIN_EMAIL &&
      user.clerkId === SUPER_ADMIN_CLERK_ID &&
      user.role !== "SUPER_ADMIN"
    ) {
      user.role = "SUPER_ADMIN";
      user.email = SUPER_ADMIN_EMAIL;
      user.name = SUPER_ADMIN_NAME;
      user.isActive = true;
      user.isBlocked = false;
      await user.save();
    }

    if (user.isBlocked) {
      return void res.status(403).json({
        message: "Access denied - User is blocked",
        code: "USER_BLOCKED",
      });
    }

    if (!user.isActive) {
      return void res.status(403).json({
        message: "Access denied - User account is inactive",
        code: "USER_INACTIVE",
      });
    }

    req.user = {
      id: user._id.toString(),
      clerkId: user.clerkId,
      role: user.role,
      email: user.email,
      name: user.name,
      avatar: user.avatar ?? undefined,
      isActive: !!user.isActive,
      isBlocked: !!user.isBlocked,
    };

    await User.updateOne({ _id: user._id }, { lastLogin: new Date() });

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return void res.status(500).json({
      message: "Authentication error",
      code: "AUTH_ERROR",
    });
  }
};

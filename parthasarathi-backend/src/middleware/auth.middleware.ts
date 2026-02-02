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

    const user = await User.findOne({ clerkId: auth.userId }).lean();

    if (!user) {
      return void res.status(401).json({
        message: "Unauthorized - User not found",
        code: "USER_NOT_FOUND",
      });
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

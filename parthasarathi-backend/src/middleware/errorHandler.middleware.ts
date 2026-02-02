import { Request, Response, NextFunction } from "express";

export interface AuthErrorResponse {
  message: string;
  code: string;
  timestamp: string;
  path: string;
}

/**
 * Error handling middleware for auth-related errors
 * Place this after your routes
 */
export const authErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Clerk authentication errors
  if (err.code === "CLERK_AUTH_ERROR") {
    return res.status(401).json({
      message: "Authentication failed",
      code: "CLERK_AUTH_ERROR",
      timestamp: new Date().toISOString(),
      path: req.path,
    });
  }

  // Authorization errors
  if (err.code === "AUTHORIZATION_ERROR") {
    return res.status(403).json({
      message: "Insufficient permissions",
      code: "AUTHORIZATION_ERROR",
      timestamp: new Date().toISOString(),
      path: req.path,
    });
  }

  // Pass to next error handler
  next(err);
};

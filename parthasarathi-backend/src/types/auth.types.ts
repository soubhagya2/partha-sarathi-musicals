import { UserRole } from "../models/user.js";

export interface AuthUser {
  id: string;
  clerkId: string;
  role: UserRole;
  email: string;
  name: string;
  avatar?: string;
  isActive: boolean;
  isBlocked: boolean;
}

export interface AuthContext {
  userId: string;
  sessionId?: string;
}

export interface AuthResponse {
  message: string;
  code: string;
  requiredRoles?: UserRole[];
  userRole?: UserRole;
}

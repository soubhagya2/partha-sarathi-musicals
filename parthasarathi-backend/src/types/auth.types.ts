import { UserRole } from "../models/user";

/**
 * Authenticated user object after Clerk verification
 * Attached to req.user by auth middleware
 */
export interface AuthUser {
  id: string; // MongoDB user ID (_id)
  clerkId: string; // Clerk user ID
  role: UserRole;
  email: string;
  name: string;
  avatar?: string;
  isActive: boolean;
  isBlocked: boolean;
  lastLogin?: Date;
}

/**
 * Extended request context with Clerk auth information
 * Attached to req.auth by auth middleware
 */
export interface AuthContext {
  userId: string; // MongoDB user ID
  clerkId: string; // Clerk user ID
  sessionId?: string;
  orgId?: string; // Organization ID if part of Clerk organization
}

/**
 * Standard API response for auth operations
 */
export interface AuthResponse {
  message: string;
  code: string;
  requiredRoles?: UserRole[];
  userRole?: UserRole;
}

/**
 * Clerk webhook event payload
 * Contains metadata about webhook verification and user data
 */
export interface ClerkWebhookEvent {
  type:
    | "user.created"
    | "user.updated"
    | "user.deleted"
    | "session.created"
    | "session.removed";
  data: {
    id: string;
    object?: string;
    username?: string;
    first_name?: string;
    last_name?: string;
    image_url?: string;
    created_at?: number;
    updated_at?: number;
    email_addresses: Array<{
      id: string;
      email_address: string;
      verification?: any;
      linked_to?: any;
    }>;
    phone_numbers?: Array<{
      id: string;
      phone_number: string;
      reserved_for_second_factor?: boolean;
      default_second_factor?: boolean;
      reserved?: boolean;
      verification?: any;
    }>;
    external_accounts?: any[];
    public_metadata?: Record<string, any>;
    private_metadata?: Record<string, any>;
    unsafeMetadata?: Record<string, any>;
    passkeys?: any[];
  };
  object: string;
  timestamp: number;
}

/**
 * Clerk user sync payload
 * Used internally for syncing user data
 */
export interface ClerkUserSyncPayload {
  clerkId: string;
  email: string;
  name: string;
  avatar?: string;
  isActive: boolean;
}

/**
 * RBAC permission configuration
 */
export interface RBACPermission {
  resource: string;
  actions: string[];
  roles: UserRole[];
}

/**
 * Webhook event from Clerk
 */
export interface ClerkWebhookEvent {
  type: string;
  data: {
    id?: string;
    email_addresses?: Array<{ email_address: string }>;
    first_name?: string;
    last_name?: string;
    image_url?: string;
  };
}

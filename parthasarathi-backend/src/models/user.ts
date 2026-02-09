import { Schema, model, Document } from "mongoose";
import bcryptjs from "bcryptjs";

export type UserRole = "SUPER_ADMIN" | "ADMIN" | "SUPPORT" | "CUSTOMER";
export type AuthProvider = "local" | "google";

/**
 * User model with custom authentication
 * Supports local password auth, email verification, password reset, and Google OAuth
 */
export interface IUser extends Document {
  // Basic Info
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  role: UserRole;

  // Authentication - Local
  password?: string; // Hashed password (optional - null for OAuth-only users)
  authProvider: AuthProvider; // 'local' or 'google'
  googleId?: string; // Google OAuth ID (optional)

  // Email Verification
  emailVerified: boolean;
  emailVerificationToken?: string; // Token sent via email
  emailVerificationTokenExpiry?: Date;

  // Password Reset
  passwordResetToken?: string; // OTP or token for reset
  passwordResetTokenExpiry?: Date;

  // Session Management
  refreshTokenFamily: string[]; // For rotating refresh tokens
  isActive: boolean;
  isBlocked: boolean;
  lastLogin?: Date;

  // Metadata
  metadata?: Record<string, any>;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;

  // Methods
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      index: true,
      trim: true,
      validate: {
        validator: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        message: "Invalid email format",
      },
      description: "User email address",
    },
    name: {
      type: String,
      required: true,
      trim: true,
      description: "User display name",
    },
    phone: {
      type: String,
      sparse: true,
      description: "User phone number",
    },
    avatar: {
      type: String,
      description: "User avatar URL",
    },
    role: {
      type: String,
      enum: ["SUPER_ADMIN", "ADMIN", "SUPPORT", "CUSTOMER"],
      default: "CUSTOMER",
      required: true,
      index: true,
      description: "User role for RBAC",
    },
    password: {
      type: String,
      description: "Hashed password - null for OAuth-only users",
      select: false, // Don't include in queries by default
    },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
      required: true,
      description: "Authentication provider used",
    },
    googleId: {
      type: String,
      sparse: true,
      index: true,
      description: "Google OAuth ID",
    },
    emailVerified: {
      type: Boolean,
      default: false,
      description: "Whether email has been verified",
    },
    emailVerificationToken: {
      type: String,
      description: "Email verification token (sent via email)",
      select: false,
    },
    emailVerificationTokenExpiry: {
      type: Date,
      description: "Expiry of email verification token",
      select: false,
    },
    passwordResetToken: {
      type: String,
      description: "Password reset token/OTP",
      select: false,
    },
    passwordResetTokenExpiry: {
      type: Date,
      description: "Expiry of password reset token",
      select: false,
    },
    refreshTokenFamily: {
      type: [String],
      default: [],
      description: "Array of refresh token JTIs for rotation",
      select: false,
    },
    isActive: {
      type: Boolean,
      default: true,
      description: "Whether the user account is active",
    },
    isBlocked: {
      type: Boolean,
      default: false,
      description: "Whether the user is blocked from accessing the platform",
    },
    lastLogin: {
      type: Date,
      description: "Timestamp of user's last login",
    },
    metadata: {
      type: Schema.Types.Mixed,
      description: "Additional user metadata",
    },
  },
  { timestamps: true },
);

/**
 * Pre-save hook: Hash password before saving
 */
UserSchema.pre("save", async function (next) {
  // Only hash if password is modified and exists
  if (!this.isModified("password") || !this.password) {
    return next();
  }

  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

/**
 * Instance method: Compare password for login
 */
UserSchema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  if (!this.password) return false;
  return bcryptjs.compare(password, this.password);
};

// Ensure there can only be ONE SUPER_ADMIN
UserSchema.index(
  { role: 1 },
  {
    unique: true,
    partialFilterExpression: { role: "SUPER_ADMIN" },
  },
);

// Lock SUPER_ADMIN email to configured address if set
const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL;

UserSchema.path("email").validate(function (this: any, value: string) {
  if (
    this.role === "SUPER_ADMIN" &&
    SUPER_ADMIN_EMAIL &&
    value.toLowerCase() !== SUPER_ADMIN_EMAIL.toLowerCase()
  ) {
    return false;
  }
  return true;
}, "SUPER_ADMIN email must match SUPER_ADMIN_EMAIL");

export const User = model<IUser>("User", UserSchema);

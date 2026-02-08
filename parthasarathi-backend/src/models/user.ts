import { Schema, model, Document } from "mongoose";

export type UserRole = "SUPER_ADMIN" | "ADMIN" | "SUPPORT" | "CUSTOMER";

export interface IUser extends Document {
  clerkId: string;
  role: UserRole;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  isActive: boolean;
  isBlocked: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    clerkId: { type: String, required: true, unique: true, index: true },
    role: {
      type: String,
      enum: ["SUPER_ADMIN", "ADMIN", "SUPPORT", "CUSTOMER"],
      default: "CUSTOMER",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    phone: { type: String },
    avatar: { type: String },
    isActive: { type: Boolean, default: true },
    isBlocked: { type: Boolean, default: false },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

// Ensure there can only ever be ONE SUPER_ADMIN document
UserSchema.index(
  { role: 1 },
  {
    unique: true,
    partialFilterExpression: { role: "SUPER_ADMIN" },
  }
);

// Lock SUPER_ADMIN email to a single configured address
const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL;

UserSchema.path("email").validate(function (this: any, value: string) {
  if (
    this.role === "SUPER_ADMIN" &&
    SUPER_ADMIN_EMAIL &&
    value !== SUPER_ADMIN_EMAIL
  ) {
    return false;
  }
  return true;
}, "SUPER_ADMIN email must match SUPER_ADMIN_EMAIL");

export const User = model<IUser>("User", UserSchema);

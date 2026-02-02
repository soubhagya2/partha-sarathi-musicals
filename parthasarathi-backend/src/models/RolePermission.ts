import { Schema, model, Document } from "mongoose";

export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  SUPPORT = "SUPPORT",
  CUSTOMER = "CUSTOMER",
}

export enum Permission {
  // User management
  USER_READ = "user:read",
  USER_WRITE = "user:write",
  USER_DELETE = "user:delete",

  // Product management
  PRODUCT_READ = "product:read",
  PRODUCT_WRITE = "product:write",
  PRODUCT_DELETE = "product:delete",

  // Order management
  ORDER_READ = "order:read",
  ORDER_UPDATE = "order:update",
  ORDER_CANCEL = "order:cancel",
  ORDER_REFUND = "order:refund",

  // Payment & finance
  PAYMENT_READ = "payment:read",
  PAYMENT_REFUND = "payment:refund",

  // Support
  SUPPORT_READ = "support:read",
  SUPPORT_REPLY = "support:reply",
  SUPPORT_CLOSE = "support:close",

  // Marketing
  COUPON_MANAGE = "coupon:manage",
  BANNER_MANAGE = "banner:manage",
  OFFER_MANAGE = "offer:manage",

  // System
  ACTIVITY_LOG_READ = "activity:read",
  ROLE_MANAGE = "role:manage",
}

export interface IRolePermission extends Document {
  id?: string;
  role: Role;
  permissions: Permission[];
  isSystemRole: boolean;
}

const rolePermissionSchema = new Schema<IRolePermission>(
  {
    role: {
      type: String,
      enum: Role,
      required: true,
      unique: true,
      index: true,
    },

    permissions: [
      {
        type: String,
        enum: Permission,
        required: true,
      },
    ],

    isSystemRole: {
      type: Boolean,
      default: true, // Prevent accidental deletion
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret: any) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export default model<IRolePermission>(
  "RolePermission",
  rolePermissionSchema
);

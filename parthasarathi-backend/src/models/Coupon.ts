import { Schema, model, Document, Types } from "mongoose";

export type CouponType = "PERCENTAGE" | "FLAT";

export interface ICoupon extends Document {
  id?: string;
  code: string;
  type: CouponType;
  value: number; // % or flat amount
  maxDiscount?: number;
  minOrderValue?: number;
  usageLimit?: number; // total usage limit
  usedCount: number;
  validFrom: Date;
  validTill: Date;
  applicableProducts?: Types.ObjectId[];
  applicableCategories?: Types.ObjectId[];
  isActive: boolean;
  createdBy: Types.ObjectId; // Admin / Super Admin
  createdAt: Date;
  updatedAt: Date;
}

const couponSchema = new Schema<ICoupon>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["PERCENTAGE", "FLAT"],
      required: true,
    },

    value: {
      type: Number,
      required: true,
      min: 0,
    },

    maxDiscount: {
      type: Number,
      min: 0,
    },

    minOrderValue: {
      type: Number,
      min: 0,
      default: 0,
    },

    usageLimit: {
      type: Number,
      min: 1,
    },

    usedCount: {
      type: Number,
      default: 0,
    },

    validFrom: {
      type: Date,
      required: true,
    },

    validTill: {
      type: Date,
      required: true,
    },

    applicableProducts: [
      { type: Schema.Types.ObjectId, ref: "Product" },
    ],

    applicableCategories: [
      { type: Schema.Types.ObjectId, ref: "Category" },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
  },
);

/**
 * Indexes for faster coupon validation
 */
couponSchema.index({ validFrom: 1, validTill: 1 });
couponSchema.index({ isActive: 1 });

export default model<ICoupon>("Coupon", couponSchema);

import { Schema, model, Document, Types } from "mongoose";

export enum OfferType {
  PERCENTAGE = "percentage",
  FLAT = "flat",
}

export enum OfferScope {
  PRODUCT = "product",
  CATEGORY = "category",
  CART = "cart",
}

export interface IOffer extends Document {
  id?: string;
  title: string;
  description?: string;
  type: OfferType;
  scope: OfferScope;

  discountValue: number;

  applicableProducts?: Types.ObjectId[];
  applicableCategories?: Types.ObjectId[];

  minOrderAmount?: number;
  maxDiscountAmount?: number;

  startDate: Date;
  endDate: Date;

  isActive: boolean;
  priority: number;

  createdBy: Types.ObjectId;
}

const offerSchema = new Schema<IOffer>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    type: {
      type: String,
      enum: OfferType,
      required: true,
    },

    scope: {
      type: String,
      enum: OfferScope,
      required: true,
    },

    discountValue: {
      type: Number,
      required: true,
      min: 0,
    },

    applicableProducts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    applicableCategories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],

    minOrderAmount: {
      type: Number,
      min: 0,
    },

    maxDiscountAmount: {
      type: Number,
      min: 0,
    },

    startDate: {
      type: Date,
      required: true,
      index: true,
    },

    endDate: {
      type: Date,
      required: true,
      index: true,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    priority: {
      type: Number,
      default: 0, // Higher = applied first
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
  }
);

/* ---------- Indexes ---------- */
offerSchema.index({ isActive: 1, startDate: 1, endDate: 1 });
offerSchema.index({ scope: 1, priority: -1 });

export default model<IOffer>("Offer", offerSchema);

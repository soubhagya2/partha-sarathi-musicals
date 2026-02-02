import { Schema, model, Document, Types } from "mongoose";

export enum TaxType {
  GST = "gst",
  VAT = "vat",
  SERVICE = "service",
}

export enum TaxScope {
  PRODUCT = "product",
  CATEGORY = "category",
  ORDER = "order",
}

export interface ITax extends Document {
  id?: string;
  name: string;                // GST 18%, GST 12%, etc.
  type: TaxType;
  scope: TaxScope;

  percentage: number;          // 0–100
  cgst?: number;
  sgst?: number;
  igst?: number;

  applicableProducts?: Types.ObjectId[];
  applicableCategories?: Types.ObjectId[];

  isActive: boolean;
  priority: number;

  createdBy: Types.ObjectId;
}

const taxSchema = new Schema<ITax>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: TaxType,
      default: TaxType.GST,
    },

    scope: {
      type: String,
      enum: TaxScope,
      required: true,
    },

    percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    cgst: {
      type: Number,
      min: 0,
      max: 100,
    },

    sgst: {
      type: Number,
      min: 0,
      max: 100,
    },

    igst: {
      type: Number,
      min: 0,
      max: 100,
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

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    priority: {
      type: Number,
      default: 0,
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
taxSchema.index({ isActive: 1, scope: 1, priority: -1 });

export default model<ITax>("Tax", taxSchema);

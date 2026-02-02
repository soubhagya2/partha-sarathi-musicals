import { Schema, model, Document, Types } from "mongoose";

export interface IReview extends Document {
  id?: string;
  product: Types.ObjectId;
  user: Types.ObjectId;
  rating: number; // 1–5
  title?: string;
  comment?: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    isApproved: {
      type: Boolean,
      default: false, // admin/moderation control
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
 * Prevent same user reviewing same product multiple times
 */
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

export default model<IReview>("Review", reviewSchema);

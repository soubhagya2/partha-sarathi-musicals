import { Schema, model, Document } from "mongoose";

export type BannerPosition =
  | "HOME_HERO"
  | "HOME_MIDDLE"
  | "CATEGORY_TOP"
  | "CHECKOUT";

export interface IBanner extends Document {
  id?: string;
  title?: string;
  subtitle?: string;
  image: string;          // Cloudinary URL
  link?: string;          // Redirect URL
  position: BannerPosition;
  isActive: boolean;
  order: number;          // Display order
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const bannerSchema = new Schema<IBanner>(
  {
    title: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    subtitle: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    image: {
      type: String,
      required: true,
    },

    link: {
      type: String,
    },

    position: {
      type: String,
      enum: ["HOME_HERO", "HOME_MIDDLE", "CATEGORY_TOP", "CHECKOUT"],
      required: true,
      index: true,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    order: {
      type: Number,
      default: 0,
    },

    startDate: {
      type: Date,
    },

    endDate: {
      type: Date,
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
 * Useful indexes for fast banner loading
 */
bannerSchema.index({ position: 1, isActive: 1 });
bannerSchema.index({ startDate: 1, endDate: 1 });

export default model<IBanner>("Banner", bannerSchema);


import { Schema, model, Document } from "mongoose";

export interface INewsletter extends Document {
  id?: string;
  email: string;
  isSubscribed: boolean;
  subscribedAt: Date;
  unsubscribedAt?: Date;
  source?: "WEBSITE" | "CHECKOUT" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
}

const newsletterSchema = new Schema<INewsletter>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      index: true,
    },

    isSubscribed: {
      type: Boolean,
      default: true,
      index: true,
    },

    subscribedAt: {
      type: Date,
      default: Date.now,
    },

    unsubscribedAt: {
      type: Date,
    },

    source: {
      type: String,
      enum: ["WEBSITE", "CHECKOUT", "ADMIN"],
      default: "WEBSITE",
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
 * Helpful index for email campaigns
 */
newsletterSchema.index({ isSubscribed: 1 });

export default model<INewsletter>("Newsletter", newsletterSchema);

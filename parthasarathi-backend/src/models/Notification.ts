import { Schema, model, Document, Types } from "mongoose";

export type NotificationChannel = "EMAIL" | "WHATSAPP" | "FCM";
export type NotificationStatus = "PENDING" | "SENT" | "FAILED";

export interface INotification extends Document {
  id?: string;
  user?: Types.ObjectId;        // Optional: system notifications
  title: string;
  message: string;
  channel: NotificationChannel;
  status: NotificationStatus;
  metadata?: Record<string, any>; // orderId, couponCode, etc.
  error?: string;
  sentAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },

    channel: {
      type: String,
      enum: ["EMAIL", "WHATSAPP", "FCM"],
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "SENT", "FAILED"],
      default: "PENDING",
      index: true,
    },

    metadata: {
      type: Schema.Types.Mixed,
    },

    error: {
      type: String,
    },

    sentAt: {
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
 * Helpful indexes for workers / cron jobs
 */
notificationSchema.index({ status: 1, channel: 1 });
notificationSchema.index({ createdAt: -1 });

export default model<INotification>("Notification", notificationSchema);

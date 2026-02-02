import { Schema, model, Document, Types } from "mongoose";

export type TicketStatus =
  | "OPEN"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "CLOSED";

export type TicketPriority =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "URGENT";

export interface ITicketMessage {
  sender: Types.ObjectId; // User / Support
  message: string;
  attachments?: string[]; // Cloudinary URLs
  createdAt: Date;
}

export interface ISupportTicket extends Document {
  id?: string;
  ticketId: string;
  user: Types.ObjectId;
  subject: string;
  status: TicketStatus;
  priority: TicketPriority;
  messages: ITicketMessage[];
  assignedTo?: Types.ObjectId; // Support/Admin
  order?: Types.ObjectId; // Optional order reference
  closedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ticketMessageSchema = new Schema<ITicketMessage>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    attachments: [{ type: String }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
);

const supportTicketSchema = new Schema<ISupportTicket>(
  {
    ticketId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    status: {
      type: String,
      enum: ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"],
      default: "OPEN",
      index: true,
    },

    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "URGENT"],
      default: "MEDIUM",
      index: true,
    },

    messages: [ticketMessageSchema],

    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },

    closedAt: {
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
 * Helpful indexes for admin dashboards
 */
supportTicketSchema.index({ status: 1, priority: 1 });
supportTicketSchema.index({ createdAt: -1 });

export default model<ISupportTicket>("SupportTicket", supportTicketSchema);

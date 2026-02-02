import { Schema, model, Document, Types } from "mongoose";

export enum ShipmentStatus {
  PENDING = "pending",
  PICKED_UP = "picked_up",
  IN_TRANSIT = "in_transit",
  OUT_FOR_DELIVERY = "out_for_delivery",
  DELIVERED = "delivered",
  FAILED = "failed",
  RETURNED = "returned",
  CANCELLED = "cancelled",
}

export interface IShipment extends Document {
  id?: string;
  order: Types.ObjectId;
  user: Types.ObjectId;
  courierName?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  status: ShipmentStatus;
  shippedAt?: Date;
  deliveredAt?: Date;
  estimatedDelivery?: Date;
  notes?: string;
}

const shipmentSchema = new Schema<IShipment>(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      unique: true, // One shipment per order
      index: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    courierName: {
      type: String,
      trim: true,
    },

    trackingNumber: {
      type: String,
      trim: true,
      index: true,
    },

    trackingUrl: {
      type: String,
    },

    status: {
      type: String,
      enum: ShipmentStatus,
      default: ShipmentStatus.PENDING,
      index: true,
    },

    shippedAt: {
      type: Date,
    },

    deliveredAt: {
      type: Date,
    },

    estimatedDelivery: {
      type: Date,
    },

    notes: {
      type: String,
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

/**
 * Auto-set timestamps based on status
 */
shipmentSchema.pre("save", function (next) {
  if (this.isModified("status")) {
    if (this.status === ShipmentStatus.IN_TRANSIT && !this.shippedAt) {
      this.shippedAt = new Date();
    }

    if (this.status === ShipmentStatus.DELIVERED && !this.deliveredAt) {
      this.deliveredAt = new Date();
    }
  }
  next();
});

export default model<IShipment>("Shipment", shipmentSchema);

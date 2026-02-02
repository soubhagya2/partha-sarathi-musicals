import { Schema, model, Document, Types } from 'mongoose';

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}

// Order item subdocument
export interface IOrderItem {
  product: Types.ObjectId;
  quantity: number;
  price: number;
  name: string; // Snapshot at order time
}

// Main Order document
export interface IOrder extends Document {
  id?: string; // added for toJSON
  orderNumber: string;
  customer: Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  taxAmount?: number;
  discountAmount?: number;
  shippingAmount?: number;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
  deliveryPartner?: string;
  trackingUrl?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Sub-schema for order items
const orderItemSchema = new Schema<IOrderItem>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
  name: { type: String, required: true }
});

// Main order schema
const orderSchema = new Schema<IOrder>({
  orderNumber: { type: String, required: true, unique: true },
  customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true },
  taxAmount: { type: Number, default: 0 },
  discountAmount: { type: Number, default: 0 },
  shippingAmount: { type: Number, default: 0 },
  razorpayOrderId: { type: String, required: true },
  razorpayPaymentId: { type: String },
  razorpaySignature: { type: String },
  status: { type: String, enum: OrderStatus, default: OrderStatus.PENDING },
  paymentStatus: { type: String, enum: PaymentStatus, default: PaymentStatus.PENDING },
  shippingAddress: {
    name: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    phone: { type: String, required: true }
  },
  deliveryPartner: { type: String },
  trackingUrl: { type: String },
  notes: { type: String }
}, {
  timestamps: true,
  toJSON: { 
    virtuals: true, 
    transform: (_doc, ret: any) => {
      ret.id = ret._id;  // assign id first
      delete ret._id;     // remove _id
      delete ret.__v;     // remove version key
    }
  }
});

export default model<IOrder>('Order', orderSchema);

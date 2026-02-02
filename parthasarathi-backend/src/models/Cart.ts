import { Schema, model, Document, Types } from "mongoose";

export interface ICartItem {
  product: Types.ObjectId;
  quantity: number;
  price: number; // Snapshot price at the time of adding to cart
}

export interface ICart extends Document {
  id?: string; // added for toJSON
  user: Types.ObjectId; // reference to User
  items: ICartItem[];
  totalAmount: number;
  couponCode?: string;
  discountAmount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const cartItemSchema = new Schema<ICartItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1, default: 1 },
  price: { type: Number, required: true, min: 0 }
});

const cartSchema = new Schema<ICart>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  items: [cartItemSchema],
  totalAmount: { type: Number, required: true, min: 0, default: 0 },
  couponCode: { type: String },
  discountAmount: { type: Number, min: 0, default: 0 }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (_doc, ret: any) => {
      ret.id = ret._id; // assign id first
      delete ret._id;    // remove _id
      delete ret.__v;    // remove version key
    }
  }
});

export default model<ICart>("Cart", cartSchema);

import { Schema, model, Document, Types } from "mongoose";

export interface IWishlist extends Document {
  id?: string;
  user: Types.ObjectId;
  products: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const wishlistSchema = new Schema<IWishlist>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // One wishlist per user
      index: true,
    },

    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
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
 * Prevent duplicate products in wishlist
 */
wishlistSchema.pre("save", function (next) {
  this.products = Array.from(new Set(this.products.map(String))) as any;
  next();
});

export default model<IWishlist>("Wishlist", wishlistSchema);

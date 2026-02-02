import { Schema, model, Document, Types } from 'mongoose';

export interface IProduct extends Document {
  id?: string; // optional, added in toJSON
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  stock: number;
  sku: string;
  images: string[]; // Cloudinary URLs
  category: Types.ObjectId;
  tags?: string[];
  specifications: Record<string, any>;
  isActive: boolean;
  isFeatured: boolean;
  createdBy: Types.ObjectId; // Clerk user reference
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  salePrice: { type: Number, min: 0 },
  stock: { type: Number, required: true, min: 0, default: 0 },
  sku: { type: String, required: true, unique: true, uppercase: true },
  images: [{ type: String }],
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  tags: [{ type: String, trim: true }],
  specifications: { type: Schema.Types.Mixed, default: {} },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true,
  toJSON: { 
    virtuals: true, 
    transform: (_doc, ret: any) => { 
      ret.id = ret._id;      // assign id first
      delete ret._id;         // remove _id safely
      delete ret.__v;         // remove version key
    } 
  }
});

export default model<IProduct>('Product', productSchema);

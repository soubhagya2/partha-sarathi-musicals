// models/Category.ts
import { Schema, model, Document, Types } from 'mongoose';

export enum CategoryType {
  STRINGS = 'strings',
  PERCUSSION = 'percussion',
  WIND = 'wind',
  KEYBOARD = 'keyboard',
  ACCESSORIES = 'accessories'
}

export interface ICategory extends Document {
  id?: string; // optional, will be added in toJSON
  name: string;
  type: CategoryType;
  description?: string;
  image?: string;
  isActive: boolean;
  products: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true, trim: true },
  type: { type: String, enum: CategoryType, required: true },
  description: { type: String, trim: true },
  image: { type: String },
  isActive: { type: Boolean, default: true },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
}, {
  timestamps: true,
  toJSON: { 
    virtuals: true, 
    transform: (_doc, ret: any) => { 
      ret.id = ret._id;  
      delete ret._id;      
      delete ret.__v;      
    } 
  }
});


export default model<ICategory>('Category', categorySchema);

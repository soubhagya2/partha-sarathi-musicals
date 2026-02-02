import { Schema, model, Document } from "mongoose";

export interface IAddress extends Document {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    createdAt: Date;
    updatedAt: Date;        
}
const AddressSchema = new Schema<IAddress>({
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    zipCode: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
}, { timestamps: true });

AddressSchema.index({ zipCode: 1 });
AddressSchema.index({ city: 1, state: 1 });


export const Address = model<IAddress>("Address", AddressSchema);

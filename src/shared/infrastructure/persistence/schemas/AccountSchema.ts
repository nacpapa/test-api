import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAccount {
  id: string;
  externalId: string;
  email: string;
  type: "admin" | "user";
  isVerified: boolean;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Extiende Document pero con un tipo 'id' específico
export interface IAccountDocument extends Omit<IAccount, "id">, Document {
  id: string; // Sobreescribimos 'id' con un tipo 'string'
}

const AccountSchema: Schema<IAccountDocument> = new Schema({
  id: { type: String, required: true, unique: true },
  externalId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  type: { type: String, enum: ["admin", "user"], required: true },
  isVerified: { type: Boolean, default: true },
  deleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Creamos el modelo basado en el esquema y documento extendido
export const AccountModel: Model<IAccountDocument> =
  mongoose.model<IAccountDocument>("Account", AccountSchema);

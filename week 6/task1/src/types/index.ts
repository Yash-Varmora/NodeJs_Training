import { Document, Types } from "mongoose"; 

export interface UserDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "buyer" | "seller";
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  stock: number;
  seller: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartDocument extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  items: {
    product: Types.ObjectId;
    quantity: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderDocument extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  items: {
    product: Types.ObjectId;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPayload {
  id: string;
  role: string;
}

declare module "express" {
  interface Request {
    user?: UserDocument;
  }
}
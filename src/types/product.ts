import { User } from "./user";

export interface ratingInfo {
  value: number;
  user: string | User;
}
export interface reviewInfo {
  review: string;
  user: string | User;
}

export interface variantInfo {
  name: string;
  images: string[];
  additionalCost: number;
}
export interface productInfo {
  _id?: string;
  averageRating?: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  quantity: number;
  ratings?: ratingInfo[];
  reviews?: reviewInfo[];
  category: string;
  variantsCount: number;
  variants: variantInfo[];
  productSold: number;
  createdAt?: any;
}

export interface fileDataProps {
  fileName: string;
  type: string;
  file: File | null;
}

import { productInfo } from "./product";

export interface cartItem {
  basePrice: number;
  additionalCost: number;
  images: string[];
  quantity: number;
  itemQuantity: number;
  productId:
    | string
    | {
        _id: string;
        stock: number;
      };
  category: string;
  title: string;
  variantId: number;
  _id?: string;
}
export interface cartItemFilled {
  basePrice: number;
  additionalCost: number;
  images: string[];
  quantity: number;
  itemQuantity: number;
  productId: {
    _id: string;
    stock: number;
  };
  category: string;
  title: string;
  variantId: number;
  _id?: string;
}
export interface User {
  _id: string;
  clerkId: string;
  shippingAddress?: {
    addressline1: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
  };
  billingAddress?: {
    addressline1: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
  };
  orders: string[];
  cartItems: cartItem[];
}

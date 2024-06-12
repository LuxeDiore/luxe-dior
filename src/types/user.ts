import { productInfo } from "./product";

interface cartItem {
  product: productInfo | string;
  quantity: number;
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

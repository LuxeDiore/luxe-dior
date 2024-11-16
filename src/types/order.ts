import { orderStatus } from "@/enums/order";

interface User {
  userName: string;
  clerkId: string;
}

export interface OrderItemconfigType {
  basePrice: number;
  quantity: number;
  productId: string;
  variantId: number;
}
interface Product {
  title: string;
  variant: {
    name: string;
    images: [{ type: string }];
    additionalCost: {
      type: number;
    };
  };
  productPrice: number;
  productId: string;
}

export interface OrderType {
  _id: string;
  paymentId: string;
  deliveryCharge: number;
  user: User;
  orderValue: number;
  orderStatus: orderStatus;
  paymentMethod: string;
  paymentStatus: string;
  items: OrderItemconfigType[];
}

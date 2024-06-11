import { orderStatus } from "@/enums/order";

interface User {
  name: string;
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
  user: User;
  orderValue: number;
  orderStatus: orderStatus;
  paymentMethod: string;
  paymentStatus: string;
  items: Product[];
}

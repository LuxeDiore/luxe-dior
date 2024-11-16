"use server";

import { OrderType } from "@/types/order";
import Order from "@/database/schema/OrderSchema";
export async function updateOrderStatus(order: OrderType, status: string) {
  const currOrder = await Order.findById(order._id);

  if (!currOrder) {
    return { success: false, message: "Order does not exist" };
  }

  currOrder.orderStatus = status;
  await currOrder.save();
  return { success: true, message: "Order updated successfully" };
}

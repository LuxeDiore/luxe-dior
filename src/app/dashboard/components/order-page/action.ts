"use server";

import { OrderType } from "@/types/order";
import Order from "@/database/schema/OrderSchema";
import { currentUser } from "@clerk/nextjs/server";
import { resend } from "@/lib/resend";
import { OrderStatusUpdate } from "../../../../../email-templates/order-status-update-email-template-client";
export async function updateOrderStatus(order: OrderType, status: string) {
  const user = await currentUser();
  if (!user) {
    return {
      success: false,
      message: "Please login to make this request",
    };
  }
  const email = user?.emailAddresses[0].emailAddress;
  const currOrder = await Order.findById(order._id);

  if (!currOrder) {
    return { success: false, message: "Order does not exist" };
  }
  const paymentId = currOrder.paymentId;
  const tempOrder = await Order.findOne({ paymentId: paymentId }).populate({
    path: "items",
    populate: {
      path: "productId",
      model: "Product",
    },
  });
  const items = tempOrder.items;
  const deliveryCharge = tempOrder.deliveryCharge;
  const orderValue = tempOrder.orderValue;
  await Promise.all([
    resend.emails.send({
      from: "Luxe Dior <jashanverma@luxedior.in>",
      to: [`${email}`],
      subject: "Order Status Update",
      react: OrderStatusUpdate({
        paymentId: paymentId,
        orderItems: items,
        deliveryCharge: deliveryCharge,
        orderValue: orderValue,
        newStatus: status,
      }),
    }),
  ]);
  currOrder.orderStatus = status;
  await currOrder.save();
  return { success: true, message: "Order updated successfully" };
}

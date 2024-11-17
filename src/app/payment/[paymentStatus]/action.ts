"use server";

import Order from "@/database/schema/OrderSchema";
import { resend } from "@/lib/resend";
import { currentUser } from "@clerk/nextjs/server";
import { OrderSuccessEmailTemplate } from "../../../../email-templates/order-success-email-template-admin";
import { OrderSuccessEmailTemplateClient } from "../../../../email-templates/order-success-email-template-client";

export async function sendOrderConfirmationEmailsHandler(paymentId: string) {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        success: false,
        message: "Please login to make this request",
      };
    }
    const name = user?.fullName;
    const email = user?.emailAddresses[0].emailAddress;
    const order = await Order.findOne({ paymentId: paymentId }).populate({
      path: "items",
      populate: {
        path: "productId",
        model: "Product",
      },
    });
    if (!order) {
      return {
        success: false,
        message: "No order exists with this paymentId",
      };
    }
    const items = order.items;
    const deliveryCharge = order.deliveryCharge;
    const orderValue = order.orderValue;
    await Promise.all([
      resend.emails.send({
        from: "Luxe Dior <jashanverma@luxedior.in>",
        to: [`${email}`],
        subject: "Thanks for placing your order !!",
        react: OrderSuccessEmailTemplateClient({
          name: name!,
          paymentId: paymentId,
          orderItems: items,
          deliveryCharge: deliveryCharge,
          orderValue: orderValue,
        }),
      }),
      resend.emails.send({
        from: "Luxe Dior Order <jashanverma@luxedior.in>",
        to: ["perfumes.luxediore@gmail.com"],
        subject: "New Order",
        react: OrderSuccessEmailTemplate({
          name: name!,
          paymentId: paymentId,
          orderItems: items,
          deliveryCharge: deliveryCharge,
          orderValue: orderValue,
        }),
      }),
    ]);
    return {
      success: true,
      message: "Email sent successfully.",
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message!,
    };
  }
}

"use server";

import Order from "@/database/schema/OrderSchema";
import { resend } from "@/lib/resend";
import { currentUser } from "@clerk/nextjs/server";
import { OrderSuccessEmailTemplate } from "../../../../email-templates/order-success-email-template-admin";
import { OrderSuccessEmailTemplateClient } from "../../../../email-templates/order-success-email-template-client";
import Product from "@/database/schema/ProductSchema";
import dbConnect from "@/lib/db";

export async function sendOrderConfirmationEmailsHandler(paymentId: string) {
  try {
    await dbConnect();
    console.log("Inside!");
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
    for (var i = 0; i < order.items.length; i++) {
      const id = order.items[i]._id;
      const product = await Product.findById(id);
      product.stock -= order.items[i].quantity;
      await product.save();
    }
    if (!order) {
      return {
        success: false,
        message: "No order exists with this paymentId",
      };
    }
    const items = order.items;
    const deliveryCharge = order.deliveryCharge;
    const orderValue = order.orderValue;

    console.log("email : ", email);
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
    ]).then((res) => {
      console.log("Emails sent successfully...");
      console.log("res : ", res);
    });
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

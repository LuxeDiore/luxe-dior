"use server";

import { getSelfOrders } from "@/app/action";
import { User, currentUser } from "@clerk/nextjs/server";

export async function getSelf() {
  try {
    const user: User | null = await currentUser();
    if (!user) {
      return {
        success: false,
        message: "Plase login to access this page",
        user: "",
        orders: "[]",
      };
    }
    const userString = JSON.stringify(user);

    const orders = await getSelfOrders({ clerkId: user.id });
    const orderString = JSON.stringify(orders.orders);

    if (orders.success === false) {
      return {
        success: false,
        message: orders.message,
        user: userString,
        orders: "[]",
      };
    }
    return { success: true, user: userString, orders: orderString };
  } catch (err: any) {
    console.log("Error : ", err.message);
    return { success: false, user: "", orders: "[]" };
  }
}

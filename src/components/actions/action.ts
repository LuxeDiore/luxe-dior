// import Product from "../database/schema/ProductSchema";
"use server";

import User from "../../database/schema/UserSchema";
import Order from "../../database/schema/OrderSchema";
import { currentUser } from "@clerk/nextjs/server";
import databasesConnect from "@/lib/db";
import { productInfo } from "@/types/product";
import Product from "@/database/schema/ProductSchema";
// Product Controller
export async function getLatestProducts() {
  try {
    await databasesConnect();
    const products: productInfo[] = await Product.find()
      .sort({ createdAt: -1 })
      .limit(4);
    const productsString: string = JSON.stringify(products);
    return {
      success: true,
      message: "Fetched all latest products",
      products: productsString,
    };
  } catch (err: any) {
    console.log(err);
    return { success: false, message: "Something went wrong.", products: "[]" };
  }
}
export async function getBestSellerProducts() {
  try {
    await databasesConnect();
    const products = await Product.find()
      .sort({ productSold: -1, averageRating: -1 })
      .limit(4);
    const productsString = JSON.stringify(products);
    return {
      success: true,
      message: "Fetched all latest products",
      products: productsString,
    };
  } catch (err: any) {
    console.log(err);
    return { success: false, message: "Something went wrong.", products: "[]" };
  }
}

export async function getAllProducts({ type }: { type: string }) {
  try {
    await databasesConnect();
    const products = await Product.find({ category: type });
    const productsString = JSON.stringify(products);
    return {
      success: true,
      message: "Fetched all latest products",
      products: productsString,
    };
  } catch (err: any) {
    console.log(err);
    return { success: false, message: "Something went wrong.", products: "[]" };
  }
}

// User Controller
export async function getSelfDetail({ clerkId }: { clerkId: string }) {
  try {
    await databasesConnect();
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return {
        success: false,
        message: "Please login to access this page.",
        user: "{}",
        orders: "[]",
      };
    }
    const user = await User.findOne({ clerkId: clerkUser.id });
    const myOrders = await Order.find({ user: user._id! });

    const userString = JSON.stringify(clerkUser);
    const myOrdersString = JSON.stringify(myOrders);

    return {
      success: true,
      message: "Fetched Successfully.",
      user: userString,
      myOrders: myOrdersString,
    };
  } catch (err: any) {
    console.log(err);
    return {
      success: false,
      message: "Something went wrong.",
      user: "{}",
      myOrders: "[]",
    };
  }
}

// Order Controller

export async function getSelfOrders({ clerkId }: { clerkId: string }) {
  try {
    await databasesConnect();
    const user = await User.findOne({ clerkId: clerkId });

    if (!user) {
      return {
        success: false,
        message: "Please login to access this page.",
        orders: "[]",
      };
    }

    const userId = user._id;

    const orders = await Order.find({ user: userId });

    return { success: true, message: "Orders fetched successfully.", orders };
  } catch (err: any) {
    console.log(err);
    return { success: false, message: "Something went wrong.", orders: "[]" };
  }
}

export async function getUser() {
  try {
    // const user = await currentUser();
    if (user == null) return { success: true, user: "" };
    const userString = JSON.stringify(user);
    return { success: true, user: userString };
  } catch (err: any) {
    return {
      error: err.message,
      success: false,
    };
  }
}

import Product from "@/database/schema/ProductSchema";
import User from "@/database/schema/UserSchema";
import Order from "@/database/schema/OrderSchema";
import { currentUser } from "@clerk/nextjs/server";

// Product Controller
export async function getLatestProducts() {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(5);
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
export async function getBestSellerProducts() {
  try {
    const products = await Product.find()
      .sort({ productSold: -1, averageRating: -1 })
      .limit(5);
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
    const user = await User.findOne({ clerkId: clerkId });

    if (!user) {
      return { success: false, message: "No user found.", orders: "[]" };
    }

    const userId = user._id;

    const orders = await Order.find({ user: userId });

    return { success: true, message: "Orders fetched successfully.", orders };
  } catch (err: any) {
    console.log(err);
    return { success: false, message: "Something went wrong.", orders: "[]" };
  }
}

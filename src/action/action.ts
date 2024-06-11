import Product from "@/database/schema/ProductSchema";
import User from "@/database/schema/UserSchema";
import Order from "@/database/schema/OrderSchema";

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
    const user = await User.findOne({ clerkId: clerkId });
    const myOrders = await Order.find({ user: user._id! });

    const userString = JSON.stringify(user);
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

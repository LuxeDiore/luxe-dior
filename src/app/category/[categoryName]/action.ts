"use server";

import dbConnect from "@/lib/db";
import Product from "@/database/schema/ProductSchema";
import { productInfo } from "@/types/product";
export async function getProductsCategoryWiseServerHandler({
  category,
}: {
  category: string;
}) {
  try {
    await dbConnect();
    const products: productInfo[] = await Product.find({
      category: category,
    });
    const productStrings = JSON.stringify(products);
    return {
      success: true,
      message: "Fetched all products.",
      productStrings,
    };
  } catch (err: any) {
    console.log(err.message);
    return {
      success: false,
      message: "Something went wrong",
      productStrings: "[]",
    };
  }
}

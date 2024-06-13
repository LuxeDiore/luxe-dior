"use server";
import Product from "@/database/schema/ProductSchema";
import dbConnect from "@/lib/db";
export async function getProductDetailsServerHandler({
  productId,
}: {
  productId: string;
}) {
  try {
    await dbConnect();
    const product = await Product.findById(productId);

    if (!product) {
      return {
        success: false,
        message: "There is no product with this id.",
        product: "{}",
      };
    }
    const productString = JSON.stringify(product);
    return {
      success: true,
      message: "Product fetched successfully",
      product: productString,
    };
  } catch (err: any) {
    console.log("error : ", err.message);
    return {
      success: false,
      message: "Something went wrong",
      product: "{}",
    };
  }
}

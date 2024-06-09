"use server";
import { currentUser } from "@clerk/nextjs/server";
import Product from "../../../database/schema/ProductSchema";
import databasesConnect from "@/lib/db";
import { productInfo, variantInfo } from "@/types/product";

export async function createProductServerHandler({
  item,
  variants,
}: {
  item: productInfo;
  variants: variantInfo[];
}) {
  try {
    await databasesConnect();
    const user = await currentUser();

    if (!user?.id || !user.emailAddresses[0].emailAddress) {
      throw new Error("Please login to perform this operation.");
    }

    const product = await Product.create({
      title: item.title,
      description: item.description,
      price: item.price,
      stock: item.stock,
      quantity: item.quantity,
      category: item.category,
      variants: variants,
      variantsCount: variants.length,
    });

    return { success: true };
  } catch (err: any) {
    throw new Error("Error Occured : ", err.message);
  }
}

export async function getAllProductsHandler() {
  try {
    await databasesConnect();
    const products: productInfo[] = await Product.find();
    return products;
  } catch (err: any) {
    throw new Error(err.message);
  }
}

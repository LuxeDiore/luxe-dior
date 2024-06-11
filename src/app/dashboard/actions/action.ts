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

    await Product.create({
      title: item.title,
      description: item.description,
      price: item.price,
      stock: item.stock,
      quantity: item.quantity,
      category: item.category,
      variants: variants,
      variantsCount: variants.length,
    });

    return { success: true, message: "Product created successfully!!" };
  } catch (err: any) {
    console.log("err message: ", err.message);
    console.log("err stack: ", err.stack);
    return {
      success: false,
      message: "Some error occured.",
    };
    // throw new Error("Error Occured : ", err.message);
  }
}

export async function updateProductServerHandler({
  id,
  data,
}: {
  id: string;
  data: productInfo;
}) {
  try {
    await databasesConnect();
    const product = await Product.findById(id);

    if (!product) {
      throw new Error("No product found.");
    }
    product.category = data.category;
    product.description = data.description;
    product.price = data.price;
    product.quantity = data.quantity;
    product.stock = data.stock;
    product.title = data.title;
    product.variants = data.variants;
    product.variantsCount = data.variants.length;

    await product.save();

    return { success: true, message: "Product updated successfully." };
  } catch (err) {
    console.log("err : ", err);
    return { success: false, message: "Some error occured." };
  }
}

export async function getAllProductsServerHandler() {
  try {
    await databasesConnect();
    const products: productInfo[] = await Product.find();
    const productsString: string = JSON.stringify(products);
    return {
      success: true,
      products: productsString,
      message: "All products fetched",
    };
  } catch (err: any) {
    console.log("err : ", err);
    return {
      success: false,
      message: "Some error occured.",
      products: "[]",
    };
    // throw new Error(err.message);
  }
}

export async function deleteProductServerHandler({ id }: { id: string }) {
  try {
    await Product.findByIdAndDelete(id);
    return {
      success: true,
      message: "Product deleted successfully!!",
    };
  } catch (err) {
    return {
      success: false,
      message: "Some error occured.",
    };
  }
}

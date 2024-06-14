"use server";
import Product from "@/database/schema/ProductSchema";
import dbConnect from "@/lib/db";
import { User as ClerkUser, currentUser } from "@clerk/nextjs/server";
import { configType } from "./page";
import UserDb from "@/database/schema/UserSchema";
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
import { User, cartItem } from "@/types/user";

export async function addToCartServerHandler({
  details,
}: {
  details: configType;
}) {
  try {
    await dbConnect();
    const user: ClerkUser | null = await currentUser();
    if (!user) {
      return {
        success: false,
        message: "Plase login to access this page",
      };
    }
    const userDb = await UserDb.findOne({ clerkId: user?.id });

    if (!userDb) {
      return {
        success: false,
        message: "No user exist in database.",
      };
    }
    let Cartkey = -1;
    const item: cartItem[] | undefined = userDb?.cartItems?.filter(
      (item: cartItem, key: number) => {
        if (
          item?.productId?.toString() === details.productId &&
          details?.variantId === item?.variantId
        ) {
          Cartkey = key;
          return item;
        }
      }
    );

    // is the item already in cart
    if (item && item.length) {
      userDb.cartItems[Cartkey].itemQuantity = details.itemQuantity;
    } else {
      userDb.cartItems.push(details);
    }
    await userDb.save();
    return { success: true, message: "Item added to cart successfully!!" };
  } catch (err) {
    console.log("error : ", err);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

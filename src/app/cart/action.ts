"use server";
import User from "@/database/schema/UserSchema";
import { currentUser, User as ClerkUser } from "@clerk/nextjs/server";
import { configType } from "./page";
import { User as UserType, cartItem, cartItemFilled } from "@/types/user";
import dbConnect from "@/lib/db";

export async function getCartItemsServerHandler() {
  try {
    await dbConnect();
    const user: ClerkUser | null = await currentUser();
    if (!user) {
      return {
        success: false,
        statusCode: 400,
        message: "Please login to access this page.",
        cartItemsString: "",
      };
    }
    const dbUser: UserType | null = await User.findOne({
      clerkId: user.id,
    }).populate({
      path: "cartItems",
      populate: {
        path: "productId",
        model: "Product",
        select: ["stock"],
      },
    });

    if (!dbUser) {
      return {
        success: false,
        statusCode: 400,
        message: "Please login to access this page.",
        cartItemsString: "",
      };
    }

    const cartItems: cartItem[] = dbUser.cartItems;
    const cartItemsString = JSON.stringify(cartItems);

    return {
      success: true,
      message: "Cart Items fetched successfully.",
      cartItemsString: cartItemsString,

      statusCode: 200,
    };
  } catch (err: any) {
    console.log("error : ", err.message);
    return {
      success: false,
      statusCode: err.statusCode,
      message: err.message,
      cartItemsString: "",
    };
  }
}

export async function updateCartServerHandler({
  type,
  productId,
  variantId,
  newItemQuantity,
}: {
  type: "delete" | "update";
  productId: string;
  variantId: number;
  newItemQuantity: number;
}) {
  try {
    await dbConnect();
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return {
        success: false,
        message: "Please login to access this page.",
      };
    }
    const dbUser = await User.findOne({
      clerkId: clerkUser.id,
    }).populate({
      path: "cartItems",
      populate: {
        path: "productId",
        model: "Product",
        select: ["stock"],
      },
    });
    if (!dbUser) {
      return {
        success: false,
        message: "Please login to access this page.",
      };
    }

    if (type === "update") {
      let Cartkey = -1;
      const item: cartItemFilled[] | undefined = dbUser?.cartItems?.filter(
        (item: cartItemFilled, key: number) => {
          if (
            item?.productId?._id.toString() === productId &&
            variantId === item?.variantId
          ) {
            Cartkey = key;
            return item;
          }
        }
      );
      dbUser.cartItems[Cartkey].itemQuantity = newItemQuantity;
    } else {
      const newCartItems: cartItemFilled[] = dbUser.cartItems.filter(
        (item: cartItemFilled) => {
          if (
            item?.productId?._id.toString() !== productId ||
            variantId !== item?.variantId
          ) {
            return item;
          }
        }
      );

      dbUser.cartItems = newCartItems;
    }
    await dbUser.save();
    return {
      success: true,
      message:
        type === "delete"
          ? "Item removed from cart."
          : "Item Quantity updated.",
    };
  } catch (err: any) {
    console.log(err);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

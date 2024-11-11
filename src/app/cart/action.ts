"use server";
import User from "@/database/schema/UserSchema";
import { currentUser, User as ClerkUser } from "@clerk/nextjs/server";
import { User as UserType, cartItem, cartItemFilled } from "@/types/user";
import dbConnect from "@/lib/db";
import Product from "@/database/schema/ProductSchema"; // Check this path
import axios from "axios";
import { getUser } from "@/components/actions/action";
import shajs from "sha.js";

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
      statusCode: 500,
      message: "Something went wrong",
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

export async function redirectPayment(price: number) {
  try {
    const MERCHANT_ID = process.env.PHONE_PAY_MERCHANT_ID;
    const PHONE_PE_HOST_URL = process.env.PHONE_PAY_LINK;
    const SALT_INDEX = process.env.PHONE_PAY_SALT_INDEX;
    const SALT_KEY = process.env.PHONE_PAY_SALT_KEY;
    const APP_BE_URL = process.env.PHONE_PAY_APP_BE_URL; // our application
    price = 1;
    let user: ClerkUser | null = await currentUser();
    if (user == null) {
      return {
        success: false,
        message: "Please login to access this page;",
        redirectUrl: "",
      };
    }
    let userId = user.id!;
    // let userId = "MUID123";
    const merchantTransactionId = "M" + Date.now();
    let normalPayLoad = {
      merchantId: MERCHANT_ID, //* PHONEPE_MERCHANT_ID . Unique for each account (private)
      merchantTransactionId: merchantTransactionId,
      merchantUserId: userId,
      amount: price * 100, // converting to paise
      redirectUrl: `${APP_BE_URL}`,
      callbackUrl: `${APP_BE_URL}`,
      redirectMode: "REDIRECT",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };
    // make base64 encoded payload
    let bufferObj = Buffer.from(JSON.stringify(normalPayLoad), "utf8");
    let base64EncodedPayload = bufferObj.toString("base64");

    // X-VERIFY => SHA256(base64EncodedPayload + "/pg/v1/pay" + SALT_KEY) + ### + SALT_INDEX
    let string = base64EncodedPayload + "/pg/v1/pay" + SALT_KEY;
    const sha256_val = shajs("sha256").update(string).digest("hex");
    //const sha256_val = crypto.createHash("sha256").update(string).digest("hex");
    let xVerifyChecksum = sha256_val + "###" + SALT_INDEX;
    // return;

    const data = {
      request: base64EncodedPayload,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": xVerifyChecksum,
        accept: "application/json",
      },
    };
    const { data: serverData } = await axios.post(
      PHONE_PE_HOST_URL!,
      data,
      config
    );
    const { instrumentResponse } = serverData.data;
    return {
      redirectUrl: instrumentResponse.redirectInfo.url,
      message: "Initializing payment...",
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      redirectUrl: "",
    };
  }
}

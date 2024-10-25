"use client";
import React, { useEffect, useState } from "react";
import { getCartItemsServerHandler, updateCartServerHandler } from "./action";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CartItemCard from "./components/cartItemCard";
import {
  Loader2,
  Lock,
  LockIcon,
  LockKeyhole,
  ShoppingBasketIcon,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
export interface configType {
  basePrice: number;
  variantName: string;
  additionalCost: number;
  images: string[];
  quantity: number;
  itemQuantity: number;
  productId: {
    _id: string;
    stock: number;
  };

  category: string;
  title: string;
  variantId: number;
}

const Page = () => {
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState<configType[] | null>(null);
  const getTotal = (cartItemsRes: configType[]) => {
    let sum = 0;
    for (let ele of cartItemsRes) {
      let temp = ele.additionalCost + ele.basePrice;
      temp *= ele.itemQuantity;
      sum += temp;
    }
    setTotal(sum);
  };
  const getCartItems = async () => {
    const res = await getCartItemsServerHandler();

    const cartItemsString = res.cartItemsString;
    if (cartItemsString != "") {
      const cartItemsRes: configType[] = JSON.parse(cartItemsString);
      setCartItems(cartItemsRes);
      getTotal(cartItemsRes);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);
  return (
    <MaxWidthWrapper className="py-10 flex flex-col gap-10  ">
      <h1 className="flex gap-2 text-5xl font-semibold justify-left items-center">
        Cart
      </h1>
      {cartItems === null ? (
        <div className="w-full flex justify-center h-full items-center col-span-4 min-h-[20rem] flex-col gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
          <h3 className="font-semibold text-xl">Loading...</h3>
        </div>
      ) : (
        <>
          {cartItems?.length === 0 ? (
            <div className="w-full flex justify-center h-full items-center col-span-4 min-h-[20rem] flex-col gap-2">
              <p className="text-4xl md:text-5xl font-bold space-x-4">
                No items in cart
              </p>
              <Link
                href="/"
                className={cn(
                  buttonVariants({
                    variant: "secondary",
                    size: "lg",
                  }),
                  "flex gap-2 items-center justify-center"
                )}
              >
                <ShoppingBasketIcon className="w-5 h-5" /> Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="flex cart-main-container">
              {/* Cart Items */}
              <ScrollArea className="max-h-[40rem] px-3">
                <div className="flex flex-col items-start justify-center ">
                  {cartItems?.map((item, key: number) => {
                    return (
                      <CartItemCard
                        getCartItems={getCartItems}
                        key={key}
                        index={key}
                        cartItem={item}
                        cartItems={cartItems}
                        setCartItems={setCartItems}
                        getTotal={getTotal}
                      />
                    );
                  })}
                </div>
              </ScrollArea>
              {/* Cart Total */}
              <div className="flex flex-col gap-5">
                <h1 className="text-4xl font-semibold">Total</h1>
                <ScrollArea className="max-h-[40rem] w-[100%]">
                  <div className="flex flex-col items-start justify-center w-full">
                    {cartItems?.map((item: configType, key: number) => {
                      return (
                        <div
                          key={key}
                          className="grid grid-cols-10 gap-2 md:gap-11 items-start w-[100%]"
                        >
                          <p className="text-wrap text-sm md:text-lg col-span-7">
                            {item.title} ({item.variantName})
                          </p>
                          <p className="text-sm md:text-lg col-span-3 ">
                            Rs. {item.basePrice + item.additionalCost} x{" "}
                            {item.itemQuantity}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
                <div className="grid grid-cols-10 gap-2 md:gap-11 items-start w-[calc(min(30rem , 80vw))]">
                  <p className="text-wrap text-sm md:text-lg col-span-7 font-extrabold space-x-5">
                    Total (Excluding GST)
                  </p>
                  <p className="text-sm md:text-lg col-span-3 space-x-5 font-extrabold">
                    Rs. {total}
                  </p>
                </div>
                <div className="w-full">
                  <Button className="w-full bg-green-500 flex gap-2 items-center justify-center text-lg font-semibold">
                    Pay now <LockKeyhole className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </MaxWidthWrapper>
  );
};

export default Page;

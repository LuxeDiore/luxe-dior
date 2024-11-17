"use client";
import React, { useEffect, useState } from "react";
import {
  createOrder,
  getCartItemsServerHandler,
  redirectPayment,
  updateCartServerHandler,
} from "./action";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CartItemCard from "./components/cartItemCard";
import { useToast } from "@/components/ui/use-toast";
import Product from "@/database/schema/ProductSchema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
import { useRouter } from "next/navigation";
import { getUserName } from "@/components/actions/action";
import { OrderItemconfigType } from "@/types/order";
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
  const { toast } = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState({
    addressline1: "",
    city: "",
    state: "",
    country: "",
    phoneNumber: 0,
    pinCode: "",
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  let deliveryCharge = 100;
  const getTotal = (cartItemsRes: configType[]) => {
    let sum = 0;
    for (let ele of cartItemsRes) {
      let temp = ele.additionalCost + ele.basePrice;
      temp *= ele.itemQuantity;
      sum += temp;
    }
    sum += deliveryCharge;
    setTotal(sum);
  };

  const paymentHandler = async () => {
    const user = await getUserName();

    if (user.success == false) {
      toast({
        variant: "destructive",
        title: "Please login to access this page",
      });
      router.push("/");
      return;
    }
    if (
      formData.addressline1.trim() == "" ||
      formData.city.trim() == "" ||
      formData.country.trim() == "" ||
      formData.pinCode.trim() == "" ||
      formData.state.trim() === "" ||
      formData.phoneNumber.toLocaleString().trim().length < 9
    ) {
      toast({
        variant: "destructive",
        title:
          "Please fill in valid details in  all fields in the address form",
      });
      return;
    }
    const userName = user.name;
    const clerkId = JSON.parse(user.clerkId!);
    const res = await redirectPayment(total);
    let items: OrderItemconfigType[] = [];
    for (let i = 0; i < cartItems!.length; i++) {
      let orderItem: OrderItemconfigType = {
        basePrice: cartItems![i].basePrice,
        productId: cartItems![i].productId._id,
        quantity: cartItems![i].itemQuantity,
        variantId: cartItems![i].variantId,
      };
      items.push(orderItem);
    }
    if (res!.success) {
      // create a  transaction
      const order = {
        user: { clerkId: clerkId, userName: userName },
        deliveryCharge: deliveryCharge,
        shippingAddress: {
          addressline1: formData.addressline1,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          pinCode: formData.pinCode,
          phoneNumber: formData.phoneNumber.toString(),
        },
        orderValue: total - deliveryCharge,
        orderStatus: "PAYMENT PENDING",
        paymentStatus: res.code,
        paymentId: res.merchantTransactionId,
        items: items,
      };

      localStorage.setItem("paymentId", res.merchantTransactionId as string);
      const { success } = await createOrder(order);
      toast({
        title: res!.message,
        variant: "default",
      });
      if (success == true) {
        setTimeout(() => {
          router.push(res!.redirectUrl);
        }, 1500);
      } else {
        toast({
          title: "Failed to initiate transaction. Please try again",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: res!.message,
        variant: "destructive",
      });
    }
  };
  const getCartItems = async () => {
    const res = await getCartItemsServerHandler();
    if (res.success == false) {
      toast({
        title: res.message,
        variant: "destructive",
      });
      router.push("/");
    }
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
              <div className="flex  flex-col-reverse gap-4">
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
                      Delivery Charge
                    </p>
                    <p className="text-sm md:text-lg col-span-3 space-x-5 font-extrabold">
                      Rs. {deliveryCharge}
                    </p>
                  </div>
                  <div className="grid grid-cols-10 gap-2 md:gap-11 items-start w-[calc(min(30rem , 80vw))]">
                    <p className="text-wrap text-sm md:text-lg col-span-7 font-extrabold space-x-5">
                      Total
                    </p>
                    <p className="text-sm md:text-lg col-span-3 space-x-5 font-extrabold">
                      Rs. {total}
                    </p>
                  </div>
                  <div className="w-full">
                    <Button
                      onClick={paymentHandler}
                      className="w-full bg-green-500 flex gap-2 items-center justify-center text-lg font-semibold"
                    >
                      Pay now <LockKeyhole className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
                {/* Addresss */}
                <div className="flex flex-col gap-5">
                  <Card className="shipping-address-card w-[90vw]">
                    <CardHeader>
                      <CardTitle>Shipping Address</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="addressline1">Address Line 1</Label>
                            <Input
                              id="addressline1"
                              name="addressline1"
                              value={formData.addressline1}
                              onChange={handleChange}
                              placeholder="123 Main Street"
                            />
                          </div>
                          <div>
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              placeholder="Your City"
                            />
                          </div>
                          <div>
                            <Label htmlFor="state">State</Label>
                            <Input
                              id="state"
                              name="state"
                              value={formData.state}
                              onChange={handleChange}
                              placeholder="Your State"
                            />
                          </div>
                          <div>
                            <Label htmlFor="country">Country</Label>
                            <Input
                              id="country"
                              name="country"
                              value={formData.country}
                              onChange={handleChange}
                              placeholder="Your Country"
                            />
                          </div>
                          <div>
                            <Label htmlFor="pinCode">Pin Code</Label>
                            <Input
                              id="pinCode"
                              name="pinCode"
                              value={formData.pinCode}
                              onChange={handleChange}
                              placeholder="123456"
                            />
                          </div>
                          <div>
                            <Label htmlFor="phoneNumber">Phone Number</Label>
                            <Input
                              id="phoneNumber"
                              name="phoneNumber"
                              value={formData.phoneNumber}
                              onChange={handleChange}
                              placeholder="123456"
                            />
                          </div>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                  {/* <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">
                      Shipping Address
                    </h2>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label
                          htmlFor="addressline1"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Address Line 1
                        </label>
                        <input
                          type="text"
                          id="addressline1"
                          name="addressline1"
                          value={formData.addressline1}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="123 Main Street"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Your City"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium text-gray-700"
                        >
                          State
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Your State"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Country
                        </label>
                        <input
                          type="text"
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Your Country"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="pinCode"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Pin Code
                        </label>
                        <input
                          type="text"
                          id="pinCode"
                          name="pinCode"
                          value={formData.pinCode}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="123456"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Submit
                      </button>
                    </form>
                  </div> */}
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

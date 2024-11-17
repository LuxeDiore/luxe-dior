import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SquareArrowOutUpRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Hr } from "@react-email/components";

const OrderItems = ({ orderItems }: { orderItems: any }) => {
  console.log(orderItems);

  return (
    <Dialog>
      <DialogTrigger>
        <SquareArrowOutUpRight className="h-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order Items </DialogTitle>
        </DialogHeader>
        <div className="w-full">
          {orderItems.map((item: any, key: number) => {
            const variantId = item?.variantId;
            const quantity = item?.quantity;
            const basePrice = item?.basePrice;
            const itemName = item?.productId?.title;
            const image = item?.productId?.variants[variantId]?.images[0];
            const variantPrice =
              item?.productId?.variants[variantId]?.additionalCost;
            const itemId = item?.productId?._id;
            return (
              <div className="flex gap-2 flex-col" key={key}>
                <div
                  className="w-full flex flex-row gap-2  items-center"
                  key={key}
                >
                  <img src={image} className="h-14 w-14 rounded-xl" alt="" />
                  <div className="flex gap-2 flex-col items-center md:flex-row justify-between w-full pl-1 pr-1">
                    <p className="text-center">{itemName}</p>
                    <p>x {quantity}pcs</p>
                    <p>₹{basePrice + variantPrice}</p>
                  </div>
                  <Link href={`/product/${itemId}`}>
                    <SquareArrowOutUpRight className="h-4 " />
                  </Link>
                </div>
                <Hr />
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderItems;

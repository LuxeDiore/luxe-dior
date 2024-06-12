import React, { useEffect, useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CircleArrowOutUpRight, Trash2 } from "lucide-react";
import Link from "next/link";
import ModifyProductInfo from "./ModifyProductInfo";
import { productInfo } from "@/types/product";
import {
  deleteProductServerHandler,
  getAllProductsServerHandler,
} from "../../actions/action";
import { useToast } from "@/components/ui/use-toast";

const ProductCard = ({
  item,
  setItems,
}: {
  item: productInfo;
  setItems: React.Dispatch<React.SetStateAction<productInfo[]>>;
}) => {
  const { toast } = useToast();
  async function deleteProduct() {
    await deleteProductServerHandler({ id: item._id! }).then(async (data) => {
      if (data.success) {
        toast({
          title: data.message,
          variant: "default",
        });
        const res = await getAllProductsServerHandler();
        const products = JSON.parse(res.products!);
        setItems(products);
      } else {
        toast({
          title: data.message,
          variant: "destructive",
        });
      }
    });
  }
  return (
    <div className="product-card-dashboard border-2 rounded-xl overflow-hidden flex flex-col gap-4">
      <img
        src={item?.variants[0]?.images[0] as string}
        alt={item?.variants[0]?.name as string}
        className="w-full object-fill h-[25rem]"
      />

      <div className="description pb-2">
        <div className="buttons  w-full flex justify-center items-center gap-2">
          <Link
            href={`/product/${item?._id}`}
            className={cn(
              buttonVariants({
                size: "sm",
                variant: "secondary",
              })
            )}
          >
            <CircleArrowOutUpRight className="w-5 h-5" />
          </Link>
          <ModifyProductInfo
            setItems={setItems}
            productInfo={item}
            type="edit"
          />
          <Button
            className={cn(
              buttonVariants({
                size: "sm",
                variant: "destructive",
              })
            )}
            onClick={deleteProduct}
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

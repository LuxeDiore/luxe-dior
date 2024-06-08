import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CircleArrowOutUpRight,
  Edit,
  Info,
  SquareArrowUpRight,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import EditProductComponent from "./EditProductComponent";
import { productInfo } from "@/types/product";

const ProductCardDashboard = ({ item }: { item: productInfo }) => {
  return (
    <div className="product-card-dashboard border-2 rounded-xl overflow-hidden flex flex-col gap-2">
      <img
        src={item?.variants[0]?.images[0] as string}
        alt={item?.variants[0]?.name as string}
        className="w-full object-fill h-[18rem]"
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
          <EditProductComponent prod={item} />
          <Button
            className={cn(
              buttonVariants({
                size: "sm",
                variant: "destructive",
              })
            )}
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardDashboard;

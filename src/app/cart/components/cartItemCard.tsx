import React, { useEffect, useState } from "react";
import { configType } from "../page";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { updateCartServerHandler } from "../action";
import { useToast } from "@/components/ui/use-toast";

const CartItemCard = ({
  cartItem,
  getCartItems,
  index,
  setCartItems,
  cartItems,
}: {
  cartItem: configType;
  getCartItems: () => Promise<void>;
  index: number;
  setCartItems: React.Dispatch<React.SetStateAction<configType[] | null>>;
  cartItems: configType[];
}) => {
  const [item, setItem] = useState<configType>({
    additionalCost: 0,
    basePrice: 0,
    category: "",
    images: [],
    itemQuantity: 0,
    productId: {
      _id: "",
      stock: 0,
    },
    quantity: 0,
    title: "",
    variantId: 0,
    variantName: "",
  });
  const { toast } = useToast();

  const updateCartHandler = async ({
    type,
    action,
  }: {
    type: "delete" | "update";
    action?: "increase" | "decrease";
  }) => {
    if (type === "update") {
      let newItemQuantity = item.itemQuantity;
      if (action === "decrease") {
        newItemQuantity -= 1;
        if (item?.itemQuantity === 1) {
          toast({
            title: "Item removed from cart.",
            variant: "default",
          });
          await updateCartServerHandler({
            type: "delete",
            newItemQuantity: 0,
            productId: item?.productId?._id,
            variantId: item?.variantId,
          }).then(async () => {
            await getCartItems();
          });

          return;
        }
      } else {
        if (item.itemQuantity < item.productId.stock) {
          newItemQuantity += 1;
        }
      }
      setItem({
        ...item,
        itemQuantity: newItemQuantity,
      });
      let newCartItems: configType[] = cartItems;
      newCartItems[index].itemQuantity = newItemQuantity;
      setCartItems(newCartItems);
      await updateCartServerHandler({
        newItemQuantity: newItemQuantity,
        productId: item?.productId?._id,
        type: "update",
        variantId: item?.variantId,
      });
    } else {
      await updateCartServerHandler({
        type: "delete",
        newItemQuantity: 0,
        productId: item?.productId?._id,
        variantId: item?.variantId,
      });
      toast({
        title: "Item removed from cart.",
        variant: "default",
      });
    }
    await getCartItems();

    // window.location.reload();
  };
  useEffect(() => {
    setItem(cartItem);
  }, []);
  return (
    <div className="h-[27rem] md:h-[7rem] flex gap-3 mb-3 border-4 rounded-xl overflow-hidden w-[100%] md:w-[40rem] flex-col md:flex-row ">
      <img
        src={item.images[0]}
        alt=""
        className=" object-fill md:h-[7rem] h-[15rem] w-[100%] md:!min-w-[8rem] md:max-w-[8rem]"
      />
      <div className="flex gap-1 flex-col w-[100%] justify-center items-center md:items-start md:w-[70%]">
        <p className="text-xl font-semibold">{item?.title}</p>
        <p className="text-sm text-gray-500 font-semibold">
          Rs. {item.basePrice + item.additionalCost} x {item.itemQuantity}
        </p>
        <Link
          className={cn(
            buttonVariants({
              variant: "secondary",
              size: "sm",
            }),
            "w-[10rem]"
          )}
          href={`/product/${item?.productId?._id!}`}
        >
          Go to Product
        </Link>
      </div>
      <div className="flex gap-5 h-full w-full justify-center md:justify-end  pr-5 items-center">
        {/* Update Quantity */}
        <div className="flex gap-2 items-center justify-center">
          <button
            className="border rounded-xl w-[2rem] h-[2rem]"
            onClick={() => {
              updateCartHandler({
                type: "update",
                action: "decrease",
              });
            }}
          >
            -
          </button>
          {item?.itemQuantity}
          <button
            className="border rounded-xl w-[2rem] h-[2rem]"
            onClick={() => {
              updateCartHandler({
                type: "update",
                action: "increase",
              });
            }}
          >
            +
          </button>
        </div>
        {/* Delete item */}
        <div
          onClick={() => {
            updateCartHandler({
              type: "delete",
            });
          }}
          className={cn(
            buttonVariants({
              variant: "destructive",
              size: "sm",
            }),
            "cursor-pointer"
          )}
        >
          <Trash2 />
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;

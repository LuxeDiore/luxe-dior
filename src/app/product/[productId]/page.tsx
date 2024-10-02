"use client";
import React, { useEffect, useState } from "react";
import {
  addToCartServerHandler,
  getProductDetailsServerHandler,
} from "./action";
import { useToast } from "@/components/ui/use-toast";
import { productInfo } from "@/types/product";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  ArrowBigLeft,
  ArrowBigRight,
  Loader2,
  ShoppingBasket,
  ShoppingBasketIcon,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Rating } from "@mui/material";

export interface configType {
  basePrice: number;
  additionalCost: number;
  images: string[];
  quantity: number;
  itemQuantity: number;
  productId: string;
  category: string;
  title: string;
  variantId: number;
  variantName: string;
}
const Page = ({ params }: { params: { productId: string } }) => {
  const { toast } = useToast();

  const [product, setProduct] = useState<productInfo | null>({
    _id: "",
    averageRating: 0,
    title: "",
    description: "",
    price: 0,
    stock: 0,
    quantity: 0,
    ratings: [],
    reviews: [],
    category: "",
    variantsCount: 0,
    variants: [],
    productSold: 0,
  });
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [config, setConfig] = useState<configType>({
    basePrice: 0,
    additionalCost: 0,
    images: [],
    quantity: 0,
    itemQuantity: 0,
    productId: "",
    category: "",
    title: "",
    variantName: "",
    variantId: 0,
  });

  const addToCartHandler = async () => {
    if (!product || product?._id == "") return;
    try {
      setConfig({
        ...config,
        images: product?.variants[selectedVariant]?.images,
        additionalCost: product?.variants[selectedImage]?.additionalCost,
        itemQuantity: itemQuantity,
        variantId: selectedVariant,
      });

      const details: configType = {
        additionalCost: product?.variants[selectedVariant]?.additionalCost,
        basePrice: product?.price,
        category: product?.category,
        images: product?.variants[selectedVariant]?.images,
        quantity: product?.quantity,
        itemQuantity: itemQuantity,
        productId: product?._id!,
        title: product?.title,
        variantId: selectedVariant,
        variantName: product?.variants[selectedVariant]?.name,
      };
      const res = await addToCartServerHandler({ details });

      toast({
        title: res.message,
        variant: res?.success == false ? "destructive" : "default",
      });
    } catch (err: any) {
      console.log(err.message);
    }
  };
  const getProductDetails = async () => {
    const res = await getProductDetailsServerHandler({
      productId: params.productId,
    });

    if (res.success == false) {
      toast({
        title: res.message,
        variant: "destructive",
      });
      return;
    }
    const productString = res.product;
    const thisProduct: productInfo = JSON.parse(productString);
    setProduct(thisProduct);
    setConfig({
      ...config,
      basePrice: thisProduct.price,
      title: thisProduct.title,
      quantity: thisProduct.quantity,
      category: thisProduct.category,
    });
  };

  useEffect(() => {
    getProductDetails();
  }, []);
  return (
    <MaxWidthWrapper className="py-[4rem] lg:py-[10rem] flex gap-10 product-description-P-container">
      {product?._id === "" ? (
        <div className="w-full flex justify-center h-full items-center col-span-4 min-h-[20rem] flex-col gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
          <h3 className="font-semibold text-xl">Loading...</h3>
        </div>
      ) : (
        <>
          {/* carousel  */}
          <div className="relative w-[40vw] h-[33rem] border-2 rounded-xl overflow-hidden product-description-images">
            <Button
              className={cn(
                "absolute top-[45%] left-[2rem]",
                buttonVariants({
                  size: "sm",
                  variant: "secondary",
                })
              )}
              onClick={() => {
                if (!product) return;
                if (selectedImage == 0) {
                  setSelectedImage(
                    product?.variants[selectedVariant]?.images.length - 1
                  );
                } else {
                  setSelectedImage(selectedImage - 1);
                }
              }}
            >
              <ArrowBigLeft />
            </Button>

            <img
              src={product?.variants[selectedVariant]?.images[selectedImage]}
              className="!w-[100%] !h-[100%] !rounded-xl overflow-hidden object-fill"
            />
            <Button
              onClick={() => {
                if (!product) return;
                if (
                  selectedImage ==
                  product?.variants[selectedVariant]?.images?.length - 1
                ) {
                  setSelectedImage(0);
                } else {
                  setSelectedImage(selectedImage + 1);
                }
              }}
              className={cn(
                "absolute top-[45%] right-[2rem]",
                buttonVariants({
                  size: "sm",
                  variant: "secondary",
                })
              )}
            >
              <ArrowBigRight />
            </Button>
          </div>
          {/* Description */}
          <div className="flex gap-4 flex-col justify-start">
            <h1 className="text-5xl font-medium">{product?.title}</h1>
            <Rating value={product?.averageRating} readOnly />
            <span className="text-xl font-normal opacity-60">
              Rs. {product?.price}
            </span>
            <p className="text-lg opacity-60">{product?.description}</p>
            <div className="flex gap-3 flex-col">
              <h1 className="text-2xl ">Variants</h1>
              <div className="variants flex gap-2 flex-col">
                {product?.variants?.map((variant, key) => {
                  return (
                    <div
                      key={key}
                      className={cn(
                        "w-[80vw] md:w-[30rem] border rounded-xl p-2 flex gap-1 flex-col cursor-pointer",
                        key == selectedVariant && " border-4 border-white"
                      )}
                      onClick={() => {
                        setSelectedVariant(key);
                      }}
                    >
                      <h2 className="text-lg font-semibold">{variant?.name}</h2>
                      <p className="text-sm">+ ₹ {variant?.additionalCost}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="add-to-cart flex gap-4 ">
              <div className="quantity flex gap-2 justify-center items-center">
                <button
                  className="border rounded-xl w-[2rem] h-[2rem]"
                  disabled={product?.stock === 0 ? true : false}
                  onClick={() => {
                    if (itemQuantity === 1) {
                      return;
                    }

                    setItemQuantity(itemQuantity - 1);
                  }}
                >
                  -
                </button>
                {itemQuantity}
                <button
                  disabled={product?.stock === 0 ? true : false}
                  className="border rounded-xl w-[2rem] h-[2rem]"
                  onClick={() => {
                    if (itemQuantity === product?.stock) {
                      return;
                    }

                    setItemQuantity(itemQuantity + 1);
                  }}
                >
                  +
                </button>
              </div>
              <Button
                className="flex gap-2 text-lg h-[3rem] bg-green-400 hover:bg-green-600 w-[10rem]"
                size="lg"
                onClick={addToCartHandler}
              >
                Add to Cart <ShoppingBasketIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </MaxWidthWrapper>
  );
};

export default Page;

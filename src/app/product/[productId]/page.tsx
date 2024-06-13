"use client";
import React, { useEffect, useState } from "react";
import { getProductDetailsServerHandler } from "./action";
import { useToast } from "@/components/ui/use-toast";
import { productInfo } from "@/types/product";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ArrowBigLeft, ArrowBigRight, Loader2 } from "lucide-react";
import EmblaCarousel from "../components/EmblaCarousel";
import ImageSlider from "../components/productCarousel";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Rating } from "@mui/material";

const page = ({ params }: { params: { productId: string } }) => {
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

  const [config, setConfig] = useState({
    basePrice: 0,
    additionalCost: 0,
    images: [],
    quantity: 0,
    itemQuantity: 0,
    productId: "",
    category: "",
    title: "",
  });
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

  // setInterval(() => {
  //   if (!product) return;
  //   if (
  //     selectedImage ==
  //     product?.variants[selectedVariant]?.images?.length - 1
  //   ) {
  //     setSelectedImage(selectedImage + 1);
  //   } else {
  //     setSelectedImage(0);
  //   }
  // }, 2000);
  useEffect(() => {
    getProductDetails();
  }, []);
  return (
    <MaxWidthWrapper className="py-[10rem] flex gap-10 product-description-page-container">
      {/* carousel  */}
      <div className="relative w-[40vw] h-[30rem] border-2 rounded-xl overflow-hidden product-description-images">
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
        <div>
          <h1 className="text-2xl">Variants</h1>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default page;

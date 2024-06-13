import { productInfo } from "@/types/product";
import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Rating } from "@mui/material";
import Slider from "react-slick";
import { Button, buttonVariants } from "./ui/button";
import { Minus, Plus, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
const PerfumeCard = ({ item }: { item: productInfo }) => {
  var settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    fade: true,
  };
  const images = [];
  for (let ele of item.variants) {
    images.push(ele.images[0]);
  }

  return (
    <Link
      href={`/product/${item?._id}`}
      className="flex flex-col   rounded-xl overflow-hidden bg-[#202020] border border-[#555555] cursor-default product-card-client"
    >
      <Slider {...settings}>
        {images?.map((image, key) => {
          return (
            <div>
              <img
                src={image}
                key={key}
                className="h-[15rem] w-[100%]   object-cover"
              />
            </div>
          );
        })}
      </Slider>
      <div className="flex flex-col gap-2 py-3">
        <div className="w-full flex justify-center item-center text-sm">
          <Rating value={item?.averageRating} readOnly />(
          {item?.ratings?.length})
        </div>
        <div className="flex flex-col w-full items-center">
          <p
            className={cn(
              "text-lg font-semibold text-gray-300",
              "hover:underline cursor-pointer"
            )}
          >
            {item?.title}
          </p>
          <p className=" font-semibold text-gray-400 text-base">
            ₹{item?.price}
          </p>
          <p className=" font-semibold text-xs text-gray-400">
            ({item?.quantity} ml)
          </p>
        </div>
        {/* <div className="flex  gap-3 justify-center">
          <div className="flex justify-center gap-2 items-center">
            <button className="border w-7 h-7 rounded-xl flex justify-center items-center bg-slate-200 hover:bg-slate-400 text-black">
              <Minus className="w-4 h-4" />
            </button>
            <span className="flex justify-center items-center">
              {itemQuantity}
            </span>
            <button className="border w-7 h-7 rounded-xl flex justify-center items-center bg-slate-200 text-black hover:bg-slate-400">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <Button
            className="flex gap-2 hover:bg-green-600 hover:text-white font-semibold"
            size="sm"
          >
            Add to Cart <ShoppingBasket className="w-4 h-4" />{" "}
          </Button>
        </div> */}
      </div>
    </Link>
  );
};

export default PerfumeCard;

"use client";

import React, { useEffect, useState } from "react";
import ProductCardDashboard from "./ProductCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { productInfo } from "@/types/product";
import { Loader2 } from "lucide-react";

const ProductGrid = ({
  keyword,
  items,
  setItems,
}: {
  keyword: string;
  items: productInfo[];
  setItems: React.Dispatch<React.SetStateAction<productInfo[]>>;
}) => {
  // const items: productInfo[] = [
  //   {
  //     _id: "1",
  //     title: "Product 1",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore tenetur quis vel impedit tempore odio voluptate nihil repudiandae nam eveniet fuga laborum optio, velit voluptatum? Illum fugiat quaerat delectus amet optio possimus voluptatibus!",
  //     price: 200,
  //     stock: 30,
  //     quantity: 60,
  //     ratings: [
  //       {
  //         value: 3.5,
  //         user: "123456",
  //       },
  //       {
  //         value: 4.7,
  //         user: "123456",
  //       },
  //     ],
  //     reviews: [
  //       {
  //         review:
  //           "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea, quas dignissimos rem ipsa saepe tenetur eligendi impedit, neque eveniet repellendus suscipit quia et debitis ratione eaque ipsam eum odio dolore pariatur. Adipisci pariatur et, tempora, accusantium cupiditate distinctio a tempore suscipit autem culpa vero incidunt sit, dicta dolores in perspiciatis beatae expedita. Necessitatibus, architecto molestias?",
  //         user: "123456",
  //       },
  //       {
  //         review:
  //           "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea, quas dignissimos rem ipsa saepe tenetur eligendi impedit, neque eveniet repellendus suscipit quia et debitis ratione eaque ipsam eum odio dolore pariatur. Adipisci pariatur et, tempora, accusantium cupiditate distinctio a tempore suscipit autem culpa vero incidunt sit, dicta dolores in perspiciatis beatae expedita. Necessitatibus, architecto molestias?",
  //         user: "123456",
  //       },
  //       {
  //         review:
  //           "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea, quas dignissimos rem ipsa saepe tenetur eligendi impedit, neque eveniet repellendus suscipit quia et debitis ratione eaque ipsam eum odio dolore pariatur. Adipisci pariatur et, tempora, accusantium cupiditate distinctio a tempore suscipit autem culpa vero incidunt sit, dicta dolores in perspiciatis beatae expedita. Necessitatibus, architecto molestias?",
  //         user: "123456",
  //       },
  //     ],
  //     category: "special-edition",
  //     variantsCount: 2,
  //     variants: [
  //       {
  //         name: "variant 1",
  //         images: [
  //           "https://m.media-amazon.com/images/I/71uPszxlEHL.jpg",
  //           "https://assets.unileversolutions.com/v1/36023848.png",
  //         ],
  //         additionalCost: 0,
  //       },
  //       {
  //         name: "variant 2",
  //         images: [
  //           "https://m.media-amazon.com/images/I/71-N+yuTvkL.jpg",
  //           "https://m.media-amazon.com/images/I/51f1RWy13WL._AC_UF1000,1000_QL80_.jpg",
  //         ],
  //         additionalCost: 100,
  //       },
  //     ],
  //   },
  //   {
  //     _id: "2",
  //     title: "Product 2",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore tenetur quis vel impedit tempore odio voluptate nihil repudiandae nam eveniet fuga laborum optio, velit voluptatum? Illum fugiat quaerat delectus amet optio possimus voluptatibus!",
  //     price: 200,
  //     stock: 30,
  //     quantity: 60,
  //     ratings: [
  //       {
  //         value: 3.5,
  //         user: "123456",
  //       },
  //       {
  //         value: 4.7,
  //         user: "123456",
  //       },
  //     ],
  //     reviews: [
  //       {
  //         review:
  //           "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea, quas dignissimos rem ipsa saepe tenetur eligendi impedit, neque eveniet repellendus suscipit quia et debitis ratione eaque ipsam eum odio dolore pariatur. Adipisci pariatur et, tempora, accusantium cupiditate distinctio a tempore suscipit autem culpa vero incidunt sit, dicta dolores in perspiciatis beatae expedita. Necessitatibus, architecto molestias?",
  //         user: "123456",
  //       },
  //       {
  //         review:
  //           "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea, quas dignissimos rem ipsa saepe tenetur eligendi impedit, neque eveniet repellendus suscipit quia et debitis ratione eaque ipsam eum odio dolore pariatur. Adipisci pariatur et, tempora, accusantium cupiditate distinctio a tempore suscipit autem culpa vero incidunt sit, dicta dolores in perspiciatis beatae expedita. Necessitatibus, architecto molestias?",
  //         user: "123456",
  //       },
  //       {
  //         review:
  //           "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea, quas dignissimos rem ipsa saepe tenetur eligendi impedit, neque eveniet repellendus suscipit quia et debitis ratione eaque ipsam eum odio dolore pariatur. Adipisci pariatur et, tempora, accusantium cupiditate distinctio a tempore suscipit autem culpa vero incidunt sit, dicta dolores in perspiciatis beatae expedita. Necessitatibus, architecto molestias?",
  //         user: "123456",
  //       },
  //     ],
  //     category: "special-edition",
  //     variantsCount: 2,
  //     variants: [
  //       {
  //         name: "variant 1",
  //         images: [
  //           "https://m.media-amazon.com/images/I/71-N+yuTvkL.jpg",
  //           "https://m.media-amazon.com/images/I/51f1RWy13WL._AC_UF1000,1000_QL80_.jpg",
  //           "https://m.media-amazon.com/images/I/71uPszxlEHL.jpg",
  //           "https://assets.unileversolutions.com/v1/36023848.png",
  //         ],
  //         additionalCost: 0,
  //       },
  //       {
  //         name: "variant 2",
  //         images: [
  //           "https://m.media-amazon.com/images/I/71-N+yuTvkL.jpg",
  //           "https://m.media-amazon.com/images/I/51f1RWy13WL._AC_UF1000,1000_QL80_.jpg",
  //         ],
  //         additionalCost: 100,
  //       },
  //     ],
  //   },
  // ];
  const [pageNo, setPageNo] = useState(1);
  const itemsPerPage = 10;
  const nextPage = () => {
    const lastPossiblePage = Math.ceil(items.length / itemsPerPage);
    if (lastPossiblePage <= pageNo) return;
    setPageNo(pageNo + 1);
  };
  const prevPage = () => {
    if (pageNo == 1) return;
    setPageNo(pageNo - 1);
  };
  return (
    <>
      {items ? (
        <ScrollArea className="h-[calc(100vh-13rem)]">
          <div className="h-full justify-between flex flex-col gap-5">
            {items?.length == 0 ? (
              <div className="h-[calc(100vh-19rem)] w-full flex justify-center items-center text-3xl font-semibold text-slate-500 text-center">
                No products created
              </div>
            ) : (
              <div className="min-h-[calc(100vh-19rem)] grid product-grid-dashboard gap-y-5 py-4 ">
                {items
                  ?.filter((item, key1) => {
                    let tempKeyword = keyword.trim();
                    // if (tempKeyword.length === 0) return item;
                    let itemLowerCase = item.title.toLowerCase();
                    let keywordLowerCase = tempKeyword.toLowerCase();
                    let thisPageStartingElement = (pageNo - 1) * 10 + 1;
                    let thisPageEndingElement = pageNo * 10 + 1;

                    if (
                      (itemLowerCase === keywordLowerCase ||
                        itemLowerCase.includes(keywordLowerCase) ||
                        keywordLowerCase.includes(itemLowerCase)) &&
                      key1 + 1 >= thisPageStartingElement &&
                      key1 + 1 < thisPageEndingElement
                    ) {
                      return true;
                    }
                    return false;
                  })
                  ?.map((item, key) => {
                    return (
                      <>
                        <ProductCardDashboard
                          setItems={setItems}
                          item={item}
                          key={key}
                        />
                      </>
                    );
                  })}
              </div>
            )}

            <Pagination>
              <PaginationContent className="w-[90%]  flex justify-between">
                <PaginationItem>
                  <PaginationPrevious
                    onClick={prevPage}
                    className={cn(
                      buttonVariants({
                        variant: "secondary",
                      }),
                      "cursor-pointer"
                    )}
                  />
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext
                    onClick={nextPage}
                    className={cn(
                      buttonVariants({
                        variant: "secondary",
                      }),
                      "cursor-pointer"
                    )}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </ScrollArea>
      ) : (
        <div className="w-full flex justify-center h-full items-center col-span-4 min-h-[20rem] flex-col gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
          <h3 className="font-semibold text-xl">Loading...</h3>
        </div>
      )}
    </>
  );
};

export default ProductGrid;

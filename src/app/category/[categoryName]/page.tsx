"use client";
import React, { useEffect, useState } from "react";
import { getProductsCategoryWiseServerHandler } from "./action";
import { useToast } from "@/components/ui/use-toast";
import { productInfo } from "@/types/product";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import PerfumeCard from "@/components/PerfumeCard";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

const Page = ({ params }: { params: { categoryName: string } }) => {
  const { toast } = useToast();
  const [keyword, setKeyword] = useState("");

  const [items, setItems] = useState<productInfo[] | null>(null);
  const [pageNo, setPageNo] = useState(1);
  const itemsPerPage = 10;
  const getProductsCategoryWise = async () => {
    const res = await getProductsCategoryWiseServerHandler({
      category: params.categoryName,
    });

    if (!res.success) {
      toast({
        title: res.message,
        variant: "destructive",
      });
      setItems([]);
    } else {
      const products = JSON.parse(res.productStrings);
      setItems(products);
    }
  };
  const nextPage = () => {
    if (!items) return;
    const lastPossiblePage = Math.ceil(items.length / itemsPerPage);
    if (lastPossiblePage <= pageNo) return;
    setPageNo(pageNo + 1);
  };
  const prevPage = () => {
    if (!items) return;
    if (pageNo == 1) return;
    setPageNo(pageNo - 1);
  };
  useEffect(() => {
    getProductsCategoryWise();
  }, []);
  return (
    <MaxWidthWrapper className="py-10 gap-4 flex  flex-col">
      {items ? (
        <ScrollArea className="h-[calc(100vh-13rem)]">
          <div className="h-full justify-between flex flex-col gap-5">
            {items?.length == 0 ? (
              <div className="h-[calc(100vh-19rem)] w-full flex justify-center items-center text-3xl font-semibold text-slate-500 text-center">
                No products created
              </div>
            ) : (
              <div className="w-[100%] flex flex-col items-center gap-10">
                <div className="flex justify-between items-center w-full flex-col md:flex-row gap-2">
                  <h1 className="text-3xl md:text-4xl font-semibold">
                    All Products
                  </h1>
                  <Input
                    className="w-[15rem] products-searchbar-dashboard"
                    placeholder="Enter something"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </div>
                <div className="flex justify-center sm:grid flex-wrap grid-cols-4  gap-10 product-card-client-grid">
                  {items
                    ?.filter((item, key1) => {
                      let tempKeyword = keyword.trim();
                      // if (tempKeyword.length === 0) return item;
                      let itemLowerCase = item.title.toLowerCase();
                      let keywordLowerCase = tempKeyword.toLowerCase();
                      let thisPageStartingElement = (pageNo - 1) * 10 + 1;
                      let thisPageEndingElement = pageNo * 10 + 1;

                      if (
                        itemLowerCase === keywordLowerCase ||
                        itemLowerCase.includes(keywordLowerCase) ||
                        keywordLowerCase.includes(itemLowerCase)
                      ) {
                        return true;
                      }

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
                    .map((item, key) => {
                      return (
                        <>
                          <PerfumeCard item={item} key={key} />
                        </>
                      );
                    })}
                </div>
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
    </MaxWidthWrapper>
  );
};

export default Page;

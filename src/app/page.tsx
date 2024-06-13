"use client";

import {
  getBestSellerProducts,
  getLatestProducts,
} from "../components/actions/action";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PerfumeCard from "@/components/PerfumeCard";
import { productInfo } from "@/types/product";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [latestPerfumes, setLatestPerfumes] = useState<productInfo[] | null>(
    null
  );
  const [bestSellers, setBestSellers] = useState<productInfo[] | null>(null);
  const fetchProducts = async () => {
    const res1 = await getLatestProducts();
    const res2 = await getBestSellerProducts();
    const latestProductsString = res1.products;
    const bestSellerProductsString = res2.products;

    const latestProducts = JSON.parse(latestProductsString);
    const bestSellerProducts = JSON.parse(bestSellerProductsString);

    setLatestPerfumes(latestProducts);
    setBestSellers(bestSellerProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <MaxWidthWrapper>
      <div className="py-10 flex flex-col gap-20">
        {/* Latest Products */}
        <div className="w-full flex flex-col items-center gap-10 ">
          <h1 className="text-3xl md:text-4xl font-semibold">Latest</h1>
          <div className="flex justify-center sm:grid flex-wrap grid-cols-4  gap-10 product-card-client-grid ">
            {latestPerfumes ? (
              <>
                {latestPerfumes?.map((item, key) => (
                  <>
                    <PerfumeCard item={item} key={key} />
                  </>
                ))}
              </>
            ) : (
              <div className="w-full flex justify-center h-full items-center col-span-4 min-h-[20rem] flex-col gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
                <h3 className="font-semibold text-xl">Loading...</h3>
              </div>
            )}
          </div>
        </div>

        {/* Best Sellers */}
        <div className="w-full  flex flex-col items-center gap-10">
          <h1 className="text-3xl md:text-4xl font-semibold">Best Seller</h1>
          <div className="flex justify-center sm:grid flex-wrap grid-cols-4  gap-10 product-card-client-grid">
            {bestSellers ? (
              <>
                {bestSellers?.map((item, key) => (
                  <>
                    <PerfumeCard item={item} key={key} />
                  </>
                ))}
              </>
            ) : (
              <div className="w-full flex justify-center h-full items-center col-span-4 min-h-[20rem] flex-col gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
                <h3 className="font-semibold text-xl">Loading...</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

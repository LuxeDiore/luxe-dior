"use client";

import {
  getBestSellerProducts,
  getLatestProducts,
} from "../components/actions/action";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PerfumeCard from "@/components/PerfumeCard";
import { productInfo } from "@/types/product";
import { useEffect, useState } from "react";

export default function Home() {
  const [latestPerfumes, setLatestPerfumes] = useState<productInfo[]>([]);
  const [bestSellers, setBestSellers] = useState<productInfo[]>([]);
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
        <div className="w-full flex flex-col items-center gap-10">
          <h1 className="text-3xl md:text-4xl font-semibold">Latest</h1>
          <div className="flex justify-center sm:grid flex-wrap grid-cols-4  gap-10 product-card-client-grid ">
            {latestPerfumes?.map((item, key) => (
              <>
                <PerfumeCard item={item} key={key} />
              </>
            ))}
          </div>
        </div>

        {/* Best Sellers */}
        <div className="w-full  flex flex-col items-center gap-10">
          <h1 className="text-3xl md:text-4xl font-semibold">Best Seller</h1>
          <div className="flex justify-center sm:grid flex-wrap grid-cols-4  gap-10 product-card-client-grid">
            {bestSellers?.map((item, key) => (
              <>
                <PerfumeCard item={item} key={key} />
              </>
            ))}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

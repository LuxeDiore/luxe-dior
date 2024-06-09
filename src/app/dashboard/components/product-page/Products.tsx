import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import ProductGrid from "./ProductGrid";
import ModifyProductInfo from "./ModifyProductInfo";
const Products = () => {
  const [keyword, setKeyword] = useState("");
  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full justify-between items-center order-heading">
        <h1 className="text-3xl md:text-4xl font-semibold">All Orders</h1>
        <div className="flex gap-2">
          <ModifyProductInfo type="add" />
          <Input
            className="w-[15rem] products-searchbar-dashboard"
            placeholder="Enter something"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </div>
      <ProductGrid keyword={keyword} />
    </div>
  );
};

export default Products;

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import ProductGrid from "./ProductGrid";
import ModifyProductInfo from "./ModifyProductInfo";
import { getAllProductsServerHandler } from "../../actions/action";
import { productInfo } from "@/types/product";
const Products = () => {
  const [keyword, setKeyword] = useState("");
  const [items, setItems] = useState<productInfo[]>([]);

  const getAllProducts = async () => {
    await getAllProductsServerHandler().then((data) => {
      const products: productInfo[] = JSON.parse(data!.products!);
      setItems(products);
    });
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full justify-between items-center order-heading">
        <h1 className="text-3xl md:text-4xl font-semibold">All Products</h1>
        <div className="flex gap-2">
          <ModifyProductInfo setItems={setItems} type="add" />
          <Input
            className="w-[15rem] products-searchbar-dashboard"
            placeholder="Enter something"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </div>
      <ProductGrid items={items} setItems={setItems} keyword={keyword} />
    </div>
  );
};

export default Products;

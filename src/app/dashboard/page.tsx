"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React, { useState } from "react";
import SideBar from "./components/SideBar";
import MobileSideBar from "./components/MobileSideBar";
import Orders from "./components/order-page/Orders";
import Products from "./components/product-page/Products";

const page = () => {
  const [selectedItem, setSelectedItem] = useState("Orders");
  return (
    <div className="flex dashboard-nav">
      {/* SideBar */}
      <SideBar selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      <MobileSideBar
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />

      {/* Content */}
      <MaxWidthWrapper className="py-10">
        {/* Orders */}
        {selectedItem === "Orders" && <Orders />}
        {/* Products */}
        {selectedItem === "Products" && <Products />}
      </MaxWidthWrapper>
    </div>
  );
};

export default page;

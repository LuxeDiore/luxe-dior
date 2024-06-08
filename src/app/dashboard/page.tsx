"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React, { useState } from "react";
import SideBar from "./SideBar";
import MobileSideBar from "./MobileSideBar";
import Orders from "./Orders";

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
        {selectedItem === "Products" && <div>Product</div>}
      </MaxWidthWrapper>
    </div>
  );
};

export default page;

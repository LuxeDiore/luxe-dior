import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import OrderTable from "./OrderTable";

const Orders = () => {
  const [keyword, setKeyword] = useState("");
  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full justify-between items-center order-heading">
        <h1 className="text-3xl md:text-4xl font-semibold">All Orders</h1>
        <Input
          className="w-[15rem]"
          placeholder="Enter something"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <OrderTable keyword={keyword} />
    </div>
  );
};

export default Orders;

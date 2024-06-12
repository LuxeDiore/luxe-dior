import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderType } from "@/types/order";

const OrderTable = ({ orders }: { orders: OrderType[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Order No.</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Order Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders?.map((order, key) => {
          return (
            <TableRow>
              <TableCell className="font-medium">{key + 1}</TableCell>
              <TableCell>{order?.orderStatus}</TableCell>
              <TableCell>{order?.paymentMethod}</TableCell>
              <TableCell>{order?.items?.length}</TableCell>
              <TableCell>{order?.orderStatus}</TableCell>
              <TableCell className="text-right">₹{order?.orderValue}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default OrderTable;

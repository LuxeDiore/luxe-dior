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
import { SquareArrowOutUpRight } from "lucide-react";

import { OrderType } from "@/types/order";
import OrderItems from "../../../components/OrderItems";

const OrderTable = ({ orders }: { orders: OrderType[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Order No.</TableHead>
          <TableHead>Payment Method</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Order Status</TableHead>
          <TableHead>Delivery charges</TableHead>
          <TableHead>Order Amount</TableHead>

          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders?.map((order, key) => {
          return (
            <TableRow key={key}>
              <TableCell className="font-medium">{order.paymentId}</TableCell>
              <TableCell>{order?.paymentMethod}</TableCell>
              <TableCell className="flex gap-1 items-center">
                {order?.items?.length} <OrderItems orderItems={order.items} />
              </TableCell>
              <TableCell>{order?.orderStatus}</TableCell>
              <TableCell>₹{order?.deliveryCharge}</TableCell>
              <TableCell>₹{order?.orderValue}</TableCell>
              <TableCell className="text-right">
                ₹{order?.orderValue + order?.deliveryCharge}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default OrderTable;

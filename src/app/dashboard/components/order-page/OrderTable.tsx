import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { deliveryStatus } from "@/data/deliveryStatus";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { getAllOrdersServerHandler } from "../../actions/action";
import { OrderType } from "@/types/order";

const OrderTable = ({ keyword }: { keyword: string }) => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const itemsPerPage = 10;
  const nextPage = () => {
    const lastPossiblePage = Math.ceil(orders.length / itemsPerPage);
    if (lastPossiblePage <= pageNo) return;
    setPageNo(pageNo + 1);
  };
  const prevPage = () => {
    if (pageNo == 1) return;
    setPageNo(pageNo - 1);
  };

  const getAllOrders = async () => {
    const res = await getAllOrdersServerHandler();
    const ordersString = res.orders;
    const resOrders = JSON.parse(ordersString);
    setOrders(resOrders);
  };

  useEffect(() => {
    getAllOrders();
  }, []);
  return (
    <ScrollArea className="h-[calc(100vh-13rem)]">
      <div className="h-full justify-between flex flex-col gap-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders
              ?.filter((order, key) => {
                let trimLowerCaseKeyword = keyword.trim().toLowerCase();
                let orderUserName = order.user.name.trim().toLowerCase();
                let thisPageStartingElement = (pageNo - 1) * 10 + 1;
                let thisPageEndingElement = pageNo * 10 + 1;
                if (
                  (orderUserName === trimLowerCaseKeyword ||
                    orderUserName.includes(trimLowerCaseKeyword) ||
                    trimLowerCaseKeyword.includes(orderUserName)) &&
                  key + 1 >= thisPageStartingElement &&
                  key + 1 < thisPageEndingElement
                ) {
                  return true;
                }
                return false;
              })
              ?.map((order, key) => {
                return (
                  <TableRow key={key}>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>{order.orderStatus}</TableCell>
                    <TableCell>{order.paymentMethod}</TableCell>
                    <TableCell>{order.user.name}</TableCell>
                    <TableCell>{order.items.length}</TableCell>
                    <TableCell>
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue
                            placeholder={order.orderStatus}
                            defaultValue={order.orderStatus}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {deliveryStatus.map((status, key) => {
                            return (
                              <SelectItem key={key} value={status}>
                                {status}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      ₹{order.orderValue}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <Pagination>
          <PaginationContent className="w-full  flex justify-between">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                className={cn(
                  buttonVariants({
                    variant: "secondary",
                  })
                )}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                href="#"
                className={cn(
                  buttonVariants({
                    variant: "secondary",
                  })
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </ScrollArea>
  );
};

export default OrderTable;

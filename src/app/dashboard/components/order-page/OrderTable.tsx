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
import { updateOrderStatus } from "./action";
import { useToast } from "@/components/ui/use-toast";

const OrderTable = ({ keyword }: { keyword: string }) => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const { toast } = useToast();
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
    await getAllOrdersServerHandler().then((data) => {
      const ordersString = data!.orders!;
      const resOrders = JSON.parse(ordersString);
      setOrders(resOrders);
    });
  };

  const updateOrderStatusHandler = async (order: OrderType, status: string) => {
    const res = await updateOrderStatus(order, status);
    if (res.success) {
      toast({
        variant: "default",
        title: res.message,
      });
    } else {
      toast({
        variant: "destructive",
        title: res.message,
      });
    }
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
              <TableHead>Payment Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Amount</TableHead>
              <TableHead>Delivery Charges</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders
              ?.filter((order, key) => {
                let trimLowerCaseKeyword = keyword.trim().toLowerCase();
                let orderUserName = order.user?.clerkId!.trim().toLowerCase();
                let orderStatus = order.orderStatus
                  .toLocaleString()
                  .trim()
                  .toLowerCase();
                let paymentStatus = order.paymentStatus.trim().toLowerCase();
                let orderId = order.paymentId.trim().toLowerCase();
                let paymentMethod = order.paymentMethod.trim().toLowerCase();
                let thisPageStartingElement = (pageNo - 1) * 10 + 1;
                let thisPageEndingElement = pageNo * 10 + 1;
                if (
                  orderUserName === trimLowerCaseKeyword ||
                  orderUserName.includes(trimLowerCaseKeyword) ||
                  trimLowerCaseKeyword.includes(orderUserName) ||
                  paymentStatus === trimLowerCaseKeyword ||
                  paymentStatus.includes(trimLowerCaseKeyword) ||
                  trimLowerCaseKeyword.includes(paymentStatus) ||
                  orderId === trimLowerCaseKeyword ||
                  orderId.includes(trimLowerCaseKeyword) ||
                  trimLowerCaseKeyword.includes(orderId) ||
                  orderStatus === trimLowerCaseKeyword ||
                  orderStatus.includes(trimLowerCaseKeyword) ||
                  trimLowerCaseKeyword.includes(paymentMethod) ||
                  paymentMethod === trimLowerCaseKeyword ||
                  orderStatus.includes(paymentMethod) ||
                  (trimLowerCaseKeyword.includes(orderStatus) &&
                    key + 1 >= thisPageStartingElement &&
                    key + 1 < thisPageEndingElement)
                ) {
                  return true;
                }
                return false;
              })
              ?.map((order, key) => {
                return (
                  <TableRow key={key}>
                    <TableCell className="font-medium">
                      {order.paymentId}
                    </TableCell>
                    <TableCell>{order.paymentStatus}</TableCell>
                    <TableCell>{order.paymentMethod}</TableCell>
                    <TableCell>{order.user.userName!}</TableCell>
                    <TableCell>{order.items.length}</TableCell>
                    <TableCell>
                      <Select
                        onValueChange={async (status) => {
                          await updateOrderStatusHandler(order, status);
                        }}
                      >
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
                    <TableCell>₹{order.deliveryCharge}</TableCell>
                    <TableCell>₹{order.orderValue}</TableCell>
                    <TableCell className="text-right">
                      ₹{order.orderValue + order.deliveryCharge}
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
                onClick={prevPage}
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
                onClick={nextPage}
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

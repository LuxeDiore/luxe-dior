import React from "react";

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

const OrderTable = () => {
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
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell>5 items</TableCell>
              <TableCell>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={deliveryStatus[0]} />
                  </SelectTrigger>
                  <SelectContent>
                    {deliveryStatus.map((status) => {
                      return <SelectItem value={status}>{status}</SelectItem>;
                    })}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-right">₹250.00</TableCell>
            </TableRow>
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

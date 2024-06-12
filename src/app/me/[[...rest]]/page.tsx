"use client";
import { useToast } from "@/components/ui/use-toast";
import { User, auth } from "@clerk/nextjs/server";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getSelf } from "../action";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { dark, neobrutalism } from "@clerk/themes";

import { UserProfile } from "@clerk/nextjs";

const Page = () => {
  const [user, setUser] = useState<User>();
  const [orders, setOrders] = useState([]);
  const { toast } = useToast();
  const router = useRouter();
  const getUser = async () => {
    await getSelf().then((self) => {
      if (!self.success) {
        toast({
          title: "Please login to access this page.",
          variant: "destructive",
        });
        router.push("/");

        return;
      }
      const user = JSON.parse(self.user);
      console.log("user : ", user);
      const orders = JSON.parse(self.orders);
      setOrders(orders);
      setUser(user!);
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  //   ................................

  return (
    <MaxWidthWrapper className="flex flex-col w-full  align-center py-20 items-center gap-10">
      <UserProfile
        path="/me"
        routing="path"
        appearance={{
          baseTheme: dark,
        }}
      />
      <div className="w-full">
        <h1 className="text-3xl md:text-5xl font-semibold text-gray-500">
          My Orders
        </h1>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;

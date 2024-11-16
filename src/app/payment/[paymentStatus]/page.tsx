"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CircleCheckBig } from "lucide-react";
const page = ({ params }: { params: { paymentStatus: string } }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(
    params.paymentStatus === "success"
  );
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setHeading("Thanks for placing your order");
      setDescription("Your order has placed successfully !!");
      toast({
        title: "You will soon recieve an email",
        variant: "default",
      });
      //   setTimeout(() => {
      //     router.push("/me");
      //   }, 3000);
    } else {
      setHeading("There was some problem while palcing your order.");
      setDescription(
        "If you have been credited with the order value, please contact us to initiate refund."
      );
    }
  }, [isSuccess]);
  return (
    <MaxWidthWrapper className="flex justify-center items-center h-[100vh]">
      <div className="flex flex-col items-center justify-center w-full">
        {isSuccess ? (
          <CircleCheckBig className="text-green-600 h-24 w-24" />
        ) : (
          <></>
        )}
        <h1 className="text-5xl font-extrabold space-x-3">{heading}</h1>
        <p className="text-center text-3xl">{description}</p>
      </div>
    </MaxWidthWrapper>
  );
};

export default page;

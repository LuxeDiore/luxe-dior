"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CircleCheckBig } from "lucide-react";
import { sendOrderConfirmationEmailsHandler } from "./action";
import { X } from "lucide-react";

const Page = ({ params }: { params: { paymentStatus: string } }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(
    params.paymentStatus === "success"
  );
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const sendOrderConfirmationEmails = async (paymentId: string) => {
    await sendOrderConfirmationEmailsHandler(paymentId);
  };
  useEffect(() => {
    if (isSuccess) {
      const paymentId = localStorage.getItem("paymentId");
      if (!paymentId) {
        toast({
          title:
            "There was some problem while placing your order.Please contact us if you do not receive order confirmation email in 24hrs",
          variant: "destructive",
        });
        router.push("/");
        return;
      }
      sendOrderConfirmationEmails(paymentId);
      setHeading("Thanks for placing your order");
      setDescription("Your order has placed successfully !!");
      toast({
        title: "You will soon recieve an email",
        variant: "default",
      });
      setTimeout(() => {
        router.push("/me");
      }, 4000);
    } else {
      setHeading("There was some problem while placing your order.");
      setDescription(
        "If you have been credited with the order value, please contact us to initiate refund."
      );
      setTimeout(() => {
        router.push("/");
      }, 4000);
    }
  }, [isSuccess]);
  return (
    <MaxWidthWrapper className="flex justify-center items-center h-[100vh]">
      <div className="flex flex-col items-center justify-center w-full">
        {isSuccess ? (
          <CircleCheckBig className="text-green-600 h-14 w-14 sm:h-20 sm:w-20 md:h-24 md:w-24" />
        ) : (
          <X className="text-red-600 h-14 w-14 sm:h-20 sm:w-20 md:h-24 md:w-24" />
        )}
        <h1 className="text-2xl sm:3xl text-center md:text-4xl lg:5xl font-extrabold space-x-3">
          {heading}
        </h1>
        <p
          className={
            isSuccess
              ? "text-center text-xl sm:text-2xl md:text-3xl"
              : "text-center text-xl"
          }
        >
          {description}
        </p>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;

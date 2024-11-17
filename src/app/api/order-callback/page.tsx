"use client";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

const page = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [requestCount, setRequestCount] = useState(0);
  useEffect(() => {
    setTimeout(async () => {
      const paymentId = localStorage.getItem("paymentId");
      if (!paymentId) {
        router.push("/payment/failed");
        return;
      }
      try {
        if (requestCount == 40) {
          toast({
            title:
              "Failed to place order.If you have been credited with the order value, please contact us to initiate refund.",
            variant: "destructive",
          });
          router.push("/payment/failed");
          return;
        }
        // Send the paymentId as a URL parameter in the GET request
        const res = await axios.get(
          `/api/order-callback/handler?paymentId=${paymentId}`
        );

        if (res.status != 200) {
          toast({
            title: res.data.paymentStatus,
            variant: "destructive",
          });

          router.push("/");
          return;
        }

        const paymentStatus = res.data.paymentStatus;
        if (paymentStatus != null) {
          if (paymentStatus === "PAYMENT_SUCCESS") {
            toast({
              title: "Payment Successful",
              variant: "default",
            });
            router.push("/payment/success");
          } else if (paymentStatus === "PAYMENT INITIATED") {
            console.log("Not yet updated...");
          } else {
            toast({
              title:
                "Payment failed.If you have been credited with the order value, please contact us to initiate refund.",
              variant: "destructive",
            });
            router.push("/payment/failed");
          }
        }
      } catch (err) {
        console.error("Error sending data:", err);
      } finally {
        setRequestCount(requestCount + 1);
      }
    }, 5000);
  }, []);
  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        <h3 className="font-semibold text-xl">Placing your order...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};

export default page;

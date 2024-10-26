import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col gap-4 pt-14  ">
        <div className="text-lg flex flex-col gap-4 sm:w-[80%] md:w-[50%] self-center ">
          <h1 className="flex  text-3xl text-center uppercase justify-center items-center font-extrabold">
            Return & Refunds Policy
          </h1>
        </div>
        <div className="text-lg flex flex-col gap-4 sm:w-[80%] md:w-[50%] self-center text-gray-300">
          <p className="flex justify-center items-center text-left">
            We hope you’re pleased with your purchase from us, but if you do
            need to return anything, you’ve got 7 days to. Refund would be
            processed in 2-5 working days only on approved returns.
          </p>
          <p className="flex justify-center items-center text-left">
            We cannot return a product if it has been personalised in anyway. If
            the product is returned in a condition which is not fully resaleable
            or the packaging is damaged, we reserve the right to refuse a refund
            or exchange on the item.
          </p>
          <p>
            To return the package send us an email from our{" "}
            <Link href="/contact-us" className="underline">
              Contact Us
            </Link>{" "}
            page.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 pt-14 pb-14 ">
        <div className="text-lg flex flex-col gap-4 sm:w-[80%] md:w-[50%] self-center ">
          <h1 className="flex  text-3xl text-center uppercase justify-center items-center font-extrabold">
            Shipping Policy
          </h1>
        </div>

        <div className="text-lg flex flex-col gap-4 sm:w-[80%] md:w-[50%]  self-center text-gray-300">
          <p>
            After placing the order, the product is delivered to you after you
            in the next 7-10 days.
          </p>

          <p>
            In case of any query, you can reach out to us through our{" "}
            <Link href="/contact-us" className="underline">
              Contact Us
            </Link>{" "}
            page.
          </p>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;

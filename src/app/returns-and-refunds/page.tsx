import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col gap-4 pt-14  ">
        <h1 className="text-3xl uppercase w-full flex justify-center items-center font-extrabold">
          Return & Refunds Policy
        </h1>
        <div className="text-lg flex flex-col gap-4 w-[50%] self-center text-gray-300">
          <p className="flex justify-center items-center text-left">
            We hope you’re pleased with your purchase from us, but if you do
            need to return anything, you’ve got 90 days to.
          </p>
          <p className="flex justify-center items-center text-left">
            We cannot return a product if it has been personalised in anyway. If
            the product is returned in a condition which is not fully resaleable
            or the packaging is damaged, we reserve the right to refuse a refund
            or exchange on the item.
          </p>
          <p>
            To return the package send us an email from here :{" "}
            <Link href="/contact-us">
              <Button variant={"link"} className="underline">
                Contact Us
              </Button>
            </Link>
          </p>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;

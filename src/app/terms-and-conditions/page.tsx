import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col gap-4 pt-14 pb-14 ">
        <div className="text-lg flex flex-col gap-4 sm:w-[80%] md:w-[50%] self-center ">
          <h1 className="flex  text-3xl text-center uppercase justify-center items-center font-extrabold">
            Terms and conditions
          </h1>
        </div>
        <div className="sm:w-[80%] md:w-[50%] self-center flex flex-col gap-5">
          <div className="text-lg flex flex-col gap-4  text-gray-300">
            <h1 className="text-2xl underline font-bold">
              Acceptance of Terms
            </h1>
            <ul className="flex flex-col gap-2">
              <li>
                By purchasing products on the Luxe Dior website, users agree to
                the T&Cs, which govern the site’s use and purchase process.
                Users should review these carefully, as they define the terms of
                sales and website usage.
              </li>
              <li>
                Luxe Dior may update the T&Cs at any time, and users are
                encouraged to check for changes, as continuing use of the site
                implies acceptance of any updates.
              </li>
            </ul>
          </div>
          <div className="text-lg flex flex-col gap-4  text-gray-300">
            <h1 className="text-2xl underline font-bold">
              Eligibility for Purchase
            </h1>
            <ul className="flex flex-col gap-2">
              <li>
                Users must register on the Luxe Dior site to make purchases or
                access specific services. Accurate and current personal
                information, such as name, email, and phone number, is required.
              </li>
              <li>
                Users should promptly update their account details if any
                information changes. Payment details provided must also be
                accurate and confirm the rightful account holder’s identity.
              </li>
            </ul>
          </div>
          <div className="text-lg flex flex-col gap-4  text-gray-300">
            <h1 className="text-2xl underline font-bold">Account Creation</h1>
            <ul className="flex flex-col gap-2">
              <li>
                An account setup is necessary to access Luxe Dior’s online
                services. Users can register with an email and password or
                through permitted social media accounts.
              </li>
              <li>
                The email provided during registration will be the primary
                contact for updates related to orders, cancellations, and
                refunds, so it’s important for users to ensure accuracy.
              </li>
            </ul>
          </div>
          <div className="text-lg flex flex-col gap-4  text-gray-300">
            <h1 className="text-2xl underline font-bold">
              Product Availability
            </h1>
            <ul className="flex flex-col gap-2">
              <li>
                Product availability is subject to stock levels. Luxe Dior will
                inform customers of any stock shortages and issue a refund for
                unavailable products and applicable delivery fees within 14
                days.
              </li>
              <li>
                If only part of an order is unavailable, delivery fees for
                available items will not be refunded. Catalog updates do not
                affect orders placed before changes.
              </li>
            </ul>
          </div>
          <div className="text-lg flex flex-col gap-4  text-gray-300">
            <h1 className="text-2xl underline font-bold">Pricing Policy</h1>
            <ul className="flex flex-col gap-2">
              <li>
                Luxe Dior displays product prices in Indian Rupees (INR),
                exclusive of GST and of delivery fees, which are shown at
                checkout before finalizing the order.
              </li>
              <li>
                The total price (excluding and including delivery fees) is
                displayed in the “My Cart” section. Luxe Dior reserves the right
                to update prices; however, the price at the time of the order
                remains valid.
              </li>
            </ul>
          </div>
          <div className="text-lg flex flex-col gap-4  text-gray-300">
            <h1 className="text-2xl underline font-bold">Ordering Process</h1>
            <ul className="flex flex-col gap-2">
              <li>
                Customers must be logged in to place an order. Selected items
                are added to “My Cart” and can be reviewed before checkout.
              </li>
              <li>
                During checkout, users provide billing, delivery, and payment
                details. Orders are confirmed upon clicking “Place Order,” which
                finalizes the contract and agreement to the T&Cs. Luxe Dior
                sends an email confirmation and a follow-up dispatch
                notification once shipped.
              </li>
            </ul>
          </div>
          <div className="text-lg flex flex-col gap-4  text-gray-300">
            <h1 className="text-2xl underline font-bold">Order Cancellation</h1>
            <ul className="flex flex-col gap-2">
              <li>
                Orders can be canceled within 24 hours by contacting Luxe Dior
                through out{" "}
                <Link href="/contat-us" className="underline">
                  Contact us
                </Link>{" "}
                page . Refunds, excluding credit card convenience fees, are
                processed within 72 hours and returned to the original payment
                method (excluding COD).
              </li>
            </ul>
          </div>
          <div className="text-lg flex flex-col gap-4  text-gray-300">
            <h1 className="text-2xl underline font-bold">Payment Terms</h1>
            <ul className="flex flex-col gap-2">
              <li>
                By confirming an order, users agree to pay for products and any
                delivery fees. Luxe Dior accepts payments processed through
                PhonePe, a secure payment gateway.
              </li>
              <li>
                Depending on the user’s bank, additional authentication may be
                required to complete the payment.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default page;

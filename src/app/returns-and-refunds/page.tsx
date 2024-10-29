import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import React from "react";

const Page = () => {
  const refundCancellation = [
    "Cancellations will only be considered if the request is made 7 days after placing the order. However, cancellation requests may not be entertained if the orders have been communicated to such sellers/merchant (s) listed on the Platform and they have initiated the process of shipping them, or the product is out for delivery. In such an event, you may choose to reject the product at the doorstep.",
    "JASHAN VERMA does not accept cancellation requests for perishable items like flowers, eatables, etc. However, a refund/replacement can be made if the user establishes that the quality of the product delivered is not good.",
    "In case of receipt of damaged or defective items, please report to our customer service team. The request would be entertained once the seller/ merchant listed on the Platform, has checked and determined the same at its own end. This should be reported within 7 days of receipt of products. In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 7 days of receiving the product. The customer service team after looking into your complaint will take an appropriate decision.",
    "In case of complaints regarding the products that come with a warranty from the manufacturers, please refer the issue to them.",
    "In case of any refunds approved by JASHAN VERMA, it will take 5 days for the refund to be processed to you.",
  ];
  const returnPolicy = [
    "We offer refund / exchange within first 7 days from the date of your purchase. If 7 days have passed since your purchase, you will not be offered a return, exchange or refund of any kind. In order to become eligible for a return or an exchange, (i) the purchased item should be unused and in the same condition as you received it, (ii) the item must have original packaging, (iii) if the item that you purchased on a sale, then the item may not be eligible for a return / exchange. Further, only such items are replaced by us (based on an exchange request), if such items are found defective or damaged.",
    "You agree that there may be a certain category of products / items that are exempted from returns or refunds. Such categories of the products would be identified to you at the item of purchase. For exchange / return accepted request(s) (as applicable), once your returned product / item is received and inspected by us, we will send you an email to notify you about receipt of the returned / exchanged product. Further. If the same has been approved after the quality check at our end, your request (i.e. return / exchange) will be processed in accordance with our policies.",
  ];
  return (
    <MaxWidthWrapper className="pb-10">
      <div className="flex flex-col gap-4 pt-14  ">
        <div className="sm:w-[80%] md:w-[50%] self-center flex flex-col gap-5">
          <h1 className="flex  text-3xl text-center uppercase justify-center items-center font-extrabold">
            Refund and Cancellation policy
          </h1>
          <div className="flex flex-col gap-5">
            <p>
              This refund and cancellation policy outlines how you can cancel or
              seek a refund for a product/service that you have purchased
              through the Platform. Under this policy:
            </p>
            <ul className="flex flex-col gap-3">
              {refundCancellation.map((item, key) => {
                return (
                  <li key={key} className="pl-5">
                    {key + 1}. {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 pt-14  ">
        <div className="sm:w-[80%] md:w-[50%] self-center flex flex-col gap-5">
          <h1 className="flex  text-3xl text-center uppercase justify-center items-center font-extrabold">
            Return Policy
          </h1>
          <ul className="flex flex-col gap-3">
            {returnPolicy.map((item, key) => {
              return (
                <li key={key} className="pl-5">
                  {key + 1}. {item}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-4 pt-14  ">
        <div className="sm:w-[80%] md:w-[50%] self-center flex flex-col gap-5">
          <h1 className="flex  text-3xl text-center uppercase justify-center items-center font-extrabold">
            Shipping Policy
          </h1>
          <p>
            The orders for the user are shipped through registered domestic
            courier companies and/or speed post only. Orders are shipped within
            1 days from the date of the order and/or payment or as per the
            delivery date agreed at the time of order confirmation and
            delivering of the shipment, subject to courier company / post office
            norms. Platform Owner shall not be liable for any delay in delivery
            by the courier company / postal authority. Delivery of all orders
            will be made to the address provided by the buyer at the time of
            purchase. Delivery of our services will be confirmed on your email
            ID as specified at the time of registration. If there are any
            shipping cost(s) levied by the seller or the Platform Owner (as the
            case be), the same is not refundable.
          </p>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;

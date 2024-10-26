import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";
const page = () => {
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col gap-4 pt-14 pb-14 ">
        <div className="text-lg flex flex-col gap-4 sm:w-[80%] md:w-[50%] self-center ">
          <h1 className="flex  text-3xl text-center uppercase justify-center items-center font-extrabold">
            Privacy Policy
          </h1>
        </div>

        <div className="text-lg flex flex-col gap-4 sm:w-[80%] md:w-[50%]  self-center text-gray-300">
          <p className="flex justify-center items-center text-left">
            At Luxe Dior, we value our customers and prioritize your privacy. We
            handle any information collected with the highest level of care and
            security. Your visit to our site and your use of our services or
            features are subject to our terms and conditions, including this
            privacy policy. We are dedicated to managing your personal
            information with strict control and responsibility.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 pt-14 pb-14 ">
        <div className="text-lg flex flex-col gap-4 sm:w-[80%] md:w-[50%] self-center ">
          <h1 className="flex  text-3xl text-center uppercase justify-center items-center font-extrabold">
            What information do we collect ?
          </h1>
        </div>

        <div className="text-lg flex flex-col gap-4 sm:w-[80%] md:w-[50%]  self-center text-gray-300">
          <div className="flex justify-center items-center text-left">
            <ul className="flex flex-col gap-2">
              <li>
                <b className="underline">Identification Information:</b> This
                includes details such as your name and address, which we collect
                when you place an order on our website and we use it to deliver
                your order to you.
              </li>
              <li>
                <b className="underline">Contact Information:</b> This includes
                your email address, which we collect when you register or make a
                purchase on our site and we use it to contact you if necessary.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default page;

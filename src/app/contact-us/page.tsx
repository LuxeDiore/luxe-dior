"use client";
import React, { useEffect } from "react";
import sendEmailServerHandler from "./action";

const Page = () => {
  const sendEmail = async () => {
    await sendEmailServerHandler({
      email: "kapilsoni54768161@gmail.com",
      fname: "Kapil",
      lname: "Soni",
      query: "This is my query",
    });
  };
  useEffect(() => {
    sendEmail();
  }, []);
  return <div>Page</div>;
};

export default Page;

"use server";
import { ContactUsEmailTemplate as ContactUsEmailTemplateAdmin } from "../../../email-templates/contact-us-email-template-admin";
import { ContactUsEmailTemplate as ContactUsEmailTemplateClient } from "../../../email-templates/contact-us-email-template-client";
import { resend } from "@/lib/resend";
/*
react: ContactUsEmailTemplateAdmin({
        fname: fname,
        lname: lname,
        query: query,
        email: email,
      }),
*/
export default async function sendEmailServerHandler({
  fname,
  lname,
  email,
  query,
}: {
  fname: string;
  lname: string;
  email: string;
  query: string;
}) {
  try {
    await Promise.all([
      resend.emails.send({
        from: "Luxe Dior <jashanverma@luxedior.in>",
        to: [`${email}`],
        subject: "We have recieved your Query",
        react: ContactUsEmailTemplateClient({
          fname: fname,
          lname: lname,
          query: query,
        }),
      }),
      resend.emails.send({
        from: "Luxe Dior Enquiry <jashanverma@luxedior.in>",
        to: ["perfumes.luxediore@gmail.com"],
        subject: "New Enquiry",
        react: ContactUsEmailTemplateAdmin({
          fname: fname,
          lname: lname,
          query: query,
          email: email,
        }),
      }),
    ]);
    return {
      success: true,
      message: "Email sent successfully.",
    };
  } catch (err: any) {
    console.log("error : ", err);
    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}

import ContactUsEmailTemplateAdmin from "../../../email-templates/contact-us-email-template-admin";
import ContactUsEmailTemplateClient from "../../../email-templates/contact-us-email-template-client";
import { resend } from "@/lib/resend";

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
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [`${email}`],
      subject: "New Query",
      headers: {
        "X-Entity-Ref-ID": "123456789",
      },
      react: ContactUsEmailTemplateAdmin({
        fname: fname,
        lname: lname,
        query: query,
        email: email,
      }),
    });
    await resend.emails.send({
      from: "Luxe Diore <perfumes.luxediore@gmail.com>",
      to: [`${email}`],
      subject: "We have recieved your Query",
      react: ContactUsEmailTemplateClient({
        fname: fname,
        lname: lname,
        query: query,
      }),
    });

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

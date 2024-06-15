import { Resend } from "resend";

export const resend = new Resend(
  process.env.NEXT_PUBLIC_RESEND_API_KEY ||
    "re_XU72Z4Xb_KJbamQ95HZ4CC6zNFCrfJpTc"
);

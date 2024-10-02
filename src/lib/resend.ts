import { Resend } from "resend";

export const resend = new Resend(
  process.env.NEXT_PUBLIC_RESEND_API_KEY ||
    "re_DaEmnGbm_J9SBeENo8DZJDE75pyQEYYwe"
);

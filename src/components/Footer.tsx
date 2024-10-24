import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

const routes = [
  {
    title: "Contact Us",
    href: "/contact-us",
  },
  {
    title: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    title: "Terms and Condition",
    href: "/terms-and-condition",
  },
  {
    title: "Returns & Refunds",
    href: "/returns-and-refunds",
  },
];
const Footer = () => {
  return (
    <div className=" flex flex-col sm:flex-row w-full justify-between px-4 items-center py-2  border-t border-gray-200   transition-all gap-5">
      <div className="flex flex-col gap-2 items-center">
        <div>
          <Logo />
          <div className="text-xs text-gray-400 flex gap-2 font-light">
            By Jashan Jaura
          </div>
        </div>
        <div className="text-sm text-gray-300 flex gap-2 font-normal">
          &copy; 2024, All rights reserved
        </div>
      </div>
      <div className="flex flex-col sm:flex-row">
        {routes?.map((route, key) => {
          return (
            <Link
              key={key}
              className={cn(
                buttonVariants({
                  variant: "link",
                })
              )}
              href={route.href}
            >
              {route?.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Footer;

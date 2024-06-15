import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { LogIn, LogOut, Menu, ShoppingBasketIcon, User } from "lucide-react";
import Link from "next/link";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { User as ClerkUser } from "@clerk/nextjs/server";
import { categories } from "@/data/data";

const HamBurgerMenu = ({ user }: { user: ClerkUser | null }) => {
  const isAdmin =
    user?.emailAddresses[0]?.emailAddress === process.env.ADMIN_EMAIL;
  return (
    <div className="ham-show">
      <Sheet>
        <SheetTrigger>
          <div
            className={cn(
              "h-full  items-center space-x-4",
              buttonVariants({
                variant: "secondary",
                size: "sm",
              })
            )}
          >
            <Menu className="w-5 h-5" />
          </div>
        </SheetTrigger>
        <SheetContent className="z-[999999] p-0">
          <SheetHeader>
            <SheetDescription className="h-[100vh] flex justify-between flex-col">
              <div className="pt-14">
                <h2 className="w-full border-0 font-semibold border-b-2 text-2xl h-10 flex justify-center items-center">
                  Categories
                </h2>
                <div>
                  {categories?.map((category, key) => {
                    return (
                      <Link
                        href={category.link}
                        key={category?.title}
                        className=" h-10 flex justify-center items-center"
                      >
                        {category?.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div>
                {isAdmin ? (
                  <Link
                    href="/dashboard"
                    className="h-14 flex justify-center items-center border-0 border-t-2"
                  >
                    {" "}
                    Dashboard ✨
                  </Link>
                ) : (
                  <></>
                )}
                <Link
                  href="/contact-us"
                  className="h-14 flex justify-center items-center border-0 border-t-2"
                >
                  {" "}
                  Contact Us
                </Link>
                <Link
                  href="/cart"
                  className="h-14 flex justify-center items-center border-0 border-t-2  gap-3"
                >
                  <ShoppingBasketIcon className="w-5 h-5" />
                  My cart
                </Link>

                <div className="flex border-t-2 h-14 border items-center justify-between p-3 gap-4">
                  {user ? (
                    <>
                      <Link
                        href="/me"
                        className="flex gap-2 w-full items-center"
                      >
                        <img
                          src={user.imageUrl}
                          alt=""
                          className=" h-8 w-8 object-cover rounded-full"
                        />
                        {/* <User className=" h-5 w-5" /> */}
                        {user?.fullName}
                      </Link>

                      <div className="h-8 w-px bg-zinc-200" />
                    </>
                  ) : null}

                  {user ? (
                    <SignOutButton redirectUrl="/">
                      <LogOut className="w-5 h-5 hover:cursor-pointer text-red-600" />
                    </SignOutButton>
                  ) : (
                    <>
                      <Link
                        href="/sign-up"
                        className="flex gap-2 w-full justify-center items-center"
                      >
                        SignUp
                        <LogIn className="w-5 h-5 hover:cursor-pointer" />
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default HamBurgerMenu;

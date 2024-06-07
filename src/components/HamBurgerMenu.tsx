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
import { LogIn, LogOut, Menu, User } from "lucide-react";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { User as ClerkUser } from "@clerk/nextjs/server";

const HamBurgerMenu = ({ user }: { user: ClerkUser | null }) => {
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
              <div>hii</div>
              <div className="flex border-t-2 h-14 border items-center justify-between p-3">
                {user ? (
                  <Link href="/me" className="flex gap-2">
                    <User className=" h-5 w-5" />
                    {user?.fullName}
                  </Link>
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
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default HamBurgerMenu;

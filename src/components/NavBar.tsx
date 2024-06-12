import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { LogIn, LogOut, User } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { categories } from "@/data/data";
import HamBurgerMenu from "./HamBurgerMenu";
import Logo from "./Logo";
import { dark } from "@clerk/themes";
const NavBar = async () => {
  const user = await currentUser();
  const isAdmin =
    user?.emailAddresses[0]?.emailAddress === process.env.ADMIN_EMAIL;
  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200  backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Logo />
          <div className="h-full  items-center space-x-4  nav-hidden">
            {categories?.map((category, key) => {
              return (
                <Link
                  key={category.title}
                  href={category.link}
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  {category.title}
                </Link>
              );
            })}
          </div>
          <div className="h-full  items-center space-x-4 nav-hidden">
            {user ? (
              <>
                {isAdmin ? (
                  <>
                    <Link
                      href="/dashboard"
                      className={buttonVariants({
                        size: "sm",
                        variant: "secondary",
                      })}
                    >
                      Dashboard ✨
                    </Link>
                    <Link
                      href="/contact-us"
                      className={buttonVariants({
                        size: "sm",
                        variant: "secondary",
                      })}
                    >
                      Contact Us
                    </Link>
                  </>
                ) : null}
                <div className="h-8 w-px bg-zinc-200" />
                {/* <Link href="/me">
                  <User className=" h-5 w-5" />
                </Link> */}
                <UserButton
                  afterSignOutUrl="/"
                  showName
                  userProfileUrl="/me"
                  userProfileMode="navigation"
                  appearance={{
                    baseTheme: dark,
                    variables: {
                      colorText: "white",
                    },
                  }}
                />

                {/* <SignOutButton redirectUrl="/">
                  <LogOut className="w-5 h-5 hover:cursor-pointer" />
                </SignOutButton> */}
              </>
            ) : (
              <>
                <Link
                  href="/sign-up"
                  className={buttonVariants({
                    size: "sm",
                    variant: "secondary",
                  })}
                >
                  Sign up
                </Link>
                <Link
                  href="/contact-us"
                  className={buttonVariants({
                    size: "sm",
                    variant: "secondary",
                  })}
                >
                  Contact Us
                </Link>
              </>
            )}
          </div>
          <HamBurgerMenu user={user} />
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default NavBar;

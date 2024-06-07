import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div className={cn("h-full  w-full px-5 md:px-10", className)}>
      {children}
    </div>
  );
};

export default MaxWidthWrapper;

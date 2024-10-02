import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="flex z-14 font-semibold gap-1">
      <span className="text-orange-500">Luxe </span> Dior
    </Link>
  );
};

export default Logo;

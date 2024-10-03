import { Link } from "@react-email/components";

export const LogoServer = () => {
  return (
    <Link
      href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}`}
      className="flex z-14 font-semibold gap-1"
    >
      <span className="text-orange-500">Luxe </span> Dior
    </Link>
  );
};

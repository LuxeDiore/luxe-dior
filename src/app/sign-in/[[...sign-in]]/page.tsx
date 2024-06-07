import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <MaxWidthWrapper>
      <div className="w-full flex justify-center items-center h-[calc(100vh-3.5rem)]">
        <SignIn signUpUrl="/sign-up" />
      </div>
    </MaxWidthWrapper>
  );
}

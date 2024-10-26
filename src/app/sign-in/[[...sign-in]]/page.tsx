import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <MaxWidthWrapper className="h-full">
      <div className="w-full flex justify-center items-center h-[calc(max(100vh-3.5rem,100%))] pt-20 pb-20">
        <SignIn
          signUpUrl="/sign-up"
          signUpForceRedirectUrl="/api/auth-callback"
          forceRedirectUrl="/api/auth-callback"
        />
      </div>
    </MaxWidthWrapper>
  );
}

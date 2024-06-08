import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <MaxWidthWrapper>
      <div className="w-full flex justify-center items-center h-[calc(100vh-3.5rem)]  pt-40 sm:pt-0">
        <SignIn
          signUpUrl="/sign-up"
          signUpForceRedirectUrl="/api/auth-callback"
          forceRedirectUrl="/api/auth-callback"
        />
      </div>
    </MaxWidthWrapper>
  );
}

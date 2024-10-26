"use client";
import { useEffect, useState } from "react";
import { getAuthStatus } from "./action";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { ClerkLoading } from "@clerk/nextjs";

const Page = () => {
  const router = useRouter();
  const [response, setResponse] = useState({ success: false });

  const getStatus = async () => {
    try {
      setTimeout(async () => {
        let res = await getAuthStatus();
        setResponse(res);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getStatus();
  }, []);
  useEffect(() => {
    if (response.success === true) {
      router.push("/");
    }
  }, [response]);

  if (response.success === true) {
    router.push("/");
    return;
  }

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        <h3 className="font-semibold text-xl">Logging you in...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};

export default Page;

"use client";
import { useAuthContext } from "@/contexts/auth-context";
import AuthPage from "@/modules/auth/auth.page";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Auth() {
  const { isAuthenticated } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      return router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <AuthPage />
    </div>
  );
}

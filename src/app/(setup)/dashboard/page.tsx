"use client";
import { useAuthContext } from "@/contexts/auth-context";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      return router.push(`/dashboard/${user?.role}`);
    } else {
      return router.push("/");
    }
  });

  return null;
}

"use client";

import { useAuthContext } from "@/contexts/auth-context";
import KaprodiDashboard from "@/modules/kaprodi/dashboard.kaprodi";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && user?.role !== pathname.split("/")[2]) {
      router.push(`/dashboard`);
    }
  }, [user, router]);
  return <KaprodiDashboard role={user?.role} />;
}

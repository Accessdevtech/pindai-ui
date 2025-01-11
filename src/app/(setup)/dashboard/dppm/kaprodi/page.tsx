"use client";
import { useAuthContext } from "@/contexts/auth-context";
import KaprodiPage from "@/modules/dppm/feature/kaprodi/kaprodi.page";

export default function DashboardKaprodi() {
  const { user } = useAuthContext();
  return <KaprodiPage role={user?.role} />;
}

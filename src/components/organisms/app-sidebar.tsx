"use client";
import { HomeIcon } from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarContent,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NavManagemenData from "./nav-managemen-data";
import NavMainMenu from "./nav-main-menu";
import Logo from "@/assets/logo.svg";
import { useAuthContext } from "@/contexts/auth-context";
import { ROUTE } from "@/services/route";

export default function AppSidebar() {
  const { user } = useAuthContext();
  const pathname = usePathname();
  const isActivePage = (path: string) => {
    const pathArray = pathname.split("/");
    const pagePathArray = path.split("/");

    if (pathArray.length !== pagePathArray.length) return false;

    for (let i = 0; i < pathArray.length; i++) {
      if (pathArray[i] !== pagePathArray[i]) return false;
    }

    return true;
  };

  return (
    <Sidebar variant="inset" className="p-0">
      <SidebarHeader className="flex flex-row items-center py-5 px-6">
        <Image src={Logo} width={50} height={50} alt="Pindai Logo" />
        <span className="font-bold text-2xl capitalize">Pindai</span>
      </SidebarHeader>
      <SidebarContent className="space-y-2 p-0">
        <SidebarMenu className="space-y-2 w-full px-2">
          <SidebarMenuButton
            asChild
            isActive={isActivePage(`${ROUTE.DASHBOARD}/${user?.role}`)}
            className="data-[active=true]:bg-primary/30 data-[active=true]:text-primary hover:bg-primary/30 hover:text-primary"
          >
            <Link href={`${ROUTE.DASHBOARD}/${user?.role}`}>
              <HomeIcon />
              <span className="capitalize">dashboard</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenu>
        {user?.role !== "dosen" && (
          <NavManagemenData role={user?.role} isActive={isActivePage} />
        )}
        <NavMainMenu role={user?.role} isActive={isActivePage} />
      </SidebarContent>
    </Sidebar>
  );
}

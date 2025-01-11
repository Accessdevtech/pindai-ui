import { navData } from "@/constant/menu";
import { EachUtil } from "@/utils/each-utils";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
} from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { LayersIcon } from "lucide-react";
import Link from "next/link";
import { Role } from "@/interface/type";
import { ROUTE } from "@/services/route";

interface NavManagemenDataProps {
  role: Role | undefined;
  isActive: (path: string) => boolean;
}

export default function NavManagemenData({
  role,
  isActive,
}: NavManagemenDataProps) {
  return (
    <SidebarGroup className="px-0">
      <div className="flex items-center">
        <Separator className="w-[1rem] bg-black" />
        <SidebarGroupLabel className="uppercase">
          Management Data
        </SidebarGroupLabel>
      </div>
      <SidebarGroupContent className="space-y-1 px-2">
        <SidebarMenu>
          <EachUtil
            of={navData.management}
            render={(item, index) =>
              item.roles.includes(role as string) && (
                <SidebarMenuButton
                  asChild
                  isActive={isActive(`${ROUTE.DASHBOARD}/${role}/${item.name}`)}
                  key={index}
                  className="data-[active=true]:bg-primary/30 data-[active=true]:text-primary hover:bg-primary/30 hover:text-primary"
                >
                  <Link
                    href={`${ROUTE.DASHBOARD}/${role}/${item.name}`}
                    key={index}
                  >
                    <LayersIcon />
                    <span className="capitalize">{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              )
            }
          />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

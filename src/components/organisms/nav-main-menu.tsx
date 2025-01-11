import { navData } from "@/constant/menu";
import { EachUtil } from "@/utils/each-utils";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "../ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "../ui/separator";
import { ArchiveIcon, ChevronDown, LayersIcon } from "lucide-react";
import Link from "next/link";
import { Role } from "@/interface/type";
import { ROUTE } from "@/services/route";

interface NavMainMenuProps {
  role: Role | undefined;
  isActive: (path: string) => boolean;
}

export default function NavMainMenu({ role, isActive }: NavMainMenuProps) {
  return (
    <SidebarGroup className="px-0 space-y-2">
      <div className="flex items-center">
        <Separator className="w-[1rem] bg-black" />
        <SidebarGroupLabel className="uppercase">Main Menu</SidebarGroupLabel>
      </div>
      <SidebarMenu className="px-2">
        <EachUtil
          of={navData.main}
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

        <EachUtil
          of={navData.sub}
          render={(item, index) =>
            item.roles.includes(role as string) && (
              <Collapsible className="group/collapsible" key={index}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="hover:bg-primary/30 hover:text-primary data-[state=open]:hover:text-primary data-[state=open]:hover:bg-primary/30 capitalize">
                      <ArchiveIcon />
                      {item.name}
                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <SidebarMenuSub>
                      <EachUtil
                        of={item.mainMenu}
                        render={(menu, index) => (
                          <SidebarMenuButton
                            asChild
                            isActive={isActive(
                              `${ROUTE.DASHBOARD}/${role}/${item.name.split(" ").join("-")}/${menu}`,
                            )}
                            key={index}
                            className="data-[active=true]:bg-primary/30 data-[active=true]:text-primary hover:bg-primary/30 hover:text-primary"
                          >
                            <Link
                              href={`${ROUTE.DASHBOARD}/${role}/${item.name.split(" ").join("-")}/${menu}`}
                              key={index}
                            >
                              <LayersIcon />
                              <span className="capitalize">{menu}</span>
                            </Link>
                          </SidebarMenuButton>
                        )}
                      />
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            )
          }
        />
      </SidebarMenu>
    </SidebarGroup>
  );
}

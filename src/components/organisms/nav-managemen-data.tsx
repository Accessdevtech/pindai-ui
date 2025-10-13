import { navData } from "@/constant/menu"
import { Role } from "@/interface/type"
import { ROUTE } from "@/services/route"
import { EachUtil } from "@/utils/each-utils"
import { ArchiveIcon, ChevronDown, LayersIcon } from "lucide-react"
import Link from "next/link"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "../ui/collapsible"
import { Separator } from "../ui/separator"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub
} from "../ui/sidebar"

interface NavManagemenDataProps {
  role: Role | undefined
  isActive: (path: string) => boolean
}

export default function NavManagemenData({
  role,
  isActive
}: NavManagemenDataProps) {
  return (
    <SidebarGroup className='px-0'>
      <div className='flex items-center'>
        <Separator className='w-[1rem] bg-black' />
        <SidebarGroupLabel className='uppercase'>
          Management Data
        </SidebarGroupLabel>
      </div>
      <SidebarGroupContent className='space-y-1 px-2'>
        <SidebarMenu>
          <EachUtil
            of={navData.management}
            render={(item, index) =>
              item.roles.includes(role as string) && (
                <SidebarMenuButton
                  asChild
                  isActive={isActive(`${ROUTE.DASHBOARD}/${role}/${item.name}`)}
                  key={index}
                  className='hover:bg-primary/30 hover:text-primary data-[active=true]:bg-primary/30 data-[active=true]:text-primary'
                >
                  <Link
                    href={`${ROUTE.DASHBOARD}/${role}/${item.name.split(" ").join("-")}`}
                    key={index}
                  >
                    <LayersIcon />
                    <span className='capitalize'>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              )
            }
          />

          <EachUtil
            of={navData.sub}
            render={(item, index) =>
              item.roles.includes(role as string) && (
                <Collapsible className='group/collapsible' key={index}>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className='capitalize hover:bg-primary/30 hover:text-primary data-[state=open]:hover:bg-primary/30 data-[state=open]:hover:text-primary'>
                        <ArchiveIcon />
                        {item.name}
                        <ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent className='mt-2'>
                      <SidebarMenuSub>
                        <EachUtil
                          of={item.manageMenu}
                          render={(menu, index) => (
                            <SidebarMenuButton
                              asChild
                              isActive={isActive(
                                `${ROUTE.DASHBOARD}/${role}/${item.name.split(" ").join("-")}/${menu}`
                              )}
                              key={index}
                              className='hover:bg-primary/30 hover:text-primary data-[active=true]:bg-primary/30 data-[active=true]:text-primary'
                            >
                              <Link
                                href={`${ROUTE.DASHBOARD}/${role}/${item.name.split(" ").join("-")}/${menu}`}
                                key={index}
                              >
                                <LayersIcon />
                                <span className='capitalize'>{menu}</span>
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
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

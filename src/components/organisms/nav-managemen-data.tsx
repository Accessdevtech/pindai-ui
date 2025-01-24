import { navData } from "@/constant/menu"
import { Role } from "@/interface/type"
import { ROUTE } from "@/services/route"
import { EachUtil } from "@/utils/each-utils"
import { LayersIcon } from "lucide-react"
import Link from "next/link"
import { Separator } from "../ui/separator"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
} from "../ui/sidebar"

interface NavManagemenDataProps {
  role: Role | undefined
  isActive: (path: string) => boolean
}

export default function NavManagemenData({
  role,
  isActive,
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
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

"use client"
import Logo from "@/assets/logo.png"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { useAuthContext } from "@/contexts/auth-context"
import { ROUTE } from "@/services/route"
import { HomeIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import NavMainMenu from "./nav-main-menu"
import NavManagemenData from "./nav-managemen-data"

export default function AppSidebar() {
  const { user } = useAuthContext()
  const pathname = usePathname()
  const isActivePage = (path: string) => {
    const pathArray = pathname.split("/")
    const pagePathArray = path.split("/")

    if (pathArray.length !== pagePathArray.length) return false

    for (let i = 0; i < pathArray.length; i++) {
      if (pathArray[i] !== pagePathArray[i]) return false
    }

    return true
  }

  return (
    <Sidebar variant='inset' className='p-0'>
      <SidebarHeader className='flex flex-row items-center px-6 py-5'>
        <Image src={Logo} width={25} height={25} alt='Logo' />
        <span className='text-2xl font-bold uppercase'>Simlitabmas</span>
      </SidebarHeader>
      <SidebarContent className='space-y-2 p-0'>
        <SidebarMenu className='w-full space-y-2 px-2'>
          <SidebarMenuButton
            asChild
            isActive={isActivePage(`${ROUTE.DASHBOARD}/${user?.role}`)}
            className='hover:bg-primary/30 hover:text-primary data-[active=true]:bg-primary/30 data-[active=true]:text-primary'
          >
            <Link href={`${ROUTE.DASHBOARD}/${user?.role}`}>
              <HomeIcon />
              <span className='capitalize'>dashboard</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenu>
        {user?.role !== "dosen" && user?.role !== "keuangan" && (
          <NavManagemenData role={user?.role} isActive={isActivePage} />
        )}
        <NavMainMenu role={user?.role} isActive={isActivePage} />
      </SidebarContent>
    </Sidebar>
  )
}

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import ProfileButton from "../atom/profile-button"
import Tooltip from "../atom/tooltip"
import AppSidebar from "../organisms/app-sidebar"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className='overflow-auto bg-primary/5'>
        <div className='flex flex-grow flex-col px-6'>
          <nav className='sticky top-0 z-10 my-5 rounded-lg bg-background py-4 shadow-md'>
            <div className='flex items-center justify-between px-6'>
              <Tooltip contentText='Toggle Sidebar'>
                <SidebarTrigger />
              </Tooltip>
              <ProfileButton />
            </div>
          </nav>
          <main className='max-h-[calc(100vh-64px] mb-11 flex flex-shrink flex-col'>
            {children}
          </main>
          <footer className='absolute bottom-0 space-x-2 text-muted-foreground'>
            <span>&copy; 2024, made by</span>
            <span className='font-bold uppercase'>Access Dev Team</span>
          </footer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AppSidebar from "../organisms/app-sidebar";
import ProfileButton from "../molecules/profile-button";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-primary/5 overflow-auto">
        <div className="flex flex-col px-6 flex-grow">
          <nav className="bg-background my-5 rounded-lg py-4 sticky top-0 z-10 shadow-md">
            <div className="px-6 flex items-center justify-between">
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarTrigger />
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-black text-primary-foreground text-sm uppercase"
                >
                  Toggle Sidebar
                </TooltipContent>
              </Tooltip>
              <ProfileButton />
            </div>
          </nav>
          <main className="flex flex-col flex-shrink mb-11">{children}</main>
          <footer className="absolute space-x-2 text-muted-foreground bottom-0">
            <span>&copy; 2024, made by</span>
            <span className="font-bold uppercase">Access Dev Team</span>
          </footer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

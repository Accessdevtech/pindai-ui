"use client"

import DashboardLayout from "@/components/layout/dashboard-layout"
import withAuth from "@/components/layout/withAuth"
import { ReactNode } from "react"

// export default function Layout({ children }: PropsWithChildren) {
//   return <DashboardLayout>{children}</DashboardLayout>
// }

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <DashboardLayout>{children}</DashboardLayout>
}

// Export the Layout wrapped with the `withAuth` HOC
export default withAuth(Layout as React.ComponentType)

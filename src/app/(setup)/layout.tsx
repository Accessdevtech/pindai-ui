"use client"

import { ReactNode } from "react"

import withAuth from "@/components/layout/withAuth"

// NOTE: This is a temporary solution.

// export default function Layout({ children }: PropsWithChildren) {
//   return children
// }

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return children
}

// Export the Layout wrapped with the `withAuth` HOC
export default withAuth(Layout as React.ComponentType)

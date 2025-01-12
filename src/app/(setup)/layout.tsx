import QueryProvider from "@/components/provider/query-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { PropsWithChildren } from "react"

export default function Layout({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <QueryProvider>{children}</QueryProvider>
    </AuthProvider>
  )
}

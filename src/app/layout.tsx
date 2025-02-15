import QueryProvider from "@/components/provider/query-provider"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Simlitabmas",
  description: "Simlitabmas Application",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={cn(poppins.className)}>
        <AuthProvider>
          <QueryProvider>
            <SpeedInsights />
            <Toaster
              position='top-center'
              toastOptions={{
                classNames: {
                  success:
                    "text-green-600 border-green-600 capitalize bg-background",
                  error: "text-red-600 border-red-600 capitalize bg-background",
                  loading:
                    "text-foreground border-foreground capitalize bg-background",
                },
              }}
            />
            {children}
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

import { cn } from "@/lib/utils"
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
        <div className='flex h-screen w-full items-center justify-center'>
          <h1 className='text-2xl capitalize tracking-wider'>Offline ....</h1>
        </div>
        {/* <AuthProvider>
          <QueryProvider>
            <SpeedInsights />
            <Toaster
              position='top-center'
              toastOptions={{
                classNames: {
                  info: "text-blue-600 border-blue-600 capitalize bg-background",
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
        </AuthProvider> */}
      </body>
    </html>
  )
}

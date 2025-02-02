import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const user = request.cookies.get("user")
  const token = request.cookies.get("token")

  const isLoggedIn = !!user || !!token

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  if (request.nextUrl.pathname.startsWith("/")) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
}

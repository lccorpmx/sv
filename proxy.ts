import { betterFetch } from "@better-fetch/fetch"
import { NextRequest, NextResponse } from "next/server"

type AuthSession = {
  session: { id: string; userId: string; expiresAt: string }
  user: { id: string; email: string; name: string }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Block public sign-up endpoint
  if (pathname === "/api/auth/sign-up/email") {
    return NextResponse.json({ error: "Registro no disponible." }, { status: 403 })
  }

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const { data: session } = await betterFetch<AuthSession>("/api/auth/get-session", {
      baseURL: request.nextUrl.origin,
      headers: { cookie: request.headers.get("cookie") ?? "" },
    })

    if (!session?.session) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/auth/sign-up/email"],
}

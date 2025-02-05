import { type NextRequest, NextResponse } from "next/server"

export const protectPrivateRoutes = async (req: NextRequest) => {
  const path = req.nextUrl.pathname

  const avoidedRoutes = [path.startsWith("/api"), path === "/sign-up", path === "/sign-in"]

  if (avoidedRoutes.includes(true)) return undefined
  if (!req.cookies.has("token")) return NextResponse.redirect(new URL("/sign-in", req.url))

  return undefined
}

export const protectPublicRoutes = async (req: NextRequest) => {
  const path = req.nextUrl.pathname

  const protectedRoutes = [path === "/sign-up", path === "/sign-in"]

  if (protectedRoutes.includes(true)) {
    if (req.cookies.has("token")) return NextResponse.redirect(new URL("/", req.url))
  }

  return undefined
}

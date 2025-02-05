import { NextResponse, type MiddlewareConfig, type NextRequest } from "next/server"
import { validateJwToken } from "./middlewares/jwt-validation"
import { protectPrivateRoutes, protectPublicRoutes } from "./middlewares/route-protection"

const mws = [protectPublicRoutes, protectPrivateRoutes, validateJwToken]

export async function middleware(req: NextRequest) {
  for (const mw of mws) {
    const response = await mw(req)
    if (response) return response
  }

  return NextResponse.next()
}

export const config: MiddlewareConfig = {
  matcher: ["/((?!_next/static|favicon.ico).*)"],
}

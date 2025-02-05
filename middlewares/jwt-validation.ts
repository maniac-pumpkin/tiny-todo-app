import { verifyJwToken } from "@/lib/jwt-utils"
import { type NextRequest, NextResponse } from "next/server"

export const validateJwToken = async (req: NextRequest) => {
  const path = req.nextUrl.pathname

  const allowedPaths = [path === "/api/users", path.startsWith("/api/tasks"), path.startsWith("/api/directories")]

  if (allowedPaths.includes(true)) {
    const jwToken = await verifyJwToken(req.headers.get("authorization"))

    if (!jwToken) return new NextResponse("Invalid token", { status: 401 })

    const headers = new Headers(req.headers)
    headers.set("userId", String(jwToken.userId))

    return NextResponse.next({ headers })
  }

  return undefined
}

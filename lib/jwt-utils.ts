import { SignJWT, jwtVerify } from "jose"
import { z } from "zod"
import env from "./env"

const secretKey = new TextEncoder().encode(env.JWT_SECRET_TOKEN)

const authTokenSchema = z
  .string()
  .trim()
  .min(8)
  .startsWith("Bearer ")
  .transform((authToken) => authToken.split("Bearer ").at(1))

export const signJwToken = (userId: number) =>
  new SignJWT({ userId }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("24h").sign(secretKey)

export const verifyJwToken = async (jwToken: string | null) => {
  const token = authTokenSchema.safeParse(jwToken)

  if (!token.success) return null

  const { payload } = await jwtVerify(token.data!, secretKey)

  return payload as {
    userId: number
    iat: number
    exp: number
  }
}

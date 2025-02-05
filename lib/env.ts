import { z } from "zod"

const envSchema = z.object({
  JWT_SECRET_TOKEN: z.string(),
  POSTGRES_URL: z.string(),
  NEXT_PUBLIC_BASE_URL: z.string(),
})

const env = envSchema.parse(process.env)

export default env

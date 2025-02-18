import { defineConfig } from "drizzle-kit"
import env from "./lib/env-utils"

export default defineConfig({
  out: "./app/api/db/migration",
  schema: "./app/api/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
})

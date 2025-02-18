import { defineConfig } from "drizzle-kit"

export default defineConfig({
  out: "./app/api/db/migration",
  schema: "./app/api/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env["POSTGRES_URL"]!,
  },
})

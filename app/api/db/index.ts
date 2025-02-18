import env from "@/lib/env-utils"
import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

const sql = neon(env.POSTGRES_URL)
const db = drizzle(sql)

export default db

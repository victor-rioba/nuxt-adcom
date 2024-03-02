import "dotenv/config"
import type { Config } from "drizzle-kit"
import { getConnectionString } from "./server/utils/db/connection"

export default {
  schema: "./server/db/schema.ts",
  out: "./server/db/migrations",
  driver: "pg", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    connectionString: getConnectionString(),
  },
} satisfies Config

import "dotenv/config"
import { drizzle } from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import postgres from "postgres"
import { getConnectionString } from "~/server/utils/db/connection"

const client = postgres(getConnectionString(), { max: 1 })

migrate(drizzle(client), { migrationsFolder: "./server/db/migrations" })

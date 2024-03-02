import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "../db/schema"

const client = postgres(getConnectionString())

export const drizzleClient = drizzle(client, { schema })

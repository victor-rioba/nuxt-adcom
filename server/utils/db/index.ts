import Knex from "knex"
import { attachPaginate } from "knex-paginate"

export const knex = Knex({
  client: "pg",
  connection: getConnectionString(),
})
attachPaginate()

export const db = knex

import Knex from "knex"
import { attachPaginate } from "knex-paginate"

export const db = Knex({
  client: "pg",
  connection: getConnectionString(),
})
attachPaginate()

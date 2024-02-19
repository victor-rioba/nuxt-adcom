import knex from "knex";

import { attachPaginate } from "knex-paginate";

const db = knex({
  client: "pg",
  connection:
    process.env.NODE_ENV === "production"
      ? `${process.env.POSTGRES_URL}?ssl=true`
      : process.env.DEV_POSTGRES_URL,
});
attachPaginate();

export const useKnex = () => db;

export const useDb = <T extends {}>(table: TableName) => {
  return db<T>(table);
};

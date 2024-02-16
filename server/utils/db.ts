import knex from "knex";
import _ from "lodash";

const db = knex({
  client: "pg",
  connection:
    process.env.NODE_ENV === "production"
      ? `${process.env.POSTGRES_URL}?ssl=true`
      : process.env.DEV_POSTGRES_URL,
});

export type Table = "products" | "users";

export const useDb = <T extends {}>(table: Table) => {
  return db<T>(table.split("-").join(""));
};

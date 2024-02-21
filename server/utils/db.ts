import Knex from "knex";
import { Model } from "objection";

import { attachPaginate } from "knex-paginate";

const knex = Knex({
  client: "pg",
  connection:
    process.env.NODE_ENV === "production"
      ? `${process.env.POSTGRES_URL}?ssl=true`
      : process.env.DEV_POSTGRES_URL,
});
attachPaginate();

Model.knex(knex);

export const useKnex = () => knex;

export const useDb = <T extends {}>(table: string) => {
  return knex<T>(table);
};

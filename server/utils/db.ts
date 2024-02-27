import Knex from "knex";
import { attachPaginate } from "knex-paginate";

const isProduction = process.env.NODE_ENV === "production";
export const knex = Knex({
  client: "pg",
  connection: isProduction
    ? `${process.env.POSTGRES_URL}?ssl=true`
    : process.env.DEV_POSTGRES_URL,
});
attachPaginate();

export type DBConfig = {
  user: string;
  password: string;
  port: number;
  db: string;
};

export const useConnectionString = (
  { user, password, port, db } = {} as DBConfig
) => {
  if (!user || !password || !port || !db) {
    return isProduction
      ? `${process.env.POSTGRES_URL}?ssl=true`
      : process.env.DEV_POSTGRES_URL;
  }
  return `postgres://${user}:${password}@localhost:${port}/${db}`;
};

// export const knex = () => {
//   // const knex = Knex({
//   //   client: "pg",
//   //   connection: useConnectionString(),
//   // });
//   return knex;
// };

export const db = <T extends {}>(table: string) => {
  return knex<T>(table);
};

export const useCreateNewDb = async (db: string) => {
  await knex.raw(`CREATE DATABASE ${db}`);
  knex.destroy();
};

type TableSchema = { type: string; defaultTo?: any; isRequired?: boolean };
// Create a function that receives a table name and a new schema, it then updates the table schema with the new schema
export const useUpdateTableSchema = async <
  T extends Record<string, TableSchema>,
>(
  table: string,
  newSchema: T
) => {
  // todo: only update the table if the new schema is different from the current schema
  // todo: add a rollback function to revert the changes if the new schema is not compatible with the current data
  // todo: add a function to create a new table with the new schema and copy the data from the old table to the new table
  await knex.schema.alterTable(table, (table) => {
    table.dropColumns(...Object.keys(newSchema));
    Object.entries(newSchema).forEach(([key, schema]) => {
      const column = table.specificType(key, schema.type);
      if (schema.isRequired) column.notNullable();
      if (schema.defaultTo) column.defaultTo(schema.defaultTo);
    });
  });
  knex.destroy();
};

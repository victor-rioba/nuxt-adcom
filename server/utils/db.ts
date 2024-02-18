import knex from "knex";

const db = knex({
  client: "pg",
  connection:
    process.env.NODE_ENV === "production"
      ? `${process.env.POSTGRES_URL}?ssl=true`
      : process.env.DEV_POSTGRES_URL,
});

export const useKnex = () => db;

export const useDb = <T extends {}>(table: TableName) => {
  return db<T>(table);
};

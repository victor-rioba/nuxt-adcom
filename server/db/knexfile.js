import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

export default {
  development: {
    client: "pg",
    connection: process.env.DEV_POSTGRES_URL,
  },
  production: {
    client: "pg",
    connection: `${process.env.POSTGRES_URL}?ssl=true`,
  },
};

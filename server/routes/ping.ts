export default defineEventHandler(async (event) => {
  return {
    status: "up",
    db: Boolean(await knex.raw("SELECT 1")),
  };
});

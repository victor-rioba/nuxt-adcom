export default defineEventHandler(async (event) => {
  return {
    status: "up",
    db: Boolean(await useKnex().raw("SELECT 1")),
  };
});

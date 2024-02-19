export default defineEventHandler(async (event) => {
  const user = await getUserFromAuth(event);
  // todo: add user role check

  const { rows } = await useKnex().raw(
    "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE' AND NOT table_name LIKE 'knex_migrations%';"
  );

  const data = (rows as { table_name: string }[]).map(
    (table) => table.table_name
  );

  return { data };
});

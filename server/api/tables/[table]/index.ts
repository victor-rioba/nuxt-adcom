
export default defineEventHandler(async (event) => {
  const user = await getUserFromAuth(event);
  // todo: add user role check
  const paginateQuery = usePaginationQuery(event);
  const table = getRouterParam(event, "table")! as TableName;

  const { data, pagination } = await useDb(table)
    .select()
    .paginate(paginateQuery);

  return { data, pagination };
});

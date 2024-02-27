
export default defineEventHandler(async (event) => {
  const user = await getUserFromAuth(event);
  // todo: add user role check
  const paginateParams = getPaginationFromQuery(event);
  const table = getRouterParam(event, "table")!;

  const { data, pagination } = await db(table)
    .select()
    .paginate(paginateParams);

  return { data, pagination };
});

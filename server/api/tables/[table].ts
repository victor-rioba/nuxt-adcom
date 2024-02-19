type Pagination = {
  total?: number;
  lastPage?: number;
  currentPage: number;
  perPage: number;
  from: number;
  to: number;
};

export default defineEventHandler(async (event) => {
  const user = await getUserFromAuth(event);
  // todo: add user role check
  const paginateQuery = usePaginationQuery(event);
  const table = getRouterParam(event, "table")! as TableName;

  const { data, pagination } = await useDb(table)
    .select()
    .paginate(paginateQuery);

  const meta = pagination as Pagination;

  return { data, meta };
});

export default defineEventHandler(async (event) => {
  const store = await getStoreFromAuth(event);

  const paginateQuery = usePaginationQuery(event);

  const { data, pagination } = await useDb<Image>("images")
    .select()
    .where("storeId", store.id)
    .paginate(paginateQuery);

  return { data, pagination };
});

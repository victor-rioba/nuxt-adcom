export default defineEventHandler(async (event) => {
  const store = await getStoreFromAuth(event)

  const paginateParams = getPaginationFromQuery(event)

  const { data, pagination } = await db<Image>("images")
    .select()
    .where("storeId", store.id)
    .paginate(paginateParams)

  return { data, pagination }
})

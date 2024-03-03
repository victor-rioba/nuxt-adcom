import type { Product } from "~/server/types"

export default defineEventHandler(async (event) => {
  const store = await getStoreFromAuth(event)

  const paginateParams = getPaginationFromQuery(event)

  const query = db<Product>("products")
    .where("products.storeId", store.id)
    .select<Product>("products.*")

  const populatedQuery = populateProductRelations(query)

  return populatedQuery.paginate(paginateParams)
})

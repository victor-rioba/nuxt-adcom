import type { Product } from '~/server/db/schema'

export default defineEventHandler(async (event) => {
  const store = await getStoreFromAuth(event)
  const slug = getRouterParam(event, "product")

  const query = db<Product>("products")
    .first()
    .where("products.storeId", store.id)
    .where("products.slug", slug)
    .orWhere("products.id", slug)
    .whereNull("products.deletedAt")
    .select<Product>("products.*")

  return populateProductRelations(query) || notFoundError()
})

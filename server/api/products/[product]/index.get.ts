import type { Product } from "~/server/types"

export default defineEventHandler(async (event) => {
  const store = await getStoreFromAuth(event)
  const slug = getRouterParam(event, "product")

  const query = db<Product>("products")
    .first()
    .where("products.storeId", store.id)
    .where("products.slug", slug)
    .orWhere("products.id", slug)
    .whereNull("products.deletedAt")

  return populateProductRelations(query) || notFoundError()
})

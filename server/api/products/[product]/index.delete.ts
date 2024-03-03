import type { Product } from "~/server/types"

export default defineEventHandler(async (event) => {
  const store = await getStoreFromAuth(event)

  const productId = getRouterParam(event, "product")

  await db<Product>("products")
    .where("storeId", store.id)
    .where("id", productId)
    .update({ deletedAt: new Date().toISOString() })

  return { statusCode: 204 }
})

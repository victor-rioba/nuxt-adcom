export default defineEventHandler(async (event) => {
  const store = await getStoreFromAuth(event);
  const productId = getRouterParam(event, "product");

  const [product] = await useDb<Product>("products")
    .select()
    .where("storeId", store.id)
    .where("id", productId)

  return product || useNotFoundError();
});

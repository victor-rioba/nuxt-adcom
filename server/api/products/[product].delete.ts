export default defineEventHandler(async (event) => {
  const store = await getStoreFromAuth(event);

  const productId = getRouterParam(event, "product");

  await useDb<Product>("products")
    .delete()
    .where("storeId", store.id)
    .where("id", productId);
});

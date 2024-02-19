export default defineEventHandler(async (event) => {
  const store = await useStoreId(event);
  const data = await useDb<Product>("products").select().where("storeId", store.id);
  return { products: data };
});

export default defineEventHandler(async (event) => {
  const store = await getStoreFromAuth(event);
  const slug = getRouterParam(event, "product");

  const product = await useDb<Product>("products")
    .first()
    .where("products.storeId", store.id)
    .where("products.slug", slug)
    .orWhere("products.id", slug)
    .select<Product>(
      "products.*",
      useKnex().raw("json_agg(images.*) as images")
    )
    .leftJoin<Product>(
      "products_images",
      "products.id",
      "products_images.productId"
    )
    .leftJoin<Product>("images", "products_images.imageId", "images.id")
    .groupBy("products.id");

  return product || useNotFoundError();
});

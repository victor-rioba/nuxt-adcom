export default defineEventHandler(async (event) => {
  const store = await getStoreFromAuth(event);

  const paginateQuery = usePaginationQuery(event);

  const { data, pagination } = await useDb<Product>("products")
    .where("products.storeId", store.id)
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
    .groupBy("products.id")
    .paginate(paginateQuery);

  return { data, pagination };
});

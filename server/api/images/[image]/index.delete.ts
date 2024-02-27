export default defineEventHandler(async (event) => {
  const store = await getStoreFromAuth(event);

  const imageId = getRouterParam(event, "image");

  await db<Image>("images")
    .delete()
    .where("storeId", store.id)
    .where("id", imageId);

  return { statusCode: 204 };
});

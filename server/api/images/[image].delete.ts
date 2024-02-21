export default defineEventHandler(async (event) => {
    const store = await getStoreFromAuth(event);
  
    const imageId = getRouterParam(event, "image");
  
    await useDb<Image>("images")
      .delete()
      .where("storeId", store.id)
      .where("id", imageId);
  });
  
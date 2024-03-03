import { productInsertSchema, type Product } from "~/server/types"

const validateProduct = useValidate(productInsertSchema)

export default defineEventHandler(async (event) => {
  const store = await getStoreFromAuth(event)
  const productId = getRouterParam(event, "product")
  const { images, ...body } = await validateProduct(event)

  await db("products")
    .update(body)
    .where("storeId", store.id)
    .where("id", productId)

  if (images?.length) {
    const deletedImages = images
      .filter((img) => img.deleted)
      .map((img) => img.id)
    const addedImages = images
      .filter((img) => !img.deleted)
      .map((img) => img.id)

    await Promise.all(
      [
        addedImages.length &&
          db("products_images").insert(
            addedImages.map((imageId) => ({ imageId, productId })),
          ),
        deletedImages.length &&
          db("products_images")
            .delete()
            .where("productId", productId)
            .whereIn("imageId", deletedImages),
      ].filter(Boolean),
    )
  }

  const query = db<Product>("products")
    .first()
    .where("products.storeId", store.id)
    .where("products.id", productId)
    .select<Product>("products.*")

  return populateProductRelations(query)
})

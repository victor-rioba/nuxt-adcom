import { z } from "zod"

const productsSchema = z.object({
  name: z.string(),
  slug: z.string(),
  sku: z.string().optional(),
  price: z.string(),
  shortDescription: z.string().optional(),
  longDescription: z.string().optional(),
  available: z.number().optional(),
  images: z
    .array(z.object({ id: z.string(), deleted: z.boolean() }))
    .optional(),
  isActive: z.boolean(),
})

const validateProduct = useValidate(productsSchema)

export default defineEventHandler(async (event) => {
  const store = await getStoreFromAuth(event)
  const productId = getRouterParam(event, "product")
  const { images, ...body } = await validateProduct(event)

  await db<Omit<Product, "images">>("products")
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

  return populateProductRelations(query)
})

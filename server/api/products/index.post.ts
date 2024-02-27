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
  const { id: storeId } = await getStoreFromAuth(event)
  const { images, ...body } = await validateProduct(event)

  const [{ id: productId }] = await db<Omit<Product, "images">>("products")
    .insert({ ...body, storeId })
    .returning("id")

  if (images?.length) {
    await db("products_images").insert(
      images
        .filter((img) => !img.deleted)
        .map((img) => ({ imageId: img.id, productId })),
    )
  }
  const query = db<Product>("products")
    .first()
    .where("products.id", productId)

  return populateProductRelations(query)
})

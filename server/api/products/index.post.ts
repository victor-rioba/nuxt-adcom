import {
  productInsertSchema,
  type Product,
  type ProductImageInsert,
  type ProductInsert,
} from "~/server/types"

const validateProduct = useValidate(productInsertSchema)

export default defineEventHandler(async (event) => {
  const { id: storeId } = await getStoreFromAuth(event)
  const { images, ...body } = await validateProduct(event)

  const [{ id: productId }] = await db<ProductInsert>("products")
    .insert({ ...body, storeId })
    .returning("id")

  if (images?.length) {
    await db<ProductImageInsert>("products_images").insert(
      images
        .filter((img) => !img.deleted)
        .map((img) => ({ imageId: img.id, productId })),
    )
  }
  const query = db<Product>("products").first().where("products.id", productId)

  return populateProductRelations(query)
})

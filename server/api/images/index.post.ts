import { imageInsertSchema, type Image } from "~/server/types"

const validateProduct = useValidate(imageInsertSchema)

export default defineEventHandler(async (event) => {
  const { id: storeId } = await getStoreFromAuth(event)
  const body = await validateProduct(event)

  const [image] = await db<Image>("images")
    .insert({ ...body, storeId })
    .returning("*")

  return image
})

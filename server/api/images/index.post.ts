import { z } from "zod";

const imageSchema = z.object({
  assetId: z.string(),
  signature: z.string(),
  width: z.number(),
  height: z.number(),
  format: z.string(),
  bytes: z.number(),
  type: z.string(),
  url: z.string(),
  secureUrl: z.string(),
  folder: z.string(),
  path: z.string(),
});

const validateProduct = useValidate(imageSchema);

export default defineEventHandler(async (event) => {
  const { id: storeId } = await getStoreFromAuth(event);
  const body = await validateProduct(event);

  const [image] = await db<Image>("images")
    .insert({ ...body, storeId })
    .returning("*");

  return image;
});

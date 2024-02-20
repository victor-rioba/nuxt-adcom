import { z } from "zod";

const productsSchema = z.object({
  name: z.string(),
  slug: z.string(),
  sku: z.string().optional(),
  price: z.string(),
  shortDescription: z.string().optional(),
  longDescription: z.string().optional(),
  available: z.number().optional(),
  images: z.array(z.string()),
  isActive: z.boolean(),
});

const validateProduct = useValidate(productsSchema);

export default defineEventHandler(async (event) => {
  const store = await getStoreFromAuth(event);
  const body = await validateProduct(event);
  const productId = getRouterParam(event, "product");


  const [product] = await useDb<Product>("products")
    .update(body)
    .where("storeId", store.id)
    .where("id", productId)
    .returning("*");

  return product;
});

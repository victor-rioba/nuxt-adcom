import { z } from "zod";

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
});

const validateProduct = useValidate(productsSchema);

export default defineEventHandler(async (event) => {
  const { id: storeId } = await getStoreFromAuth(event);
  const { images, ...body } = await validateProduct(event);

  const [{ id: productId }] = await useDb<Omit<Product, "images">>("products")
    .insert({ ...body, storeId })
    .returning("id");

  if (images?.length) {
    await useDb("products_images").insert(
      images
        .filter((img) => !img.deleted)
        .map((img) => ({ imageId: img.id, productId }))
    );
  }
  const product = await useDb<Product>("products")
    .first()
    .where("products.id", productId)
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
    .groupBy("products.id");

  return product;
});

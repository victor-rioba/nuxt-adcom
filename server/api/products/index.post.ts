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
  const { id: storeId } = await getStoreFromAuth(event);
  const { images, ...body } = await validateProduct(event);

  const [{ id: productId }] = await useDb<Omit<Product, "images">>("products")
    .insert({ ...body, storeId })
    .returning("id");
  await useDb("products_images").insert(
    images.map((imageId) => ({ imageId, productId }))
  );
  const product = await useDb<Product>("products")
    .select()
    .where("id", productId)
    .first()
    .join("products_images", "products.id", "products_images.productId")
    .join("images", "products_images.imageId", "images.id")
    .select("images.*", "products.*");
  return product;
});

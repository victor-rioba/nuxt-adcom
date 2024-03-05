import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import {
  attributes,
  categories,
  customergroups,
  customergroups_users,
  images,
  products,
  products_attributes,
  products_categories,
  products_images,
  stores,
  users,
  variants,
  variants_attributes,
  variants_images,
} from "./db/schema"

export type User = typeof users.$inferSelect
export type UserInsert = typeof users.$inferInsert
export const userInsertSchema = createInsertSchema(users)
export const userSelectSchema = createSelectSchema(users)

export type Store = typeof stores.$inferSelect
export type StoreInsert = typeof stores.$inferInsert
export const storeInsertSchema = createInsertSchema(stores)
export const storeSelectSchema = createSelectSchema(stores)

export type Customergroup = typeof customergroups.$inferSelect
export type CustomergroupInsert = typeof customergroups.$inferInsert
export const customergroupInsertSchema = createInsertSchema(customergroups)
export const customergroupSelectSchema = createSelectSchema(customergroups)

export type CustomergroupUser = typeof customergroups_users.$inferSelect
export type CustomergroupUserInsert = typeof customergroups_users.$inferInsert
export const customergroupUserInsertSchema =
  createInsertSchema(customergroups_users)
export const customergroupUserSelectSchema =
  createSelectSchema(customergroups_users)

export type Category = typeof categories.$inferSelect
export type CategoryInsert = typeof categories.$inferInsert
export const categoryInsertSchema = createInsertSchema(categories)
export const categorySelectSchema = createSelectSchema(categories)

export type Product = typeof products.$inferSelect
export type ProductInsert = typeof products.$inferInsert
export const productInsertSchema = createInsertSchema(products)
  .omit({ storeId: true, id: true, createdAt: true, updatedAt: true })
  .extend({
    images: z
      .array(z.object({ id: z.string(), deleted: z.boolean() }))
      .optional(),
  })

export const productSelectSchema = createSelectSchema(products)

export type ProductCategory = typeof products_categories.$inferSelect
export type ProductCategoryInsert = typeof products_categories.$inferInsert
export const productCategoryInsertSchema =
  createInsertSchema(products_categories)
export const productCategorySelectSchema =
  createSelectSchema(products_categories)

export type Attribute = typeof attributes.$inferSelect
export type AttributeInsert = typeof attributes.$inferInsert
export const attributeInsertSchema = createInsertSchema(attributes)
export const attributeSelectSchema = createSelectSchema(attributes)

export type ProductAttribute = typeof products_attributes.$inferSelect
export type ProductAttributeInsert = typeof products_attributes.$inferInsert

export const productAttributeInsertSchema =
  createInsertSchema(products_attributes)

export const productAttributeSelectSchema =
  createSelectSchema(products_attributes)

export type Variant = typeof variants.$inferSelect
export type VariantInsert = typeof variants.$inferInsert
export const variantInsertSchema = createInsertSchema(variants)
export const variantSelectSchema = createSelectSchema(variants)

export type Image = typeof images.$inferSelect
export type ImageInsert = typeof images.$inferInsert
export const imageInsertSchema = createInsertSchema(images)
export const imageSelectSchema = createSelectSchema(images)

export type ProductImage = typeof products_images.$inferSelect
export type ProductImageInsert = typeof products_images.$inferInsert
export const productImageInsertSchema = createInsertSchema(products_images)
export const productImageSelectSchema = createSelectSchema(products_images)

export type VariantAttribute = typeof variants_attributes.$inferSelect
export type VariantAttributeInsert = typeof variants_attributes.$inferInsert
export const variantAttributeInsertSchema =
  createInsertSchema(variants_attributes)
export const variantAttributeSelectSchema =
  createSelectSchema(variants_attributes)

export type VariantImage = typeof variants_images.$inferSelect
export type VariantImageInsert = typeof variants_images.$inferInsert
export const variantImageInsertSchema = createInsertSchema(variants_images)
export const variantImageSelectSchema = createSelectSchema(variants_images)

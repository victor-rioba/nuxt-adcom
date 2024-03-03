import { relations } from "drizzle-orm"
import {
  boolean,
  integer,
  json,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core"

export const users = pgTable(
  "users",
  {
    id: varchar("id")
      .primaryKey()
      .$defaultFn(() => "uuid_generate_v4()"),
    externalId: varchar("externalId").notNull().unique(),

    firstName: varchar("firstName", { length: 256 }).notNull(),
    lastName: varchar("lastName", { length: 256 }),
    email: varchar("email", { length: 256 }).notNull().unique(),
    username: varchar("username"),
    avatar: varchar("avatar"),

    createdAt: timestamp("createdAt", { mode: "string" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "string" })
      .notNull()
      .defaultNow(),
  },
  (t) => ({
    externalIdIndex: uniqueIndex("users_externalId_idx").on(t.externalId),
    emailIndex: uniqueIndex("users_email_idx").on(t.email),
  }),
)

export const stores = pgTable("stores", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => "uuid_generate_v4()"),
  userId: varchar("userId")
    .notNull()
    .references(() => users.id),

  name: varchar("name").notNull(),
  legalName: varchar("legalName"),
  timezone: varchar("timezone"),
  language: varchar("language"),
  unitSystem: varchar("unitSystem"),
  defaultWeightUnit: varchar("defaultWeightUnit"),

  createdAt: timestamp("createdAt", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "string" }).notNull().defaultNow(),
})

export const customergroups = pgTable("customergroups", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => "uuid_generate_v4()"),
  storeId: varchar("storeId")
    .notNull()
    .references(() => stores.id),
  imageId: varchar("imageId").references(() => images.id),

  name: varchar("name").notNull(),

  createdAt: timestamp("createdAt", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "string" }).notNull().defaultNow(),
})

export const customergroups_users = pgTable(
  "customergroups_users",
  {
    customerGroupId: varchar("customerGroupId")
      .notNull()
      .references(() => customergroups.id),
    customerId: varchar("customerId")
      .notNull()
      .references(() => users.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.customerGroupId, t.customerId] }),
  }),
)

export const categories = pgTable("categories", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => "uuid_generate_v4()"),
  storeId: varchar("storeId")
    .notNull()
    .references(() => stores.id),
  imageId: varchar("imageId").references(() => images.id),

  name: varchar("name").notNull(),
  slug: varchar("slug").notNull(),
  description: text("description"),

  createdAt: timestamp("createdAt", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "string" }).notNull().defaultNow(),
})

export const products = pgTable("products", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => "uuid_generate_v4()"),
  storeId: varchar("storeId")
    .notNull()
    .references(() => stores.id),

  name: varchar("name").notNull(),
  slug: varchar("slug").notNull(),
  sku: varchar("sku"),
  price: varchar("price"),
  shortDescription: text("shortDescription"),
  longDescription: text("longDescription"),
  available: integer("available"),

  isActive: boolean("isActive").default(false),

  createdAt: timestamp("createdAt", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "string" }).notNull().defaultNow(),
  deletedAt: timestamp("deletedAt", { mode: "string" }),
})

export const products_categories = pgTable(
  "products_categories",
  {
    productId: varchar("productId")
      .notNull()
      .references(() => products.id),
    categoryId: varchar("categoryId")
      .notNull()
      .references(() => categories.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.productId, t.categoryId] }),
  }),
)

export const attributes = pgTable("attributes", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => "uuid_generate_v4()"),
  storeId: varchar("storeId")
    .notNull()
    .references(() => stores.id),

  name: varchar("name").notNull(),
  slug: varchar("slug").notNull(),

  type: varchar("type").default("string"),
  inputType: varchar("inputType").default("text"),
  isRequired: boolean("isRequired").default(false),

  options: json("options").default([]),
  unit: varchar("unit"),

  isConfigurable: boolean("isConfigurable").default(false),
  isFilterable: boolean("isFilterable").default(false),
  isSearchable: boolean("isSearchable").default(false),

  createdAt: timestamp("createdAt", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "string" }).notNull().defaultNow(),
})

export const products_attributes = pgTable(
  "products_attributes",
  {
    productId: varchar("productId")
      .notNull()
      .references(() => products.id),
    attributeId: varchar("attributeId")
      .notNull()
      .references(() => attributes.id),

    value: varchar("value"),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.productId, t.attributeId] }),
  }),
)

export const variants = pgTable("variants", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => "uuid_generate_v4()"),
  productId: varchar("productId")
    .notNull()
    .references(() => products.id),

  sku: varchar("sku"),
  price: varchar("price").notNull(),
  shortDescription: text("shortDescription"),
  longDescription: text("longDescription"),
  available: varchar("available").notNull(),

  isActive: boolean("isActive").default(false),

  createdAt: timestamp("createdAt", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "string" }).notNull().defaultNow(),
  deletedAt: timestamp("deletedAt", { mode: "string" }),
})

export const variants_attributes = pgTable(
  "variants_attributes",
  {
    variantId: varchar("variantId")
      .notNull()
      .references(() => variants.id),
    attributeId: varchar("attributeId")
      .notNull()
      .references(() => attributes.id),

    value: varchar("value").notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.variantId, t.attributeId] }),
  }),
)

export const images = pgTable("images", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => "uuid_generate_v4()"),
  storeId: varchar("storeId")
    .notNull()
    .references(() => stores.id),

  assetId: varchar("assetId").notNull().unique(),
  signature: varchar("signature").notNull(),
  width: varchar("width").notNull(),
  height: varchar("height").notNull(),
  format: varchar("format").notNull(),
  bytes: varchar("bytes").notNull(),
  type: varchar("type").notNull(),
  url: varchar("url").notNull(),
  secureUrl: varchar("secureUrl"),
  folder: varchar("folder").notNull(),
  path: varchar("path").notNull(),

  createdAt: timestamp("createdAt", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "string" }).notNull().defaultNow(),
  deletedAt: timestamp("deletedAt", { mode: "string" }),
})

export const products_images = pgTable(
  "products_images",
  {
    productId: varchar("productId")
      .notNull()
      .references(() => products.id),
    imageId: varchar("imageId")
      .notNull()
      .references(() => images.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.productId, t.imageId] }),
  }),
)

export const variants_images = pgTable(
  "variants_images",
  {
    variantId: varchar("variantId")
      .notNull()
      .references(() => variants.id),
    imageId: varchar("imageId")
      .notNull()
      .references(() => images.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.variantId, t.imageId] }),
  }),
)

// Relations

export const productsRelations = relations(products, ({ many }) => ({
  variants: many(variants),
  productImages: many(products_images),
  // images: many(images),
  // categories: many(categories),
  // attributes: many(attributes),
}))

export const variantsRelations = relations(variants, ({ one }) => ({
  product: one(products, {
    fields: [variants.productId],
    references: [products.id],
  }),
}))

export const imagesRelations = relations(images, ({ many }) => ({
  imageProducts: many(products_images),
}))

export const products_imagesRelations = relations(
  products_images,
  ({ one }) => ({
    images: one(images, {
      fields: [products_images.imageId],
      references: [images.id],
    }),
    products: one(products, {
      fields: [products_images.productId],
      references: [products.id],
    }),
  }),
)

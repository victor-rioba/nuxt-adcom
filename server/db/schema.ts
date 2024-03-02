import { relations } from "drizzle-orm"
import {
  boolean,
  json,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core"

export const Users = pgTable(
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

    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  },
  (users) => {
    return {
      externalIdIndex: uniqueIndex("users_externalId_idx").on(users.externalId),
      emailIndex: uniqueIndex("users_email_idx").on(users.email),
    }
  },
)

export type User = typeof Users.$inferSelect // return type when queried
export type NewUser = typeof Users.$inferInsert // insert type

export const Stores = pgTable("stores", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => "uuid_generate_v4()"),
  userId: varchar("userId")
    .notNull()
    .references(() => Users.id),

  legalName: varchar("legalName"),
  timezone: varchar("timezone"),
  language: varchar("language"),
  unitSystem: varchar("unitSystem"),
  defaultWeightUnit: varchar("defaultWeightUnit"),

  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export type Store = typeof Stores.$inferSelect // return type when queried
export type NewStore = typeof Stores.$inferInsert // insert type

export const CustomerGroups = pgTable("customergroups", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => "uuid_generate_v4()"),
  storeId: varchar("storeId")
    .notNull()
    .references(() => Stores.id),
  imageId: varchar("imageId").references(() => Images.id),

  name: varchar("name").notNull(),

  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const CustomerGroups_Users = pgTable("customergroups_users", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => "uuid_generate_v4()"),
  customerGroupId: varchar("customerGroupId")
    .notNull()
    .references(() => CustomerGroups.id),
  customerId: varchar("customerId")
    .notNull()
    .references(() => Users.id),

  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const Categories = pgTable("categories", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => "uuid_generate_v4()"),
  storeId: varchar("storeId")
    .notNull()
    .references(() => Stores.id),
  imageId: varchar("imageId").references(() => Images.id),

  name: varchar("name").notNull(),
  slug: varchar("slug").notNull(),
  description: text("description"),

  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const Products = pgTable("products", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => "uuid_generate_v4()"),
  storeId: varchar("storeId")
    .notNull()
    .references(() => Stores.id),

  name: varchar("name").notNull(),
  slug: varchar("slug").notNull(),
  sku: varchar("sku"),
  price: varchar("price"),
  shortDescription: text("shortDescription"),
  longDescription: text("longDescription"),
  available: varchar("available"),

  isActive: boolean("isActive").default(false),

  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  deletedAt: timestamp("deletedAt"),
})

export const ProductsRelations = relations(Products, ({ many }) => ({
  variants: many(Variants),
  productImages: many(Products_Images),
  // images: many(images),
  // categories: many(categories),
  // attributes: many(attributes),
}))

export type Product = typeof Products.$inferSelect // return type when queried
export type NewProduct = typeof Products.$inferInsert // insert type

export const Products_Categories = pgTable("products_categories", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => "uuid_generate_v4()"),
  productId: varchar("productId")
    .notNull()
    .references(() => Products.id),
  categoryId: varchar("categoryId")
    .notNull()
    .references(() => Categories.id),

  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const Attributes = pgTable("attributes", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => "uuid_generate_v4()"),
  storeId: varchar("storeId")
    .notNull()
    .references(() => Stores.id),

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

  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const Products_Attributes = pgTable("products_attributes", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => "uuid_generate_v4()"),
  productId: varchar("productId")
    .notNull()
    .references(() => Products.id),
  attributeId: varchar("attributeId")
    .notNull()
    .references(() => Attributes.id),

  value: varchar("value"),

  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const Variants = pgTable("variants", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => "uuid_generate_v4()"),
  productId: varchar("productId")
    .notNull()
    .references(() => Products.id),

  sku: varchar("sku"),
  price: varchar("price").notNull(),
  shortDescription: text("shortDescription"),
  longDescription: text("longDescription"),
  available: varchar("available").notNull(),

  isActive: boolean("isActive").default(false),

  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  deletedAt: timestamp("deletedAt"),
})

export const VariantsRelations = relations(Variants, ({ one }) => ({
  product: one(Products, {
    fields: [Variants.productId],
    references: [Products.id],
  }),
}))

export const Variants_Attributes = pgTable("variants_attributes", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => "uuid_generate_v4()"),
  variantId: varchar("variantId")
    .notNull()
    .references(() => Variants.id),
  attributeId: varchar("attributeId")
    .notNull()
    .references(() => Attributes.id),

  value: varchar("value").notNull(),

  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const Images = pgTable("images", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => "uuid_generate_v4()"),
  storeId: varchar("storeId")
    .notNull()
    .references(() => Stores.id),

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

  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  deletedAt: timestamp("deletedAt"),
})

export const ImagesRelations = relations(Images, ({ many }) => ({
  imageProducts: many(Products_Images),
}));

export type Image = typeof Images.$inferSelect // return type when queried
export type NewImage = typeof Images.$inferInsert // insert type

export const Products_Images = pgTable("products_images", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => "uuid_generate_v4()"),
  productId: varchar("productId")
    .notNull()
    .references(() => Products.id),
  imageId: varchar("imageId")
    .notNull()
    .references(() => Images.id),

  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const Products_ImagesRelations = relations(Products_Images, ({ one }) => ({
  images: one(Images, {
    fields: [Products_Images.imageId],
    references: [Images.id],
  }),
  products: one(Products, {
    fields: [Products_Images.productId],
    references: [Products.id],
  }),
}));

export type ProductImage = typeof Products_Images.$inferSelect // return type when queried
export type NewProductImage = typeof Products_Images.$inferInsert // insert type

export const Variants_Images = pgTable("variants_images", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => "uuid_generate_v4()"),
  variantId: varchar("variantId")
    .notNull()
    .references(() => Variants.id),
  imageId: varchar("imageId")
    .notNull()
    .references(() => Images.id),

  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

import knex from "knex";

/**
 *
 * @param {knex.Knex} knex
 */
export function up(knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable("users", (table) => {
      table.string("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("externalId").notNullable().unique();

      table.string("firstName").notNullable();
      table.string("lastName");
      table.string("username");
      table.string("email").notNullable().unique().collate("utf8_unicode_ci");
      table.string("avatar");

      table.timestamps(true, true, true);
    })
    .createTable("stores", (table) => {
      table.string("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("userId").notNullable(); // owner

      table.string("name").notNullable();

      table.string("legalName");
      table.string("timezone");
      table.string("language");
      table.string("unitSystem");
      table.string("defaultWeightUnit");

      table.timestamps(true, true, true);
    })
    .createTable("customergroups", (table) => {
      table.string("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("storeId").notNullable();
      table.string("imageId");

      table.string("name").notNullable();

      table.timestamps(true, true, true);
    })
    .createTable("customergroups_users", (table) => {
      table.string("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));

      table.string("customerGroupId").notNullable();
      table.string("customerId").notNullable();

      table.timestamps(true, true, true);
    })
    .createTable("categories", (table) => {
      table.string("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("storeId").notNullable();
      table.string("imageId");

      table.string("name").notNullable();
      table.string("slug").notNullable();
      table.text("description");

      table.timestamps(true, true, true);
    })
    .createTable("products", (table) => {
      table.string("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("storeId").notNullable();

      table.string("name").notNullable();
      table.string("slug").notNullable();
      table.string("sku");
      table.string("price");
      table.string("shortDescription");
      table.string("longDescription");
      table.string("available");

      table.boolean("isActive").defaultTo(false);

      table.timestamps(true, true, true);
      table.timestamp("deletedAt");
    })
    .createTable("products_categories", (table) => {
      table.string("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));

      table.string("productId").notNullable();
      table.string("categoryId").notNullable();

      table.timestamps(true, true, true);
    })
    .createTable("attributes", (table) => {
      table.string("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("storeId").notNullable();

      table.string("name").notNullable();
      table.string("slug").notNullable();

      table.string("type").defaultTo("string");
      table.string("inputType").defaultTo("text");
      table.boolean("isRequired").defaultTo(false);

      table.json("options").defaultTo("[]");
      table.string("unit");

      table.boolean("isConfigurable").defaultTo(false);
      table.boolean("isFilterable").defaultTo(false);
      table.boolean("isSearchable").defaultTo(false);

      table.timestamps(true, true, true);
    })
    .createTable("products_attributes", (table) => {
      table.string("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));

      table.string("productId").notNullable();
      table.string("attributeId").notNullable();

      table.string("value");

      table.timestamps(true, true, true);
    })
    .createTable("variants", (table) => {
      table.string("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("productId").notNullable();

      table.string("sku");
      table.string("price").notNullable();
      table.string("shortDescription");
      table.string("longDescription");
      table.string("available").notNullable();

      table.boolean("isActive").defaultTo(false);

      table.timestamps(true, true, true);
      table.timestamp("deletedAt");
    })
    .createTable("variants_attributes", (table) => {
      table.string("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));

      table.string("variantId").notNullable();
      table.string("attributeId").notNullable();

      table.string("value");

      table.timestamps(true, true, true);
    })
    .createTable("images", (table) => {
      table.string("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("storeId").notNullable();

      table.string("assetId").notNullable().unique();
      table.string("signature").notNullable();
      table.string("width").notNullable();
      table.string("height").notNullable();
      table.string("format").notNullable();
      table.string("bytes").notNullable();
      table.string("type").notNullable();
      table.string("url").notNullable();
      table.string("secureUrl");
      table.string("folder").notNullable();
      table.string("path").notNullable();

      table.timestamps(true, true, true);
      table.timestamp("deletedAt");
    })
    .createTable("products_images", (table) => {
      table.string("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));

      table.string("productId").notNullable();
      table.string("imageId").notNullable();

      table.timestamps(true, true, true);
    })
    .createTable("variants_images", (table) => {
      table.string("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));

      table.string("variantId").notNullable();
      table.string("imageId").notNullable();

      table.timestamps(true, true, true);
    });
}

/**
 *
 * @param {knex.Knex} knex
 */
export function down(knex) {
  return knex.schema
    .dropTable("users")
    .dropTable("stores")
    .dropTable("customergroups")
    .dropTable("customergroups_users")
    .dropTable("categories")
    .dropTable("products")
    .dropTable("products_categories")
    .dropTable("attributes")
    .dropTable("products_attributes")
    .dropTable("variants")
    .dropTable("variants_attributes")
    .dropTable("images")
    .dropTable("products_images")
    .dropTable("variants_images");
}

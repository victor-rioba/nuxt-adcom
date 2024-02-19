import knex from "knex";

/**
 *
 * @param {knex.Knex} knex
 */
export function up(knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments();
      table.string("externalId").notNullable().unique();

      table.string("firstName").notNullable();
      table.string("lastName");
      table.string("username");
      table.string("email").notNullable().unique();
      table.string("image");

      table.timestamps(true, true, true);
    })
    .createTable("stores", (table) => {
      table.increments();
      table.integer("userId").unsigned().notNullable(); // owner

      table.string("name").notNullable();

      table.string("legalName");
      table.string("timezone");
      table.string("language");
      table.string("unitSystem");
      table.string("defaultWeightUnit");

      table.timestamps(true, true, true);
    })
    .createTable("customergroups", (table) => {
      table.increments();
      table.integer("storeId").unsigned().notNullable();

      table.string("name").notNullable();

      table.timestamps(true, true, true);
    })
    .createTable("customergroups_users", (table) => {
      table.increments();

      table.integer("customerGroupId").unsigned().notNullable();
      table.integer("customerId").unsigned().notNullable();

      table.timestamps(true, true, true);
    })
    .createTable("categories", (table) => {
      table.increments();
      table.integer("storeId").unsigned().notNullable();

      table.string("name").notNullable();
      table.string("slug").notNullable();
      table.text("description");
      table.string("image");

      table.timestamps(true, true, true);
    })
    .createTable("products", (table) => {
      table.increments();
      table.integer("storeId").unsigned().notNullable();

      table.string("name").notNullable();
      table.string("slug").notNullable();
      table.string("sku");
      table.string("price");
      table.string("shortDescription");
      table.string("longDescription");
      table.string("available");

      table.json("images").defaultTo("[]");

      table.boolean("isActive").defaultTo(false);

      table.timestamps(true, true, true);
      table.timestamp("deletedAt");
    })
    .createTable("product_categories", (table) => {
      table.increments();

      table.integer("productId").unsigned().notNullable();
      table.integer("categoryId").unsigned().notNullable();

      table.timestamps(true, true, true);
    })
    .createTable("attributes", (table) => {
      table.increments();
      table.integer("storeId").unsigned().notNullable();

      table.string("name").notNullable();
      table.string("slug").notNullable();

      table.string("type").defaultTo("string");
      table.string("inputType").defaultTo("text");

      table.json("options").defaultTo("[]");
      table.string("unit");

      table.boolean("isConfigurable").defaultTo(false);
      table.boolean("isFilterable").defaultTo(false);
      table.boolean("isSearchable").defaultTo(false);

      table.timestamps(true, true, true);
    })
    .createTable("product_attributes", (table) => {
      table.increments();

      table.integer("productId").unsigned().notNullable();
      table.integer("attributeId").unsigned().notNullable();

      table.string("value");

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
    .dropTable("product_categories")
    .dropTable("attributes")
    .dropTable("product_attributes");
}

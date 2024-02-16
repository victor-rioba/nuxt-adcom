export function up(knex) {
  return knex.schema
    .createTable("enterprises", (table) => {
      table.increments();
      table.integer("userId").unsigned().notNullable();

      table.string("name");
      table.string("description");

      table.timestamps(true, true, true);
    })
    .createTable("users", (table) => {
      table.increments();
      table.integer("enterpriseId").unsigned();
      table.integer("createdBy").unsigned();
      table.integer("storeId").unsigned();

      table.string("firstName");
      table.string("lastName");
      table.string("username");
      table.string("email");
      table.string("image");

      table.timestamps(true, true, true);

      // table.foreign("enterpriseId").references("id").inTable("enterprises");
    })
    .createTable("customergroups", (table) => {
      table.increments();
      table.integer("enterpriseId").unsigned();

      table.string("name").notNullable();

      table.timestamps(true, true, true);
    })
    .createTable("customergroups_users", (table) => {
      table.increments();

      table.integer("customerGroupId").unsigned();
      table.integer("customerId").unsigned();

      table.timestamps(true, true, true);
    })
    .createTable("stores", (table) => {
      table.increments();
      table.integer("enterpriseId").unsigned();

      table.string("name");
      table.string("legalName");
      table.string("timezone");
      table.string("language");
      table.string("unitSystem");
      table.string("defaultWeightUnit");

      table.timestamps(true, true, true);
    })
    .createTable("categories", (table) => {
      table.increments();
      table.integer("enterpriseId").unsigned();
      table.integer("storeId").unsigned();

      table.string("name").notNullable();
      table.text("description");
      table.string("string");

      table.timestamps(true, true, true);
    })
    .createTable("products", (table) => {
      table.increments();
      table.integer("enterpriseId").unsigned();
      table.integer("storeId").unsigned();

      table.string("sku");
      table.string("slug");
      table.string("title");
      table.string("price");
      table.string("shortDescription");
      table.string("longDescription");
      table.string("available");

      table.json("images");
      table.json("categories");

      table.boolean("status").default(false);

      table.timestamps(true, true, true);
      table.timestamp("deletedAt");
    })
    .createTable("attributes", (table) => {
      table.increments();

      table.string("label");
      table.string("name");
      table.string("type");
      table.string("configurable");

      table.timestamps(true, true, true);
    })
    .createTable("attributeoptions", (table) => {
      table.increments();
      table.integer("attributeId").unsigned();

      table.string("label");
      table.string("value");

      table.timestamps(true, true, true);
    })
    .createTable("variants", (table) => {
      table.increments();
      table.integer("productId").unsigned();

      table.string("sku");
      table.string("title");
      table.string("price");
      table.string("shortDescription");
      table.string("longDescription");
      table.string("available");

      table.json("images");

      table.boolean("status").default(false);

      table.timestamps(true, true, true);
    })
    .createTable("variantattributes", (table) => {
      table.increments();
      table.integer("productVariantId").unsigned();
      table.integer("productAttributeId").unsigned();

      table.string("value");

      table.timestamps(true, true, true);
    })
    .createTable("carts", (table) => {
      table.increments();
      table.integer("storeId").unsigned();
      table.integer("customerId").unsigned().notNullable();

      table.string("token");

      table.timestamps(true, true, true);
    })
    .createTable("cartitems", (table) => {
      table.increments();
      table.integer("cartId").unsigned();
      table.integer("productId").unsigned();

      table.integer("quantity");

      table.timestamps(true, true, true);
    });
}

export function down(knex) {
  return knex.schema
    .dropTable("enterprises")
    .dropTable("users")
    .dropTable("customergroups")
    .dropTable("customergroups_users")
    .dropTable("stores")
    .dropTable("categories")
    .dropTable("products")
    .dropTable("attributes")
    .dropTable("attributeoptions")
    .dropTable("variants")
    .dropTable("variantattributes")
    .dropTable("carts")
    .dropTable("cartitems");
}

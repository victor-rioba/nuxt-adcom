import type { Knex } from "knex"

export const populateThrough = <T extends {}>(
  query: Knex.QueryBuilder<T>,
  left: string,
  right: string,
  through: {
    table: string
    leftColumn: string
    rightColumn: string
  },
) => {
  return query
    .select<T>(
      knex.raw(
        `coalesce(json_agg(${right}.*) FILTER (WHERE ${right}.id IS NOT NULL), '[]') as ${right}`,
      ),
    )
    .leftJoin<T>(
      through.table,
      `${left}.id`,
      `${through.table}.${through.leftColumn}`,
    )
    .leftJoin<T>(
      `${right}`,
      `${through.table}.${through.rightColumn}`,
      `${right}.id`,
    )
    .groupBy(`${left}.id`)
}

export const populate = <T extends {}>(
  query: Knex.QueryBuilder<T>,
  left: string,
  right: string,
  rightColumn: string,
) => {
  return query
    .select<T>(
      knex.raw(
        `coalesce(json_agg(${right}.*) FILTER (WHERE ${right}.id IS NOT NULL), '[]') as ${right}`,
      ),
    )
    .leftJoin<T>(`${right}`, `${left}.id`, `${right}.${rightColumn}`)
    .groupBy(`${left}.id`)
}

const populateImages = <T extends {}>(query: Knex.QueryBuilder<T>) => {
  return populateThrough(query, "products", "images", {
    table: "products_images",
    leftColumn: "productId",
    rightColumn: "imageId",
  })
}

const populateVariants = <T extends {}>(query: Knex.QueryBuilder<T>) => {
  return populate(query, "products", "variants", "productId")
}

const populateCategories = <T extends {}>(query: Knex.QueryBuilder<T>) => {
  return populateThrough(query, "products", "categories", {
    table: "products_categories",
    leftColumn: "productId",
    rightColumn: "categoryId",
  })
}

const populateAttributes = <T extends {}>(query: Knex.QueryBuilder<T>) => {
  return populateThrough(query, "products", "attributes", {
    table: "products_attributes",
    leftColumn: "productId",
    rightColumn: "attributeId",
  })
}

export const populateProductRelations = <T extends {}>(query: Knex.QueryBuilder<T>) => {
  return populateAttributes(
    populateCategories(populateImages(populateVariants(query))),
  )
}

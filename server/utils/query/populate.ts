import type { Knex } from "knex"

// todo: add an image for every product so that I can use innerJoin instead of leftJoin

export const populateThrough = <T extends {}, M = {}>(
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
    .select<T & M>(
      knex.raw(
        `coalesce(json_agg(${right}.*) FILTER (WHERE ${right}.id IS NOT NULL), '[]') as ${right}`,
      ),
    )
    .leftJoin<T & M>(
      through.table,
      `${left}.id`,
      `${through.table}.${through.leftColumn}`,
    )
    .leftJoin<T & M>(
      `${right}`,
      `${through.table}.${through.rightColumn}`,
      `${right}.id`,
    )
    .groupBy(`${left}.id`)
}

export const populate = <T extends {}, M = {}>(
  query: Knex.QueryBuilder<T>,
  left: string,
  right: string,
  rightColumn: string,
) => {
  return query
    .select<T & M>(
      knex.raw(
        `coalesce(json_agg(${right}.*) FILTER (WHERE ${right}.id IS NOT NULL), '[]') as ${right}`,
      ),
    )
    .leftJoin<T & M>(`${right}`, `${left}.id`, `${right}.${rightColumn}`)
    .groupBy(`${left}.id`)
}

const populateImages = <T extends {}>(query: Knex.QueryBuilder<T>) => {
  return populateThrough<T, { images: Image[] }>(query, "products", "images", {
    table: "products_images",
    leftColumn: "productId",
    rightColumn: "imageId",
  })
}

const populateVariants = <T extends {}>(query: Knex.QueryBuilder<T>) => {
  return populate<T, { variants: Variant[] }>(
    query,
    "products",
    "variants",
    "productId",
  )
}

const populateCategories = <T extends {}>(query: Knex.QueryBuilder<T>) => {
  return populateThrough<T, { categories: Category[] }>(
    query,
    "products",
    "categories",
    {
      table: "products_categories",
      leftColumn: "productId",
      rightColumn: "categoryId",
    },
  )
}

const populateAttributes = <T extends {}>(query: Knex.QueryBuilder<T>) => {
  return populateThrough<T, { attributes: Attribute[] }>(
    query,
    "products",
    "attributes",
    {
      table: "products_attributes",
      leftColumn: "productId",
      rightColumn: "attributeId",
    },
  )
}

export const populateProductRelations = <T extends {}>(
  query: Knex.QueryBuilder<T>,
) => {
  return populateAttributes(
    populateCategories(populateImages(populateVariants(query))),
  )
}

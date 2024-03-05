import type { Knex } from "knex"
import type { Attribute, Category, Image, Variant } from "~/server/types"

export const populate = <TRecord extends {} = any, TResult = any>(
  query: Knex.QueryBuilder<TRecord, TResult>,
) => {
  const on = <T extends {} = {}>(
    left: string,
    right: string,
    rightColumn: string,
  ) => {
    query
      .select(`${left}.*`)
      .select(
        db.raw(
          `coalesce(json_agg(${right}.*) FILTER (WHERE ${right}.id IS NOT NULL), '[]') as ${right}`,
        ),
      )
    return query
      .leftJoin<
        TRecord & T
      >(`${right}`, `${left}.id`, `${right}.${rightColumn}`)
      .groupBy(`${left}.id`)
  }
  const through = <T extends {} = {}>(
    left: string,
    right: string,
    through: {
      table: string
      leftColumn: string
      rightColumn: string
    },
  ) => {
    query
      .select(`${left}.*`)
      .select<
        TRecord & T
      >(knex.raw(`coalesce(json_agg(${right}.*) FILTER (WHERE ${right}.id IS NOT NULL), '[]') as ${right}`))
    return query
      .leftJoin<
        TRecord & T
      >(through.table, `${left}.id`, `${through.table}.${through.leftColumn}`)
      .leftJoin<
        TRecord & T
      >(`${right}`, `${through.table}.${through.rightColumn}`, `${right}.id`)
      .groupBy(`${left}.id`)
  }

  return {
    on,
    through,
  }
}

const populateImages = <TRecord extends {} = any, TResult = any>(
  query: Knex.QueryBuilder<TRecord, TResult>,
) => {
  return populate(query).through<{ images: Image[] }>("products", "images", {
    table: "products_images",
    leftColumn: "productId",
    rightColumn: "imageId",
  })
}

const populateVariants = <TRecord extends {} = any, TResult = any>(
  query: Knex.QueryBuilder<TRecord, TResult>,
) => {
  return populate(query).on<{ variants: Variant[] }>(
    "products",
    "variants",
    "productId",
  )
}

const populateCategories = <TRecord extends {} = any, TResult = any>(
  query: Knex.QueryBuilder<TRecord, TResult>,
) => {
  return populate(query).through<{ categories: Category[] }>(
    "products",
    "categories",
    {
      table: "products_categories",
      leftColumn: "productId",
      rightColumn: "categoryId",
    },
  )
}

const populateAttributes = <TRecord extends {} = any, TResult = any>(
  query: Knex.QueryBuilder<TRecord, TResult>,
) => {
  return populate(query).through<{ attributes: Attribute[] }>(
    "products",
    "attributes",
    {
      table: "products_attributes",
      leftColumn: "productId",
      rightColumn: "attributeId",
    },
  )
}

export const populateProductRelations = <
  TRecord extends {} = any,
  TResult = any,
>(
  query: Knex.QueryBuilder<TRecord, TResult>,
) => {
  return populateAttributes(
    populateCategories(populateImages(populateVariants(query))),
  )
}

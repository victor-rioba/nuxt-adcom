import { Model } from "objection";

import ImageClass from "./image";

export default class Product extends Model {
  id!: number;
  storeId!: string;

  name!: string;
  slug!: string;
  sku?: string;
  price!: string;
  shortDescription?: string;
  longDescription?: string;
  available?: number;
  isActive!: boolean;

  images!: ImageClass[];
  //   categories: Category[];
  //   attributes: Attribute[];
  //   variants: Variant[];

  // Table name is the only required property.
  static get tableName() {
    return "products";
  }

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static jsonSchema = {
    type: "object",

    properties: {
      id: { type: "string" },
      storeId: { type: "string" },
      name: { type: "string" },
      slug: { type: "string" },
      sku: { type: "string" },
      price: { type: "string" },
      shortDescription: { type: "string" },
      longDescription: { type: "string" },
      available: { type: "number" },
      isActive: { type: "boolean" },
    },
  };

  // This object defines the relations to other models. The relationMappings
  // property can be a thunk to prevent circular dependencies.
  static relationMappings = () => ({
    images: {
      relation: Model.ManyToManyRelation,
      modelClass: ImageClass,
      join: {
        from: "products.id",
        // ManyToMany relation needs the `through` object to describe the join table.
        through: {
          from: "products_images.productId",
          to: "products_images.imageId",
        },
        to: "images.id",
      },
    },
  });
}

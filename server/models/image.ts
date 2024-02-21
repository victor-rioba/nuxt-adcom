import { Model } from "objection";

export default class Image extends Model {
  id!: number;
  storeId!: string;
  
  assetId?: string;
  signature?: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
  type?: string;
  url!: string;
  secureUrl?: string;
  folder!: string;
  path!: string;

  // Table name is the only required property.
  static tableName = "images";

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static jsonSchema = {
    type: "object",

    properties: {
      id: { type: "string" },
      storeId: { type: "string" },
      assetId: { type: "string" },
      signature: { type: "string" },
      width: { type: "number" },
      height: { type: "number" },
      format: { type: "string" },
      bytes: { type: "number" },
      type: { type: "string" },
      url: { type: "string" },
      secureUrl: { type: "string" },
      folder: { type: "string" },
      path: { type: "string" },
    },
  };
}

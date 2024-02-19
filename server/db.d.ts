declare type TableName =
  | "users"
  | "stores"
  | "customerGroups"
  | "categories"
  | "products"
  | "attributes";

declare type User = {
  id: number;
  externalId: string;

  firstName: string;
  lastName?: string;
  username?: string;
  email: string;
  image?: string;

  createdAt: string;
  updatedAt: string;
};

declare type Store = {
  id: number;
  userId: number;

  name: string;
  legalName?: string;
  timezone?: string;
  language?: string;
  unitSystem?: string;
  defaultWeightUnit?: string;

  createdAt: string;
  updatedAt: string;
};

declare type CustomerGroup = {
  id: number;
  storeId: number;

  name: string;

  createdAt: string;
  updatedAt: string;
};

declare type Category = {
  id: number;
  storeId: number;

  name: string;
  slug: string;
  description?: string;
  image?: string;

  createdAt: string;
  updatedAt: string;
};

declare type Product = {
  id: number;
  storeId: string;

  name: string;
  slug?: string;
  sku?: string;
  price: string;
  shortDescription?: string;
  longDescription?: string;
  available?: number;
  images: string[];

  status: boolean;

  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

declare type Attribute = {
  id: number;
  storeId: number;

  name: string;
  slug: string;

  type: string;
  inputType: string;

  options: string[];
  unit?: string;

  createdAt: string;
  updatedAt: string;
};

// declare type Order = {
//   id: number;
//   storeId: number;

//   customerId: number;
//   status: string;
//   total: string;
//   createdAt: string;
//   updatedAt: string;
//   deletedAt?: string;
// };

// declare type OrderItem = {
//   id: number;
//   orderId: number;
//   productId: number;
//   quantity: number;
//   price: string;
//   total: string;
//   createdAt: string;
//   updatedAt: string;
//   deletedAt?: string;
// };

// declare type Address = {
//   id: number;
//   userId: number;

//   street: string;
//   city: string;
//   state: string;
//   country: string;
//   zip: string;
//   phone: string;

//   createdAt: string;
//   updatedAt: string;
// };

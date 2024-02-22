declare type User = {
  id: string;
  externalId: string;

  firstName: string;
  lastName?: string;
  username?: string;
  email: string;
  avatar?: string;

  createdAt: string;
  updatedAt: string;
};

declare type Store = {
  id: string;
  userId: string;

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
  id: string;
  storeId: string;
  imageId: string;

  name: string;

  createdAt: string;
  updatedAt: string;
};

declare type Category = {
  id: string;
  storeId: string;
  imageId: string;
  image?: Image;

  name: string;
  slug: string;
  description?: string;

  createdAt: string;
  updatedAt: string;
};

declare type Product = {
  id: string;
  storeId: string;

  name: string;
  slug: string;
  sku?: string;
  price: string;
  shortDescription?: string;
  longDescription?: string;
  available?: number;
  isActive: boolean;
  
  images: Image[];
  categories: Category[];
  attributes: Attribute[];
  variants: Variant[];

  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

declare type Attribute = {
  id: string;
  storeId: string;

  name: string;
  slug: string;

  type: string;
  inputType: string;
  isRequired: boolean;

  options: string[];
  unit?: string;

  createdAt: string;
  updatedAt: string;
};

declare type Variant = {
  id: string;
  productId: string;

  sku?: string;
  price: string;
  shortDescription?: string;
  longDescription?: string;
  available: number;
  isActive: boolean;

  attributes: Attribute[];

  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

declare type Image = {
  id: string;
  storeId: string;
  
  assetId: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
  type: string;
  url: string;
  secureUrl: string;
  folder: string;
  path: string;

  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

// declare type Order = {
//   id: string;
//   storeId: string;

//   customerId: string;
//   status: string;
//   total: string;
//   createdAt: string;
//   updatedAt: string;
//   deletedAt?: string;
// };

// declare type OrderItem = {
//   id: string;
//   orderId: string;
//   productId: string;
//   quantity: number;
//   price: string;
//   total: string;
//   createdAt: string;
//   updatedAt: string;
//   deletedAt?: string;
// };

// declare type Address = {
//   id: string;
//   userId: string;

//   street: string;
//   city: string;
//   state: string;
//   country: string;
//   zip: string;
//   phone: string;

//   createdAt: string;
//   updatedAt: string;
// };

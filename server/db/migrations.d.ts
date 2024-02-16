declare type Enterprise = {
  id: number;

  name: string;
  description: string;

  createdAt: string;
  updatedAt: string;
};

declare type User = {
  id: number;
  enterpriseId: number;
  createdBy: number;
  storeId: number;

  firstName: string;
  lastName?: string;
  username?: string;
  email: string;
  image?: string;

  createdAt: string;
  updatedAt: string;
};

declare type CustomerGroup = {
  id: number;
  enterpriseId: number;

  name: string;

  createdAt: string;
  updatedAt: string;
};

declare type Store = {
  id: number;
  enterpriseId: number;

  name: string;
  legalName?: string;
  timezone?: string;
  language?: string;
  unitSystem?: string;
  defaultWeightUnit?: string;

  createdAt: string;
  updatedAt: string;
};

declare type Category = {
  id: number;
  enterpriseId: number;
  storeId: number;

  name: string;
  description?: string;
  image?: string;

  createdAt: string;
  updatedAt: string;
};

declare type Product = {
  id: number;
  enterpriseId: string;
  storeId: string;

  slug?: string;
  sku?: string;
  title: string;
  price: string;
  shortDescription?: string;
  longDescription?: string;
  available?: number;
  images: string[];

  categories: number[];

  status: boolean;

  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

declare type ProductVariant = {
  id: number;
  productId: string;

  sku?: string;
  title: string;
  price: string;
  shortDescription?: string;
  longDescription?: string;
  available?: number;
  images: string[];

  status: boolean;

  createdAt: string;
  updatedAt: string;
};

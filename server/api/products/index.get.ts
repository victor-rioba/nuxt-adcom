import Product from "~/server/models/product";

type Pagination = {
  total?: number;
  lastPage?: number;
  currentPage: number;
  perPage: number;
  from: number;
  to: number;
};

export default defineEventHandler(async (event) => {
  const store = await getStoreFromAuth(event);

  const { currentPage, perPage } = usePaginationQuery(event);

  const { results: data, total } = await Product.query()
    .where({ storeId: store.id })
    .withGraphFetched({
      images: true,
    })
    .page(currentPage, perPage);
  // .where("storeId", store.id)
  // .page(currentPage, perPage);

  // const { data, pagination } = await useDb<Product>("products")
  //   .where("storeId", store.id)
  //   .paginate(paginateQuery);

  // const total = 2;

  console.log(data, total);

  const meta = {
    total,
    lastPage: Math.ceil(total / perPage),
    currentPage,
    perPage,
  } as Pagination;

  return { data, meta };
});

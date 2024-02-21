type Pagination = {
    total?: number;
    lastPage?: number;
    currentPage: number;
    perPage: number;
    from: number;
    to: number;
  }
  
  export default defineEventHandler(async (event) => {
    const store = await getStoreFromAuth(event);
  
    const paginateQuery = usePaginationQuery(event);
  
    const { data, pagination } = await useDb<Image>("images")
      .select()
      .where("storeId", store.id)
      .paginate(paginateQuery);
  
    const meta = pagination as Pagination;
  
    return { data, meta };
  });
  
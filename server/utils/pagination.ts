import type { H3Event, EventHandlerRequest } from "h3";

export const usePaginationQuery = (event: H3Event<EventHandlerRequest>) => {
  try {
    const query = getQuery(event);

    const currentPage = parseInt((query.page as string) || "0", 10);
    const perPage = parseInt((query.perPage as string) || "10", 10);

    return { currentPage, perPage };
  } catch (error) {
    throw useBadRequestError("Invalid query parameters");
  }
};

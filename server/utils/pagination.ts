import type { H3Event, EventHandlerRequest } from "h3";

type LengthAwarePaginationQuery = {
  currentPage: number;
  perPage: number;
  isLengthAware: true;
};

export const getPaginationFromQuery = (event: H3Event<EventHandlerRequest>) => {
  try {
    const query = getQuery(event);
    const currentPage = parseInt((query.page as string) || "0", 10);
    const perPage = parseInt((query.perPage as string) || "10", 10);
    return { currentPage, perPage, isLengthAware: true  } as LengthAwarePaginationQuery;
  } catch (error) {
    throw badRequestError("Invalid query parameters");
  }
};
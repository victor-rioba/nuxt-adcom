export const useUnauthorizedError = (message?: string) =>
  createError({
    statusCode: 401,
    message: message || "Unauthorized",
  });

export const useBadRequestError = (message?: string) =>
  createError({
    statusCode: 400,
    message: message || "Bad request",
  });

export const useNotFoundError = (message?: string) =>
  createError({
    statusCode: 404,
    message: message || "Not found",
  });

export const useForbiddenError = (message?: string) =>
  createError({
    statusCode: 403,
    message: message || "Forbidden",
  });

export const useInternalError = (message?: string) =>
  createError({
    statusCode: 500,
    message: message || "Internal error",
  });

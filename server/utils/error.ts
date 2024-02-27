export const unauthorizedError = (message?: string) =>
  createError({
    statusCode: 401,
    message: message || "Unauthorized",
  });

export const badRequestError = (message?: string) =>
  createError({
    statusCode: 400,
    message: message || "Bad request",
  });

export const notFoundError = (message?: string) =>
  createError({
    statusCode: 404,
    message: message || "Not found",
  });

export const forbiddenError = (message?: string) =>
  createError({
    statusCode: 403,
    message: message || "Forbidden",
  });

export const internalError = (message?: string) =>
  createError({
    statusCode: 500,
    message: message || "Internal error",
  });

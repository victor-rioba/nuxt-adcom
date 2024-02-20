import { z } from "zod";
import type { H3Event, EventHandlerRequest } from "h3";
import { useBadRequestError } from "./error";

export const useValidate =
  <T>(schema: z.ZodType<T>) =>
  async (event: H3Event<EventHandlerRequest>) => {
    const result = await readValidatedBody(event, (body) =>
      schema.safeParse(body)
    );
    if (!result.success) {
      throw useBadRequestError(
        result.error.issues.map((i) => i.message).join(", ")
      );
    }
    return result.data;
  };

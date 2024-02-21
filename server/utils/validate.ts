import { z } from "zod";
import type { H3Event, EventHandlerRequest } from "h3";

export const useValidate =
  <T>(schema: z.ZodType<T>) =>
  async (event: H3Event<EventHandlerRequest>) => {
    return await readValidatedBody(event, (body) =>
      schema.parse(body)
    );
  };

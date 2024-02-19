import type { H3Event, EventHandlerRequest } from "h3";
import type { UserType } from "@kinde-oss/kinde-typescript-sdk";

export const useStoreId = async (event: H3Event<EventHandlerRequest>) => {
  const kindeUser: UserType | undefined =
    await event.context.kinde?.getUserProfile();
  if (!kindeUser)
    throw createError({ statusCode: 401, message: "Unauthorized" });
  const store = await useDb<Store>("stores")
    .select("stores.id")
    .innerJoin("users", "stores.userId", "users.id")
    .where("users.email", kindeUser.email)
    .first();
  if (!store) throw createError({ statusCode: 401, message: "Unauthorized" });
  return store as { id: number };
};

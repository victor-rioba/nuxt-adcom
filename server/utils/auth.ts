import type { H3Event, EventHandlerRequest } from "h3";
import type { UserType } from "@kinde-oss/kinde-typescript-sdk";

export const useAuthUser = async (event: H3Event<EventHandlerRequest>) => {
  const kindeUser: UserType | undefined =
    await event.context.kinde?.getUserProfile();
  if (!kindeUser) throw useUnauthorizedError();
  return kindeUser;
};

export const getUserFromAuth = async (event: H3Event<EventHandlerRequest>) => {
  const authUser = await useAuthUser(event);
  const user = await useDb<User>("users")
    .select("id")
    .where("externalId", authUser.id)
    .first();
  if (!user) throw useUnauthorizedError();
  return user;
};

export const getStoreFromAuth = async (event: H3Event<EventHandlerRequest>) => {
  const authUser = await useAuthUser(event);
  const store = await useDb<Store>("stores")
    .select("stores.id")
    .innerJoin("users", "stores.userId", "users.id")
    .where("users.email", authUser.email)
    .first();
  if (!store) throw useUnauthorizedError();
  return store as { id: number };
};

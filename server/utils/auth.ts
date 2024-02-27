import type { H3Event, EventHandlerRequest } from "h3";
import type { UserType } from "@kinde-oss/kinde-typescript-sdk";

export const useAuthUser = async (event: H3Event<EventHandlerRequest>) => {
  const kindeUser: UserType | undefined =
    await event.context.kinde?.getUserProfile();
  if (!kindeUser) throw unauthorizedError();
  return kindeUser;
};

export const getUserFromAuth = async (event: H3Event<EventHandlerRequest>) => {
  const authUser = await useAuthUser(event);
  const user = await db<User>("users")
    .select("id")
    .where("externalId", authUser.id)
    .first();
  if (!user) throw unauthorizedError();
  return user;
};

export const getStoreFromAuth = async (event: H3Event<EventHandlerRequest>) => {
  const authUser = await useAuthUser(event);
  const store = await db<Store>("stores")
    .select("stores.id")
    .innerJoin("users", "stores.userId", "users.id")
    .where("users.email", authUser.email)
    .first();
  if (!store) throw unauthorizedError();
  return store as { id: string };
};

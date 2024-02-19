import type { H3Event, EventHandlerRequest } from "h3";
import type { UserType } from "@kinde-oss/kinde-typescript-sdk";

export const useAuthUser = async (event: H3Event<EventHandlerRequest>) => {
  const kindeUser: UserType | undefined = await event.context.kinde?.getUserProfile();
  if (!kindeUser)
    throw createError({ statusCode: 401, message: "Unauthorized" });
  const user = await useDb<User>("users")
    .select('id')
    .where("externalId", kindeUser.id)
    .first();
  if (!user) throw createError({ statusCode: 401, message: "Unauthorized" });
  return user;
};

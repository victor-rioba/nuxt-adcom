import _ from "lodash";

import type { Table } from "../utils/db";

export default defineEventHandler(async (event) => {
  let kindeUser;
  try {
    kindeUser = await event.context.kinde.getUserProfile();
  } catch (error) {
    console.log("Error :: ", (error as any)?.message);
    return createError({ statusCode: 401 });
  }
  let user = await useDb("users")
    .select("id")
    .first()
    .where("email", kindeUser.email);
  const table = getRouterParam(event, "table") as Table;
  const data = await useDb(table).select();
  return { user, [_.camelCase(table)]: data };
});

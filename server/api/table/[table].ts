import _ from "lodash";

export default defineEventHandler(async (event) => {
  const user = await useAuthUser(event);
  const table = getRouterParam(event, "table")!;
  const data = await useDb(table.split("-").join("") as TableName).select();
  return { user, [_.camelCase(table)]: data };
});

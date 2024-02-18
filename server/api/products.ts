export default defineEventHandler(async (event) => {
  let kindeUser;
  try {
    kindeUser = await event.context.kinde.getUserProfile();
  } catch (error) {
    console.log("Error :: ", (error as any)?.message);
    return createError({ statusCode: 401 });
  }
  const user = await useDb("users")
    .select("id")
    .first()
    .where("email", kindeUser.email);
  const data = await useDb("products")
    .select()
    .where("enterpriseId", user.enterpriseId);
  return { users: data };
});

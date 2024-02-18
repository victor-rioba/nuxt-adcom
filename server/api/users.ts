export default defineEventHandler(async (event) => {
  let kindeUser;
  try {
    kindeUser = await event.context.kinde.getUserProfile();
  } catch (error) {
    console.log("Error :: ", (error as any)?.message);
    return createError({ statusCode: 401 });
  }
  const data = await useDb("users").select();
  return { users: data };
});

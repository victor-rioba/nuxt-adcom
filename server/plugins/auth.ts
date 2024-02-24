import type { UserType } from "@kinde-oss/kinde-typescript-sdk";

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("beforeResponse", (event) => {
    if (event.path.includes("/api/callback")) {
      event.context.kinde
        .getUserProfile()
        .then(async (kindeUser: UserType) => {
          const existingUser = await useDb("users")
            .first()
            .where("email", kindeUser.email);

          if (existingUser)
            return console.log(kindeUser.email, "just logged in!");

          const [newUser] = await useDb<User>("users")
            .insert({
              externalId: kindeUser.id,
              firstName: kindeUser.given_name,
              lastName: kindeUser.family_name,
              avatar: kindeUser.picture || "",
              email: kindeUser.email,
              username: kindeUser.given_name,
            })
            .returning("id");

          await useDb<Store>("stores").insert({
            userId: newUser.id,
            name: kindeUser.given_name + "'s Store",
          });
          return console.log(kindeUser.email, "just signed up!");
        })
        .catch(console.log);
    }
  });
});

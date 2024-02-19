import type { UserType } from "@kinde-oss/kinde-typescript-sdk";

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("request", async (event) => {
    console.log("on request", event.path);
  });

  nitroApp.hooks.hook("afterResponse", (event) => {
    if (event.path.includes("/api/callback")) {
      event.context.kinde
        .getUserProfile()
        .then(async (kindeUser: UserType) => {
          const existingUser = await useDb("users")
            .first()
            .where("email", kindeUser.email);

          // const existingStore = await useDb<Store>("stores").insert({
          //   userId: existingUser.id,
          //   name: kindeUser.given_name + "'s Store",
          // })

          // console.log("existingStore", existingStore);
          if (existingUser) return console.log(kindeUser.email, "just logged in!");

          const [newUser] = await useDb<User>("users")
            .insert({
              externalId: kindeUser.id,
              firstName: kindeUser.given_name,
              lastName: kindeUser.family_name,
              image: kindeUser.picture || "",
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

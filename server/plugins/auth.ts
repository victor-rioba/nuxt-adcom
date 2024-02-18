import type { UserType } from "@kinde-oss/kinde-typescript-sdk";

export default defineNitroPlugin((nitroApp) => {
  //   nitroApp.hooks.hook("request", (event) => {
  //     console.log("on request", event.path);
  //   });

  //   nitroApp.hooks.hook("beforeResponse", (event, { body }) => {
  //     console.log("on response", event.path, { body });
  //   });

  nitroApp.hooks.hook("afterResponse", (event) => {
    if (event.path.includes("/api/callback")) {
      event.context.kinde
        .getUserProfile()
        .then(async (kindeUser: UserType) => {
          const user = await useDb("users")
            .first()
            .where("email", kindeUser.email);
          if (user) return console.log(kindeUser, "just logged in!");

          await useDb("users").insert({
            externalId: kindeUser.id,
            firstName: kindeUser.given_name,
            lastName: kindeUser.family_name,
            image: kindeUser.picture,
            email: kindeUser.email,
            username: kindeUser.given_name,
          });
          return console.log(kindeUser.email, "just signed up!");
        })
        .catch(console.log);
    }
    // console.log("on after response", event.path);
  });
});

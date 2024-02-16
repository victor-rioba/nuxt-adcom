type KindeUser = {
  name: string;
  email: string;
  picture: string;
  given_name: string;
  family_name: string;
};

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
        .then(async (kindeUser: KindeUser) => {
          let user = await useDb("users")
            .first()
            .where("email", kindeUser.email);
          if (user) return console.log(kindeUser.email, "just logged in!");

          await useDb("users").insert({
            firstName: kindeUser.given_name,
            lastName: kindeUser.family_name,
            image: kindeUser.picture,
            email: kindeUser.email,
            username: kindeUser.name,
          });
          return console.log(kindeUser.email, "just signed up!");
        })
        .catch(console.log);
    }
    // console.log("on after response", event.path);
  });
});

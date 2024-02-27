// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "adcom.io | The e-commerce platform for professional businesses",
      titleTemplate: "%s",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "E-commerce management made easy by this one-stop shop with all your needs",
        },
        {
          property: "og:title",
          content:
            "adcom.io | The e-commerce platform for professional businesses",
        },
        {
          property: "og:description",
          content:
            "E-commerce management made easy by this one-stop shop with all your needs",
        },
        { property: "og:url", content: "https://mercury-blue.vercel.app/" },
        { property: "og:type", content: "website" },
        { property: "og:site:name", content: "adcom.io" },
        { name: "twitter:card", content: "summary" },
        {
          name: "twitter:title",
          content:
            "adcom.io | The e-commerce platform for professional businesses",
        },
        {
          name: "twitter:description",
          content:
            "E-commerce management made easy by this one-stop shop with all your needs",
        },
      ],
    },
  },
  colorMode: { preference: "light" },
  devtools: { enabled: true },

  modules: ["@nuxt/ui", "@nuxt/image", "@nuxtjs/kinde" /* "nuxt-security" */],

  image: {
    cloudinary: {
      baseURL: "https://res.cloudinary.com/dd9ngrnnr/image/upload/",
    },
    providers: {
      blob: {
        name: "blob",
        provider: "~/providers/blob.ts",
      },
    },
  },

  experimental: {
    typedPages: true,
  },

  runtimeConfig: {
    public: {
      appUrl: process.env.NUXT_PUBLIC_APP_URL || "http://localhost:3000",
    },
  },
})

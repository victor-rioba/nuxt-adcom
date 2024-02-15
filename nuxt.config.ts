// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  colorMode: { preference: "light" },

  modules: [
    [
      "@nuxt/ui",
      {
        global: true,
        // icons: ["carbon"],
        primary: "azul",
      },
    ],
    [
      "@formkit/nuxt",
      {
        autoImport: true,
      },
    ],
    "@nuxt/image",
  ],

  experimental: {
    typedPages: true,
  },
});

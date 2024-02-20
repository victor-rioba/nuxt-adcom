import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        "dodger-blue": {
          "50": "#f0f8fe",
          "100": "#ddeffc",
          "200": "#c2e5fb",
          "300": "#98d5f8",
          "400": "#68bef2",
          "500": "#379aeb",
          "600": "#2f85e1",
          "700": "#276fce",
          "800": "#255aa8",
          "900": "#244d84",
          "950": "#1a3051",
        },
      },
    },
  },
};

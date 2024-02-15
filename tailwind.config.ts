import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  content: ["formkit.theme.ts"],
  theme: {
    extend: {
      colors: {
        azul: {
          "50": "#effefc",
          "100": "#c9fefa",
          "200": "#94fbf4",
          "300": "#38f0ea",
          "400": "#23dedd",
          "500": "#0abfc2",
          "600": "#05969c",
          "700": "#09777c",
          "800": "#0c5e63",
          "900": "#104d51",
          "950": "#012e32",
        },
      },
    },
  },
};

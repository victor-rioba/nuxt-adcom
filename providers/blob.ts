import { joinURL } from "ufo";
import type { ProviderGetImage } from "@nuxt/image";

export const getImage: ProviderGetImage = (src) => {
  const baseURL = `blob:${useRuntimeConfig().public.appUrl}`;

  return {
    url: joinURL(baseURL, src),
  };
};

import { SITENAME, SITELINK, HOMEDESC } from "./constants/strings";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: [
    "@/assets/styles/base.scss",
    "@/assets/styles/util.css",
    "@/assets/styles/spinner.css",
  ],
  build: {
    postcss: {
      postcssOptions: require("./postcss.config.js"),
    },
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/robots"],
  pages: true,
  app: {
    head: {
      title: SITENAME,
      viewport:
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
      meta: [
        {
          name: "keywords",
          content: "lbrygen, lbry, odysee, librarian, privacy, alternative",
        },
        // title
        {
          property: "og:title",
          content: SITENAME,
        },
        {
          name: "twitter:title",
          content: SITENAME,
        },
        // url
        {
          property: "og:url",
          content: SITELINK,
        },
        {
          name: "twitter:url",
          content: SITELINK,
        },
        // description
        {
          name: "description",
          content: HOMEDESC,
        },
        {
          property: "og:description",
          content: HOMEDESC,
        },
        {
          name: "twitter:description",
          content: HOMEDESC,
        },
        // OG ext
        {
          property: "og:sitename",
          content: SITENAME,
        },
        {
          property: "og:type",
          content: "website",
        },
        // Twitter ext
        {
          property: "twitter:card",
          content: "summary_large_image",
        },
      ],
      link: [
        {
          rel: "canonical",
          href: SITELINK,
        },
      ],
    },
  },
  experimental: {
    writeEarlyHints: false,
  },
});

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
      title: "Lbrygen",
      viewport:
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
      meta: [
        // title
        {
          property: "og:title",
          content: "Lbrygen",
        },
        {
          name: "twitter:title",
          content: "Lbrygen",
        },
        // url
        {
          property: "og:url",
          content: "https://lbrygen.xyz",
        },
        {
          name: "twitter:url",
          content: "https://lbrygen.xyz",
        },
        // description
        {
          name: "description",
          content:
            "Alternative frontend for LBRY and Odysee written in Nuxt3. It is up just in case that Odysee is down!",
        },
        {
          property: "og:description",
          content:
            "Alternative frontend for LBRY and Odysee written in Nuxt3. It is up just in case that Odysee is down!",
        },
        {
          name: "twitter:description",
          content:
            "Alternative frontend for LBRY and Odysee written in Nuxt3. It is up just in case that Odysee is down!",
        },
        // OG ext
        {
          property: "og:sitename",
          content: "Lbrygen",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:sitename",
          content: "Lbrygen",
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
          href: "https://lbrygen.xyz",
        },
      ],
    },
  },
  experimental: {
    writeEarlyHints: false,
  },
});

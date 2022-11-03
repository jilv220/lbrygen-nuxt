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
        {
          name: "description",
          content:
            "Alternative frontend for LBRY and Odysee written in Nuxt3. It is up just in case that Odysee is down!",
        },
      ],
    },
  },
  experimental: {
    writeEarlyHints: false,
  },
});

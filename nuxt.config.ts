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
  modules: ["@nuxtjs/tailwindcss"],
  pages: true,
  runtimeConfig: {
    public: {
      apiBase: "https://lbrygen.xyz/api",
    },
  },
});

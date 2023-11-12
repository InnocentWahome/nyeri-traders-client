// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    nodeEnv: process.env.NUXT_NODE_ENV || "development",
    public: {
      apiBaseURL: process.env.NUXT_API_SERVER_URL,
      authBaseURL: process.env.NUXT_AUTH_SERVER_URL,
      domainUrl: process.env.NUXT_DOMAIN_URL,
    },
  },
  typescript: {
    shim: false,
  },
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  nitro: {
    serveStatic: true,
  },
  modules: [
    '@ant-design-vue/nuxt',
    "nuxt-swiper",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Rubik: {
            wght: [300, 400, 500, 600, 700],
          },
          "Plus+Jakarta+Sans": {
            wght: [400, 500, 600, 700],
          },
          Inter: {
            wght: [400, 500, 600, 700, 800],
          },
          download: true,
          inject: true,
        },
      },
    ]
  ],
});

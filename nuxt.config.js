export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'test-nuxt',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  ssr: false,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/veevalidate'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  build: {
    transpile: ['defu'],
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
  ],

  bootstrapVue: {
    icons: true,
  },

  axios: {
    baseURL: 'https://sys-dev.searchandstay.com',
  },

  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/',
    },

    strategies: {
      local: {
        token: {
          property: 'data.result.access_token', //property name that the Back-end sends for you as a access token for saving on localStorage and cookie of user browser
          global: true,
          required: true,
          type: 'Bearer',
        },

        endpoints: {
          login: {
            url: '/api/admin/login_json',
            method: 'post',
          },

          user: false,
          logout: false,
        },
      },
    },
  },

  router: {
    middleware: ['auth'],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}

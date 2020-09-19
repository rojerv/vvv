const { API_ENDPOINT, PREFIX } = process.env

export default {
  ssr: false,
  head: {
    title: 'VVV',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [{ src: "~/assets/styles/main.styl", lang: "styl" }],
  plugins: [
    '~/plugins/axios'
  ],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/toast',
    '@nuxtjs/style-resources'
  ],
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'token' },
          logout: false,
          user: { url: '/auth/user', method: 'get', propertyName: 'user' }
        }
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
      callback: false,
      home: false
    }
  },
  axios: {
    baseURL: API_ENDPOINT ? `${API_ENDPOINT}${PREFIX}` : 'http://localhost:4000/api/v1',
    credentials: true
  },
  styleResources: {
    stylus: [
      '~/assets/styles/variables.styl',
    ]
  },
  router: {
    middleware: ['auth']
  }
}

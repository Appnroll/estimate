const pkg = require('./package')
const Dotenv = require('dotenv-webpack')

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // { rel: 'stylesheet', href: 'https://unpkg.com/element-ui/lib/theme-chalk/index.css' }
    ],
    script: [
      // { src: 'https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.3/js/uikit.min.js' },
      // { src: 'https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.3/js/uikit-icons.min.js' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/styles/global.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/vee-validate',
    '~/mixins/global'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    proxy: true,
    retry: { retries: 3 }
  },

  proxy: {
    '/slack/': {
      target: 'https://slack.com/api/',
      pathRewrite: { '^/slack/': '' }
    }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    watch: ['api', 'server'],
    extend (config, ctx) {

    },
    plugins: [
      new Dotenv()
    ]
  }
}

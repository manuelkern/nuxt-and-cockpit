module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-and-cockpit',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** CSS
  */
  css: [
    { src: '~assets/css/main.scss', lang: 'scss' } // scss instead of sass
  ],
  /*
  ** Router config
  */
  router: {
    linkExactActiveClass: 'exact-active-link',
    middleware: ['index']
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#EE3524' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

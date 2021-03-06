require('dotenv').config()

const {getConfigForKeys} = require('./lib/config.js')
const ctfConfig = getConfigForKeys([
  'CTF_BLOG_POST_TYPE_ID',
  'CTF_BLOG_TAG_TYPE_ID',
  'CTF_SPACE_ID',
  'CTF_CDA_ACCESS_TOKEN',
  'CTF_CMA_ACCESS_TOKEN',
  'CTF_PERSON_ID'
])
const {createClient} = require('./plugins/contentful')
const cdaClient = createClient(ctfConfig)
const cmaContentful = require('contentful-management')
const cmaClient = cmaContentful.createClient({
  accessToken: ctfConfig.CTF_CMA_ACCESS_TOKEN
})

const config = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'monochromatica',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: "siu's developer blog"  }
    ],
    link: [
      { rel: 'shortcut icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/minireset.css/0.0.2/minireset.min.css' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#2199e8' },

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
    },

    postcss: [
      require('autoprefixer')({
        browsers: ['> 5%']
      })
    ]
  },

  plugins: [
    '~/plugins/contentful',
    '~/plugins/contentfulManagement'
  ],

  generate: {
    routes () {
      return Promise.all([
        // get all blog posts
        cdaClient.getEntries({
          'content_type': ctfConfig.CTF_BLOG_POST_TYPE_ID
        }),
        // get the blog post content type
        cdaClient.getEntries({
          'content_type': ctfConfig.CTF_BLOG_TAG_TYPE_ID
        })
      ])
      .then(([entries, tags]) => {
        return [
          // map entries to URLs
          ...entries.items.map(entry => `/blog/${entry.fields.slug}`),
          ...entries.items.map(entry => `/admin/posts/${entry.fields.slug}`),
          // map all possible tags to URLs
          ...tags.items.map(tag => `/tags/${tag.fields.title}`)
        ]
      })
    }
  },

  modules:[
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/markdownit',
    'nuxt-buefy',
    ['@nuxtjs/dotenv', { systemvars: true }],
    ['@nuxtjs/google-analytics', {
      id: process.env.GA_ID
    }],
    'nuxt-fontawesome'
  ],

  axios: {
  },

  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      }
    ]
  },

  workbox: {
    dev: true, //開発環境でもPWAできるように
  },


  markdownit: {
    injected: true,
    preset: 'default',
    linkify: true,
    breaks: true,
    typography: true,
    html: true,
    use: [
      'markdown-it-toc' // 目次を作るためのライブラリ。別途インストールが必要
    ]
  },

  /*
  ** Define environment variables being available
  ** in generate and browser context
  */
  env: {
    CTF_SPACE_ID: ctfConfig.CTF_SPACE_ID,
    CTF_CMA_ACCESS_TOKEN: ctfConfig.CTF_CMA_ACCESS_TOKEN,
    CTF_CDA_ACCESS_TOKEN: ctfConfig.CTF_CDA_ACCESS_TOKEN,
    CTF_PERSON_ID: ctfConfig.CTF_PERSON_ID,
    CTF_BLOG_TAG_TYPE_ID: ctfConfig.CTF_BLOG_TAG_TYPE_ID,
    CTF_BLOG_POST_TYPE_ID: ctfConfig.CTF_BLOG_POST_TYPE_ID
  }
}

module.exports = config

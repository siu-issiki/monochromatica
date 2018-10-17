importScripts('/_nuxt/workbox.dev.c21f51f2.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "monochromatica",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.c842bb68685bf665130d.js",
    "revision": "e7705f8ce3f87f2930a7793f12b1551c"
  },
  {
    "url": "/_nuxt/layouts/default.1cdc7d138ea0fe79f983.js",
    "revision": "2526a1b2eb9fe317d27d4d387b40f2eb"
  },
  {
    "url": "/_nuxt/manifest.5fae2d8d85d160ad897c.js",
    "revision": "b3d8aac1ce13d4e9ff3a659374ea26c3"
  },
  {
    "url": "/_nuxt/pages/blog/_slug.592dc7e04d201fb90954.js",
    "revision": "53b64cabe86d64489b2fd9ab396aa0ca"
  },
  {
    "url": "/_nuxt/pages/blog/index.b26220478fe3ae4088df.js",
    "revision": "a084b19374adae8a411e56fab690050d"
  },
  {
    "url": "/_nuxt/pages/index.d0d575ea55647813d30c.js",
    "revision": "4dd230d97a2071e15df3c76d592fb92d"
  },
  {
    "url": "/_nuxt/pages/tags/_tag.b99c7cb5c07de6f43780.js",
    "revision": "357f55cc0da1d4bb60c28d0d2ab2289e"
  },
  {
    "url": "/_nuxt/pages/tags/index.d85853818b952709b21d.js",
    "revision": "16085bfdfc2fbb244985238208cde1f5"
  },
  {
    "url": "/_nuxt/vendor.b1798a86de3e340e71f0.js",
    "revision": "fdc8225f3dd2b01c3ac67b5b96409e1d"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')


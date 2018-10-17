importScripts('/_nuxt/workbox.dev.c21f51f2.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "monochromatica",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.894209b6b579dce1b16e.js",
    "revision": "ac3c9b047163fb0a4b40cb58164c942e"
  },
  {
    "url": "/_nuxt/layouts/default.1cdc7d138ea0fe79f983.js",
    "revision": "2526a1b2eb9fe317d27d4d387b40f2eb"
  },
  {
    "url": "/_nuxt/manifest.e1df0c520f74b4a8c58d.js",
    "revision": "274cbe772a4b30096ef4520029f6cd26"
  },
  {
    "url": "/_nuxt/pages/blog/_slug.d6bd936bfcdd68c0ba3e.js",
    "revision": "1d55c347d1c987275bf1c46c016f0a07"
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


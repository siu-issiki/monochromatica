importScripts('/_nuxt/workbox.dev.c21f51f2.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "monochromatica",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.32607b49f7f60c5fb76f.js",
    "revision": "74c391b36c819b016cc17d00b3dae419"
  },
  {
    "url": "/_nuxt/layouts/default.cbe8ba0f87ad73c3db75.js",
    "revision": "0a87f6f7e95c7a3c8aec306f88816714"
  },
  {
    "url": "/_nuxt/manifest.c25bc1ad694071ae2bb9.js",
    "revision": "83f2aec625ac8903e033fee9d03cd444"
  },
  {
    "url": "/_nuxt/pages/blog/_slug.7cd51ae43a5bb0c7e5bb.js",
    "revision": "625048b5cfa13bd61428a3ee77433c72"
  },
  {
    "url": "/_nuxt/pages/blog/index.48fd81831423cd3d572e.js",
    "revision": "8ffebc1afca9092f638ea7c6741053b7"
  },
  {
    "url": "/_nuxt/pages/index.76f57a842edf89985140.js",
    "revision": "0d0051ffeedfa75297c97f2d48bc934b"
  },
  {
    "url": "/_nuxt/pages/tags/_tag.abb5c6e5e64394250ee4.js",
    "revision": "6dc74616b506e1de702913ed35bce79a"
  },
  {
    "url": "/_nuxt/pages/tags/index.8b7c7322e5d276968aec.js",
    "revision": "6d7f44634d8ef47c7ef84865371c984c"
  },
  {
    "url": "/_nuxt/vendor.b1798a86de3e340e71f0.js",
    "revision": "fdc8225f3dd2b01c3ac67b5b96409e1d"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')


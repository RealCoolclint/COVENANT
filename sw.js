const CACHE_NAME = 'covenant-v1';
const ASSETS = [
  '/COVENANT/',
  '/COVENANT/index.html',
  '/COVENANT/style.css',
  '/COVENANT/app.js',
  '/COVENANT/assets/patch_COVENANT.png',
  '/COVENANT/assets/logo-data.js',
  '/COVENANT/manifest.json',
  'https://cdn.jsdelivr.net/npm/signature_pad@4.1.7/dist/signature_pad.umd.min.js',
  'https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js',
  'https://realcoolclint.github.io/tranquility-core/profiles-public.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      for (const url of ASSETS) {
        try {
          await cache.add(url);
        } catch(e) {
          console.warn('[SW] Precache échoué pour :', url, e);
        }
      }
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.hostname.includes('netlify.app')) return;
  if (url.hostname.includes('fonts.googleapis.com')) return;
  if (url.hostname.includes('fonts.gstatic.com')) return;

  event.respondWith(
    caches.open(CACHE_NAME).then(cache =>
      cache.match(event.request.url.split('?')[0]).then(cached => {
        return cached || fetch(event.request).then(response => {
          if (response.ok) {
            cache.put(event.request.url.split('?')[0], response.clone());
          }
          return response;
        });
      })
    )
  );
});

const MINA_CACHE = 'terminator-mina-pwa-20260526-system-registry-v2';

const PRECACHE_URLS = [
  './',
  './index.html',
  './styles.css?v=20260526-system-registry-v2',
  './app.js?v=20260526-system-registry-v2',
  './manifest.webmanifest',
  './assets/pwa/icon-192.png',
  './assets/pwa/icon-512.png',
  './assets/pwa/icon-maskable-512.png',
  './assets/pwa/apple-touch-icon.png',
  './assets/mina-ui/desktop/01_start_screen_desktop_red.png',
  './assets/mina-ui/desktop/02_main_menu_desktop_blue.png',
  './assets/mina-ui/mobile/01_start_screen_mobile_red.png',
  './assets/mina-ui/mobile/02_main_menu_mobile_blue.png',
  './assets/mina-ui/system-scheme/mina_hologram_silhouette.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(MINA_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== MINA_CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(MINA_CACHE).then((cache) => cache.put('./index.html', clone));
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const refresh = fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(MINA_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => cached);
      return cached || refresh;
    })
  );
});

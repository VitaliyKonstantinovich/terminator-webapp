const MINA_CACHE = 'terminator-mina-pwa-20260529-product-loop2-functional-reality-v1';
const HTML_FALLBACK = './index.html';

const PRECACHE_URLS = [
  './',
  './index.html',
  './styles.css?v=20260529-product-loop2-functional-reality-v1',
  './app.js?v=20260529-product-loop2-functional-reality-v1',
  './manifest.webmanifest',
  './assets/pwa/icon-192.png',
  './assets/pwa/icon-512.png',
  './assets/pwa/icon-maskable-512.png',
  './assets/pwa/apple-touch-icon.png',
  './assets/mina-ui/desktop/01_start_screen_desktop_red.png',
  './assets/mina-ui/desktop/02_main_menu_desktop_blue.png',
  './assets/mina-ui/mobile/01_start_screen_mobile_red.png',
  './assets/mina-ui/mobile/02_main_menu_mobile_blue.png'
];

const STATIC_EXTENSIONS = new Set(['.css', '.js', '.png', '.jpg', '.jpeg', '.webp', '.svg', '.ico', '.webmanifest', '.woff2']);
const DYNAMIC_PATH_MARKERS = ['/api/', '/health', '/diagnostics', '/evidence', '/reports', '/task', '/tasks', '/state', '/command', '/commands', '/queue', '/storage'];

function pathnameExtension(pathname) {
  const match = pathname.toLowerCase().match(/\.[a-z0-9]+$/);
  return match ? match[0] : '';
}

function isDynamicPath(pathname) {
  const lower = pathname.toLowerCase();
  return DYNAMIC_PATH_MARKERS.some((marker) => lower.includes(marker));
}

function isCacheableStaticRequest(request, url) {
  if (request.method !== 'GET') return false;
  if (url.origin !== self.location.origin) return false;
  if (isDynamicPath(url.pathname)) return false;
  if (PRECACHE_URLS.some((entry) => new URL(entry, self.location.href).pathname === url.pathname)) return true;
  if (['style', 'script', 'image', 'font', 'manifest'].includes(request.destination)) return true;
  return STATIC_EXTENSIONS.has(pathnameExtension(url.pathname));
}

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
          const contentType = response.headers.get('content-type') || '';
          if (response && response.ok && contentType.includes('text/html')) {
            const clone = response.clone();
            caches.open(MINA_CACHE).then((cache) => cache.put(HTML_FALLBACK, clone));
          }
          return response;
        })
        .catch(() => caches.match(HTML_FALLBACK))
    );
    return;
  }

  if (!isCacheableStaticRequest(request, url)) {
    event.respondWith(fetch(request));
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

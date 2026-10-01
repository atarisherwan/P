const CACHE_NAME = 'atari-sherwan-v1';
const ASSETS = [
  './',
  './index.html',
  './jb.html',
  './jb.js',
  './core.js',
  './int64.js',
  './mem.js',
  './ps4_offsets.js',
  './goldhen.bin',
  './image.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clientsClaim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        // Fallback for offline mode if needed
        return caches.match('./index.html');
      });
    })
  );
});

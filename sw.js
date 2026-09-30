const CACHE_NAME = 'atari-sherwan-v2';
const ASSETS = [
  './',
  './index.html',
  './jb.html',
  './jb.js',
  './core.js',
  './int64.js',
  './mem.js',
  './ps4_offsets.js',
  './rpc_worker.js',
  './image.jpg',
  './goldhen.bin',
  './payload2.bin'
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
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

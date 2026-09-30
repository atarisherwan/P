const CACHE_NAME = 'atari-sherwan-v2';
const ASSETS = [
  './',
  './index.html',
  './jb.html',
  './jb.js',
  './ps4_offsets.js',
  './image.jpg',
  './goldhen.bin',
  './payload.bin',
  './payload2.bin',
  './1100.bin',
  './1350.bin',
  './1352.bin'
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

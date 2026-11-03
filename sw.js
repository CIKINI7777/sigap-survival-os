const CACHE_NAME = 'sigap-v1-permanent';
const ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/navigator.js',
  '/assets/landmarks.json'
];

// Install: Simpan semua aset kritis segera
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Fetch: Utamakan cache, network hanya cadangan
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request);
    })
  );
});

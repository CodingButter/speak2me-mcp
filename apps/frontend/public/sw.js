// TODO: Enhance service worker with comprehensive PWA features
// Project Scope: §3.1 (PWA Features), §6 (Reliability)
//
// Current implementation: Basic network-first caching
// Missing features:
//
// 1. Cache strategies (use Workbox library):
//    - Critical assets (HTML, CSS, JS): Cache-first with network fallback
//    - API calls: Network-first with cache fallback
//    - Audio assets: Cache-first for replay (large files)
//    - Images/icons: Cache-first
//
// 2. Offline fallback page:
//    - Create public/offline.html with friendly offline message
//    - Serve when network request fails and no cache available
//
// 3. Background sync:
//    - Queue failed audio uploads (POST /api/audio/upload)
//    - Retry when connection restored
//    - Use Background Sync API (navigator.serviceWorker.sync)
//
// 4. Push notifications (future):
//    - Notify user when assistant responds (if PWA is backgrounded)
//    - Notify on transcription complete
//
// 5. Precaching:
//    - Cache critical assets on install
//    - Update cache list automatically (use Workbox precaching)
//
// 6. Cache versioning:
//    - Increment version on app updates
//    - Clean old caches on activate
//
// 7. Skip waiting strategy:
//    - Auto-update service worker when new version available
//    - Notify main app to reload
//
// 8. Request filtering:
//    - Don't cache WebSocket/SSE connections
//    - Don't cache audio streams (too large)
//    - Cache audio assets after download complete
//
// Implementation:
// - Install Workbox: `bun add workbox-webpack-plugin`
// - Use Workbox generateSW in Vite config
// - Or manually enhance this file with Workbox runtime
//
// Reference: https://developers.google.com/web/tools/workbox
// assignees: codingbutter
// labels: enhancement, pwa
// milestone: MVP Launch

// Simple service worker for PWA functionality
const CACHE_NAME = 'voice-mcp-v1';
const urlsToCache = [
  '/',
  '/main.js',
  '/manifest.json'
];

// Install service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activate service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch strategy: Network first, fallback to cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Only cache GET requests (POST, PUT, DELETE, etc. cannot be cached)
        if (event.request.method === 'GET') {
          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
        }

        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});

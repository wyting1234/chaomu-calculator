/* 朝暮计 Service Worker — 离线缓存 */
const CACHE_NAME = 'chaomu-v1';
const ASSETS = [
    './',
    './index.html',
    './manifest.webmanifest',
    './icon-192.png',
    './icon-512.png'
];

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(ASSETS).then(function () {
                return self.skipWaiting();
            });
        })
    );
});

self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function (keys) {
            return Promise.all(
                keys.filter(function (k) { return k !== CACHE_NAME; })
                    .map(function (k) { return caches.delete(k); })
            ).then(function () { return self.clients.claim(); });
        })
    );
});

self.addEventListener('fetch', function (e) {
    if (e.request.method !== 'GET') return;
    e.respondWith(
        caches.match(e.request).then(function (cached) {
            var network = fetch(e.request).then(function (resp) {
                if (resp && resp.status === 200 && resp.type === 'basic') {
                    var clone = resp.clone();
                    caches.open(CACHE_NAME).then(function (cache) {
                        cache.put(e.request, clone);
                    });
                }
                return resp;
            }).catch(function () {
                return cached || caches.match('./index.html');
            });
            return cached || network;
        })
    );
});

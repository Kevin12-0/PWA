const cache_name = "pwa-cv-v1";
const urlsToCache = [
    '/', 'js/index.js', "/index.html"
];

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(cache_name).then(cache => {
            cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
});
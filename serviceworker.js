const cache_name = "pwa-cv-v1";
const urlsToCache = [
    '/', '/js/index.js'
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(cache_name)
            .then(cache => {
                console.log("cache opened");
                return cache.addAll(urlsToCache);
            })
    );
});


self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }

                const fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    response => {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        const responseToCache = response.clone();

                        caches.open(cache_name)
                            .then(cache => {
                                cache.put(event.request, responseToCache)
                            });
                        return response;
                    }
                )
            })
    )
});
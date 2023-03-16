console.log("HELLO WORLD");

const browserInformation = {
    name: 'Microsoft Edge',
    version: 108
};

localStorage.setItem('browser', JSON.stringify(browserInformation));

const value = localStorage.getItem('browser');

self.addEventListener("fetch", event => {
    async function cacheAndReturnRequest() {
        // Get the response from the server.
        const fetchResponse = await fetch(event.request.url);
        // Open the app's cache.
        const cache = await caches.open("cache-name");
        // Put the response in cache.
        cache.put(event.request.url, fetchResponse.clone());
        // And return the response.
        return fetchResponse
    }

    event.respondWith(cacheAndReturnRequest());
});

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("../serviceworker.js")
    .then(registration => {
        console.log("service worker registred: ", registration);
    })
    .catch(error => {
        console.error("service worker registration failed:", error);
    });
}
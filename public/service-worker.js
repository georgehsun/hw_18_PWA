const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/manifest.webmanifest',
    '/style.css',
    '/index.js',
    '/db.js',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
];

const CACHE_NAME = "static-cache-v1";

// install
self.addEventListener("install", function(evt) {
    evt.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Your files were pre-cached successfully!");
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// fetch
self.addEventListener("fetch", function(evt) {
    //console.log(evt)
    evt.respondWith(
        fetch(evt.request).catch(function() {
            return caches.match(evt.request).then(function(response) {
                if (response) {
                    return response
                }
                cache.match("/index.html");
            })
        })
    )
});
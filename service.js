// Ensure that the browser supports the service worker API
if (navigator.serviceWorker) {
	// Start registration process on every page load
	window.addEventListener('load', () => {
		navigator.serviceWorker
			// The register function takes as argument
			// the file path to the worker's file
			.register('service_worker.js')
			// Gives us registration object
			.then(reg => console.log('Service Worker Registered'))
			.catch(swErr => console.log(
					`Service Worker Installation Error: ${swErr}}`));
		});
	}

var cacheAll = false;
var CACHE_NAME = 'webapk-cache';


// Install Event
self.addEventListener('install', function(event) {
	console.log("[SW] install event: ",event);
	// Perform install steps
	event.waitUntil(
		caches.open(CACHE_NAME).then(
			function(cache) {
				console.log('[SW] Opened cache: ',cache);
				return cache.addAll(urlsToCache);
			}
		)
	);
});


// Fetch Event
self.addEventListener('fetch', function(event) {
	console.log("[SW] fetch event: ",event);
	event.respondWith(
		caches.match(event.request).then(
			function(response) {
				if (response) return response;
				else if (!cacheAll || urlsNotToCache.indexOf(event.request) !== -1) return fetch(event.request);
				else {
					fetch(event.request).then(
						function(response) {
							if(!response || response.status !== 200 || response.type !== 'basic') return response;
							var responseToCache = response.clone();
							caches.open(CACHE_NAME).then(
								function(cache) {
									cache.put(event.request, responseToCache);
								}
							);
							return response;
						}
					);
				}
			}
		)
);
});
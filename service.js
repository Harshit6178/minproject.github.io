
//Registration of Service Worker
if (navigator.serviceWorker) {
	window.addEventListener('load', () => {
	navigator.serviceWorker
			.register('service_worker.js')
			.then(reg => console.log('Service Worker Registered'))
			.catch(swErr => console.log(
					`Service Worker Installation Error: ${swErr}}`));
		});
	}

var call = false;
var cname = 'webapk-cache';


// Install Event
self.addEventListener('install', function(event) {
	console.log("[SW] install event: ",event);
	event.waitUntil(
		caches.open(cname).then(
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
				else if (!call || urlsNotToCache.indexOf(event.request) !== -1) return fetch(event.request);
				else {
					fetch(event.request).then(
						function(response) {
							if(!response || response.status !== 200 || response.type !== 'basic') return response;
							var responseToCache = response.clone();
							caches.open(cname).then(
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
//Registration of Service Worker
if (navigator.serviceWorker) {
	window.addEventListener('load', () => {
	navigator.serviceWorker
			.register('service_worker.js')
			.then(reg => console.log('Service Worker Registered'))
			.catch(swErr => console.log(
					`Service Worker Installation Error: ${swErr}}`));
		});
	}

var call = false;
var cname = 'webapk-cache';


// Install Event
self.addEventListener('install', function(event) {
	console.log("[SW] install event: ",event);
	event.waitUntil(
		caches.open(cname).then(
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
				else if (!call || urlsNotToCache.indexOf(event.request) !== -1) return fetch(event.request);
				else {
					fetch(event.request).then(
						function(response) {
							if(!response || response.status !== 200 || response.type !== 'basic') return response;
							var responseToCache = response.clone();
							caches.open(cname).then(
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

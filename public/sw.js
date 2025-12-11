// Service Worker for PWA support
const CACHE_NAME = "nextjs-pwa-v1"
const urlsToCache = ["/", "/offline.html"]

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch(() => {
        // Ignore errors if some URLs fail to cache
      })
    }),
  )
  self.skipWaiting()
})

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
  self.clients.claim()
})

// Fetch event - Network first strategy
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (!response || response.status !== 200 || (response.type === "basic" && response.url.includes("/api/"))) {
          return response
        }

        const responseToCache = response.clone()
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache)
        })

        return response
      })
      .catch(() => {
        return caches.match(event.request).then((response) => {
          return (
            response ||
            new Response("Offline - Content not available", {
              status: 503,
              statusText: "Service Unavailable",
              headers: new Headers({
                "Content-Type": "text/plain",
              }),
            })
          )
        })
      }),
  )
})

// Push notification event
self.addEventListener("push", (event) => {
  const data = event.data?.json() || {}
  const options = {
    body: data.body || "New notification",
    icon: "/icon-192x192.jpg",
    badge: "/icon-192x192.jpg",
    vibrate: [100, 50, 100],
    tag: "notification",
    requireInteraction: false,
  }

  event.waitUntil(self.registration.showNotification(data.title || "Notification", options))
})

// Notification click event
self.addEventListener("notificationclick", (event) => {
  event.notification.close()
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        return clientList[0].focus()
      }
      return clients.openWindow("/")
    }),
  )
})

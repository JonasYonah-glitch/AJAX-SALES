self.addEventListener("install", () => {
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheKeys = await caches.keys()
      await Promise.all(cacheKeys.map((cacheKey) => caches.delete(cacheKey)))

      await self.clients.claim()
      await self.registration.unregister()

      const clients = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      })

      await Promise.all(
        clients.map(async (client) => {
          if ("navigate" in client) {
            await client.navigate(client.url)
          }
        })
      )
    })()
  )
})

self.addEventListener("fetch", () => {})

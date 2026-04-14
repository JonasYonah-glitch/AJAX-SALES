"use client"

import { useEffect } from "react"

const RELOAD_MARKER = "ajax-sales-legacy-cache-reset"

export function LegacyWorkerReset() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    if (!("serviceWorker" in navigator) && !("caches" in window)) {
      return
    }

    let cancelled = false

    const cleanupLegacyAssets = async () => {
      let shouldReload = false

      if ("serviceWorker" in navigator) {
        try {
          const registrations = await navigator.serviceWorker.getRegistrations()

          if (registrations.length > 0) {
            shouldReload = true
          }

          await Promise.all(
            registrations.map(async (registration) => {
              try {
                await registration.unregister()
              } catch {
                // Ignore stale registrations we can't remove cleanly.
              }
            })
          )
        } catch {
          // Ignore browsers that block service worker inspection.
        }
      }

      if ("caches" in window) {
        try {
          const cacheKeys = await caches.keys()

          if (cacheKeys.length > 0) {
            shouldReload = true
          }

          await Promise.all(
            cacheKeys.map(async (cacheKey) => {
              try {
                await caches.delete(cacheKey)
              } catch {
                // Ignore cache entries that disappear during cleanup.
              }
            })
          )
        } catch {
          // Ignore browsers that block cache access.
        }
      }

      if (cancelled || !shouldReload) {
        return
      }

      try {
        const hasReloaded = window.sessionStorage.getItem(RELOAD_MARKER) === "1"

        if (!hasReloaded) {
          window.sessionStorage.setItem(RELOAD_MARKER, "1")
          window.location.reload()
          return
        }

        window.sessionStorage.removeItem(RELOAD_MARKER)
      } catch {
        window.location.reload()
      }
    }

    void cleanupLegacyAssets()

    return () => {
      cancelled = true
    }
  }, [])

  return null
}

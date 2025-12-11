import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DEEP Trust - Helping Hands, Healing Hearts",
    short_name: "DEEP Trust",
    description: "DEEP Trust PWA - Education, Healthcare, Livelihood, and Environmental initiatives",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#f97316",
    theme_color: "#f97316",
    icons: [
      {
        src: "/icon-192x192.jpg",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512x512.jpg",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-192x192.jpg",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/screenshot-540x720.jpg",
        sizes: "540x720",
        type: "image/png",
        form_factor: "narrow",
      },
      {
        src: "/screenshot-1280x720.jpg",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide",
      },
    ],
  }
}

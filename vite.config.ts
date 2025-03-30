import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: true },
      injectRegister: "auto",
      workbox: {
        cleanupOutdatedCaches: false,
        clientsClaim: true,
        skipWaiting: true,
        globPatterns: [
          "**/*.*"
        ],
        // Serve cached content for navigation requests
        navigateFallback: "/index.html",
        sourcemap: false
      },
      manifest: {
        name: "FinPlin",
        short_name: "FinPlin",
        description: "Manage your monthly budget",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/192x192.png", // Fixed icon paths
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/144x144.png",
            sizes: "144x144",
            type: "image/png"
          },
          {
            src: "/512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ],
        screenshots: [
          {
            src: "/850x1668.png",
            sizes: "850x1668",
            form_factor: "narrow"
          },
          {
            src: "/1728x1117.png",
            sizes: "1728x1117",
            form_factor: "wide"
          }
        ]
      }
    })
  ]
});

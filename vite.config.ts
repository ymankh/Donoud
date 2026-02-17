import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";
import manifest from "./public/manifest.json";

export default defineConfig(({ command }) => ({
  plugins: [
    react(
      command === "build"
        ? {
            babel: {
              plugins: [["babel-plugin-react-compiler", { target: "19" }]],
            },
          }
        : undefined
    ),
    VitePWA({
      registerType: "autoUpdate",  // Automatically updates the PWA
      manifest,  // Use the existing manifest.json
      devOptions: {
        enabled: false,  // Keep SW off in dev to avoid HMR/runtime conflicts
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "document",
            handler: "NetworkFirst",
          },
          {
            urlPattern: ({ request }) =>
              ["style", "script", "image"].includes(request.destination),
            handler: "CacheFirst",
            options: {
              cacheName: "assets-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
}));

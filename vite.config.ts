import { defineConfig } from "vite";
import { VitePWA, type Display } from "vite-plugin-pwa";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import manifest from "./public/manifest.json";

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    VitePWA({
      registerType: "autoUpdate",  // Automatically updates the PWA
      manifest: {
        ...manifest,
        display: manifest.display as Display,
      },  // Use the existing manifest.json
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
});

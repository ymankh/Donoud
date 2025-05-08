import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', { target: '19' }]],
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'public/icon128.svg', 'public/icon512.svg'],
      manifest: {
        name: 'Donoud',
        short_name: 'ReactPWA',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: 'public/icon128.svg',
            sizes: '128x128',
            type: 'image/svg',
          },
          {
            src: 'public/icon512.svg',
            sizes: '512x512',
            type: 'image/svg',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    }
  }
});
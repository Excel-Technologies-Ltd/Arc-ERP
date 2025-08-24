import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import proxyOptions from './proxyOptions';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
    host: '0.0.0.0',
    proxy: proxyOptions,
  },
  build: {
    commonjsOptions: {
      include: ['tailwind.config.js', 'node_modules/**'],
    },
    outDir: '../excel_rma/public/rma-web',
    emptyOutDir: true,
    target: 'es2015',
  },
  optimizeDeps: {
    include: ['tailwind-config'],
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'tailwind-config': fileURLToPath(new URL('./tailwind.config.js', import.meta.url)),
      'simplebar/dist/simplebar.css': fileURLToPath(
        new URL('./node_modules/simplebar/dist/simplebar.css', import.meta.url)
      ),
      // "tom-select/src": "tom-select",
    },
  },
});

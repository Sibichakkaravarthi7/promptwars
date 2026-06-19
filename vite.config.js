import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  server: {
    port: 3500,
    open: true,
    host: true,
    hmr: {
      overlay: true,
    },
  },
  preview: {
    port: 3500,
    open: true,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html',
    },
  },
})


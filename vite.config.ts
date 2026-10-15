import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { watch: { usePolling: true, interval: 300 } },
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  baseURL: 'https://tenderly-robust-midge.cloudpub.ru/',
  server: {
    allowedHosts: true, // Замените на ваш ngrok хост
  },
  plugins: [react()],
})

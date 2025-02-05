import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ['bf784428694294.lhr.life'], // Замените на ваш ngrok хост
  },
  plugins: [react()],
})

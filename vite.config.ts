import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["cdc60be16c44.ngrok-free.app", "54bbe939a01e.ngrok-free.app"] // for local
  }
})

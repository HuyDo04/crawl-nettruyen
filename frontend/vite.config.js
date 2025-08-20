import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      // Proxy cho các yêu cầu API
      "/api": {
        target: "http://localhost:3000", // backend local
        changeOrigin: true,
        secure: false,
      },
      // Proxy cho các yêu cầu hình ảnh
      "/uploads": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

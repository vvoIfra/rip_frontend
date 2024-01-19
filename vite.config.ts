import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 3000,
    proxy: {
      // string shorthand: http://localhost:3000/api -> http://localhost:8080/api
      '/api': 'http://127.0.0.1:8000',
    },
  },

})

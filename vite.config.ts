import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
base: "/rip_frontend/",
  plugins: [react()],
})

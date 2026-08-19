import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://workout-tracker-backend-z006.onrender.com/',
        changeOrigin: true,
      },
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './testSetup.js',
  },
})

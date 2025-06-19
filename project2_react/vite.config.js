import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  proxy: {
      '/api': 'http://localhost:8080',
      '/login': 'http://localhost:8080',
      '/signup': 'http://localhost:8080',
      '/data': 'http://localhost:8080',
      '/data2': 'http://localhost:8080',
      '/find-id': 'http://localhost:8080'
    }
})

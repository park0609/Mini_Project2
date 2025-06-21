import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    host: true,
    port: 5173
  },
  plugins: [react()],
  server: {
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8090',
      '/login': 'http://localhost:8090',
      '/logout': 'http://localhost:8090',
      '/signup': 'http://localhost:8090',
      '/search-cookie': 'http://localhost:8090',
      '/checklog': 'http://localhost:8090',
      '/find-id': 'http://localhost:8090',
      '/find-pw': 'http://localhost:8090',
      '/data': 'http://localhost:8090',
      '/data2': 'http://localhost:8090',
      '/posts': 'http://localhost:8090',
      '/modify-profile': 'http://localhost:8090',
    }
  }
})
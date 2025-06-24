import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  server: {
    
    historyApiFallback: true,  
    host: true,
    port: 5173
  },
  plugins: [react()],
})
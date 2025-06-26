import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
<<<<<<< Updated upstream
=======
  base: '/',
  plugins: [react()],
>>>>>>> Stashed changes
  server: {
    host: true,
    port: 5173
  },
  plugins: [react()],
})
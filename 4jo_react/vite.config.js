import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    // historyApiFallback: true,  이성훈 추가 일단 보류
    host: true,
    port: 5173
  },
  plugins: [react()],
})
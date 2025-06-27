import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    historyApiFallback: true,
    host: true,
    port: 5173, // 프론트 개발 서버 포트
    proxy: {
      // 게시글 API
      '/posts': {
        target: 'http://localhost:8090',
        changeOrigin: true,
      },
      // 댓글, 좋아요, 인증 관련 API
      '/like': {
        target: 'http://localhost:8090',
        changeOrigin: true,
      },
      '/logout': {
        target: 'http://localhost:8090',
        changeOrigin: true,
      },
      '/search-cookie': {
        target: 'http://localhost:8090',
        changeOrigin: true,
      },
      '/certinfo': {
        target: 'http://localhost:8090',
        changeOrigin: true,
      },
      '/api': {
        target: 'http://localhost:8090',
        changeOrigin: true
      },
      '/signup': {
        target: 'http://localhost:8090',
        changeOrigin: true
      },
      '/checklog': {
        target: 'http://localhost:8090',
        changeOrigin: true
      },
      '/find-id': {
        target: 'http://localhost:8090',
        changeOrigin: true
      },
      '/find-pw"': {
        target: 'http://localhost:8090',
        changeOrigin: true
      },
      '/modify-profile': {
        target: 'http://localhost:8090',
        changeOrigin: true
      },
      '/board_list': {
        target: 'http://localhost:8090',
        changeOrigin: true
      },
      '/top-viewer': {
        target: 'http://localhost:8090',
        changeOrigin: true
      },
      '/find-id': {
        target: 'http://localhost:8090',
        changeOrigin: true
      },
      '/commit': {
        target: 'http://localhost:8090',
        changeOrigin: true
      },
      '/mypage': {
        target: 'http://localhost:8090',
        changeOrigin: true
      }
    }
  }
})
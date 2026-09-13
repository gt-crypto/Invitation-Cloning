import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.invitationnation.in',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/cdn-admin': {
        target: 'https://cdn-admin.invitationnation.in',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cdn-admin/, ''),
      },
    },
  },
})

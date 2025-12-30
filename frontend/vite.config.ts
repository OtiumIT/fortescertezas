import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'form-vendor': ['react-hook-form'],
          'http-vendor': ['axios'],
          // Admin pages (lazy loaded)
          'admin-pages': [
            './src/pages/admin/Dashboard',
            './src/pages/admin/ContentManagement',
            './src/pages/admin/ServicesManagement',
            './src/pages/admin/JobsManagement',
            './src/pages/admin/PostsManagement',
            './src/pages/admin/ContactsList',
            './src/pages/admin/ApplicationsList',
            './src/pages/admin/PrivacyManagement',
          ],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3007',
        changeOrigin: true,
      },
    },
  },
})

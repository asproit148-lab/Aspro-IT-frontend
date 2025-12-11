// vite.config.js (Around line 1)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'; 
import viteCompression from 'vite-plugin-compression'; 

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({ algorithm: 'gzip', deleteOriginFile: false }),
    viteCompression({ algorithm: 'brotliCompress', deleteOriginFile: false, ext: '.br' }),
  ],
  
  build: {
    target: 'es2020', 
    
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', '@emotion/styled', 'lucide-react'],
          framer: ['framer-motion'],
        },
        // Naming convention for the output files
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      },
    },
    chunkSizeWarningLimit: 1000, 
  },
  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
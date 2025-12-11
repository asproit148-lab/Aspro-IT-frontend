// vite.config.js
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
        // --- FIX IS HERE ---
        manualChunks(id) {
          if (
            id.includes('node_modules/react') || 
            id.includes('node_modules/react-dom') || 
            id.includes('node_modules/react-router-dom') ||
            id.includes('node_modules/@emotion/styled') ||
            id.includes('node_modules/lucide-react')
          ) {
            return 'vendor';
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'framer';
          }
        },
        // --- END FIX ---
        
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
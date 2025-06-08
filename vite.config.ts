import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/dvnfitness-linkthree/',
  plugins: [react()],
  server: {
    port: 5173
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// En desarrollo, todo lo que vaya a /api se redirige al back local.
// Así el navegador ve un solo dominio y la cookie de sesión funciona.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
})

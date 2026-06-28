import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// User site (ichbinlucaskim.github.io) is served at the domain root,
// so the base path is '/'. Do NOT set a subpath base here.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  // Use /Alora-Abaya/ only for production builds (GitHub Pages).
  // Local dev serves at the root so the page loads correctly.
  base: command === 'build' ? '/Alora-Abaya/' : '/',
}))

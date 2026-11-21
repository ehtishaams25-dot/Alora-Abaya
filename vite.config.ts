import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const base = process.env.VITE_BASE_URL ?? (process.env.GITHUB_ACTIONS || process.env.GITHUB_PAGES ? '/Alora-Abaya/' : '/')

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base,
})

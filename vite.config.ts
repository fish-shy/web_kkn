import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// Alamat backend Express saat pengembangan. Ubah lewat `BACKEND_URL` bila
// backend dijalankan di port lain.
const backend = process.env.BACKEND_URL ?? 'http://localhost:4000'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    allowedHosts: [
      'unnullified-unexpansively-soledad.ngrok-free.dev'
    ],
    // Dengan proxy ini, frontend cukup memanggil `/api/...` tanpa perlu
    // menyetel VITE_API_URL saat pengembangan. Gambar unggahan tidak lewat
    // sini — Supabase Storage melayaninya langsung lewat URL publiknya.
    proxy: {
      '/api': { target: backend, changeOrigin: true },
    },
  },
})

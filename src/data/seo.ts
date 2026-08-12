/**
 * Metadata SEO per rute.
 *
 * Datanya sendiri ada di `seo.json` — berformat JSON karena dipakai dua kali:
 * di sini untuk aplikasi saat berpindah halaman, dan oleh
 * `scripts/prerender.mjs` yang menuliskannya ke berkas HTML statis saat build.
 * Kalau ditulis sebagai TypeScript, skrip build Node tidak bisa membacanya
 * tanpa alat tambahan, dan judul/deskripsi akan mudah berbeda di dua tempat.
 *
 * Yang dilihat mesin pencari dan pratinjau WhatsApp adalah versi hasil
 * prerender, bukan yang disetel di sini — hook `usePageMeta` hanya menjaga
 * agar metanya tetap benar setelah pengguna berpindah halaman di dalam situs.
 */

import tabel from './seo.json'

export type RuteSeo = {
  path: string
  judul: string
  deskripsi: string
}

export const RUTE_SEO: RuteSeo[] = tabel.rute

/** Metadata satu rute. Melempar saat rutenya belum didaftarkan. */
export function seo(path: string): RuteSeo {
  const r = RUTE_SEO.find((x) => x.path === path)
  if (!r) {
    throw new Error(
      `Rute "${path}" belum ada di src/data/seo.json — tambahkan judul dan deskripsinya.`,
    )
  }
  return r
}

import type { IconName } from '../components/Icon'

/**
 * Ikon yang mewakili tiap kategori berita / album galeri.
 * Hanya terpakai bila item tidak punya foto asli — sebagai gambar cadangan.
 */
export const GLYPH: Record<string, IconName> = {
  // kategori berita
  Kesehatan: 'heart',
  Pemerintahan: 'building',
  Pembangunan: 'ruler',

  // album galeri
  'Apel Pagi': 'users',
  'Penilaian Eco Office': 'leaf',
  Pengumuman: 'megaphone',
}

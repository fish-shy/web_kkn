/**
 * Tipe berita & kegiatan kelurahan.
 *
 * Isinya sekarang tersimpan di basis data dan diambil lewat API
 * (`GET /api/berita`), bukan lagi ditulis tetap di berkas ini. Yang tertinggal
 * di sini hanya tipe dan daftar kategori bawaan.
 *
 * Data awal — beserta tautan publikasi aslinya di
 * https://kel-landasanulintengah.banjarbarukota.go.id/ — dipindahkan ke
 * `backend/prisma/data-awal.ts` dan dimuat oleh `npm run db:seed`.
 */

export type Blok =
  | { t: 'p'; v: string }
  | { t: 'h2'; v: string }
  | { t: 'ul'; v: string[] }
  | { t: 'quote'; v: string; by?: string }

export type Berita = {
  id: string
  slug: string
  judul: string
  kategori: string
  /** `YYYY-MM-DD` */
  tanggal: string
  lokasi: string
  penulis: string
  ringkas: string
  /** Path foto utama. Kosong = pakai gambar bangkitan. */
  foto: string | null
  /** Tautan publikasi asli, bila menyadur dari sumber lain. */
  sumber: string | null
  isi: Blok[]
  diperbarui?: string
}

/**
 * Kategori yang selalu ditawarkan di panel admin dan filter halaman berita.
 * Admin boleh mengetik kategori lain; yang tersimpan di basis data ikut
 * muncul lewat `daftarKategori()`.
 */
export const KATEGORI: string[] = ['Pemerintahan', 'Kesehatan', 'Pembangunan']

/** Gabungan kategori bawaan dengan yang benar-benar dipakai berita. */
export function daftarKategori(berita: Berita[]): string[] {
  const dipakai = berita.map((b) => b.kategori)
  return [...new Set([...KATEGORI, ...dipakai])]
}

/** Berita kosong untuk mengisi formulir tambah di panel admin. */
export const BERITA_BARU: Omit<Berita, 'id' | 'slug'> = {
  judul: '',
  kategori: KATEGORI[0],
  tanggal: new Date().toISOString().slice(0, 10),
  lokasi: 'Kelurahan Landasan Ulin Tengah',
  penulis: 'Admin Kelurahan',
  ringkas: '',
  foto: null,
  sumber: null,
  isi: [{ t: 'p', v: '' }],
}

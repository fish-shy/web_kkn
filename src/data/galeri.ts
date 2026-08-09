/**
 * Tipe galeri kegiatan kelurahan.
 *
 * Daftar fotonya tersimpan di basis data dan diambil lewat `GET /api/galeri`.
 * Data awal ada di `backend/prisma/data-awal.ts`, bersumber dari publikasi
 * resmi kelurahan di https://kel-landasanulintengah.banjarbarukota.go.id/.
 */

export type Foto = {
  id: string
  judul: string
  /** Label pendek untuk kartu di beranda (maks. ±2 kata). */
  ringkas: string
  album: string
  /** `YYYY-MM-DD` */
  tanggal: string
  /** Path berkas gambar. */
  foto: string
  /** Tautan publikasi asli, bila ada. */
  sumber: string | null
  urutan: number
}

/** Album bawaan; admin boleh menambah nama album baru. */
export const ALBUM: string[] = [
  'Apel Pagi',
  'Penilaian Eco Office',
  'Kesehatan',
  'Pengumuman',
]

/** Gabungan album bawaan dengan yang benar-benar dipakai foto. */
export function daftarAlbum(galeri: Foto[]): string[] {
  return [...new Set([...ALBUM, ...galeri.map((g) => g.album)])]
}

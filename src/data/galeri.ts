/** Galeri kegiatan warga. */

export type Foto = {
  id: string
  judul: string
  /** Label pendek untuk kartu warna di beranda (maks. ±2 kata). */
  ringkas: string
  album: AlbumNama
  tanggal: string
  span?: 'wide' | 'tall'
}

export type AlbumNama =
  | 'Kegiatan Warga'
  | 'Posyandu & Kesehatan'
  | 'Pembangunan'
  | 'Keagamaan'
  | 'UMKM'
  | 'Pemerintahan'

export const ALBUM: AlbumNama[] = [
  'Kegiatan Warga',
  'Posyandu & Kesehatan',
  'Pembangunan',
  'Keagamaan',
  'UMKM',
  'Pemerintahan',
]

export const GALERI: Foto[] = [
  {
    id: 'g01',
    judul: 'Senam bersama warga di halaman kelurahan',
    ringkas: 'Senam Warga',
    album: 'Kegiatan Warga',
    tanggal: '2026-07-19',
    span: 'wide',
  },
  {
    id: 'g02',
    judul: 'Penimbangan balita di Posyandu Melati',
    ringkas: 'Posyandu Balita',
    album: 'Posyandu & Kesehatan',
    tanggal: '2026-07-11',
  },
  {
    id: 'g03',
    judul: 'Kunjungan Tim Pendamping Keluarga',
    ringkas: 'Pendampingan Keluarga',
    album: 'Posyandu & Kesehatan',
    tanggal: '2026-07-28',
    span: 'tall',
  },
  {
    id: 'g04',
    judul: 'Pawai obor menyambut Tahun Baru Islam',
    ringkas: 'Pawai Obor',
    album: 'Keagamaan',
    tanggal: '2026-06-16',
  },
  {
    id: 'g05',
    judul: 'Perbaikan jalan lingkungan RT 05',
    ringkas: 'Perbaikan Jalan',
    album: 'Pembangunan',
    tanggal: '2026-06-02',
  },
  {
    id: 'g06',
    judul: 'Pelatihan kemasan produk UMKM',
    ringkas: 'Pelatihan UMKM',
    album: 'UMKM',
    tanggal: '2026-05-08',
    span: 'wide',
  },
  {
    id: 'g07',
    judul: 'Musyawarah kelurahan bersama RT dan RW',
    ringkas: 'Musyawarah Kelurahan',
    album: 'Pemerintahan',
    tanggal: '2026-05-21',
  },
  {
    id: 'g08',
    judul: 'Gotong royong pembersihan drainase',
    ringkas: 'Gotong Royong',
    album: 'Pembangunan',
    tanggal: '2026-04-19',
  },
  {
    id: 'g09',
    judul: 'Bazar produk warga di halaman kantor',
    ringkas: 'Bazar Warga',
    album: 'UMKM',
    tanggal: '2026-04-12',
    span: 'tall',
  },
  {
    id: 'g10',
    judul: 'Penyaluran bantuan pangan untuk KPM',
    ringkas: 'Bantuan Pangan',
    album: 'Kegiatan Warga',
    tanggal: '2026-04-03',
  },
  {
    id: 'g11',
    judul: 'Pembinaan Karang Taruna kelurahan',
    ringkas: 'Karang Taruna',
    album: 'Kegiatan Warga',
    tanggal: '2026-03-14',
  },
  {
    id: 'g12',
    judul: 'Pelayanan adminduk keliling di Balai RT 12',
    ringkas: 'Adminduk Keliling',
    album: 'Pemerintahan',
    tanggal: '2026-02-27',
  },
  {
    id: 'g13',
    judul: 'Pemeriksaan kesehatan Posyandu Lansia',
    ringkas: 'Posyandu Lansia',
    album: 'Posyandu & Kesehatan',
    tanggal: '2026-02-11',
  },
  {
    id: 'g14',
    judul: 'Pengajian rutin ibu-ibu majelis taklim',
    ringkas: 'Majelis Taklim',
    album: 'Keagamaan',
    tanggal: '2026-02-06',
  },
  {
    id: 'g15',
    judul: 'Sosialisasi pembentukan bank sampah',
    ringkas: 'Bank Sampah',
    album: 'Pembangunan',
    tanggal: '2026-01-23',
  },
  {
    id: 'g16',
    judul: 'Apel pagi aparatur kelurahan',
    ringkas: 'Apel Pagi',
    album: 'Pemerintahan',
    tanggal: '2026-01-06',
  },
]

/** Delapan kartu ringkas untuk strip galeri di beranda. */
export const GALERI_BERANDA = GALERI.slice(0, 8)

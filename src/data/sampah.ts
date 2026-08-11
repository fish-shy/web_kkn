/**
 * Materi edukasi pemilahan sampah untuk halaman /edukasi-sampah.
 *
 * Isinya menempel pada program yang benar-benar berjalan di kelurahan:
 * pemilahan dua aliran (organik & anorganik) dengan empat drop point di dua
 * RW, sampah anorganik diintegrasikan ke Bank Sampah Hidayah RT 2 RW 1, dan
 * sampah organik dialirkan ke bank sampah organik yang dikelola bersama TP
 * PKK kelurahan. Sumber: publikasi kegiatan kelurahan, lihat halaman Berita.
 *
 * Empat kategori di bawah memakai kode warna tempat sampah yang lazim dipakai
 * pemerintah daerah: hijau organik, kuning/biru anorganik, merah B3, abu
 * residu. Program kelurahan sendiri baru memilah dua aliran; B3 dan residu
 * tetap diajarkan supaya tidak ikut tercampur ke dua aliran itu.
 */

import type { IconName } from '../components/Icon'

export type KategoriSampah = 'organik' | 'anorganik' | 'b3' | 'residu'

export type InfoKategori = {
  id: KategoriSampah
  nama: string
  ringkas: string
  icon: IconName
  /** Warna penanda; memakai token yang sudah ada agar menyatu dengan situs. */
  warna: string
  contoh: string[]
  penanganan: string
}

export const KATEGORI: InfoKategori[] = [
  {
    id: 'organik',
    nama: 'Organik',
    ringkas: 'Sisa dapur dan kebun yang bisa terurai',
    icon: 'leaf',
    warna: 'var(--leaf-600)',
    contoh: ['Sisa nasi dan sayur', 'Kulit buah', 'Daun kering', 'Ampas kopi'],
    penanganan:
      'Kumpulkan di wadah khusus dari rumah, lalu antar ke titik kumpul lingkungan. Dari situ diolah di bank sampah organik bersama TP PKK kelurahan.',
  },
  {
    id: 'anorganik',
    nama: 'Anorganik',
    ringkas: 'Masih bernilai, bisa didaur ulang atau dijual',
    icon: 'recycle',
    warna: 'var(--clay-500)',
    contoh: ['Botol plastik', 'Kardus', 'Kaleng', 'Botol kaca'],
    penanganan:
      'Bilas sampai bersih dan keringkan sebelum disetor ke Bank Sampah Hidayah RT 2 RW 1. Yang bersih dan kering nilainya lebih tinggi.',
  },
  {
    id: 'b3',
    nama: 'B3',
    ringkas: 'Berbahaya dan beracun — jangan pernah dicampur',
    icon: 'battery',
    warna: 'var(--clay-700)',
    contoh: ['Baterai bekas', 'Lampu neon', 'Obat kedaluwarsa', 'Kaleng cat'],
    penanganan:
      'Simpan terpisah dalam wadah tertutup, jangan dibuang ke tempat sampah biasa maupun dibakar. Serahkan ke kelurahan atau petugas kebersihan untuk penanganan khusus.',
  },
  {
    id: 'residu',
    nama: 'Residu',
    ringkas: 'Belum ada jalur daur ulangnya',
    icon: 'trash',
    warna: 'var(--ink-500)',
    contoh: ['Popok sekali pakai', 'Puntung rokok', 'Kemasan sachet', 'Tisu bekas'],
    penanganan:
      'Bagian inilah yang benar-benar dibuang ke TPS. Semakin rajin memilah tiga kategori di atas, semakin kecil residu yang harus diangkut.',
  },
]

export const PETA_KATEGORI = Object.fromEntries(
  KATEGORI.map((k) => [k.id, k]),
) as Record<KategoriSampah, InfoKategori>

export type ItemSampah = {
  nama: string
  kategori: KategoriSampah
  /** Alasan singkat, ditampilkan setelah pemain menjawab. */
  alasan: string
}

/** Barang sehari-hari yang lazim ditemui di rumah warga. */
export const ITEM: ItemSampah[] = [
  // --- Organik ---
  {
    nama: 'Sisa nasi',
    kategori: 'organik',
    alasan: 'Terurai cepat jadi kompos. Jangan dicampur plastik supaya komposnya tidak tercemar.',
  },
  {
    nama: 'Kulit pisang',
    kategori: 'organik',
    alasan: 'Sisa buah dan sayur adalah bahan utama kompos rumah tangga.',
  },
  {
    nama: 'Daun kering halaman',
    kategori: 'organik',
    alasan: 'Justru bagus dicampur sisa dapur — daun kering menyeimbangkan kelembapan kompos.',
  },
  {
    nama: 'Ampas kopi',
    kategori: 'organik',
    alasan: 'Terurai cepat dan menambah unsur hara pada kompos.',
  },
  {
    nama: 'Cangkang telur',
    kategori: 'organik',
    alasan: 'Terurai walau agak lambat. Diremukkan dulu supaya lebih cepat hancur.',
  },
  {
    nama: 'Sayur busuk',
    kategori: 'organik',
    alasan: 'Meski sudah membusuk, tempatnya tetap di aliran organik, bukan dibuang ke TPS.',
  },

  // --- Anorganik ---
  {
    nama: 'Botol air mineral',
    kategori: 'anorganik',
    alasan: 'Bilas dan penyet dulu. Botol bersih lebih tinggi nilainya di bank sampah.',
  },
  {
    nama: 'Kardus bekas',
    kategori: 'anorganik',
    alasan: 'Laku di bank sampah asal kering. Kardus basah tidak bisa didaur ulang.',
  },
  {
    nama: 'Kaleng susu',
    kategori: 'anorganik',
    alasan: 'Logam bisa dilebur berulang kali. Bilas sisa isinya lebih dulu.',
  },
  {
    nama: 'Koran bekas',
    kategori: 'anorganik',
    alasan: 'Kertas termasuk anorganik yang paling mudah disalurkan ke bank sampah.',
  },
  {
    nama: 'Gelas plastik minuman',
    kategori: 'anorganik',
    alasan: 'Buang dulu sisa minuman dan sedotannya, baru masuk ke wadah anorganik.',
  },
  {
    nama: 'Botol kaca sirup',
    kategori: 'anorganik',
    alasan: 'Kaca bisa didaur ulang tanpa batas. Hati-hati bila sudah retak.',
  },
  {
    nama: 'Kertas HVS bekas',
    kategori: 'anorganik',
    alasan: 'Kertas kantor bernilai lebih tinggi daripada kertas campuran.',
  },

  // --- B3 ---
  {
    nama: 'Baterai bekas',
    kategori: 'b3',
    alasan: 'Mengandung logam berat. Sekali bocor bisa mencemari tanah dan air sumur warga.',
  },
  {
    nama: 'Lampu neon pecah',
    kategori: 'b3',
    alasan: 'Mengandung merkuri. Bungkus rapat dan jangan dibuang ke tempat sampah biasa.',
  },
  {
    nama: 'Obat kedaluwarsa',
    kategori: 'b3',
    alasan: 'Jangan dibuang ke tempat sampah atau saluran air — zat aktifnya mencemari air tanah.',
  },
  {
    nama: 'Kaleng cat',
    kategori: 'b3',
    alasan: 'Sisa cat dan pelarutnya beracun, meski kalengnya terlihat seperti logam biasa.',
  },
  {
    nama: 'Botol pemutih pakaian',
    kategori: 'b3',
    alasan: 'Sisa bahan kimianya berbahaya. Jangan disetor ke bank sampah bersama plastik lain.',
  },
  {
    nama: 'Charger rusak',
    kategori: 'b3',
    alasan: 'Sampah elektronik memuat logam berat; perlu jalur penanganan khusus.',
  },

  // --- Residu ---
  {
    nama: 'Popok sekali pakai',
    kategori: 'residu',
    alasan: 'Bercampur bahan penyerap dan plastik, belum ada jalur daur ulangnya.',
  },
  {
    nama: 'Puntung rokok',
    kategori: 'residu',
    alasan: 'Filternya plastik, bukan kapas — tidak terurai dan tidak bisa didaur ulang.',
  },
  {
    nama: 'Kemasan sachet kopi',
    kategori: 'residu',
    alasan: 'Lapisannya campuran plastik dan aluminium yang belum bisa dipisahkan di sini.',
  },
  {
    nama: 'Styrofoam bekas gorengan',
    kategori: 'residu',
    alasan: 'Sudah terkena minyak, jadi tidak diterima daur ulang meski bahannya plastik.',
  },
  {
    nama: 'Tisu bekas pakai',
    kategori: 'residu',
    alasan: 'Seratnya sudah terlalu pendek untuk didaur ulang, dan sering terkontaminasi.',
  },
  {
    nama: 'Pecahan keramik',
    kategori: 'residu',
    alasan: 'Bukan kaca kemasan — tidak bisa dilebur bersama botol. Bungkus agar tidak melukai petugas.',
  },
]

/* ------------------------------------------------------------- Permainan */

export const SOAL_PER_RONDE = 10

export type Lencana = {
  minBenar: number
  nama: string
  pesan: string
}

/** Diurutkan dari yang tertinggi; ambil yang pertama terpenuhi. */
export const LENCANA: Lencana[] = [
  {
    minBenar: 10,
    nama: 'Juara Pilah Sampah',
    pesan: 'Sempurna. Ajak tetangga dan pengurus RT mencoba juga.',
  },
  {
    minBenar: 8,
    nama: 'Kader Peduli Sampah',
    pesan: 'Sudah sangat baik. Tinggal merapikan beberapa jenis yang masih tertukar.',
  },
  {
    minBenar: 6,
    nama: 'Warga Sadar Pilah',
    pesan: 'Dasarnya sudah ada. Baca kembali panduan di bawah, lalu coba lagi.',
  },
  {
    minBenar: 0,
    nama: 'Masih Belajar',
    pesan: 'Tidak apa-apa — memilah itu kebiasaan yang dilatih. Pelajari panduannya dan ulangi.',
  },
]

export function lencanaUntuk(benar: number): Lencana {
  return LENCANA.find((l) => benar >= l.minBenar) ?? LENCANA[LENCANA.length - 1]
}

/* ------------------------------------------------------- Langkah di rumah */

export const LANGKAH: { icon: IconName; judul: string; teks: string }[] = [
  {
    icon: 'home',
    judul: 'Sediakan dua wadah',
    teks: 'Satu untuk sisa dapur, satu untuk kemasan bekas. Cukup ember bekas — tidak perlu tempat sampah baru.',
  },
  {
    icon: 'hand-heart',
    judul: 'Bilas sebelum dikumpulkan',
    teks: 'Botol dan kaleng yang bersih tidak mengundang lalat, tidak berbau, dan nilainya lebih tinggi di bank sampah.',
  },
  {
    icon: 'map-pin',
    judul: 'Antar ke drop point',
    teks: 'Empat drop point tersedia di dua RW. Tanyakan titik terdekat ke pengurus RT masing-masing.',
  },
  {
    icon: 'users',
    judul: 'Ajak satu tetangga',
    teks: 'Program ini menyasar sekitar 200 kepala keluarga. Satu orang mengajak satu, jangkauannya berlipat.',
  },
]

/** Angka yang dipakai pada bagian pengantar. Sumber: publikasi kelurahan. */
export const FAKTA = [
  { angka: '4', label: 'Drop point sampah terpilah' },
  { angka: '2', label: 'Rukun warga terlayani' },
  { angka: '± 200', label: 'Kepala keluarga sasaran' },
  { angka: '2', label: 'Aliran pemilahan: organik & anorganik' },
]

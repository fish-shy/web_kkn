/**
 * Identitas & data kontak kelurahan.
 * CATATAN: nomor telepon, email, dan koordinat di bawah masih berupa
 * contoh — ganti dengan data resmi sebelum situs dipublikasikan.
 */

export const SITE = {
  name: 'Kelurahan Landasan Ulin Tengah',
  short: 'Landasan Ulin Tengah',
  kicker: 'Kelurahan',
  kecamatan: 'Kecamatan Liang Anggang',
  kota: 'Kota Banjarbaru',
  provinsi: 'Kalimantan Selatan',
  motto: 'Gawi Sabarataan',
  description:
    'Situs resmi Kelurahan Landasan Ulin Tengah, Kecamatan Liang Anggang, Kota Banjarbaru. Menyajikan profil wilayah, data kependudukan, berita, serta kegiatan Kampung Keluarga Berkualitas secara terbuka.',
  logo: '/logo-kelurahan.jpg',
  foto: '/foto-kelurahan.png',
  // Alamat & telepon terkonfirmasi dari halaman kontak situs resmi kelurahan
  // dan papan nama kantor yang terlihat pada foto Penilaian Eco Office.
  alamat:
    'Jl. A. Yani Km. 22,600 RT 003 RW 002, Kelurahan Landasan Ulin Tengah, Kec. Liang Anggang, Kota Banjarbaru, Kalimantan Selatan 70723',
  telepon: '(0511) 4705429',
  whatsapp: '0812-5100-0000',
  whatsappLink: 'https://wa.me/6281251000000',
  email: 'landasanulintengah@banjarbarukota.go.id',
  maps: 'https://www.google.com/maps/search/?api=1&query=Kelurahan+Landasan+Ulin+Tengah+Liang+Anggang+Banjarbaru',
  koordinat: { lat: -3.4451, lng: 114.7412 },
} as const

export type NavItem = { label: string; to: string }

export const NAV: NavItem[] = [
  { label: 'Beranda', to: '/' },
  { label: 'Profil', to: '/profil' },
  { label: 'Berita', to: '/berita' },
  { label: 'Galeri', to: '/galeri' },
  { label: 'Edukasi Sampah', to: '/edukasi-sampah' },
  { label: 'Kontak', to: '/kontak' },
]

/** Jam pelayanan — index 0 = Minggu, mengikuti Date.getDay() */
export const JAM_LAYANAN = [
  { hari: 'Minggu', buka: null, tutup: null, label: 'Tutup' },
  { hari: 'Senin', buka: '08:00', tutup: '15:00', label: '08.00 – 15.00' },
  { hari: 'Selasa', buka: '08:00', tutup: '15:00', label: '08.00 – 15.00' },
  { hari: 'Rabu', buka: '08:00', tutup: '15:00', label: '08.00 – 15.00' },
  { hari: 'Kamis', buka: '08:00', tutup: '15:00', label: '08.00 – 15.00' },
  { hari: 'Jumat', buka: '08:00', tutup: '11:00', label: '08.00 – 11.00' },
  { hari: 'Sabtu', buka: null, tutup: null, label: 'Tutup' },
] as const

/** Ringkasan jam layanan untuk ditampilkan sebagai 3 baris */
export const JAM_RINGKAS = [
  { hari: 'Senin – Kamis', jam: '08.00 – 15.00 WITA' },
  { hari: 'Jumat', jam: '08.00 – 11.00 WITA' },
  { hari: 'Sabtu – Minggu', jam: 'Tutup' },
]

/**
 * Hanya akun yang terverifikasi yang dicantumkan. Tautan Facebook & YouTube
 * sebelumnya hanya mengarah ke beranda situsnya masing-masing — tautan mati
 * seperti itu lebih buruk daripada tidak ada sama sekali, jadi dihapus.
 * Poster resmi kelurahan menyebut Facebook "Kelurahan Landasanulintengah";
 * tambahkan kembali di sini bila URL persisnya sudah dipastikan.
 */
export const SOSMED = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/kelurahan_landasanulintengah/',
    icon: 'instagram',
  },
  {
    label: 'Situs resmi kelurahan',
    href: 'https://kel-landasanulintengah.banjarbarukota.go.id/',
    icon: 'external',
  },
  { label: 'WhatsApp', href: SITE.whatsappLink, icon: 'whatsapp' },
] as const

/** Statistik utama yang tampil di beranda */
export const STAT_UTAMA = [
  { value: '1.818', label: 'Hektare Luas Wilayah' },
  { value: '9.063', label: 'Jiwa Penduduk' },
  { value: '2.843', label: 'Kepala Keluarga' },
  { value: '16 / 3', label: 'Rukun Tetangga / RW' },
]

/**
 * Status kelurahan sebagai lokus Kampung Keluarga Berkualitas.
 * CATATAN: portal Kampung KB memuat dua tanggal berbeda — tabel profilnya
 * menulis 21 November 2022, sedangkan kepala halamannya 17 Juni 2026 (besar
 * kemungkinan tanggal pendataan ulang, bukan pencanangan). Yang dipakai di
 * sini tanggal dari tabel; mohon dipastikan ke kelurahan.
 */
export const KAMPUNG_KB = {
  pencanangan: '21 November 2022',
  klasifikasi: 'Berkembang',
  pendamping: 'Nurul Hasanah, S.Pd.',
  puskesmas: 'Puskesmas Landasan Ulin',
}

export const SUMBER_DATA =
  'Profil Kampung Keluarga Berkualitas — portal Kemendukbangga/BKKBN'

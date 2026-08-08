/**
 * Data kependudukan & kelembagaan Kelurahan Landasan Ulin Tengah.
 *
 * SUMBER: Profil Kampung Keluarga Berkualitas Kelurahan Landasan Ulin Tengah
 * pada portal Kemendukbangga/BKKBN.
 *
 * CATATAN PENTING — angka pada sumbernya sendiri belum sepenuhnya konsisten:
 *   • Jumlah baris per RT: 2.946 KK / 9.296 jiwa, sedangkan total yang
 *     dipublikasikan 2.843 KK / 9.063 jiwa.
 *   • Blok "Statistik Kampung" memakai potret data berbeda (8.475 jiwa,
 *     1.749 PUS) dibanding tabel Gambaran Umum (9.063 jiwa, 1.929 PUS).
 * Selisih ini ditampilkan apa adanya di halaman Data, bukan dirapikan
 * diam-diam. Mohon dikonfirmasi ke kelurahan saat pemutakhiran berikutnya.
 *
 * Data keluarga miskin (desil 1–2) sengaja TIDAK ditampilkan di situs ini.
 */

/** Tabel Gambaran Umum pada profil Kampung KB. */
export const GAMBARAN_UMUM = {
  penduduk: 9063,
  kk: 2843,
  pus: 1929,
  ibuHamil: 22,
  balitaStunting: 129,
  remaja: 2025,
  lansia: 403,
}

/** Sebaran per rukun tetangga, apa adanya dari sumber. */
export const PENDUDUK_RT = [
  { rt: 'RT 01', rw: 'RW 01', kk: 97, jiwa: 734 },
  { rt: 'RT 02', rw: 'RW 01', kk: 172, jiwa: 406 },
  { rt: 'RT 13', rw: 'RW 01', kk: 168, jiwa: 488 },
  { rt: 'RT 16', rw: 'RW 01', kk: 181, jiwa: 598 },
  { rt: 'RT 03', rw: 'RW 02', kk: 172, jiwa: 435 },
  { rt: 'RT 04', rw: 'RW 02', kk: 286, jiwa: 924 },
  { rt: 'RT 05', rw: 'RW 02', kk: 172, jiwa: 626 },
  { rt: 'RT 06', rw: 'RW 02', kk: 180, jiwa: 539 },
  { rt: 'RT 07', rw: 'RW 03', kk: 192, jiwa: 775 },
  { rt: 'RT 08', rw: 'RW 03', kk: 55, jiwa: 137 },
  { rt: 'RT 09', rw: 'RW 03', kk: 58, jiwa: 202 },
  { rt: 'RT 10', rw: 'RW 03', kk: 48, jiwa: 144 },
  { rt: 'RT 11', rw: 'RW 03', kk: 590, jiwa: 1270 },
  { rt: 'RT 12', rw: 'RW 03', kk: 187, jiwa: 575 },
  { rt: 'RT 14', rw: 'RW 03', kk: 168, jiwa: 488 },
  { rt: 'RT 15', rw: 'RW 03', kk: 220, jiwa: 955 },
]

/** Total resmi yang tercantum di sumber (berbeda dari jumlah baris di atas). */
export const TOTAL_RESMI = { kk: 2843, jiwa: 9063 }

/** Pendidikan terakhir penduduk — tabel ini konsisten secara internal. */
export const PENDIDIKAN = [
  { name: 'Tidak / belum sekolah', l: 1169, p: 1100 },
  { name: 'Belum tamat SD', l: 609, p: 580 },
  { name: 'Tamat SD sederajat', l: 642, p: 787 },
  { name: 'SLTP sederajat', l: 640, p: 676 },
  { name: 'SLTA sederajat', l: 1258, p: 1007 },
  { name: 'Diploma I / II', l: 16, p: 28 },
  { name: 'Diploma III / S. Muda', l: 53, p: 88 },
  { name: 'Diploma IV / Strata I', l: 292, p: 332 },
  { name: 'Strata II', l: 31, p: 21 },
  { name: 'Strata III', l: 0, p: 0 },
]

/**
 * Blok "Statistik Kampung" pada portal — potret data yang berbeda dari
 * tabel Gambaran Umum, karena itu disajikan sebagai kelompok tersendiri.
 */
export const STATISTIK_KAMPUNG = {
  jiwa: 8475,
  kk: 2843,
  pus: 1749,
  keluargaBalita: 528,
  keluargaRemaja: 768,
  keluargaLansia: 208,
  remaja: 1536,
}

/** Kepesertaan KB pasangan usia subur (1.329 + 420 = 1.749 PUS). */
export const KEPESERTAAN_KB = [
  { name: 'PUS peserta KB aktif', jml: 1329, color: 'var(--leaf-600)' },
  { name: 'PUS belum ber-KB', jml: 420, color: 'var(--clay-500)' },
]

/** Kelompok kegiatan (Poktan) dan sarana Kampung KB. */
export const SARANA = [
  {
    grup: 'Kelompok kegiatan',
    icon: 'users',
    items: [
      { name: 'Bina Keluarga Balita (BKB)', ket: 'Ada' },
      { name: 'Bina Keluarga Remaja (BKR)', ket: 'Ada — BKR Akasia, RT 05 RW 02' },
      { name: 'Bina Keluarga Lansia (BKL)', ket: 'Ada — BKL Ramania, Komp. Borneo Indah' },
      { name: 'PIK Remaja', ket: 'Ada' },
    ],
  },
  {
    grup: 'Sarana Kampung KB',
    icon: 'building',
    items: [
      { name: 'Rumah Data Kependudukan', ket: 'Ada — pemutakhiran berkala' },
      { name: 'DASHAT', ket: 'Ada — gizi balita berisiko stunting' },
      { name: 'UPPKA', ket: 'Ada' },
      { name: 'Sekretariat Kampung KB', ket: 'Menumpang di kantor kelurahan' },
    ],
  },
  {
    grup: 'Kesehatan',
    icon: 'heart',
    items: [
      { name: 'Posyandu aktif', ket: '8 posyandu' },
      { name: 'Puskesmas pembina', ket: 'Puskesmas Landasan Ulin' },
      { name: 'Ibu hamil terdata', ket: '22 orang' },
      { name: 'Balita gizi kurang / stunting', ket: '129 balita' },
    ],
  },
  {
    grup: 'Kelembagaan',
    icon: 'shield',
    items: [
      { name: 'SK Lurah tentang Kampung KB', ket: 'Ada' },
      { name: 'Kepengurusan Pokja', ket: 'Ada — 13 orang, seluruhnya terlatih' },
      { name: 'Pendamping PLKB / PKB', ket: 'Nurul Hasanah, S.Pd.' },
      { name: 'Rencana Kegiatan Masyarakat', ket: 'Ada' },
    ],
  },
]

/** Delapan posyandu beserta wilayah layanannya. */
export const POSYANDU = [
  {
    nama: 'Amanah Borneo',
    alamat: 'Komp. Borneo Indah, RW 01',
    layanan: 'RT 01 dan RT 13',
  },
  {
    nama: 'Al-Barokah',
    alamat: 'Komp. Putra Tunggal Mandiri, RW 01',
    layanan: 'RT 16',
  },
  {
    nama: 'Kaca Piring',
    alamat: 'Jl. A. Yani Km. 22,300, RW 01',
    layanan: 'RT 02',
  },
  {
    nama: 'Mayang Maurai',
    alamat: 'Jl. Pembangunan, RW 02',
    layanan: 'RT 03 dan RT 04',
  },
  { nama: 'Akasia', alamat: 'Jl. Akasia, RW 02', layanan: 'RT 05' },
  {
    nama: 'Al-Hidayah 1',
    alamat: 'Gg. Hidayah, RW 02',
    layanan: 'RT 06 dan RT 07',
  },
  {
    nama: 'Al-Hidayah 2',
    alamat: 'Komp. Putri Sulung, RW 03',
    layanan: 'RT 11',
  },
  {
    nama: 'Nusa Indah',
    alamat: 'Komp. Citra Bangun Persada, RW 03',
    layanan: 'RT 08, 09, 10, 11, 12, 14, dan 15',
  },
]

export const LEMBAGA = [
  { name: 'Rukun Tetangga (RT)', jml: 16 },
  { name: 'Rukun Warga (RW)', jml: 3 },
  { name: 'Posyandu aktif', jml: 8 },
  { name: 'Pengurus Pokja Kampung KB', jml: 13 },
]

/** Sumber dana operasional Kampung KB. */
export const SUMBER_DANA = [
  'APBN',
  'APBD',
  'Donasi / hibah masyarakat',
  'Perusahaan (CSR)',
  'Swadaya masyarakat',
]

/** Mekanisme operasional Pokja — seluruhnya berfrekuensi bulanan. */
export const MEKANISME = [
  'Rapat perencanaan kegiatan',
  'Rapat koordinasi dengan dinas/instansi pendukung',
  'Sosialisasi kegiatan',
  'Monitoring dan evaluasi kegiatan',
  'Penyusunan laporan',
]

export const jumlah = <T,>(rows: T[], ambil: (r: T) => number) =>
  rows.reduce((s, r) => s + ambil(r), 0)

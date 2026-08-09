/**
 * Profil Kelurahan Landasan Ulin Tengah.
 * SUMBER: Profil Kampung Keluarga Berkualitas Kelurahan Landasan Ulin Tengah,
 * portal Kemendukbangga/BKKBN.
 */

export const SEJARAH = [
  {
    tahun: '2004',
    judul: 'Dasar hukum pembentukan',
    teks: 'Kelurahan Landasan Ulin Tengah dibentuk berdasarkan Peraturan Daerah Kota Banjarbaru Nomor 2 Tahun 2004 tentang Pembentukan dan Pemecahan Kelurahan Dalam Wilayah Kota Banjarbaru, dan berkedudukan sebagai salah satu kelurahan induk.',
  },
  {
    tahun: '2007',
    judul: 'Pembentukan Kecamatan Liang Anggang',
    teks: 'Melalui Peraturan Daerah Kota Banjarbaru Nomor 4 Tahun 2007, Kecamatan Landasan Ulin dimekarkan menjadi Kecamatan Landasan Ulin dan Kecamatan Liang Anggang. Kelurahan Landasan Ulin Tengah masuk ke dalam kecamatan yang baru dibentuk tersebut.',
  },
  {
    tahun: '2008',
    judul: 'Pemekaran kelurahan',
    teks: 'Wilayah kelurahan dimekarkan menjadi dua, yaitu Kelurahan Landasan Ulin Tengah dan Kelurahan Landasan Ulin Utara. Letaknya sekitar ± 9 km dari pusat pemerintahan Kota Banjarbaru.',
  },
  {
    tahun: '2022',
    judul: 'Pencanangan Kampung Keluarga Berkualitas',
    teks: 'Pada 21 November 2022 kelurahan dicanangkan sebagai lokus Kampung Keluarga Berkualitas dengan klasifikasi Berkembang, sebagai wadah integrasi program lintas sektor untuk penguatan institusi keluarga.',
  },
]

/** Arahan tata ruang wilayah menurut konsep tata ruang Kota Banjarbaru. */
export const TATA_RUANG = [
  {
    icon: 'home',
    nama: 'Perumahan & permukiman',
    teks: 'Kawasan hunian warga yang tersebar di 16 RT dan menjadi peruntukan utama wilayah kelurahan.',
  },
  {
    icon: 'building',
    nama: 'Pergudangan & industri',
    teks: 'Kawasan pergudangan dan industri yang ditopang jalur lintas menuju pusat Kota Banjarbaru.',
  },
]

export const VISI =
  'Terwujudnya keluarga berkualitas, sejahtera, sehat, dan unggul di wilayah Kelurahan Landasan Ulin Tengah melalui sinergitas program Bangga Kencana dan pembangunan sektor terintegrasi.'

export const MISI = [
  'Meningkatkan komitmen kepedulian masyarakat dan lintas sektor dalam program pembangunan keluarga, kependudukan, dan keluarga berencana (Bangga Kencana).',
  'Mengoptimalkan kualitas pelayanan kesehatan, pembinaan kelompok kegiatan (Poktan), serta pemenuhan sarana penunjang bagi balita, remaja, dan lansia.',
  'Mempercepat penurunan angka stunting di tingkat kelurahan melalui optimalisasi program DASHAT dan keterpaduan posyandu.',
  'Mendorong pemberdayaan ekonomi keluarga melalui pengembangan potensi lokal, UMKM makanan, dan peningkatan kapasitas wirausaha.',
]

/**
 * Susunan perangkat mengikuti struktur yang tercantum di situs resmi
 * kelurahan: Sekretariat dan tiga seksi (Pemerintahan, Kessos, Ekobang).
 *
 * Nama Lurah bersumber dari Media Center Banjarbaru. Ejaannya berbeda-beda
 * antar pemberitaan — "H. Faisal Rizal", "H. M. Faisal Rizal", dan
 * "H. M. Faisal Riza" — mohon dipastikan ejaan resminya ke kelurahan.
 * Jabatan lain belum diketahui nama pemangkunya.
 */
/**
 * Struktur organisasi RT/RW kelurahan.
 *
 * SUMBER: papan "Struktur Organisasi RT/RW Kelurahan Landasan Ulin Tengah"
 * di kantor kelurahan.
 *
 * Yang dicantumkan hanya jabatannya, tanpa nama pengurus: nama berganti
 * mengikuti surat keputusan yang berlaku, dan situs ini tidak perlu ikut
 * menayangkan data pribadi pengurus RT/RW.
 *
 * Pembagian RT ke tiap RW di bawah ini cocok persis dengan tabel sebaran
 * penduduk per RT pada halaman Data — keduanya dari sumber yang berbeda, jadi
 * kecocokan itu sekaligus menjadi pemeriksaan silang.
 */
export const STRUKTUR = {
  lurah: { role: 'Lurah' },

  /** Pendamping dari Polri dan TNI, sejajar dengan Lurah pada papan. */
  pendamping: [
    {
      role: 'Babinkamtibmas',
      note: 'Pembina keamanan dan ketertiban masyarakat — Polri',
    },
    {
      role: 'Babinsa',
      note: 'Bintara pembina desa — TNI AD',
    },
  ],

  forum: {
    role: 'Ketua Forum RT/RW',
    note: 'Penghubung antara pengurus RW dan kelurahan',
  },

  rw: [
    { nama: 'RW 001', rt: ['RT 001', 'RT 002', 'RT 013', 'RT 016'] },
    { nama: 'RW 002', rt: ['RT 003', 'RT 004', 'RT 005', 'RT 006'] },
    {
      nama: 'RW 003',
      rt: [
        'RT 007',
        'RT 008',
        'RT 009',
        'RT 010',
        'RT 011',
        'RT 012',
        'RT 014',
        'RT 015',
      ],
    },
  ],
}

/**
 * Inovasi kelurahan yang dipaparkan pada Lomba Kelurahan Tingkat Kota
 * Banjarbaru, 19 Maret 2024. Sumber: Media Center Banjarbaru.
 */
export const INOVASI = [
  {
    akronim: 'BAIMAN',
    kepanjangan: 'Barcode Informasi Hasan Pian',
    teks: 'Layanan informasi kelurahan berbasis barcode, sebagai indikator pelayanan digital.',
  },
  {
    akronim: 'KASIH KAKA',
    kepanjangan: 'Komunitas Aksi Kebersihan untuk Kenyamanan dan Keindahan',
    teks: 'Gerakan kebersihan lingkungan yang digerakkan bersama warga antar-RT.',
  },
  {
    akronim: 'JUMBA',
    kepanjangan: 'Jumat Berbagi',
    teks: 'Kegiatan berbagi rutin setiap Jumat bersama Tim Penggerak PKK dan Karang Taruna.',
  },
  {
    akronim: 'GEMAS',
    kepanjangan: 'Gerakan Membantu Anak Yatim dan Lansia',
    teks: 'Pendampingan dan bantuan bagi anak yatim serta warga lanjut usia.',
  },
  {
    akronim: 'GENCAR',
    kepanjangan: 'Gerakan Lancar Membaca',
    teks: 'Program keaksaraan untuk menghapus buta huruf di lingkungan kelurahan.',
  },
]

export const BATAS = [
  {
    arah: 'U',
    label: 'Sebelah Utara',
    value: 'Kelurahan Landasan Ulin Utara',
  },
  {
    arah: 'T',
    label: 'Sebelah Timur',
    value: 'Kelurahan Landasan Ulin Timur, Kecamatan Landasan Ulin',
  },
  {
    arah: 'S',
    label: 'Sebelah Selatan',
    value:
      'Kelurahan Landasan Ulin Selatan dan Desa Pandahan, Kecamatan Bati-Bati',
  },
  {
    arah: 'B',
    label: 'Sebelah Barat',
    value: 'Kelurahan Landasan Ulin Barat',
  },
]

export const DATA_POKOK = [
  { key: 'Luas wilayah', val: '1.818,00 ha' },
  { key: 'Jumlah penduduk', val: '9.063 jiwa' },
  { key: 'Kepala keluarga', val: '2.843 KK' },
  { key: 'Jumlah RT / RW', val: '16 / 3' },
  { key: 'Pasangan usia subur', val: '1.929 PUS' },
  { key: 'Jarak ke pusat kota', val: '± 9 km' },
  { key: 'Klasifikasi Kampung KB', val: 'Berkembang' },
]

/** Program unggulan Kampung KB — tampil di beranda. */
export const PROGRAM = [
  {
    icon: 'heart',
    title: 'DASHAT — Dapur Sehat Atasi Stunting',
    text: 'Intervensi gizi bersama 8 posyandu untuk 129 balita berstatus gizi kurang, lewat pemberian makanan tambahan berbahan pangan lokal.',
    to: '/berita',
  },
  {
    icon: 'file-text',
    title: 'Rumah Dataku',
    text: 'Pemutakhiran berkala data kependudukan per RT — KK, PUS, ibu hamil, lansia, hingga tingkat kesejahteraan keluarga.',
    to: '/data',
  },
  {
    icon: 'store',
    title: 'UPPKA & UMKM Kuliner',
    text: 'Pelatihan wirausaha dan sanitasi produk bagi klaster UMKM makanan olahan rumah tangga, penopang ekonomi keluarga.',
    to: '/berita',
  },
]

/** Potensi lokal kelurahan. */
export const POTENSI = [
  {
    judul: 'Mata pencaharian utama',
    teks: 'Sebagian besar penduduk produktif bergerak di sektor swasta dan wiraswasta, dengan 2.846 pelaku usaha di seluruh kelurahan. Disusul sektor aparatur negara, tenaga pengajar, serta pertanian dan peternakan lokal.',
  },
  {
    judul: 'Produk unggulan',
    teks: 'Industri makanan olahan rumah tangga — katering, camilan lokal, serta kue basah dan kering — yang menjadi penopang ekonomi keluarga.',
  },
  {
    judul: 'Arah pengembangan',
    teks: 'Kemitraan UMKM kuliner dengan platform digital, pelatihan manajemen kemasan produk, pemasaran melalui kegiatan Kampung KB, serta pengembangan klaster usaha mikro berbasis rukun tetangga.',
  },
  {
    judul: 'Pemberdayaan masyarakat',
    teks: 'Pembinaan rutin kelompok kerja Kampung KB, pelatihan kader mengolah menu sehat bergizi seimbang, serta keterlibatan aktif kader PKK dan dasawisma dalam pembinaan ekonomi keluarga.',
  },
]

/** Rencana kerja prioritas Kampung KB. */
export const RENCANA_KERJA = [
  {
    judul: 'Penurunan gizi kurang & stunting terintegrasi',
    teks: 'Mengoptimalkan fungsi DASHAT bersama 8 posyandu untuk mengintervensi 129 balita berstatus gizi kurang atau stunting melalui pemberian makanan tambahan berbahan pangan lokal.',
  },
  {
    judul: 'Penguatan akurasi data lewat Rumah Dataku',
    teks: 'Pembaruan berkala data kependudukan per RT — pencatatan KK, PUS, ibu hamil, lansia, dan tingkat kesejahteraan — guna memastikan validitas data sebelum dilaporkan.',
  },
  {
    judul: 'Peningkatan kepesertaan KB aktif',
    teks: 'Menggerakkan kader BKB, BKR, dan BKL bersama Penyuluh KB untuk meningkatkan kesadaran pasangan usia subur dalam ber-KB serta mengendalikan jarak kelahiran.',
  },
  {
    judul: 'Pemberdayaan ekonomi keluarga (UPPKA)',
    teks: 'Pelatihan manajemen wirausaha dan sanitasi produk bagi klaster UMKM kuliner lokal, serta penguatan akses permodalan terpadu untuk meningkatkan kesejahteraan keluarga.',
  },
]

/** Sorotan fitur di bagian "Menghadirkan layanan publik…" */
export const KEUNGGULAN = [
  'Profil wilayah dan struktur organisasi yang bisa ditelusuri kapan saja.',
  'Publikasi kegiatan dan program Kampung Keluarga Berkualitas secara berkala.',
  'Data kependudukan per RT yang terbuka untuk warga.',
]

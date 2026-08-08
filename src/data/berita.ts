/**
 * Berita & kegiatan kelurahan.
 *
 * SUMBER: situs resmi Kelurahan Landasan Ulin Tengah,
 * https://kel-landasanulintengah.banjarbarukota.go.id/
 *
 * Isi artikel dan fotonya diambil dari publikasi kelurahan sendiri. Tiap
 * entri menyimpan `sumber` berisi tautan aslinya agar mudah ditelusuri.
 * Foto tersimpan lokal di `public/berita/`.
 */

export type Kategori = 'Kesehatan' | 'Pemerintahan' | 'Pembangunan'

export type Blok =
  | { t: 'p'; v: string }
  | { t: 'h2'; v: string }
  | { t: 'ul'; v: string[] }
  | { t: 'quote'; v: string; by?: string }

export type Berita = {
  slug: string
  judul: string
  kategori: Kategori
  tanggal: string // ISO
  lokasi: string
  penulis: string
  ringkas: string
  /** Foto utama di `public/berita/`. Kosong = pakai gambar bangkitan. */
  foto?: string
  /** Tautan publikasi asli di situs resmi kelurahan. */
  sumber?: string
  isi: Blok[]
}

export const KATEGORI: Kategori[] = ['Pemerintahan', 'Kesehatan', 'Pembangunan']

export const BERITA: Berita[] = [
  {
    slug: 'penilaian-eco-office-2025',
    judul: 'Penilaian Program Eco Office di Kelurahan Landasan Ulin Tengah Tahun 2025',
    kategori: 'Pembangunan',
    tanggal: '2025-10-15',
    lokasi: 'Kantor Kelurahan Landasan Ulin Tengah',
    penulis: 'Admin Kelurahan',
    foto: '/berita/eco-office-1.jpg',
    sumber:
      'https://kel-landasanulintengah.banjarbarukota.go.id/penilaian-program-eco-office-di-kelurahan-landasan-ulin-tengah-tahun-2025/',
    ringkas:
      'Tim penilai meninjau langsung kebersihan lingkungan, pengelolaan sampah, penggunaan energi, serta penataan ruang kerja di kantor kelurahan.',
    isi: [
      {
        t: 'p',
        v: 'Rabu, 15 Oktober 2025 — Kelurahan Landasan Ulin Tengah menjadi salah satu lokasi pelaksanaan Penilaian Eco Office. Kegiatan ini bertujuan menilai penerapan prinsip ramah lingkungan di lingkungan perkantoran pemerintah.',
      },
      {
        t: 'p',
        v: 'Tim penilai melakukan peninjauan langsung terhadap kebersihan lingkungan, pengelolaan sampah, penggunaan energi, serta penataan ruang kerja agar menjaga kebersihan dan menerapkan perilaku hemat energi di lingkungan kerja.',
      },
      {
        t: 'p',
        v: 'Kegiatan ini diharapkan dapat mendorong aparatur kelurahan untuk terus meningkatkan kesadaran terhadap pentingnya menjaga lingkungan dan mewujudkan kantor yang bersih, hijau, serta nyaman bagi masyarakat.',
      },
    ],
  },
  {
    slug: 'apel-pagi-13-oktober-2025',
    judul: 'Apel Pagi: Kasi Ekobang Tekankan Pentingnya Pelayanan Prima',
    kategori: 'Pemerintahan',
    tanggal: '2025-10-13',
    lokasi: 'Halaman Kantor Kelurahan Landasan Ulin Tengah',
    penulis: 'Admin Kelurahan',
    foto: '/berita/apel-13-okt.jpg',
    sumber:
      'https://kel-landasanulintengah.banjarbarukota.go.id/apel-pagi-para-pejabat-struktural-asn-pppk-dan-non-asn-kel-landasan-ulin-tengah-13-10-2025/',
    ringkas:
      'Apel pagi Senin, 13 Oktober 2025, dipimpin Kasi Ekobang dengan arahan mengenai pelayanan prima dalam tugas pemerintahan dan pelayanan kepada warga.',
    isi: [
      {
        t: 'p',
        v: 'Apel pagi Kelurahan Landasan Ulin Tengah pada Senin, 13 Oktober 2025 dipimpin oleh Kasi Ekonomi dan Pembangunan (Ekobang).',
      },
      {
        t: 'p',
        v: 'Arahan yang disampaikan menekankan pentingnya pelayanan prima dalam menjalankan tugas pemerintahan serta pelayanan kepada warga.',
      },
      {
        t: 'p',
        v: 'Apel pagi diikuti pejabat struktural, ASN, PPPK, dan tenaga non-ASN di lingkungan Kelurahan Landasan Ulin Tengah, dan dilaksanakan secara rutin sebagai sarana penyampaian arahan pimpinan.',
      },
    ],
  },
  {
    slug: 'lokakarya-mini-lintas-sektor-2025',
    judul:
      'Lokakarya Mini Lintas Sektor: Puskesmas Landasan Ulin Tingkatkan Sinergi untuk Pelayanan Kesehatan Masyarakat',
    kategori: 'Kesehatan',
    tanggal: '2025-09-24',
    lokasi: 'Aula Kelurahan Landasan Ulin Tengah',
    penulis: 'Admin Kelurahan',
    foto: '/berita/lokakarya-1.jpg',
    sumber:
      'https://kel-landasanulintengah.banjarbarukota.go.id/lokakarya-mini-lintas-sektor-puskesmas-landasan-ulin-tingkatkan-sinergi-untuk-pelayanan-kesehatan-masyarakat/',
    ringkas:
      'Lokakarya dipimpin langsung Kepala Puskesmas Landasan Ulin untuk memperkuat koordinasi lintas sektor dalam meningkatkan kualitas pelayanan kesehatan masyarakat.',
    isi: [
      {
        t: 'p',
        v: 'Landasan Ulin Tengah, 24 September 2025 — Bertempat di Aula Kelurahan Landasan Ulin Tengah, telah dilaksanakan Lokakarya Mini Lintas Sektor yang dipimpin langsung oleh Kepala Puskesmas Landasan Ulin, Imam Muftadi, S.Far., Apt.',
      },
      {
        t: 'p',
        v: 'Kegiatan ini bertujuan memperkuat koordinasi lintas sektor dalam rangka meningkatkan kualitas pelayanan kesehatan masyarakat.',
      },
      { t: 'h2', v: 'Agenda utama' },
      {
        t: 'ul',
        v: [
          'Penyampaian hasil kegiatan imunisasi anak — evaluasi capaian imunisasi di wilayah kerja Puskesmas Landasan Ulin.',
          'Penyampaian hasil PHBS (Perilaku Hidup Bersih dan Sehat) — laporan perkembangan perilaku hidup sehat masyarakat.',
          'Penyampaian usul dan saran terkait pelayanan kesehatan — forum diskusi terbuka sebagai bahan evaluasi untuk peningkatan layanan.',
        ],
      },
      {
        t: 'p',
        v: 'Melalui lokakarya ini diharapkan terjalin sinergi yang lebih kuat sehingga pelayanan kesehatan semakin mudah diakses, berkualitas, dan tepat sasaran bagi masyarakat Landasan Ulin.',
      },
    ],
  },
  {
    slug: 'informasi-pengaduan-tindak-pidana-korupsi',
    judul: 'Kelurahan Membuka Pengaduan Pencegahan Tindak Pidana Korupsi',
    kategori: 'Pemerintahan',
    tanggal: '2025-09-20',
    lokasi: 'Kelurahan Landasan Ulin Tengah',
    penulis: 'Admin Kelurahan',
    foto: '/berita/informasi-1.jpg',
    sumber:
      'https://kel-landasanulintengah.banjarbarukota.go.id/informasi-kelurahan-landasan-ulin-tengah/',
    ringkas:
      'Warga yang menemukan indikasi tindak pidana korupsi dalam tata pemerintahan dapat menyampaikan laporannya melalui situs resmi kelurahan.',
    isi: [
      {
        t: 'p',
        v: 'Dalam rangka pencegahan dan pemberantasan korupsi tata pemerintahan, Kelurahan Landasan Ulin Tengah menerima pengaduan pelaporan tindak pidana tersebut melalui situs resmi kelurahan.',
      },
      {
        t: 'p',
        v: 'Warga yang menemukan atau melihat indikasi pelanggaran dapat memberikan informasinya melalui kanal pengaduan tersebut.',
      },
    ],
  },
]

/** Terbaru lebih dulu. */
export const BERITA_TERBARU = [...BERITA].sort(
  (a, b) => +new Date(b.tanggal) - +new Date(a.tanggal),
)

export function cariBerita(slug: string) {
  return BERITA.find((b) => b.slug === slug)
}

export function beritaTerkait(slug: string, kategori: Kategori, limit = 4) {
  const sama = BERITA_TERBARU.filter(
    (b) => b.slug !== slug && b.kategori === kategori,
  )
  const lain = BERITA_TERBARU.filter(
    (b) => b.slug !== slug && b.kategori !== kategori,
  )
  return [...sama, ...lain].slice(0, limit)
}

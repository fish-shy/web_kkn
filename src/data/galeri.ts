/**
 * Galeri kegiatan kelurahan.
 *
 * SUMBER: publikasi resmi Kelurahan Landasan Ulin Tengah,
 * https://kel-landasanulintengah.banjarbarukota.go.id/
 * Berkas gambar tersimpan lokal di `public/berita/`.
 *
 * Keterangan tiap gambar ditulis berdasarkan acara dan tanggal publikasi
 * aslinya — bukan tafsiran atas isi frame.
 */

export type AlbumNama =
  | 'Apel Pagi'
  | 'Penilaian Eco Office'
  | 'Kesehatan'
  | 'Pengumuman'

export type Foto = {
  id: string
  judul: string
  /** Label pendek untuk kartu di beranda (maks. ±2 kata). */
  ringkas: string
  album: AlbumNama
  tanggal: string
  /** Berkas di `public/berita/`. */
  foto: string
  /** Tautan publikasi asli di situs kelurahan. */
  sumber: string
}

export const ALBUM: AlbumNama[] = [
  'Apel Pagi',
  'Penilaian Eco Office',
  'Kesehatan',
  'Pengumuman',
]

const SRC = {
  eco: 'https://kel-landasanulintengah.banjarbarukota.go.id/penilaian-program-eco-office-di-kelurahan-landasan-ulin-tengah-tahun-2025/',
  loka: 'https://kel-landasanulintengah.banjarbarukota.go.id/lokakarya-mini-lintas-sektor-puskesmas-landasan-ulin-tingkatkan-sinergi-untuk-pelayanan-kesehatan-masyarakat/',
  info: 'https://kel-landasanulintengah.banjarbarukota.go.id/informasi-kelurahan-landasan-ulin-tengah/',
  apel15okt:
    'https://kel-landasanulintengah.banjarbarukota.go.id/apel-pagi-para-pejabat-struktural-asn-pppk-dan-non-asn-kel-landasan-ulin-tengah-24-09-2025-2/',
  apel13okt:
    'https://kel-landasanulintengah.banjarbarukota.go.id/apel-pagi-para-pejabat-struktural-asn-pppk-dan-non-asn-kel-landasan-ulin-tengah-13-10-2025/',
  apel24sep:
    'https://kel-landasanulintengah.banjarbarukota.go.id/apel-pagi-para-pejabat-struktural-asn-pppk-dan-non-asn-kel-landasan-ulin-tengah-24-09-2025/',
  apel22sep:
    'https://kel-landasanulintengah.banjarbarukota.go.id/apel-pagi-para-pejabat-struktural-asn-pppk-dan-non-asn-kel-landasan-ulin-tengah-22-09-2025/',
  apel17sep:
    'https://kel-landasanulintengah.banjarbarukota.go.id/apel-pagi-para-pejabat-struktural-asn-pppk-dan-non-asn-kel-landasan-ulin-tengah-17-09-2025/',
  apel15sep:
    'https://kel-landasanulintengah.banjarbarukota.go.id/apel-pagi-para-pejabat-struktural-asn-pppk-dan-non-asn-kel-landasan-ulin-tengah-15-09-2025/',
  apel03sep:
    'https://kel-landasanulintengah.banjarbarukota.go.id/apel-pagi-para-pejabat-struktural-asn-pppk-dan-non-asn-kel-landasan-ulin-tengah-03-09-2025/',
}

export const GALERI: Foto[] = [
  {
    id: 'eco-1',
    judul: 'Tim penilai Eco Office berdiskusi bersama aparatur kelurahan',
    ringkas: 'Eco Office',
    album: 'Penilaian Eco Office',
    tanggal: '2025-10-15',
    foto: '/berita/eco-office-1.jpg',
    sumber: SRC.eco,
  },
  {
    id: 'eco-2',
    judul: 'Peninjauan penataan ruang kerja pada Penilaian Eco Office',
    ringkas: 'Penataan Ruang',
    album: 'Penilaian Eco Office',
    tanggal: '2025-10-15',
    foto: '/berita/eco-office-2.jpg',
    sumber: SRC.eco,
  },
  {
    id: 'eco-3',
    judul: 'Aparatur kelurahan di depan ruang pelayanan',
    ringkas: 'Ruang Pelayanan',
    album: 'Penilaian Eco Office',
    tanggal: '2025-10-15',
    foto: '/berita/eco-office-3.jpg',
    sumber: SRC.eco,
  },
  {
    id: 'apel-15-okt',
    judul: 'Apel pagi aparatur kelurahan, Rabu 15 Oktober 2025',
    ringkas: 'Apel Pagi',
    album: 'Apel Pagi',
    tanggal: '2025-10-15',
    foto: '/berita/apel-15-okt.jpg',
    sumber: SRC.apel15okt,
  },
  {
    id: 'apel-13-okt',
    judul: 'Apel pagi aparatur kelurahan, Senin 13 Oktober 2025',
    ringkas: 'Apel Pagi',
    album: 'Apel Pagi',
    tanggal: '2025-10-13',
    foto: '/berita/apel-13-okt.jpg',
    sumber: SRC.apel13okt,
  },
  {
    id: 'loka-1',
    judul: 'Lokakarya Mini Lintas Sektor di aula kelurahan',
    ringkas: 'Lokakarya Mini',
    album: 'Kesehatan',
    tanggal: '2025-09-24',
    foto: '/berita/lokakarya-1.jpg',
    sumber: SRC.loka,
  },
  {
    id: 'loka-2',
    judul: 'Peserta Lokakarya Mini Lintas Sektor Puskesmas Landasan Ulin',
    ringkas: 'Lintas Sektor',
    album: 'Kesehatan',
    tanggal: '2025-09-24',
    foto: '/berita/lokakarya-2.jpg',
    sumber: SRC.loka,
  },
  {
    id: 'apel-24-sep',
    judul: 'Apel pagi aparatur kelurahan, 24 September 2025',
    ringkas: 'Apel Pagi',
    album: 'Apel Pagi',
    tanggal: '2025-09-24',
    foto: '/berita/apel-24-sep.jpg',
    sumber: SRC.apel24sep,
  },
  {
    id: 'apel-22-sep',
    judul: 'Apel pagi aparatur kelurahan, 22 September 2025',
    ringkas: 'Apel Pagi',
    album: 'Apel Pagi',
    tanggal: '2025-09-22',
    foto: '/berita/apel-22-sep.jpg',
    sumber: SRC.apel22sep,
  },
  {
    id: 'info-1',
    judul:
      'Poster: seluruh jenis pelayanan di kelurahan tidak dipungut biaya apa pun',
    ringkas: 'Layanan Gratis',
    album: 'Pengumuman',
    tanggal: '2025-09-20',
    foto: '/berita/informasi-1.jpg',
    sumber: SRC.info,
  },
  {
    id: 'info-2',
    judul: 'Poster: Tolak Korupsi & Gratifikasi',
    ringkas: 'Tolak Korupsi',
    album: 'Pengumuman',
    tanggal: '2025-09-20',
    foto: '/berita/informasi-2.jpg',
    sumber: SRC.info,
  },
  {
    id: 'apel-17-sep',
    judul: 'Apel pagi aparatur kelurahan, 17 September 2025',
    ringkas: 'Apel Pagi',
    album: 'Apel Pagi',
    tanggal: '2025-09-17',
    foto: '/berita/apel-17-sep.jpg',
    sumber: SRC.apel17sep,
  },
  {
    id: 'apel-15-sep',
    judul: 'Apel pagi aparatur kelurahan, 15 September 2025',
    ringkas: 'Apel Pagi',
    album: 'Apel Pagi',
    tanggal: '2025-09-15',
    foto: '/berita/apel-15-sep.jpg',
    sumber: SRC.apel15sep,
  },
  {
    id: 'apel-03-sep-1',
    judul: 'Apel pagi aparatur kelurahan, 3 September 2025',
    ringkas: 'Apel Pagi',
    album: 'Apel Pagi',
    tanggal: '2025-09-03',
    foto: '/berita/apel-03-sep-1.jpg',
    sumber: SRC.apel03sep,
  },
  {
    id: 'apel-03-sep-2',
    judul: 'Arahan pimpinan pada apel pagi 3 September 2025',
    ringkas: 'Arahan Pimpinan',
    album: 'Apel Pagi',
    tanggal: '2025-09-03',
    foto: '/berita/apel-03-sep-2.jpg',
    sumber: SRC.apel03sep,
  },
]

/** Delapan kartu ringkas untuk strip galeri di beranda. */
export const GALERI_BERANDA = GALERI.slice(0, 8)

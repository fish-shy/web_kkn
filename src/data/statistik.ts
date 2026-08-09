/**
 * Tipe data kependudukan & kelembagaan Kelurahan Landasan Ulin Tengah.
 *
 * Angkanya sekarang tersimpan di basis data dan diambil lewat
 * `GET /api/statistik`, sehingga bisa dimutakhirkan lewat panel admin tanpa
 * mengubah kode.
 *
 * SUMBER data awal: Profil Kampung Keluarga Berkualitas Kelurahan Landasan
 * Ulin Tengah pada portal Kemendukbangga/BKKBN — lihat
 * `backend/prisma/data-awal.ts`.
 *
 * CATATAN — angka pada sumbernya sendiri belum sepenuhnya konsisten: jumlah
 * baris per RT berbeda dari total yang dipublikasikan, dan blok "Statistik
 * Kampung" memakai potret data lain dibanding tabel Gambaran Umum. Selisih itu
 * ditampilkan apa adanya di halaman Data, bukan dirapikan diam-diam.
 *
 * Data keluarga miskin (desil 1–2) sengaja TIDAK ditampilkan di situs ini.
 */

export type GambaranUmum = {
  penduduk: number
  kk: number
  pus: number
  ibuHamil: number
  balitaStunting: number
  remaja: number
  lansia: number
  /** Total resmi versi sumber — sengaja dipisah dari jumlah baris tabel RT. */
  totalResmiKk: number
  totalResmiJiwa: number
  /** Kartu ringkasan bernilai teks bebas. */
  luasWilayah: string
  rtRw: string
  jarakPusatKota: string
}

export type StatistikKampung = {
  jiwa: number
  kk: number
  pus: number
  keluargaBalita: number
  keluargaRemaja: number
  keluargaLansia: number
  remaja: number
}

export type BarisRt = { rt: string; rw: string; kk: number; jiwa: number }
export type BarisPendidikan = { nama: string; l: number; p: number }
export type BarisKb = { nama: string; jml: number; warna: string }
export type GrupSarana = {
  grup: string
  icon: string
  items: { nama: string; ket: string }[]
}
export type BarisPosyandu = { nama: string; alamat: string; layanan: string }
export type BarisLembaga = { nama: string; jml: number }

export type Statistik = {
  gambaranUmum: GambaranUmum
  statistikKampung: StatistikKampung
  pendudukRt: BarisRt[]
  pendidikan: BarisPendidikan[]
  kepesertaanKb: BarisKb[]
  sarana: GrupSarana[]
  posyandu: BarisPosyandu[]
  lembaga: BarisLembaga[]
}

/** Bentuk kosong — dipakai selagi data dimuat atau bila API tak terjangkau. */
export const STATISTIK_KOSONG: Statistik = {
  gambaranUmum: {
    penduduk: 0,
    kk: 0,
    pus: 0,
    ibuHamil: 0,
    balitaStunting: 0,
    remaja: 0,
    lansia: 0,
    totalResmiKk: 0,
    totalResmiJiwa: 0,
    luasWilayah: '—',
    rtRw: '—',
    jarakPusatKota: '—',
  },
  statistikKampung: {
    jiwa: 0,
    kk: 0,
    pus: 0,
    keluargaBalita: 0,
    keluargaRemaja: 0,
    keluargaLansia: 0,
    remaja: 0,
  },
  pendudukRt: [],
  pendidikan: [],
  kepesertaanKb: [],
  sarana: [],
  posyandu: [],
  lembaga: [],
}

export const jumlah = <T,>(rows: T[], ambil: (r: T) => number) =>
  rows.reduce((s, r) => s + ambil(r), 0)

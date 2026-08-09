/**
 * Pengambilan data untuk halaman publik.
 *
 * Hasilnya disimpan di satu penyimpanan tingkat modul, bukan di state tiap
 * komponen — berpindah antar halaman tidak memicu permintaan ulang, dan
 * beberapa halaman yang memakai data sama ikut ter-perbarui bersamaan.
 * Komponen menyimaknya lewat `useSyncExternalStore`.
 *
 * Setelah admin menyimpan perubahan, panggil `segarkan()`: entri ditandai basi
 * lalu diambil ulang, sementara data lama tetap tampil supaya layar tidak
 * berkedip kosong.
 */

import { useEffect, useSyncExternalStore } from 'react'
import { api, pesanGalat } from './api'
import type { Berita } from '../data/berita'
import type { Foto } from '../data/galeri'
import { STATISTIK_KOSONG, type Statistik } from '../data/statistik'

type Kunci = 'berita' | 'galeri' | 'statistik'

type Entri = {
  data?: unknown
  galat?: string
  /** Permintaan sedang berjalan. */
  sibuk: boolean
  /** Perlu diambil ulang pada kesempatan berikutnya. */
  basi: boolean
}

const toko = new Map<Kunci, Entri>()
const pendengar = new Set<() => void>()

const AMBIL: Record<Kunci, () => Promise<unknown>> = {
  berita: () => api.berita(),
  galeri: () => api.galeri(),
  statistik: () => api.statistik(),
}

function langgan(f: () => void) {
  pendengar.add(f)
  return () => {
    pendengar.delete(f)
  }
}

/**
 * Entri selalu diganti dengan objek baru, tidak diubah di tempat — kalau
 * tidak, `useSyncExternalStore` menganggap isinya sama dan melewatkan render.
 */
function pasang(kunci: Kunci, entri: Entri) {
  toko.set(kunci, entri)
  for (const f of pendengar) f()
}

function muat(kunci: Kunci) {
  const ada = toko.get(kunci)
  if (ada?.sibuk) return
  if (ada && !ada.basi) return

  pasang(kunci, { data: ada?.data, sibuk: true, basi: false })

  AMBIL[kunci]()
    .then((data) => pasang(kunci, { data, sibuk: false, basi: false }))
    .catch((e) =>
      pasang(kunci, {
        data: toko.get(kunci)?.data,
        galat: pesanGalat(e),
        sibuk: false,
        basi: false,
      }),
    )
}

/** Tandai data perlu diambil ulang. Tanpa argumen: seluruh entri. */
export function segarkan(kunci?: Kunci) {
  for (const k of kunci ? [kunci] : [...toko.keys()]) {
    const e = toko.get(k)
    if (e) toko.set(k, { ...e, basi: true })
  }
  for (const f of pendengar) f()
}

export type Hasil<T> = {
  data: T
  memuat: boolean
  galat: string | null
  ulangi: () => void
}

function useSumber<T>(kunci: Kunci, awal: T): Hasil<T> {
  const entri = useSyncExternalStore(langgan, () => toko.get(kunci))

  useEffect(() => {
    muat(kunci)
  }, [kunci, entri])

  return {
    data: (entri?.data as T | undefined) ?? awal,
    memuat: entri?.sibuk ?? true,
    galat: entri?.galat ?? null,
    ulangi: () => segarkan(kunci),
  }
}

const KOSONG_BERITA: Berita[] = []
const KOSONG_FOTO: Foto[] = []

export const useBerita = () => useSumber<Berita[]>('berita', KOSONG_BERITA)
export const useGaleri = () => useSumber<Foto[]>('galeri', KOSONG_FOTO)
export const useStatistik = () =>
  useSumber<Statistik>('statistik', STATISTIK_KOSONG)

/**
 * Penghubung ke API Express di folder `backend/`.
 *
 * Saat `npm run dev`, Vite mem-proxy `/api` dan `/uploads` ke backend
 * (lihat vite.config.ts) sehingga BASE boleh kosong. Untuk build produksi
 * yang di-host terpisah, isi `VITE_API_URL` di `.env` — mis.
 * `VITE_API_URL=https://api.kelurahan.example`.
 */

import type { Berita } from '../data/berita'
import type { Foto } from '../data/galeri'
import type { Statistik } from '../data/statistik'

export const BASE = (import.meta.env.VITE_API_URL ?? '').replace(/\/+$/, '')

const KUNCI_TOKEN = 'kkn.admin.token'

/* ------------------------------------------------------------------ Token */

export function ambilToken(): string | null {
  try {
    return localStorage.getItem(KUNCI_TOKEN)
  } catch {
    return null
  }
}

export function simpanToken(token: string | null) {
  try {
    if (token) localStorage.setItem(KUNCI_TOKEN, token)
    else localStorage.removeItem(KUNCI_TOKEN)
  } catch {
    /* localStorage bisa diblokir (mode privat) — abaikan saja. */
  }
}

/* ------------------------------------------------------------------ Galat */

export class GalatApi extends Error {
  readonly status: number

  constructor(status: number, pesan: string) {
    super(pesan)
    this.name = 'GalatApi'
    this.status = status
  }
}

export function pesanGalat(e: unknown): string {
  if (e instanceof GalatApi) return e.message
  if (e instanceof Error && e.name === 'TypeError') {
    return 'Tidak dapat menghubungi server. Pastikan backend sudah dijalankan.'
  }
  return e instanceof Error ? e.message : 'Terjadi kesalahan tak terduga.'
}

/* ---------------------------------------------------------------- Request */

type Opsi = {
  metode?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
  body?: unknown
  /** Sertakan token admin. */
  auth?: boolean
  signal?: AbortSignal
}

async function minta<T>(jalur: string, opsi: Opsi = {}): Promise<T> {
  const { metode = 'GET', body, auth = false, signal } = opsi

  const headers: Record<string, string> = {}
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (auth) {
    const token = ambilToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(`${BASE}/api${jalur}`, {
    method: metode,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    signal,
  })

  if (res.status === 204) return undefined as T

  const teks = await res.text()
  const data = teks ? JSON.parse(teks) : null

  if (!res.ok) {
    // Token kedaluwarsa: buang supaya pengguna diarahkan ke halaman masuk.
    if (res.status === 401 && auth) simpanToken(null)
    throw new GalatApi(res.status, data?.pesan ?? `Permintaan gagal (${res.status}).`)
  }

  return data as T
}

/* ---------------------------------------------------------------- Gambar */

/**
 * Dua asal gambar yang mungkin tersimpan di basis data:
 *   • URL penuh — foto unggahan admin di Supabase Storage;
 *   • path diawali `/` — foto bawaan di `kkn/public/`, mis. `/berita/…`.
 * Keduanya sudah bisa dipakai apa adanya sebagai `src`.
 */
export function srcGambar(path?: string | null): string | undefined {
  return path || undefined
}

/* ------------------------------------------------------------------- API */

export type MasukHasil = {
  token: string
  admin: { sub: string; username: string; nama: string }
}

export const api = {
  /* --- auth --- */
  masuk: (username: string, password: string) =>
    minta<MasukHasil>('/auth/login', {
      metode: 'POST',
      body: { username, password },
    }),

  saya: (signal?: AbortSignal) =>
    minta<{ admin: MasukHasil['admin'] }>('/auth/me', { auth: true, signal }),

  gantiSandi: (passwordLama: string, passwordBaru: string) =>
    minta<{ pesan: string }>('/auth/password', {
      metode: 'POST',
      auth: true,
      body: { passwordLama, passwordBaru },
    }),

  /* --- berita --- */
  berita: (signal?: AbortSignal) => minta<Berita[]>('/berita', { signal }),

  beritaSatu: (kunci: string, signal?: AbortSignal) =>
    minta<{ berita: Berita; terkait: Berita[] }>(
      `/berita/${encodeURIComponent(kunci)}`,
      { signal },
    ),

  beritaTambah: (data: Partial<Berita>) =>
    minta<Berita>('/berita', { metode: 'POST', auth: true, body: data }),

  beritaUbah: (id: string, data: Partial<Berita>) =>
    minta<Berita>(`/berita/${id}`, { metode: 'PATCH', auth: true, body: data }),

  beritaHapus: (id: string) =>
    minta<{ pesan: string }>(`/berita/${id}`, { metode: 'DELETE', auth: true }),

  /* --- galeri --- */
  galeri: (signal?: AbortSignal) => minta<Foto[]>('/galeri', { signal }),

  galeriTambah: (data: Partial<Foto>) =>
    minta<Foto>('/galeri', { metode: 'POST', auth: true, body: data }),

  galeriUbah: (id: string, data: Partial<Foto>) =>
    minta<Foto>(`/galeri/${id}`, { metode: 'PATCH', auth: true, body: data }),

  galeriHapus: (id: string) =>
    minta<{ pesan: string }>(`/galeri/${id}`, { metode: 'DELETE', auth: true }),

  /* --- statistik --- */
  statistik: (signal?: AbortSignal) => minta<Statistik>('/statistik', { signal }),

  statistikSimpan: <K extends keyof Statistik>(
    bagian: K,
    data: Statistik[K],
  ) => {
    const jalur: Record<keyof Statistik, string> = {
      gambaranUmum: 'gambaran-umum',
      statistikKampung: 'statistik-kampung',
      pendudukRt: 'penduduk-rt',
      pendidikan: 'pendidikan',
      kepesertaanKb: 'kepesertaan-kb',
      sarana: 'sarana',
      posyandu: 'posyandu',
      lembaga: 'lembaga',
    }
    return minta<Statistik[K]>(`/statistik/${jalur[bagian]}`, {
      metode: 'PUT',
      auth: true,
      body: data,
    })
  },

  /* --- unggah --- */
  async unggah(berkas: File): Promise<{ url: string }> {
    const form = new FormData()
    form.append('gambar', berkas)

    const token = ambilToken()
    const res = await fetch(`${BASE}/api/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      body: form,
    })

    const teks = await res.text()
    const data = teks ? JSON.parse(teks) : null
    if (!res.ok) {
      if (res.status === 401) simpanToken(null)
      throw new GalatApi(res.status, data?.pesan ?? 'Gagal mengunggah gambar.')
    }
    return data as { url: string }
  },
}

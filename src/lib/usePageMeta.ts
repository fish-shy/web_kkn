import { useEffect } from 'react'
import { SITE } from '../data/site'
import { seo } from '../data/seo'

/**
 * Menyetel metadata halaman saat pengguna berpindah rute di dalam situs.
 *
 * Perlu diingat: crawler media sosial (WhatsApp, Facebook) tidak menjalankan
 * JavaScript, jadi yang mereka baca adalah HTML hasil `scripts/prerender.mjs`,
 * bukan yang disetel di sini. Hook ini menjaga metadata tetap benar bagi mesin
 * pencari yang me-render halaman, dan bagi pengguna yang menyalin URL dari
 * bilah alamat setelah menjelajah.
 */

type Opsi = {
  /** Gambar pratinjau; path relatif akan dijadikan URL absolut. */
  gambar?: string | null
  /** `article` untuk halaman berita, selebihnya `website`. */
  jenis?: 'website' | 'article'
  /** Minta mesin pencari tidak mengindeks halaman ini. */
  noindex?: boolean
}

/** Alamat produksi situs; dipakai untuk canonical dan og:url. */
const ASAL =
  (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/+$/, '') ??
  (typeof window !== 'undefined' ? window.location.origin : '')

function absolut(path?: string | null): string | undefined {
  if (!path) return undefined
  if (/^https?:\/\//i.test(path)) return path
  return `${ASAL}${path.startsWith('/') ? '' : '/'}${path}`
}

/** Membuat tag bila belum ada, lalu mengisi atributnya. */
function setMeta(kunci: 'name' | 'property', nilai: string, isi: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(
    `meta[${kunci}="${nilai}"]`,
  )
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(kunci, nilai)
    document.head.appendChild(tag)
  }
  tag.content = isi
}

function setCanonical(href: string) {
  let tag = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!tag) {
    tag = document.createElement('link')
    tag.rel = 'canonical'
    document.head.appendChild(tag)
  }
  tag.href = href
}

export function usePageMeta(judul: string, deskripsi?: string, opsi: Opsi = {}) {
  const { gambar, jenis = 'website', noindex = false } = opsi

  useEffect(() => {
    const judulPenuh =
      judul === SITE.name ? judul : `${judul} — ${SITE.name}`
    document.title = judulPenuh

    const url =
      typeof window !== 'undefined'
        ? `${ASAL}${window.location.pathname}`
        : ASAL

    setCanonical(url)
    setMeta('property', 'og:title', judulPenuh)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:type', jenis)
    setMeta('property', 'og:site_name', SITE.name)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', judulPenuh)

    if (deskripsi) {
      setMeta('name', 'description', deskripsi)
      setMeta('property', 'og:description', deskripsi)
      setMeta('name', 'twitter:description', deskripsi)
    }

    const img = absolut(gambar) ?? absolut('/og-image.jpg')
    if (img) {
      setMeta('property', 'og:image', img)
      setMeta('name', 'twitter:image', img)
    }

    // Halaman admin dan 404 tidak layak muncul di hasil pencarian.
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
  }, [judul, deskripsi, gambar, jenis, noindex])
}

/**
 * Versi ringkas untuk rute tetap: judul dan deskripsinya diambil dari
 * `src/data/seo.json`, sumber yang sama dengan yang dipakai prerender — jadi
 * metadata versi statis dan versi navigasi tidak mungkin berbeda.
 */
export function useSeoRute(path: string, opsi?: Parameters<typeof usePageMeta>[2]) {
  const r = seo(path)
  // Beranda memakai nama kelurahan saja; menambahkan "Beranda — " di depannya
  // hanya membuang ruang judul yang terbatas di hasil pencarian.
  usePageMeta(path === '/' ? SITE.name : r.judul, r.deskripsi, opsi)
}

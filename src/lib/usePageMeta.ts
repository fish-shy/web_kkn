import { useEffect } from 'react'
import { SITE } from '../data/site'

/** Set <title> dan meta description per halaman. */
export function usePageMeta(judul: string, deskripsi?: string) {
  useEffect(() => {
    document.title = `${judul} — ${SITE.name}`
    if (!deskripsi) return

    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.name = 'description'
      document.head.appendChild(tag)
    }
    tag.content = deskripsi
  }, [judul, deskripsi])
}

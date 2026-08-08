import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { usePageMeta } from '../lib/usePageMeta'
import { Icon } from '../components/Icon'
import { Thumb } from '../components/Thumb'
import { GLYPH } from '../lib/glyph'
import { Empty, Reveal, SectionHead } from '../components/ui'
import { ALBUM, GALERI, type AlbumNama } from '../data/galeri'
import { tanggalPanjang } from '../lib/format'

export default function Galeri() {
  usePageMeta(
    'Galeri Kegiatan',
    'Dokumentasi kegiatan warga, posyandu, pembangunan, dan program Kelurahan Landasan Ulin Tengah.',
  )

  const [album, setAlbum] = useState<AlbumNama | 'Semua'>('Semua')
  const [aktif, setAktif] = useState<number | null>(null)

  const hasil = useMemo(
    () => GALERI.filter((g) => album === 'Semua' || g.album === album),
    [album],
  )

  const tutup = useCallback(() => setAktif(null), [])
  const geser = useCallback(
    (arah: 1 | -1) =>
      setAktif((i) =>
        i === null ? i : (i + arah + hasil.length) % hasil.length,
      ),
    [hasil.length],
  )

  useEffect(() => {
    if (aktif === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') tutup()
      if (e.key === 'ArrowRight') geser(1)
      if (e.key === 'ArrowLeft') geser(-1)
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [aktif, tutup, geser])

  const foto = aktif === null ? null : hasil[aktif]

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Beranda', to: '/' }, { label: 'Galeri' }]}
        eyebrow="Dokumentasi"
        title="Galeri Kegiatan"
        lead="Rekam jejak kegiatan warga dan program kelurahan dari waktu ke waktu."
        meta={[
          { icon: 'image', text: `${GALERI.length} dokumentasi` },
          { icon: 'layers', text: `${ALBUM.length} album` },
        ]}
      />

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Album"
            title="Telusuri berdasarkan album"
            action={
              <Link to="/berita" className="btn btn--ghost btn--sm">
                Baca beritanya
                <Icon name="arrow-right" width={15} height={15} />
              </Link>
            }
          />

          <div className="chip-row" style={{ marginBottom: '1.5rem' }}>
            <button
              type="button"
              className="chip"
              aria-pressed={album === 'Semua'}
              onClick={() => {
                setAlbum('Semua')
                setAktif(null)
              }}
            >
              Semua
            </button>
            {ALBUM.map((a) => (
              <button
                key={a}
                type="button"
                className="chip"
                aria-pressed={album === a}
                onClick={() => {
                  setAlbum(a)
                  setAktif(null)
                }}
              >
                {a}
              </button>
            ))}
          </div>

          {hasil.length === 0 ? (
            <Empty
              title="Belum ada dokumentasi"
              text="Album ini belum memiliki dokumentasi. Silakan pilih album lain."
            />
          ) : (
            <div className="gallery-grid">
              {hasil.map((g, i) => (
                <Reveal key={g.id} delay={(i % 4) * 60}>
                  <button
                    type="button"
                    className="gallery-item"
                    onClick={() => setAktif(i)}
                    aria-label={`Perbesar: ${g.judul}`}
                  >
                    <Thumb seed={g.id + g.judul} glyph={GLYPH[g.album]} />
                    <span className="gallery-item__cap">
                      <span className="gallery-item__title">{g.judul}</span>
                      <span className="gallery-item__sub">
                        {g.album} · {tanggalPanjang(g.tanggal)}
                      </span>
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>
          )}

          <p className="form-note" style={{ marginTop: '1.5rem' }}>
            Dokumentasi ditampilkan dengan gambar sementara. Unggah foto asli
            kegiatan untuk menggantikannya — lihat catatan di berkas{' '}
            <code>src/components/Thumb.tsx</code>.
          </p>
        </div>
      </section>

      {foto && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={foto.judul}
          onClick={tutup}
        >
          <div className="lightbox__frame" onClick={(e) => e.stopPropagation()}>
            <Thumb seed={foto.id + foto.judul} glyph={GLYPH[foto.album]} />
            <div className="lightbox__cap">
              <span className="lightbox__title">{foto.judul}</span>
              <span className="lightbox__sub">
                {foto.album} · {tanggalPanjang(foto.tanggal)} ·{' '}
                {(aktif ?? 0) + 1} dari {hasil.length}
              </span>
            </div>

            <button
              type="button"
              className="lightbox__btn"
              onClick={tutup}
              aria-label="Tutup"
            >
              <Icon name="close" />
            </button>
            {hasil.length > 1 && (
              <>
                <button
                  type="button"
                  className="lightbox__nav lightbox__nav--prev"
                  onClick={() => geser(-1)}
                  aria-label="Sebelumnya"
                >
                  <Icon name="chevron-left" />
                </button>
                <button
                  type="button"
                  className="lightbox__nav lightbox__nav--next"
                  onClick={() => geser(1)}
                  aria-label="Berikutnya"
                >
                  <Icon name="chevron-right" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

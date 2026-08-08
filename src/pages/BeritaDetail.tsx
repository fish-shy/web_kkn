import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { usePageMeta } from '../lib/usePageMeta'
import { Icon } from '../components/Icon'
import { Thumb } from '../components/Thumb'
import { GLYPH } from '../lib/glyph'
import { Reveal } from '../components/ui'
import { beritaTerkait, cariBerita } from '../data/berita'
import { SITE } from '../data/site'
import { tanggalLengkap, tanggalPendek } from '../lib/format'
import NotFound from './NotFound'

export default function BeritaDetail() {
  const { slug = '' } = useParams()
  const berita = cariBerita(slug)
  const [disalin, setDisalin] = useState(false)

  usePageMeta(berita?.judul ?? 'Berita tidak ditemukan', berita?.ringkas)

  if (!berita) return <NotFound konteks="berita" />

  const terkait = beritaTerkait(berita.slug, berita.kategori)
  const url = typeof window !== 'undefined' ? window.location.href : ''

  const salin = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setDisalin(true)
      setTimeout(() => setDisalin(false), 2000)
    } catch {
      setDisalin(false)
    }
  }

  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Beranda', to: '/' },
          { label: 'Berita', to: '/berita' },
          { label: berita.kategori },
        ]}
        eyebrow={berita.kategori}
        title={berita.judul}
        meta={[
          { icon: 'calendar', text: tanggalLengkap(berita.tanggal) },
          { icon: 'map-pin', text: berita.lokasi },
          { icon: 'users', text: berita.penulis },
        ]}
      />

      <section className="section">
        <div className="container article">
          <Reveal>
            <article>
              <Thumb
                seed={berita.slug}
                src={berita.foto}
                alt={berita.judul}
                glyph={GLYPH[berita.kategori]}
                className="article__cover"
              />

              <div className="article__body">
                <p className="lead" style={{ maxWidth: 'none' }}>
                  {berita.ringkas}
                </p>

                {berita.isi.map((blok, i) => {
                  if (blok.t === 'h2') return <h2 key={i}>{blok.v}</h2>
                  if (blok.t === 'p') return <p key={i}>{blok.v}</p>
                  if (blok.t === 'ul')
                    return (
                      <ul key={i}>
                        {blok.v.map((li) => (
                          <li key={li}>{li}</li>
                        ))}
                      </ul>
                    )
                  return (
                    <blockquote key={i}>
                      {blok.v}
                      {blok.by && (
                        <footer
                          style={{
                            marginTop: '0.6rem',
                            fontFamily: 'var(--font-sans)',
                            fontStyle: 'normal',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            color: 'var(--ink-500)',
                          }}
                        >
                          — {blok.by}
                        </footer>
                      )}
                    </blockquote>
                  )
                })}
              </div>

              {berita.sumber && (
                <p className="form-note" style={{ marginTop: '2rem' }}>
                  Dipublikasikan ulang dari situs resmi kelurahan.{' '}
                  <a
                    href={berita.sumber}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      textDecoration: 'underline',
                      textUnderlineOffset: '2px',
                    }}
                  >
                    Lihat publikasi aslinya
                  </a>
                  .
                </p>
              )}

              <div className="article__share">
                <span>Bagikan:</span>
                <a
                  className="btn btn--ghost btn--sm"
                  href={`https://wa.me/?text=${encodeURIComponent(`${berita.judul} — ${url}`)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon name="whatsapp" width={15} height={15} />
                  WhatsApp
                </a>
                <a
                  className="btn btn--ghost btn--sm"
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon name="facebook" width={15} height={15} />
                  Facebook
                </a>
                <button type="button" className="btn btn--ghost btn--sm" onClick={salin}>
                  <Icon name={disalin ? 'check' : 'link'} width={15} height={15} />
                  {disalin ? 'Tautan disalin' : 'Salin tautan'}
                </button>
                <Link to="/berita" className="btn btn--ghost btn--sm article__share-end">
                  <Icon name="arrow-left" width={15} height={15} />
                  Semua berita
                </Link>
              </div>
            </article>
          </Reveal>

          <aside>
            <div className="article__sticky">
              <div className="aside-card">
                <p className="aside-card__title">Berita lainnya</p>
                <div className="aside-list">
                  {terkait.map((t) => (
                    <Link key={t.slug} to={`/berita/${t.slug}`}>
                      <Thumb
                        seed={t.slug}
                        src={t.foto}
                        alt={t.judul}
                        glyph={GLYPH[t.kategori]}
                        className="aside-list__thumb"
                      />
                      <span>
                        <span className="aside-list__title">{t.judul}</span>
                        <span
                          className="aside-list__date"
                          style={{ display: 'block' }}
                        >
                          {tanggalPendek(t.tanggal)}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="aside-card">
                <p className="aside-card__title">Butuh bantuan?</p>
                <p className="card__text" style={{ marginBottom: '1rem' }}>
                  Tanyakan persyaratan surat pengantar dan keperluan
                  administrasi lain sebelum datang ke kantor kelurahan.
                </p>
                <Link to="/kontak" className="btn btn--primary btn--sm btn--block">
                  Hubungi kelurahan
                </Link>
                <a
                  href={SITE.whatsappLink}
                  className="btn btn--ghost btn--sm btn--block"
                  style={{ marginTop: '0.5rem' }}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon name="whatsapp" width={15} height={15} />
                  Tanya via WhatsApp
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}

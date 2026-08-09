import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { usePageMeta } from '../lib/usePageMeta'
import { Icon } from '../components/Icon'
import { Thumb } from '../components/Thumb'
import { GLYPH } from '../lib/glyph'
import {
  ArrowLink,
  Empty,
  GalatKotak,
  Memuat,
  Pagination,
  Reveal,
} from '../components/ui'
import { daftarKategori } from '../data/berita'
import { useBerita } from '../lib/sumber'
import { srcGambar } from '../lib/api'
import { tanggalPanjang } from '../lib/format'

const PER_HAL = 6

export default function Berita() {
  usePageMeta(
    'Berita & Kegiatan',
    'Kabar terbaru seputar kegiatan, program, dan pengumuman dari Kelurahan Landasan Ulin Tengah.',
  )

  const { data: berita, memuat, galat, ulangi } = useBerita()

  const [kategori, setKategori] = useState<string>('Semua')
  const [q, setQ] = useState('')
  const [hal, setHal] = useState(1)

  const kategori2 = useMemo(() => daftarKategori(berita), [berita])

  const hasil = useMemo(() => {
    const kunci = q.trim().toLowerCase()
    return berita.filter((b) => {
      const cocokKategori = kategori === 'Semua' || b.kategori === kategori
      const cocokCari =
        !kunci ||
        b.judul.toLowerCase().includes(kunci) ||
        b.ringkas.toLowerCase().includes(kunci) ||
        b.kategori.toLowerCase().includes(kunci)
      return cocokKategori && cocokCari
    })
  }, [berita, kategori, q])

  const polos = kategori === 'Semua' && !q.trim()
  const utama = polos && hal === 1 ? hasil[0] : undefined
  const sisa = utama ? hasil.slice(1) : hasil

  const totalHal = Math.max(1, Math.ceil(sisa.length / PER_HAL))
  const halAman = Math.min(hal, totalHal)
  const potong = sisa.slice((halAman - 1) * PER_HAL, halAman * PER_HAL)

  const ubah = (fn: () => void) => {
    fn()
    setHal(1)
  }

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Beranda', to: '/' }, { label: 'Berita & Kegiatan' }]}
        eyebrow="Informasi publik"
        title="Berita & Kegiatan"
        lead="Ikuti kabar terbaru seputar kegiatan warga, program kelurahan, dan pengumuman resmi."
        meta={[
          { icon: 'file-text', text: `${berita.length} publikasi` },
          ...(berita.length > 0
            ? [
                {
                  icon: 'calendar' as const,
                  text: `Terbaru ${tanggalPanjang(berita[0].tanggal)}`,
                },
              ]
            : []),
        ]}
      />

      <section className="section">
        <div className="container">
          <div className="berita-toolbar">
            <div className="chip-row">
              <button
                type="button"
                className="chip"
                aria-pressed={kategori === 'Semua'}
                onClick={() => ubah(() => setKategori('Semua'))}
              >
                Semua
              </button>
              {kategori2.map((k) => (
                <button
                  key={k}
                  type="button"
                  className="chip"
                  aria-pressed={kategori === k}
                  onClick={() => ubah(() => setKategori(k))}
                >
                  {k}
                </button>
              ))}
            </div>

            <div className="search">
              <Icon name="search" />
              <input
                className="input"
                type="search"
                value={q}
                placeholder="Cari judul berita…"
                aria-label="Cari berita"
                onChange={(e) => ubah(() => setQ(e.target.value))}
              />
            </div>
          </div>

          {galat && <GalatKotak pesan={galat} onUlangi={ulangi} />}

          {memuat && berita.length === 0 ? (
            <Memuat teks="Memuat berita…" />
          ) : hasil.length === 0 ? (
            <Empty
              title="Berita tidak ditemukan"
              text="Coba kata kunci lain atau pilih kategori berbeda untuk melihat kegiatan kelurahan lainnya."
            />
          ) : (
            <>
              {utama && (
                <Reveal>
                  <Link to={`/berita/${utama.slug}`} className="berita-featured">
                    <Thumb
                      seed={utama.slug}
                      src={srcGambar(utama.foto)}
                      alt={utama.judul}
                      glyph={GLYPH[utama.kategori]}
                      className="berita-featured__media"
                    />
                    <div className="berita-featured__body">
                      <div className="berita-row__meta">
                        <span className="badge">{utama.kategori}</span>
                        <span className="berita-row__date">
                          {tanggalPanjang(utama.tanggal)}
                        </span>
                      </div>
                      <h2 className="berita-featured__title">{utama.judul}</h2>
                      <p className="card__text">{utama.ringkas}</p>
                      <span style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
                        <ArrowLink>Baca selengkapnya</ArrowLink>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              )}

              <Reveal>
                <div className="berita-list">
                  {potong.map((b) => (
                    <Link
                      key={b.slug}
                      to={`/berita/${b.slug}`}
                      className="berita-row"
                    >
                      <div>
                        <div className="berita-row__meta">
                          <span className="badge">{b.kategori}</span>
                          <span className="berita-row__date">
                            {tanggalPanjang(b.tanggal)}
                          </span>
                        </div>
                        <h3 className="berita-row__title">{b.judul}</h3>
                        <p className="berita-row__excerpt">{b.ringkas}</p>
                      </div>
                      <Thumb
                        seed={b.slug}
                        src={srcGambar(b.foto)}
                        alt={b.judul}
                        glyph={GLYPH[b.kategori]}
                        className="berita-row__thumb"
                      />
                    </Link>
                  ))}
                </div>
              </Reveal>

              <Pagination page={halAman} pages={totalHal} onChange={setHal} />

              <p
                className="form-note"
                style={{ textAlign: 'center', marginTop: '1rem' }}
              >
                Menampilkan {potong.length + (utama ? 1 : 0)} dari{' '}
                {hasil.length} publikasi
                {kategori !== 'Semua' ? ` kategori ${kategori}` : ''}.
              </p>
            </>
          )}
        </div>
      </section>
    </>
  )
}

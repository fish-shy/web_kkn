import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { GalatKotak, Memuat } from '../components/ui'
import { usePageMeta } from '../lib/usePageMeta'
import { api, pesanGalat } from '../lib/api'
import { segarkan, useBerita } from '../lib/sumber'
import { BERITA_BARU, daftarKategori, type Berita, type Blok } from '../data/berita'
import { Kabar, KartuAdmin, Kolom, KepalaAdmin, PilihGambar, useKabar } from './ui'

type Isian = Omit<Berita, 'id' | 'slug' | 'diperbarui'>

const JENIS_BLOK: { nilai: Blok['t']; label: string }[] = [
  { nilai: 'p', label: 'Paragraf' },
  { nilai: 'h2', label: 'Subjudul' },
  { nilai: 'ul', label: 'Daftar poin' },
  { nilai: 'quote', label: 'Kutipan' },
]

function blokBaru(t: Blok['t']): Blok {
  if (t === 'ul') return { t: 'ul', v: [''] }
  if (t === 'quote') return { t: 'quote', v: '', by: '' }
  if (t === 'h2') return { t: 'h2', v: '' }
  return { t: 'p', v: '' }
}

export default function FormBerita() {
  const { id } = useParams()
  const baru = !id
  const navigate = useNavigate()

  usePageMeta(baru ? 'Tambah Berita — Panel Admin' : 'Sunting Berita — Panel Admin')

  const { data: semua } = useBerita()

  /*
   * Untuk berita baru, isian langsung siap. Untuk penyuntingan, isian baru ada
   * setelah datanya tiba — status "sedang memuat" diturunkan dari situ, bukan
   * dari flag yang di-set di dalam effect.
   */
  const [muatan, setMuatan] = useState<{ isian?: Isian; galat?: string } | null>(
    () => (baru ? { isian: { ...BERITA_BARU } } : null),
  )
  const [sibuk, setSibuk] = useState(false)
  const [kabar, setKabar] = useKabar()

  const isian = muatan?.isian
  const setIsian = (fn: (s: Isian) => Isian) =>
    setMuatan((m) => (m?.isian ? { isian: fn(m.isian) } : m))

  useEffect(() => {
    if (!id) return
    const ac = new AbortController()

    api
      .beritaSatu(id, ac.signal)
      .then(({ berita: b }) => {
        setMuatan({
          isian: {
            judul: b.judul,
            kategori: b.kategori,
            tanggal: b.tanggal,
            lokasi: b.lokasi,
            penulis: b.penulis,
            ringkas: b.ringkas,
            foto: b.foto,
            sumber: b.sumber,
            isi: b.isi ?? [],
          },
        })
      })
      .catch((e) => {
        if (!ac.signal.aborted) setMuatan({ galat: pesanGalat(e) })
      })

    return () => ac.abort()
  }, [id])

  if (muatan?.galat) return <GalatKotak pesan={muatan.galat} />
  if (!isian) return <Memuat teks="Memuat berita…" />

  const ubah = <K extends keyof Isian>(kunci: K, nilai: Isian[K]) =>
    setIsian((s) => ({ ...s, [kunci]: nilai }))

  const ubahBlok = (i: number, blok: Blok) =>
    setIsian((s) => ({ ...s, isi: s.isi.map((b, j) => (j === i ? blok : b)) }))

  const hapusBlok = (i: number) =>
    setIsian((s) => ({ ...s, isi: s.isi.filter((_, j) => j !== i) }))

  const geserBlok = (i: number, arah: -1 | 1) =>
    setIsian((s) => {
      const j = i + arah
      if (j < 0 || j >= s.isi.length) return s
      const isi = s.isi.slice()
      ;[isi[i], isi[j]] = [isi[j], isi[i]]
      return { ...s, isi }
    })

  const kirim = async (e: FormEvent) => {
    e.preventDefault()
    setSibuk(true)
    setKabar(null)

    // Blok kosong dibuang supaya tidak menghasilkan paragraf hampa di situs.
    const isi = isian.isi.filter((b) =>
      b.t === 'ul' ? b.v.some((x) => x.trim()) : b.v.trim(),
    )

    const kiriman = {
      ...isian,
      isi: isi.map((b) =>
        b.t === 'ul' ? { ...b, v: b.v.filter((x) => x.trim()) } : b,
      ),
    }

    try {
      if (baru) await api.beritaTambah(kiriman)
      else await api.beritaUbah(id!, kiriman)

      segarkan('berita')

      // Kembali ke daftar setelah menyimpan: hasilnya langsung terlihat di
      // sana, dan tidak ada keraguan apakah simpanannya jadi atau tidak.
      // Pesan sukses dibawa lewat state rute supaya tampil di halaman tujuan.
      navigate('/admin/berita', {
        replace: true,
        state: {
          kabar: {
            jenis: 'sukses' as const,
            teks: baru
              ? `Berita "${isian.judul}" berhasil diterbitkan.`
              : `Perubahan pada "${isian.judul}" tersimpan.`,
          },
        },
      })
    } catch (err) {
      setKabar({ jenis: 'galat', teks: pesanGalat(err) })
      setSibuk(false)
    }
  }

  const kategori = daftarKategori(semua)

  return (
    <form onSubmit={kirim}>
      <KepalaAdmin
        judul={baru ? 'Tambah berita' : 'Sunting berita'}
        ket={
          baru
            ? 'Isi keterangan berita, lalu susun isinya blok demi blok.'
            : isian.judul
        }
        aksi={
          <>
            <Link to="/admin/berita" className="btn btn--ghost btn--sm">
              <Icon name="arrow-left" width={15} height={15} />
              Kembali
            </Link>
            <button type="submit" className="btn btn--primary btn--sm" disabled={sibuk}>
              {sibuk ? 'Menyimpan…' : 'Simpan'}
            </button>
          </>
        }
      />

      <Kabar kabar={kabar} mengambang onTutup={() => setKabar(null)} />

      <div className="adm-kolom2">
        <KartuAdmin judul="Keterangan berita" ikon="file-text">
          <Kolom label="Judul" wajib>
            <input
              className="input"
              value={isian.judul}
              required
              maxLength={240}
              onChange={(e) => ubah('judul', e.target.value)}
            />
          </Kolom>

          <Kolom
            label="Ringkasan"
            wajib
            petunjuk="Satu–dua kalimat; tampil di kartu berita dan hasil pencarian."
          >
            <textarea
              className="textarea"
              style={{ minHeight: '5.5rem' }}
              value={isian.ringkas}
              required
              maxLength={600}
              onChange={(e) => ubah('ringkas', e.target.value)}
            />
          </Kolom>

          <div className="adm-baris2">
            <Kolom label="Kategori" wajib>
              <input
                className="input"
                list="daftar-kategori"
                value={isian.kategori}
                required
                onChange={(e) => ubah('kategori', e.target.value)}
              />
              <datalist id="daftar-kategori">
                {kategori.map((k) => (
                  <option key={k} value={k} />
                ))}
              </datalist>
            </Kolom>

            <Kolom label="Tanggal" wajib>
              <input
                className="input"
                type="date"
                value={isian.tanggal}
                required
                onChange={(e) => ubah('tanggal', e.target.value)}
              />
            </Kolom>
          </div>

          <div className="adm-baris2">
            <Kolom label="Lokasi" wajib>
              <input
                className="input"
                value={isian.lokasi}
                required
                onChange={(e) => ubah('lokasi', e.target.value)}
              />
            </Kolom>

            <Kolom label="Penulis" wajib>
              <input
                className="input"
                value={isian.penulis}
                required
                onChange={(e) => ubah('penulis', e.target.value)}
              />
            </Kolom>
          </div>

          <Kolom
            label="Tautan publikasi asli"
            petunjuk="Kosongkan bila berita ini ditulis sendiri oleh kelurahan."
          >
            <input
              className="input"
              type="url"
              value={isian.sumber ?? ''}
              placeholder="https://…"
              onChange={(e) => ubah('sumber', e.target.value.trim() || null)}
            />
          </Kolom>

          <PilihGambar
            label="Foto utama"
            nilai={isian.foto}
            onUbah={(p) => ubah('foto', p)}
          />
        </KartuAdmin>

        <KartuAdmin
          judul="Isi berita"
          ikon="scroll"
          ket="Susun artikel sebagai rangkaian blok. Urutannya sama dengan tampilan di situs."
        >
          <div className="adm-blok-daftar">
            {isian.isi.map((blok, i) => (
              <div key={i} className="adm-blok">
                <div className="adm-blok__kepala">
                  <select
                    className="select adm-blok__jenis"
                    value={blok.t}
                    aria-label={`Jenis blok ${i + 1}`}
                    onChange={(e) =>
                      ubahBlok(i, blokBaru(e.target.value as Blok['t']))
                    }
                  >
                    {JENIS_BLOK.map((j) => (
                      <option key={j.nilai} value={j.nilai}>
                        {j.label}
                      </option>
                    ))}
                  </select>

                  <span className="adm-blok__aksi">
                    <button
                      type="button"
                      className="adm-ikon"
                      title="Naikkan"
                      disabled={i === 0}
                      onClick={() => geserBlok(i, -1)}
                    >
                      <Icon name="arrow-up" width={14} height={14} />
                    </button>
                    <button
                      type="button"
                      className="adm-ikon"
                      title="Turunkan"
                      disabled={i === isian.isi.length - 1}
                      onClick={() => geserBlok(i, 1)}
                    >
                      <Icon
                        name="arrow-up"
                        width={14}
                        height={14}
                        style={{ transform: 'rotate(180deg)' }}
                      />
                    </button>
                    <button
                      type="button"
                      className="adm-ikon adm-ikon--bahaya"
                      title="Hapus blok"
                      onClick={() => hapusBlok(i)}
                    >
                      <Icon name="close" width={14} height={14} />
                    </button>
                  </span>
                </div>

                {blok.t === 'ul' ? (
                  <textarea
                    className="textarea"
                    value={blok.v.join('\n')}
                    placeholder="Satu poin per baris"
                    onChange={(e) =>
                      ubahBlok(i, { t: 'ul', v: e.target.value.split('\n') })
                    }
                  />
                ) : blok.t === 'h2' ? (
                  <input
                    className="input"
                    value={blok.v}
                    placeholder="Teks subjudul"
                    onChange={(e) => ubahBlok(i, { t: 'h2', v: e.target.value })}
                  />
                ) : blok.t === 'quote' ? (
                  <>
                    <textarea
                      className="textarea"
                      style={{ minHeight: '5rem' }}
                      value={blok.v}
                      placeholder="Isi kutipan"
                      onChange={(e) =>
                        ubahBlok(i, { ...blok, v: e.target.value })
                      }
                    />
                    <input
                      className="input"
                      style={{ marginTop: '0.5rem' }}
                      value={blok.by ?? ''}
                      placeholder="Siapa yang mengatakan (opsional)"
                      onChange={(e) =>
                        ubahBlok(i, { ...blok, by: e.target.value })
                      }
                    />
                  </>
                ) : (
                  <textarea
                    className="textarea"
                    value={blok.v}
                    placeholder="Tulis paragraf…"
                    onChange={(e) => ubahBlok(i, { t: 'p', v: e.target.value })}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="adm-blok-tambah">
            {JENIS_BLOK.map((j) => (
              <button
                key={j.nilai}
                type="button"
                className="btn btn--ghost btn--sm"
                onClick={() =>
                  setIsian((s) => ({ ...s, isi: [...s.isi, blokBaru(j.nilai)] }))
                }
              >
                + {j.label}
              </button>
            ))}
          </div>
        </KartuAdmin>
      </div>

      <div className="adm-kaki">
        <button type="submit" className="btn btn--primary" disabled={sibuk}>
          {sibuk ? 'Menyimpan…' : baru ? 'Terbitkan berita' : 'Simpan perubahan'}
        </button>
      </div>
    </form>
  )
}

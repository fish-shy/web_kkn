import { useMemo, useState, type FormEvent } from 'react'
import { Icon } from '../components/Icon'
import { GalatKotak, Memuat } from '../components/ui'
import { usePageMeta } from '../lib/usePageMeta'
import { api, pesanGalat, srcGambar } from '../lib/api'
import { segarkan, useGaleri } from '../lib/sumber'
import { daftarAlbum, type Foto } from '../data/galeri'
import { tanggalPanjang } from '../lib/format'
import { Kabar, KartuAdmin, Kolom, KepalaAdmin, PilihGambar, useKabar } from './ui'

type Isian = {
  judul: string
  ringkas: string
  album: string
  tanggal: string
  foto: string | null
  sumber: string | null
}

const KOSONG: Isian = {
  judul: '',
  ringkas: '',
  album: 'Apel Pagi',
  tanggal: new Date().toISOString().slice(0, 10),
  foto: null,
  sumber: null,
}

export default function AdminGaleri() {
  usePageMeta('Kelola Galeri — Panel Admin')

  const { data: galeri, memuat, galat, ulangi } = useGaleri()

  const [isian, setIsian] = useState<Isian>(KOSONG)
  const [sunting, setSunting] = useState<string | null>(null)
  const [sibuk, setSibuk] = useState(false)
  const [menghapus, setMenghapus] = useState<string | null>(null)
  const [saring, setSaring] = useState('Semua')
  const [kabar, setKabar] = useKabar()

  const album = useMemo(() => daftarAlbum(galeri), [galeri])
  const tampil = useMemo(
    () => galeri.filter((g) => saring === 'Semua' || g.album === saring),
    [galeri, saring],
  )

  const ubah = <K extends keyof Isian>(kunci: K, nilai: Isian[K]) =>
    setIsian((s) => ({ ...s, [kunci]: nilai }))

  const batal = () => {
    setSunting(null)
    setIsian(KOSONG)
  }

  const mulaiSunting = (g: Foto) => {
    setSunting(g.id)
    setIsian({
      judul: g.judul,
      ringkas: g.ringkas,
      album: g.album,
      tanggal: g.tanggal,
      foto: g.foto,
      sumber: g.sumber,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const kirim = async (e: FormEvent) => {
    e.preventDefault()
    const foto = isian.foto
    if (!foto) {
      setKabar({ jenis: 'galat', teks: 'Pilih dulu gambarnya.' })
      return
    }

    const muatan = { ...isian, foto }

    setSibuk(true)
    setKabar(null)
    try {
      if (sunting) {
        await api.galeriUbah(sunting, muatan)
        setKabar({ jenis: 'sukses', teks: 'Foto diperbarui.' })
      } else {
        await api.galeriTambah(muatan)
        setKabar({ jenis: 'sukses', teks: 'Foto ditambahkan ke galeri.' })
      }
      segarkan('galeri')
      batal()
    } catch (err) {
      setKabar({ jenis: 'galat', teks: pesanGalat(err) })
    } finally {
      setSibuk(false)
    }
  }

  const hapus = async (g: Foto) => {
    if (!window.confirm(`Hapus foto "${g.judul}" dari galeri?`)) return
    setMenghapus(g.id)
    try {
      await api.galeriHapus(g.id)
      segarkan('galeri')
      if (sunting === g.id) batal()
      setKabar({ jenis: 'sukses', teks: 'Foto dihapus.' })
    } catch (e) {
      setKabar({ jenis: 'galat', teks: pesanGalat(e) })
    } finally {
      setMenghapus(null)
    }
  }

  return (
    <>
      <KepalaAdmin
        judul="Galeri"
        ket={`${galeri.length} dokumentasi dalam ${album.length} album.`}
      />

      <Kabar kabar={kabar} />
      {galat && <GalatKotak pesan={galat} onUlangi={ulangi} />}

      <KartuAdmin
        judul={sunting ? 'Sunting foto' : 'Tambah foto'}
        ikon="image"
        ket="Unggah gambar dari komputer, beri keterangan, lalu simpan."
        aksi={
          sunting && (
            <button type="button" className="btn btn--ghost btn--sm" onClick={batal}>
              Batal sunting
            </button>
          )
        }
      >
        <form onSubmit={kirim}>
          <PilihGambar
            label="Gambar"
            wajib
            nilai={isian.foto}
            onUbah={(p) => ubah('foto', p)}
          />

          <Kolom label="Keterangan" wajib petunjuk="Kalimat lengkap; tampil di lightbox galeri.">
            <input
              className="input"
              value={isian.judul}
              required
              maxLength={240}
              onChange={(e) => ubah('judul', e.target.value)}
            />
          </Kolom>

          <div className="adm-baris3">
            <Kolom label="Label pendek" wajib petunjuk="Maks. ±2 kata, untuk kartu beranda.">
              <input
                className="input"
                value={isian.ringkas}
                required
                maxLength={60}
                onChange={(e) => ubah('ringkas', e.target.value)}
              />
            </Kolom>

            <Kolom label="Album" wajib>
              <input
                className="input"
                list="daftar-album"
                value={isian.album}
                required
                onChange={(e) => ubah('album', e.target.value)}
              />
              <datalist id="daftar-album">
                {album.map((a) => (
                  <option key={a} value={a} />
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

          <Kolom label="Tautan publikasi asli" petunjuk="Opsional.">
            <input
              className="input"
              type="url"
              value={isian.sumber ?? ''}
              placeholder="https://…"
              onChange={(e) => ubah('sumber', e.target.value.trim() || null)}
            />
          </Kolom>

          <button type="submit" className="btn btn--primary" disabled={sibuk}>
            {sibuk ? 'Menyimpan…' : sunting ? 'Simpan perubahan' : 'Tambah ke galeri'}
          </button>
        </form>
      </KartuAdmin>

      <div className="adm-head" style={{ marginTop: '2rem' }}>
        <h2 className="adm-head__title" style={{ fontSize: '1.15rem' }}>
          Foto tersimpan
        </h2>
        <div className="chip-row">
          <button
            type="button"
            className="chip"
            aria-pressed={saring === 'Semua'}
            onClick={() => setSaring('Semua')}
          >
            Semua
          </button>
          {album.map((a) => (
            <button
              key={a}
              type="button"
              className="chip"
              aria-pressed={saring === a}
              onClick={() => setSaring(a)}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {memuat && galeri.length === 0 ? (
        <Memuat teks="Memuat galeri…" />
      ) : tampil.length === 0 ? (
        <p className="form-note">Belum ada foto pada album ini.</p>
      ) : (
        <div className="adm-galeri">
          {tampil.map((g) => (
            <figure key={g.id} className="adm-galeri__sel">
              <img src={srcGambar(g.foto)} alt={g.judul} loading="lazy" />
              <figcaption>
                <span className="adm-galeri__judul">{g.judul}</span>
                <span className="adm-galeri__meta">
                  {g.album} · {tanggalPanjang(g.tanggal)}
                </span>
              </figcaption>
              <div className="adm-galeri__aksi">
                <button
                  type="button"
                  className="adm-ikon"
                  title="Sunting"
                  onClick={() => mulaiSunting(g)}
                >
                  <Icon name="scroll" width={14} height={14} />
                </button>
                <button
                  type="button"
                  className="adm-ikon adm-ikon--bahaya"
                  title="Hapus"
                  disabled={menghapus === g.id}
                  onClick={() => void hapus(g)}
                >
                  <Icon name="close" width={14} height={14} />
                </button>
              </div>
            </figure>
          ))}
        </div>
      )}
    </>
  )
}

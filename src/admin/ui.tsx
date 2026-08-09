/* eslint-disable react-refresh/only-export-components */
import { useId, useRef, useState, type ReactNode } from 'react'
import { Icon, type IconName } from '../components/Icon'
import { api, pesanGalat, srcGambar } from '../lib/api'

/* ------------------------------------------------------------------ Kabar */

export type Kabar = { jenis: 'sukses' | 'galat'; teks: string } | null

/**
 * Pesan hasil aksi — hijau untuk berhasil, merah bata untuk gagal.
 *
 * Mode `mengambang` menempelkannya di sudut layar. Itu yang dipakai halaman
 * admin: tombol simpan tersebar sampai ke bawah halaman, jadi pesan yang
 * hanya muncul di puncak halaman sering tak terlihat sama sekali oleh yang
 * menekannya.
 */
export function Kabar({
  kabar,
  onTutup,
  mengambang = false,
}: {
  kabar: Kabar
  onTutup?: () => void
  mengambang?: boolean
}) {
  if (!kabar) return null

  const isi = (
    <div
      className={`form-alert${kabar.jenis === 'galat' ? ' form-alert--galat' : ''}`}
      role={kabar.jenis === 'galat' ? 'alert' : 'status'}
      style={mengambang ? undefined : { marginBottom: '1rem' }}
    >
      <Icon name={kabar.jenis === 'galat' ? 'info' : 'check-circle'} />
      <span style={{ flex: 1 }}>{kabar.teks}</span>
      {onTutup && (
        <button
          type="button"
          className="adm-kabar__tutup"
          onClick={onTutup}
          aria-label="Tutup pesan"
        >
          <Icon name="close" width={14} height={14} />
        </button>
      )}
    </div>
  )

  return mengambang ? <div className="adm-kabar">{isi}</div> : isi
}

/**
 * Bungkus useState + penghapusan otomatis setelah beberapa detik.
 * `awal` dipakai halaman yang menerima pesan bawaan dari halaman sebelumnya.
 */
export function useKabar(awal: Kabar = null): [Kabar, (k: Kabar) => void] {
  const [kabar, set] = useState<Kabar>(awal)
  const timer = useRef<number | undefined>(undefined)

  const pasang = (k: Kabar) => {
    set(k)
    window.clearTimeout(timer.current)
    if (k?.jenis === 'sukses') {
      timer.current = window.setTimeout(() => set(null), 4000)
    }
  }

  return [kabar, pasang]
}

/* ------------------------------------------------------------------ Kolom */

export function Kolom({
  label,
  wajib,
  petunjuk,
  children,
}: {
  label: string
  wajib?: boolean
  petunjuk?: ReactNode
  children: ReactNode
}) {
  return (
    <label className="field">
      <span className="field__label">
        {label}
        {wajib && <span className="req"> *</span>}
      </span>
      {children}
      {petunjuk && <span className="form-note">{petunjuk}</span>}
    </label>
  )
}

/* --------------------------------------------------------------- Halaman */

export function KepalaAdmin({
  judul,
  ket,
  aksi,
}: {
  judul: string
  ket?: string
  aksi?: ReactNode
}) {
  return (
    <div className="adm-head">
      <div>
        <h1 className="adm-head__title">{judul}</h1>
        {ket && <p className="adm-head__sub">{ket}</p>}
      </div>
      {aksi && <div className="adm-head__aksi">{aksi}</div>}
    </div>
  )
}

/* -------------------------------------------------------- Pemilih gambar */

/**
 * Mengunggah satu gambar ke backend lalu mengembalikan path-nya
 * (`/uploads/…`). Nilai bisa juga diisi manual — berguna untuk foto lama yang
 * sudah ada di folder `public/` frontend.
 */
export function PilihGambar({
  nilai,
  onUbah,
  label = 'Gambar',
  wajib,
}: {
  nilai: string | null
  onUbah: (path: string | null) => void
  label?: string
  wajib?: boolean
}) {
  const [mengunggah, setMengunggah] = useState(false)
  const [galat, setGalat] = useState<string | null>(null)
  const input = useRef<HTMLInputElement>(null)
  // Label dipakai sebagai teks, bukan sebagai id — id HTML tidak boleh berspasi.
  const idBerkas = useId()

  const pilih = async (berkas: File | undefined) => {
    if (!berkas) return
    setMengunggah(true)
    setGalat(null)
    try {
      const { url } = await api.unggah(berkas)
      onUbah(url)
    } catch (e) {
      setGalat(pesanGalat(e))
    } finally {
      setMengunggah(false)
      if (input.current) input.current.value = ''
    }
  }

  return (
    <div className="field">
      <span className="field__label">
        {label}
        {wajib && <span className="req"> *</span>}
      </span>

      <div className="adm-gambar">
        <div className="adm-gambar__pratinjau">
          {nilai ? (
            <img src={srcGambar(nilai)} alt="Pratinjau" />
          ) : (
            <span className="adm-gambar__kosong">
              <Icon name="image" />
              Belum ada gambar
            </span>
          )}
        </div>

        <div className="adm-gambar__aksi">
          <input
            ref={input}
            type="file"
            accept="image/*"
            id={idBerkas}
            className="sr-only"
            onChange={(e) => void pilih(e.target.files?.[0])}
          />
          <label
            htmlFor={idBerkas}
            className="btn btn--primary btn--sm"
            aria-disabled={mengunggah}
          >
            <Icon name="download" width={15} height={15} />
            {mengunggah ? 'Mengunggah…' : 'Pilih dari komputer'}
          </label>

          {nilai && (
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              onClick={() => onUbah(null)}
            >
              <Icon name="close" width={15} height={15} />
              Hapus gambar
            </button>
          )}

          <input
            className="input"
            value={nilai ?? ''}
            placeholder="atau tempel URL gambar / path bawaan seperti /berita/apel-13-okt.jpg"
            onChange={(e) => onUbah(e.target.value.trim() || null)}
          />
          {galat && <span className="adm-galat">{galat}</span>}
        </div>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------- Tabel edit */

export type KolomTabel<T> = {
  kunci: keyof T & string
  label: string
  jenis?: 'teks' | 'angka'
  lebar?: string
}

/**
 * Tabel yang bisa disunting langsung di tempat: ubah sel, tambah baris, hapus
 * baris, dan geser urutannya. Dipakai untuk seluruh daftar di halaman
 * Statistik.
 */
export function TabelEdit<T extends Record<string, string | number>>({
  kolom,
  baris,
  onUbah,
  barisBaru,
  labelTambah = 'Tambah baris',
}: {
  kolom: KolomTabel<T>[]
  baris: T[]
  onUbah: (baris: T[]) => void
  barisBaru: () => T
  labelTambah?: string
}) {
  const setSel = (i: number, kunci: string, nilai: string, angka: boolean) => {
    const salinan = baris.slice()
    salinan[i] = {
      ...salinan[i],
      [kunci]: angka ? (nilai === '' ? 0 : Number(nilai)) : nilai,
    }
    onUbah(salinan)
  }

  const geser = (i: number, arah: -1 | 1) => {
    const j = i + arah
    if (j < 0 || j >= baris.length) return
    const salinan = baris.slice()
    ;[salinan[i], salinan[j]] = [salinan[j], salinan[i]]
    onUbah(salinan)
  }

  return (
    <div className="adm-tabel-wrap">
      <div className="table-scroll">
        <table className="adm-tabel">
          <thead>
            <tr>
              {kolom.map((k) => (
                <th key={k.kunci} style={k.lebar ? { width: k.lebar } : undefined}>
                  {k.label}
                </th>
              ))}
              <th className="adm-tabel__aksi-kol">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {baris.map((r, i) => (
              <tr key={i}>
                {kolom.map((k) => (
                  <td key={k.kunci}>
                    <input
                      className="input input--sel"
                      type={k.jenis === 'angka' ? 'number' : 'text'}
                      min={k.jenis === 'angka' ? 0 : undefined}
                      value={String(r[k.kunci] ?? '')}
                      aria-label={`${k.label} baris ${i + 1}`}
                      onChange={(e) =>
                        setSel(i, k.kunci, e.target.value, k.jenis === 'angka')
                      }
                    />
                  </td>
                ))}
                <td className="adm-tabel__aksi">
                  <button
                    type="button"
                    className="adm-ikon"
                    title="Naikkan"
                    onClick={() => geser(i, -1)}
                    disabled={i === 0}
                  >
                    <Icon name="arrow-up" width={14} height={14} />
                  </button>
                  <button
                    type="button"
                    className="adm-ikon"
                    title="Turunkan"
                    onClick={() => geser(i, 1)}
                    disabled={i === baris.length - 1}
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
                    title="Hapus baris"
                    onClick={() => onUbah(baris.filter((_, j) => j !== i))}
                  >
                    <Icon name="close" width={14} height={14} />
                  </button>
                </td>
              </tr>
            ))}
            {baris.length === 0 && (
              <tr>
                <td colSpan={kolom.length + 1} className="adm-tabel__kosong">
                  Belum ada baris.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        className="btn btn--ghost btn--sm"
        style={{ marginTop: '0.75rem' }}
        onClick={() => onUbah([...baris, barisBaru()])}
      >
        <Icon name="check" width={15} height={15} />
        {labelTambah}
      </button>
    </div>
  )
}

/* ------------------------------------------------------------- Kartu blok */

export function KartuAdmin({
  judul,
  ket,
  ikon,
  children,
  aksi,
}: {
  judul: string
  ket?: string
  ikon?: IconName
  children: ReactNode
  aksi?: ReactNode
}) {
  return (
    <section className="adm-kartu">
      <header className="adm-kartu__kepala">
        <div>
          <p className="adm-kartu__judul">
            {ikon && <Icon name={ikon} width={16} height={16} />}
            {judul}
          </p>
          {ket && <p className="adm-kartu__ket">{ket}</p>}
        </div>
        {aksi}
      </header>
      <div className="adm-kartu__isi">{children}</div>
    </section>
  )
}

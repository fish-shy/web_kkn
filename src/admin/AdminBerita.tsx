import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { GalatKotak, Memuat } from '../components/ui'
import { usePageMeta } from '../lib/usePageMeta'
import { useBerita, segarkan } from '../lib/sumber'
import { api, pesanGalat, srcGambar } from '../lib/api'
import { tanggalPanjang } from '../lib/format'
import { Kabar, KepalaAdmin, useKabar } from './ui'

export default function AdminBerita() {
  usePageMeta('Kelola Berita — Panel Admin', undefined, { noindex: true })

  const { data: berita, memuat, galat, ulangi } = useBerita()
  const [q, setQ] = useState('')
  const [menghapus, setMenghapus] = useState<string | null>(null)
  // Pesan yang dibawa dari formulir berita setelah menyimpan.
  const lokasi = useLocation()
  const [kabar, setKabar] = useKabar(
    (lokasi.state as { kabar?: Kabar } | null)?.kabar ?? null,
  )

  // Bersihkan state rute dari riwayat peramban agar pesannya tidak muncul
  // lagi saat halaman ini dimuat ulang. Kolom milik react-router (`key`,
  // `idx`) dibiarkan utuh supaya navigasinya tidak kacau.
  useEffect(() => {
    const riwayat = window.history.state
    if (riwayat?.usr) window.history.replaceState({ ...riwayat, usr: null }, '')
  }, [lokasi.key])

  const hasil = useMemo(() => {
    const kunci = q.trim().toLowerCase()
    if (!kunci) return berita
    return berita.filter(
      (b) =>
        b.judul.toLowerCase().includes(kunci) ||
        b.kategori.toLowerCase().includes(kunci),
    )
  }, [berita, q])

  const hapus = async (id: string, judul: string) => {
    if (!window.confirm(`Hapus berita "${judul}"? Tindakan ini tidak bisa dibatalkan.`))
      return

    setMenghapus(id)
    try {
      await api.beritaHapus(id)
      segarkan('berita')
      setKabar({ jenis: 'sukses', teks: `Berita "${judul}" dihapus.` })
    } catch (e) {
      setKabar({ jenis: 'galat', teks: pesanGalat(e) })
    } finally {
      setMenghapus(null)
    }
  }

  return (
    <>
      <KepalaAdmin
        judul="Berita"
        ket={`${berita.length} publikasi tersimpan.`}
        aksi={
          <Link to="/admin/berita/baru" className="btn btn--primary btn--sm">
            <Icon name="check" width={15} height={15} />
            Tambah berita
          </Link>
        }
      />

      <Kabar kabar={kabar} mengambang onTutup={() => setKabar(null)} />
      {galat && <GalatKotak pesan={galat} onUlangi={ulangi} />}

      <div className="search" style={{ maxWidth: '22rem', marginBottom: '1.25rem' }}>
        <Icon name="search" />
        <input
          className="input"
          type="search"
          value={q}
          placeholder="Cari judul atau kategori…"
          aria-label="Cari berita"
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {memuat && berita.length === 0 ? (
        <Memuat teks="Memuat berita…" />
      ) : hasil.length === 0 ? (
        <p className="form-note">Tidak ada berita yang cocok.</p>
      ) : (
        <div className="adm-tabel-wrap">
          <div className="table-scroll">
            <table className="adm-tabel adm-tabel--daftar">
              <thead>
                <tr>
                  <th style={{ width: '4.5rem' }}>Foto</th>
                  <th>Judul</th>
                  <th style={{ width: '9rem' }}>Kategori</th>
                  <th style={{ width: '10rem' }}>Tanggal</th>
                  <th style={{ width: '9rem' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {hasil.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <span className="adm-thumb">
                        {b.foto ? (
                          <img src={srcGambar(b.foto)} alt="" loading="lazy" />
                        ) : (
                          <Icon name="image" width={16} height={16} />
                        )}
                      </span>
                    </td>
                    <td>
                      <Link to={`/admin/berita/${b.id}`} className="adm-tabel__tautan">
                        {b.judul}
                      </Link>
                      <span className="adm-tabel__slug">/berita/{b.slug}</span>
                    </td>
                    <td>
                      <span className="badge">{b.kategori}</span>
                    </td>
                    <td>{tanggalPanjang(b.tanggal)}</td>
                    <td className="adm-tabel__aksi">
                      <Link
                        to={`/berita/${b.slug}`}
                        className="adm-ikon"
                        title="Lihat di situs"
                        target="_blank"
                      >
                        <Icon name="external" width={14} height={14} />
                      </Link>
                      <Link
                        to={`/admin/berita/${b.id}`}
                        className="adm-ikon"
                        title="Sunting"
                      >
                        <Icon name="scroll" width={14} height={14} />
                      </Link>
                      <button
                        type="button"
                        className="adm-ikon adm-ikon--bahaya"
                        title="Hapus"
                        disabled={menghapus === b.id}
                        onClick={() => void hapus(b.id, b.judul)}
                      >
                        <Icon name="close" width={14} height={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  )
}

import { Link } from 'react-router-dom'
import { Icon, type IconName } from '../components/Icon'
import { GalatKotak } from '../components/ui'
import { usePageMeta } from '../lib/usePageMeta'
import { useBerita, useGaleri, useStatistik } from '../lib/sumber'
import { useAuth } from '../lib/auth'
import { srcGambar } from '../lib/api'
import { jumlah } from '../data/statistik'
import { angka, tanggalPanjang } from '../lib/format'
import { KartuAdmin, KepalaAdmin } from './ui'

export default function Dasbor() {
  usePageMeta('Ringkasan — Panel Admin', undefined, { noindex: true })

  const { admin } = useAuth()
  const berita = useBerita()
  const galeri = useGaleri()
  const statistik = useStatistik()

  const GU = statistik.data.gambaranUmum

  // `siap` menahan angkanya sampai data benar-benar tiba. Tanpa itu kartu
  // sempat memamerkan "0" — yang terbaca sebagai fakta, padahal artinya
  // "belum tahu".
  const angkaKartu: { ikon: IconName; nilai: string; label: string; to: string }[] =
    [
      {
        ikon: 'file-text',
        nilai: berita.siap ? angka(berita.data.length) : '—',
        label: 'Berita terbit',
        to: '/admin/berita',
      },
      {
        ikon: 'image',
        nilai: galeri.siap ? angka(galeri.data.length) : '—',
        label: 'Foto di galeri',
        to: '/admin/galeri',
      },
      {
        ikon: 'users',
        nilai: statistik.siap ? angka(GU.penduduk) : '—',
        label: 'Jiwa penduduk tercatat',
        to: '/admin/statistik',
      },
      {
        ikon: 'building',
        nilai: statistik.siap
          ? angka(jumlah(statistik.data.pendudukRt, (r) => r.kk))
          : '—',
        label: 'KK pada tabel per RT',
        to: '/admin/statistik',
      },
    ]

  const galat = berita.galat ?? galeri.galat ?? statistik.galat

  return (
    <>
      <KepalaAdmin
        judul={`Halo, ${admin?.nama ?? 'Admin'}`}
        ket="Kelola berita, galeri, dan data statistik situs kelurahan dari sini."
      />

      {galat && (
        <GalatKotak
          pesan={galat}
          onUlangi={() => {
            berita.ulangi()
            galeri.ulangi()
            statistik.ulangi()
          }}
        />
      )}

      <div className="adm-angka">
        {angkaKartu.map((k) => (
          <Link key={k.label} to={k.to} className="adm-angka__kartu">
            <span className="icon-tile">
              <Icon name={k.ikon} />
            </span>
            <span className="adm-angka__nilai">{k.nilai}</span>
            <span className="adm-angka__label">{k.label}</span>
          </Link>
        ))}
      </div>

      <div className="adm-kolom2">
        <KartuAdmin
          judul="Berita terbaru"
          ikon="file-text"
          ket="Lima publikasi paling akhir."
          aksi={
            <Link to="/admin/berita/baru" className="btn btn--primary btn--sm">
              Tambah berita
            </Link>
          }
        >
          {!berita.siap ? (
            <p className="form-note">Memuat…</p>
          ) : berita.data.length === 0 ? (
            <p className="form-note">Belum ada berita.</p>
          ) : (
            <ul className="adm-daftar">
              {berita.data.slice(0, 5).map((b) => (
                <li key={b.id}>
                  <Link to={`/admin/berita/${b.id}`}>
                    <span className="adm-daftar__judul">{b.judul}</span>
                    <span className="adm-daftar__meta">
                      {b.kategori} · {tanggalPanjang(b.tanggal)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </KartuAdmin>

        <KartuAdmin
          judul="Foto terbaru"
          ikon="image"
          ket="Enam dokumentasi teratas di galeri."
          aksi={
            <Link to="/admin/galeri" className="btn btn--ghost btn--sm">
              Kelola galeri
            </Link>
          }
        >
          {!galeri.siap ? (
            <p className="form-note">Memuat…</p>
          ) : galeri.data.length === 0 ? (
            <p className="form-note">Belum ada foto.</p>
          ) : (
            <div className="adm-galeri-mini">
              {galeri.data.slice(0, 6).map((g) => (
                <span key={g.id} className="adm-galeri-mini__sel" title={g.judul}>
                  <img src={srcGambar(g.foto)} alt="" loading="lazy" />
                </span>
              ))}
            </div>
          )}
        </KartuAdmin>
      </div>
    </>
  )
}

import { NavLink, Navigate, Outlet, useLocation } from 'react-router-dom'
import { Icon, type IconName } from '../components/Icon'
import { Memuat } from '../components/ui'
import { useAuth } from '../lib/auth'
import { SITE } from '../data/site'

const MENU: { to: string; label: string; icon: IconName; end?: boolean }[] = [
  { to: '/admin', label: 'Ringkasan', icon: 'layers', end: true },
  { to: '/admin/berita', label: 'Berita', icon: 'file-text' },
  { to: '/admin/galeri', label: 'Galeri', icon: 'image' },
  { to: '/admin/statistik', label: 'Data & Statistik', icon: 'building' },
]

export default function AdminLayout() {
  const { admin, memeriksa, keluar } = useAuth()
  const lokasi = useLocation()

  // Selagi token diperiksa ke server, jangan buru-buru mengalihkan ke halaman
  // masuk — kalau tidak, memuat ulang halaman admin selalu melempar keluar.
  if (memeriksa) {
    return (
      <div className="adm-muat">
        <Memuat teks="Memeriksa sesi…" />
      </div>
    )
  }

  if (!admin) {
    return <Navigate to="/admin/masuk" replace state={{ dari: lokasi.pathname }} />
  }

  return (
    <div className="adm">
      <aside className="adm-sisi">
        <div className="adm-sisi__merek">
          <img src={SITE.logo} alt="" width={34} height={34} />
          <span>
            <strong>Panel Admin</strong>
            <small>{SITE.short}</small>
          </span>
        </div>

        <nav className="adm-nav" aria-label="Menu panel admin">
          {MENU.map((m) => (
            <NavLink key={m.to} to={m.to} end={m.end} className="adm-nav__item">
              <Icon name={m.icon} width={17} height={17} />
              {m.label}
            </NavLink>
          ))}
        </nav>

        <div className="adm-sisi__kaki">
          <NavLink to="/" className="adm-nav__item">
            <Icon name="external" width={17} height={17} />
            Lihat situs
          </NavLink>
          <button
            type="button"
            className="adm-nav__item adm-nav__item--keluar"
            onClick={keluar}
          >
            <Icon name="arrow-left" width={17} height={17} />
            Keluar
          </button>
          <p className="adm-sisi__akun">
            Masuk sebagai <strong>{admin.nama}</strong>
          </p>
        </div>
      </aside>

      <main className="adm-isi">
        <Outlet />
      </main>
    </div>
  )
}

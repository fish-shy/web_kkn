import { Link } from 'react-router-dom'
import { NAV, SITE, SOSMED, JAM_RINGKAS } from '../data/site'
import { Icon, type IconName } from './Icon'

const INFORMASI = [
  { label: 'Data & Statistik', to: '/data' },
  { label: 'Sejarah kelurahan', to: '/profil' },
  { label: 'Visi & misi', to: '/profil' },
  { label: 'Struktur organisasi', to: '/profil' },
  { label: 'Batas wilayah', to: '/profil' },
]

export function Footer() {
  const tahun = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__col footer__col--brand">
          <div className="footer__brand">
            <img
              className="brand__mark"
              src={SITE.logo}
              alt=""
              width={40}
              height={40}
            />
            <span className="brand__text">
              <span className="brand__kicker">{SITE.kicker}</span>
              <span className="brand__name">{SITE.short}</span>
            </span>
          </div>
          <p className="footer__about">
            Situs resmi {SITE.name}, {SITE.kecamatan}, {SITE.kota},{' '}
            {SITE.provinsi}. Sarana informasi dan pelayanan publik bagi warga.
          </p>
          <div className="footer__social">
            {SOSMED.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
              >
                <Icon name={s.icon as IconName} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer__col">
          <h4 className="footer__title">Menu</h4>
          <ul className="footer__list">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__title">Informasi</h4>
          <ul className="footer__list">
            {INFORMASI.map((i) => (
              <li key={i.label}>
                <Link to={i.to}>{i.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__title">Kontak</h4>
          <ul className="footer__list footer__contact">
            <li>
              <Icon name="map-pin" />
              <span>{SITE.alamat}</span>
            </li>
            <li>
              <Icon name="phone" />
              <a href={`tel:${SITE.telepon.replace(/\D/g, '')}`}>
                {SITE.telepon}
              </a>
            </li>
            <li>
              <Icon name="mail" />
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li>
              <Icon name="clock" />
              <span>
                {JAM_RINGKAS.map((j) => (
                  <span key={j.hari} style={{ display: 'block' }}>
                    {j.hari}: {j.jam}
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bar">
        <div className="container footer__bar-inner">
          <span>
            © {tahun} {SITE.name}. Hak cipta dilindungi.
          </span>
          <span>
            Motto <strong style={{ color: 'inherit' }}>{SITE.motto}</strong> ·{' '}
            <a href={SITE.maps} target="_blank" rel="noreferrer">
              Lihat lokasi di peta
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}

import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV, SITE } from '../data/site'
import { Icon } from './Icon'

function Brand({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link to="/" className="brand" onClick={onNavigate}>
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
    </Link>
  )
}

export function Navbar() {
  const [stuck, setStuck] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Tutup drawer setiap kali pindah halaman — disesuaikan saat render
  // (termasuk saat navigasi lewat tombol back/forward peramban).
  const [jalurTerakhir, setJalurTerakhir] = useState(pathname)
  if (jalurTerakhir !== pathname) {
    setJalurTerakhir(pathname)
    setOpen(false)
  }

  // Kunci scroll & tangani Esc saat drawer terbuka
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <header className={`header${stuck ? ' is-stuck' : ''}`}>
        <nav className="container nav" aria-label="Navigasi utama">
          <Brand />

          <ul className="nav__links">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `nav__link${isActive ? ' is-active' : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <Link to="/kontak" className="btn btn--primary btn--sm nav__cta">
            Hubungi Kami
          </Link>

          <button
            type="button"
            className="nav__toggle"
            aria-label="Buka menu navigasi"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Icon name="menu" />
          </button>
        </nav>
      </header>

      {open && (
        <div className="drawer" role="dialog" aria-modal="true" aria-label="Menu">
          <button
            type="button"
            className="drawer__scrim"
            aria-label="Tutup menu"
            onClick={() => setOpen(false)}
          />
          <div className="drawer__panel">
            <div className="drawer__head">
              <Brand onNavigate={() => setOpen(false)} />
              <button
                type="button"
                className="nav__toggle"
                aria-label="Tutup menu"
                onClick={() => setOpen(false)}
              >
                <Icon name="close" />
              </button>
            </div>

            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `drawer__link${isActive ? ' is-active' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/data"
              className={({ isActive }) =>
                `drawer__link${isActive ? ' is-active' : ''}`
              }
            >
              Data &amp; Statistik
            </NavLink>

            <div className="drawer__foot">
              <Link to="/kontak" className="btn btn--primary btn--block">
                Hubungi Kami
              </Link>
              <a
                href={SITE.whatsappLink}
                className="btn btn--ghost btn--block"
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="whatsapp" width={16} height={16} />
                Hubungi via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

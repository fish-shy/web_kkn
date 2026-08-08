import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { Icon } from './Icon'

/** Kembali ke atas setiap kali rute berubah (kecuali saat menuju anchor). */
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  return null
}

function BackToTop() {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      className={`to-top${shown ? ' is-shown' : ''}`}
      aria-label="Kembali ke atas halaman"
      aria-hidden={!shown}
      tabIndex={shown ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <Icon name="arrow-up" />
    </button>
  )
}

export function Layout() {
  return (
    <>
      <a className="skip-link" href="#konten">
        Lompat ke konten utama
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="konten">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}

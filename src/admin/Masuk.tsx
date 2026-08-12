import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { usePageMeta } from '../lib/usePageMeta'
import { useAuth } from '../lib/auth'
import { pesanGalat } from '../lib/api'
import { SITE } from '../data/site'
import { Kabar, useKabar } from './ui'

export default function Masuk() {
  usePageMeta('Masuk Panel Admin', undefined, { noindex: true })

  const { admin, memeriksa, masuk } = useAuth()
  const navigate = useNavigate()
  const lokasi = useLocation()
  const dari = (lokasi.state as { dari?: string } | null)?.dari ?? '/admin'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [sibuk, setSibuk] = useState(false)
  const [kabar, setKabar] = useKabar()

  if (admin && !memeriksa) return <Navigate to={dari} replace />

  const kirim = async (e: FormEvent) => {
    e.preventDefault()
    setSibuk(true)
    setKabar(null)
    try {
      await masuk(username.trim(), password)
      navigate(dari, { replace: true })
    } catch (err) {
      setKabar({ jenis: 'galat', teks: pesanGalat(err) })
    } finally {
      setSibuk(false)
    }
  }

  return (
    <div className="adm-masuk">
      <form className="adm-masuk__kartu" onSubmit={kirim}>
        <img src={SITE.logo} alt="" width={48} height={48} />
        <h1>Panel Admin</h1>
        <p className="adm-masuk__sub">{SITE.name}</p>

        <Kabar kabar={kabar} />

        <label className="field">
          <span className="field__label">Username</span>
          <input
            className="input"
            value={username}
            autoComplete="username"
            autoFocus
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label className="field">
          <span className="field__label">Kata sandi</span>
          <input
            className="input"
            type="password"
            value={password}
            autoComplete="current-password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button
          type="submit"
          className="btn btn--primary btn--block btn--mrg "
          disabled={sibuk}
          
        >
          {sibuk ? 'Memeriksa…' : 'Masuk'}
        </button>

        <Link to="/" className="adm-masuk__kembali">
          <Icon name="arrow-left" width={14} height={14} />
          Kembali ke situs
        </Link>
      </form>
    </div>
  )
}

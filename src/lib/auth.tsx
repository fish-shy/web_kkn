/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { ambilToken, api, simpanToken, type MasukHasil } from './api'

type Admin = MasukHasil['admin']

type Konteks = {
  admin: Admin | null
  /** Token sedang diperiksa ke server — jangan alihkan halaman dulu. */
  memeriksa: boolean
  masuk: (username: string, password: string) => Promise<void>
  keluar: () => void
}

const AuthCtx = createContext<Konteks | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [memeriksa, setMemeriksa] = useState(() => Boolean(ambilToken()))

  // Token di localStorage bisa saja sudah kedaluwarsa; pastikan ke server
  // sekali saat aplikasi dibuka. Tanpa token, `memeriksa` sudah bernilai false
  // sejak nilai awal — tak ada yang perlu diubah di sini.
  useEffect(() => {
    if (!ambilToken()) return

    const ac = new AbortController()
    api
      .saya(ac.signal)
      .then((r) => setAdmin(r.admin))
      .catch(() => {
        if (!ac.signal.aborted) {
          simpanToken(null)
          setAdmin(null)
        }
      })
      .finally(() => {
        if (!ac.signal.aborted) setMemeriksa(false)
      })

    return () => ac.abort()
  }, [])

  const masuk = useCallback(async (username: string, password: string) => {
    const hasil = await api.masuk(username, password)
    simpanToken(hasil.token)
    setAdmin(hasil.admin)
  }, [])

  const keluar = useCallback(() => {
    simpanToken(null)
    setAdmin(null)
  }, [])

  const nilai = useMemo(
    () => ({ admin, memeriksa, masuk, keluar }),
    [admin, memeriksa, masuk, keluar],
  )

  return <AuthCtx.Provider value={nilai}>{children}</AuthCtx.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthCtx)
  if (!ctx) throw new Error('useAuth harus dipakai di dalam <AuthProvider>')
  return ctx
}

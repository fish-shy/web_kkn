import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AuthProvider } from './lib/auth'
import Beranda from './pages/Beranda'
import Profil from './pages/Profil'
import Berita from './pages/Berita'
import BeritaDetail from './pages/BeritaDetail'
import Galeri from './pages/Galeri'
import EdukasiSampah from './pages/EdukasiSampah'
import DataStatistik from './pages/Data'
import Kontak from './pages/Kontak'
import NotFound from './pages/NotFound'
import AdminLayout from './admin/AdminLayout'
import Masuk from './admin/Masuk'
import Dasbor from './admin/Dasbor'
import AdminBerita from './admin/AdminBerita'
import FormBerita from './admin/FormBerita'
import AdminGaleri from './admin/AdminGaleri'
import AdminStatistik from './admin/AdminStatistik'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Situs publik */}
          <Route element={<Layout />}>
            <Route index element={<Beranda />} />
            <Route path="profil" element={<Profil />} />
            <Route path="berita" element={<Berita />} />
            <Route path="berita/:slug" element={<BeritaDetail />} />
            <Route path="galeri" element={<Galeri />} />
            <Route path="edukasi-sampah" element={<EdukasiSampah />} />
            <Route path="data" element={<DataStatistik />} />
            <Route path="kontak" element={<Kontak />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Panel admin — tata letaknya terpisah dari situs publik. */}
          <Route path="admin/masuk" element={<Masuk />} />
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Dasbor />} />
            <Route path="berita" element={<AdminBerita />} />
            <Route path="berita/baru" element={<FormBerita />} />
            <Route path="berita/:id" element={<FormBerita />} />
            <Route path="galeri" element={<AdminGaleri />} />
            <Route path="statistik" element={<AdminStatistik />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

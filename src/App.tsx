import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import Beranda from './pages/Beranda'
import Profil from './pages/Profil'
import Berita from './pages/Berita'
import BeritaDetail from './pages/BeritaDetail'
import Galeri from './pages/Galeri'
import DataStatistik from './pages/Data'
import Kontak from './pages/Kontak'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Beranda />} />
          <Route path="profil" element={<Profil />} />
          <Route path="berita" element={<Berita />} />
          <Route path="berita/:slug" element={<BeritaDetail />} />
          <Route path="galeri" element={<Galeri />} />
          <Route path="data" element={<DataStatistik />} />
          <Route path="kontak" element={<Kontak />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

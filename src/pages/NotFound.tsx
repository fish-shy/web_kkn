import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/usePageMeta'
import { Icon } from '../components/Icon'

export default function NotFound({ konteks }: { konteks?: 'berita' }) {
  usePageMeta('Halaman tidak ditemukan', undefined, { noindex: true })

  const berita = konteks === 'berita'

  return (
    <section className="section">
      <div className="container container--narrow notfound">
        <span className="notfound__code">404</span>
        <h1>{berita ? 'Berita tidak ditemukan' : 'Halaman tidak ditemukan'}</h1>
        <p className="lead" style={{ textAlign: 'center' }}>
          {berita
            ? 'Tautan berita yang Anda buka mungkin sudah diperbarui atau dihapus. Silakan telusuri daftar berita terbaru.'
            : 'Alamat yang Anda tuju tidak tersedia. Periksa kembali tautannya, atau mulai dari menu di bawah ini.'}
        </p>
        <div className="notfound__links">
          <Link to="/" className="btn btn--primary">
            <Icon name="home" width={16} height={16} />
            Kembali ke Beranda
          </Link>
          <Link to={berita ? '/berita' : '/profil'} className="btn btn--ghost">
            {berita ? 'Lihat semua berita' : 'Profil kelurahan'}
          </Link>
          <Link to="/kontak" className="btn btn--ghost">
            Hubungi kelurahan
          </Link>
        </div>
      </div>
    </section>
  )
}

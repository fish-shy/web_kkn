import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/usePageMeta'
import { Icon, type IconName } from '../components/Icon'
import { MapSketch } from '../components/MapSketch'
import { Thumb } from '../components/Thumb'
import { GLYPH } from '../lib/glyph'
import { ArrowLink, Reveal, SectionHead, Stat } from '../components/ui'
import { SITE, STAT_UTAMA } from '../data/site'
import { PROGRAM, TATA_RUANG } from '../data/profil'
import { BERITA_TERBARU } from '../data/berita'
import { GALERI_BERANDA } from '../data/galeri'
import { tanggalPanjang } from '../lib/format'

export default function Beranda() {
  usePageMeta('Beranda', SITE.description)

  const sorotan = BERITA_TERBARU.slice(0, 3)

  return (
    <>
      {/* ------------------------------------------------------------ HERO */}
      <section className="home-hero">
        <div className="hero-card">
          <div className="hero-card__top">
            <div className="hero-card__main">
              <span className="eyebrow eyebrow--light">
                {SITE.kecamatan} · {SITE.kota}
              </span>
              <h1 className="hero-card__title">
                Kelurahan
                <br />
                Landasan Ulin Tengah
              </h1>
              <p className="hero-card__lead">
                Menyajikan informasi yang dibutuhkan warga: persyaratan layanan,
                agenda kegiatan, sampai data wilayah — terbuka dan mudah diakses
                kapan saja.
              </p>
              <div className="hero-card__actions">
                <Link to="/profil" className="btn btn--primary btn--lg">
                  Jelajahi Profil Kelurahan
                </Link>
                <Link to="/berita" className="btn btn--outline-light btn--lg">
                  Lihat Kegiatan
                </Link>
              </div>
              <span className="hero-card__note">
                <Icon name="map-pin" />
                {SITE.alamat}
              </span>
            </div>
          </div>

          <div className="hero-card__stats ">
            {STAT_UTAMA.map((s) => (
              <Stat key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- TENTANG */}
      <section className="section">
        <div className="container split">
          <Reveal className="split__media">
            <img
              src={SITE.foto}
              alt="Foto Kelurahan Landasan Ulin Tengah"
              style={{
                width: '100%',
                aspectRatio: '4 / 3',
                objectFit: 'cover',
                background: 'var(--cream-100)', 
              }}
            />
          </Reveal>

          <Reveal className="split__body" delay={80}>
            <span className="eyebrow">Tentang kami</span>
            <h2>Menghadirkan layanan publik yang lebih dekat dan transparan</h2>
            <p>
              Kelurahan Landasan Ulin Tengah berada di {SITE.kecamatan},{' '}
              {SITE.kota}, {SITE.provinsi}. Sebagai unit pemerintahan terdepan,
              kelurahan menjadi tempat warga mengurus berbagai keperluan
              administrasi sekaligus ruang bermusyawarah menentukan arah
              pembangunan lingkungan.
            </p>
            <p>
              Sejak 21 November 2022 kelurahan juga ditetapkan sebagai lokus
              Kampung Keluarga Berkualitas dengan klasifikasi Berkembang. Situs
              ini disiapkan agar data wilayah dan setiap kegiatan yang berjalan
              dapat diikuti warga secara terbuka.
            </p>
            <Link to="/profil" className="btn btn--ghost">
              Selengkapnya tentang kelurahan
              <Icon name="arrow-right" width={16} height={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------- WILAYAH */}
      <section className="section section--cream">
        <div className="container">
          <SectionHead
            eyebrow="Gambaran wilayah"
            title="Sekilas tentang wilayah kami"
          />

          <div className="wilayah">
            <Reveal className="wilayah__copy">
              <p>
                Wilayah kelurahan seluas 1.818,00 hektare dan terbagi ke dalam 3
                Rukun Warga serta 16 Rukun Tetangga. Letaknya sekitar 9 kilometer
                dari pusat pemerintahan Kota Banjarbaru, di lingkup Kecamatan
                Liang Anggang.
              </p>
              <p>
                Menurut konsep tata ruang Kota Banjarbaru, Landasan Ulin Tengah
                diarahkan sebagai kawasan perumahan dan permukiman sekaligus
                kawasan pergudangan dan industri, dan menjadi salah satu
                kelurahan berpenduduk terpadat di Kecamatan Liang Anggang.
              </p>

              <div className="wilayah__map">
                <MapSketch />
                <div className="wilayah__map-foot">
                  <span>
                    Sketsa orientasi wilayah — bukan peta berskala resmi.
                  </span>
                  <a href={SITE.maps} target="_blank" rel="noreferrer">
                    <ArrowLink>Buka di Google Maps</ArrowLink>
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="panel">
                <p className="panel__title">Arahan tata ruang</p>
                <p className="panel__sub">
                  Peruntukan wilayah menurut konsep tata ruang Kota Banjarbaru.
                </p>
                <div className="split__points" style={{ marginTop: 0 }}>
                  {TATA_RUANG.map((t) => (
                    <div key={t.nama} className="contact-item">
                      <span className="icon-tile">
                        <Icon name={t.icon as IconName} />
                      </span>
                      <span>
                        <span className="card__title" style={{ display: 'block' }}>
                          {t.nama}
                        </span>
                        <span className="card__text">{t.teks}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel panel--forest" style={{ marginTop: '1rem' }}>
                <p className="panel__title">Butuh data lebih rinci?</p>
                <p className="panel__sub" style={{ marginBottom: '1rem' }}>
                  Sebaran penduduk per RT, tingkat pendidikan, kepesertaan KB,
                  serta sarana Kampung KB tersedia di halaman data.
                </p>
                <Link to="/data" className="btn btn--primary btn--sm">
                  Buka Data &amp; Statistik
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- PROGRAM */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Program unggulan"
            title="Program &amp; potensi kelurahan"
            lead="Kegiatan lintas sektor yang sedang berjalan bersama warga, kader, dan lembaga kemasyarakatan."
            action={
              <Link to="/berita">
                <ArrowLink>Lihat semua program</ArrowLink>
              </Link>
            }
          />

          <div className="grid-3">
            {PROGRAM.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <Link to={p.to} className="card card--link" style={{ height: '100%' }}>
                  <div className="card__body">
                    <span
                      className={`icon-tile${i === 2 ? ' icon-tile--clay' : ''}`}
                    >
                      <Icon name={p.icon as IconName} />
                    </span>
                    <h3 className="card__title">{p.title}</h3>
                    <p className="card__text">{p.text}</p>
                    <span className="card__foot">
                      <ArrowLink>Selengkapnya</ArrowLink>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- KEGIATAN */}
      <section className="section kegiatan">
        <div className="container">
          <SectionHead
            light
            eyebrow="Berita &amp; kegiatan"
            title="Kegiatan terbaru di kelurahan"
            action={
              <Link to="/berita" className="btn btn--outline-light btn--sm">
                Arsip kegiatan
              </Link>
            }
          />

          <div className="grid-3">
            {sorotan.map((b, i) => (
              <Reveal key={b.slug} delay={i * 90}>
                <Link
                  to={`/berita/${b.slug}`}
                  className="news-card"
                  style={{ height: '100%' }}
                >
                  <Thumb
                    seed={b.slug}
                    src={b.foto}
                    alt={b.judul}
                    glyph={GLYPH[b.kategori]}
                    ratio="16 / 10"
                  />
                  <div className="news-card__body">
                    <span className="badge badge--solid">{b.kategori}</span>
                    <h3 className="news-card__title">{b.judul}</h3>
                    <span className="news-card__meta">
                      {tanggalPanjang(b.tanggal)}
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- GALERI */}
      <section className="section section--cream">
        <div className="container">
          <SectionHead
            eyebrow="Dokumentasi"
            title="Galeri kegiatan warga"
            action={
              <Link to="/galeri">
                <ArrowLink>Buka galeri</ArrowLink>
              </Link>
            }
          />

          <div className="gal-strip">
            {GALERI_BERANDA.map((g, i) => (
              <Reveal key={g.id} delay={(i % 4) * 70}>
                <Link to="/galeri" className="gal-tile" title={g.judul}>
                  <img src={g.foto} alt={g.judul} loading="lazy" />
                  <span className="gal-tile__cap">{g.ringkas}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- CTA */}
      <section className="section section--tight">
        <div className="container">
          <Reveal className="cta-band">
            <div className="cta-band__copy">
              <h2>Butuh surat pengantar atau layanan administrasi?</h2>
              <p>
                Tanyakan lebih dulu persyaratannya lewat WhatsApp atau formulir
                kontak supaya berkas Anda lengkap saat datang ke kantor
                kelurahan. Semua layanan tidak dipungut biaya.
              </p>
            </div>
            <div className="cta-band__actions">
              <Link to="/kontak" className="btn btn--primary btn--lg">
                Hubungi Kelurahan
              </Link>
              <a
                href={SITE.whatsappLink}
                className="btn btn--outline-light btn--lg"
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="whatsapp" width={16} height={16} />
                Tanya via WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

    </>
  )
}

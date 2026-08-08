import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { usePageMeta } from '../lib/usePageMeta'
import { Icon, IconSolid } from '../components/Icon'
import { ArrowLink, DataRow, Reveal, SectionHead } from '../components/ui'
import { KAMPUNG_KB, SITE, SUMBER_DATA } from '../data/site'
import {
  BATAS,
  DATA_POKOK,
  MISI,
  POTENSI,
  RENCANA_KERJA,
  SEJARAH,
  STRUKTUR,
  VISI,
} from '../data/profil'
import { LEMBAGA } from '../data/statistik'
import { angka } from '../lib/format'

export default function Profil() {
  usePageMeta(
    'Profil Kelurahan',
    'Sejarah, visi dan misi, struktur organisasi, batas wilayah, serta data pokok Kelurahan Landasan Ulin Tengah.',
  )

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Beranda', to: '/' }, { label: 'Profil Kelurahan' }]}
        eyebrow="Tentang kelurahan"
        title="Profil Kelurahan"
        lead={`Sejarah pembentukan, arah kerja, susunan organisasi, dan gambaran wilayah ${SITE.name}.`}
        meta={[
          { icon: 'map-pin', text: `${SITE.kecamatan}, ${SITE.kota}` },
          { icon: 'layers', text: 'Luas 1.818,00 hektare' },
          { icon: 'users', text: '9.063 jiwa penduduk' },
          {
            icon: 'calendar',
            text: `Kampung KB sejak ${KAMPUNG_KB.pencanangan}`,
          },
        ]}
      />

      {/* ------------------------------------------------------- SEJARAH */}
      <section className="section">
        <div className="container two-col">
          <Reveal className="two-col__sticky">
            <span className="eyebrow">Sejarah</span>
            <h2>Perjalanan pembentukan kelurahan</h2>
            <p className="lead">
              Dibentuk melalui Peraturan Daerah Kota Banjarbaru Nomor 2 Tahun
              2004, Landasan Ulin Tengah kini menjadi salah satu kelurahan
              berpenduduk terpadat di Kecamatan Liang Anggang.
            </p>
            <Link to="/data" className="btn btn--ghost btn--sm">
              Lihat data wilayah
              <Icon name="arrow-right" width={15} height={15} />
            </Link>
          </Reveal>

          <div className="timeline">
            {SEJARAH.map((s, i) => (
              <Reveal key={s.tahun} className="timeline__item" delay={i * 70}>
                <span className="timeline__year">{s.tahun}</span>
                <div>
                  <h3 className="timeline__title">{s.judul}</h3>
                  <p className="timeline__text">{s.teks}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- VISI & MISI */}
      <section className="section section--cream">
        <div className="container">
          <SectionHead
            eyebrow="Arah kerja"
            title="Visi &amp; Misi kelurahan"
            lead="Rumusan arah pembangunan yang menjadi acuan seluruh program dan pelayanan kelurahan."
          />

          <div className="grid-2">
            <Reveal>
              <div className="visi-card">
                <IconSolid name="quote" className="visi-card__mark" />
                <p className="visi-card__quote">&ldquo;{VISI}&rdquo;</p>
                <p className="visi-card__foot">
                  Visi Kelurahan Landasan Ulin Tengah
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <ul className="misi-list">
                {MISI.map((m, i) => (
                  <li key={m}>
                    <span className="misi-list__num">{i + 1}</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- STRUKTUR */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Organisasi"
            title="Struktur organisasi kelurahan"
            lead="Susunan perangkat kelurahan beserta pembagian tugas pokoknya."
          />

          <Reveal>
            <div className="panel panel--cream">
              <div className="org">
                <div className="org__node org__node--lead">
                  <span className="org__role">{STRUKTUR.lurah.role}</span>
                  <span className="org__name">{STRUKTUR.lurah.name}</span>
                </div>
                <span className="org__connector" />
                <div className="org__node org__node--alt">
                  <span className="org__role">{STRUKTUR.sekretaris.role}</span>
                  <span className="org__name">{STRUKTUR.sekretaris.name}</span>
                </div>

                <div className="org__branch">
                  {STRUKTUR.seksi.map((s) => (
                    <div key={s.role} className="org__leaf">
                      {s.role}
                      <small>{s.note}</small>
                    </div>
                  ))}
                </div>
              </div>

              <p
                className="form-note"
                style={{ marginTop: '1.75rem', textAlign: 'center' }}
              >
                Nama pejabat pada tiap jabatan menyesuaikan surat keputusan yang
                berlaku. Hubungi kantor kelurahan untuk informasi terbaru.
              </p>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="grid-3" style={{ marginTop: '1.5rem' }}>
              {[
                {
                  icon: 'target' as const,
                  t: 'Tugas pokok',
                  d: 'Menyelenggarakan urusan pemerintahan, pelayanan publik, dan pemberdayaan masyarakat di tingkat kelurahan.',
                },
                {
                  icon: 'shield' as const,
                  t: 'Kewenangan',
                  d: 'Melaksanakan kegiatan pemerintahan yang dilimpahkan Camat serta menjaga ketenteraman dan ketertiban umum.',
                },
                {
                  icon: 'users' as const,
                  t: 'Kemitraan',
                  d: 'Bekerja bersama RT, RW, LPM, PKK, Karang Taruna, dan kader Posyandu dalam setiap program kelurahan.',
                },
              ].map((c) => (
                <div key={c.t} className="card">
                  <div className="card__body">
                    <span className="icon-tile icon-tile--forest">
                      <Icon name={c.icon} />
                    </span>
                    <h3 className="card__title">{c.t}</h3>
                    <p className="card__text">{c.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------- BATAS & DATA POKOK */}
      <section className="section section--cream">
        <div className="container">
          <SectionHead
            eyebrow="Geografis"
            title="Batas dan data pokok wilayah"
            lead="Wilayah kelurahan berbatasan dengan kelurahan lain di sekitarnya serta Desa Pandahan, Kecamatan Bati-Bati."
          />

          <div className="batas">
            <Reveal>
              <div className="panel" style={{ height: '100%' }}>
                <p className="panel__title">Batas wilayah</p>
                <p className="panel__sub">
                  Berdasarkan data administrasi kelurahan.
                </p>
                {BATAS.map((b) => (
                  <div key={b.label} className="compass-row">
                    <span className="compass-row__dir" aria-hidden="true">
                      {b.arah}
                    </span>
                    <span>
                      <span className="compass-row__label">{b.label}</span>
                      <span
                        className="compass-row__value"
                        style={{ display: 'block' }}
                      >
                        {b.value}
                      </span>
                    </span>
                  </div>
                ))}

                <div
                  style={{
                    marginTop: '1.5rem',
                    paddingTop: '1.25rem',
                    borderTop: '1px solid var(--line)',
                  }}
                >
                  <span className="compass-row__label">Koordinat perkiraan</span>
                  <span className="compass-row__value" style={{ display: 'block' }}>
                    {SITE.koordinat.lat}° LS, {SITE.koordinat.lng}° BT
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="panel panel--forest" style={{ height: '100%' }}>
                <p className="panel__title">Data pokok</p>
                <p className="panel__sub">Sumber: {SUMBER_DATA}.</p>
                {DATA_POKOK.map((d) => (
                  <DataRow key={d.key} k={d.key} v={d.val} ondark />
                ))}
                <div style={{ marginTop: '1.5rem' }}>
                  <Link to="/data" className="btn btn--primary btn--sm">
                    Rincian data kependudukan
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- LEMBAGA */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Kelembagaan"
            title="Lembaga dan jaringan kelurahan"
            lead="Struktur lingkungan serta pengurus Kampung Keluarga Berkualitas yang menggerakkan kegiatan warga."
            action={
              <Link to="/data">
                <ArrowLink>Rincian sarana &amp; posyandu</ArrowLink>
              </Link>
            }
          />

          <div className="grid-4">
            {LEMBAGA.map((l, i) => (
              <Reveal key={l.name} delay={(i % 4) * 80}>
                <div className="stat-card">
                  <span className="icon-tile stat-card__icon">
                    <Icon name="users" />
                  </span>
                  <span className="stat__value">{angka(l.jml)}</span>
                  <span className="stat__label">{l.name}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- POTENSI */}
      <section className="section section--cream">
        <div className="container">
          <SectionHead
            eyebrow="Potensi lokal"
            title="Kekuatan ekonomi dan masyarakat"
            lead="Sektor usaha yang menopang keluarga di kelurahan serta arah pengembangannya."
          />
          <div className="grid-2">
            {POTENSI.map((p, i) => (
              <Reveal key={p.judul} delay={(i % 2) * 90}>
                <div className="panel" style={{ height: '100%' }}>
                  <p className="panel__title">{p.judul}</p>
                  <p className="card__text">{p.teks}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- RENCANA KERJA */}
      <section className="section section--forest">
        <div className="container">
          <SectionHead
            light
            eyebrow="Rencana kerja"
            title="Empat prioritas Kampung Keluarga Berkualitas"
            lead="Agenda utama Pokja bersama kader, penyuluh KB, dan lintas sektor."
          />
          <div className="steps">
            {RENCANA_KERJA.map((r, i) => (
              <Reveal key={r.judul} className="step" delay={i * 80}>
                <span className="step__num">{i + 1}</span>
                <span className="step__title">{r.judul}</span>
                <span className="step__text">{r.teks}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight" style={{ paddingTop: 50 }}>
        <div className="container">
          <Reveal className="cta-band">
            <div className="cta-band__copy">
              <h2>Ada informasi profil yang perlu diperbarui?</h2>
              <p>
                Sampaikan masukan Anda agar data yang tampil di situs ini tetap
                sesuai dengan kondisi terkini di lapangan.
              </p>
            </div>
            <div className="cta-band__actions">
              <Link to="/kontak" className="btn btn--primary btn--lg">
                Kirim Masukan
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

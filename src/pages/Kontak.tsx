import { useState, type FormEvent } from 'react'
import { PageHero } from '../components/PageHero'
import { usePageMeta } from '../lib/usePageMeta'
import { Icon, type IconName } from '../components/Icon'
import { Reveal, SectionHead } from '../components/ui'
import { JAM_RINGKAS, SITE, SOSMED } from '../data/site'

const KEPERLUAN = [
  'Pertanyaan layanan administrasi',
  'Pengaduan pelayanan',
  'Usulan pembangunan lingkungan',
  'Permintaan data / informasi publik',
  'Kerja sama & kegiatan',
  'Lainnya',
]

const KONTAK: { icon: IconName; label: string; value: React.ReactNode }[] = [
  {
    icon: 'map-pin',
    label: 'Alamat kantor',
    value: SITE.alamat,
  },
  {
    icon: 'phone',
    label: 'Telepon',
    value: (
      <a href={`tel:${SITE.telepon.replace(/\D/g, '')}`}>{SITE.telepon}</a>
    ),
  },
  {
    icon: 'whatsapp',
    label: 'WhatsApp',
    value: (
      <a href={SITE.whatsappLink} target="_blank" rel="noreferrer">
        {SITE.whatsapp}
      </a>
    ),
  },
  {
    icon: 'mail',
    label: 'Surel',
    value: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>,
  },
]

export default function Kontak() {
  usePageMeta(
    'Kontak',
    `Alamat, nomor telepon, jam pelayanan, dan formulir pengaduan ${SITE.name}.`,
  )

  const [terkirim, setTerkirim] = useState(false)

  const kirim = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const nama = String(f.get('nama') ?? '')
    const keperluan = String(f.get('keperluan') ?? '')
    const pesan = String(f.get('pesan') ?? '')
    const kontak = String(f.get('kontak') ?? '')

    const body = [
      `Nama: ${nama}`,
      `Kontak: ${kontak}`,
      `Keperluan: ${keperluan}`,
      '',
      pesan,
    ].join('\n')

    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      `[Situs Kelurahan] ${keperluan}`,
    )}&body=${encodeURIComponent(body)}`

    setTerkirim(true)
  }

  const { lat, lng } = SITE.koordinat
  const d = 0.02
  const bbox = `${lng - d}%2C${lat - d}%2C${lng + d}%2C${lat + d}`

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Beranda', to: '/' }, { label: 'Kontak' }]}
        eyebrow="Hubungi kami"
        title="Kontak &amp; Lokasi"
        lead="Sampaikan pertanyaan, pengaduan, atau usulan Anda. Kami membalas pada hari kerja."
        meta={[
          { icon: 'clock', text: 'Senin – Jumat, jam kerja' },
          { icon: 'map-pin', text: `${SITE.kecamatan}, ${SITE.kota}` },
        ]}
      />

      <section className="section">
        <div className="container kontak">
          {/* ------------------------------------------------ INFO KONTAK */}
          <Reveal>
            <span className="eyebrow">Informasi kontak</span>
            <h2 style={{ margin: '0.85rem 0 1.25rem' }}>
              Datang, telepon, atau kirim pesan
            </h2>

            <div className="contact-list">
              {KONTAK.map((k) => (
                <div key={k.label} className="contact-item">
                  <span className="icon-tile">
                    <Icon name={k.icon} />
                  </span>
                  <span>
                    <span
                      className="contact-item__label"
                      style={{ display: 'block' }}
                    >
                      {k.label}
                    </span>
                    <span className="contact-item__value">{k.value}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="panel panel--cream" style={{ marginTop: '1.5rem' }}>
              <p className="panel__title">Jam pelayanan</p>
              <p className="panel__sub">
                Loket pelayanan tutup pada hari libur nasional.
              </p>
              {JAM_RINGKAS.map((j) => (
                <div key={j.hari} className="datarow">
                  <span className="datarow__key">{j.hari}</span>
                  <span className="datarow__val">{j.jam}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <p className="contact-item__label">Media sosial</p>
              <div className="footer__social" style={{ marginTop: '0.6rem' }}>
                {SOSMED.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    style={{
                      borderColor: 'var(--line)',
                      color: 'var(--forest-800)',
                    }}
                  >
                    <Icon name={s.icon as IconName} />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* ---------------------------------------------------- FORMULIR */}
          <Reveal delay={90}>
            <div className="panel">
              <p className="panel__title">Formulir pesan</p>
              <p className="panel__sub">
                Isi formulir berikut. Pesan akan dibuka di aplikasi surel Anda
                dan dikirim ke alamat resmi kelurahan.
              </p>

              {terkirim && (
                <div className="form-alert" style={{ marginBottom: '1.25rem' }}>
                  <Icon name="check-circle" />
                  <span>
                    Aplikasi surel Anda sedang dibuka. Bila tidak muncul, kirim
                    manual ke <strong>{SITE.email}</strong> atau hubungi kami
                    lewat WhatsApp.
                  </span>
                </div>
              )}

              <form className="form-grid" onSubmit={kirim}>
                <div className="field">
                  <label className="field__label" htmlFor="nama">
                    Nama lengkap <span className="req">*</span>
                  </label>
                  <input
                    className="input"
                    id="nama"
                    name="nama"
                    required
                    placeholder="Nama sesuai KTP"
                  />
                </div>

                <div className="field">
                  <label className="field__label" htmlFor="kontak">
                    Nomor HP / surel <span className="req">*</span>
                  </label>
                  <input
                    className="input"
                    id="kontak"
                    name="kontak"
                    required
                    placeholder="08xx atau nama@email.com"
                  />
                </div>

                <div className="field field--full">
                  <label className="field__label" htmlFor="keperluan">
                    Keperluan <span className="req">*</span>
                  </label>
                  <select className="select" id="keperluan" name="keperluan" required>
                    {KEPERLUAN.map((k) => (
                      <option key={k}>{k}</option>
                    ))}
                  </select>
                </div>

                <div className="field field--full">
                  <label className="field__label" htmlFor="pesan">
                    Isi pesan <span className="req">*</span>
                  </label>
                  <textarea
                    className="textarea"
                    id="pesan"
                    name="pesan"
                    required
                    placeholder="Tuliskan pertanyaan, pengaduan, atau usulan Anda selengkap mungkin."
                  />
                </div>

                <div className="field field--full">
                  <button type="submit" className="btn btn--primary">
                    <Icon name="send" width={16} height={16} />
                    Kirim pesan
                  </button>
                  <p className="form-note" style={{ marginTop: '0.75rem' }}>
                    Dengan mengirim pesan, Anda setuju data yang dicantumkan
                    digunakan untuk menindaklanjuti keperluan tersebut.
                  </p>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------- PETA */}
      <section className="section section--cream">
        <div className="container">
          <SectionHead
            eyebrow="Lokasi"
            title="Kantor Kelurahan Landasan Ulin Tengah"
            lead={SITE.alamat}
            action={
              <a
                href={SITE.maps}
                target="_blank"
                rel="noreferrer"
                className="btn btn--ghost btn--sm"
              >
                <Icon name="external" width={15} height={15} />
                Buka di Google Maps
              </a>
            }
          />
          <Reveal>
            <div className="map-frame">
              <iframe
                title="Peta lokasi Kelurahan Landasan Ulin Tengah"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`}
              />
              <div className="wilayah__map-foot">
                <span>
                  Titik peta merupakan perkiraan. Gunakan tautan Google Maps
                  untuk navigasi.
                </span>
                <span>
                  {lat}, {lng}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

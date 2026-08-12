import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { useSeoRute } from '../lib/usePageMeta'
import { Icon } from '../components/Icon'
import { PilahSampah } from '../components/PilahSampah'
import { ArrowLink, Reveal, SectionHead } from '../components/ui'
import { FAKTA, KATEGORI, LANGKAH } from '../data/sampah'

export default function EdukasiSampah() {
  useSeoRute('/edukasi-sampah')

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Beranda', to: '/' }, { label: 'Edukasi Sampah' }]}
        eyebrow="KKN Tematik"
        title="Pilah Sampah dari Rumah"
        lead="Sampah yang dipilah sejak dari dapur tidak lagi jadi beban — sebagiannya kembali jadi kompos, sebagian lagi jadi tabungan warga di bank sampah."
        meta={[
          { icon: 'recycle', text: 'Program pemilahan berbasis warga' },
          { icon: 'map-pin', text: '4 drop point di 2 rukun warga' },
        ]}
      />

      {/* --------------------------------------------------------- KENAPA */}
      <section className="section">
        <div className="container split">
          <Reveal className="split__body">
            <span className="eyebrow">Kenapa harus dipilah</span>
            <h2>Sampah tercampur kehilangan hampir seluruh nilainya</h2>
            <p>
              Botol plastik yang bersih bisa disetor ke bank sampah dan menjadi
              tabungan. Botol yang sama, begitu terkena sisa kuah dan tercampur
              popok, berhenti menjadi barang bernilai dan berakhir di tempat
              pembuangan akhir.
            </p>
            <p>
              Kelurahan Landasan Ulin Tengah menjalankan pemilahan dua aliran —
              organik dan anorganik — dengan jalur pengumpulan yang terpisah.
              Sampah anorganik diintegrasikan dengan Bank Sampah Hidayah RT 2
              RW 1, sedangkan sampah organik dialirkan ke bank sampah organik
              yang dikelola bersama Tim Penggerak PKK kelurahan.
            </p>
            <Link to="/berita/bank-sampah-organik-berbasis-warga" className="btn btn--ghost">
              Baca beritanya
              <Icon name="arrow-right" width={16} height={16} />
            </Link>
          </Reveal>

          <Reveal delay={90}>
            <div className="panel panel--forest">
              <p className="panel__title">Program pemilahan kelurahan</p>
              <p className="panel__sub" style={{ marginBottom: '1.25rem' }}>
                Angka yang sedang berjalan di lapangan.
              </p>
              <div className="fakta-grid">
                {FAKTA.map((f) => (
                  <div key={f.label} className="fakta">
                    <span className="fakta__angka">{f.angka}</span>
                    <span className="fakta__label">{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------ PERMAINAN */}
      <section className="section section--cream">
        <div className="container">
          <SectionHead
            eyebrow="Uji pemahaman"
            title="Permainan: tebak tempat sampahnya"
            lead="Sepuluh barang yang biasa ada di rumah. Pilih tempat sampah yang benar — setiap jawaban langsung disertai alasannya, jadi yang salah pun tetap menambah pengetahuan."
          />
          <Reveal>
            <PilahSampah />
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- PANDUAN */}
      <section className="section" id="panduan">
        <div className="container">
          <SectionHead
            eyebrow="Panduan"
            title="Empat kategori dan cara menanganinya"
            lead="Program kelurahan memilah dua aliran, organik dan anorganik. Dua kategori lainnya tetap perlu dikenali supaya tidak ikut tercampur ke dalamnya."
          />

          <div className="grid-4">
            {KATEGORI.map((k, i) => (
              <Reveal key={k.id} delay={(i % 4) * 70}>
                <div className="kategori-kartu" style={{ ['--kat-warna' as string]: k.warna }}>
                  <span className="kategori-kartu__ikon">
                    <Icon name={k.icon} />
                  </span>
                  <h3 className="kategori-kartu__nama">{k.nama}</h3>
                  <p className="kategori-kartu__ringkas">{k.ringkas}</p>

                  <ul className="kategori-kartu__contoh">
                    {k.contoh.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>

                  <p className="kategori-kartu__penanganan">{k.penanganan}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- LANGKAH */}
      <section className="section section--cream">
        <div className="container">
          <SectionHead
            eyebrow="Mulai hari ini"
            title="Empat langkah di rumah"
            lead="Tidak perlu alat khusus maupun biaya. Yang dibutuhkan hanya kebiasaan baru yang dijalankan setiap hari."
          />

          <div className="grid-4">
            {LANGKAH.map((l, i) => (
              <Reveal key={l.judul} delay={(i % 4) * 70}>
                <div className="langkah">
                  <span className="langkah__nomor">{i + 1}</span>
                  <span className="icon-tile">
                    <Icon name={l.icon} />
                  </span>
                  <h3 className="card__title">{l.judul}</h3>
                  <p className="card__text">{l.teks}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="form-alert" style={{ marginTop: '1.75rem' }}>
              <Icon name="info" />
              <span>
                Belum tahu drop point terdekat? Tanyakan kepada pengurus RT
                masing-masing, atau hubungi kantor kelurahan lewat{' '}
                <Link to="/kontak" style={{ textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                  halaman Kontak
                </Link>
                .
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------ CTA */}
      <section className="section section--tight">
        <div className="container">
          <Reveal className="cta-band">
            <div className="cta-band__copy">
              <h2>Ajak satu tetangga mencoba permainannya</h2>
              <p>
                Program pemilahan ini menyasar sekitar 200 kepala keluarga.
                Semakin banyak rumah yang memilah sejak dari dapur, semakin
                sedikit sampah yang harus diangkut ke tempat pembuangan akhir.
              </p>
            </div>
            <div className="cta-band__actions">
              <Link to="/galeri" className="btn btn--primary btn--lg">
                Lihat kegiatan warga
              </Link>
              <Link to="/berita" className="btn btn--outline-light btn--lg">
                <ArrowLink light>Berita kelurahan</ArrowLink>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

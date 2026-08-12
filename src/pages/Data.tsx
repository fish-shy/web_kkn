import { PageHero } from '../components/PageHero'
import { useSeoRute } from '../lib/usePageMeta'
import { Icon, type IconName } from '../components/Icon'
import { GalatKotak, Memuat, Meter, Reveal, SectionHead } from '../components/ui'
import { jumlah } from '../data/statistik'
import { useStatistik } from '../lib/sumber'
import { KAMPUNG_KB, SUMBER_DATA } from '../data/site'
import { angka, persen } from '../lib/format'

export default function DataStatistik() {
  useSeoRute('/data')

  const { data, memuat, galat, ulangi } = useStatistik()
  const {
    gambaranUmum: GU,
    statistikKampung: SK,
    pendudukRt,
    pendidikan,
    kepesertaanKb,
    sarana,
    posyandu,
  } = data

  // Jumlah baris tabel per RT — sengaja dihitung ulang, bukan memakai angka
  // total dari sumber, agar selisih di antara keduanya terlihat apa adanya.
  const rtKK = jumlah(pendudukRt, (r) => r.kk)
  const rtJiwa = jumlah(pendudukRt, (r) => r.jiwa)
  const adaSelisih =
    pendudukRt.length > 0 &&
    (rtKK !== GU.totalResmiKk || rtJiwa !== GU.totalResmiJiwa)

  const didikL = jumlah(pendidikan, (r) => r.l)
  const didikP = jumlah(pendidikan, (r) => r.p)
  const didikTotal = didikL + didikP

  const totalPus = jumlah(kepesertaanKb, (r) => r.jml)

  const ringkas: { icon: IconName; v: string; l: string }[] = [
    { icon: 'users', v: angka(GU.penduduk), l: 'Jiwa penduduk' },
    { icon: 'home', v: angka(GU.kk), l: 'Kepala keluarga' },
    { icon: 'layers', v: GU.luasWilayah, l: 'Luas wilayah' },
    { icon: 'building', v: GU.rtRw, l: 'RT / RW' },
    { icon: 'rings', v: angka(GU.pus), l: 'Pasangan usia subur' },
    { icon: 'map-pin', v: GU.jarakPusatKota, l: 'Jarak ke pusat kota' },
  ]

  const sasaran: { icon: IconName; v: number; l: string }[] = [
    { icon: 'baby', v: GU.balitaStunting, l: 'Balita gizi kurang / stunting' },
    { icon: 'heart', v: GU.ibuHamil, l: 'Ibu hamil terdata' },
    { icon: 'book', v: GU.remaja, l: 'Remaja' },
    { icon: 'users', v: GU.lansia, l: 'Lanjut usia' },
  ]

  const kosong = memuat && pendudukRt.length === 0

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Beranda', to: '/' }, { label: 'Data & Statistik' }]}
        eyebrow="Informasi publik"
        title="Data &amp; Statistik Wilayah"
        lead="Gambaran kependudukan, kelompok sasaran, dan sarana Kampung Keluarga Berkualitas Kelurahan Landasan Ulin Tengah, disajikan terbuka agar dapat digunakan warga, mahasiswa, dan mitra pembangunan."
        meta={[
          { icon: 'file-text', text: `Sumber: ${SUMBER_DATA}` },
          {
            icon: 'calendar',
            text: `Dicanangkan ${KAMPUNG_KB.pencanangan} · klasifikasi ${KAMPUNG_KB.klasifikasi}`,
          },
        ]}
      />

      {(galat || kosong) && (
        <section className="section">
          <div className="container">
            {galat ? (
              <GalatKotak pesan={galat} onUlangi={ulangi} />
            ) : (
              <Memuat teks="Memuat data statistik…" />
            )}
          </div>
        </section>
      )}

      {!kosong && (
        <>
          {/* ------------------------------------------------------- RINGKASAN */}
          <section className="section">
            <div className="container">
              <SectionHead
                eyebrow="Ringkasan"
                title="Angka pokok kelurahan"
                lead="Rekapitulasi kondisi wilayah dan kependudukan sesuai tabel Gambaran Umum pada profil Kampung Keluarga Berkualitas."
              />
              <div className="grid-3">
                {ringkas.map((r, i) => (
                  <Reveal key={r.l} delay={(i % 3) * 70}>
                    <div className="stat-card">
                      <span className="icon-tile stat-card__icon">
                        <Icon name={r.icon} />
                      </span>
                      <span className="stat__value">{r.v}</span>
                      <span className="stat__label">{r.l}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------------- PER RT */}
          <section className="section section--cream">
            <div className="container">
              <SectionHead
                eyebrow="Sebaran"
                title="Penduduk per rukun tetangga"
                lead={`Rincian jumlah kepala keluarga dan jiwa pada ${pendudukRt.length} RT yang tersebar di kelurahan.`}
              />
              <Reveal>
                <div className="table-wrap">
                  <div className="table-scroll">
                    <table className="data-table">
                      <caption className="sr-only">
                        Jumlah kepala keluarga dan penduduk untuk setiap RT
                      </caption>
                      <thead>
                        <tr>
                          <th scope="col">RT / RW</th>
                          <th scope="col">Kepala keluarga</th>
                          <th scope="col">Jumlah jiwa</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendudukRt.map((r) => (
                          <tr key={`${r.rt}-${r.rw}`}>
                            <th scope="row" style={{ fontWeight: 600 }}>
                              {r.rt}{' '}
                              <span style={{ color: 'var(--ink-400)' }}>
                                · {r.rw}
                              </span>
                            </th>
                            <td>{angka(r.kk)}</td>
                            <td>{angka(r.jiwa)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td>Jumlah baris</td>
                          <td>{angka(rtKK)}</td>
                          <td>{angka(rtJiwa)}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </Reveal>

              {adaSelisih && (
                <Reveal>
                  <div className="form-alert" style={{ marginTop: '1.25rem' }}>
                    <Icon name="info" />
                    <span>
                      Angka pada baris <strong>Jumlah baris</strong> adalah
                      hasil penjumlahan tabel di atas. Total yang dipublikasikan
                      pada profil Kampung KB berbeda, yaitu{' '}
                      <strong>{angka(GU.totalResmiKk)} KK</strong> dan{' '}
                      <strong>{angka(GU.totalResmiJiwa)} jiwa</strong>. Selisih
                      ini berasal dari sumbernya dan ditampilkan apa adanya —
                      mohon dikonfirmasi ke kelurahan pada pemutakhiran
                      berikutnya.
                    </span>
                  </div>
                </Reveal>
              )}
            </div>
          </section>

          {/* ------------------------------------------------------ PENDIDIKAN */}
          <section className="section">
            <div className="container">
              <SectionHead
                eyebrow="Sosial"
                title="Pendidikan terakhir penduduk"
                lead={`Tercatat ${angka(didikTotal)} jiwa, terdiri atas ${angka(didikL)} laki-laki dan ${angka(didikP)} perempuan.`}
              />
              <Reveal>
                <div className="table-wrap">
                  <div className="table-scroll">
                    <table className="data-table">
                      <caption className="sr-only">
                        Jumlah penduduk menurut pendidikan terakhir dan jenis
                        kelamin
                      </caption>
                      <thead>
                        <tr>
                          <th scope="col">Pendidikan akhir</th>
                          <th scope="col">Laki-laki</th>
                          <th scope="col">Perempuan</th>
                          <th scope="col">Total</th>
                          <th scope="col">Persentase</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendidikan.map((p) => (
                          <tr key={p.nama}>
                            <th scope="row" style={{ fontWeight: 500 }}>
                              {p.nama}
                            </th>
                            <td>{angka(p.l)}</td>
                            <td>{angka(p.p)}</td>
                            <td>{angka(p.l + p.p)}</td>
                            <td>{persen(p.l + p.p, didikTotal)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td>Jumlah</td>
                          <td>{angka(didikL)}</td>
                          <td>{angka(didikP)}</td>
                          <td>{angka(didikTotal)}</td>
                          <td>100%</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ------------------------------------------- SASARAN & KEPESERTAAN */}
          <section className="section section--cream">
            <div className="container">
              <SectionHead
                eyebrow="Kampung Keluarga Berkualitas"
                title="Kelompok sasaran dan kepesertaan KB"
                lead="Kelompok yang menjadi fokus pendampingan Pokja Kampung KB beserta capaian kepesertaan keluarga berencana."
              />

              <div className="grid-4">
                {sasaran.map((s, i) => (
                  <Reveal key={s.l} delay={(i % 4) * 70}>
                    <div className="stat-card">
                      <span className="icon-tile stat-card__icon">
                        <Icon name={s.icon} />
                      </span>
                      <span className="stat__value">{angka(s.v)}</span>
                      <span className="stat__label">{s.l}</span>
                    </div>
                  </Reveal>
                ))}
              </div>

              <div className="grid-2" style={{ marginTop: '1.5rem' }}>
                <Reveal>
                  <div className="panel" style={{ height: '100%' }}>
                    <p className="panel__title">Kepesertaan KB</p>
                    <p className="panel__sub">
                      Dari {angka(totalPus)} pasangan usia subur yang tercatat
                      pada blok Statistik Kampung.
                    </p>
                    <div className="meter-stack">
                      {kepesertaanKb.map((k) => (
                        <Meter
                          key={k.nama}
                          name={`${k.nama} — ${angka(k.jml)}`}
                          pct={
                            totalPus
                              ? Number(((k.jml / totalPus) * 100).toFixed(1))
                              : 0
                          }
                          color={k.warna}
                        />
                      ))}
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={90}>
                  <div className="panel panel--forest" style={{ height: '100%' }}>
                    <p className="panel__title">
                      Keluarga dalam kelompok kegiatan
                    </p>
                    <p className="panel__sub">
                      Jumlah keluarga sasaran tiap Poktan pembinaan.
                    </p>
                    <div className="datarow datarow--ondark">
                      <span className="datarow__key">Keluarga punya balita</span>
                      <span className="datarow__val">
                        {angka(SK.keluargaBalita)}
                      </span>
                    </div>
                    <div className="datarow datarow--ondark">
                      <span className="datarow__key">Keluarga punya remaja</span>
                      <span className="datarow__val">
                        {angka(SK.keluargaRemaja)}
                      </span>
                    </div>
                    <div className="datarow datarow--ondark">
                      <span className="datarow__key">Keluarga punya lansia</span>
                      <span className="datarow__val">
                        {angka(SK.keluargaLansia)}
                      </span>
                    </div>
                    <div className="datarow datarow--ondark">
                      <span className="datarow__key">Jumlah remaja</span>
                      <span className="datarow__val">{angka(SK.remaja)}</span>
                    </div>
                  </div>
                </Reveal>
              </div>

              <Reveal>
                <div className="form-alert" style={{ marginTop: '1.25rem' }}>
                  <Icon name="info" />
                  <span>
                    Blok Statistik Kampung memakai potret data yang berbeda dari
                    tabel Gambaran Umum — {angka(SK.jiwa)} jiwa dan{' '}
                    {angka(SK.pus)} PUS, dibanding {angka(GU.penduduk)} jiwa dan{' '}
                    {angka(GU.pus)} PUS. Keduanya ditampilkan terpisah agar tidak
                    tercampur.
                  </span>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ---------------------------------------------------------- SARANA */}
          <section className="section">
            <div className="container">
              <SectionHead
                eyebrow="Kelembagaan"
                title="Sarana, kelompok kegiatan, dan dukungan"
                lead="Kelengkapan Kampung Keluarga Berkualitas beserta status keberadaannya."
              />
              <div className="grid-4">
                {sarana.map((g, i) => (
                  <Reveal key={g.grup} delay={(i % 4) * 70}>
                    <div className="panel" style={{ height: '100%' }}>
                      <span
                        className="icon-tile"
                        style={{ marginBottom: '0.85rem' }}
                      >
                        <Icon name={g.icon as IconName} />
                      </span>
                      <p className="panel__title">{g.grup}</p>
                      <div style={{ marginTop: '0.75rem' }}>
                        {g.items.map((it) => (
                          <div key={it.nama} className="datarow">
                            <span className="datarow__key">{it.nama}</span>
                            <span
                              className="datarow__val"
                              style={{ fontWeight: 600, fontSize: '0.8rem' }}
                            >
                              {it.ket}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* -------------------------------------------------------- POSYANDU */}
          <section className="section section--cream">
            <div className="container">
              <SectionHead
                eyebrow="Jaringan layanan"
                title={`${posyandu.length} posyandu aktif`}
                lead={`Dibina oleh ${KAMPUNG_KB.puskesmas}, dengan pendamping PLKB ${KAMPUNG_KB.pendamping}`}
              />
              <Reveal>
                <div className="table-wrap">
                  <div className="table-scroll">
                    <table className="data-table">
                      <caption className="sr-only">
                        Daftar posyandu aktif beserta alamat dan wilayah
                        layanannya
                      </caption>
                      <thead>
                        <tr>
                          <th scope="col">Nama posyandu</th>
                          <th scope="col" style={{ textAlign: 'left' }}>
                            Alamat
                          </th>
                          <th scope="col" style={{ textAlign: 'left' }}>
                            Wilayah layanan
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {posyandu.map((p) => (
                          <tr key={p.nama}>
                            <th scope="row" style={{ fontWeight: 600 }}>
                              {p.nama}
                            </th>
                            <td style={{ textAlign: 'left' }}>{p.alamat}</td>
                            <td style={{ textAlign: 'left' }}>{p.layanan}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="form-alert" style={{ marginTop: '1.75rem' }}>
                  <Icon name="info" />
                  <span>
                    Seluruh angka pada halaman ini bersumber dari {SUMBER_DATA}{' '}
                    dan bersifat sementara sampai dilakukan pemutakhiran
                    berikutnya. Untuk keperluan penelitian atau permintaan data
                    resmi, silakan ajukan melalui halaman Kontak.
                  </span>
                </div>
              </Reveal>
            </div>
          </section>
        </>
      )}
    </>
  )
}

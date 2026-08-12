import { useState } from 'react'
import { Icon } from '../components/Icon'
import { GalatKotak, Memuat } from '../components/ui'
import { usePageMeta } from '../lib/usePageMeta'
import { api, pesanGalat } from '../lib/api'
import { segarkan, useStatistik } from '../lib/sumber'
import {
  jumlah,
  type BarisKb,
  type BarisLembaga,
  type BarisPendidikan,
  type BarisPosyandu,
  type BarisRt,
  type GrupSarana,
  type Statistik,
} from '../data/statistik'
import { angka } from '../lib/format'
import {
  Kabar,
  KartuAdmin,
  Kolom,
  KepalaAdmin,
  TabelEdit,
  useKabar,
  type KolomTabel,
} from './ui'

/* Sebagian bidang Gambaran Umum berupa angka, sebagian teks bebas. */
const ANGKA_GU: { kunci: keyof Statistik['gambaranUmum']; label: string }[] = [
  { kunci: 'penduduk', label: 'Jiwa penduduk' },
  { kunci: 'kk', label: 'Kepala keluarga' },
  { kunci: 'pus', label: 'Pasangan usia subur' },
  { kunci: 'ibuHamil', label: 'Ibu hamil terdata' },
  { kunci: 'balitaStunting', label: 'Balita gizi kurang / stunting' },
  { kunci: 'remaja', label: 'Remaja' },
  { kunci: 'lansia', label: 'Lanjut usia' },
  { kunci: 'totalResmiKk', label: 'Total resmi — KK' },
  { kunci: 'totalResmiJiwa', label: 'Total resmi — jiwa' },
]

const TEKS_GU: { kunci: keyof Statistik['gambaranUmum']; label: string; ket: string }[] =
  [
    { kunci: 'luasWilayah', label: 'Luas wilayah', ket: 'mis. 1.818,00 ha' },
    { kunci: 'rtRw', label: 'RT / RW', ket: 'mis. 16 / 3' },
    { kunci: 'jarakPusatKota', label: 'Jarak ke pusat kota', ket: 'mis. ± 9 km' },
  ]

const ANGKA_SK: { kunci: keyof Statistik['statistikKampung']; label: string }[] = [
  { kunci: 'jiwa', label: 'Jiwa' },
  { kunci: 'kk', label: 'Kepala keluarga' },
  { kunci: 'pus', label: 'Pasangan usia subur' },
  { kunci: 'keluargaBalita', label: 'Keluarga punya balita' },
  { kunci: 'keluargaRemaja', label: 'Keluarga punya remaja' },
  { kunci: 'keluargaLansia', label: 'Keluarga punya lansia' },
  { kunci: 'remaja', label: 'Jumlah remaja' },
]

const KOL_RT: KolomTabel<BarisRt>[] = [
  { kunci: 'rt', label: 'RT', lebar: '9rem' },
  { kunci: 'rw', label: 'RW', lebar: '9rem' },
  { kunci: 'kk', label: 'Kepala keluarga', jenis: 'angka', lebar: '10rem' },
  { kunci: 'jiwa', label: 'Jumlah jiwa', jenis: 'angka', lebar: '10rem' },
]

const KOL_PENDIDIKAN: KolomTabel<BarisPendidikan>[] = [
  { kunci: 'nama', label: 'Pendidikan akhir' },
  { kunci: 'l', label: 'Laki-laki', jenis: 'angka', lebar: '9rem' },
  { kunci: 'p', label: 'Perempuan', jenis: 'angka', lebar: '9rem' },
]

const KOL_KB: KolomTabel<BarisKb>[] = [
  { kunci: 'nama', label: 'Kelompok' },
  { kunci: 'jml', label: 'Jumlah', jenis: 'angka', lebar: '8rem' },
  { kunci: 'warna', label: 'Warna bar', lebar: '12rem' },
]

const KOL_POSYANDU: KolomTabel<BarisPosyandu>[] = [
  { kunci: 'nama', label: 'Nama posyandu', lebar: '12rem' },
  { kunci: 'alamat', label: 'Alamat' },
  { kunci: 'layanan', label: 'Wilayah layanan' },
]

const KOL_LEMBAGA: KolomTabel<BarisLembaga>[] = [
  { kunci: 'nama', label: 'Lembaga' },
  { kunci: 'jml', label: 'Jumlah', jenis: 'angka', lebar: '8rem' },
]

/** Tiap kartu punya tombol simpannya sendiri agar bagian lain tak ikut terkirim. */
function TombolSimpan({
  judul,
  sibuk,
  onSimpan,
}: {
  judul: string
  sibuk: boolean
  onSimpan: () => void
}) {
  return (
    <button
      type="button"
      className="btn btn--primary btn--sm"
      disabled={sibuk}
      aria-label={`Simpan ${judul}`}
      onClick={onSimpan}
    >
      {sibuk ? 'Menyimpan…' : 'Simpan bagian ini'}
    </button>
  )
}

export default function AdminStatistik() {
  usePageMeta('Data & Statistik — Panel Admin', undefined, { noindex: true })

  const { data, memuat, galat, ulangi } = useStatistik()

  // Selama admin belum menyentuh apa pun, `draf` kosong dan yang tampil adalah
  // data dari server — jadi hasil pemuatan langsung terlihat tanpa efek
  // penyalin. Begitu ada suntingan, draf jadi sumber tampilan sampai disimpan.
  const [draf, setDraf] = useState<Statistik | null>(null)
  const [sibuk, setSibuk] = useState<keyof Statistik | null>(null)
  const [kabar, setKabar] = useKabar()

  const nilai = draf ?? data

  const ubah = <K extends keyof Statistik>(bagian: K, isi: Statistik[K]) =>
    setDraf({ ...nilai, [bagian]: isi })

  const simpan = async (bagian: keyof Statistik, judul: string) => {
    setSibuk(bagian)
    setKabar(null)
    try {
      await api.statistikSimpan(bagian, nilai[bagian])
      segarkan('statistik')
      setKabar({ jenis: 'sukses', teks: `${judul} tersimpan.` })
    } catch (e) {
      setKabar({ jenis: 'galat', teks: pesanGalat(e) })
    } finally {
      setSibuk(null)
    }
  }

  const tombol = (bagian: keyof Statistik, judul: string) => (
    <TombolSimpan
      judul={judul}
      sibuk={sibuk === bagian}
      onSimpan={() => void simpan(bagian, judul)}
    />
  )

  if (memuat && data.pendudukRt.length === 0) {
    return <Memuat teks="Memuat data statistik…" />
  }

  const rtKK = jumlah(nilai.pendudukRt, (r) => r.kk)
  const rtJiwa = jumlah(nilai.pendudukRt, (r) => r.jiwa)
  const totalPus = jumlah(nilai.kepesertaanKb, (r) => r.jml)

  return (
    <>
      <KepalaAdmin
        judul="Data & Statistik"
        ket="Semua angka dan teks pada halaman Data diatur di sini. Tiap bagian disimpan terpisah."
      />

      <Kabar kabar={kabar} mengambang onTutup={() => setKabar(null)} />
      {galat && <GalatKotak pesan={galat} onUlangi={ulangi} />}

      {/* ------------------------------------------------- Gambaran Umum */}
      <KartuAdmin
        judul="Gambaran umum"
        ikon="users"
        ket="Angka pokok kelurahan — tampil sebagai kartu ringkasan di halaman Data dan di beranda."
        aksi={tombol('gambaranUmum', 'Gambaran umum')}
      >
        <div className="adm-kisi">
          {ANGKA_GU.map((f) => (
            <Kolom key={f.kunci} label={f.label}>
              <input
                className="input"
                type="number"
                min={0}
                value={String(nilai.gambaranUmum[f.kunci])}
                onChange={(e) =>
                  ubah('gambaranUmum', {
                    ...nilai.gambaranUmum,
                    [f.kunci]: Number(e.target.value) || 0,
                  })
                }
              />
            </Kolom>
          ))}

          {TEKS_GU.map((f) => (
            <Kolom key={f.kunci} label={f.label} petunjuk={f.ket}>
              <input
                className="input"
                value={String(nilai.gambaranUmum[f.kunci])}
                onChange={(e) =>
                  ubah('gambaranUmum', {
                    ...nilai.gambaranUmum,
                    [f.kunci]: e.target.value,
                  })
                }
              />
            </Kolom>
          ))}
        </div>

        <p className="form-note" style={{ marginTop: '0.75rem' }}>
          <Icon name="info" width={13} height={13} /> Total resmi sengaja
          dipisahkan dari jumlah baris tabel per RT. Bila keduanya berbeda,
          halaman Data akan menampilkan catatan selisihnya apa adanya.
        </p>
      </KartuAdmin>

      {/* ----------------------------------------------- Statistik Kampung */}
      <KartuAdmin
        judul="Statistik Kampung KB"
        ikon="rings"
        ket="Potret data blok Statistik Kampung — memang berbeda dari tabel Gambaran Umum."
        aksi={tombol('statistikKampung', 'Statistik Kampung')}
      >
        <div className="adm-kisi">
          {ANGKA_SK.map((f) => (
            <Kolom key={f.kunci} label={f.label}>
              <input
                className="input"
                type="number"
                min={0}
                value={String(nilai.statistikKampung[f.kunci])}
                onChange={(e) =>
                  ubah('statistikKampung', {
                    ...nilai.statistikKampung,
                    [f.kunci]: Number(e.target.value) || 0,
                  })
                }
              />
            </Kolom>
          ))}
        </div>
      </KartuAdmin>

      {/* ------------------------------------------------------- Per RT */}
      <KartuAdmin
        judul="Penduduk per rukun tetangga"
        ikon="home"
        ket={`Jumlah baris saat ini: ${angka(rtKK)} KK · ${angka(rtJiwa)} jiwa.`}
        aksi={tombol('pendudukRt', 'Tabel per RT')}
      >
        <TabelEdit
          kolom={KOL_RT}
          baris={nilai.pendudukRt}
          onUbah={(b) => ubah('pendudukRt', b)}
          barisBaru={() => ({ rt: '', rw: '', kk: 0, jiwa: 0 })}
          labelTambah="Tambah RT"
        />
      </KartuAdmin>

      {/* --------------------------------------------------- Pendidikan */}
      <KartuAdmin
        judul="Pendidikan terakhir penduduk"
        ikon="book"
        ket="Persentase pada halaman Data dihitung otomatis dari angka ini."
        aksi={tombol('pendidikan', 'Tabel pendidikan')}
      >
        <TabelEdit
          kolom={KOL_PENDIDIKAN}
          baris={nilai.pendidikan}
          onUbah={(b) => ubah('pendidikan', b)}
          barisBaru={() => ({ nama: '', l: 0, p: 0 })}
          labelTambah="Tambah jenjang"
        />
      </KartuAdmin>

      {/* ------------------------------------------------ Kepesertaan KB */}
      <KartuAdmin
        judul="Kepesertaan KB"
        ikon="heart"
        ket={`Total PUS dari baris di bawah: ${angka(totalPus)}. Warna boleh diisi var(--leaf-600) atau kode heks.`}
        aksi={tombol('kepesertaanKb', 'Kepesertaan KB')}
      >
        <TabelEdit
          kolom={KOL_KB}
          baris={nilai.kepesertaanKb}
          onUbah={(b) => ubah('kepesertaanKb', b)}
          barisBaru={() => ({ nama: '', jml: 0, warna: 'var(--leaf-600)' })}
          labelTambah="Tambah kelompok"
        />
      </KartuAdmin>

      {/* -------------------------------------------------------- Sarana */}
      <KartuAdmin
        judul="Sarana & kelompok kegiatan"
        ikon="shield"
        ket="Tiap grup tampil sebagai satu panel di halaman Data. Nama ikon mengikuti daftar ikon situs (users, building, heart, shield, leaf, …)."
        aksi={tombol('sarana', 'Sarana')}
      >
        <SaranaEditor
          nilai={nilai.sarana}
          onUbah={(s) => ubah('sarana', s)}
        />
      </KartuAdmin>

      {/* ------------------------------------------------------ Posyandu */}
      <KartuAdmin
        judul="Posyandu aktif"
        ikon="baby"
        ket="Jumlah posyandu pada judul halaman Data mengikuti banyaknya baris di sini."
        aksi={tombol('posyandu', 'Daftar posyandu')}
      >
        <TabelEdit
          kolom={KOL_POSYANDU}
          baris={nilai.posyandu}
          onUbah={(b) => ubah('posyandu', b)}
          barisBaru={() => ({ nama: '', alamat: '', layanan: '' })}
          labelTambah="Tambah posyandu"
        />
      </KartuAdmin>

      {/* ------------------------------------------------------- Lembaga */}
      <KartuAdmin
        judul="Lembaga & jaringan kelurahan"
        ikon="building"
        ket="Tampil sebagai kartu angka pada halaman Profil."
        aksi={tombol('lembaga', 'Daftar lembaga')}
      >
        <TabelEdit
          kolom={KOL_LEMBAGA}
          baris={nilai.lembaga}
          onUbah={(b) => ubah('lembaga', b)}
          barisBaru={() => ({ nama: '', jml: 0 })}
          labelTambah="Tambah lembaga"
        />
      </KartuAdmin>
    </>
  )
}

/* ------------------------------------------------------- Editor sarana */

/** Sarana bersarang (grup → item), jadi tidak muat di TabelEdit biasa. */
function SaranaEditor({
  nilai,
  onUbah,
}: {
  nilai: GrupSarana[]
  onUbah: (v: GrupSarana[]) => void
}) {
  const ubahGrup = (i: number, g: GrupSarana) =>
    onUbah(nilai.map((x, j) => (j === i ? g : x)))

  return (
    <div className="adm-sarana">
      {nilai.map((g, i) => (
        <div key={i} className="adm-sarana__grup">
          <div className="adm-baris3">
            <Kolom label="Nama grup">
              <input
                className="input"
                value={g.grup}
                onChange={(e) => ubahGrup(i, { ...g, grup: e.target.value })}
              />
            </Kolom>
            <Kolom label="Ikon">
              <input
                className="input"
                value={g.icon}
                placeholder="users"
                onChange={(e) => ubahGrup(i, { ...g, icon: e.target.value })}
              />
            </Kolom>
            <div className="adm-sarana__hapus">
              <button
                type="button"
                className="btn btn--ghost btn--sm"
                onClick={() => onUbah(nilai.filter((_, j) => j !== i))}
              >
                <Icon name="close" width={14} height={14} />
                Hapus grup
              </button>
            </div>
          </div>

          <TabelEdit
            kolom={[
              { kunci: 'nama', label: 'Butir' },
              { kunci: 'ket', label: 'Keterangan' },
            ]}
            baris={g.items}
            onUbah={(items) => ubahGrup(i, { ...g, items })}
            barisBaru={() => ({ nama: '', ket: '' })}
            labelTambah="Tambah butir"
          />
        </div>
      ))}

      <button
        type="button"
        className="btn btn--ghost btn--sm"
        onClick={() => onUbah([...nilai, { grup: '', icon: 'layers', items: [] }])}
      >
        + Tambah grup sarana
      </button>
    </div>
  )
}

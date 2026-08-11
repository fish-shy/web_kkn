import { useCallback, useEffect, useMemo, useState } from 'react'
import { Icon } from './Icon'
import {
  ITEM,
  KATEGORI,
  PETA_KATEGORI,
  SOAL_PER_RONDE,
  lencanaUntuk,
  type ItemSampah,
  type KategoriSampah,
} from '../data/sampah'

/**
 * Permainan memilah sampah.
 *
 * Nilainya bukan sekadar angka: tiap jawaban langsung disusul alasannya,
 * karena bagian itulah yang sebenarnya diajarkan. Runtun jawaban benar diberi
 * bonus supaya konsistensi lebih dihargai daripada tebak-tebakan.
 *
 * Seluruhnya berjalan di sisi peramban; rekor disimpan di localStorage
 * perangkat masing-masing, tidak dikirim ke mana pun.
 */

const KUNCI_REKOR = 'kkn.sampah.rekor'

type Rekor = { skor: number; benar: number }

function bacaRekor(): Rekor | null {
  try {
    const mentah = localStorage.getItem(KUNCI_REKOR)
    if (!mentah) return null
    const r = JSON.parse(mentah) as Rekor
    return typeof r?.skor === 'number' && typeof r?.benar === 'number' ? r : null
  } catch {
    return null
  }
}

function simpanRekor(r: Rekor) {
  try {
    localStorage.setItem(KUNCI_REKOR, JSON.stringify(r))
  } catch {
    /* Mode privat bisa memblokir localStorage - abaikan saja. */
  }
}

/** Fisher-Yates; salinan baru supaya ITEM tidak ikut teracak. */
function acak<T>(arr: readonly T[]): T[] {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const ronde = () => acak(ITEM).slice(0, SOAL_PER_RONDE)

type Jawaban = { dipilih: KategoriSampah; benar: boolean }

export function PilahSampah() {
  const [tahap, setTahap] = useState<'mulai' | 'main' | 'selesai'>('mulai')
  const [dek, setDek] = useState<ItemSampah[]>(ronde)
  const [indeks, setIndeks] = useState(0)
  const [skor, setSkor] = useState(0)
  const [benar, setBenar] = useState(0)
  const [runtun, setRuntun] = useState(0)
  const [jawaban, setJawaban] = useState<Jawaban | null>(null)
  const [rekor, setRekor] = useState<Rekor | null>(bacaRekor)

  const soal = dek[indeks]

  const mulai = useCallback(() => {
    setDek(ronde())
    setIndeks(0)
    setSkor(0)
    setBenar(0)
    setRuntun(0)
    setJawaban(null)
    setTahap('main')
  }, [])

  const jawab = useCallback(
    (pilih: KategoriSampah) => {
      if (jawaban || !soal) return

      const tepat = pilih === soal.kategori
      // Bonus runtun dibatasi supaya soal-soal awal tetap berarti.
      const bonus = tepat ? Math.min(runtun, 5) * 2 : 0

      setJawaban({ dipilih: pilih, benar: tepat })
      if (tepat) {
        setSkor((s) => s + 10 + bonus)
        setBenar((b) => b + 1)
        setRuntun((r) => r + 1)
      } else {
        setRuntun(0)
      }
    },
    [jawaban, soal, runtun],
  )

  const lanjut = useCallback(() => {
    if (indeks + 1 >= dek.length) {
      // Rekor dicatat tepat saat ronde berakhir. Skor dan jumlah benar sudah
      // final di sini karena jawaban terakhir diproses pada klik sebelumnya.
      if (!rekor || skor > rekor.skor) {
        const baru = { skor, benar }
        simpanRekor(baru)
        setRekor(baru)
      }
      setTahap('selesai')
      return
    }
    setIndeks((i) => i + 1)
    setJawaban(null)
  }, [indeks, dek.length, rekor, skor, benar])

  // Pintasan angka 1-4 untuk memilih tempat sampah, Enter untuk lanjut.
  useEffect(() => {
    if (tahap !== 'main') return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && jawaban) {
        lanjut()
        return
      }
      const n = Number(e.key)
      if (!jawaban && n >= 1 && n <= KATEGORI.length) jawab(KATEGORI[n - 1].id)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [tahap, jawaban, jawab, lanjut])

  const lencana = useMemo(() => lencanaUntuk(benar), [benar])

  /* ------------------------------------------------------------- Mulai */

  if (tahap === 'mulai') {
    return (
      <div className="game game--tengah">
        <span className="icon-tile icon-tile--forest game__tanda">
          <Icon name="recycle" />
        </span>
        <h3 className="game__judul">Seberapa jago kamu memilah?</h3>
        <p className="game__lead">
          {SOAL_PER_RONDE} barang sehari-hari akan muncul satu per satu. Pilih
          tempat sampah yang tepat — tiap jawaban langsung disertai alasannya.
        </p>
        {rekor && (
          <p className="game__rekor">
            <Icon name="award" width={15} height={15} />
            Rekor di perangkat ini: <strong>{rekor.skor} poin</strong> ({rekor.benar}/
            {SOAL_PER_RONDE} benar)
          </p>
        )}
        <button type="button" className="btn btn--primary btn--lg" onClick={mulai}>
          Mulai bermain
        </button>
      </div>
    )
  }

  /* ------------------------------------------------------------ Selesai */

  if (tahap === 'selesai') {
    const persen = Math.round((benar / SOAL_PER_RONDE) * 100)
    return (
      <div className="game game--tengah">
        <span className="icon-tile icon-tile--forest game__tanda">
          <Icon name="award" />
        </span>
        <p className="game__eyebrow">{lencana.nama}</p>
        <h3 className="game__judul">
          {benar} dari {SOAL_PER_RONDE} benar
        </h3>

        <div className="game__meter" role="img" aria-label={`${persen} persen benar`}>
          <div className="game__meter-isi" style={{ width: `${persen}%` }} />
        </div>

        <p className="game__lead">{lencana.pesan}</p>

        <div className="game__skor-akhir">
          <span>
            <strong>{skor}</strong> poin
          </span>
          {rekor && (
            <span>
              Rekor <strong>{rekor.skor}</strong>
            </span>
          )}
        </div>

        <div className="game__aksi">
          <button type="button" className="btn btn--primary" onClick={mulai}>
            <Icon name="recycle" width={16} height={16} />
            Main lagi
          </button>
          <a href="#panduan" className="btn btn--ghost">
            Baca panduan memilah
          </a>
        </div>
      </div>
    )
  }

  /* -------------------------------------------------------------- Main */

  const kunci = soal ? PETA_KATEGORI[soal.kategori] : null

  return (
    <div className="game">
      <div className="game__kepala">
        <span className="game__langkah">
          Soal {indeks + 1} dari {dek.length}
        </span>
        <span className="game__nilai">
          {runtun >= 2 && (
            <span className="game__runtun">
              <Icon name="check-circle" width={13} height={13} />
              {runtun} beruntun
            </span>
          )}
          <strong>{skor}</strong> poin
        </span>
      </div>

      <div className="game__bar">
        <div
          className="game__bar-isi"
          style={{ width: `${((indeks + (jawaban ? 1 : 0)) / dek.length) * 100}%` }}
        />
      </div>

      <p className="game__tanya">Ke mana barang ini dibuang?</p>
      <p className="game__item">{soal?.nama}</p>

      <div className="game__pilihan">
        {KATEGORI.map((k, i) => {
          const dipilih = jawaban?.dipilih === k.id
          const iniKunci = jawaban && soal?.kategori === k.id
          return (
            <button
              key={k.id}
              type="button"
              className={`bin${iniKunci ? ' bin--benar' : ''}${
                dipilih && !jawaban?.benar ? ' bin--salah' : ''
              }`}
              style={{ ['--bin-warna' as string]: k.warna }}
              disabled={Boolean(jawaban)}
              onClick={() => jawab(k.id)}
            >
              <span className="bin__ikon">
                <Icon name={k.icon} />
              </span>
              <span className="bin__nama">{k.nama}</span>
              <span className="bin__ringkas">{k.ringkas}</span>
              <span className="bin__tombol" aria-hidden="true">
                {i + 1}
              </span>
            </button>
          )
        })}
      </div>

      <div className="game__umpan" aria-live="polite">
        {jawaban && kunci && (
          <div className={`umpan${jawaban.benar ? ' umpan--benar' : ' umpan--salah'}`}>
            <Icon name={jawaban.benar ? 'check-circle' : 'info'} />
            <span>
              <strong>
                {jawaban.benar
                  ? 'Tepat!'
                  : `Kurang tepat — seharusnya ${kunci.nama}.`}
              </strong>{' '}
              {soal?.alasan}
            </span>
            <button type="button" className="btn btn--primary btn--sm" onClick={lanjut}>
              {indeks + 1 >= dek.length ? 'Lihat hasil' : 'Lanjut'}
              <Icon name="arrow-right" width={15} height={15} />
            </button>
          </div>
        )}
      </div>

      <p className="game__petunjuk">
        Bisa juga pakai tombol angka <kbd>1</kbd>–<kbd>4</kbd>, lalu{' '}
        <kbd>Enter</kbd> untuk lanjut.
      </p>
    </div>
  )
}

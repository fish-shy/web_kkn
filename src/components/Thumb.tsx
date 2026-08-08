import { Icon, type IconName } from './Icon'

/**
 * Placeholder visual yang dibangkitkan dari teks (judul/id).
 * Selama foto asli belum tersedia, tiap item tetap punya warna & motif
 * yang konsisten — bukan kotak abu-abu kosong.
 *
 * Beri prop `src` bila foto asli sudah ada; motif otomatis diganti foto.
 */

/* Semua gradien sengaja dijaga di keluarga hijau–teal supaya kartu tetap
   menyatu saat diletakkan di atas band hijau gelap. Aksen oranye dipakai
   hanya lewat badge kategori, bukan sebagai latar gambar. */
const PALET = [
  ['#16330f', '#3a6b2c'],
  ['#1d4015', '#5b8c2a'],
  ['#22481a', '#6d9a4e'],
  ['#14403a', '#2f7d6b'],
  ['#1a3a24', '#4a8258'],
  ['#29541f', '#74a838'],
  ['#12351c', '#42794a'],
  ['#25491c', '#679a35'],
]

function hash(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}

type Props = {
  seed: string
  glyph?: IconName
  src?: string
  alt?: string
  className?: string
  ratio?: string
}

export function Thumb({ seed, glyph = 'image', src, alt, className, ratio }: Props) {
  const h = hash(seed)
  const [a, b] = PALET[h % PALET.length]
  const motif = h % 4
  const gid = `g-${h.toString(36)}`

  const style = {
    ['--thumb-bg' as string]: `linear-gradient(140deg, ${a}, ${b})`,
    ...(ratio ? { ['--thumb-ratio' as string]: ratio } : {}),
  }

  return (
    <div className={`thumb${className ? ` ${className}` : ''}`} style={style}>
      {src ? (
        <img src={src} alt={alt ?? ''} loading="lazy" />
      ) : (
        <>
          <svg
            className="thumb__art"
            viewBox="0 0 160 120"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={a} />
                <stop offset="100%" stopColor={b} />
              </linearGradient>
            </defs>
            <rect width="160" height="120" fill={`url(#${gid})`} />
            <g
              fill="none"
              stroke="#fff"
              strokeOpacity="0.16"
              strokeWidth="1.4"
            >
              {motif === 0 && (
                <>
                  <path d="M-10 96c30-26 58-10 86-30s54-8 94-34" />
                  <path d="M-10 108c30-26 58-10 86-30s54-8 94-34" />
                  <path d="M-10 120c30-26 58-10 86-30s54-8 94-34" />
                  <path d="M-10 84c30-26 58-10 86-30s54-8 94-34" />
                </>
              )}
              {motif === 1 && (
                <>
                  <circle cx="132" cy="24" r="18" />
                  <circle cx="132" cy="24" r="30" />
                  <circle cx="132" cy="24" r="44" />
                  <circle cx="132" cy="24" r="58" />
                  <circle cx="26" cy="102" r="16" />
                  <circle cx="26" cy="102" r="28" />
                </>
              )}
              {motif === 2 && (
                <>
                  <path d="M0 40h160M0 62h160M0 84h160" />
                  <path d="M34 0v120M78 0v120M122 0v120" strokeOpacity="0.1" />
                </>
              )}
              {motif === 3 && (
                <>
                  <path d="M-4 118L44 62l30 30L118 34l48 46" />
                  <path d="M-4 132L44 76l30 30 44-58 48 46" strokeOpacity="0.1" />
                </>
              )}
            </g>
            <circle
              cx={motif === 1 ? 26 : 138}
              cy={motif === 1 ? 102 : 18}
              r="6"
              fill="#fff"
              fillOpacity="0.14"
            />
          </svg>
          <Icon name={glyph} className="thumb__glyph" strokeWidth="1.3" />
        </>
      )}
    </div>
  )
}

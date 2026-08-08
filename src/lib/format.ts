const BULAN = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
]

const HARI = [
  'Minggu',
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jumat',
  'Sabtu',
]

/** 2026-07-28 → "28 Juli 2026" */
export function tanggalPanjang(iso: string) {
  const d = new Date(iso)
  return `${d.getDate()} ${BULAN[d.getMonth()]} ${d.getFullYear()}`
}

/** 2026-07-28 → "Selasa, 28 Juli 2026" */
export function tanggalLengkap(iso: string) {
  const d = new Date(iso)
  return `${HARI[d.getDay()]}, ${tanggalPanjang(iso)}`
}

/** 2026-07-28 → "28 Jul 2026" */
export function tanggalPendek(iso: string) {
  const d = new Date(iso)
  return `${d.getDate()} ${BULAN[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`
}

/** 9003 → "9.003" */
export function angka(n: number) {
  return n.toLocaleString('id-ID')
}

/** Bagian dari total, dibulatkan 1 desimal → "32,6%" */
export function persen(n: number, dari: number) {
  if (!dari) return '0%'
  return `${((n / dari) * 100).toFixed(1).replace('.', ',')}%`
}

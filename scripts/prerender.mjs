/**
 * Menulis satu berkas HTML statis untuk tiap rute, lengkap dengan judul,
 * deskripsi, canonical, dan tag Open Graph-nya sendiri. Dijalankan setelah
 * `vite build`.
 *
 * KENAPA PERLU. Situs ini SPA: seluruh rute dilayani satu `index.html` yang
 * badannya kosong, dan metadatanya baru disetel JavaScript setelah halaman
 * jalan. Mesin pencari modern memang me-render JavaScript, tetapi crawler
 * pratinjau tautan — WhatsApp, Facebook, Telegram — tidak. Tanpa langkah ini,
 * setiap tautan berita yang dibagikan warga menampilkan pratinjau beranda yang
 * sama persis.
 *
 * Yang dilakukan skrip ini hanya menambal bagian `<head>`; badan halaman tetap
 * dirakit React di peramban. Itu sudah cukup untuk pratinjau tautan dan
 * memberi mesin pencari judul yang benar sejak permintaan pertama.
 *
 * Berita diambil dari API saat build. Bila API tidak terjangkau, halaman
 * beritanya dilewati dengan peringatan — build tetap berhasil.
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const AKAR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(AKAR, 'dist')

/* ------------------------------------------------------------ Konfigurasi */

// Di Vercel, VERCEL_PROJECT_PRODUCTION_URL sudah berisi domain produksi proyek.
// SITE_URL dipakai bila situsnya memakai domain sendiri.
const SITE_URL = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : '') ||
  ''
).replace(/\/+$/, '')

const API_URL = (process.env.VITE_API_URL || '').replace(/\/+$/, '')

const NAMA = 'Kelurahan Landasan Ulin Tengah'
const OG_IMAGE = '/og-image.jpg'

/* ------------------------------------------------------------------ Utilitas */

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const abs = (p) => (/^https?:\/\//i.test(p) ? p : `${SITE_URL}${p}`)

/** Ringkas teks untuk meta description tanpa memotong di tengah kata. */
function ringkas(teks, maks = 165) {
  const t = String(teks).replace(/\s+/g, ' ').trim()
  if (t.length <= maks) return t
  const potong = t.slice(0, maks)
  return `${potong.slice(0, potong.lastIndexOf(' '))}…`
}

/* --------------------------------------------------------- Penambal <head> */

/**
 * Membuang tag SEO bawaan dari index.html lalu menyisipkan versi per halaman.
 * Dibersihkan lebih dulu supaya tidak ada dua `og:title` yang saling
 * bertentangan di satu halaman.
 */
function tulisKepala(html, { judul, judulOg, deskripsi, url, gambar, jenis, jsonLd }) {
  // Kartu pratinjau memakai judul tanpa akhiran nama situs: `og:site_name`
  // sudah menyebutkannya, dan judul artikel di sini sering panjang.
  const og = judulOg ?? judul

  const bersih = html
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(
      /<meta\s[^>]*?(?:name|property)=["'](?:description|og:[^"']*|twitter:[^"']*)["'][^>]*>/gi,
      '',
    )
    .replace(/<link\s[^>]*?rel=["']canonical["'][^>]*>/gi, '')

  const baris = [
    `<title>${esc(judul)}</title>`,
    `<meta name="description" content="${esc(deskripsi)}" />`,
    url ? `<link rel="canonical" href="${esc(url)}" />` : '',
    `<meta property="og:site_name" content="${esc(NAMA)}" />`,
    `<meta property="og:locale" content="id_ID" />`,
    `<meta property="og:type" content="${jenis}" />`,
    `<meta property="og:title" content="${esc(og)}" />`,
    `<meta property="og:description" content="${esc(deskripsi)}" />`,
    url ? `<meta property="og:url" content="${esc(url)}" />` : '',
    gambar ? `<meta property="og:image" content="${esc(gambar)}" />` : '',
    gambar ? `<meta property="og:image:alt" content="${esc(og)}" />` : '',
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(og)}" />`,
    `<meta name="twitter:description" content="${esc(deskripsi)}" />`,
    gambar ? `<meta name="twitter:image" content="${esc(gambar)}" />` : '',
    jsonLd
      ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
      : '',
  ].filter(Boolean)

  return bersih.replace('</head>', `${baris.join('\n    ')}\n  </head>`)
}

/* ---------------------------------------------------------------- JSON-LD */

function ldOrganisasi() {
  return {
    '@context': 'https://schema.org',
    '@type': 'GovernmentOrganization',
    name: NAMA,
    url: SITE_URL || undefined,
    logo: SITE_URL ? abs('/logo-kelurahan.jpg') : undefined,
    telephone: '(0511) 4705429',
    email: 'landasanulintengah@banjarbarukota.go.id',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. A. Yani Km. 22,600 RT 003 RW 002',
      addressLocality: 'Kecamatan Liang Anggang',
      addressRegion: 'Kalimantan Selatan',
      postalCode: '70723',
      addressCountry: 'ID',
    },
    areaServed: 'Kelurahan Landasan Ulin Tengah, Kota Banjarbaru',
  }
}

function ldBerita(b, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: ringkas(b.judul, 110),
    description: b.ringkas,
    datePublished: b.tanggal,
    dateModified: b.diperbarui ?? b.tanggal,
    inLanguage: 'id-ID',
    mainEntityOfPage: url || undefined,
    image: b.foto ? [abs(b.foto)] : undefined,
    author: { '@type': 'Organization', name: b.penulis || NAMA },
    publisher: {
      '@type': 'GovernmentOrganization',
      name: NAMA,
      logo: SITE_URL
        ? { '@type': 'ImageObject', url: abs('/logo-kelurahan.jpg') }
        : undefined,
    },
  }
}

/* -------------------------------------------------------------- Penulisan */

async function tulis(rutePath, html) {
  const dir =
    rutePath === '/' ? DIST : path.join(DIST, ...rutePath.split('/').filter(Boolean))
  await mkdir(dir, { recursive: true })
  await writeFile(path.join(dir, 'index.html'), html, 'utf8')
}

async function ambilBerita() {
  if (!API_URL) {
    console.warn(
      '  ! VITE_API_URL tidak diset — halaman berita tidak ikut di-prerender.',
    )
    return []
  }
  try {
    const res = await fetch(`${API_URL}/api/berita`, {
      signal: AbortSignal.timeout(20000),
    })
    if (!res.ok) throw new Error(`status ${res.status}`)
    return await res.json()
  } catch (e) {
    console.warn(`  ! Gagal mengambil berita dari API (${e.message}).`)
    console.warn('    Halaman berita dilewati; build tetap dilanjutkan.')
    return []
  }
}

async function main() {
  const dasar = await readFile(path.join(DIST, 'index.html'), 'utf8')
  const { rute } = JSON.parse(
    await readFile(path.join(AKAR, 'src/data/seo.json'), 'utf8'),
  )

  if (!SITE_URL) {
    console.warn(
      '  ! SITE_URL / VERCEL_PROJECT_PRODUCTION_URL kosong. Canonical, og:url,\n' +
        '    dan sitemap.xml dilewati — URL absolut yang salah lebih berbahaya\n' +
        '    bagi SEO daripada tidak ada sama sekali.',
    )
  }

  const gambarOg = SITE_URL ? abs(OG_IMAGE) : ''
  const urlSitemap = []

  /* --- Rute tetap --- */
  for (const r of rute) {
    const judul = r.path === '/' ? NAMA : `${r.judul} — ${NAMA}`
    const url = SITE_URL ? `${SITE_URL}${r.path === '/' ? '' : r.path}` : ''

    await tulis(
      r.path,
      tulisKepala(dasar, {
        judul,
        deskripsi: r.deskripsi,
        url,
        gambar: gambarOg,
        jenis: 'website',
        jsonLd: r.path === '/' ? ldOrganisasi() : null,
      }),
    )
    if (url) urlSitemap.push({ loc: url, prioritas: r.path === '/' ? '1.0' : '0.8' })
  }
  console.log(`  ${rute.length} rute tetap`)

  /* --- Halaman berita --- */
  const berita = await ambilBerita()
  for (const b of berita) {
    const jalur = `/berita/${b.slug}`
    const url = SITE_URL ? `${SITE_URL}${jalur}` : ''
    const gambar = b.foto ? (SITE_URL ? abs(b.foto) : '') : gambarOg

    await tulis(
      jalur,
      tulisKepala(dasar, {
        judul: `${b.judul} — ${NAMA}`,
        judulOg: b.judul,
        deskripsi: ringkas(b.ringkas),
        url,
        gambar,
        jenis: 'article',
        jsonLd: ldBerita(b, url),
      }),
    )
    if (url) urlSitemap.push({ loc: url, lastmod: b.tanggal, prioritas: '0.7' })
  }
  if (berita.length) console.log(`  ${berita.length} halaman berita`)

  /* --- sitemap.xml --- */
  if (urlSitemap.length) {
    const xml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...urlSitemap.map((u) =>
        [
          '  <url>',
          `    <loc>${esc(u.loc)}</loc>`,
          u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>` : '',
          `    <priority>${u.prioritas}</priority>`,
          '  </url>',
        ]
          .filter(Boolean)
          .join('\n'),
      ),
      '</urlset>',
      '',
    ].join('\n')
    await writeFile(path.join(DIST, 'sitemap.xml'), xml, 'utf8')
    console.log(`  sitemap.xml (${urlSitemap.length} URL)`)
  }

  /* --- robots.txt --- */
  const robots = [
    'User-agent: *',
    'Allow: /',
    '',
    '# Panel pengelola — tidak ada gunanya muncul di hasil pencarian.',
    'Disallow: /admin',
    '',
    SITE_URL ? `Sitemap: ${SITE_URL}/sitemap.xml` : '',
    '',
  ]
    .filter((b) => b !== undefined)
    .join('\n')
  await writeFile(path.join(DIST, 'robots.txt'), robots, 'utf8')
  console.log('  robots.txt')
}

main().catch((e) => {
  console.error('Prerender gagal:', e)
  process.exit(1)
})

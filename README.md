# Situs Kelurahan Landasan Ulin Tengah

Situs profil & pelayanan publik untuk Kelurahan Landasan Ulin Tengah, Kecamatan
Liang Anggang, Kota Banjarbaru, Kalimantan Selatan.

Dibangun dengan **React 19 + TypeScript + Vite**, `react-router-dom` untuk
routing, dan CSS biasa (tanpa framework UI) agar mudah disesuaikan.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # hasil build ke dist/
npm run preview  # cek hasil build secara lokal
npm run lint
```

Berita, galeri, dan data statistik sekarang diambil dari API di
[`../backend`](../backend/README.md) — jalankan backend lebih dulu, kalau tidak
halaman-halaman itu akan menampilkan pesan "Tidak dapat menghubungi server".
Vite sudah mem-proxy `/api` ke `http://localhost:4000`, jadi saat pengembangan
tidak perlu menyetel `VITE_API_URL`. Gambar unggahan tidak lewat proxy —
disimpan di Supabase Storage dan dilayani langsung dari URL publiknya.

## Panel admin

Ada di `/admin` (masuk lewat `/admin/masuk`, akun diatur di `backend/.env`).
Tata letaknya terpisah dari situs publik dan dijaga token JWT.

| Rute                | Isi                                                            |
| ------------------- | -------------------------------------------------------------- |
| `/admin`            | Ringkasan jumlah berita, foto, dan angka penduduk               |
| `/admin/berita`     | Daftar berita — cari, sunting, hapus                            |
| `/admin/berita/baru`| Tambah berita; isinya disusun blok demi blok                    |
| `/admin/berita/:id` | Sunting berita                                                  |
| `/admin/galeri`     | Unggah gambar, beri keterangan & album, sunting, hapus          |
| `/admin/statistik`  | Semua angka dan teks halaman Data; tiap bagian disimpan sendiri |

## Halaman

| Rute             | Berkas                      | Isi                                                                        |
| ---------------- | --------------------------- | -------------------------------------------------------------------------- |
| `/`              | `src/pages/Beranda.tsx`     | Hero + jam layanan, statistik, sekilas wilayah & penggunaan lahan, program, kegiatan terbaru, galeri, CTA |
| `/profil`        | `src/pages/Profil.tsx`      | Sejarah (linimasa), visi & misi, struktur organisasi, batas & data pokok, lembaga kemasyarakatan |
| `/layanan`       | `src/pages/Layanan.tsx`     | Alur 4 langkah, katalog 10 layanan + persyaratan, jam loket, FAQ            |
| `/berita`        | `src/pages/Berita.tsx`      | Daftar berita, filter kategori, pencarian, paginasi                        |
| `/berita/:slug`  | `src/pages/BeritaDetail.tsx`| Artikel lengkap, tombol bagikan, berita terkait                            |
| `/galeri`        | `src/pages/Galeri.tsx`      | Grid album + filter + lightbox (navigasi panah & Esc)                      |
| `/edukasi-sampah`| `src/pages/EdukasiSampah.tsx`| Materi KKN tematik: permainan pilah sampah, panduan 4 kategori, langkah di rumah |
| `/data`          | `src/pages/Data.tsx`        | Penduduk per RT, piramida umur, pendidikan, pekerjaan, agama, sarana       |
| `/kontak`        | `src/pages/Kontak.tsx`      | Info kontak, jam layanan, formulir pesan, peta lokasi                      |
| `*`              | `src/pages/NotFound.tsx`    | Halaman 404                                                                 |

## Struktur berkas

```
src/
  data/         profil & identitas kelurahan (masih statis), plus tipe data
    site.ts       identitas, kontak, menu, jam layanan  ← statis
    profil.ts     sejarah, visi & misi, struktur, batas wilayah, program ← statis
    layanan.ts    katalog layanan, persyaratan, alur, FAQ ← statis
    berita.ts     tipe Berita + daftar kategori bawaan   ← isinya dari API
    galeri.ts     tipe Foto + daftar album bawaan        ← isinya dari API
    statistik.ts  tipe data statistik + bentuk kosongnya ← isinya dari API
  admin/        panel admin: tata letak, masuk, berita, galeri, statistik
  components/   navbar, footer, layout, ikon, kartu, peta sketsa, dll.
  pages/        satu berkas per halaman publik
  lib/          api.ts (penghubung backend), sumber.ts (cache data), auth.tsx,
                format tanggal/angka, hook <title>, pemetaan ikon
  styles/       tokens.css → base.css → layout.css → components.css →
                pages.css → admin.css
```

Isi yang berubah rutin — **berita, galeri, dan seluruh angka halaman Data** —
diubah lewat panel admin di `/admin`, bukan dengan menyunting kode. Data
awalnya ada di `backend/prisma/data-awal.ts` dan dimuat oleh `npm run db:seed`.

Yang masih statis di `src/data/`: identitas & kontak kelurahan (`site.ts`),
profil dan sejarah (`profil.ts`), serta katalog layanan (`layanan.ts`) — ubah
langsung di berkasnya.

## Sumber data

Profil, angka kependudukan, visi–misi, potensi lokal, sarana, dan daftar
posyandu diambil dari **Profil Kampung Keluarga Berkualitas Kelurahan Landasan
Ulin Tengah** pada portal Kemendukbangga/BKKBN.

### Ketidakkonsistenan pada sumber

Sumbernya sendiri memuat dua hal yang tidak cocok. Keduanya **ditampilkan apa
adanya** di halaman Data, lengkap dengan keterangan — bukan dirapikan diam-diam:

1. Jumlah baris tabel per RT menghasilkan **2.946 KK / 9.296 jiwa**, sedangkan
   total yang dipublikasikan **2.843 KK / 9.063 jiwa**.
2. Blok "Statistik Kampung" memakai potret data berbeda (**8.475 jiwa,
   1.749 PUS**) dibanding tabel Gambaran Umum (**9.063 jiwa, 1.929 PUS**).

Mohon dikonfirmasi ke kelurahan saat pemutakhiran berikutnya.

Data **keluarga miskin (desil 1–2)** ada di sumber tetapi sengaja tidak
ditampilkan di situs ini, sesuai permintaan.

## Yang masih berupa contoh

Bagian berikut **tidak ada di sumber** dan wajib diganti sebelum situs
dipublikasikan:

1. **Kontak** (`src/data/site.ts`) — nomor telepon, WhatsApp, surel, alamat
   kantor, koordinat peta, dan jam pelayanan.
2. **Surel** (`src/data/site.ts`) — belum tercantum di mana pun pada sumber
   resmi, jadi masih dugaan.
3. **Nomor WhatsApp** (`src/data/site.ts`) — belum terverifikasi.
4. **Jam pelayanan** (`JAM_RINGKAS` di `src/data/site.ts`) — belum tercantum
   pada situs resmi.
5. **Facebook** — poster resmi menyebut akun "Kelurahan Landasanulintengah",
   tetapi URL persisnya belum dipastikan sehingga belum dicantumkan.

## Struktur organisasi

`STRUKTUR` di `src/data/profil.ts` mengikuti papan **Struktur Organisasi
RT/RW** di kantor kelurahan: Lurah, didampingi Babinkamtibmas dan Babinsa, lalu
Ketua Forum RT/RW, kemudian 3 RW yang membawahi 16 RT.

**Hanya jabatan yang dicantumkan, tanpa nama pengurus** — nama berganti
mengikuti surat keputusan yang berlaku, dan situs publik tidak perlu ikut
menayangkan data pribadi pengurus RT/RW.

Pembagian RT ke tiap RW (RW 001: RT 001, 002, 013, 016 · RW 002: RT 003–006 ·
RW 003: RT 007–012, 014, 015) cocok persis dengan tabel sebaran penduduk per RT
pada halaman Data, yang berasal dari portal Kampung KB. Dua sumber berbeda yang
saling menguatkan.

Susunan perangkat internal kelurahan (Sekretariat serta Seksi Pemerintahan,
Kesejahteraan Sosial, dan Ekonomi & Pembangunan) sebelumnya ditampilkan di
halaman ini dan kini digantikan bagan RT/RW. Bila ingin ditampilkan kembali
sebagai bagan terpisah, datanya ada di riwayat berkas `src/data/profil.ts`.

## Hasil pengecekan silang

Diverifikasi terhadap portal Kampung KB, Wikipedia, situs resmi kelurahan,
dan Media Center Banjarbaru.

**Terkonfirmasi:** luas 1.818,00 Ha · 16 RT / 3 RW · ± 9 km ke pusat kota ·
klasifikasi Berkembang · kode pos 70723 · alamat Jl. A. Yani Km. 22,600
RT 003 RW 002 · telepon (0511) 4705429 · Instagram
`kelurahan_landasanulintengah` · Lurah H. Faisal Rizal · struktur
Sekretariat + 3 seksi (Pemerintahan, Kessos, Ekobang).

**Selisih antar sumber — ditampilkan apa adanya, bukan dirapikan:**

| Hal | Sumber A | Sumber B |
| --- | --- | --- |
| Jumlah penduduk | 9.063 (Kampung KB) | 7.462 (Wikipedia) |
| Pencanangan Kampung KB | 21 Nov 2022 (tabel) | 17 Jun 2026 (kepala halaman) |
| Ejaan nama Lurah | H. Faisal Rizal | H. M. Faisal Riza |

Wikipedia sendiri tidak konsisten: jumlah penduduk keempat kelurahan di Liang
Anggang di sana (26.383) tak sama dengan total kecamatannya (38.272).

**Sudah dikoreksi:**

- Klaim "penduduk terbanyak kedua setelah Landasan Ulin Utara" — keliru.
  Menurut Wikipedia urutannya Barat (9.402), Tengah (7.462), Utara (6.864),
  Selatan (2.655); Utara justru ketiga. Kalimatnya dilunakkan.
- Lini masa belum memuat pembentukan Kecamatan Liang Anggang lewat Perda Kota
  Banjarbaru Nomor 4 Tahun 2007 — sudah ditambahkan.
- Struktur organisasi semula ditulis 4 seksi; yang benar 3 seksi.

**Belum terkonfirmasi:** Perda Kota Banjarbaru Nomor 2 Tahun 2004 sebagai
dasar pembentukan kelurahan. Klaim ini berasal dari narasi kelurahan sendiri
dan tidak ditemukan di arsip Perda BPK maupun sumber lain.

## Berita

Lima berita awal diambil dari publikasi resmi kelurahan di
<https://kel-landasanulintengah.banjarbarukota.go.id/>. Setiap entri menyimpan
`sumber` berisi tautan artikel aslinya, dan tautan itu ikut ditampilkan di
bawah artikel.

Fotonya diunduh dari situs yang sama dan disimpan di `public/berita/`. Karena
situs ini dibuat untuk kelurahan yang sama, pemakaiannya wajar — tetapi
sebaiknya tetap dikonfirmasi ke pengelola situs kelurahan sebelum
dipublikasikan.

Menambah berita baru: lewat `/admin/berita/baru`. Fotonya diunggah dari
komputer (masuk ke Supabase Storage), atau kolom foto dikosongkan agar gambar
bangkitan otomatis dipakai sebagai gantinya.

## Galeri

Isi awalnya 15 gambar asli dari sumber yang sama, tersimpan di
`public/berita/`. Keterangannya ditulis berdasarkan acara dan tanggal
publikasi aslinya — bukan tafsiran atas isi frame. Tiap entri menyimpan
`sumber`, dan tautan "publikasi asli" muncul di dalam lightbox.

Menambah dokumentasi: lewat `/admin/galeri`.

## Edukasi sampah (KKN tematik)

`/edukasi-sampah` memuat materi pemilahan sampah beserta permainan tebak
tempat sampah. Seluruhnya berjalan di peramban — tidak menyentuh backend, dan
rekor pemain hanya disimpan di `localStorage` perangkat masing-masing.

Materinya di [`src/data/sampah.ts`](src/data/sampah.ts): empat kategori
(organik, anorganik, B3, residu) dan 25 barang rumah tangga beserta alasan
penggolongannya. Menambah soal cukup dengan menambah entri di `ITEM`; jumlah
soal per ronde diatur lewat `SOAL_PER_RONDE`.

Angka pada bagian pengantar (4 drop point, 2 RW, ±200 KK) mengikuti program
pemilahan yang benar-benar berjalan di kelurahan; sumbernya berita
`/berita/bank-sampah-organik-berbasis-warga`. Perbarui `FAKTA` di berkas yang
sama bila cakupan programnya berubah.

Album: **Apel Pagi** (8), **Penilaian Eco Office** (3), **Kesehatan** (2),
**Pengumuman** (2). Album Pengumuman berisi poster/infografis, bukan foto
kegiatan — sengaja dipisah supaya tidak tercampur.

Data yang sebelumnya dikarang tanpa padanan di sumber — komposisi kelompok
umur, pemeluk agama, mata pencaharian rinci, dan persentase penggunaan lahan —
sudah **dihapus**, bukan dibiarkan tampil sebagai angka palsu.

## Foto

Foto kegiatan belum tersedia, jadi setiap thumbnail digambar otomatis oleh
komponen `src/components/Thumb.tsx`: warna dan motifnya dibangkitkan dari judul
item sehingga konsisten dan tidak terlihat seperti kotak kosong.

Untuk memakai foto asli, letakkan berkas di `public/` lalu berikan prop `src`:

```tsx
<Thumb seed={berita.slug} src="/foto/gotong-royong.jpg" alt="Gotong royong warga" />
```

Lambang kelurahan ada di `public/logo-kelurahan.jpg` dan dipakai di navbar,
footer, serta beranda.

## Peta

- Beranda memakai sketsa orientasi buatan sendiri (`src/components/MapSketch.tsx`)
  — bukan peta berskala.
- Kontak menyematkan peta OpenStreetMap berdasarkan koordinat di
  `SITE.koordinat`. Sesuaikan koordinat agar penanda tepat di kantor kelurahan.

## Formulir kontak

Situs ini murni statis (tanpa server), sehingga formulir di halaman Kontak
menyusun pesan lalu membukanya di aplikasi surel pengguna (`mailto:`). Bila
nanti ingin pesan masuk langsung ke basis data, ganti fungsi `kirim` di
`src/pages/Kontak.tsx` dengan pemanggilan API — misalnya Formspree, Google
Forms, atau backend sendiri.

## SEO

Situs ini SPA: satu `index.html` melayani semua rute, dan metadatanya baru
disetel JavaScript setelah halaman jalan. Mesin pencari modern me-render
JavaScript, tetapi **crawler pratinjau tautan — WhatsApp, Facebook, Telegram —
tidak**. Tanpa penanganan khusus, setiap tautan berita yang dibagikan warga
akan menampilkan pratinjau beranda yang sama persis.

Karena itu `npm run build` diakhiri [`scripts/prerender.mjs`](scripts/prerender.mjs),
yang menulis satu berkas HTML statis per rute — `dist/profil/index.html`,
`dist/berita/<slug>/index.html`, dan seterusnya — masing-masing dengan judul,
deskripsi, canonical, Open Graph, dan JSON-LD sendiri. Badan halaman tetap
dirakit React; yang ditambal hanya `<head>`, dan itu sudah cukup untuk
pratinjau tautan serta memberi mesin pencari judul yang benar sejak permintaan
pertama.

Skrip yang sama juga menghasilkan `sitemap.xml` dan `robots.txt` (yang
melarang `/admin`). Halaman admin dan 404 memasang `noindex` sendiri.

**Judul dan deskripsi rute tetap ada di [`src/data/seo.json`](src/data/seo.json)** —
satu sumber yang dipakai prerender maupun `useSeoRute()` saat pengguna
berpindah halaman, jadi keduanya tidak mungkin berbeda. Menambah halaman
publik berarti menambah entri di situ juga.

### Variabel yang perlu disetel di Vercel

| Variabel | Untuk apa |
| -------- | --------- |
| `VITE_API_URL` | Alamat backend. Juga dipakai prerender untuk mengambil daftar berita saat build |
| `SITE_URL` | Hanya bila memakai domain sendiri. Di Vercel boleh kosong — skripnya otomatis memakai `VERCEL_PROJECT_PRODUCTION_URL` |
| `VITE_SITE_URL` | Sama, untuk canonical sisi peramban |

Bila `SITE_URL` kosong dan bukan di Vercel, canonical dan sitemap sengaja
dilewati: URL absolut yang salah lebih berbahaya bagi SEO daripada tidak ada
sama sekali. Bila API tidak terjangkau saat build, halaman berita dilewati
dengan peringatan dan build tetap berhasil.

### Batasnya

Berita yang baru ditambahkan lewat panel admin **belum punya versi
prerender-nya sampai situs di-deploy ulang**. Halamannya tetap terbuka normal
dan tetap bisa ditemukan Google, tetapi pratinjau tautannya masih generik
sampai build berikutnya. Bila ini mengganggu, pasang Deploy Hook Vercel lalu
panggil dari panel admin setiap kali berita disimpan.

Halaman 404 juga tetap membalas status 200 — batas yang melekat pada hosting
statis tanpa server. Yang bisa dilakukan hanyalah memasang `noindex`, dan itu
sudah dilakukan.

## Catatan penerapan (deploy)

Routing memakai `BrowserRouter`, jadi server perlu mengarahkan semua rute ke
`index.html`. Hasil build hanya berisi **satu** `index.html` di akar — tidak
ada berkas `/admin`, `/profil`, dan seterusnya. Tanpa pengalihan itu, server
statis hanya bisa menjawab 404 untuk tautan langsung maupun saat halaman
di-refresh.

- **Vercel** — sudah disiapkan di [`vercel.json`](vercel.json). Pastikan
  **Root Directory** project disetel ke `kkn`, karena repo ini memuat
  `backend/` juga.
- **Netlify** — buat `public/_redirects` berisi `/* /index.html 200`
- **Apache** — `FallbackResource /index.html`
- **Nginx** — `try_files $uri $uri/ /index.html;`

Pengalihan ini hanya berlaku bila tidak ada berkas nyata yang cocok, jadi
`/assets/…` tetap dilayani apa adanya.

Bila hosting tidak mendukung rewrite (misalnya GitHub Pages tanpa konfigurasi
tambahan), ganti `BrowserRouter` menjadi `HashRouter` di `src/App.tsx`.

Frontend kini butuh backend agar berita, galeri, dan halaman Data terisi.
Bila keduanya di-host di alamat berbeda, setel `VITE_API_URL` **sebelum**
`npm run build` (nilainya ditanam saat build, bukan dibaca saat berjalan), dan
masukkan domain frontend ke `CORS_ORIGIN` pada `backend/.env`:

```bash
# kkn/.env
VITE_API_URL=https://api.kelurahan.example
```

Panel admin ikut terbawa di build yang sama. Kalau tidak ingin `/admin` bisa
dijangkau publik, batasi lewat konfigurasi server (mis. `basic_auth` atau
pembatasan IP di Nginx) — token JWT sudah menjaga API-nya, tetapi halamannya
sendiri tetap dapat dibuka siapa saja.

## Aksesibilitas & tampilan

- Tautan "Lompat ke konten utama", landmark `<header>/<main>/<footer>`, dan
  label ARIA pada tombol ikon.
- Animasi muncul-saat-digulir otomatis dimatikan bila pengguna mengaktifkan
  `prefers-reduced-motion`.
- Tata letak responsif hingga lebar layar ponsel; tabel data dapat digulir
  mendatar di dalam wadahnya.
- Font: **Fraunces** (judul) dan **Plus Jakarta Sans** (teks) dari Google Fonts,
  dengan cadangan font sistem bila tidak ada koneksi.

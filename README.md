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

## Halaman

| Rute             | Berkas                      | Isi                                                                        |
| ---------------- | --------------------------- | -------------------------------------------------------------------------- |
| `/`              | `src/pages/Beranda.tsx`     | Hero + jam layanan, statistik, sekilas wilayah & penggunaan lahan, program, kegiatan terbaru, galeri, CTA |
| `/profil`        | `src/pages/Profil.tsx`      | Sejarah (linimasa), visi & misi, struktur organisasi, batas & data pokok, lembaga kemasyarakatan |
| `/layanan`       | `src/pages/Layanan.tsx`     | Alur 4 langkah, katalog 10 layanan + persyaratan, jam loket, FAQ            |
| `/berita`        | `src/pages/Berita.tsx`      | Daftar berita, filter kategori, pencarian, paginasi                        |
| `/berita/:slug`  | `src/pages/BeritaDetail.tsx`| Artikel lengkap, tombol bagikan, berita terkait                            |
| `/galeri`        | `src/pages/Galeri.tsx`      | Grid album + filter + lightbox (navigasi panah & Esc)                      |
| `/data`          | `src/pages/Data.tsx`        | Penduduk per RT, piramida umur, pendidikan, pekerjaan, agama, sarana       |
| `/kontak`        | `src/pages/Kontak.tsx`      | Info kontak, jam layanan, formulir pesan, peta lokasi                      |
| `*`              | `src/pages/NotFound.tsx`    | Halaman 404                                                                 |

## Struktur berkas

```
src/
  data/         ← SEMUA ISI SITUS ADA DI SINI (lihat catatan di bawah)
    site.ts       identitas, kontak, menu, jam layanan, statistik utama
    profil.ts     sejarah, visi & misi, struktur, batas wilayah, program
    berita.ts     daftar berita beserta isi artikelnya
    layanan.ts    katalog layanan, persyaratan, alur, FAQ
    galeri.ts     daftar dokumentasi kegiatan
    statistik.ts  data kependudukan & sarana
  components/   navbar, footer, layout, ikon, kartu, peta sketsa, dll.
  pages/        satu berkas per halaman
  lib/          format tanggal/angka, hook <title>, pemetaan ikon
  styles/       tokens.css → base.css → layout.css → components.css → pages.css
```

Untuk mengubah teks atau menambah berita/layanan, cukup sunting berkas di
`src/data/` — tidak perlu menyentuh komponen.

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
2. **Nama pejabat** (`STRUKTUR` di `src/data/profil.ts`) — jabatannya sudah
   benar, tetapi belum ada nama pemangkunya.
3. **Surel** (`src/data/site.ts`) — belum tercantum di mana pun pada sumber
   resmi, jadi masih dugaan.
4. **Nomor WhatsApp** (`src/data/site.ts`) — belum terverifikasi.
5. **Jam pelayanan** (`JAM_RINGKAS` di `src/data/site.ts`) — belum tercantum
   pada situs resmi.
6. **Facebook** — poster resmi menyebut akun "Kelurahan Landasanulintengah",
   tetapi URL persisnya belum dipastikan sehingga belum dicantumkan.

Alamat kantor, nomor telepon, kode pos, dan akun Instagram **sudah
terkonfirmasi** dari halaman kontak situs resmi kelurahan.

## Berita

Isi `src/data/berita.ts` diambil dari publikasi resmi kelurahan di
<https://kel-landasanulintengah.banjarbarukota.go.id/>. Setiap entri menyimpan
`sumber` berisi tautan artikel aslinya, dan tautan itu ikut ditampilkan di
bawah artikel.

Fotonya diunduh dari situs yang sama dan disimpan di `public/berita/`. Karena
situs ini dibuat untuk kelurahan yang sama, pemakaiannya wajar — tetapi
sebaiknya tetap dikonfirmasi ke pengelola situs kelurahan sebelum
dipublikasikan.

Menambah berita baru: salin satu entri di `BERITA`, taruh fotonya di
`public/berita/`, lalu isi `foto` dan `sumber`. Bila `foto` dikosongkan,
gambar bangkitan otomatis dipakai sebagai gantinya.

## Galeri

`src/data/galeri.ts` memuat 15 gambar asli dari sumber yang sama, tersimpan di
`public/berita/`. Keterangannya ditulis berdasarkan acara dan tanggal
publikasi aslinya — bukan tafsiran atas isi frame. Tiap entri menyimpan
`sumber`, dan tautan "publikasi asli" muncul di dalam lightbox.

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

## Catatan penerapan (deploy)

Routing memakai `BrowserRouter`, jadi server perlu mengarahkan semua rute ke
`index.html` supaya tautan langsung seperti `/profil` tidak menghasilkan 404:

- **Netlify** — buat `public/_redirects` berisi `/* /index.html 200`
- **Vercel** — tambahkan rewrite `{"source": "/(.*)", "destination": "/index.html"}`
- **Apache** — `FallbackResource /index.html`
- **Nginx** — `try_files $uri $uri/ /index.html;`

Bila hosting tidak mendukung rewrite (misalnya GitHub Pages tanpa konfigurasi
tambahan), ganti `BrowserRouter` menjadi `HashRouter` di `src/App.tsx`.

## Aksesibilitas & tampilan

- Tautan "Lompat ke konten utama", landmark `<header>/<main>/<footer>`, dan
  label ARIA pada tombol ikon.
- Animasi muncul-saat-digulir otomatis dimatikan bila pengguna mengaktifkan
  `prefers-reduced-motion`.
- Tata letak responsif hingga lebar layar ponsel; tabel data dapat digulir
  mendatar di dalam wadahnya.
- Font: **Fraunces** (judul) dan **Plus Jakarta Sans** (teks) dari Google Fonts,
  dengan cadangan font sistem bila tidak ada koneksi.

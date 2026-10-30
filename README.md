# Portofolio Nugi

Portofolio React + Tailwind CSS (JavaScript) dengan komponen animasi gaya React Bits
(SplitText, TextType, ScrollReveal, LogoLoop, HoloCard) dan GSAP / Motion.

## Cara menjalankan

Butuh Node.js 20 atau lebih baru.

```bash
npm install        # sekali saja, memasang semua dependency
npm run dev        # jalankan mode pengembangan -> buka http://localhost:5173
```

Perintah lain:

```bash
npm run build      # build produksi ke folder dist/
npm run preview    # lihat hasil build di http://localhost:4173
```

## Yang perlu kamu ganti

| Apa | Di mana |
| --- | --- |
| Nama, role, lokasi, email, link sosial | `src/data/profile.js` |
| Teks About (kata di antara `**...**` tampil tebal) dan daftar teknologi berjalan | `src/data/profile.js` |
| Pengalaman (kartu horizontal) | `src/data/experiences.js` |
| Project (Selected Projects, All Projects, halaman detail) | `src/data/projects.js` |
| Sertifikat (judul, penerbit, tanggal, kategori, link verifikasi) | `src/data/certificates.js` |
| Gambar sertifikat | taruh di `public/certificates/`, lalu isi `image` di `certificates.js` (mis. `/certificates/istqb.jpg`) |
| Foto profil | taruh `public/profile.jpg` (rasio 4:5, latar gelap/transparan paling bagus) |
| CV | taruh `public/resume.pdf` |
| Foto pengalaman / screenshot project | taruh di `public/images/`, lalu isi `image` / `src` di file data |

Isi pengalaman, project, dan sertifikat saat ini adalah contoh. Selama `image` / `src` dikosongkan,
tampil placeholder otomatis.

## Struktur

```
src/
  App.jsx                  router + navbar + transisi halaman
  index.css                tema Tailwind (warna, font) — ganti warna di blok @theme
  data/                    semua konten (profile, experiences, projects)
  hooks/                   useScrollSection, useInView
  components/              komponen UI (SplitText, TextType, ScrollReveal, LogoLoop, HoloCard, ...)
  sections/                Hero, About, Experiences, ProjectsShowcase, Certificates
  pages/                   Home, AllProjects, ProjectDetail
```

## Catatan

- Section sertifikat: tombol filter kategori dibuat otomatis dari field `category`. Klik kartu untuk
  membuka tampilan besar (lightbox); tekan `Esc` untuk menutup.
- Warna tema: `paper` / `paper-2` (latar terang), `ink` (latar gelap), `accent` (violet) dan
  `accent-2` (cyan). Cukup ubah di `src/index.css` dan seluruh website ikut berubah.
- Font (Inter Tight, Instrument Serif, Manrope, Space Mono) dimuat dari Google Fonts lewat `index.html`.
- `TrueFocus.jsx` masih ada di `components/` tetapi tidak dipakai di tampilan saat ini
  (hero memakai efek mengetik seperti di video).

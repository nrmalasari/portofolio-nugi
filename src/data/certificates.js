// ======================================================
//  DATA SERTIFIKAT — tambah / ubah / hapus sesuai sertifikatmu
// ======================================================
// Cara menambah gambar sertifikat:
//   1. Simpan file gambar (jpg/png/webp) ke folder  public/certificates/
//   2. Isi `image` dengan path-nya, mis. '/certificates/istqb.jpg'
//   Kalau `image` dikosongkan, tampil kartu placeholder otomatis.
//
// date       : 'YYYY-MM'
// category   : bebas (mis. 'QA', 'AI', 'Web') — tombol filter dibuat otomatis
// credential : nomor / ID sertifikat (opsional)
// url        : link verifikasi sertifikat (opsional, isi '' kalau tidak ada)
export const certificates = [
  {
    id: 'istqb-foundation',
    title: 'ISTQB Certified Tester Foundation Level',
    issuer: 'ISTQB',
    date: '2025-03',
    category: 'QA',
    credential: 'CTFL-000000',
    url: '#',
    image: '',
  },
  {
    id: 'playwright-automation',
    title: 'Test Automation with Playwright',
    issuer: 'Udemy',
    date: '2025-01',
    category: 'QA',
    credential: 'UC-XXXXXXXX',
    url: '#',
    image: '',
  },
  {
    id: 'tensorflow-developer',
    title: 'TensorFlow Developer Certificate',
    issuer: 'Google · Coursera',
    date: '2024-11',
    category: 'AI',
    credential: 'XXXXXXXXXXXX',
    url: '#',
    image: '',
  },
  {
    id: 'ml-specialization',
    title: 'Machine Learning Specialization',
    issuer: 'DeepLearning.AI',
    date: '2024-08',
    category: 'AI',
    credential: '',
    url: '#',
    image: '',
  },
  {
    id: 'api-testing-postman',
    title: 'API Testing with Postman',
    issuer: 'Postman Academy',
    date: '2024-05',
    category: 'QA',
    credential: '',
    url: '',
    image: '',
  },
  {
    id: 'web-fundamentals',
    title: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    date: '2023-12',
    category: 'Web',
    credential: '',
    url: '#',
    image: '',
  },
]

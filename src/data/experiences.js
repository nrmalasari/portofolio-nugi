// Data pengalaman (contoh — ganti dengan pengalaman aslimu).
// image: isi path foto, mis. '/images/exp-1.jpg' (taruh di public/images). Kosongkan untuk placeholder.
export const experiences = [
  {
    id: 'qa-engineer',
    type: 'Work',
    title: 'QA Engineer Intern',
    company: 'Boost Indonesia (PT Creative Mobile Adventure)',
    description:
      'Tested CLOE, an internal financing portal (SCF, Invoice Financing, Term Loan) covering borrower onboarding through credit analysis. Wrote test cases, logged bugs and validated releases before UAT. Also validated the Agentic AI credit assessment that supports Credit Managers, and built end-to-end automation suites with Playwright and Pytest covering the full financing cycle through to LMS.',
    highlights: [
      'E2E & Functional Testing',
      'Playwright + Pytest Automation',
      'AI Feature Testing',
      'SIT Sign-off & UAT Support',
    ],
    period: 'May 2026 – Present',
    duration: '6 Months',
    image: '/images/exp-1.jpeg',
  },
  {
    id: 'system-developer',
    type: 'Intern',
    title: 'System Developer Intern',
    company: 'PT. Indekstat Konsultan Indonesia',
    description:
      'Built two AI-integrated n8n automations: one that extracts data from images into a finance spreadsheet, and one that auto-labels survey data from sheets uploaded via Telegram. Scraped national data on rice distributors, shops, supermarkets and rice-based industries down to district level, and helped train field enumerators in West Kalimantan for a nationwide rice availability survey.',
    highlights: [
      'n8n Automation with AI',
      'Data Scraping',
      'Survey Data Labeling',
      'Field Enumerator Training',
    ],
    period: 'Oct 2025 – Jan 2026',
    duration: '4 Months',
    image: '/images/exp-2.jpeg',
  },
  {
    id: 'bootcamp',
    type: 'Training',
    title: 'Data Science Bootcamp (MSIB Batch 7)',
    company: 'BISA AI Academy (PT Bisa Artifisial Indonesia)',
    description:
      'Independent study program covering data crawling, data mining, preprocessing, visualization, machine learning, deep learning, model evaluation, image processing and word embedding. Built predictive analysis and AI projects, and learned to deploy machine learning models into a website.',
    highlights: [
      'Data Mining & Preprocessing',
      'Machine Learning & Deep Learning',
      'Model Deployment',
      'Data Visualization',
    ],
    period: 'Sep 2024 – Dec 2024',
    duration: '4 Months',
    image: '/images/exp-3.jpeg',
  },
];

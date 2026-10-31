import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import useInView from '../hooks/useInView'
import { Award, ArrowUpRight, Close, Expand } from '../components/Icons'
import { certificates } from '../data/certificates'

const fmtDate = (d) => {
  const [y, m] = d.split('-')
  return new Date(Number(y), Number(m || 1) - 1, 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

const PER_PAGE = 6

// Gambar sertifikat. Jika `src` kosong -> placeholder gradient bertema.
const CertImage = ({ cert, large = false }) =>
  cert.image ? (
    <img src={cert.image} alt={`Certificate: ${cert.title}`} className={`h-full w-full ${large ? 'object-contain' : 'object-cover object-top'}`} draggable={false} />
  ) : (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#1b1f45,#0d1021)] text-white">
      <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-accent/40 blur-3xl" />
      <div className="absolute -bottom-12 -right-10 h-40 w-40 rounded-full bg-accent-2/30 blur-3xl" />
      <div className="absolute inset-3 rounded-lg border border-white/10" />
      <Award className={`relative text-accent-2 ${large ? 'h-14 w-14' : 'h-9 w-9'}`} />
      <p className={`relative mt-3 px-6 text-center font-serif italic leading-tight text-white/90 ${large ? 'text-3xl' : 'text-lg'}`}>{cert.title}</p>
      <p className="relative mt-2 font-mono text-[8px] uppercase tracking-[0.25em] text-white/40">{cert.issuer}</p>
    </div>
  )

const Lightbox = ({ cert, onClose }) => {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center p-3 md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      role="dialog"
      aria-modal="true"
      aria-label={cert.title}
    >
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-md" onClick={onClose} />
      <motion.div
        className="relative grid max-h-full w-full max-w-4xl overflow-y-auto rounded-2xl bg-paper shadow-2xl md:grid-cols-[1.5fr_1fr]"
        initial={{ y: 30, scale: 0.97 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 20, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="aspect-[4/3] w-full bg-ink md:aspect-auto md:min-h-[380px]">
          <CertImage cert={cert} large />
        </div>
        <div className="flex flex-col justify-between gap-6 p-5 md:gap-8 md:p-8">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-accent">
              {cert.featured ? `Featured · ${cert.category}` : cert.category}
            </p>
            <h3 className="mt-3 font-display text-xl font-semibold leading-tight tracking-tight md:text-2xl">{cert.title}</h3>
            <dl className="mt-5 space-y-3 text-sm md:mt-6 md:space-y-4">
              <div>
                <dt className="font-mono text-[8px] uppercase tracking-[0.25em] text-ink/40">Issued by</dt>
                <dd className="mt-1">{cert.issuer}</dd>
              </div>
              <div>
                <dt className="font-mono text-[8px] uppercase tracking-[0.25em] text-ink/40">Date</dt>
                <dd className="mt-1">{fmtDate(cert.date)}</dd>
              </div>
              {cert.credential && (
                <div>
                  <dt className="font-mono text-[8px] uppercase tracking-[0.25em] text-ink/40">Credential ID</dt>
                  <dd className="mt-1 break-all font-mono text-xs">{cert.credential}</dd>
                </div>
              )}
            </dl>
          </div>
          {cert.url && cert.url !== '#' && (
            <a href={cert.url} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-accent">
              Verify credential <ArrowUpRight className="h-3 w-3" />
            </a>
          )}
        </div>
        <button onClick={onClose} aria-label="Close" className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink shadow transition hover:bg-accent hover:text-white md:right-4 md:top-4 md:h-9 md:w-9">
          <Close />
        </button>
      </motion.div>
    </motion.div>
  )
}

const Certificates = () => {
  const [ref, inView] = useInView({ threshold: 0.15 })
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const [page, setPage] = useState(1)

  const categories = useMemo(() => ['All', ...new Set(certificates.map((c) => c.category))], [])

  // Urutan: sertifikat `featured` selalu di depan (sesuai urutan di data),
  // sisanya diurutkan dari tanggal terbaru.
  const sorted = useMemo(() => {
    const featured = certificates.filter((c) => c.featured)
    const rest = certificates.filter((c) => !c.featured).sort((a, b) => b.date.localeCompare(a.date))
    return [...featured, ...rest]
  }, [])

  // reset halaman saat filter berubah
  useEffect(() => {
    setPage(1)
  }, [filter])

  const filtered = filter === 'All' ? sorted : sorted.filter((c) => c.category === filter)
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const start = (safePage - 1) * PER_PAGE
  const list = filtered.slice(start, start + PER_PAGE)

  const stats = [
    [certificates.length, 'Certificates'],
    [new Set(certificates.map((c) => c.issuer)).size, 'Issuers'],
    [categories.length - 1, 'Fields'],
  ]

  const goTo = (p) => {
    setPage(p)
    // scroll halus ke atas grid sertifikat
    const el = document.getElementById('certificates')
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <section id="certificates" ref={ref} className="relative z-40 w-full overflow-hidden bg-paper-2 px-5 py-16 text-ink sm:px-6 md:px-12 md:py-24 lg:px-[clamp(48px,8vw,120px)]">
      <h2 aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-16 select-none text-center font-display text-[12vw] font-bold leading-none tracking-tighter text-accent/[0.07] blur-[4px] md:top-24 md:text-[11vw]">
        CERTIFICATES
      </h2>

      <div className="relative mx-auto max-w-[1200px]">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-accent">Credentials</p>
            <h2 className="mt-1 font-display text-xl font-semibold uppercase tracking-tight md:text-2xl">Certificates</h2>
          </div>
          <p className="hidden max-w-[300px] text-right text-[11px] leading-relaxed text-ink/45 md:block">
            Courses, trainings and certifications that shaped how I test, build and ship software.
          </p>
        </div>

        {/* statistik + filter */}
        <div className="mt-8 flex flex-col gap-5 md:mt-10 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-2 md:gap-3">
            {stats.map(([n, label]) => (
              <div key={label} className="min-w-[84px] flex-1 rounded-xl border border-ink/5 bg-white/50 px-4 py-2.5 md:min-w-[96px] md:flex-none md:px-5 md:py-3">
                <p className="font-serif text-2xl leading-none md:text-3xl">{n}</p>
                <p className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.2em] text-ink/40">{label}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-full border px-3 py-1.5 font-mono text-[8px] font-bold uppercase tracking-[0.16em] transition md:px-4 md:text-[9px] md:tracking-[0.18em] ${filter === c ? 'border-accent bg-accent text-white shadow-[0_8px_20px_-8px_rgba(124,92,255,0.8)]' : 'border-ink/10 bg-white/50 text-ink/55 hover:border-accent/50 hover:text-accent'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* grid sertifikat — 6 per halaman */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:mt-8 md:gap-5 lg:grid-cols-3">
          {list.map((cert, i) => (
            <article
              key={cert.id}
              className={`group overflow-hidden rounded-xl border bg-white/60 transition-[opacity,transform,box-shadow] duration-700 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(124,92,255,0.45)] ${cert.featured ? 'border-accent/40' : 'border-ink/5'}`}
              style={{ opacity: inView ? 1 : 0, transform: inView ? undefined : 'translateY(24px)', transitionDelay: `${i * 70}ms` }}
            >
              <button onClick={() => setSelected(cert)} className="block w-full text-left" aria-label={`View ${cert.title}`}>
                <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                  <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                    <CertImage cert={cert} />
                  </div>
                  <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 shadow transition group-hover:opacity-100">
                    <Expand className="h-3.5 w-3.5" />
                  </span>
                  <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-3 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur">
                    {cert.category}
                  </span>
                  {cert.featured && (
                    <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-accent px-3 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-white shadow">
                      <Award className="h-3 w-3" /> Featured
                    </span>
                  )}
                </div>
                <div className="p-4 md:p-5">
                  <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-accent">
                    {cert.issuer} · {fmtDate(cert.date)}
                  </p>
                  <h3 className="mt-2 font-display text-base font-semibold leading-snug tracking-tight md:text-lg">{cert.title}</h3>
                </div>
              </button>
              <div className="flex items-center justify-between border-t border-ink/5 px-4 py-2.5 md:px-5 md:py-3">
                <span className="truncate font-mono text-[8px] uppercase tracking-[0.15em] text-ink/35">{cert.credential ? `ID · ${cert.credential}` : 'Certificate'}</span>
                {cert.url && cert.url !== '#' ? (
                  <a href={cert.url} target="_blank" rel="noreferrer" className="flex shrink-0 items-center gap-1 font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-ink/60 transition hover:text-accent">
                    Verify <ArrowUpRight className="h-2.5 w-2.5" />
                  </a>
                ) : (
                  <button onClick={() => setSelected(cert)} className="flex shrink-0 items-center gap-1 font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-ink/60 transition hover:text-accent">
                    View <ArrowUpRight className="h-2.5 w-2.5" />
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* pagination — hanya tampil jika lebih dari 1 halaman */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2 md:mt-12">
            {/* Prev */}
            <button
              onClick={() => goTo(Math.max(1, safePage - 1))}
              disabled={safePage === 1}
              aria-label="Previous page"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-white/60 font-mono text-xs text-ink/60 transition hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-ink/10 disabled:hover:text-ink/60"
            >
              ‹
            </button>

            {/* Nomor halaman */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => goTo(p)}
                aria-label={`Page ${p}`}
                aria-current={p === safePage ? 'page' : undefined}
                className={`flex h-9 min-w-[36px] items-center justify-center rounded-full px-2 font-mono text-[11px] font-bold transition ${
                  p === safePage
                    ? 'bg-accent text-white shadow-[0_8px_20px_-8px_rgba(124,92,255,0.8)]'
                    : 'border border-ink/10 bg-white/60 text-ink/55 hover:border-accent/50 hover:text-accent'
                }`}
              >
                {p}
              </button>
            ))}

            {/* Next */}
            <button
              onClick={() => goTo(Math.min(totalPages, safePage + 1))}
              disabled={safePage === totalPages}
              aria-label="Next page"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-white/60 font-mono text-xs text-ink/60 transition hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-ink/10 disabled:hover:text-ink/60"
            >
              ›
            </button>
          </div>
        )}

        {/* info jumlah (opsional, bisa dihapus) */}
        {totalPages > 1 && (
          <p className="mt-4 text-center font-mono text-[8px] uppercase tracking-[0.22em] text-ink/35">
            Page {safePage} of {totalPages} · Showing {start + 1}–{Math.min(start + PER_PAGE, filtered.length)} of {filtered.length}
          </p>
        )}
      </div>

      <AnimatePresence>{selected && <Lightbox cert={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </section>
  )
}

export default Certificates

import { useEffect, useRef } from 'react'
import useScrollSection from '../hooks/useScrollSection'
import { Photo } from '../components/Shot'
import { experiences } from '../data/experiences'

const pad = (n) => String(n).padStart(2, '0')

const ExperienceCard = ({ item, index }) => (
  <article className="grid h-auto w-[min(86vw,760px)] shrink-0 grid-rows-[auto_130px] overflow-hidden rounded-[3px] bg-paper text-ink sm:grid-rows-[auto_170px] md:h-[min(60vh,430px)] md:min-h-[360px] md:grid-cols-[1.12fr_1fr] md:grid-rows-none">
    <div className="flex flex-col p-5 md:p-8">
      <p className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[8px] uppercase tracking-[0.2em] text-gray-400">
        <span>Professional Experience</span>
        <span className="font-bold text-ink">{item.type}</span>
      </p>
      <h3 className="mt-4 font-display text-[clamp(1.5rem,2.8vw,2.4rem)] font-bold uppercase leading-[0.95] tracking-[-0.045em] md:mt-5">{item.title}</h3>
      <p className="mt-2 text-[10px] font-bold uppercase tracking-wide md:mt-3 md:text-[11px]">{item.company}</p>
      <p className="mt-4 max-w-[40ch] text-[11px] leading-relaxed text-gray-500 md:mt-5 md:text-[12px]">{item.description}</p>

      <div className="mt-auto pt-5">
        <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-gray-400">Highlights</p>
        <ul className="mt-2 grid grid-cols-2 gap-x-4 border-t border-gray-200 pt-2 md:mt-3 md:gap-x-6 md:pt-3">
          {item.highlights.map((h, i) => (
            <li key={h} className="flex gap-2 py-1 font-mono text-[8px] font-bold uppercase leading-tight tracking-wider md:gap-2.5 md:py-1.5">
              <span className="text-gray-300">{pad(i + 1)}</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="relative min-h-0">
      <Photo src={item.image} label={item.title} />
      <span className="absolute right-4 top-3 font-display text-base font-medium text-white/90 md:text-lg">{pad(index + 1)}</span>
      <span className="absolute bottom-4 left-4 font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-white/80">
        {item.period} · {item.duration}
      </span>
    </div>
  </article>
)

const Experiences = () => {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const barRef = useRef(null)
  const dist = useRef(0)

  // tinggi section = 1 layar + jarak geser horizontal
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current
      const section = sectionRef.current
      if (!track || !section) return
      dist.current = Math.max(0, track.scrollWidth - window.innerWidth)
      section.style.height = `${window.innerHeight + dist.current}px`
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(trackRef.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  useScrollSection(sectionRef, (p) => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${-p * dist.current}px,0,0)`
      trackRef.current.style.opacity = String(0.35 + 0.65 * Math.min(1, p / 0.05 + 0.2))
    }
    if (barRef.current) barRef.current.style.transform = `scaleX(${p})`
  })

  return (
    <section id="experience" ref={sectionRef} className="relative z-30 w-full bg-ink text-white">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <h2 aria-hidden="true" className="pointer-events-none absolute inset-0 flex select-none items-center justify-center font-display text-[18vw] font-bold leading-none tracking-tighter text-white/[0.04] blur-[6px]">
          EXPERIENCES
        </h2>

        <div className="relative z-10 flex items-start justify-between px-5 pt-16 sm:px-6 md:px-[clamp(24px,8vw,120px)] md:pt-20">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/35">Career Archive</p>
            <h2 className="mt-1 font-display text-xl font-semibold uppercase tracking-tight md:text-2xl">Experiences</h2>
          </div>
          <p className="hidden max-w-[210px] text-right text-xs text-white/40 md:block">Roles, systems, and the work behind them.</p>
        </div>

        <div className="relative z-10 flex flex-1 items-center">
          <div ref={trackRef} className="flex w-max items-center gap-4 px-5 will-change-transform sm:px-6 md:gap-6 md:px-[clamp(24px,8vw,120px)]">
            {experiences.map((item, i) => (
              <ExperienceCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-5 mb-8 h-px bg-white/15 sm:mx-6 md:mx-[clamp(24px,8vw,120px)] md:mb-10">
          <div ref={barRef} className="h-full origin-left bg-white/80" style={{ transform: 'scaleX(0)' }} />
        </div>
      </div>
    </section>
  )
}

export default Experiences

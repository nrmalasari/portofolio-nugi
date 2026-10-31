import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useScrollSection from '../hooks/useScrollSection'
import ImageCarousel from '../components/ImageCarousel'
import { ArrowRight, ArrowUpRight } from '../components/Icons'
import { projects } from '../data/projects'

const pad = (n) => String(n).padStart(2, '0')

export const ProjectText = ({ project }) => (
  <div className="flex flex-col">
    <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-ink/40">{project.role}</p>
    <Link to={`/projects/${project.slug}`} className="group mt-3 flex items-start gap-2">
      <h3 className="font-sans text-[clamp(1.3rem,2vw,1.85rem)] font-medium leading-[1.15] tracking-tight">{project.title}</h3>
      <ArrowUpRight className="mt-1.5 h-3.5 w-3.5 shrink-0 text-ink/40 transition group-hover:text-ink" />
    </Link>
    <p className="mt-3 max-w-[46ch] text-[11px] leading-relaxed text-ink/55 md:mt-4 md:text-[12px]">{project.summary}</p>

    <p className="mt-4 font-mono text-[8px] uppercase tracking-[0.25em] text-ink/40 md:mt-6">Highlights</p>
    <ul className="mt-2 max-w-[52ch] space-y-1 md:mt-3 md:space-y-1.5">
      {project.highlights.map((h, i) => (
        <li key={h} className={`flex gap-3 text-[10px] leading-relaxed text-ink/60 md:text-[11px] ${i > 1 ? 'max-sm:hidden' : ''}`}>
          <span className="font-mono text-[8px] leading-[1.9] text-ink/30">{pad(i + 1)}</span>
          {h}
        </li>
      ))}
    </ul>

    <p className="mt-3 flex max-w-[52ch] flex-wrap gap-x-4 gap-y-1 font-mono text-[8px] uppercase tracking-[0.18em] text-ink/45 md:mt-5 md:gap-x-5 md:gap-y-1.5">
      {project.tech.map((t) => (
        <span key={t}>{t}</span>
      ))}
    </p>

    <div className="mt-4 flex flex-wrap items-center gap-4 md:mt-6 md:gap-5">
      <Link to={`/projects/${project.slug}`} className="inline-flex w-fit items-center gap-1.5 border-b border-ink/40 pb-0.5 font-mono text-[8px] font-bold uppercase tracking-[0.22em] transition hover:border-ink">
        View Project <ArrowUpRight className="h-2.5 w-2.5" />
      </Link>

      {/* ✅ TOMBOL PDF BARU */}
      {project.pdf && (
        <a
          href={project.pdf}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center gap-1.5 border-b border-accent/60 pb-0.5 font-mono text-[8px] font-bold uppercase tracking-[0.22em] text-accent transition hover:border-accent"
        >
          View PDF <ArrowUpRight className="h-2.5 w-2.5" />
        </a>
      )}
    </div>
  </div>
)

const ProjectsShowcase = () => {
  const stageRef = useRef(null)
  const [active, setActive] = useState(0)
  const n = projects.length

  useScrollSection(stageRef, (p) => setActive(Math.min(n - 1, Math.floor(p * n))))

  return (
    <section id="projects" className="relative z-40 w-full bg-paper-2 text-ink shadow-[0_-20px_50px_rgba(0,0,0,0.45)]">
      <div className="mx-auto flex max-w-[1200px] items-end justify-between gap-4 px-5 pb-4 pt-20 sm:px-6 md:px-12 md:pt-24 lg:px-[clamp(48px,8vw,120px)]">
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-ink/40">Portfolio Showcase</p>
          <h2 className="mt-1 font-display text-xl font-semibold uppercase tracking-tight md:text-2xl">Selected Projects</h2>
        </div>
        <Link to="/projects" className="flex items-center gap-2 pb-1 font-mono text-[8px] font-bold uppercase tracking-[0.22em] transition hover:opacity-60">
          View All Projects <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* area scroll: tiap project mendapat jatah scroll sendiri */}
      <div ref={stageRef} style={{ height: `calc(100vh + ${n * 70}vh)` }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          {projects.map((project, i) => {
            const isActive = i === active
            const flip = i % 2 === 1
            return (
              <div
                key={project.slug}
                aria-hidden={!isActive}
                className={`absolute inset-0 flex items-center transition-all duration-700 ease-out ${isActive ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-8 opacity-0'}`}
              >
                <div className="mx-auto grid w-full max-w-[1200px] items-center gap-4 px-5 pb-12 pt-14 sm:px-6 md:gap-6 md:px-12 md:pt-16 lg:grid-cols-2 lg:gap-12 lg:px-[clamp(48px,8vw,120px)]">
                  <div className={flip ? 'lg:order-2' : ''}>
                    <ProjectText project={project} />
                  </div>
                  <div className={flip ? 'lg:order-1' : ''}>
                    <ImageCarousel images={project.images} active={isActive} />
                  </div>
                </div>
              </div>
            )
          })}
          <p className="absolute bottom-4 right-5 font-mono text-[8px] uppercase tracking-[0.25em] text-ink/40 md:bottom-8 md:right-[clamp(48px,8vw,120px)]">
            Next project · {pad(active + 1)} / {pad(n)}
          </p>
        </div>
      </div>

      <div className="flex justify-center pb-16 pt-4 md:pb-24">
        <Link to="/projects" className="flex items-center gap-2 rounded-full bg-ink px-7 py-2.5 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-white shadow-lg transition hover:bg-gray-800">
          View All Projects <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </section>
  )
}

export default ProjectsShowcase
import { Link, Navigate, useParams } from 'react-router-dom'
import ImageCarousel from '../components/ImageCarousel'
import Contact from '../components/Contact'
import { ArrowLeft, ArrowRight, ArrowUpRight } from '../components/Icons'
import { projects } from '../data/projects'
import { experiences } from '../data/experiences'

const pad = (n) => String(n).padStart(2, '0')

const Label = ({ children, className = '' }) => (
  <p className={`font-mono text-[8px] uppercase tracking-[0.3em] text-ink/40 ${className}`}>{children}</p>
)

const ProjectDetail = () => {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  if (index < 0) return <Navigate to="/projects" replace />

  const project = projects[index]
  const prev = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]
  const exp = experiences.find((e) => `experiences:${e.id}` === project.related)
  const { story } = project

  return (
    <main className="bg-paper">
      {/* kepala project */}
      <section className="px-5 pb-10 pt-28 sm:px-6 md:px-12 md:pb-12 md:pt-32 lg:px-[clamp(48px,8vw,120px)]">
        <div className="mx-auto grid max-w-[1200px] gap-8 md:gap-10 lg:grid-cols-[1fr_240px]">
          <div>
            <Label>Project {pad(index + 1)} / {pad(projects.length)}</Label>
            <h1 className="mt-3 font-display text-[clamp(2rem,4.9vw,4rem)] font-semibold leading-[1] tracking-[-0.045em] md:mt-4">{project.title}</h1>
            <p className="mt-4 max-w-[58ch] text-[12px] leading-relaxed text-ink/60 md:mt-6 md:text-[13px]">{project.summary}</p>
            <Link to="/projects" className="mt-6 inline-flex items-center gap-1.5 border-b border-ink/40 pb-0.5 font-mono text-[8px] font-bold uppercase tracking-[0.22em]">
              View project archive <ArrowUpRight className="h-2.5 w-2.5" />
            </Link>
          </div>

          <dl className="space-y-4 border-ink/10 md:space-y-5 lg:border-l lg:pl-7">
            <div>
              <dt><Label>Role</Label></dt>
              <dd className="mt-1.5 text-[12px] font-medium">{project.role}</dd>
            </div>
            <div>
              <dt><Label>Discipline</Label></dt>
              <dd className="mt-1.5 text-[12px] font-medium">{project.disciplineLabel}</dd>
            </div>
            {exp && (
              <div>
                <dt><Label>Related experience</Label></dt>
                <dd className="mt-1.5">
                  <Link to="/" state={{ scrollTo: 'experience' }} className="flex items-start gap-1.5 text-[12px] font-medium hover:opacity-60">
                    {exp.company} <ArrowUpRight className="mt-0.5 h-3 w-3 shrink-0" />
                  </Link>
                </dd>
              </div>
            )}
          </dl>
        </div>

        <div className="mx-auto mt-10 max-w-[1200px] md:mt-14">
          <ImageCarousel images={project.images} autoplay={0} ratio="aspect-[16/9]" />
        </div>
      </section>

      {/* cerita project */}
      <section className="px-5 py-14 sm:px-6 md:px-12 md:py-20 lg:px-[clamp(48px,8vw,120px)]">
        <div className="mx-auto max-w-[1200px]">
          <Label>Project story</Label>
          <h2 className="mt-3 max-w-[22ch] font-display text-[clamp(1.4rem,2.5vw,2.25rem)] font-semibold leading-[1.08] tracking-[-0.035em]">{story.title}</h2>

          <div className="mt-8 grid gap-8 md:mt-12 md:gap-10 lg:grid-cols-[1.25fr_1fr]">
            <ol className="divide-y divide-ink/10 border-y border-ink/10">
              {story.points.map((point, i) => (
                <li key={point} className="flex gap-4 py-3.5 text-[11px] leading-relaxed text-ink/65 md:gap-5 md:py-4 md:text-[12px]">
                  <span className="pt-0.5 font-mono text-[8px] text-ink/30">{pad(i + 1)}</span>
                  {point}
                </li>
              ))}
            </ol>

            <div className="self-start rounded-2xl bg-ink p-5 text-white md:p-7">
              <p className="text-[13px] leading-relaxed md:text-[14px]">{story.card.text}</p>
              <div className="mt-6 flex gap-8 md:mt-8 md:gap-12">
                {story.card.stats.map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-3xl font-medium tracking-tight md:text-4xl">{s.value}</p>
                    <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.22em] text-white/40">{s.label}</p>
                  </div>
                ))}
              </div>
              <ul className="mt-6 space-y-2 text-[10px] leading-relaxed text-white/70 md:mt-8 md:space-y-2.5 md:text-[11px]">
                {story.card.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-white/50" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* teknologi */}
      <section className="px-5 pb-16 sm:px-6 md:px-12 md:pb-24 lg:px-[clamp(48px,8vw,120px)]">
        <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-5 border-t border-ink/10 pt-6 md:flex-row md:pt-8">
          <div>
            <Label>Technology</Label>
            <p className="mt-2 text-[11px] text-ink/45">Core tools used to deliver the platform.</p>
          </div>
          <ul className="flex max-w-[560px] flex-wrap gap-2.5 md:justify-end">
            {project.tech.map((t) => (
              <li key={t} className="rounded-full border border-ink/15 bg-white/40 px-3 py-1 text-[10px] text-ink/70 md:px-4 md:py-1.5 md:text-[11px]">{t}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* sebelum / sesudah */}
      <section className="grid border-t border-ink/10 md:grid-cols-2">
        <Link to={`/projects/${prev.slug}`} className="group px-5 py-10 transition hover:bg-paper-2 sm:px-6 md:px-12 md:py-14 lg:pl-[clamp(48px,8vw,120px)]">
          <p className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.25em] text-ink/40"><ArrowLeft /> Previous project</p>
          <p className="mt-4 font-display text-lg font-semibold tracking-tight md:mt-6 md:text-2xl">{prev.title}</p>
        </Link>
        <Link to={`/projects/${next.slug}`} className="group bg-ink px-5 py-10 text-white transition hover:bg-black sm:px-6 md:px-12 md:py-14 lg:pr-[clamp(48px,8vw,120px)]">
          <p className="flex items-center justify-end gap-2 font-mono text-[8px] uppercase tracking-[0.25em] text-white/45">Next project <ArrowRight /></p>
          <p className="mt-4 text-right font-display text-lg font-semibold tracking-tight md:mt-6 md:text-2xl">{next.title}</p>
        </Link>
      </section>

      <Contact />
    </main>
  )
}

export default ProjectDetail

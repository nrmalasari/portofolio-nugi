import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Shot } from '../components/Shot'
import Contact from '../components/Contact'
import { ArrowUpRight } from '../components/Icons'
import { disciplines, projects } from '../data/projects'
import { profile } from '../data/profile'

const pad = (n) => String(n).padStart(2, '0')

const AllProjects = () => {
  const [filter, setFilter] = useState('all')
  const list = filter === 'all' ? projects : projects.filter((p) => p.discipline === filter)
  const count = (d) => projects.filter((p) => p.discipline === d).length

  return (
    <main>
      <section className="relative overflow-hidden bg-paper px-6 pb-28 pt-36 md:px-12 lg:px-[clamp(48px,8vw,120px)]">
        <h2 aria-hidden="true" className="pointer-events-none absolute right-[4vw] top-24 select-none font-display text-[18vw] font-bold leading-none tracking-tighter text-ink/[0.05] blur-[4px]">
          WORK
        </h2>

        <div className="relative mx-auto max-w-[1400px]">
          <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-ink/40">Project Index / {pad(projects.length)}</p>
          <h1 className="mt-4 font-display text-[clamp(3.4rem,9vw,8rem)] font-semibold leading-[0.95] tracking-[-0.05em]">All projects.</h1>
          <p className="mt-6 max-w-[52ch] text-[13px] leading-relaxed text-ink/55">
            A growing archive of digital products, internal systems, and web experiences — from interface craft to fullstack delivery.
          </p>
          <a href={profile.socials.github} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1.5 border-b border-ink/40 pb-0.5 font-mono text-[8px] font-bold uppercase tracking-[0.22em]">
            Open project archive <ArrowUpRight className="h-2.5 w-2.5" />
          </a>

          <div className="mt-16 border-t border-ink/10 pt-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-ink/40">Filter by discipline</p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {['all', ...disciplines].map((d) => {
                    const on = filter === d
                    return (
                      <button
                        key={d}
                        onClick={() => setFilter(d)}
                        className={`rounded-full border px-4 py-2 font-mono text-[8px] font-bold uppercase tracking-[0.18em] transition ${on ? 'border-ink bg-ink text-white' : 'border-ink/10 bg-white/50 text-ink/60 hover:border-ink/40'}`}
                      >
                        {d === 'all' ? 'All projects' : d}
                        <span className={`ml-2 ${on ? 'text-white/50' : 'text-ink/30'}`}>{pad(d === 'all' ? projects.length : count(d))}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
              <p className="self-end font-mono text-[8px] uppercase tracking-[0.2em] text-ink/35">Showing {pad(list.length)} projects</p>
            </div>
          </div>

          <div key={filter} className="mt-12 grid gap-x-10 gap-y-14 md:grid-cols-2">
            {list.map((p, i) => (
              <Link key={p.slug} to={`/projects/${p.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-white">
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03] [mask-image:linear-gradient(to_bottom,#000_65%,transparent)]">
                    <Shot image={p.images[0]} />
                  </div>
                  <span className="absolute left-3 top-3 rounded-full bg-ink/55 px-3 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur">
                    {p.discipline}
                  </span>
                  <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink shadow transition group-hover:bg-ink group-hover:text-white">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
                <p className="mt-5 font-mono text-[8px] uppercase tracking-[0.22em] text-ink/40">{pad(i + 1)} / {p.role}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight md:text-2xl">{p.title}</h3>
                <p className="mt-2 max-w-[56ch] text-[12px] leading-relaxed text-ink/50">{p.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Contact />
    </main>
  )
}

export default AllProjects

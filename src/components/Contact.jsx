import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { ArrowUpRight } from './Icons'

const useClock = (timeZone) => {
  const fmt = () => new Intl.DateTimeFormat('en-GB', { timeZone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date())
  const [time, setTime] = useState(fmt)
  useEffect(() => {
    const t = setInterval(() => setTime(fmt()), 1000)
    return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZone])
  return time
}

const Contact = () => {
  const time = useClock(profile.timeZone)
  const links = [
    ['Resume', profile.resume],
    ['GitHub', profile.socials.github],
    ['LinkedIn', profile.socials.linkedin],
    ['Instagram', profile.socials.instagram],
  ]
  return (
    <section id="contact" className="relative z-30 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-ink px-5 py-24 text-center text-white md:px-6">
      <h2 aria-hidden="true" className="pointer-events-none absolute inset-0 flex select-none items-center justify-center font-display text-[18vw] font-bold leading-none tracking-tighter text-white/[0.04] blur-[5px]">
        CONTACT
      </h2>

      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-[110px] md:h-[440px] md:w-[440px] md:blur-[140px]" />

      <div className="relative z-10 flex flex-col items-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">Get in touch</p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/25">
          {profile.city} / {time} WIB
        </p>

        <h3 className="mt-10 font-display text-[clamp(2.2rem,5.8vw,5rem)] font-semibold uppercase leading-[0.95] tracking-[-0.05em] md:mt-12">
          Let&apos;s work<br />together
        </h3>

        <a href={`mailto:${profile.email}`} className="mt-8 flex max-w-full items-center gap-2 break-all text-sm text-white/80 transition hover:text-accent-2 md:mt-10 md:text-base">
          {profile.email} <ArrowUpRight className="h-3.5 w-3.5" />
        </a>

        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:mt-8 md:gap-x-8">
          {links.map(([label, href]) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noreferrer" className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/40 transition hover:text-white">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p className="absolute bottom-5 px-5 text-center font-mono text-[8px] uppercase tracking-[0.2em] text-white/20 md:bottom-6 md:text-[9px]">
        © {new Date().getFullYear()} {profile.name}. All rights reserved.
      </p>
    </section>
  )
}

export default Contact

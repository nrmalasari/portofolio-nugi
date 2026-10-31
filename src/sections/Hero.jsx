import { useEffect, useRef } from 'react'
import SplitText from '../components/SplitText'
import TextType from '../components/TextType'
import HoloCard from '../components/HoloCard'
import { GithubIcon, InstagramIcon, LinkedinIcon, MailIcon } from '../components/Icons'
import { profile } from '../data/profile'

const Hero = () => {
  const curveRef = useRef(null)

  // lengkungan gelap di dasar hero melandai saat di-scroll
  useEffect(() => {
    const onScroll = () => {
      const p = Math.min(1, window.scrollY / (window.innerHeight * 0.55))
      if (curveRef.current) curveRef.current.style.transform = `translateX(-50%) scaleY(${1 - p})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const socials = [
    [profile.socials.github, GithubIcon, 'GitHub'],
    [profile.socials.linkedin, LinkedinIcon, 'LinkedIn'],
    [profile.socials.instagram, InstagramIcon, 'Instagram'],
    [`mailto:${profile.email}`, MailIcon, 'Email'],
  ]

  return (
    <section id="top" className="relative z-20 flex h-auto min-h-[100svh] w-full flex-col bg-paper lg:h-screen lg:min-h-[620px]">
      {/* cahaya gradient lembut di latar */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-24 h-[260px] w-[260px] rounded-full bg-accent/20 blur-[90px] md:h-[360px] md:w-[360px] md:blur-[110px]" />
        <div className="absolute -right-20 bottom-10 h-[240px] w-[240px] rounded-full bg-accent-2/20 blur-[90px] md:h-[320px] md:w-[320px] md:blur-[110px]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1200px] flex-1 grid-cols-1 items-center gap-6 px-5 pb-20 pt-24 sm:px-8 md:grid-cols-2 md:gap-8 md:px-10 md:pb-24 lg:gap-12 lg:px-16">
        {/* kiri: teks */}
        <div className="relative z-30 flex flex-col space-y-3.5 md:space-y-4">
          <div className="flex space-x-4 text-gray-400 md:space-x-5">
            {socials.map(([href, Icon, label]) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="transition hover:text-ink">
                <Icon className="h-4 w-4 md:h-[18px] md:w-[18px]" />
              </a>
            ))}
          </div>

          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500 md:text-[10px]">{profile.location}</p>

          <SplitText
            as="h1"
            segments={[{ text: "Hi, I'm " }, { text: `${profile.name}.`, className: 'italic text-accent' }]}
            className="-ml-1 whitespace-nowrap font-serif text-[clamp(2.5rem,6.2vw,4.75rem)] leading-[1.02] tracking-tight text-ink"
            delay={60}
            duration={1.4}
            ease="power4.out"
            from={{ opacity: 0, y: 50 }}
            to={{ opacity: 1, y: 0 }}
          />

          <p className="text-[clamp(1rem,1.7vw,1.5rem)] font-light tracking-wide text-gray-800">
            <TextType text={profile.roles} />
          </p>

          <div className="pt-2">
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-full bg-ink px-7 py-2.5 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white shadow-lg transition hover:bg-accent md:text-[10px] hover:shadow-[0_10px_30px_-8px_rgba(124,92,255,0.7)]"
            >
              Resume
            </a>
          </div>
        </div>

        {/* kanan: kartu foto */}
        <div className="relative z-30 mt-2 flex justify-center md:mt-0 md:justify-end">
          <div className="w-full max-w-[210px] sm:max-w-[240px] md:max-w-[270px] lg:max-w-[320px]">
            <HoloCard image={profile.photo} name={profile.handle} status="Available for work" />
          </div>
        </div>
      </div>

      {/* petunjuk scroll */}
      <div className="absolute bottom-[84px] left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-2 text-gray-400 md:flex">
        <span className="flex h-7 w-4 justify-center rounded-full border border-current pt-1.5">
          <i className="h-1.5 w-[2px] animate-nudge rounded-full bg-current" />
        </span>
        <span className="font-mono text-[8px] uppercase tracking-[0.3em]">Scroll more</span>
      </div>

      {/* lengkungan gelap */}
      <div
        ref={curveRef}
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 z-20 h-[44px] w-[140%] origin-bottom bg-ink md:h-[68px]"
        style={{ transform: 'translateX(-50%)', borderRadius: '50% 50% 0 0 / 100% 100% 0 0' }}
      />
    </section>
  )
}

export default Hero

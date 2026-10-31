import ScrollReveal from '../components/ScrollReveal'
import LogoLoop from '../components/LogoLoop'
import { aboutText, techStack } from '../data/profile'

const About = () => (
  <section id="about" className="relative z-30 flex min-h-screen w-full flex-col items-center justify-center bg-ink pb-12 pt-24 text-white md:pb-16 md:pt-28">
    <div className="w-full max-w-3xl px-5 text-center sm:px-6">
      <ScrollReveal
        baseOpacity={0.1}
        enableBlur
        baseRotation={2}
        blurStrength={4}
        wordAnimationEnd="bottom center"
        textClassName="text-[clamp(1.2rem,2.2vw,1.85rem)] leading-[1.32] font-normal tracking-tight text-white/55"
      >
        {aboutText}
      </ScrollReveal>
    </div>

    <div className="mt-14 w-full md:mt-20">
      <LogoLoop
        logos={techStack.map((text) => ({ text }))}
        speed={55}
        direction="left"
        gap={32}
        pauseOnHover={false}
        fadeOut
        draggable={false}
        ariaLabel="Tech stack"
      />
    </div>
  </section>
)

export default About

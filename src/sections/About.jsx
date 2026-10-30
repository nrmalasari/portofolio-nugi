import ScrollReveal from '../components/ScrollReveal'
import LogoLoop from '../components/LogoLoop'
import { aboutText, techStack } from '../data/profile'

const About = () => (
  <section id="about" className="relative z-30 flex min-h-screen w-full flex-col items-center justify-center bg-ink pb-16 pt-32 text-white">
    <div className="w-full max-w-4xl px-6 text-center">
      <ScrollReveal
        baseOpacity={0.1}
        enableBlur
        baseRotation={2}
        blurStrength={4}
        wordAnimationEnd="bottom center"
        textClassName="text-[clamp(1.5rem,3.1vw,2.6rem)] leading-[1.28] font-normal tracking-tight text-white/55"
      >
        {aboutText}
      </ScrollReveal>
    </div>

    <div className="mt-24 w-full">
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

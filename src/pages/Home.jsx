import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Experiences from '../sections/Experiences'
import ProjectsShowcase from '../sections/ProjectsShowcase'
import Certificates from '../sections/Certificates'
import Contact from '../components/Contact'

const Home = () => {
  const { state } = useLocation()

  // datang dari halaman lain lewat menu (mis. "Experience") -> scroll ke section itu
  useEffect(() => {
    if (!state?.scrollTo || state.scrollTo === 'top') return
    const t = setTimeout(() => document.getElementById(state.scrollTo)?.scrollIntoView(), 450)
    return () => clearTimeout(t)
  }, [state])

  return (
    <main>
      <Hero />
      <About />
      <Experiences />
      <ProjectsShowcase />
      <Certificates />
      <Contact />
    </main>
  )
}

export default Home

import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import MenuOverlay from './MenuOverlay'
import { profile } from '../data/profile'

const Navbar = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isHome = pathname === '/'
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const lastY = useRef(0)

  // sembunyi saat scroll turun, muncul saat scroll naik
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      if (y > 140 && y > lastY.current + 6) setHidden(true)
      else if (y < lastY.current - 6 || y <= 140) setHidden(false)
      lastY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = useCallback(() => setOpen(false), [])

  const select = (item) => {
    setOpen(false)
    if (item.to) return navigate(item.to)
    if (isHome) {
      const el = document.getElementById(item.target)
      setTimeout(() => (item.target === 'top' ? window.scrollTo({ top: 0, behavior: 'smooth' }) : el?.scrollIntoView({ behavior: 'smooth' })), 350)
    } else {
      navigate('/', { state: { scrollTo: item.target } })
    }
  }

  const linkCls = ({ isActive }) =>
    `border-b pb-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] transition ${isActive ? 'border-ink text-ink' : 'border-transparent text-ink/45 hover:text-ink'}`

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ${hidden && !open ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className={`flex items-center justify-between px-6 py-5 transition-[background-color,backdrop-filter] duration-300 md:px-10 md:py-6 ${scrolled ? 'bg-paper/75 backdrop-blur-md' : ''}`}>
          <Link to="/" className="flex items-center gap-3" aria-label="Home">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2 pb-0.5 font-serif text-lg italic text-white">{profile.name[0].toLowerCase()}</span>
            <span className="rounded-full bg-white/50 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-ink/80">
              {profile.name} / Portfolio
            </span>
          </Link>

          {isHome ? (
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.15em] shadow-sm transition hover:shadow-md"
            >
              Menu <span className="text-lg font-light leading-none text-gray-400">+</span>
            </button>
          ) : (
            <nav className="flex items-center gap-7">
              <NavLink to="/" end className={linkCls}>Home</NavLink>
              <NavLink to="/projects" className={linkCls}>Projects</NavLink>
            </nav>
          )}
        </div>
      </header>
      <MenuOverlay open={open} onClose={close} onSelect={select} />
    </>
  )
}

export default Navbar

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Close } from './Icons'

const menuItems = [
  { label: 'Home', target: 'top' },
  { label: 'About', target: 'about' },
  { label: 'Experience', target: 'experience' },
  { label: 'Projects', target: 'projects' },
  { label: 'Certificates', target: 'certificates' },
  { label: 'All Projects', to: '/projects' },
  { label: 'Contact', target: 'contact' },
]

const MenuOverlay = ({ open, onClose, onSelect }) => {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="absolute inset-0 bg-black/20 backdrop-blur-md" onClick={onClose} />

          <motion.nav
            className="absolute inset-y-0 right-0 flex w-full flex-col justify-center overflow-y-auto bg-ink bg-[radial-gradient(90%_70%_at_100%_0%,rgba(124,92,255,0.22),transparent_60%)] px-6 py-20 text-white sm:px-10 md:w-[46%] md:px-14 lg:w-[40%]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-3 flex items-center gap-1.5 rounded-full bg-paper px-4 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-ink shadow-sm transition hover:bg-white sm:right-6 md:right-10 md:top-4 md:gap-2 md:px-5 md:py-2 md:text-[10px]"
            >
              Close <Close />
            </button>

            <ul className="group/menu">
              {menuItems.map((item, i) => (
                <li key={item.label} className="relative overflow-hidden">
                  <motion.button
                    onClick={() => onSelect(item)}
                    className="block py-[0.1em] text-left font-display text-[clamp(1.9rem,4.2vw,3.4rem)] font-semibold uppercase leading-[1.02] tracking-tighter transition-[opacity,transform] duration-300 hover:translate-x-2 hover:text-accent-2"
                    initial={{ y: '105%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '105%' }}
                    transition={{ duration: 0.7, delay: 0.25 + i * 0.06, ease: [0.76, 0, 0.24, 1] }}
                  >
                    {item.label}
                  </motion.button>
                  <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 font-mono text-[10px] text-accent-2/60">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </li>
              ))}
            </ul>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MenuOverlay

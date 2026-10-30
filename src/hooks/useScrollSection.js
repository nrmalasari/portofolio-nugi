import { useEffect } from 'react'

const clamp = (v) => Math.min(1, Math.max(0, v))

// Memantau progress scroll (0..1) sebuah section "sticky".
// onProgress(p) dipanggil lewat requestAnimationFrame, tanpa re-render React.
export default function useScrollSection(ref, onProgress) {
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const scrollable = el.offsetHeight - window.innerHeight
      onProgress(scrollable > 0 ? clamp(-rect.top / scrollable) : 0)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])
}

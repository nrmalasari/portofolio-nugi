import { useEffect, useState } from 'react'
import { Shot } from './Shot'
import { ChevronLeft, ChevronRight } from './Icons'

const pad = (n) => String(n).padStart(2, '0')

// Carousel screenshot + caption + progress bar (dipakai di Selected Projects & halaman detail)
const ImageCarousel = ({ images, active = true, autoplay = 4500, ratio = 'aspect-[16/10]' }) => {
  const [i, setI] = useState(0)
  const [hover, setHover] = useState(false)
  const n = images.length
  const go = (d) => setI((v) => (v + d + n) % n)

  useEffect(() => {
    if (!active || hover || n < 2 || !autoplay) return
    const t = setTimeout(() => setI((v) => (v + 1) % n), autoplay)
    return () => clearTimeout(t)
  }, [i, active, hover, n, autoplay])

  const current = images[i]
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className={`group relative w-full overflow-hidden rounded-md ${ratio}`}>
        <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_68%,transparent)]">
          {images.map((img, idx) => (
            <div key={idx} className={`absolute inset-0 transition-opacity duration-700 ${idx === i ? 'opacity-100' : 'opacity-0'}`}>
              <Shot image={img} />
            </div>
          ))}
        </div>
        {n > 1 && (
          <>
            <button onClick={() => go(-1)} aria-label="Previous image" className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink/45 text-white backdrop-blur transition hover:bg-ink/70">
              <ChevronLeft />
            </button>
            <button onClick={() => go(1)} aria-label="Next image" className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink/45 text-white backdrop-blur transition hover:bg-ink/70">
              <ChevronRight />
            </button>
          </>
        )}
      </div>

      <div className="mt-3 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/70">
            {pad(i + 1)} / {pad(n)} <span className="ml-2 font-bold text-ink">{current.caption}</span>
          </p>
          <p className="mt-1.5 max-w-[46ch] text-[11px] leading-relaxed text-ink/45">{current.desc}</p>
        </div>
        <div className="mt-1 flex shrink-0 items-center gap-1.5" role="tablist" aria-label="Image progress">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Image ${idx + 1}`}
              className={`h-[3px] rounded-full transition-all duration-500 ${idx === i ? 'w-8 bg-ink/70' : 'w-3 bg-ink/20'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ImageCarousel

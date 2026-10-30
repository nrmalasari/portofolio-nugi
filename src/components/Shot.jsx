// Gambar screenshot project. Jika `src` kosong, tampil mock UI sebagai placeholder.
const MockShot = ({ hue = 220, variant = 0 }) => {
  const dark = `hsl(${hue} 45% 26%)`
  const mid = `hsl(${hue} 70% 46%)`
  const light = `hsl(${(hue + 35) % 360} 85% 74%)`
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div className="flex h-6 shrink-0 items-center gap-1.5 border-b border-slate-200 bg-slate-100 px-3">
        <i className="h-1.5 w-1.5 rounded-full bg-slate-300" />
        <i className="h-1.5 w-1.5 rounded-full bg-slate-300" />
        <i className="h-1.5 w-1.5 rounded-full bg-slate-300" />
        <i className="ml-3 h-2 w-1/3 rounded-full bg-slate-200" />
      </div>
      <div className="flex min-h-0 flex-1">
        <div className="hidden w-[13%] shrink-0 flex-col gap-2 p-3 sm:flex" style={{ background: dark }}>
          {[...Array(5)].map((_, i) => (
            <i key={i} className="h-1.5 rounded-full bg-white/40" style={{ width: `${90 - i * 9}%` }} />
          ))}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-3 p-4">
          {variant === 2 ? (
            <>
              <div className="h-3 w-1/3 rounded-full bg-slate-800/80" />
              <div className="h-2 w-1/2 rounded-full bg-slate-300" />
              <div className="grid flex-1 grid-cols-3 gap-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="rounded-lg" style={{ background: `linear-gradient(160deg, hsl(${hue + i * 25} 70% ${48 + i * 8}%), hsl(${hue + i * 25 + 30} 80% 82%))` }} />
                ))}
              </div>
            </>
          ) : variant === 1 ? (
            <>
              <div className="flex gap-3">
                <div className="h-6 w-6 shrink-0 rounded-full" style={{ background: mid }} />
                <div className="h-8 w-3/5 rounded-2xl bg-slate-100" />
              </div>
              <div className="flex justify-end gap-3">
                <div className="h-6 w-2/5 rounded-2xl" style={{ background: mid }} />
              </div>
              <div className="flex gap-3">
                <div className="h-6 w-6 shrink-0 rounded-full" style={{ background: mid }} />
                <div className="h-12 w-4/5 rounded-2xl bg-slate-100" />
              </div>
              <div className="mt-auto h-7 rounded-full border border-slate-200" />
            </>
          ) : (
            <>
              <div className="h-[26%] rounded-lg" style={{ background: `linear-gradient(120deg, ${mid}, ${light})` }} />
              <div className="grid grid-cols-3 gap-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-10 rounded-md bg-slate-100" />
                ))}
              </div>
              <div className="flex flex-1 items-end gap-2">
                {[40, 65, 50, 85, 60, 95, 70, 55].map((h, i) => (
                  <i key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: i % 3 === 0 ? mid : light, opacity: 0.85 }} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export const Shot = ({ image, className = '' }) =>
  image.src ? (
    <img src={image.src} alt={image.caption} className={`h-full w-full object-cover object-top ${className}`} draggable={false} />
  ) : (
    <MockShot {...(image.mock || {})} />
  )

// Foto pengalaman. Jika `src` kosong, tampil placeholder abu-abu.
export const Photo = ({ src, label }) =>
  src ? (
    <img src={src} alt={label} className="h-full w-full object-cover" draggable={false} />
  ) : (
    <div className="relative h-full w-full bg-[linear-gradient(160deg,#5b5fa8,#1c1f42)]">
      <div className="absolute inset-0 opacity-[0.12] [background-image:repeating-linear-gradient(45deg,#fff_0_1px,transparent_1px_14px)]" />
      <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-white/45">
        tambah foto<br />di public/images
      </p>
    </div>
  )

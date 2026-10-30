import { useRef, useState } from 'react';

// Kartu foto 3D dengan efek tilt + kilau holografik mengikuti kursor.
const HoloCard = ({
  image,
  alt = 'Profile picture',
  name = '@username',
  status = 'Available for work',
  tiltMax = 12,
  hoverScale = 1.03,
  radius = 20,
}) => {
  const ref = useRef(null);
  const [failed, setFailed] = useState(!image);
  const [pos, setPos] = useState({ rx: 0, ry: 0, mx: 50, my: 50, hover: false });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    setPos({ rx: (0.5 - ny) * 2 * tiltMax, ry: (nx - 0.5) * 2 * tiltMax, mx: nx * 100, my: ny * 100, hover: true });
  };
  const onLeave = () => setPos({ rx: 0, ry: 0, mx: 50, my: 50, hover: false });

  return (
    <div className={pos.hover ? '' : 'animate-float'}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative aspect-[4/5] w-full overflow-hidden bg-[#10132a] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)] transition-transform duration-200 ease-out will-change-transform"
        style={{
          borderRadius: radius,
          transform: `perspective(1000px) rotateX(${pos.rx}deg) rotateY(${pos.ry}deg) scale(${pos.hover ? hoverScale : 1})`,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,#2b2f5c_0%,#10132a_60%,#080a18_100%)]" />

        <span className="pointer-events-none absolute left-[7%] top-[16%] select-none font-mono text-4xl text-white/10">&lt;/&gt;</span>
        <span className="pointer-events-none absolute right-[7%] top-[12%] select-none font-mono text-4xl text-white/10">&lt;/&gt;</span>

        {failed ? (
          <div className="absolute inset-x-0 bottom-0 top-[14%] flex flex-col items-center justify-end">
            <svg viewBox="0 0 200 220" className="h-[88%] w-auto text-white/[0.14]" fill="currentColor" aria-hidden="true">
              <circle cx="100" cy="68" r="42" />
              <path d="M10 220c0-52 40-84 90-84s90 32 90 84z" />
            </svg>
            <p className="absolute bottom-24 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
              taruh foto di public/profile.jpg
            </p>
          </div>
        ) : (
          <img
            src={image}
            alt={alt}
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-cover object-top grayscale"
            draggable={false}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

        {/* kilau holografik */}
        <div
          className="pointer-events-none absolute inset-0 mix-blend-overlay transition-opacity duration-300"
          style={{
            opacity: pos.hover ? 1 : 0,
            background: `radial-gradient(circle at ${pos.mx}% ${pos.my}%, rgba(255,255,255,0.55), rgba(255,255,255,0) 45%), linear-gradient(115deg, rgba(120,140,255,0.25), rgba(255,255,255,0) 40%, rgba(255,150,220,0.2) 70%, rgba(120,255,220,0.25))`,
          }}
        />

        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-md">
          <div>
            <p className="text-sm font-semibold text-white">{name}</p>
            <p className="text-[11px] text-gray-300">{status}</p>
          </div>
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-accent-2 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
        </div>
      </div>
    </div>
  );
};

export default HoloCard;

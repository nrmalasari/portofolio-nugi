import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Animasi huruf per huruf (gaya React Bits "SplitText").
// Pakai `text` untuk teks polos, atau `segments` untuk gaya berbeda tiap bagian,
// mis. [{ text: "Hi, I'm " }, { text: 'Nugi.', className: 'italic' }]
const SplitText = ({
  text = '',
  segments,
  as: Tag = 'div',
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  startDelay = 0.2,
}) => {
  const ref = useRef(null);
  const parts = segments ?? [{ text }];
  const key = JSON.stringify([parts, delay, duration, ease, from, to, startDelay]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-char]', from, { ...to, duration, ease, stagger: delay / 1000, delay: startDelay });
    }, ref);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return (
    <Tag ref={ref} className={className} aria-label={parts.map((p) => p.text).join('')}>
      {parts.map((part, i) => (
        <span key={i} className={part.className} aria-hidden="true">
          {Array.from(part.text).map((char, j) => (
            <span key={j} data-char className="inline-block will-change-transform" style={{ opacity: 0 }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
};

export default SplitText;

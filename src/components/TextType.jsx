import { useEffect, useState } from 'react';

// Efek mengetik + kursor blok (gaya React Bits "TextType")
const TextType = ({
  text,
  typingSpeed = 75,
  deletingSpeed = 38,
  pauseDuration = 2400,
  initialDelay = 900,
  className = '',
}) => {
  const list = Array.isArray(text) ? text : [text];
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [started, setStarted] = useState(false);
  const full = list[index % list.length];

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), initialDelay);
    return () => clearTimeout(t);
  }, [initialDelay]);

  useEffect(() => {
    if (!started) return;
    let t;
    if (!deleting && count < full.length) {
      t = setTimeout(() => setCount((c) => c + 1), typingSpeed + Math.random() * 40);
    } else if (!deleting) {
      t = setTimeout(() => setDeleting(true), pauseDuration);
    } else if (count > 0) {
      t = setTimeout(() => setCount((c) => c - 1), deletingSpeed);
    } else {
      t = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % list.length);
      }, 350);
    }
    return () => clearTimeout(t);
  }, [started, count, deleting, full, list.length, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={className} aria-label={full}>
      <span aria-hidden="true">{full.slice(0, count)}</span>
      <span
        aria-hidden="true"
        className="ml-1 inline-block h-[0.95em] w-[0.5em] translate-y-[0.12em] bg-ink/90 animate-blink"
      />
    </span>
  );
};

export default TextType;

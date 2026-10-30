import { useState, useEffect, useRef } from 'react';

const TrueFocus = ({ 
  sentence = "True Focus", 
  manualMode = false,
  blurAmount = 5, 
  borderColor = '#5227FF', // Warna biru/ungu khas React Bits
  glowColor = 'rgba(82, 39, 255, 0.4)', 
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  focusStyle = 'brackets', // 'brackets', 'underline', 'box'
  cornerSize = 12,
  borderWidth = 2,
  unfocusedOpacity = 0.4,
  groups = [] // Prop baru untuk mengelompokkan kata
}) => {
  const [activeGroup, setActiveGroup] = useState(0);
  const containerRef = useRef(null);
  const wordRefs = useRef([]);
  const [focusRect, setFocusRect] = useState(null);
  
  // Memecah kalimat menjadi kata-kata
  const words = sentence.split(' ');
  
  // Jika tidak ada groups, anggap setiap kata adalah group sendiri
  const actualGroups = groups.length > 0 ? groups : words.map((_, i) => [i]);

  // 1. Efek Animasi Bergantian antar Group
  useEffect(() => {
    if (manualMode) return;
    
    const interval = setInterval(() => {
      setActiveGroup((prev) => (prev + 1) % actualGroups.length);
    }, (animationDuration + pauseBetweenAnimations) * 1000);

    return () => clearInterval(interval);
  }, [actualGroups.length, animationDuration, pauseBetweenAnimations, manualMode]);

  // 2. Efek Menghitung Posisi Kotak (Menggabungkan posisi kata dalam group)
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Ambil index kata yang sedang aktif di group ini
    const currentGroupIndices = actualGroups[activeGroup];
    
    // Ambil kata pertama dan kata terakhir dalam group untuk menghitung batas kotak
    const firstWord = wordRefs.current[currentGroupIndices[0]];
    const lastWord = wordRefs.current[currentGroupIndices[currentGroupIndices.length - 1]];
    
    if (!firstWord || !lastWord) return;
    
    // Hitung posisi gabungan
    const x = firstWord.offsetLeft;
    const y = firstWord.offsetTop;
    const width = (lastWord.offsetLeft + lastWord.offsetWidth) - x;
    const height = firstWord.offsetHeight;

    setFocusRect({ x, y, width, height });
  }, [activeGroup, actualGroups]);

  return (
    <div 
      ref={containerRef}
      className="relative flex flex-wrap gap-x-3 gap-y-2 items-center justify-start py-4"
    >
      {/* === KOTAK/KURUNG SIKU YANG BERGERAK === */}
      {focusRect && (
        <div
          className="absolute pointer-events-none transition-all duration-500 ease-out"
          style={{
            left: focusRect.x - 10,
            top: focusRect.y - 10,
            width: focusRect.width + 20,
            height: focusRect.height + 20,
            filter: `drop-shadow(0 0 10px ${glowColor})`,
            zIndex: 0
          }}
        >
          {focusStyle === 'brackets' && (
            <>
              {/* Kiri Atas */}
              <span className="absolute top-0 left-0 rounded-tl-sm" style={{ width: cornerSize, height: cornerSize, borderTop: `${borderWidth}px solid ${borderColor}`, borderLeft: `${borderWidth}px solid ${borderColor}` }} />
              {/* Kanan Atas */}
              <span className="absolute top-0 right-0 rounded-tr-sm" style={{ width: cornerSize, height: cornerSize, borderTop: `${borderWidth}px solid ${borderColor}`, borderRight: `${borderWidth}px solid ${borderColor}` }} />
              {/* Kiri Bawah */}
              <span className="absolute bottom-0 left-0 rounded-bl-sm" style={{ width: cornerSize, height: cornerSize, borderBottom: `${borderWidth}px solid ${borderColor}`, borderLeft: `${borderWidth}px solid ${borderColor}` }} />
              {/* Kanan Bawah */}
              <span className="absolute bottom-0 right-0 rounded-br-sm" style={{ width: cornerSize, height: cornerSize, borderBottom: `${borderWidth}px solid ${borderColor}`, borderRight: `${borderWidth}px solid ${borderColor}` }} />
            </>
          )}
          {focusStyle === 'underline' && (
             <span className="absolute bottom-0 left-0 w-full" style={{ height: `${borderWidth}px`, backgroundColor: borderColor }} />
          )}
        </div>
      )}

      {/* === TEKS KATA PER KATA === */}
      {words.map((word, index) => {
        // Cek apakah kata ini masuk dalam group yang sedang aktif
        const isActive = actualGroups[activeGroup].includes(index);
        
        return (
          <span
            key={index}
            ref={(el) => (wordRefs.current[index] = el)}
            onMouseEnter={() => {
              if (manualMode) {
                // Cari group mana yang berisi kata ini
                const groupIndex = actualGroups.findIndex(g => g.includes(index));
                if (groupIndex !== -1) setActiveGroup(groupIndex);
              }
            }}
            className="relative z-10 inline-block cursor-default font-semibold"
            style={{
              filter: isActive ? 'blur(0px)' : `blur(${blurAmount}px)`,
              opacity: isActive ? 1 : unfocusedOpacity,
              color: isActive ? '#000' : '#6b7280',
              transform: `scale(${isActive ? 1.05 : 1})`, // Sedikit membesar saat aktif
              textShadow: isActive ? `0 0 20px ${glowColor}` : 'none',
              transition: `all ${animationDuration}s cubic-bezier(0.65, 0, 0.35, 1)`
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

export default TrueFocus;
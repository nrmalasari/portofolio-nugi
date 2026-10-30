import React, { memo } from "react";

const cx = (...parts) => parts.filter(Boolean).join(" ");

export const LogoLoop = memo(({
  logos = [],
  speed = 120,
  direction = "left",
  width = "100%",
  logoHeight = 28,
  gap = 32,
  pauseOnHover = true,
  fadeOut = true,
  scaleOnHover = false,
  labels = "none",
  draggable = true,
  intro = true,
  ariaLabel = "Partner logos",
  className,
  style,
}) => {
  const isVertical = direction === "up" || direction === "down";
  const isReverse = direction === "right" || direction === "down";

  // Durasi animasi: makin besar speed, makin cepat
  // (speed=120 → duration ≈ 16.6s satu putaran)
  const duration = speed > 0 ? 2000 / speed : 20;

  // Duplikasi 3x supaya loop mulus (translateX -33.333% pas kembali ke awal)
  const items = [...logos, ...logos, ...logos];

  const maskStyle = fadeOut
    ? isVertical
      ? "linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)"
      : "linear-gradient(to right, transparent, black 8%, black 92%, transparent)"
    : undefined;

  return (
    <div
      className={cx(
        "group/loop relative overflow-hidden",
        isVertical ? "inline-block h-full w-full" : "w-full",
        className
      )}
      style={{
        ...style,
        width,
        maskImage: maskStyle,
        WebkitMaskImage: maskStyle,
      }}
      aria-label={ariaLabel}
    >
      <div
        className={cx(
          "flex select-none will-change-transform",
          isVertical ? "flex-col w-full" : "flex-row w-max"
        )}
        style={{
          gap: `${gap}px`,
          animation: `scroll-${isVertical ? "Y" : "X"} ${duration}s linear infinite`,
          animationDirection: isReverse ? "reverse" : "normal",
          animationPlayState: "running", // ✅ selalu jalan di awal
        }}
        onMouseEnter={(e) => {
          if (pauseOnHover) e.currentTarget.style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          if (pauseOnHover) e.currentTarget.style.animationPlayState = "running";
        }}
      >
        {items.map((logo, index) => (
          <div
            key={index}
            className={cx(
              "flex shrink-0 items-center justify-center transition-transform duration-300",
              scaleOnHover && "hover:scale-110",
              draggable ? "cursor-grab active:cursor-grabbing" : ""
            )}
            style={{ minHeight: `${logoHeight}px` }}
          >
            {logo.text ? (
              <span className="flex items-center whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.25em] text-white/85 md:text-xs">
                {logo.text}
                <span className="pl-8 text-white/25" aria-hidden="true">
                  •
                </span>
              </span>
            ) : logo.node ? (
              <div
                className="flex items-center justify-center text-current"
                style={{ fontSize: `${logoHeight}px`, color: "#ffffff" }}
                title={logo.title}
              >
                {logo.node}
              </div>
            ) : (
              <img
                src={logo.src}
                alt={logo.alt || ""}
                style={{ height: `${logoHeight}px`, width: "auto" }}
                draggable={false}
              />
            )}

            {labels !== "none" && logo.title && (
              <span
                className={cx(
                  "text-sm font-medium text-gray-300",
                  isVertical ? "ml-2" : "ml-3"
                )}
              >
                {logo.title}
              </span>
            )}
          </div>
        ))}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes scroll-X {
              0%   { transform: translate3d(0, 0, 0); }
              100% { transform: translate3d(-33.3333%, 0, 0); }
            }
            @keyframes scroll-Y {
              0%   { transform: translate3d(0, 0, 0); }
              100% { transform: translate3d(0, -33.3333%, 0); }
            }
          `,
        }}
      />
    </div>
  );
});

LogoLoop.displayName = "LogoLoop";

export default LogoLoop;
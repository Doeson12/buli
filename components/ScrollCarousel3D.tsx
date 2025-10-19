// components/ScrollCarousel3D.tsx
'use client';

import { useEffect, useRef } from 'react';

type Card = { title: string; body: string; icon?: React.ReactNode };

export default function ScrollCarousel3D({
  items,
  radius = 520,         // distance from center
  height = 420,          // visible height of the carousel area
  cardW = 320,           // card width
  cardH = 200,           // card height
  speed = 0.12,          // rotation speed factor per px scroll
}: {
  items: Card[];
  radius?: number;
  height?: number;
  cardW?: number;
  cardH?: number;
  speed?: number;
}) {
  const ringRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);
  const rot = useRef(0);

  // Place cards around a cylinder
  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return; // Guard against null ref
    const angle = 360 / items.length;

    // Position children
    [...ring.children].forEach((el, i) => {
      (el as HTMLElement).style.transform = `rotateY(${i * angle}deg) translateZ(${radius}px)`;
    });

    const onScroll = () => {
      const target = window.scrollY * speed; // any monotonic mapping works
      const tick = () => {
        // smooth lerp for buttery feel
        rot.current += (target - rot.current) * 0.12;
        ring.style.transform = `translateZ(-${radius}px) rotateY(${rot.current}deg)`;
        raf.current = requestAnimationFrame(tick);
      };
      if (!raf.current) raf.current = requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = null;
    };
  }, [items.length, radius, speed]);

  return (
    <section className="relative" style={{ height }}>
      {/* perspective creates the 3D feel */}
      <div className="absolute inset-0 flex items-center justify-center [perspective:1200px]">
        {/* Subtle ground shadow for depth */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[20%] h-24 bg-[radial-gradient(50%_40%_at_50%_50%,rgba(0,0,0,.45),transparent_70%)]" />
        
        <div
          ref={ringRef}
          className="relative [transform-style:preserve-3d] transition-transform will-change-transform"
          style={{ width: cardW, height: cardH }}
          aria-hidden
        >
          {items.map((it, i) => (
            <article
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                         rounded-2xl bg-neutral-900/70 border border-white/10
                         backdrop-blur-sm shadow-[0_0_0_1px_rgba(255,255,255,.04)_inset] p-6
                         flex flex-col gap-3"
              style={{ 
                width: `${cardW}px`, 
                height: `${cardH}px`,
                backfaceVisibility: 'hidden'
              }}
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-brand-accent-teal">
                {it.icon}
              </div>
              <h4 className="text-white font-semibold text-xl">{it.title}</h4>
              <p className="text-neutral-300/80 text-sm leading-relaxed">{it.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


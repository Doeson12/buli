'use client';

import React, { useRef, useState, useEffect } from 'react';

type Blend =
  | 'normal' | 'screen' | 'overlay' | 'multiply' | 'hard-light' | 'soft-light' | 'plus-lighter';

type Props = {
  children: React.ReactNode;
  className?: string;
  radius?: number;           // px
  color?: string;            // rgba(…, alpha)
  falloff?: number;          // 0–1 (where it fades)
  opacity?: number;          // 0–1
  blur?: number;             // px
  blend?: Blend;
  disabledOnTouch?: boolean; // true = hide on mobile
  smoothness?: number;       // 0–1 lerp factor
  disabled?: boolean;        // disable effect entirely
};

export default function Spotlight({
  children,
  className = '',
  radius = 560,
  color = 'rgba(16,185,129,0.18)', // emerald
  falloff = 0.42,
  opacity = 1,
  blur = 6,
  blend = 'screen',
  disabledOnTouch = true,
  smoothness = 1,
  disabled = false,
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isReady, setIsReady] = useState(!disabled);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);
  const wasDisabled = useRef(disabled);

  useEffect(() => {
    setIsTouch(typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0));
  }, []);

  useEffect(() => {
    // When transitioning from disabled to enabled, sync position immediately
    if (wasDisabled.current && !disabled) {
      pos.current.x = target.current.x;
      pos.current.y = target.current.y;
      hostRef.current?.style.setProperty('--x', `${pos.current.x}px`);
      hostRef.current?.style.setProperty('--y', `${pos.current.y}px`);
      
      // Start fade-in after a tiny delay to ensure position is set
      setTimeout(() => setIsReady(true), 50);
    }
    wasDisabled.current = disabled;

    // Don't run animation loop if disabled
    if (disabled) {
      if (raf.current) cancelAnimationFrame(raf.current);
      setIsReady(false);
      return;
    }

    const tick = () => {
      // Always lerp for smooth following
      pos.current.x += (target.current.x - pos.current.x) * smoothness;
      pos.current.y += (target.current.y - pos.current.y) * smoothness;
      hostRef.current?.style.setProperty('--x', `${pos.current.x}px`);
      hostRef.current?.style.setProperty('--y', `${pos.current.y}px`);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [smoothness, disabled, hovered, isTouch]);

  // Update target position without throttling for smooth tracking
  const onMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const r = hostRef.current?.getBoundingClientRect(); if (!r) return;
    target.current.x = e.clientX - r.left;
    target.current.y = e.clientY - r.top;
  };

  const gradient = `radial-gradient(${radius}px circle at var(--x) var(--y), var(--spot-color), transparent ${Math.round(falloff*100)}%)`;

  return (
    <div
      ref={hostRef}
      onMouseMove={onMove}
      onMouseEnter={disabled ? undefined : () => setHovered(true)}
      onMouseLeave={disabled ? undefined : () => setHovered(false)}
      style={{ '--spot-color': color } as React.CSSProperties}
      className={`relative ${className}`}
    >
      {!disabled && !((isTouch && disabledOnTouch)) && (
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${hovered && isReady ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            background: gradient, 
            mixBlendMode: blend, 
            opacity, 
            filter: blur ? `blur(${blur}px)` : undefined,
            willChange: hovered && isReady ? 'opacity' : 'auto',
            contain: 'layout style paint'
          }}
        />
      )}
      {children}
    </div>
  );
}


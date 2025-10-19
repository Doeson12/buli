'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Sparkles, Camera, ShieldCheck, TrendingUp, Zap, Target } from 'lucide-react'

type IconName = 'sparkles' | 'camera' | 'shield' | 'trending' | 'zap' | 'target'
type Card = { title: string; body: string; iconName?: IconName }
const ICON_MAP = { sparkles: Sparkles, camera: Camera, shield: ShieldCheck, trending: TrendingUp, zap: Zap, target: Target }

export default function ScrollMarquee({
  items,
  cardW = 320,
  cardH = 200,
  gap = 16,
  speed = 0.6,        // px of X per px of Y scroll (increased for faster scrolling)
  height = 360,
  autoplayPxPerSec = 500, // time-based autoplay (px / second)
  edgeFade = true,       // set false to test without mask
}: {
  items: Card[]; cardW?: number; cardH?: number; gap?: number; speed?: number; height?: number;
  autoplayPxPerSec?: number; edgeFade?: boolean;
}) {
  const beltRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const raf = useRef<number | null>(null)
  const [inView, setInView] = useState(false)
  const [mounted, setMounted] = useState(false)

  // segment width (all original cards + gaps)
  const segment = useMemo(() => Math.max(1, items.length * (cardW + gap)), [items.length, cardW, gap])
  const repeated = useMemo(() => (items.length ? [...items, ...items, ...items, ...items] : []), [items])

  // Mount detection
  useEffect(() => {
    setMounted(true)
  }, [])

  // pause work when off screen
  useEffect(() => {
    const node = sectionRef.current
    if (!node) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: '200px 0px' })
    io.observe(node)
    return () => io.disconnect()
  }, [])

  // refs for one-way parallax
  const lastScrollY = useRef(0)
  const scrollAccum = useRef(0) // only grows when scrolling down

  useEffect(() => {
    const belt = beltRef.current
    if (!belt || !inView) return

    let tPx = 0 // autoplay offset in pixels
    let last = performance.now()

    // init baseline so there isn't a jump
    lastScrollY.current = window.scrollY || window.pageYOffset

    const frame = (now: number) => {
      const dt = (now - last) / 1000 // seconds
      last = now

      // frame-rate independent autoplay (no hover pause - continuous motion)
      tPx += autoplayPxPerSec * dt

      // one-way parallax: only add positive deltas (downward scroll)
      const sy = window.scrollY || window.pageYOffset
      const dy = sy - lastScrollY.current
      if (dy > 0) scrollAccum.current += dy * speed // ignore upward motion
      lastScrollY.current = sy

      // total offset (parallax + autoplay) - remove pixel snapping for smoothness
      const x = -((scrollAccum.current + tPx) % segment)

      belt.style.transform = `translate3d(${x}px,0,0)`
      raf.current = requestAnimationFrame(frame)
    }

    raf.current = requestAnimationFrame(frame)
    return () => { if (raf.current) cancelAnimationFrame(raf.current); raf.current = null }
  }, [inView, autoplayPxPerSec, speed, segment])

  // reduced motion = disable autoplay
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      // eslint-disable-next-line no-console
      console.debug('reduced motion: autoplay disabled')
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className={[
        'relative overflow-hidden',
        // use mask to fade edges without painting color;
        // Safari needs the -webkit- prefix as well.
        edgeFade
          ? '[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]'
          : '',
      ].join(' ')}
      style={{ height }}
    >
      <div className="absolute inset-0 flex items-center py-2">
        <div
          ref={beltRef}
          className="flex will-change-transform overflow-visible"
          style={{ 
            gap: `${gap}px`,
            opacity: mounted ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
            transform: 'translate3d(0,0,0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {repeated.map((it, i) => {
            const Icon = it.iconName ? ICON_MAP[it.iconName] : null
            return (
              <article
                key={i}
                className="group rounded-2xl bg-white/[0.05] border border-white/[0.08]
                           transition-[border-color,box-shadow] duration-300 ease-out
                           md:hover:border-brand-accent-teal/30
                           md:hover:shadow-[0_0_20px_rgba(45,212,191,0.2)]"
                style={{ 
                  width: `${cardW}px`, 
                  height: `${cardH}px`, 
                  minWidth: `${cardW}px`,
                  transform: 'translate3d(0,0,0)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                
                {/* Content */}
                <div className="relative h-full p-6 flex flex-col gap-3">
                  {Icon && (
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl 
                                    bg-brand-accent-teal/10 text-brand-accent-teal">
                      <Icon size={20} />
                    </div>
                  )}
                  <h4 className="text-white font-semibold text-lg">
                    {it.title}
                  </h4>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {it.body}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

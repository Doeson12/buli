'use client'

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Upload, SlidersHorizontal, Edit3, FileText, FileSpreadsheet, FileType } from 'lucide-react'

export default function BringYourPlan() {
  return (
    <>
      <Flowline />
      <BendOurs />
    </>
  )
}

function Flowline() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window
      mx.set((e.clientX - w / 2) / w)
      my.set((e.clientY - h / 2) / h)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])

  const driftX = useTransform(mx, v => v * 12)
  const driftY = useTransform(my, v => v * 8)

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      {/* soft background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(60% 40% at 15% 20%, rgba(16,185,129,.18), transparent 60%),
            radial-gradient(45% 35% at 85% 25%, rgba(20,184,166,.14), transparent 60%),
            var(--bg)
          `
        }}
      />

      {/* headline */}
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--fg)]">
          Bring your plan. <span className="text-emerald-500">We adapt it.</span> You stay in control.
        </h2>
        <p className="mt-4 text-brand-text-secondary">
          Import from notes, Sheets, or PDFs → normalized automatically → tweak anything.
        </p>
      </div>

      {/* flowing path (SVG) */}
      <div className="mx-auto max-w-6xl px-6 mt-10 relative">
        <svg viewBox="0 0 1200 360" className="w-full h-[36vh] min-h-[260px]">
          <defs>
            <linearGradient id="line" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#10b981" />
              <stop offset="1" stopColor="#14b8a6" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* subtle grid triangles */}
          <pattern id="tri" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M0 24 L24 24 L24 0 Z" fill="rgba(255,255,255,0.02)" />
          </pattern>
          <rect x="0" y="0" width="1200" height="360" fill="url(#tri)" />

          {/* flowing line */}
          <motion.path
            d="M20,320 C220,260 300,140 460,180 C620,220 700,140 860,120 C1000,104 1080,160 1180,40"
            stroke="url(#line)"
            strokeWidth="4"
            fill="none"
            filter="url(#glow)"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.6, ease: [0.22, 0.8, 0.22, 1] }}
          />

          {/* trailing area fade */}
          <motion.path
            d="M20,320 C220,260 300,140 460,180 C620,220 700,140 860,120 C1000,104 1080,160 1180,40 L1200,360 L0,360 Z"
            fill="url(#line)"
            opacity=".10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.10 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </svg>

        {/* islands (not cards): glassy pills that float slightly */}
        <motion.div style={{ x: driftX, y: driftY }} className="pointer-events-none absolute inset-0">
          <div className="absolute left-2 top-1/3 translate-y-[-50%]">
            <Pill icon={<Upload className="w-4 h-4" />} title="Import" sub="CSV • Sheets • PDF" />
            <div className="mt-2 flex gap-2 opacity-75">
              <Mini icon={<FileText className="w-3 h-3" />} label="Notes" />
              <Mini icon={<FileSpreadsheet className="w-3 h-3" />} label="Sheets" />
              <Mini icon={<FileType className="w-3 h-3" />} label="CSV" />
            </div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 top-[22%]">
            <Pill icon={<SlidersHorizontal className="w-4 h-4" />} title="Adapt" sub="Days • Sets • RPE auto-parsed" />
          </div>

          <div className="absolute right-2 bottom-[18%]">
            <Pill icon={<Edit3 className="w-4 h-4" />} title="Edit" sub="Lock lifts • tweak volumes" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Pill({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div className="pointer-events-auto select-none px-3 py-2 rounded-full
                    border border-[var(--card-border)]
                    bg-[color-mix(in_oklab,var(--card),transparent_10%)]
                    backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,.12)]">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full
                         border border-[var(--card-border)]
                         bg-[color-mix(in_oklab,var(--card),black_10%)]">
          {icon}
        </span>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-[var(--fg)]">{title}</div>
          <div className="text-[11px] text-brand-text-secondary">{sub}</div>
        </div>
      </div>
    </div>
  )
}

function Mini({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="px-2 py-1 rounded-full text-[10px] border border-[var(--card-border)]
                    bg-[color-mix(in_oklab,var(--card),transparent_20%)] flex items-center gap-1">
      {icon}
      <span>{label}</span>
    </div>
  )
}

function BendOurs() {
  const hover = useMotionValue(0)
  const aimY = useMotionValue(0)
  const aimX = useMotionValue(0)

  const ySpring = useSpring(aimY, { stiffness: 160, damping: 26, mass: 0.6 })
  const xSpring = useSpring(aimX, { stiffness: 120, damping: 24, mass: 0.6 })
  const hSpring = useSpring(hover, { stiffness: 180, damping: 28 })

  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      aimX.set(0)
      aimY.set(-0.15)
      hover.set(0)
    }
  }, [aimX, aimY, hover])

  const onMove = (e: React.MouseEvent) => {
    const el = wrapperRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const nx = (e.clientX - r.left) / r.width
    const ny = (e.clientY - r.top) / r.height
    aimX.set(nx * 2 - 1)
    aimY.set(1 - ny * 2)
  }

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--fg)]">
          Prefer to tune the AI plan?
        </h3>
        <p className="mt-3 text-brand-text-secondary">
          Edit anytime—lock lifts, nudge volume, swap accessories. Buli adapts as you do.
        </p>

        {/* Glow-stick stage */}
        <motion.div
          ref={wrapperRef}
          onMouseEnter={() => hover.set(1)}
          onMouseLeave={() => {
            hover.set(0)
          }}
          onMouseMove={onMove}
          className="relative mt-8 sm:mt-10 h-[220px] rounded-3xl
                     ring-1 ring-[var(--card-border)]
                     bg-[color-mix(in_oklab,var(--bg),white_1%)]
                     overflow-hidden"
          style={{ perspective: 800 }}
        >
          {/* soft backdrop texture */}
          <div className="absolute inset-0 opacity-[.04] [background:radial-gradient(40%_60%_at_15%_20%,#10b981,transparent),radial-gradient(50%_40%_at_85%_25%,#14b8a6,transparent)]" />

          <svg viewBox="0 0 1200 220" className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="stick" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#10b981" />
                <stop offset="1" stopColor="#14b8a6" />
              </linearGradient>
              <filter id="bloom" x="-60%" y="-200%" width="220%" height="400%">
                <feGaussianBlur stdDeviation="6" result="b1" />
                <feGaussianBlur stdDeviation="2" in="SourceGraphic" result="b2" />
                <feMerge>
                  <feMergeNode in="b1" />
                  <feMergeNode in="b2" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <DynamicPath ySpring={ySpring} hSpring={hSpring} xSpring={xSpring} />
          </svg>

          {/* tiny hint */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] text-brand-text-secondary/80">
            Hover to bend the stick
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function DynamicPath({
  ySpring,
  xSpring,
  hSpring
}: {
  ySpring: { get: () => number }
  xSpring: { get: () => number }
  hSpring: { get: () => number }
}) {
  const ref = useRef<SVGPathElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    let raf = 0
    const tick = () => {
      const y = ySpring.get() as number
      const x = xSpring.get() as number
      const h = hSpring.get() as number

      const midY = 110
      const amp = (34 + 56 * h) * (y === 0 ? 1 : Math.sign(y))
      const skew = x * 120

      const p = {
        x1: 40,
        y1: midY,
        c1x: 320 + skew * 0.4,
        c1y: midY - amp,
        c2x: 720 + skew * 0.8,
        c2y: midY + amp,
        x2: 1160,
        y2: midY
      }
      const d = `M ${p.x1},${p.y1} C ${p.c1x},${p.c1y} ${p.c2x},${p.c2y} ${p.x2},${p.y2}`
      node.setAttribute('d', d)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [ySpring, xSpring, hSpring])

  return (
    <path
      ref={ref}
      stroke="url(#stick)"
      strokeWidth="10"
      strokeLinecap="round"
      filter="url(#bloom)"
      fill="none"
      vectorEffect="non-scaling-stroke"
    />
  )
}


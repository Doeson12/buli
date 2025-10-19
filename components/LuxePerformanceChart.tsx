// components/LuxePerformanceChart.tsx
'use client'

import { useMemo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

type Point = { x: number; y: number; label?: string }
type Props = {
  values: number[]             // esim. [45,52,48,58,55,62,68,72]
  height?: number              // px korkeutta
  padding?: number             // sisäpadding
  labels?: string[]            // esim. ['W1','W2',...]
}

export default function LuxePerformanceChart({
  values,
  height = 180,
  padding = 14,
  labels,
}: Props) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  // Skaalaus ja polku
  const { width, points, d } = useMemo(() => {
    const W = 320 // skaalautuu CSS:llä (w-full), viewBox tekee työn
    const H = height
    const min = Math.min(...values)
    const max = Math.max(...values)
    const range = Math.max(1, max - min)
    const xs = values.map((_, i) =>
      padding + (i * (W - 2 * padding)) / Math.max(1, values.length - 1)
    )
    const ys = values.map(v =>
      H - padding - ((v - min) / range) * (H - 2 * padding)
    )
    const pts: Point[] = xs.map((x, i) => ({ x, y: ys[i], label: labels?.[i] }))
    const path = pts.map((p, i) => `${i ? 'L' : 'M'}${p.x},${p.y}`).join(' ')
    return { width: W, points: pts, d: path }
  }, [values, height, padding, labels])

  // Viivan pituus (dash-animointiin)
  const approxLen = useMemo(() => {
    let len = 0
    for (let i = 1; i < points.length; i++) {
      const dx = points[i].x - points[i - 1].x
      const dy = points[i].y - points[i - 1].y
      len += Math.hypot(dx, dy)
    }
    return len
  }, [points])

  return (
    <div className="rounded-2xl border border-white/10 bg-neutral-950/60 p-3">
      <svg
        ref={ref}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-44"
        role="img"
        aria-label="Strength progress chart"
      >
        {/* Hento ruudukko */}
        <defs>
          <linearGradient id="line" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(16 185 129)" />
            <stop offset="100%" stopColor="rgb(20 184 166)" />
          </linearGradient>
          <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(16,185,129,.28)" />
            <stop offset="100%" stopColor="rgba(20,184,166,.00)" />
          </linearGradient>
          <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d={`M 28 0 L 0 0 0 28`} stroke="rgba(255,255,255,.05)" strokeWidth="1" />
          </pattern>
          {/* Blur pisteiden hehkulle */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="b"/>
            <feMerge>
              <feMergeNode in="b"/><feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <rect x="0" y="0" width={width} height={height} fill="url(#grid)" />

        {/* Täyte (area) – kasvaa ylöspäin */}
        <motion.path
          d={`${d} L ${points.at(-1)?.x},${height - padding} L ${points[0]?.x},${height - padding} Z`}
          fill="url(#fill)"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={inView ? { opacity: 1, pathLength: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 0.8, 0.22, 1] }}
        />

        {/* Viiva – "draw" animaatio */}
        <motion.path
          d={d}
          fill="none"
          stroke="url(#line)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ strokeDasharray: approxLen, strokeDashoffset: approxLen }}
          animate={inView ? { strokeDashoffset: 0 } : {}}
          transition={{ duration: 1.0, ease: [0.22, 0.8, 0.22, 1] }}
        />

        {/* Pisteet + hehku ja näppärä label */}
        {points.map((p, i) => (
          <g key={i}>
            <motion.circle
              cx={p.x}
              cy={p.y}
              r="4"
              fill="url(#line)"
              filter="url(#glow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.05 * i, duration: 0.35 }}
            />
            {p.label && (
              <text
                x={p.x}
                y={height - 2}
                textAnchor="middle"
                className="fill-white/40"
                fontSize="10"
              >
                {p.label}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  )
}


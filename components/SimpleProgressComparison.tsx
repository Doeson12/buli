'use client'

import React, { useMemo } from 'react'

type Pt = { week: string; value: number; label?: string }
type Series = { color: 'red' | 'green'; points: Pt[] }

export default function SimpleProgressComparison() {
  const withoutAI: Series = {
    color: 'red',
    points: [
      { week: 'W1', value: 60, label: 'Started' },
      { week: 'W4', value: 65, label: 'Plateau' },
      { week: 'W8', value: 66, label: 'Still stuck' },
      { week: 'W12', value: 67, label: 'Frustrated' },
    ],
  }
  const withAI: Series = {
    color: 'green',
    points: [
      { week: 'W1', value: 60, label: 'Started' },
      { week: 'W4', value: 72, label: 'Progressing' },
      { week: 'W8', value: 82, label: 'Crushing it' },
      { week: 'W12', value: 90, label: '+50% stronger' },
    ],
  }
  return <Lines series={[withoutAI, withAI]} height={300} />
}

function Lines({ series, height = 280 }: { series: Series[]; height?: number }) {
  const aspect = 16 / 9
  const width = height * aspect
  const pad = { t: 20, r: 24, b: 36, l: 36 }
  const left = pad.l, right = width - pad.r, top = pad.t, bottom = height - pad.b

  const xLabels = useMemo(
    () => series.reduce((a, s) => (s.points.length > a.length ? s.points : a), [] as Pt[]).map(p => p.week),
    [series]
  )
  const [minY, maxY] = useMemo(() => {
    const all = series.flatMap(s => s.points.map(p => p.value))
    const mi = Math.min(...all), ma = Math.max(...all)
    const p = Math.max(1, (ma - mi) * 0.15)
    return [mi - p, ma + p]
  }, [series])

  const X = (i: number, n: number) => (n <= 1 ? (left + right) / 2 : left + (i / (n - 1)) * (right - left))
  const Y = (v: number) => bottom - ((v - minY) / (maxY - minY || 1)) * (bottom - top)
  const pathFor = (pts: Pt[]) => pts.reduce((d, p, i, a) => d + (i ? ` L ${X(i, a.length)},${Y(p.value)}` : `M ${X(0, a.length)},${Y(p.value)}`), '')

  const GRID = 'rgba(255,255,255,0.08)', TXT = 'rgba(255,255,255,0.85)'
  const C = { red: '#ef4444', green: '#10b981' }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto block" role="img" aria-label="Progress comparison">
      {/* grid */}
      <g opacity={0.6}>
        {Array.from({ length: 5 }).map((_, i) => {
          const y = top + (i / 4) * (bottom - top)
          return <line key={`h-${i}`} x1={left} y1={y} x2={right} y2={y} stroke={GRID} strokeWidth={1} />
        })}
        {xLabels.map((_, i) => {
          const x = X(i, xLabels.length)
          return <line key={`v-${i}`} x1={x} y1={top} x2={x} y2={bottom} stroke={GRID} strokeWidth={1} />
        })}
      </g>

      {/* x labels */}
      <g>
        {xLabels.map((w, i) => (
          <text key={w} x={X(i, xLabels.length)} y={bottom + 18} fontSize={11} textAnchor="middle" fill={TXT} opacity={0.8}>
            {w}
          </text>
        ))}
      </g>

      {/* lines, dots, labels */}
      {series.map((s, si) => (
        <g key={si}>
          <path d={pathFor(s.points)} fill="none" stroke={C[s.color]} strokeWidth={2.2} />
          {s.points.map((p, i) => {
            const n = s.points.length, cx = X(i, n), cy = Y(p.value)
            return (
              <g key={`${si}-${i}`} transform={`translate(${cx},${cy})`}>
                <circle r={4.5} fill={C[s.color]} />
                <text y={-10} fontSize={11} textAnchor="middle" fill={TXT}>{p.value}kg</text>
                {p.label && (
                  <text y={16} fontSize={10} textAnchor="middle" fill={s.color === 'red' ? '#fecaca' : '#a7f3d0'}>{p.label}</text>
                )}
              </g>
            )
          })}
        </g>
      ))}
    </svg>
  )
}


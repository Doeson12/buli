'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface DataPoint {
  week: string
  weight: number
  label: string
  color: string
}

const withoutAIData: DataPoint[] = [
  { week: 'W1', weight: 60, label: 'Started', color: 'text-gray-400' },
  { week: 'W4', weight: 65, label: 'Plateau', color: 'text-red-400' },
  { week: 'W8', weight: 65, label: 'Still stuck', color: 'text-red-500' },
  { week: 'W12', weight: 67, label: 'Frustrated', color: 'text-orange-400' },
]

const withAIData: DataPoint[] = [
  { week: 'W1', weight: 60, label: 'Started', color: 'text-cyan-400' },
  { week: 'W4', weight: 70, label: 'Progressing', color: 'text-emerald-400' },
  { week: 'W8', weight: 80, label: 'Crushing it', color: 'text-emerald-300' },
  { week: 'W12', weight: 90, label: '+50% stronger', color: 'text-teal-300' },
]

const withoutAIBullets = [
  'Unclear when to add weight',
  'Plateaus last for months',
  'Risk of overtraining or undertraining',
  'No adaptation to recovery',
]

const withAIBullets = [
  'Auto-adjusts weight based on performance',
  'Breaks through plateaus systematically',
  'Smart deloads prevent overtraining',
  'Adapts to missed sessions instantly',
]

function AnimatedGraph({ 
  data, 
  title, 
  subtitle,
  bullets,
  variant 
}: { 
  data: DataPoint[]
  title: string
  subtitle: string
  bullets: string[]
  variant: 'without' | 'with'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  
  // Calculate dimensions
  const maxWeight = Math.max(...data.map(d => d.weight))
  const minWeight = Math.min(...data.map(d => d.weight))
  const range = maxWeight - minWeight
  const padding = range * 0.2
  
  // Generate smooth curve path
  const generatePath = (progress: number) => {
    const points = data.map((d, i) => ({
      x: (i / (data.length - 1)) * 100,
      y: 100 - ((d.weight - minWeight + padding) / (range + padding * 2)) * 100
    }))
    
    if (progress === 0) return ''
    
    const visiblePoints = Math.ceil(points.length * progress)
    const currentPoints = points.slice(0, visiblePoints)
    
    if (currentPoints.length < 2) {
      return `M ${currentPoints[0].x},${currentPoints[0].y}`
    }
    
    // Create smooth curve using bezier curves
    let path = `M ${currentPoints[0].x},${currentPoints[0].y}`
    
    for (let i = 0; i < currentPoints.length - 1; i++) {
      const curr = currentPoints[i]
      const next = currentPoints[i + 1]
      const controlPointX = curr.x + (next.x - curr.x) / 2
      
      path += ` Q ${controlPointX},${curr.y} ${controlPointX},${(curr.y + next.y) / 2}`
      path += ` Q ${controlPointX},${next.y} ${next.x},${next.y}`
    }
    
    return path
  }
  
  // Generate area fill path
  const generateAreaPath = (progress: number) => {
    const linePath = generatePath(progress)
    if (!linePath) return ''
    
    const lastPoint = data[Math.min(Math.ceil((data.length - 1) * progress), data.length - 1)]
    const lastX = ((Math.min(Math.ceil((data.length - 1) * progress), data.length - 1)) / (data.length - 1)) * 100
    const lastY = 100 - ((lastPoint.weight - minWeight + padding) / (range + padding * 2)) * 100
    
    return `${linePath} L ${lastX},100 L 0,100 Z`
  }
  
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 1) {
              clearInterval(interval)
              return 1
            }
            return prev + 0.02
          })
        }, 20)
        return () => clearInterval(interval)
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [isInView])
  
  const borderColor = variant === 'without' 
    ? 'border-red-500/20' 
    : 'border-emerald-500/30'
  
  const gradientFrom = variant === 'without'
    ? 'from-red-500/10'
    : 'from-emerald-500/20'
  
  const gradientVia = variant === 'without'
    ? 'via-red-500/5'
    : 'via-emerald-500/10'
  
  const gradientTo = variant === 'without'
    ? 'to-red-500/0'
    : 'to-teal-500/5'

  const lineGradient = variant === 'without'
    ? 'url(#gradient-without)'
    : 'url(#gradient-with)'
    
  const areaGradient = variant === 'without'
    ? 'url(#area-gradient-without)'
    : 'url(#area-gradient-with)'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-3xl border ${borderColor} bg-gradient-to-br ${gradientFrom} ${gradientVia} ${gradientTo} overflow-hidden backdrop-blur-sm`}
    >
      {/* Ambient glow */}
      <div className={`absolute inset-0 opacity-30 blur-3xl pointer-events-none ${
        variant === 'without' 
          ? 'bg-gradient-to-br from-red-500/20 to-orange-500/10'
          : 'bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-cyan-500/10'
      }`} />
      
      <div className="relative p-8 lg:p-10">
        {/* Header */}
        <div className="mb-8">
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
            {title}
          </h3>
          <p className={`text-base lg:text-lg ${
            variant === 'without' ? 'text-red-300/70' : 'text-emerald-300/70'
          }`}>
            {subtitle}
          </p>
        </div>
        
        {/* Graph */}
        <div className="mb-8 relative" style={{ height: '280px' }}>
          {/* SVG Graph */}
          <svg 
            viewBox="0 0 100 100" 
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Line gradient */}
              <linearGradient id={`gradient-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
                {variant === 'without' ? (
                  <>
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#f97316" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#dc2626" stopOpacity="0.4" />
                  </>
                ) : (
                  <>
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                    <stop offset="30%" stopColor="#10b981" stopOpacity="0.9" />
                    <stop offset="70%" stopColor="#06b6d4" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.8" />
                  </>
                )}
              </linearGradient>
              
              {/* Area gradient */}
              <linearGradient id={`area-gradient-${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
                {variant === 'without' ? (
                  <>
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
                  </>
                ) : (
                  <>
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </>
                )}
              </linearGradient>
              
              {/* Glow filter */}
              <filter id={`glow-${variant}`}>
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Area fill */}
            <motion.path
              d={generateAreaPath(progress)}
              fill={areaGradient}
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
            
            {/* Line */}
            <motion.path
              d={generatePath(progress)}
              fill="none"
              stroke={lineGradient}
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={`url(#glow-${variant})`}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: isInView ? 1 : 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            />
          </svg>
          
          {/* Data points with labels */}
          <div className="absolute inset-0 flex items-end justify-between px-4">
            {data.map((point, i) => {
              const yPos = 100 - ((point.weight - minWeight + padding) / (range + padding * 2)) * 100
              const delay = 0.5 + i * 0.15
              const shouldShow = progress >= (i / (data.length - 1))
              
              return (
                <motion.div
                  key={point.week}
                  className="flex flex-col items-center relative"
                  style={{
                    position: 'absolute',
                    left: `${(i / (data.length - 1)) * 100}%`,
                    bottom: `${yPos}%`,
                    transform: 'translate(-50%, 0)',
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={shouldShow ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay }}
                >
                  {/* Weight label */}
                  <motion.div
                    className={`mb-2 px-3 py-1.5 rounded-lg backdrop-blur-md border text-sm font-bold whitespace-nowrap ${
                      variant === 'without'
                        ? 'bg-red-950/40 border-red-500/30 text-red-200'
                        : 'bg-emerald-950/40 border-emerald-400/40 text-emerald-200'
                    }`}
                    initial={{ y: -10, opacity: 0 }}
                    animate={shouldShow ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: delay + 0.1 }}
                  >
                    {point.weight}kg
                  </motion.div>
                  
                  {/* Data point dot */}
                  <motion.div
                    className={`w-3 h-3 rounded-full border-2 shadow-lg ${
                      variant === 'without'
                        ? 'bg-red-400 border-red-300'
                        : 'bg-emerald-400 border-emerald-300'
                    }`}
                    initial={{ scale: 0 }}
                    animate={shouldShow ? { 
                      scale: [0, 1.3, 1],
                    } : {}}
                    transition={{ duration: 0.5, delay }}
                  >
                    {/* Pulse effect */}
                    {i === data.length - 1 && variant === 'with' && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-emerald-400"
                        animate={{
                          scale: [1, 2, 2],
                          opacity: [0.5, 0, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 0.5,
                        }}
                      />
                    )}
                  </motion.div>
                  
                  {/* Status label */}
                  <motion.div
                    className="mt-2 text-center"
                    initial={{ opacity: 0 }}
                    animate={shouldShow ? { opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: delay + 0.2 }}
                  >
                    <div className={`text-xs font-medium ${point.color} mb-1`}>
                      {point.label}
                    </div>
                    <div className="text-[10px] text-gray-500 font-semibold">
                      {point.week}
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
        
        {/* Bullet points */}
        <div className="space-y-3">
          {bullets.map((bullet, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
              className="flex items-start gap-3"
            >
              {variant === 'without' ? (
                <div className="mt-0.5 w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              ) : (
                <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              <span className={`text-sm lg:text-base ${
                variant === 'without' ? 'text-gray-300' : 'text-gray-200'
              }`}>
                {bullet}
              </span>
            </motion.div>
          ))}
        </div>
        
        {/* Disclaimer */}
        {variant === 'with' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 2 }}
            className="mt-6 text-xs italic text-gray-500 text-center"
          >
            *training results may vary
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default function TrainingComparisonSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  
  return (
    <section ref={ref} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-transparent pointer-events-none" />
      
      <div className="container-custom relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
            The Difference Is Clear
          </h2>
          <p className="text-base lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            See how AI-powered progression transforms your training journey—from months of plateaus to consistent strength gains.
          </p>
        </motion.div>
        
        {/* Comparison Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
          <AnimatedGraph
            data={withoutAIData}
            title="Training Without AI"
            subtitle="Guesswork and plateaus"
            bullets={withoutAIBullets}
            variant="without"
          />
          
          <AnimatedGraph
            data={withAIData}
            title="Training With Buli App AI"
            subtitle="Smart progression, zero guesswork"
            bullets={withAIBullets}
            variant="with"
          />
        </div>
      </div>
    </section>
  )
}



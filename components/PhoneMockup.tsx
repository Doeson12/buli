'use client'

import { useEffect, useMemo, useState, memo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

/** Simple typing hook with speed control and start condition */
function useTyping(text: string, speed = 28, shouldStart = true) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!shouldStart) return
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (m.matches) { setI(text.length); return }
    const id = window.setInterval(() => setI(v => (v < text.length ? v + 1 : v)), speed)
    return () => clearInterval(id)
  }, [text, speed, shouldStart])
  return text.slice(0, i)
}

interface PhoneMockupProps {
  play?: boolean
  variant?: 'mobile' | 'desktop'
  className?: string
}

const PhoneMockup = memo(function PhoneMockup({ 
  play = false, 
  variant = 'mobile',
  className = ''
}: PhoneMockupProps) {
  const [mounted, setMounted] = useState(false)
  const [typingStarted, setTypingStarted] = useState(false)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'history' | 'progress' | 'more'>('dashboard')
  
  useEffect(() => {
    setMounted(true)
  }, [])

  // Add error logging for debugging
  useEffect(() => {
    const handleError = (e: ErrorEvent) => {
      console.error('Runtime error in PhoneMockup:', e.error)
    }
    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [])
  
  // Content to type - define before conditionals
  const lines = useMemo(
    () => [
      'Buli App',
      'builds the perfect workout plan for you.',
      'AI-powered programming that helps you reach your fitness goals, whether you\'re a beginner or experienced lifter.',
    ],
    []
  )
  
  // Start typing when mounted
  useEffect(() => {
    if (mounted) {
      const timer = setTimeout(() => setTypingStarted(true), 100)
      return () => clearTimeout(timer)
    }
  }, [mounted])

  // Start typing when play prop is true (for desktop coordination)
  useEffect(() => {
    if (play) {
      setTypingStarted(true)
    }
  }, [play])
  
  // ✅ Hooks must always run - they'll just not start animating yet
  const typed1 = useTyping(lines[0], 50, mounted && typingStarted)
  const typed2 = useTyping(lines[1], 20, mounted && typingStarted && typed1.length === lines[0].length)
  const typed3 = useTyping(lines[2], 22, mounted && typingStarted && typed2.length === lines[1].length)
  
  // ✅ Now it's safe to early-return
  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-[100vh] bg-black">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
      </div>
    )
  }

  // Ensure lines exists before using
  if (!lines || !lines.length) {
    return null
  }

  // Different container styles based on variant
  const containerClasses = variant === 'mobile' 
    ? "md:hidden relative min-h-[100dvh] overflow-visible flex items-center justify-center px-4 pb-0 pt-20"
    : "relative w-full max-w-[300px] mx-auto"

  return (
    <div 
      className={`${containerClasses} ${className}`}
      style={{
        willChange: 'transform',
        contain: 'layout style paint',
      }}
    >
      {/* Phone mockup container */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[300px]"
      >
        <div className="relative w-full aspect-[9/18] select-none">
          {/* Premium black frame - iPhone 15 Pro Max style */}
          <div className="absolute inset-0 rounded-[3.2rem] pointer-events-none"
               style={{
                 background: 'linear-gradient(135deg, #2a2d35 0%, #1f2228 30%, #16181d 70%, #0d0f12 100%)',
                 boxShadow: variant === 'mobile' 
                   ? '0 8px 20px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)' 
                   : '0 30px 70px rgba(0,0,0,0.7), 0 15px 35px rgba(0,0,0,0.5), 0 5px 15px rgba(0,0,0,0.4)',
               }}>
            
            {/* Multi-layer lighting and depth */}
            <div className="absolute inset-0 rounded-[3.2rem] overflow-hidden">
              {/* Primary metallic shine */}
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(125deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 25%, transparent 50%, rgba(0,0,0,0.2) 75%, rgba(0,0,0,0.3) 100%)',
              }} />
              
              {/* Top edge catch light */}
              <div className="absolute top-0 left-[15%] right-[15%] h-[2px]" style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
              }} />
              
              {/* Subtle specular highlight */}
              <div className="absolute inset-[1px] rounded-[3.1rem]" style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 30%)',
              }} />
              
              {/* Bottom shadow for depth */}
              <div className="absolute bottom-0 left-0 right-0 h-[20%] rounded-b-[3.2rem]" style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)',
              }} />
            </div>
            
            {/* Inner chamfer with premium finish */}
            <div className="absolute inset-[7px] rounded-[2.6rem] shadow-[inset_0_3px_10px_rgba(0,0,0,0.7)]"
                 style={{
                   background: 'linear-gradient(135deg, #1a1d24 0%, #14171c 50%, #0f1115 100%)',
                 }}>
                <div className="absolute inset-[10px] rounded-[2.4rem] overflow-hidden" style={{ 
                  background: 'linear-gradient(165deg, #0a0d14 0%, #141825 35%, #1a1f32 70%, #0f1318 100%)'
                }}>
                {/* Premium color overlay */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: `
                    radial-gradient(circle at 15% 30%, rgba(99, 102, 241, 0.08) 0%, transparent 45%),
                    radial-gradient(circle at 85% 70%, rgba(45, 212, 191, 0.06) 0%, transparent 50%),
                    radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.04) 0%, transparent 60%)
                  `,
                  mixBlendMode: 'screen'
                }} />
                
                {/* Status bar */}
                <div className="absolute top-2 left-0 right-0 h-10 flex items-center justify-between text-white text-xs z-10">
                  <div className="pl-6 pt-1">
                    <span className="font-semibold">9:41</span>
                  </div>
                  <div className="pr-6 pt-1 flex items-center gap-1">
                    <svg className="w-[15px] h-[15px]" fill="white" viewBox="0 0 20 20">
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                    <div className="w-6 h-[11px] border-2 border-white rounded-sm relative">
                      <div className="absolute inset-0.5 bg-white rounded-[1px]" />
                      <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[2px] h-[5px] bg-white rounded-r" />
                    </div>
                  </div>
                </div>

                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-black rounded-b-3xl z-40 shadow-[0_4px_8px_rgba(0,0,0,0.4)]">
                  <div className="absolute left-1/2 -translate-x-1/2 top-[6px] w-16 h-[5px] rounded-full bg-white/10" />
                  <div className="absolute right-6 top-[6px] w-[9px] h-[9px] rounded-full bg-black shadow-[inset_0_0_0_2px_rgba(255,255,255,.06)]" />
                </div>

                {/* App content with typing animation */}
                <div className="absolute inset-0 pt-14 pb-24 px-5 overflow-hidden pointer-events-none">
                  {/* Landing page content - show when dashboard is active */}
                  {activeTab === 'dashboard' && (
                    <div className="h-full flex flex-col items-start justify-start relative px-4 pt-16 pointer-events-auto">
                      {/* Typing text with neon effect - absolute positioning to prevent shifting */}
                      <div className="w-full mb-8 relative" style={{ height: '160px' }}>
                        <motion.h1
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="absolute top-0 left-0 text-3xl font-bold leading-tight bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                          style={{
                            textShadow: '0 0 10px rgba(34,211,238,0.8), 0 0 20px rgba(34,211,238,0.6), 0 0 30px rgba(34,211,238,0.4)'
                          }}
                        >
                          {typed1}
                        </motion.h1>

                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          className="absolute top-12 left-0 text-base text-gray-300 leading-tight"
                        >
                          {typed2}
                        </motion.p>

                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                          className="absolute top-24 left-0 text-sm text-gray-400 leading-tight"
                        >
                          {typed3}
                        </motion.p>
                      </div>

                      {/* CTA buttons - positioned in reserved space to prevent text bumping */}
                      {typed1.length === lines[0].length && typed2.length === lines[1].length && typed3.length === lines[2].length && (
                        <div className="flex flex-col gap-3 w-full">
                          {/* Download for iOS button - appears first */}
                          <motion.div
                            className="w-full"
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ 
                              duration: 0.6, 
                              delay: 0.3,
                              ease: [0.16, 1, 0.3, 1]
                            }}
                          >
                            <Link
                              href="/download"
                              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-xl font-medium text-sm shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                            >
                              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                              </svg>
                              Download for iOS
                            </Link>
                          </motion.div>
                          
                          {/* Learn more button - appears second */}
                          <motion.div
                            className="w-full"
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ 
                              duration: 0.6, 
                              delay: 0.5,
                              ease: [0.16, 1, 0.3, 1]
                            }}
                          >
                            <Link
                              href="/learn"
                              className="w-full bg-purple-600 text-white py-3 px-6 rounded-xl font-medium text-sm shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
                            >
                              Learn more
                            </Link>
                          </motion.div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* History, Progress, and More Views */}
                  {activeTab !== 'dashboard' && (
                    <div className="pointer-events-auto h-full flex flex-col">
                      {/* Header */}
                      <div className="mb-3 px-2">
                        <h2 className="text-white text-2xl font-bold">
                          {activeTab === 'history' && 'Workout History'}
                          {activeTab === 'progress' && 'Your Progress'}
                          {activeTab === 'more' && 'More'}
                        </h2>
                      </div>

                      {/* History View - World-class Design */}
                      {activeTab === 'history' && (
                        <div className="flex-1 overflow-y-auto scrollbar-hide px-2">
                          <div className="space-y-2.5 pb-2">
                            {/* Workout 1 */}
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className="relative group"
                            >
                              <div className="p-3 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex-1">
                                    <h3 className="text-white font-semibold text-base mb-1">Upper Body Strength</h3>
                                    <p className="text-white/40 text-xs">Friday, Oct 11 • 52 min</p>
                      </div>
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-600/20 flex items-center justify-center border border-emerald-500/30">
                                    <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                                <div className="flex gap-4 text-xs items-center">
                                  <div className="flex items-center gap-1.5 text-white/50">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                                    <span className="font-medium">8 exercises</span>
                        </div>
                                  <div className="flex items-center gap-1.5 text-white/50">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                              </svg>
                                    <span className="font-medium">24 sets</span>
                            </div>
                      </div>
                    </div>
                            </motion.div>

                            {/* Workout 2 */}
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 }}
                            >
                              <div className="p-3 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex-1">
                                    <h3 className="text-white font-semibold text-base mb-1">Leg Day Blast</h3>
                                    <p className="text-white/40 text-xs">Wednesday, Oct 9 • 48 min</p>
                          </div>
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-600/20 flex items-center justify-center border border-emerald-500/30">
                                    <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                                <div className="flex gap-4 text-xs">
                                  <div className="flex items-center gap-1.5 text-white/50">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                                    <span className="font-medium">6 exercises</span>
                          </div>
                                  <div className="flex items-center gap-1.5 text-white/50">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                                    <span className="font-medium">20 sets</span>
                          </div>
                        </div>
                      </div>
                            </motion.div>

                            {/* Workout 3 */}
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.2 }}
                            >
                              <div className="p-3 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex-1">
                                    <h3 className="text-white font-semibold text-base mb-1">Pull & Back Focus</h3>
                                    <p className="text-white/40 text-xs">Tuesday, Oct 8 • 55 min</p>
                          </div>
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-600/20 flex items-center justify-center border border-emerald-500/30">
                                    <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                                <div className="flex gap-4 text-xs">
                                  <div className="flex items-center gap-1.5 text-white/50">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                                    <span className="font-medium">7 exercises</span>
                          </div>
                                  <div className="flex items-center gap-1.5 text-white/50">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                                    <span className="font-medium">22 sets</span>
                          </div>
                        </div>
                      </div>
                            </motion.div>

                            {/* Workout 4 */}
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.3 }}
                            >
                              <div className="p-3 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex-1">
                                    <h3 className="text-white font-semibold text-base mb-1">Push & Chest Day</h3>
                                    <p className="text-white/40 text-xs">Monday, Oct 7 • 50 min</p>
                          </div>
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-600/20 flex items-center justify-center border border-emerald-500/30">
                                    <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                                <div className="flex gap-4 text-xs">
                                  <div className="flex items-center gap-1.5 text-white/50">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                                    <span className="font-medium">8 exercises</span>
                          </div>
                                  <div className="flex items-center gap-1.5 text-white/50">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                                    <span className="font-medium">24 sets</span>
                          </div>
                        </div>
                      </div>
                            </motion.div>
                      </div>
                    </div>
                  )}

                      {/* Progress View - World-class Design */}
                  {activeTab === 'progress' && (
                        <div className="flex-1 overflow-y-auto scrollbar-hide px-2">
                    <div className="space-y-4 pb-4">
                            {/* Stats cards with animation */}
                      <div className="grid grid-cols-2 gap-3">
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-emerald-500/10 to-teal-500/5 border border-emerald-500/30 relative overflow-hidden"
                              >
                                <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-400/10 rounded-full blur-2xl" />
                                <p className="text-white/50 text-xs font-medium mb-1 relative z-10">Total Workouts</p>
                                <p className="text-white text-3xl font-bold relative z-10">47</p>
                                <p className="text-emerald-400 text-xs font-medium mt-1 relative z-10">+12 this month</p>
                              </motion.div>
                              
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                                className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-indigo-500/5 border border-blue-500/30 relative overflow-hidden"
                              >
                                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-400/10 rounded-full blur-2xl" />
                                <p className="text-white/50 text-xs font-medium mb-1 relative z-10">Total Volume</p>
                                <p className="text-white text-3xl font-bold relative z-10">285k</p>
                                <p className="text-blue-400 text-xs font-medium mt-1 relative z-10">lbs lifted</p>
                              </motion.div>
                            </div>

                            {/* Animated Graph with glow */}
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                              className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10"
                            >
                              <div className="flex items-center justify-between mb-4">
                                <p className="text-white font-semibold text-base">Strength Progress</p>
                                <div className="px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/30">
                                  <span className="text-emerald-400 text-[10px] font-semibold">+18%</span>
                                </div>
                              </div>
                              <div className="relative flex items-end justify-between gap-2" style={{ height: '120px' }}>
                                {[45, 52, 48, 58, 55, 62, 68, 72].map((height, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: '120px' }}
                                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                                    className="flex-1 relative flex flex-col items-center justify-end min-w-[12px]"
                                  >
                                    <motion.div
                                      initial={{ height: '0%' }}
                                      animate={{ height: `${height}%` }}
                                      transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                      className="w-full bg-gradient-to-t from-emerald-500 via-emerald-400 to-teal-400 rounded-t-lg relative shadow-lg shadow-emerald-500/30 overflow-hidden"
                                      style={{ maxHeight: '100px' }}
                                    >
                                      {i === 7 && (
                                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-60 animate-pulse" />
                                      )}
                                    </motion.div>
                                    <span className="text-white/30 text-[10px] mt-2 font-medium">W{i + 1}</span>
                                  </motion.div>
                          ))}
                        </div>
                            </motion.div>

                            {/* Personal Records with enhanced styling */}
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.4 }}
                              className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10"
                            >
                              <div className="flex items-center gap-2 mb-4">
                                <p className="text-white font-semibold text-base">Recent PRs</p>
                                <span className="text-lg">🎉</span>
                        </div>
                        <div className="space-y-3">
                                {/* Highlighted PR */}
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.4, delay: 0.5 }}
                                  className="relative p-4 rounded-xl bg-gradient-to-r from-emerald-500/30 to-teal-500/20 border-2 border-emerald-400/50 overflow-hidden"
                                >
                                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-teal-400/5 animate-pulse" />
                                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/20 rounded-full blur-3xl" />
                                  <div className="relative flex items-center justify-between mb-2">
                                    <span className="text-white text-sm font-semibold">Bench Press</span>
                                    <span className="text-emerald-300 text-xl font-bold drop-shadow-[0_0_12px_rgba(52,211,153,0.8)]">100kg</span>
                            </div>
                                  <p className="relative text-emerald-200/80 text-xs font-medium">New milestone! 💪</p>
                                </motion.div>

                                {/* Other PRs */}
                                <motion.div
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: 0.6 }}
                                  className="flex items-center justify-between py-2.5 px-1 border-b border-white/5"
                                >
                                  <span className="text-white/60 text-sm font-medium">Squat</span>
                                  <span className="text-emerald-400 text-base font-bold">143kg</span>
                                </motion.div>
                                <motion.div
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: 0.7 }}
                                  className="flex items-center justify-between py-2.5 px-1 border-b border-white/5"
                                >
                                  <span className="text-white/60 text-sm font-medium">Deadlift</span>
                                  <span className="text-emerald-400 text-base font-bold">180kg</span>
                                </motion.div>
                                <motion.div
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: 0.8 }}
                                  className="flex items-center justify-between py-2.5 px-1"
                                >
                                  <span className="text-white/60 text-sm font-medium">Overhead Press</span>
                                  <span className="text-emerald-400 text-base font-bold">60kg</span>
                                </motion.div>
                          </div>
                            </motion.div>
                      </div>
                    </div>
                  )}

                      {/* More View - World-class Design */}
                  {activeTab === 'more' && (
                        <div className="flex-1 overflow-y-auto scrollbar-hide px-2">
                          <div className="space-y-3 pb-4">
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className="group cursor-pointer"
                            >
                              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-400/10 rounded-full blur-2xl group-hover:bg-purple-400/20 transition-all duration-300" />
                                <div className="flex items-center gap-4 relative z-10">
                                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                                  <div className="flex-1">
                                    <p className="text-white font-semibold text-base mb-1">Settings</p>
                                    <p className="text-white/40 text-xs">Customize your experience</p>
                          </div>
                                  <svg className="w-5 h-5 text-white/30 group-hover:text-white/50 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                  </svg>
                        </div>
                      </div>
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 }}
                              className="group cursor-pointer"
                            >
                              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/5 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-400/10 rounded-full blur-2xl group-hover:bg-blue-400/20 transition-all duration-300" />
                                <div className="flex items-center gap-4 relative z-10">
                                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                                  <div className="flex-1">
                                    <p className="text-white font-semibold text-base mb-1">Help & Support</p>
                                    <p className="text-white/40 text-xs">Get assistance when you need it</p>
                                  </div>
                                  <svg className="w-5 h-5 text-white/30 group-hover:text-white/50 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                  </svg>
                          </div>
                              </div>
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.2 }}
                              className="group cursor-pointer"
                            >
                              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-400/10 rounded-full blur-2xl group-hover:bg-emerald-400/20 transition-all duration-300" />
                                <div className="flex items-center gap-4 relative z-10">
                                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-white font-semibold text-base mb-1">About Buli</p>
                                    <p className="text-white/40 text-xs">Version 1.0.0 • Learn more</p>
                                  </div>
                                  <svg className="w-5 h-5 text-white/30 group-hover:text-white/50 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                  </svg>
                        </div>
                      </div>
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.3 }}
                              className="group cursor-pointer"
                            >
                              <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/5 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-400/10 rounded-full blur-2xl group-hover:bg-orange-400/20 transition-all duration-300" />
                                <div className="flex items-center gap-4 relative z-10">
                                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-white font-semibold text-base mb-1">Sign Out</p>
                                    <p className="text-white/40 text-xs">Come back anytime</p>
                                  </div>
                                  <svg className="w-5 h-5 text-white/30 group-hover:text-white/50 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Bottom navigation - seamless background */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 px-4 z-50 pointer-events-auto bg-transparent">
                    <div className="flex items-center justify-around h-full">
                      <button 
                        onClick={() => setActiveTab('dashboard')}
                        className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-80 transition-all duration-200 group"
                      >
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 ${
                          activeTab === 'dashboard' 
                            ? 'bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30' 
                            : 'bg-white/5 group-hover:bg-white/10'
                        }`}>
                          <svg className={`w-4 h-4 transition-colors duration-200 ${
                            activeTab === 'dashboard' ? 'text-white' : 'text-white/60 group-hover:text-white'
                          }`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                          </svg>
                        </div>
                        <span className={`text-[10px] font-medium transition-colors duration-200 ${
                          activeTab === 'dashboard' ? 'text-emerald-400' : 'text-white/50 group-hover:text-white/70'
                        }`}>Dashboard</span>
                      </button>
                      <button 
                        onClick={() => setActiveTab('history')}
                        className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-80 transition-all duration-200 group"
                      >
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 ${
                          activeTab === 'history' 
                            ? 'bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30' 
                            : 'bg-white/5 group-hover:bg-white/10'
                        }`}>
                          <svg className={`w-4 h-4 transition-colors duration-200 ${
                            activeTab === 'history' ? 'text-white' : 'text-white/60 group-hover:text-white'
                          }`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className={`text-[10px] font-medium transition-colors duration-200 ${
                          activeTab === 'history' ? 'text-emerald-400' : 'text-white/50 group-hover:text-white/70'
                        }`}>History</span>
                      </button>
                      <button 
                        onClick={() => setActiveTab('progress')}
                        className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-80 transition-all duration-200 group"
                      >
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 ${
                          activeTab === 'progress' 
                            ? 'bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30' 
                            : 'bg-white/5 group-hover:bg-white/10'
                        }`}>
                          <svg className={`w-4 h-4 transition-colors duration-200 ${
                            activeTab === 'progress' ? 'text-white' : 'text-white/60 group-hover:text-white'
                          }`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                          </svg>
                        </div>
                        <span className={`text-[10px] font-medium transition-colors duration-200 ${
                          activeTab === 'progress' ? 'text-emerald-400' : 'text-white/50 group-hover:text-white/70'
                        }`}>Progress</span>
                      </button>
                      <button 
                        onClick={() => setActiveTab('more')}
                        className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-80 transition-all duration-200 group"
                      >
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 ${
                          activeTab === 'more' 
                            ? 'bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30' 
                            : 'bg-white/5 group-hover:bg-white/10'
                        }`}>
                          <svg className={`w-4 h-4 transition-colors duration-200 ${
                            activeTab === 'more' ? 'text-white' : 'text-white/60 group-hover:text-white'
                          }`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </div>
                        <span className={`text-[10px] font-medium transition-colors duration-200 ${
                          activeTab === 'more' ? 'text-emerald-400' : 'text-white/50 group-hover:text-white/70'
                        }`}>More</span>
                      </button>
                    </div>
                  </div>

                  {/* Home indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Physical Side Buttons - iPhone 15 Pro Max Style */}
          
          {/* LEFT SIDE - Mute switch & Volume buttons */}
          {/* Mute switch */}
          <div className="absolute left-[-1px] top-[90px] w-[4px] h-[28px] rounded-r-[2px]" style={{
            background: 'linear-gradient(to right, #1f2228 0%, #2a2d35 50%, #1f2228 100%)',
            boxShadow: 'inset -1px 0 2px rgba(255,255,255,0.2), inset 1px 0 2px rgba(0,0,0,0.5), 2px 2px 4px rgba(0,0,0,0.4)',
          }}>
            {/* Button highlight */}
            <div className="absolute inset-y-[2px] right-0 w-[1px]" style={{
              background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
            }} />
          </div>
          
          {/* Volume Up */}
          <div className="absolute left-[-1px] top-[145px] w-[4px] h-[48px] rounded-r-[2px]" style={{
            background: 'linear-gradient(to right, #1f2228 0%, #2a2d35 50%, #1f2228 100%)',
            boxShadow: 'inset -1px 0 2px rgba(255,255,255,0.2), inset 1px 0 2px rgba(0,0,0,0.5), 2px 2px 4px rgba(0,0,0,0.4)',
          }}>
            <div className="absolute inset-y-[4px] right-0 w-[1px]" style={{
              background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
            }} />
          </div>
          
          {/* Volume Down */}
          <div className="absolute left-[-1px] top-[205px] w-[4px] h-[48px] rounded-r-[2px]" style={{
            background: 'linear-gradient(to right, #1f2228 0%, #2a2d35 50%, #1f2228 100%)',
            boxShadow: 'inset -1px 0 2px rgba(255,255,255,0.2), inset 1px 0 2px rgba(0,0,0,0.5), 2px 2px 4px rgba(0,0,0,0.4)',
          }}>
            <div className="absolute inset-y-[4px] right-0 w-[1px]" style={{
              background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
            }} />
          </div>
          
          {/* RIGHT SIDE - Power button */}
          <div className="absolute right-[-1px] top-[180px] w-[4px] h-[72px] rounded-l-[2px]" style={{
            background: 'linear-gradient(to left, #1f2228 0%, #2a2d35 50%, #1f2228 100%)',
            boxShadow: 'inset 1px 0 2px rgba(255,255,255,0.2), inset -1px 0 2px rgba(0,0,0,0.5), -2px 2px 4px rgba(0,0,0,0.4)',
          }}>
            <div className="absolute inset-y-[6px] left-0 w-[1px]" style={{
              background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
            }} />
          </div>
          
          {/* Action button (new in iPhone 15 Pro) - top right */}
          <div className="absolute right-[-1px] top-[90px] w-[4px] h-[38px] rounded-l-[2px]" style={{
            background: 'linear-gradient(to left, #1f2228 0%, #2a2d35 50%, #1f2228 100%)',
            boxShadow: 'inset 1px 0 2px rgba(255,255,255,0.2), inset -1px 0 2px rgba(0,0,0,0.5), -2px 2px 4px rgba(0,0,0,0.4)',
          }}>
            <div className="absolute inset-y-[3px] left-0 w-[1px]" style={{
              background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
            }} />
          </div>
        </div>
      </motion.div>
    </div>
  )
});

export default PhoneMockup;

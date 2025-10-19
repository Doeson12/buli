'use client'

import { useEffect, useRef, useState, memo } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

/**
 * ImportProgramAnimation - Elaborate phone animation showing the import flow
 * with a trashy paper notepad comparison
 */

type AnimationStep = 'idle' | 'showing-dashboard' | 'click-import' | 'create-plan' | 'add-exercises' | 'complete'

export function ImportProgramAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [step, setStep] = useState<AnimationStep>('idle')

  // Animation sequence - faster and sequential
  useEffect(() => {
    if (!isInView) return

    const sequence = async () => {
      await delay(300)
      setStep('showing-dashboard')
      
      await delay(1500)
      setStep('click-import')
      
      await delay(800)
      setStep('create-plan')
      
      await delay(1800)
      setStep('add-exercises')
      
      await delay(1800)
      setStep('complete')
      
      // Loop back faster
      await delay(1000)
      setStep('idle')
      await delay(300)
      // Restart
      sequence()
    }

    sequence()
  }, [isInView])

  return (
    <section 
      ref={ref} 
      className="py-32 md:py-40 relative overflow-hidden"
      style={{
        willChange: isInView ? 'transform' : 'auto',
        contain: 'layout style paint',
      }}
    >
      <div className="container-custom">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white/90 mb-8 leading-tight">
              Already have a program?
              <br />
              <span className="text-brand-accent-teal">Bring it with you.</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-3xl mx-auto">
              Ditch the spreadsheets. Import your coach's program in seconds.
            </p>
          </div>

          {/* Animation Container */}
          <div className="relative flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-32 min-h-[700px]">
            
            {/* Left Side - Trashy Paper Notepad */}
            <motion.div
            initial={{ opacity: 0, x: -50, rotate: -5 }}
            animate={isInView ? { 
            opacity: 1, 
            x: 0, 
            rotate: -3 
            } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex-shrink-0"
            >
              {/* Red X indicator - positioned above paper */}
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -45 }}
                animate={isInView ? { 
                  opacity: 1, 
                  scale: 1, 
                  rotate: 0 
                } : {}}
                transition={{ duration: 0.5, delay: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                className="absolute -top-4 -right-4 z-20 w-16 h-16 rounded-full bg-red-500/90 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-red-500/40"
              >
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.div>

              {/* Paper with crumpled texture */}
              <div 
                className="relative w-[280px] md:w-[320px] h-[480px] md:h-[520px] bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-sm shadow-2xl"
                style={{
                  boxShadow: '0 20px 50px rgba(0,0,0,0.3), inset 0 0 20px rgba(0,0,0,0.05)',
                  transform: 'perspective(600px) rotateY(5deg)',
                }}
              >
                {/* Paper lines */}
                <div className="absolute inset-0 flex flex-col pt-12 px-6 gap-[26px]">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="h-[1px] bg-blue-300/40" />
                  ))}
                </div>

                {/* Red margin line */}
                <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-red-400/50" />

                {/* Handwritten content - messy and poorly formatted */}
                <div className="absolute inset-0 p-8 pt-10">
                  <div
                    style={{ 
                      fontFamily: '"Comic Sans MS", cursive',
                      color: '#1a1a1a'
                    }}
                  >
                    {/* Title - crossed out and rewritten */}
                    <div className="mb-4">
                      <div className="relative inline-block">
                        <p className="text-lg font-bold" style={{ 
                          transform: 'rotate(-0.5deg)',
                          textDecoration: 'line-through',
                          opacity: 0.5
                        }}>
                          workout plan
                        </p>
                      </div>
                      <p className="text-xl font-bold -mt-1" style={{ transform: 'rotate(0.5deg)' }}>
                        TRAINING PROG
                      </p>
                    </div>

                    {/* Messy day entries */}
                    <div className="space-y-3 text-sm">
                      <div style={{ transform: 'rotate(-0.8deg)' }}>
                        <p className="font-semibold">Mon - chest</p>
                        <p className="text-xs ml-2">bench 3x8, flies 3x12</p>
                      </div>
                      
                      <div style={{ transform: 'rotate(0.6deg)' }} className="ml-1">
                        <p className="font-semibold">tues: BACK</p>
                        <p className="text-xs ml-2">deadlift, rows??, pullups</p>
                      </div>
                      
                      <div style={{ transform: 'rotate(-0.4deg)' }} className="ml-0">
                        <p className="font-semibold line-through opacity-50">wed rest</p>
                      </div>
                      
                      <div style={{ transform: 'rotate(0.7deg)' }} className="ml-2">
                        <p className="font-semibold">Thurs - legs 🦵</p>
                        <p className="text-xs ml-2">squat 3x8-12</p>
                        <p className="text-xs ml-2">leg press 3x15</p>
                      </div>

                      <div style={{ transform: 'rotate(-0.5deg)' }}>
                        <p className="font-semibold">fri: arms!!!!</p>
                        <p className="text-xs ml-2">curls, tricep stuff</p>
                      </div>
                    </div>

                    {/* Scribbles and notes */}
                    <div className="absolute bottom-8 right-6 text-xs opacity-60" style={{ transform: 'rotate(15deg)' }}>
                      <p>60s rest?</p>
                    </div>

                    {/* Coffee stain */}
                    <div 
                      className="absolute top-4 right-6 w-12 h-12 rounded-full bg-amber-800/20 blur-sm"
                      style={{ transform: 'rotate(45deg)' }}
                    />
                  </div>
                </div>
              </div>

              {/* Paper shadow/curl */}
              <div 
                className="absolute -bottom-2 -right-2 w-12 h-12 bg-yellow-100/50 rounded-br-3xl"
                style={{ 
                  boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.1)',
                  transform: 'skew(-2deg, 2deg)'
                }}
              />
            </motion.div>


            {/* Right Side - Phone with Import Animation */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { 
                opacity: 1, 
                x: 0 
              } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="relative flex-shrink-0"
            >
              {/* Green glow effect behind phone */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { 
                  opacity: [0.4, 0.6, 0.4],
                  scale: [1, 1.05, 1]
                } : {}}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 -z-10 blur-3xl"
                style={{
                  background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, rgba(45, 212, 191, 0.15) 40%, transparent 70%)'
                }}
              />

              {/* Green checkmark indicator - positioned above phone */}
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: 45 }}
                animate={isInView ? { 
                  opacity: 1, 
                  scale: 1, 
                  rotate: 0 
                } : {}}
                transition={{ duration: 0.5, delay: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                className="absolute -top-4 -right-4 z-20 w-16 h-16 rounded-full bg-emerald-500/90 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-emerald-500/40"
              >
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>

              {/* Phone Container - Premium iPhone 15 Pro Max Style */}
              <div className="relative w-[320px] md:w-[360px]">
                <div className="relative w-full aspect-[9/16] select-none">
                  {/* Premium black frame - iPhone 15 Pro Max style */}
                  <div 
                    className="absolute inset-0 rounded-[3.2rem] pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, #2a2d35 0%, #1f2228 30%, #16181d 70%, #0d0f12 100%)',
                      boxShadow: '0 30px 70px rgba(0,0,0,0.7), 0 15px 35px rgba(0,0,0,0.5), 0 5px 15px rgba(0,0,0,0.4)',
                    }}
                  >
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
                      <div className="absolute inset-[10px] rounded-[2.4rem] overflow-hidden" style={{ background: '#0C0F15' }}>
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

                        {/* App content */}
                        <div className="absolute inset-0 pt-12 pb-6 px-4 overflow-hidden pointer-events-none">
                        <AnimatePresence mode="wait">
                          {/* Step 1: Import Landing */}
                          {(step === 'idle' || step === 'showing-dashboard' || step === 'click-import') && (
                            <ImportLandingScreen 
                              key="import-landing"
                              isClickingImport={step === 'click-import'}
                            />
                          )}

                          {/* Step 2: Create Plan */}
                          {step === 'create-plan' && (
                            <CreatePlanScreen key="create-plan" />
                          )}

                          {/* Step 3: Add Exercises */}
                          {(step === 'add-exercises' || step === 'complete') && (
                            <AddExercisesScreen 
                              key="add-exercises"
                              showComplete={step === 'complete'}
                            />
                          )}
                        </AnimatePresence>
                      </div>

                        {/* Home indicator */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full" />
                      </div>
                    </div>
                    
                    {/* Physical Side Buttons - iPhone 15 Pro Max Style */}
                    {/* LEFT SIDE - Volume buttons */}
                    <div className="absolute left-[-1px] top-[145px] w-[4px] h-[48px] rounded-r-[2px]" style={{
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
                  </div>
                </div>
              </div>


            </motion.div>
          </div>

          {/* Bottom Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-24 grid md:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-brand-accent-teal/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-brand-accent-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-white/70 font-light">Import in seconds</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-brand-accent-teal/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-brand-accent-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p className="text-white/70 font-light">Track everything automatically</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-brand-accent-teal/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-brand-accent-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-white/70 font-light">Smart timers & notifications</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Helper function
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Screen Components
function ImportLandingScreen({ isClickingImport }: { isClickingImport: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col items-center justify-center pointer-events-auto px-4"
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-16 h-16 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-6 shadow-2xl shadow-emerald-500/40"
      >
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
        </svg>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-xl font-bold text-white text-center mb-2 leading-tight"
      >
        Import Your
        <br />
        Own Program
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-white/60 text-center text-xs mb-8 max-w-[260px] leading-relaxed"
      >
        Already working with a coach or have your own plan? Bring it into Buli.
      </motion.p>

      {/* Big Import Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          scale: isClickingImport ? [1, 0.97, 1] : 1,
          boxShadow: isClickingImport ? [
            '0 8px 32px rgba(16, 185, 129, 0.3)',
            '0 8px 48px rgba(16, 185, 129, 0.5)',
            '0 8px 32px rgba(16, 185, 129, 0.3)'
          ] : '0 8px 32px rgba(16, 185, 129, 0.3)'
        }}
        transition={{ 
          opacity: { duration: 0.5, delay: 0.5 },
          y: { duration: 0.5, delay: 0.5 },
          scale: { duration: 0.4 },
          boxShadow: { duration: 0.5 }
        }}
        className="w-full max-w-[260px] bg-gradient-to-r from-emerald-500 via-emerald-500 to-teal-500 text-white rounded-2xl py-4 text-sm font-bold relative overflow-hidden"
      >
        {isClickingImport && (
          <motion.div
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-white rounded-full"
          />
        )}
        <span className="relative flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg>
          Get Started
        </span>
      </motion.button>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-8 grid grid-cols-3 gap-3 w-full max-w-[260px]"
      >
        <div className="text-center">
          <div className="text-emerald-400 text-[11px] font-bold mb-0.5">Fast</div>
          <div className="text-white/40 text-[8px] leading-tight">Import in seconds</div>
        </div>
        <div className="text-center">
          <div className="text-emerald-400 text-[11px] font-bold mb-0.5">Smart</div>
          <div className="text-white/40 text-[8px] leading-tight">Auto tracking</div>
        </div>
        <div className="text-center">
          <div className="text-emerald-400 text-[11px] font-bold mb-0.5">Easy</div>
          <div className="text-white/40 text-[8px] leading-tight">No setup needed</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function DashboardScreen({ isClickingImport }: { isClickingImport: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="h-full flex flex-col pointer-events-auto"
    >
      <h1 className="text-white text-xl font-semibold mb-3 text-center">Your Weekly Plan</h1>
      
      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 rounded-lg p-2">
          <div className="text-emerald-400 text-lg font-bold">12</div>
          <div className="text-white/50 text-[9px]">Workouts</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-lg p-2">
          <div className="text-blue-400 text-lg font-bold">85k</div>
          <div className="text-white/50 text-[9px]">Volume</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-lg p-2">
          <div className="text-purple-400 text-lg font-bold">18</div>
          <div className="text-white/50 text-[9px]">PRs</div>
        </div>
      </div>
      
      {/* Program cards */}
      <div className="space-y-1.5 mb-3 flex-1 overflow-y-auto">
        <div className="bg-gradient-to-r from-emerald-500/90 to-emerald-600/90 rounded-xl p-3 shadow-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-black font-semibold text-sm">Monday: Chest</span>
            <div className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          </div>
          <div className="text-black/60 text-[10px]">4 exercises • 24 sets</div>
        </div>
        <div className="bg-gradient-to-r from-emerald-500/90 to-emerald-600/90 rounded-xl p-3 shadow-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-black font-semibold text-sm">Tuesday: Back</span>
            <div className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          </div>
          <div className="text-black/60 text-[10px]">5 exercises • 28 sets</div>
        </div>
        <div className="border border-white/20 rounded-xl p-3 bg-white/5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-white text-sm">Wednesday: Rest</span>
            <span className="text-white/40 text-xs">💤</span>
          </div>
          <div className="text-white/40 text-[10px]">Recovery day</div>
        </div>
        <div className="border border-white/20 rounded-xl p-3 bg-white/5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-white text-sm">Thursday: Legs</span>
            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-white/40 text-xs">○</span>
            </div>
          </div>
          <div className="text-white/40 text-[10px]">6 exercises • 30 sets</div>
        </div>
        <div className="border border-white/20 rounded-xl p-3 bg-white/5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-white text-sm">Friday: Upper</span>
            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-white/40 text-xs">○</span>
            </div>
          </div>
          <div className="text-white/40 text-[10px]">5 exercises • 26 sets</div>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-1.5 mt-auto">
        <button className="w-full border border-white/20 text-white/70 rounded-xl py-2 text-xs font-medium bg-white/5">
          Edit Plan
        </button>
        
        <motion.button
          animate={isClickingImport ? {
            scale: [1, 0.97, 1],
            boxShadow: [
              '0 0 0 0 rgba(16, 185, 129, 0.4)',
              '0 0 0 8px rgba(16, 185, 129, 0)',
              '0 0 0 0 rgba(16, 185, 129, 0)'
            ]
          } : {}}
          transition={{ duration: 0.5 }}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl py-2.5 text-xs font-semibold shadow-lg shadow-emerald-500/30 relative overflow-hidden"
        >
          {isClickingImport && (
            <motion.div
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-white rounded-full"
            />
          )}
          <span className="relative flex items-center justify-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
            Import Own Program
          </span>
        </motion.button>
      </div>
    </motion.div>
  )
}

function CreatePlanScreen() {
  const days = [
    { name: 'Monday', suggested: 'Upper Body' },
    { name: 'Tuesday', suggested: 'Lower Body' },
    { name: 'Wednesday', suggested: 'Rest' },
    { name: 'Thursday', suggested: 'Upper Body' },
    { name: 'Friday', suggested: 'Lower Body' },
    { name: 'Saturday', suggested: 'Rest' },
    { name: 'Sunday', suggested: 'Rest' }
  ]
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="h-full flex flex-col pointer-events-auto"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="text-white/70 text-base">←</div>
        <h1 className="text-white text-base font-semibold">Create Your Plan</h1>
        <div className="text-emerald-400 text-[11px] font-semibold">Save</div>
      </div>

      {/* Info banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 border border-emerald-500/30 rounded-xl p-2 mb-2 text-[9px] text-emerald-100 leading-tight flex items-center gap-2"
      >
        <svg className="w-3 h-3 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <span>Tap each day to customize your training split</span>
      </motion.div>

      {/* Days list */}
      <div className="space-y-1 flex-1 overflow-y-auto pb-6">
        {days.map((day, index) => (
          <motion.div
            key={day.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * index }}
            className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-r from-white/[0.08] to-white/[0.03]"
          >
            <div className="flex items-center gap-2 p-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-[9px] font-semibold flex-shrink-0">
                {day.name.slice(0, 3).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold text-[11px] mb-0.5 whitespace-nowrap">{day.name}</div>
                <div className="text-white/50 text-[8px] whitespace-nowrap">{day.suggested}</div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <div className="text-emerald-400/60 text-[9px] font-medium">Edit</div>
                <svg className="w-3 h-3 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function AddExercisesScreen({ showComplete }: { showComplete: boolean }) {
  const [exerciseCount, setExerciseCount] = useState(0)
  
  useEffect(() => {
    const addExercises = async () => {
      await delay(400)
      setExerciseCount(1)
      await delay(600)
      setExerciseCount(2)
      await delay(600)
      setExerciseCount(3)
    }
    addExercises()
  }, [])
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="h-full flex flex-col pointer-events-auto"
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="text-white/70 text-base">←</div>
        <div className="flex-1 text-center">
          <h1 className="text-white text-sm font-semibold">Monday: Upper Body</h1>
          <motion.div 
            key={exerciseCount}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white/40 text-[8px]"
          >
            {exerciseCount} exercise{exerciseCount !== 1 ? 's' : ''} • {exerciseCount * 3 + (exerciseCount === 3 ? 1 : 0)} total sets
          </motion.div>
        </div>
        <div className="text-emerald-400 text-[11px] font-semibold">Done</div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-1.5">
        {/* Exercise 1 */}
        {exerciseCount >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
          <div className="absolute top-1.5 right-1.5 z-10">
            <button className="w-5 h-5 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center">
              <svg className="w-2.5 h-2.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
          
          <div className="border border-white/20 rounded-xl p-2.5 bg-gradient-to-br from-white/[0.08] to-white/[0.03]">
            <div className="flex items-start gap-2 mb-2">
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0"
              >
                <span className="text-white text-[11px] font-bold">1</span>
              </motion.div>
              <div className="flex-1 pr-5">
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="text-white text-xs font-semibold mb-0.5"
                >
                  Bench Press
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="text-white/50 text-[8px]"
                >
                  Barbell • Compound
                </motion.div>
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="grid grid-cols-3 gap-1.5"
            >
              <div className="bg-black/30 rounded-lg p-1.5 border border-white/5">
                <div className="text-white/40 text-[8px] mb-0.5">Sets</div>
                <div className="text-white text-[11px] font-semibold">4</div>
              </div>
              <div className="bg-black/30 rounded-lg p-1.5 border border-white/5">
                <div className="text-white/40 text-[8px] mb-0.5">Reps</div>
                <div className="text-white text-[11px] font-semibold">8-10</div>
              </div>
              <div className="bg-black/30 rounded-lg p-1.5 border border-white/5">
                <div className="text-white/40 text-[8px] mb-0.5">Rest</div>
                <div className="text-white text-[11px] font-semibold">120s</div>
              </div>
            </motion.div>
          </div>
          </motion.div>
        )}

        {/* Exercise 2 */}
        {exerciseCount >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
          <div className="absolute top-1.5 right-1.5 z-10">
            <button className="w-5 h-5 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center">
              <svg className="w-2.5 h-2.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
          
          <div className="border border-white/20 rounded-xl p-2.5 bg-gradient-to-br from-white/[0.08] to-white/[0.03]">
            <div className="flex items-start gap-2 mb-2">
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0"
              >
                <span className="text-white text-[11px] font-bold">2</span>
              </motion.div>
              <div className="flex-1 pr-5">
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="text-white text-xs font-semibold mb-0.5"
                >
                  Incline Dumbbell Press
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="text-white/50 text-[8px]"
                >
                  Dumbbell • Compound
                </motion.div>
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="grid grid-cols-3 gap-1.5"
            >
              <div className="bg-black/30 rounded-lg p-1.5 border border-white/5">
                <div className="text-white/40 text-[8px] mb-0.5">Sets</div>
                <div className="text-white text-[11px] font-semibold">3</div>
              </div>
              <div className="bg-black/30 rounded-lg p-1.5 border border-white/5">
                <div className="text-white/40 text-[8px] mb-0.5">Reps</div>
                <div className="text-white text-[11px] font-semibold">10-12</div>
              </div>
              <div className="bg-black/30 rounded-lg p-1.5 border border-white/5">
                <div className="text-white/40 text-[8px] mb-0.5">Rest</div>
                <div className="text-white text-[11px] font-semibold">90s</div>
              </div>
            </motion.div>
          </div>
          </motion.div>
        )}

        {/* Exercise 3 */}
        {exerciseCount >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
          <div className="absolute top-1.5 right-1.5 z-10">
            <button className="w-5 h-5 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center">
              <svg className="w-2.5 h-2.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
          
          <div className="border border-white/20 rounded-xl p-2.5 bg-gradient-to-br from-white/[0.08] to-white/[0.03]">
            <div className="flex items-start gap-2 mb-2">
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0"
              >
                <span className="text-white text-[11px] font-bold">3</span>
              </motion.div>
              <div className="flex-1 pr-5">
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="text-white text-xs font-semibold mb-0.5"
                >
                  Cable Flyes
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="text-white/50 text-[8px]"
                >
                  Cable • Isolation
                </motion.div>
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="grid grid-cols-3 gap-1.5"
            >
              <div className="bg-black/30 rounded-lg p-1.5 border border-white/5">
                <div className="text-white/40 text-[8px] mb-0.5">Sets</div>
                <div className="text-white text-[11px] font-semibold">3</div>
              </div>
              <div className="bg-black/30 rounded-lg p-1.5 border border-white/5">
                <div className="text-white/40 text-[8px] mb-0.5">Reps</div>
                <div className="text-white text-[11px] font-semibold">12-15</div>
              </div>
              <div className="bg-black/30 rounded-lg p-1.5 border border-white/5">
                <div className="text-white/40 text-[8px] mb-0.5">Rest</div>
                <div className="text-white text-[11px] font-semibold">60s</div>
              </div>
            </motion.div>
          </div>
          </motion.div>
        )}
      </div>

      {/* Add Exercise Button */}
      {exerciseCount >= 3 && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold py-2 flex items-center justify-center gap-1.5 mt-1.5 rounded-xl"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Exercise
        </motion.button>
      )}
    </motion.div>
  )
}


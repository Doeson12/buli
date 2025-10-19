'use client'

import { useState, useEffect, useRef } from 'react'

type Tab = 'dashboard' | 'history' | 'progress' | 'more'
type Theme = 'dark' | 'light'

interface DevicePreviewProps {
  theme?: Theme
  onThemeChange?: (theme: Theme) => void
  play?: boolean
}

/**
 * DevicePreview - Interactive iPhone mockup with workout interface
 * Features mouse-responsive parallax tilt effect and clickable navigation
 * Supports both dark and light themes
 */
export function DevicePreview({ theme = 'dark', onThemeChange, play = false }: DevicePreviewProps) {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [showMoreMessage, setShowMoreMessage] = useState(false)
  const [progressKey, setProgressKey] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)
  const glassRef = useRef<HTMLDivElement>(null)
  
  // Theme color configurations
  const colors = theme === 'dark' ? {
    // Dark mode colors
    statusBarText: 'text-white',
    statusBarIcons: 'white',
    background: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
    headerText: 'text-white',
    completedCard: 'bg-emerald-500/20 border-emerald-500/40',
    completedIcon: 'bg-emerald-500',
    completedIconText: 'text-white',
    completedText: 'text-white',
    completedEditIcon: 'text-white/60',
    upcomingCard: 'bg-white/5 border-white/10',
    upcomingIcon: 'bg-white/10',
    upcomingIconDot: 'bg-white/40',
    upcomingText: 'text-white',
    upcomingArrow: 'text-white/40',
    progressionCard: 'bg-white/5 border-white/10',
    progressionText: 'text-teal-400',
    progressionArrow: 'text-white/60',
    historyCard: 'bg-white/5 border-white/10',
    historyTitle: 'text-white',
    historySubtext: 'text-white/50',
    historyCheckBg: 'bg-emerald-500/20',
    historyCheckIcon: 'text-emerald-500',
    historyStatText: 'text-white/60',
    statsGradient1: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30',
    statsGradient2: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30',
    statsLabel: 'text-white/60',
    statsValue: 'text-white',
    statsSubtext: 'text-emerald-400',
    prCard: 'bg-white/5 border-white/10',
    prTitle: 'text-white',
    prHighlight: 'from-emerald-500/20 to-teal-500/20 border-emerald-400/50',
    prHighlightGlow: 'from-emerald-400/10 to-teal-400/10',
    prHighlightLabel: 'text-white',
    prHighlightValue: 'text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]',
    prHighlightSubtext: 'text-emerald-200/80',
    prLabel: 'text-white/70',
    prValue: 'text-emerald-400',
    navBg: 'bg-black/60',
    navBorder: 'border-white/5',
    navActiveIcon: 'text-emerald-500',
    navActiveText: 'text-emerald-500',
    navInactiveIcon: 'text-white/40',
    navInactiveText: 'text-white/40',
    overlayBg: 'bg-black/80',
    messageGradient: 'from-teal-500/20 to-emerald-500/20 border-teal-500/50',
    messageTitle: 'text-white',
    messageSubtext: 'text-white/60',
  } : {
    // Light mode colors
    statusBarText: 'text-gray-900',
    statusBarIcons: '#1f2937',
    background: 'bg-gradient-to-br from-gray-50 via-white to-gray-100',
    headerText: 'text-gray-900',
    completedCard: 'bg-emerald-50 border-emerald-200',
    completedIcon: 'bg-emerald-500',
    completedIconText: 'text-white',
    completedText: 'text-gray-900',
    completedEditIcon: 'text-gray-600',
    upcomingCard: 'bg-white border-gray-200',
    upcomingIcon: 'bg-gray-200',
    upcomingIconDot: 'bg-gray-400',
    upcomingText: 'text-gray-900',
    upcomingArrow: 'text-gray-400',
    progressionCard: 'bg-teal-50 border-teal-200',
    progressionText: 'text-teal-600',
    progressionArrow: 'text-gray-600',
    historyCard: 'bg-white border-gray-200',
    historyTitle: 'text-gray-900',
    historySubtext: 'text-gray-500',
    historyCheckBg: 'bg-emerald-100',
    historyCheckIcon: 'text-emerald-600',
    historyStatText: 'text-gray-600',
    statsGradient1: 'from-emerald-50 to-teal-50 border-emerald-200',
    statsGradient2: 'from-blue-50 to-indigo-50 border-blue-200',
    statsLabel: 'text-gray-600',
    statsValue: 'text-gray-900',
    statsSubtext: 'text-emerald-600',
    prCard: 'bg-white border-gray-200',
    prTitle: 'text-gray-900',
    prHighlight: 'from-emerald-50 to-teal-50 border-emerald-300',
    prHighlightGlow: 'from-emerald-100/50 to-teal-100/50',
    prHighlightLabel: 'text-gray-900',
    prHighlightValue: 'text-emerald-600 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]',
    prHighlightSubtext: 'text-emerald-700',
    prLabel: 'text-gray-600',
    prValue: 'text-emerald-600',
    navBg: 'bg-white/80',
    navBorder: 'border-gray-200',
    navActiveIcon: 'text-emerald-600',
    navActiveText: 'text-emerald-600',
    navInactiveIcon: 'text-gray-400',
    navInactiveText: 'text-gray-400',
    overlayBg: 'bg-white/90',
    messageGradient: 'from-teal-50 to-emerald-50 border-teal-300',
    messageTitle: 'text-gray-900',
    messageSubtext: 'text-gray-600',
  }
  
  // Buttery tilt with rAF + lerp (no React state churn)
  useEffect(() => {
    const wrap = containerRef.current
    const phone = phoneRef.current
    const glass = glassRef.current
    if (!wrap || !phone || !glass) return

    let targetX = 0, targetY = 0
    let rx = 0, ry = 0
    let raf: number | null = null

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const mx = (e.clientX - cx) / r.width
      const my = (e.clientY - cy) / r.height
      targetY = Math.max(-8, Math.min(8, mx * 16))   // rotateY
      targetX = Math.max(-8, Math.min(8, -my * 16))  // rotateX
    }
    
    const onLeave = () => { 
      targetX = 0
      targetY = 0 
    }

    const tick = () => {
      // Smooth lerp interpolation
      rx += (targetX - rx) * 0.12
      ry += (targetY - ry) * 0.12
      phone.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`
      // Move reflection subtly opposite to tilt for "glass" effect
      glass.style.transform = `translate(${(-ry*0.6)}px, ${(-rx*0.6)}px)`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    wrap.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(tick)
    
    return () => {
      window.removeEventListener('mousemove', onMove)
      wrap.removeEventListener('mouseleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
  
  const handleTabClick = (tab: Tab) => {
    if (tab === 'more') {
      setShowMoreMessage(true)
      setTimeout(() => setShowMoreMessage(false), 2500)
    } else {
      setActiveTab(tab)
      // Trigger animation when switching to progress tab
      if (tab === 'progress') {
        setProgressKey(prev => prev + 1)
      }
    }
  }
  
  return (
    <div 
      ref={containerRef}
      className="relative isolate flex items-center justify-center"
    >
      {/* Glow effect */}
      <div className="absolute -inset-8 bg-gradient-to-r from-brand-accent-indigo/30 via-brand-accent-teal/20 to-brand-accent-rose/20 blur-3xl opacity-50 rounded-[3rem] pointer-events-none" />
      
      {/* Ground shadow for 3D depth */}
      <div className="absolute -bottom-10 inset-x-0 h-40 phone-shadow opacity-60" />

      {/* PHONE - Premium chassis with buttery tilt */}
      <div
        ref={phoneRef}
        className="relative w-[310px] h-[640px] will-change-transform select-none scale-75 sm:scale-90 md:scale-100"
      >
        {/* Metal rim (outer) with conic gradient */}
        <div className="absolute inset-0 rounded-[3.2rem] metal-sheen shadow-[0_18px_50px_rgba(0,0,0,.45)]">
          {/* Bevel highlight for depth */}
          <div className="absolute inset-[2px] rounded-[3rem] bg-gradient-to-br from-white/6 via-white/1 to-black/30" />
        </div>

        {/* Chamfer edge (thin inner ring) */}
        <div className="absolute inset-[6px] rounded-[2.8rem] bg-[#0c0f13] shadow-[inset_0_0_0_1px_rgba(255,255,255,.06),inset_0_2px_8px_rgba(255,255,255,.04)]" />

        {/* GLASS (lifted screen plane with vignette) */}
        <div className="absolute inset-[12px] rounded-[2.4rem] overflow-hidden bg-black edge-vignette shadow-[inset_0_0_30px_rgba(0,0,0,.8)]">
          {/* Glass reflection layer that moves with tilt */}
          <div ref={glassRef} className="absolute inset-0 glass-reflection" />
          
          {/* Status bar - split to avoid notch */}
          <div className="absolute top-0 left-0 right-0 h-11 flex items-center justify-between text-white text-xs z-50">
            {/* Left side - Time */}
            <div className="pl-6 pt-1">
              <span className="font-semibold">9:41</span>
            </div>
            {/* Right side - WiFi, Battery */}
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
          
          {/* Notch with speaker + camera (under status bar z-index) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-black rounded-b-3xl z-40 shadow-[0_2px_6px_rgba(0,0,0,.5)]">
            {/* Speaker grille */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[6px] w-16 h-[5px] rounded-full bg-white/10" />
            {/* Front camera */}
            <div className="absolute right-6 top-[6px] w-[9px] h-[9px] rounded-full bg-black shadow-[inset_0_0_0_2px_rgba(255,255,255,.06)]" />
          </div>
          
          {/* ==================== APP CONTENT ==================== */}
          <div className="absolute inset-0 pt-12 pb-20 px-5 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                {/* Header */}
                <div className="mb-3">
                  <h2 className="text-white text-2xl font-bold mb-1">
                    {activeTab === 'dashboard' && 'Your Weekly Plan'}
                    {activeTab === 'history' && 'Workout History'}
                    {activeTab === 'progress' && 'Your Progress'}
                  </h2>
                </div>
                
                {/* Dashboard View */}
                {activeTab === 'dashboard' && (
                  <>
                    {/* Progression Strategy Dropdown */}
                    <div className="mb-3 p-2.5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-between">
                      <span className="text-teal-400 text-sm font-medium">Progression Strategy</span>
                      <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    
                    {/* Workout Days */}
                    <div className="space-y-2.5 overflow-y-auto max-h-[450px] pb-4 scrollbar-hide">
                  {/* Monday - Completed */}
                  <div className="py-3 px-3 rounded-xl bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/40 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-white font-medium text-sm">Monday: Push</p>
                    </div>
                    <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  
                  {/* Tuesday - Completed */}
                  <div className="py-3 px-3 rounded-xl bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/40 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-white font-medium text-sm">Tuesday: Pull</p>
                    </div>
                    <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  
                  {/* Wednesday - Completed */}
                  <div className="py-3 px-3 rounded-xl bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/40 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-white font-medium text-sm">Wednesday: Legs</p>
                    </div>
                    <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  
                  {/* Thursday - Completed */}
                  <div className="py-3 px-3 rounded-xl bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/40 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-white font-medium text-sm">Thursday: Upper Body</p>
                    </div>
                    <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  
                  {/* Friday - Completed */}
                  <div className="py-3 px-3 rounded-xl bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/40 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-white font-medium text-sm">Friday: Upper Body</p>
                    </div>
                    <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  
                  {/* Saturday */}
                  <div className="py-3 px-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white/40" />
                      </div>
                      <p className="text-white font-medium text-sm">Saturday: Lower Body</p>
                    </div>
                    <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  
                  {/* Sunday */}
                  <div className="py-3 px-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white/40" />
                      </div>
                      <p className="text-white font-medium text-sm">Sunday: Rest Day</p>
                    </div>
                    <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                    </div>
                  </>
                )}
                
                {/* History View */}
                {activeTab === 'history' && (
                  <div className="space-y-4 overflow-y-scroll max-h-[480px] pb-4 scrollbar-hide">
                    {/* Workout history cards */}
                    <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-white font-semibold text-base">Upper Body Strength</p>
                          <p className="text-white/50 text-xs mt-1">Friday, Oct 11 • 52 min</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex gap-4 text-xs">
                        <div className="flex items-center gap-1 text-white/60">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          <span>8 exercises</span>
                        </div>
                        <div className="flex items-center gap-1 text-white/60">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                          <span>24 sets</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-white font-semibold text-base">Leg Day Blast</p>
                          <p className="text-white/50 text-xs mt-1">Wednesday, Oct 9 • 48 min</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex gap-4 text-xs">
                        <div className="flex items-center gap-1 text-white/60">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          <span>6 exercises</span>
                        </div>
                        <div className="flex items-center gap-1 text-white/60">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                          <span>20 sets</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-white font-semibold text-base">Pull & Back Focus</p>
                          <p className="text-white/50 text-xs mt-1">Tuesday, Oct 8 • 55 min</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex gap-4 text-xs">
                        <div className="flex items-center gap-1 text-white/60">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          <span>7 exercises</span>
                        </div>
                        <div className="flex items-center gap-1 text-white/60">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                          <span>22 sets</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-white font-semibold text-base">Push & Chest Day</p>
                          <p className="text-white/50 text-xs mt-1">Monday, Oct 7 • 50 min</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex gap-4 text-xs">
                        <div className="flex items-center gap-1 text-white/60">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          <span>8 exercises</span>
                        </div>
                        <div className="flex items-center gap-1 text-white/60">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                          <span>24 sets</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Progress View */}
                {activeTab === 'progress' && (
                  <div className="space-y-3 pb-4">
                    {/* Stats cards - more compact */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30">
                        <p className="text-white/60 text-[10px] mb-0.5">Total Workouts</p>
                        <p className="text-white text-xl font-bold">47</p>
                        <p className="text-emerald-400 text-[10px]">+12 this month</p>
                      </div>
                      <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/10 border border-blue-500/30">
                        <p className="text-white/60 text-[10px] mb-0.5">Total Volume</p>
                        <p className="text-white text-xl font-bold">285k</p>
                        <p className="text-blue-400 text-[10px]">lbs lifted</p>
                      </div>
                    </div>

                    {/* Animated Graph - more compact */}
                    <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                      <p className="text-white font-medium text-xs mb-2">Strength Progress</p>
                      <div key={progressKey} className="relative flex items-end justify-between gap-1.5 px-2" style={{ height: '100px' }}>
                        {[45, 52, 48, 58, 55, 62, 68, 72].map((height, i) => (
                          <div key={i} className="flex-1 relative flex flex-col items-center min-w-[10px]" style={{ height: '100px' }}>
                            <div className="flex-1" />
                            <div 
                              className="w-full bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t bar-grow-animation transform-gpu will-change-transform"
                              style={{ 
                                height: `${height}%`,
                                maxHeight: '85px',
                                animationDelay: `${i * 0.1}s`,
                              }}
                            />
                            <span className="text-white/40 text-[8px] mt-1">W{i + 1}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Personal Records - expanded */}
                    <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                      <div className="flex items-center gap-2 mb-3">
                        <p className="text-white font-medium text-sm">Recent PRs</p>
                        <span className="text-lg">🎉</span>
                      </div>
                      <div className="space-y-2.5">
                        <div className="relative p-2 rounded-lg bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-2 border-emerald-400/50 shadow-lg shadow-emerald-500/20">
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-lg animate-pulse" />
                          <div className="relative flex items-center justify-between mb-1">
                            <span className="text-white text-xs font-medium">Bench Press</span>
                            <span className="text-emerald-300 text-sm font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]">100kg</span>
                          </div>
                          <p className="relative text-emerald-200/80 text-[10px]">New milestone! 💪</p>
                        </div>
                        <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                          <span className="text-white/70 text-xs">Squat</span>
                          <span className="text-emerald-400 text-sm font-semibold">143kg</span>
                        </div>
                        <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                          <span className="text-white/70 text-xs">Deadlift</span>
                          <span className="text-emerald-400 text-sm font-semibold">180kg</span>
                        </div>
                        <div className="flex items-center justify-between py-1.5">
                          <span className="text-white/70 text-xs">Overhead Press</span>
                          <span className="text-emerald-400 text-sm font-semibold">60kg</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

            {/* More Message Overlay */}
            {showMoreMessage && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-[2.5rem] z-50 animate-fade-in">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border border-teal-500/50 max-w-[240px] text-center">
                  <p className="text-white text-lg font-semibold mb-2">Download to see more</p>
                  <p className="text-white/60 text-sm">Get the full Buli experience on iOS</p>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Navigation Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-black/60 backdrop-blur-xl border-t border-white/5 px-4">
                <div className="flex items-center justify-around h-full">
                  <button 
                    onClick={() => handleTabClick('dashboard')}
                    className="flex flex-col items-center gap-1 transition-all"
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${activeTab === 'dashboard' ? 'bg-emerald-500' : ''}`}>
                      <svg className={`w-4 h-4 ${activeTab === 'dashboard' ? 'text-white' : 'text-white/40'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                    </div>
                    <span className={`text-[10px] font-medium ${activeTab === 'dashboard' ? 'text-emerald-500' : 'text-white/40'}`}>Dashboard</span>
                  </button>
                  
                  <button 
                    onClick={() => handleTabClick('history')}
                    className="flex flex-col items-center gap-1 transition-all"
                  >
                    <svg className={`w-6 h-6 ${activeTab === 'history' ? 'text-emerald-500' : 'text-white/40'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className={`text-[10px] font-medium ${activeTab === 'history' ? 'text-emerald-500' : 'text-white/40'}`}>History</span>
                  </button>
                  
                  <button 
                    onClick={() => handleTabClick('progress')}
                    className="flex flex-col items-center gap-1 transition-all"
                  >
                    <svg className={`w-6 h-6 ${activeTab === 'progress' ? 'text-emerald-500' : 'text-white/40'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                    <span className={`text-[10px] text-white/40 font-medium ${activeTab === 'progress' ? 'text-emerald-500' : 'text-white/40'}`}>Progress</span>
                  </button>
                  
                  <button 
                    onClick={() => handleTabClick('more')}
                    className="flex flex-col items-center gap-1 transition-all"
                  >
                    <svg className="w-6 h-6 text-white/40" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                    <span className="text-[10px] text-white/40 font-medium">More</span>
              </button>
            </div>
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full" />
          {/* ===================================================== */}
        </div>

        {/* Side buttons with metallic highlights */}
        <div className="absolute right-0 top-24 w-[3px] h-12 rounded-l bg-gradient-to-b from-[#333a44] to-[#1b2128] shadow-[inset_-1px_0_1px_rgba(255,255,255,.2)]" />
        <div className="absolute right-0 top-40 w-[3px] h-14 rounded-l bg-gradient-to-b from-[#333a44] to-[#1b2128] shadow-[inset_-1px_0_1px_rgba(255,255,255,.2)]" />
        <div className="absolute right-0 top-56 w-[3px] h-14 rounded-l bg-gradient-to-b from-[#333a44] to-[#1b2128] shadow-[inset_-1px_0_1px_rgba(255,255,255,.2)]" />
        <div className="absolute left-0 top-32 w-[3px] h-8 rounded-r bg-gradient-to-b from-[#333a44] to-[#1b2128] shadow-[inset_1px_0_1px_rgba(255,255,255,.2)]" />
      </div>
    </div>
  )
}
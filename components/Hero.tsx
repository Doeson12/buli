'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import Link from 'next/link'
import { StoreBadge } from './StoreBadge'
import { QR } from './QR'
import PhoneMockup from './PhoneMockup'
import { trackEvent } from '@/lib/analytics'

interface HeroProps {
  title: string
  subtitle: string
  secondaryText?: string
  showCTA?: boolean
  showDevice?: boolean
}

export function Hero({ 
  title, 
  subtitle,
  secondaryText,
  showCTA = true, 
  showDevice = true 
}: HeroProps) {
  const [mounted, setMounted] = useState(false)
  const [playPhone, setPlayPhone] = useState(false)
  const h1 = useAnimationControls()
  const sub = useAnimationControls()
  const sup = useAnimationControls()
  
  useEffect(() => {
    setMounted(true)
  }, [])

  // Add error logging for debugging
  useEffect(() => {
    const handleError = (e: ErrorEvent) => {
      console.error('Runtime error in Hero:', e.error)
    }
    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const animateSequence = async () => {
      // Animate headline with staggered word-by-word effect
      await h1.start({ 
        opacity: 1, 
        y: 0, 
        transition: { 
          duration: 0.8, 
          ease: [0.25, 0.1, 0.25, 1],
          staggerChildren: 0.2
        } 
      })
      
      // Animate subheadline
      await sub.start({ 
        opacity: 1, 
        y: 0, 
        transition: { 
          duration: 0.6, 
          ease: [0.25, 0.1, 0.25, 1] 
        } 
      })
      
      // Animate supporting text
      await sup.start({ 
        opacity: 0.75, 
        y: 0, 
        transition: { 
          duration: 0.5, 
          ease: [0.25, 0.1, 0.25, 1] 
        } 
      })
      
      // Trigger phone animation
      setPlayPhone(true)
    }

    animateSequence()
  }, [mounted, h1, sub, sup])

  // Early return to prevent hydration mismatch
  if (!mounted) {
    return null
  }

  const handleCTAClick = (type: 'ios' | 'android') => {
    trackEvent('cta_click', { context: 'hero', location: 'landing', type })
  }
  
  return (
    <section className="relative pt-20 pb-16 md:pt-28 md:pb-24">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start max-w-7xl mx-auto">
          {/* Left Column: Text Content */}
          <div className="space-y-6 md:pl-8 max-w-2xl mx-auto md:mx-0 text-center md:text-left">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold leading-tight px-4 md:px-0"
            >
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="block"
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
              >
                Feel better.
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="block"
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
              >
                Look stronger.
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="block"
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.6 }}
              >
                Be more confident.
              </motion.span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.8 }}
              className="text-lg sm:text-xl md:text-2xl text-brand-text-secondary leading-relaxed max-w-xl px-4 md:px-0"
            >
              Buli builds a training plan for your body and schedule—so progress becomes automatic.
            </motion.p>
            
            {secondaryText && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 1.0 }}
                className="text-sm md:text-base text-brand-text-secondary/70 leading-relaxed italic font-light border-l-2 border-brand-accent-teal/30 pl-4 max-w-xl mx-auto md:mx-0"
              >
                Already following a coach or have your own plan? Import it seamlessly and track every workout with intelligent insights.
              </motion.p>
            )}
            
            {showCTA && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.6, 
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: 1.2
                  }
                }}
                className="flex flex-col items-center sm:flex-row gap-4 sm:items-center justify-center md:justify-start px-4 md:px-0"
              >
                <div className="flex flex-col gap-3 justify-center h-[120px] items-center sm:items-start">
                  <StoreBadge 
                    platform="iOS" 
                    onClick={() => handleCTAClick('ios')}
                  />
                  
                  <Link
                    href="/download"
                    onClick={() => handleCTAClick('android')}
                    className="text-brand-text-secondary hover:text-brand-accent-teal transition-colors text-sm font-medium flex items-center gap-2"
                  >
                    <span>Join Android waitlist</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
                
                <div className="hidden sm:block w-px h-24 bg-white/10" />
                
                <div className="flex flex-col items-center justify-center gap-2 h-[120px]">
                  <QR size={96} />
                  <span className="text-xs text-brand-text-secondary">Scan to download</span>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Right Column: Desktop Phone with Typing Animation */}
          {showDevice && (
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                transition: { 
                  duration: 0.8, 
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 0.3
                }
              }}
              className="relative md:pr-8 mt-8 md:mt-0 md:-mt-4 pb-8"
            >
              <PhoneMockup variant="desktop" play={playPhone} />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
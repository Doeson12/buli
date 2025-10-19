'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { trackEvent } from '@/lib/analytics'
import MobilePillHeader from './MobilePillHeader'
import { throttle } from '@/lib/throttle'

const navItems = [
  { label: 'Science', href: '/science' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Community', href: '/community' },
  { label: 'Support', href: '/support' },
]

export function Nav() {
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > 20)
    }, 16) // ~60fps
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const handleDownloadClick = () => {
    trackEvent('cta_click', { context: 'nav', location: 'header' })
  }
  
  return (
    <>
      {/* Desktop Navigation - Pill Style */}
      <motion.nav
        initial={false}
        animate={{
          scale: isScrolled ? 1 : 1.05,
          opacity: isScrolled ? 1 : 0.85,
          y: isScrolled ? 0 : -6,
        }}
        transition={{
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={`nav-pill ${isScrolled ? 'scrolled' : ''} hidden md:block fixed top-4 left-0 right-0 mx-auto z-50 overflow-hidden`}
        style={{
          width: '90%',
          maxWidth: '1200px',
        }}
      >
        <motion.div 
          className="flex items-center justify-between px-6 py-3"
          initial={false}
          animate={{
            opacity: mounted ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link 
              href="/" 
              className="flex items-center gap-2"
              aria-label="Buli App home"
            >
              <div className="relative p-1.5 rounded-full bg-gradient-to-br from-brand-accent-teal/20 to-brand-accent-indigo/20 border border-brand-accent-teal/30">
                <div className="absolute inset-0 rounded-full bg-brand-accent-teal/10 blur-md" />
                <svg className="relative w-4 h-4 text-brand-accent-teal" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7v10c0 5.5 3.8 10.7 10 12 6.2-1.3 10-6.5 10-12V7l-10-5zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
              </div>
              <span className="text-base font-bold text-brand-text tracking-tight">Buli</span>
            </Link>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.2 + (index * 0.05),
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                <Link
                  href={item.href}
                  className="text-brand-text-secondary hover:text-brand-text transition-colors text-sm font-semibold"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.5,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <Link
                href="/download"
                onClick={handleDownloadClick}
                className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-xl font-semibold text-white text-sm shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Download
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Pill Header */}
      <MobilePillHeader />
    </>
  )
}


'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'
import Link from 'next/link'
import { trackEvent } from '@/lib/analytics'
import { throttle } from '@/lib/throttle'

export default function MobilePillHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showHeader, setShowHeader] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Throttled scroll handler for better performance
  useEffect(() => {
    if (!mounted) return

    const onScroll = throttle(() => {
      const y = window.scrollY
      
      // Skip scroll toggles while menu is open
      if (menuOpen) return

      setShowHeader(y > 120)
    }, 100) // Smoother on mobile - less frequent updates

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [mounted, menuOpen])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Close menu on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const navItems = [
    { label: 'Science', href: '/science' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blog', href: '/blog' },
    { label: 'Community', href: '/community' },
    { label: 'Support', href: '/support' },
  ]

  const handleDownloadClick = () => {
    trackEvent('cta_click', { context: 'mobile_pill_header', location: 'header' })
  }

  if (!mounted) return null

  return (
    <motion.header
      initial={false}
      animate={{
        scale: menuOpen ? 1 : showHeader ? 1 : 1.05,
        opacity: menuOpen || showHeader ? 1 : 0.85,
        y: menuOpen || showHeader ? 0 : -6,
        height: menuOpen ? 'auto' : '3.2rem',
      }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
        height: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      }}
      className={`mobile-header-pill ${menuOpen ? 'menu-open' : showHeader ? 'visible' : ''} md:hidden fixed top-3 left-0 right-0 mx-auto flex flex-col 
                 items-center justify-start overflow-hidden`}
      style={{
        width: '92%',
        maxWidth: '440px',
        zIndex: 100,
      }}
    >
      {/* Header row - always visible */}
      <div className="flex items-center justify-between w-full px-4 py-2 min-h-[3.2rem]">
        <Link href="/" className="flex items-center gap-1.5" onClick={() => setMenuOpen(false)}>
          <div className="relative p-1.5 rounded-full bg-gradient-to-br from-brand-accent-teal/20 to-brand-accent-indigo/20 border border-brand-accent-teal/30">
            <div className="absolute inset-0 rounded-full bg-brand-accent-teal/10 blur-md" />
            <svg className="relative w-3.5 h-3.5 text-brand-accent-teal" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7v10c0 5.5 3.8 10.7 10 12 6.2-1.3 10-6.5 10-12V7l-10-5zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            </svg>
          </div>
          <span className="text-sm font-bold text-brand-text tracking-tight">Buli</span>
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className="relative inline-flex items-center justify-center w-9 h-9 rounded-full transition-transform transform-gpu"
        >
          {/* BLUR layer (optional) */}
          <span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{ backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
          />

          {/* CONSTANT paint layer – this is what the icon sits on */}
          <span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{
              backgroundColor: 'rgb(26,27,33)',
              border: '1px solid rgba(255,255,255,0.14)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
          />

          {/* ICON – fixed light gray */}
          <AnimatePresence mode="wait">
            {menuOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative z-10"
              >
                <X className="w-4 h-4" style={{ color: 'rgba(206,208,214,0.92)' }} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative z-10"
              >
                <Menu className="w-4 h-4" style={{ color: 'rgba(206,208,214,0.92)' }} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        <button
          onClick={handleDownloadClick}
          className="p-2 rounded-full bg-gradient-to-r from-brand-accent-indigo to-brand-accent-teal hover:from-brand-accent-indigo/90 hover:to-brand-accent-teal/90 transition-all duration-200 shadow-lg hover:shadow-xl"
          aria-label="Download app"
        >
          <Download className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Expanding menu content - seamlessly integrated with delayed reveal */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            transition={{ 
              delay: 0.2, // Delay after container expansion
              duration: 0.6,
              ease: [0.23, 1, 0.32, 1]
            }}
            className="flex flex-col items-start w-full px-5 pt-2 pb-5 text-white overflow-y-auto"
            style={{
              clipPath: menuOpen ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
              maskImage: menuOpen 
                ? 'linear-gradient(to bottom, black 0%, black 100%)'  // solid reveal when open
                : 'radial-gradient(ellipse at center, black 70%, transparent 100%)'
            }}
          >
            {/* Navigation items */}
            <div className="w-full space-y-2">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ 
                    delay: 0.25 + (i * 0.04), // Staggered fade-in/out
                    duration: 0.5,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="group relative flex items-center justify-between px-4 py-2.5 rounded-xl overflow-hidden transition-all duration-300 w-full backdrop-blur-sm"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-accent-teal/20 to-brand-accent-indigo/20 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                      background: 'radial-gradient(circle at top left, rgba(99, 230, 226, 0.15), transparent 50%)'
                    }} />
                    
                    <span className="relative text-brand-text font-semibold group-hover:text-white transition-colors duration-300">{item.label}</span>
                    
                    <svg 
                      className="relative w-4 h-4 text-brand-text-secondary group-hover:text-brand-accent-teal transition-colors duration-300" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Download CTA */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ 
                delay: 0.25 + (navItems.length * 0.04),
                duration: 0.5,
                ease: [0.23, 1, 0.32, 1]
              }}
              className="w-full pt-3"
            >
              <Link
                href="https://apps.apple.com"
                onClick={() => {
                  handleDownloadClick()
                  setMenuOpen(false)
                }}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Download for iOS
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
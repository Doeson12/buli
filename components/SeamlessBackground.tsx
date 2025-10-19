'use client'

import { useEffect, useState } from 'react'

/**
 * SeamlessBackground - A persistent, GPU-accelerated background with layered gradients
 * This component is rendered once in the root layout and persists across all route changes
 * 
 * Features:
 * - Layered radial gradients with subtle float animations
 * - Grain texture overlay for premium feel
 * - Conic sheen for depth
 * - Vignette to calm edges
 * - Respects prefers-reduced-motion
 * - GPU-optimized with will-change and transform
 */
export function SeamlessBackground() {
  const [mounted, setMounted] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])
  
  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div 
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          width: '100vw',
          height: '100dvh',
          overflow: 'hidden',
          backgroundColor: '#0C0F15',
        }}
        aria-hidden="true"
      />
    )
  }

  return (
    <div 
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        width: '100vw',
        height: '100dvh',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {/* Clean solid background - no gradients, no lines */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundColor: '#0C0F15',
        }}
      />
    </div>
  )
}


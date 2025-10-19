'use client'

import { useState, useEffect } from 'react'
import Spotlight from './Spotlight'

export function SpotlightWrapper({ children }: { children: React.ReactNode }) {
  const [spotlightEnabled, setSpotlightEnabled] = useState(false)
  
  useEffect(() => {
    // Enable spotlight after initial page load animations
    // Delay slightly to let page content load
    const timer = setTimeout(() => {
      setSpotlightEnabled(true)
    }, 2000) // 2 seconds after page load
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <Spotlight
      className=""
      radius={280}
      color="rgba(56,234,120,0.08)"
      falloff={0.65}
      blend="screen"
      blur={2}
      smoothness={0.18}
      disabled={!spotlightEnabled}
    >
      {children}
    </Spotlight>
  )
}


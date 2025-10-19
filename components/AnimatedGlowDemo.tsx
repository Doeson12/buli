'use client'

/**
 * AnimatedGlowDemo - Small pulsing glow animation showing completion state
 * Used in DevicePreview to show "workout completed" feel
 */
export function AnimatedGlowDemo() {
  return (
    <div className="relative w-8 h-8">
      {/* Pulsing outer glow */}
      <div className="absolute inset-0 rounded-full bg-brand-accent-teal/30 animate-glow-pulse blur-sm" />
      
      {/* Inner core */}
      <div className="relative w-full h-full rounded-full bg-brand-accent-teal/50 border border-brand-accent-teal flex items-center justify-center">
        <svg className="w-4 h-4 text-brand-accent-teal" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  )
}


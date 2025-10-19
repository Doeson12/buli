'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

const features = [
  'AI-powered workout plans',
  'Import your own program',
  'Real-time technique feedback',
  'Exercise tutorials & guidance',
  'Progressive overload tracking',
  'Unlimited workout history',
  'Custom exercise creation',
  'CSV data export',
  'Priority support',
  'Early access to new features',
]

export function PricingTable() {
  const [isAnnual, setIsAnnual] = useState(false)

  const monthlyPrice = 12.99
  const annualPrice = 99.99
  const annualMonthly = (annualPrice / 12).toFixed(2)
  const savings = ((monthlyPrice * 12 - annualPrice) / (monthlyPrice * 12) * 100).toFixed(0)

  const handleCTAClick = (billingType: string) => {
    trackEvent('cta_click', { 
      context: 'pricing', 
      location: 'pricing_table', 
      plan: 'pro',
      billing: billingType 
    })
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-4 mb-12">
        <span className={`text-sm font-medium transition-colors ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>
          Monthly
        </span>
        
        <button
          onClick={() => setIsAnnual(!isAnnual)}
          className="relative w-14 h-7 rounded-full transition-colors duration-300"
          style={{ backgroundColor: isAnnual ? 'rgb(99, 102, 241)' : 'rgba(255,255,255,0.2)' }}
          aria-label="Toggle billing period"
        >
          <motion.div
            className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md"
            animate={{ x: isAnnual ? 28 : 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </button>
        
        <div className="flex items-center gap-2 min-w-[140px]">
          <span className={`text-sm font-medium transition-colors ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
            Annual
          </span>
          <motion.span
            initial={false}
            animate={{ 
              opacity: isAnnual ? 1 : 0,
              scale: isAnnual ? 1 : 0.8
            }}
            transition={{ duration: 0.2 }}
            className="px-2 py-0.5 text-xs font-semibold bg-emerald-500/20 text-emerald-300 rounded-full whitespace-nowrap"
          >
            Save {savings}%
          </motion.span>
        </div>
      </div>

      {/* Single Pricing Card */}
      <motion.div
        layout
        className="relative"
      >
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-75" />
        
        {/* Card */}
        <div className="relative bg-gradient-to-b from-gray-900/90 to-gray-950/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-7 shadow-2xl">
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-400/20 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-xs font-semibold text-indigo-300 tracking-wide uppercase">Buli Pro</span>
            </div>
            
            <div className="mb-2">
              <motion.div
                key={isAnnual ? 'annual' : 'monthly'}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-baseline justify-center gap-1.5"
              >
                <span className="text-6xl font-bold tracking-tight bg-gradient-to-br from-white via-white to-gray-400 bg-clip-text text-transparent">
                  ${isAnnual ? annualMonthly : monthlyPrice.toFixed(2)}
                </span>
                <span className="text-gray-500 text-base font-medium">/month</span>
              </motion.div>
              
              {isAnnual && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-gray-500 mt-1 font-light"
                >
                  Billed ${annualPrice}/year
                </motion.p>
              )}
            </div>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-400/20 rounded-full">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-emerald-300">7-day free trial</span>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-2.5 mb-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="flex items-center gap-2.5"
              >
                <div className="flex-shrink-0 w-4 h-4 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-indigo-400" strokeWidth={2.5} />
                </div>
                <span className="text-sm text-gray-300 font-light leading-tight">{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.a
            href="/download"
            onClick={() => handleCTAClick(isAnnual ? 'annual' : 'monthly')}
            className="block w-full py-3.5 px-6 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-xl font-semibold text-white text-center shadow-lg hover:shadow-xl transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Free Trial
          </motion.a>

          {/* Trust note */}
          <p className="text-center text-[11px] text-gray-500 mt-3 font-light">
            No credit card required • Cancel anytime
          </p>
        </div>
      </motion.div>

      {/* FAQ/Trust section */}
      <div className="mt-12 text-center space-y-3">
        <p className="text-sm text-gray-400">
          Join thousands of lifters seeing real results
        </p>
        <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
          <span>✓ iOS & Android</span>
          <span>✓ Cancel anytime</span>
          <span>✓ Data export</span>
        </div>
      </div>
    </div>
  )
}

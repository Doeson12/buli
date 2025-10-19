'use client'

import { useState, useRef } from 'react'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { trackEvent } from '@/lib/analytics'

interface EmailCaptureProps {
  context: 'android_waitlist' | 'newsletter'
  placeholder?: string
  buttonText?: string
}

export function EmailCapture({ 
  context, 
  placeholder = 'Enter your email',
  buttonText = 'Join Waitlist'
}: EmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const captchaRef = useRef<HCaptcha>(null)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }
    
    if (!captchaToken && process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY) {
      setStatus('error')
      setMessage('Please complete the captcha')
      return
    }
    
    setStatus('loading')
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          context,
          captchaToken,
        }),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setStatus('success')
        setMessage(data.message || 'Thanks! Check your email to confirm.')
        setEmail('')
        setCaptchaToken(null)
        
        // Track event
        trackEvent('email_submit', { context })
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
    
    // Reset captcha
    captchaRef.current?.resetCaptcha()
  }
  
  return (
    <div className="max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-4 py-3 rounded-lg glass text-brand-text placeholder:text-brand-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-accent-indigo"
            disabled={status === 'loading' || status === 'success'}
            aria-label="Email address"
          />
          
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Sending...' : buttonText}
          </button>
        </div>
        
        {process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY && status !== 'success' && (
          <HCaptcha
            ref={captchaRef}
            sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
            onVerify={(token) => setCaptchaToken(token)}
            theme="dark"
          />
        )}
        
        {message && (
          <p
            className={`text-sm ${
              status === 'success' ? 'text-brand-accent-teal' : 'text-brand-accent-rose'
            }`}
            role="alert"
          >
            {message}
          </p>
        )}
      </form>
      
      {status !== 'success' && (
        <p className="text-xs text-brand-text-secondary mt-4">
          We'll send a confirmation email. You can unsubscribe anytime.
        </p>
      )}
    </div>
  )
}


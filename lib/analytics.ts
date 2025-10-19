/**
 * Analytics integration for Plausible or GA4
 * Set NEXT_PUBLIC_ANALYTICS_PROVIDER in .env to 'plausible' or 'ga4'
 */

type EventName = 
  | 'cta_click'
  | 'qr_view'
  | 'appstore_click'
  | 'email_submit'
  | 'discord_join_click'

interface EventProps {
  context?: string
  location?: string
  [key: string]: string | number | boolean | undefined
}

/**
 * Track custom events
 */
export function trackEvent(eventName: EventName, props?: EventProps): void {
  const provider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER || 'plausible'
  
  if (typeof window === 'undefined') return
  
  try {
    if (provider === 'plausible') {
      // Plausible event tracking
      if ('plausible' in window) {
        (window as any).plausible(eventName, { props })
      }
    } else if (provider === 'ga4') {
      // GA4 event tracking
      if ('gtag' in window) {
        (window as any).gtag('event', eventName, props)
      }
    }
    
    // Console log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', eventName, props)
    }
  } catch (error) {
    console.error('Analytics error:', error)
  }
}

/**
 * Track page view
 */
export function trackPageView(url: string): void {
  const provider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER || 'plausible'
  
  if (typeof window === 'undefined') return
  
  try {
    if (provider === 'plausible') {
      if ('plausible' in window) {
        (window as any).plausible('pageview', { u: url })
      }
    } else if (provider === 'ga4') {
      if ('gtag' in window) {
        (window as any).gtag('config', process.env.NEXT_PUBLIC_GA4_ID, {
          page_path: url,
        })
      }
    }
  } catch (error) {
    console.error('Analytics error:', error)
  }
}

/**
 * Initialize analytics
 */
export function initAnalytics(): void {
  const provider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER || 'plausible'
  
  if (typeof window === 'undefined') return
  
  if (provider === 'plausible') {
    // Plausible is loaded via script tag in layout
    // No additional initialization needed
  } else if (provider === 'ga4') {
    // GA4 initialization via gtag.js script in layout
  }
}


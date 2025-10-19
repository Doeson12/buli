import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format date for display
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d)
}

/**
 * Preserve UTM parameters when navigating
 */
export function preserveUTM(url: string): string {
  if (typeof window === 'undefined') return url
  
  const currentParams = new URLSearchParams(window.location.search)
  const utmParams = new URLSearchParams()
  
  // Preserve all UTM parameters
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
    const value = currentParams.get(param)
    if (value) utmParams.set(param, value)
  })
  
  if (utmParams.toString()) {
    const separator = url.includes('?') ? '&' : '?'
    return `${url}${separator}${utmParams.toString()}`
  }
  
  return url
}


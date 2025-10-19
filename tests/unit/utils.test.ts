import { describe, it, expect } from 'vitest'
import { cn, formatDate, preserveUTM } from '@/lib/utils'

describe('utils', () => {
  describe('cn', () => {
    it('should merge class names', () => {
      expect(cn('foo', 'bar')).toBe('foo bar')
    })
    
    it('should handle Tailwind conflicts', () => {
      const result = cn('px-4', 'px-6')
      // twMerge should keep last one
      expect(result).toBe('px-6')
    })
  })
  
  describe('formatDate', () => {
    it('should format Date object', () => {
      const date = new Date('2025-10-15')
      const formatted = formatDate(date)
      expect(formatted).toContain('October')
      expect(formatted).toContain('2025')
    })
    
    it('should format date string', () => {
      const formatted = formatDate('2025-10-15')
      expect(formatted).toContain('October')
    })
  })
  
  describe('preserveUTM', () => {
    it('should append UTM params', () => {
      // Mock window.location
      Object.defineProperty(window, 'location', {
        value: {
          search: '?utm_source=test&utm_medium=email',
        },
        writable: true,
      })
      
      const result = preserveUTM('https://example.com/path')
      expect(result).toContain('utm_source=test')
      expect(result).toContain('utm_medium=email')
    })
    
    it('should return original URL if no UTM params', () => {
      Object.defineProperty(window, 'location', {
        value: { search: '' },
        writable: true,
      })
      
      const url = 'https://example.com/path'
      expect(preserveUTM(url)).toBe(url)
    })
  })
})


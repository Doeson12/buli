'use client'

export { ThemeProvider } from 'next-themes' // re-export, so you import from one place

import { useTheme as useNextTheme } from 'next-themes'

/** Unified hook with resolvedTheme for actual applied theme */
export function useTheme() {
  const { theme, resolvedTheme, setTheme, systemTheme } = useNextTheme()
  const toggleTheme = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  return { theme, resolvedTheme, systemTheme, setTheme, toggleTheme }
}

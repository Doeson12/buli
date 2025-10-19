'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, House, FlaskConical, Newspaper, Users, LifeBuoy, Download } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Item = { href: string; label: string; icon: React.ElementType }

const ITEMS: Item[] = [
  { href: '/',          label: 'Home',      icon: House },
  { href: '/science',   label: 'Science',   icon: FlaskConical },
  { href: '/blog',      label: 'Blog',      icon: Newspaper },
  { href: '/pricing',   label: 'Pricing',   icon: Download },
  { href: '/community', label: 'Community', icon: Users },
  { href: '/support',   label: 'Support',   icon: LifeBuoy },
]

export default function MobileMenu() {
  const [open, setOpen] = useState(false)

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      {/* Toggle (mobile only) */}
      <button
        onClick={() => setOpen(v => !v)}
        className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-full
                   border border-[var(--card-border)]
                   bg-[color-mix(in_srgb,var(--card),transparent_15%)]
                   hover:bg-[color-mix(in_srgb,var(--card),white_6%)]
                   transition-colors"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <NonModalSheet open={open} onClose={() => setOpen(false)} />
    </>
  )
}

function NonModalSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const pathname = usePathname()

  // Focus management: focus first interactive element when opening
  useEffect(() => {
    if (!open) return
    const id = setTimeout(() => firstLinkRef.current?.focus(), 10)
    return () => clearTimeout(id)
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-40 pointer-events-none"
          aria-hidden={!open}
        >
          {/* Optional visual vignette that doesn't block interactions */}
          <div className="pointer-events-none absolute inset-0
                          bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(0,0,0,.18),transparent_60%)]" />

          {/* The floating panel – the only interactive thing */}
          <motion.div
            ref={panelRef}
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile menu"
            initial={{ y: -28, opacity: 0, scale: 0.985 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -16, opacity: 0, scale: 0.985 }}
            transition={{ type: 'spring', stiffness: 420, damping: 36, mass: 0.8 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 100 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (info.offset.y > 60 || info.velocity.y > 700) onClose()
            }}
            className="pointer-events-auto absolute left-3 right-3
                       top-[max(12px,env(safe-area-inset-top))]
                       rounded-2xl overflow-hidden isolation-isolate
                       will-change-transform transform-gpu z-50"
          >
            {/* BLUR LAYER — only blur, no color */}
            <div className="absolute inset-0 backdrop-blur-xl" aria-hidden="true" />

            {/* PAINT LAYER — near-opaque so it doesn't re-blend while scrolling */}
            <div className="relative border rounded-2xl
                            bg-[var(--card)] border-[var(--card-border)]
                            shadow-[0_24px_70px_rgba(0,0,0,.18)]">
              {/* Header row with drag handle indicator */}
              <div className="flex flex-col items-center pt-2">
                {/* Drag handle */}
                <div className="w-12 h-1 rounded-full bg-[var(--fg)]/20 mb-2" />
                <div className="flex items-center justify-between w-full px-3 pb-2">
                  <span className="text-sm font-medium text-[var(--fg)]/80">Menu</span>
                  <button
                    onClick={onClose}
                    className="inline-flex w-9 h-9 items-center justify-center rounded-xl border
                               border-[var(--card-border)]
                               hover:bg-[color-mix(in_srgb,var(--card),white_6%)]
                               transition-colors will-change-transform transform-gpu"
                    aria-label="Close menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Links */}
              <nav className="px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
                <ul className="grid">
                  {ITEMS.map((it, i) => {
                    const Icon = it.icon
                    const active = pathname === it.href
                    return (
                      <li key={it.href}>
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 * i, duration: 0.22, ease: 'easeOut' }}
                        >
                          <Link
                            ref={i === 0 ? firstLinkRef : undefined}
                            href={it.href}
                            onClick={onClose}
                            className={`group grid grid-cols-[auto_1fr_auto] items-center gap-3
                                        px-3 py-3 rounded-xl border mb-2 transition-all
                                        border-[var(--card-border)]
                                        bg-[color-mix(in_oklab,var(--card),transparent_8%)]
                                        hover:bg-[color-mix(in_oklab,var(--card),white_10%)]
                                        active:scale-[.995]
                                        ${active ? 'ring-1 ring-emerald-500/30' : ''}`}
                          >
                            <span className="inline-flex w-9 h-9 items-center justify-center rounded-lg
                                             bg-[color-mix(in_oklab,var(--card),black_12%)]
                                             border border-[var(--card-border)]">
                              <Icon className="w-4 h-4 opacity-90" />
                            </span>
                            <span className="text-[15px] font-medium">{it.label}</span>
                            <svg className="w-4 h-4 opacity-50 group-hover:translate-x-0.5 transition-transform will-change-transform transform-gpu" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </Link>
                        </motion.div>
                      </li>
                    )
                  })}
                </ul>

                {/* Download CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * ITEMS.length, duration: 0.22, ease: 'easeOut' }}
                >
                <Link
                  href="/download"
                  onClick={onClose}
                  className="group flex items-center justify-center gap-2 w-full
                             px-4 py-3.5 rounded-xl font-semibold text-white
                             bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600
                             hover:from-violet-700 hover:via-fuchsia-700 hover:to-pink-700
                             shadow-lg shadow-violet-500/20
                             hover:shadow-xl hover:shadow-violet-500/30
                             active:scale-[.99]
                             transition-all will-change-transform transform-gpu"
                >
                  <Download className="w-4 h-4" />
                  Download App
                </Link>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}


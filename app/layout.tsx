import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { SeamlessBackground } from '@/components/SeamlessBackground'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { SpotlightWrapper } from '@/components/SpotlightWrapper'
import { ThemeProvider } from '@/lib/theme-provider'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://buli.app'),
  title: {
    default: 'Buli App - Your AI Fitness Coach',
    template: '%s | Buli App',
  },
  description: 'Train smarter with your AI coach. Hyper-personalized workout programs, automatic progression, and live form tips. Built by lifters, backed by sports science.',
  keywords: ['fitness', 'workout', 'AI coach', 'strength training', 'hypertrophy', 'progressive overload', 'personalized training'],
  authors: [{ name: 'Buli Team' }],
  creator: 'Buli Team',
  publisher: 'Buli App',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Buli App',
    title: 'Buli App - Your AI Fitness Coach',
    description: 'Train smarter with your AI coach. Hyper-personalized programs that adapt to you.',
    images: [
      {
        url: '/og/default.png',
        width: 1200,
        height: 630,
        alt: 'Buli App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buli App - Your AI Fitness Coach',
    description: 'Train smarter with your AI coach. Hyper-personalized programs that adapt to you.',
    images: ['/og/default.png'],
    creator: '@buliapp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icons/favicon.ico',
    apple: '/icons/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Plausible Analytics - Cookieless */}
        {process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER === 'plausible' && (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        )}
        
        {/* Google Analytics 4 */}
        {process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER === 'ga4' && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="font-sans overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SpotlightWrapper>
            {/* Seamless background - rendered once, persists across routes */}
            <SeamlessBackground />
            
            {/* Navigation */}
            <Nav />
            
            {/* Main content */}
            <main className="relative overflow-x-hidden">
              {children}
            </main>
            
            {/* Footer */}
            <Footer />
          </SpotlightWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}


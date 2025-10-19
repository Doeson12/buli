'use client'

import { useEffect, useState } from 'react'
import QRCodeLib from 'qrcode'
import { trackEvent } from '@/lib/analytics'

interface QRProps {
  size?: number
}

export function QR({ size = 128 }: QRProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('')
  
  useEffect(() => {
    const generateQR = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_IOS_APP_URL || 'https://apps.apple.com/app/idXXXXXXXXX'
        const dataUrl = await QRCodeLib.toDataURL(url, {
          width: size * 2, // 2x for retina
          margin: 1,
          color: {
            dark: '#ffffff',
            light: '#0C0F15',
          },
        })
        setQrDataUrl(dataUrl)
      } catch (error) {
        console.error('QR generation failed:', error)
      }
    }
    
    generateQR()
    
    // Track QR view
    trackEvent('qr_view', { size })
  }, [size])
  
  if (!qrDataUrl) {
    return (
      <div 
        className="glass rounded-xl flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <div className="animate-pulse text-brand-text-secondary">Loading...</div>
      </div>
    )
  }
  
  return (
    <div className="glass rounded-xl p-2">
      <img
        src={qrDataUrl}
        alt="QR code to download Buli App"
        width={size}
        height={size}
        className="rounded-lg"
      />
    </div>
  )
}


import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * Email subscription endpoint
 * Handles newsletter and Android waitlist signups with hCaptcha verification
 */
export async function POST(request: NextRequest) {
  try {
    const { email, context, captchaToken } = await request.json()
    
    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }
    
    // Verify hCaptcha if configured
    if (process.env.HCAPTCHA_SECRET_KEY && captchaToken) {
      const captchaResponse = await fetch('https://hcaptcha.com/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `response=${captchaToken}&secret=${process.env.HCAPTCHA_SECRET_KEY}`,
      })
      
      const captchaData = await captchaResponse.json()
      
      if (!captchaData.success) {
        return NextResponse.json(
          { error: 'Captcha verification failed' },
          { status: 400 }
        )
      }
    }
    
    // Send confirmation email via Resend
    if (resend) {
      const subject = context === 'android_waitlist' 
        ? 'You\'re on the Buli Android waitlist!'
        : 'Welcome to Buli newsletter!'
      
      const htmlContent = context === 'android_waitlist'
        ? `
          <h1>Thanks for joining the Android waitlist!</h1>
          <p>We'll notify you as soon as Buli launches on Android.</p>
          <p>In the meantime, check out our <a href="${process.env.NEXT_PUBLIC_SITE_URL}/blog">blog</a> for training tips.</p>
          <p>- The Buli Team</p>
        `
        : `
          <h1>Welcome to the Buli community!</h1>
          <p>You'll receive monthly training guides, science breakdowns, and product updates.</p>
          <p>Start training today: <a href="${process.env.NEXT_PUBLIC_SITE_URL}/download">Download Buli</a></p>
          <p>- The Buli Team</p>
        `
      
      await resend.emails.send({
        from: process.env.CONTACT_EMAIL || 'no-reply@buli.app',
        to: email,
        subject,
        html: htmlContent,
      })
    }
    
    return NextResponse.json({
      message: 'Thanks! Check your email to confirm.',
      success: true,
    })
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}


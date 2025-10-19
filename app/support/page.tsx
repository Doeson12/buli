import type { Metadata } from 'next'
import { FAQ } from '@/components/FAQ'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Support',
  description: 'Get help with Buli App. Contact us, find quick start guides, and troubleshoot common issues.',
  openGraph: {
    title: 'Buli Support',
    description: 'Get help with Buli App',
  },
}

const quickStartSteps = [
  {
    title: 'Download & Install',
    desc: 'Get Buli from the App Store and open the app.',
  },
  {
    title: 'Complete Questionnaire',
    desc: 'Answer questions about your experience, goals, and available equipment.',
  },
  {
    title: 'Review Your Plan',
    desc: 'AI generates your personalized program. Preview exercises and schedule.',
  },
  {
    title: 'Start Training',
    desc: 'Follow your first workout with guided instructions and form tips.',
  },
]

const troubleshootingFAQ = [
  {
    question: "App won't load my workout",
    answer: "Try closing and reopening the app. If the issue persists, check your internet connection and ensure you're on the latest app version. Contact support if problem continues.",
  },
  {
    question: "Technique feedback isn't working",
    answer: "Ensure camera permissions are enabled (Settings > Buli > Camera). Place your phone 6-8 feet away with good lighting. The feature requires iOS 15+ and is a Pro feature.",
  },
  {
    question: "My progression seems stuck",
    answer: "Check your RPE inputs—if you're consistently rating 8+, the system may trigger a deload. Progression pauses during deload weeks are intentional for recovery.",
  },
  {
    question: "How do I reset my program?",
    answer: "Go to Settings > Program > Reset Program. This will re-run the questionnaire and generate a fresh plan. Your history is preserved.",
  },
  {
    question: "Can't find my exercise in the library",
    answer: "Use the search with common variations (e.g., 'row' finds cable rows, barbell rows, etc.). Pro users can create custom exercises in Settings > Exercises.",
  },
  {
    question: "How do I export my data?",
    answer: "Pro feature: Settings > Data & Privacy > Export Data. You'll receive a CSV file with all workout history, progression data, and analytics.",
  },
]

const contactInfo = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Email Support',
    desc: process.env.CONTACT_EMAIL || 'support@buli.app',
    link: `mailto:${process.env.CONTACT_EMAIL || 'support@buli.app'}`,
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
    ),
    title: 'Discord Community',
    desc: 'Real-time help from users and team',
    link: process.env.NEXT_PUBLIC_DISCORD_URL || 'https://discord.gg/yourcode',
  },
]

export default function SupportPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            How can we help?
          </h1>
          <p className="text-xl text-brand-text-secondary leading-relaxed">
            Quick start guides, troubleshooting, and contact options.
          </p>
        </div>
        
        {/* Contact Options */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-8">
            Get in touch
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {contactInfo.map((item) => (
              <a
                key={item.title}
                href={item.link}
                target={item.link.startsWith('http') ? '_blank' : undefined}
                rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="card hover:border-brand-accent-indigo/30 transition-all group text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4 text-brand-accent-indigo">
                  {item.icon}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-brand-text-secondary">{item.desc}</p>
              </a>
            ))}
          </div>
        </section>
        
        {/* Quick Start */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-8">
            Quick Start Guide
          </h2>
          
          <div className="space-y-6">
            {quickStartSteps.map((step, index) => (
              <div key={step.title} className="card">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-accent-indigo/20 text-brand-accent-indigo flex items-center justify-center font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-brand-text-secondary">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Troubleshooting */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-8">
            Troubleshooting
          </h2>
          <FAQ items={troubleshootingFAQ} />
        </section>
        
        {/* Privacy Controls */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-8">
            Privacy & Data
          </h2>
          
          <div className="card max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Your data, your control</h3>
            <p className="text-brand-text-secondary mb-6 leading-relaxed">
              Buli processes all technique feedback locally on your device—no video is uploaded. Workout data is synced to your iCloud account and never shared with third parties.
            </p>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-brand-accent-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-brand-text-secondary">Export all data anytime (Pro)</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-brand-accent-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-brand-text-secondary">Delete account and all data in Settings</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-brand-accent-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-brand-text-secondary">No video uploads, all processing on-device</span>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/10">
              <Link href="/privacy" className="text-brand-accent-indigo hover:underline text-sm">
                Read our Privacy Policy →
              </Link>
            </div>
          </div>
        </section>
        
        {/* Still Need Help */}
        <div className="text-center card">
          <h2 className="text-2xl font-bold mb-4">
            Still need help?
          </h2>
          <p className="text-brand-text-secondary mb-6">
            Email us at <a href={`mailto:${process.env.CONTACT_EMAIL || 'support@buli.app'}`} className="text-brand-accent-indigo hover:underline">{process.env.CONTACT_EMAIL || 'support@buli.app'}</a>
          </p>
          <p className="text-sm text-brand-text-secondary">
            We typically respond within 24 hours.
          </p>
        </div>
      </div>
    </div>
  )
}


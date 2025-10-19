import { Hero } from '@/components/Hero'
import { FeatureCard } from '@/components/FeatureCard'
import { Testimonial } from '@/components/Testimonial'
import { FAQ } from '@/components/FAQ'
import { EmailCapture } from '@/components/EmailCapture'
import { AnimatedGlowDemo } from '@/components/AnimatedGlowDemo'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const features = [
  {
    title: 'Adaptive Programming',
    description: 'Your plan adjusts in real-time based on your performance, recovery, and progression. No cookie-cutter programs—every session is personalized to you.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    accent: 'indigo' as const,
  },
  {
    title: 'Technique Feedback',
    description: 'Camera-based form analysis gives you instant cues during your workout. No extra hardware needed—just your phone and quality reps.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    accent: 'teal' as const,
  },
  {
    title: 'Evidence-Based',
    description: 'Built on proven strength and hypertrophy models. Smart progression, auto-deloads, and RPE-based load management keep you training hard and recovering well.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    accent: 'rose' as const,
  },
]

const testimonials = [
  {
    quote: "Finally, a fitness app that actually understands progressive overload. The auto-progression is spot-on.",
    author: "Mikko S.",
    role: "Powerlifter, 2 years with Buli",
  },
  {
    quote: "The form feedback is like having a coach in my pocket. Fixed my squat depth issues in two weeks.",
    author: "Sara L.",
    role: "CrossFit Athlete",
  },
  {
    quote: "Love that it auto-deloads when I need recovery. No more guessing or burning out.",
    author: "Janne K.",
    role: "Strength Enthusiast",
  },
]

const faqItems = [
  {
    question: "Do I need gym experience?",
    answer: "No. Buli onboards you with simple movement patterns and progresses safely based on your ability. Whether you're a beginner or advanced lifter, the AI adapts to your level.",
  },
  {
    question: "How do you adjust loads?",
    answer: "Session results, RPE (Rate of Perceived Exertion), and progression rules inform next prescriptions. The system tracks volume, intensity, and recovery to prescribe optimal loads each workout.",
  },
  {
    question: "Can I export my data?",
    answer: "Yes! Pro users can export all workout history, progression data, and analytics as CSV files. Your data is always yours to keep.",
  },
  {
    question: "What equipment do I need?",
    answer: "Buli works with any equipment setup—full gym, home gym, or minimal equipment. During onboarding, you select your available equipment and the AI designs programs accordingly.",
  },
  {
    question: "How does the technique feedback work?",
    answer: "Using your phone's camera and on-device ML models, Buli analyzes your movement patterns and provides real-time form cues. All processing happens locally—no video is uploaded.",
  },
  {
    question: "Can I customize my program?",
    answer: "Absolutely. You can swap exercises, adjust training frequency, set volume preferences, and even create custom workouts. The AI maintains smart progression regardless of modifications.",
  },
]

export default function LocalizedHomePage() {
  const t = useTranslations()
  
  return (
    <>
      {/* JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Buli App',
            applicationCategory: 'HealthApplication',
            operatingSystem: 'iOS, Android',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              ratingCount: '127',
            },
          }),
        }}
      />
      
      {/* Hero Section */}
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />
      
      {/* Feature Trio */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to progress
            </h2>
            <p className="text-brand-text-secondary text-lg max-w-2xl mx-auto">
              Intelligent training that adapts to you, not the other way around.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                accent={feature.accent}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Feels */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How it feels
            </h2>
            <p className="text-brand-text-secondary text-lg max-w-2xl mx-auto">
              Clean workout cards, satisfying completion animations, and instant progress tracking.
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-r from-brand-accent-indigo/20 via-brand-accent-teal/20 to-brand-accent-rose/20 blur-3xl opacity-50 rounded-full" />
              <div className="relative flex items-center gap-8 glass rounded-2xl p-8">
                <AnimatedGlowDemo />
                <div>
                  <p className="text-xl font-semibold mb-2">Workout completed</p>
                  <p className="text-brand-text-secondary">New PR: +2.5kg on Bench Press</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Social Proof */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by lifters worldwide
            </h2>
            <p className="text-brand-text-secondary text-lg">
              Built at Aalto University with feedback from the strength community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {testimonials.map((testimonial) => (
              <Testimonial key={testimonial.author} {...testimonial} />
            ))}
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-2 glass rounded-full px-6 py-3">
              <span className="text-brand-text-secondary">Join</span>
              <span className="font-bold text-brand-accent-teal">10,000+</span>
              <span className="text-brand-text-secondary">active lifters</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently asked questions
            </h2>
          </div>
          
          <FAQ items={faqItems} />
          
          <div className="text-center mt-12">
            <Link
              href="/support"
              className="text-brand-accent-indigo hover:text-brand-accent-indigo/80 font-medium"
            >
              More questions? Visit our support center →
            </Link>
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-20">
        <div className="container-custom">
          <div className="card max-w-4xl mx-auto text-center p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to train smarter?
            </h2>
            <p className="text-brand-text-secondary text-lg mb-8 max-w-2xl mx-auto">
              Download Buli for iOS today or join the Android waitlist. Start your first workout in minutes.
            </p>
            
            <div className="flex flex-col items-center gap-6">
              <Link href="/download" className="btn-primary text-lg px-8 py-4">
                {t('hero.cta.ios')}
              </Link>
              
              <div className="w-full max-w-md">
                <p className="text-sm text-brand-text-secondary mb-4">
                  Android coming soon:
                </p>
                <EmailCapture 
                  context="android_waitlist"
                  placeholder="your@email.com"
                  buttonText="Join Waitlist"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}


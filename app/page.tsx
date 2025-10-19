import dynamic from 'next/dynamic'
import { Hero } from '@/components/Hero'
import { Testimonial } from '@/components/Testimonial'
import { FAQ } from '@/components/FAQ'
import { EmailCapture } from '@/components/EmailCapture'
import ScrollMarquee from '@/components/ScrollMarquee'
import { CARDS } from '@/lib/cards'
import Link from 'next/link'
import PhoneMockup from '@/components/PhoneMockup'

// Load heavy animated components on client only for better performance
const PersonalCoach = dynamic(() => import('@/components/PersonalCoach').then(mod => ({ default: mod.PersonalCoach })), { 
  ssr: false,
  loading: () => <div className="h-screen" />
})
const BuliIntakeFlow = dynamic(() => import('@/components/BuliIntakeFlow'), { 
  ssr: false,
  loading: () => <div className="min-h-[600px]" />
})
const ImportProgramAnimation = dynamic(() => import('@/components/ImportProgramAnimation').then(mod => ({ default: mod.ImportProgramAnimation })), { 
  ssr: false,
  loading: () => <div className="min-h-[800px]" />
})

const testimonials = [
  {
    quote: "Finally, a fitness app that actually understands progressive overload. The auto-progression is spot-on.",
    author: "Mikko S.",
    role: "Powerlifter, 2 years with Buli App",
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
    answer: "No. Buli App onboards you with simple movement patterns and progresses safely based on your ability. Whether you're a beginner or advanced lifter, the AI adapts to your level.",
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
    answer: "Buli App works with any equipment setup—full gym, home gym, or minimal equipment. During onboarding, you select your available equipment and the AI designs programs accordingly.",
  },
  {
    question: "How does the technique feedback work?",
    answer: "Using your phone's camera and on-device ML models, Buli App analyzes your movement patterns and provides real-time form cues. All processing happens locally—no video is uploaded.",
  },
  {
    question: "Can I customize my program?",
    answer: "Absolutely. You can swap exercises, adjust training frequency, set volume preferences, and even create custom workouts. The AI maintains smart progression regardless of modifications.",
  },
]

export default function HomePage() {
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
              price: '12.99',
              priceCurrency: 'USD',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: '12.99',
                priceCurrency: 'USD',
                referenceQuantity: {
                  '@type': 'QuantitativeValue',
                  value: '1',
                  unitCode: 'MON',
                },
              },
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              ratingCount: '127',
            },
          }),
        }}
      />
      
      {/* Mobile-only hero with typing animation */}
      <PhoneMockup variant="mobile" />
      
      {/* Desktop Hero Section */}
      <div className="hidden md:block">
        <Hero
          title="Feel better. Look stronger. Be more confident."
          subtitle="Buli builds a training plan for your body and schedule—so progress becomes automatic."
          secondaryText="Already following a coach or have your own plan? Import it seamlessly and track every workout with intelligent insights."
        />
      </div>
      
      {/* Personal Coach Section */}
      <PersonalCoach />
      
      {/* Intake Flow - How Buli builds your plan */}
      <BuliIntakeFlow />
      
      {/* Feature Marquee - Horizontal Scroll */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to progress
            </h2>
            <p className="text-brand-text-secondary text-lg max-w-2xl mx-auto mb-2">
              Intelligent training that adapts to you, not the other way around.
            </p>
            <p className="text-brand-text-secondary/60 text-sm">
              Scroll the page—cards loop infinitely
            </p>
          </div>
          
          <ScrollMarquee 
            items={CARDS}
            height={380}
            cardW={340}
            cardH={220}
            gap={20}
            speed={1.2}
            autoplayPxPerSec={60}
          />
        </div>
        
        {/* Extra space for scrolling */}
        <div className="h-32" />
      </section>
      
      {/* Import Your Program - Animated */}
      <ImportProgramAnimation />
      
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
              Download Buli App for iOS today or join the Android waitlist. Start your first workout in minutes.
            </p>
            
            <div className="flex flex-col items-center gap-6">
              <Link href="/download" className="btn-primary text-lg px-8 py-4">
                Get the iOS app
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
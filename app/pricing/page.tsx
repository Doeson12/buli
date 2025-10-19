import type { Metadata } from 'next'
import { PricingTable } from '@/components/PricingTable'
import { FAQ } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Pricing - Buli App',
  description: 'AI-powered strength training from $6.67/month. Start with a 7-day free trial, no credit card required.',
  openGraph: {
    title: 'Buli Pricing - Simple, Transparent',
    description: 'One plan. All features. 7-day free trial.',
  },
}

const pricingFAQ = [
  {
    question: "How does the free trial work?",
    answer: "Start with 7 days of full access to everything—AI coaching, technique feedback, unlimited history, data export, and all premium features. No credit card required. After the trial, continue for $12.99/month or $99.99/year.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Absolutely. All subscriptions are managed through the App Store and can be canceled instantly with no penalties or fees. You'll keep access until the end of your billing period.",
  },
  {
    question: "What's included?",
    answer: "Everything: AI-powered workout plans, real-time technique feedback, progressive overload tracking, unlimited workout history, custom exercise creation, CSV data export, priority support, and early access to new features.",
  },
  {
    question: "Is there a student discount?",
    answer: "Yes! We offer discounts for verified students and educators. Email support@buli.app with your .edu email for details.",
  },
  {
    question: "Do you offer team/gym licenses?",
    answer: "Yes! We have special pricing for coaches, personal trainers, and gym facilities. Contact support@buli.app to discuss bulk licensing options.",
  },
  {
    question: "How does billing work?",
    answer: "All payments are handled securely through Apple's App Store. Manage your subscription anytime in iOS Settings → [Your Name] → Subscriptions. No surprises, no hidden fees.",
  },
]

export default function PricingPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-400/20 rounded-full mb-6">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-emerald-300">7-day free trial</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
            One plan.<br />All features.
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Everything you need to build strength intelligently—no tiers, no limits, no complexity.
          </p>
        </div>
        
        {/* Pricing Table */}
        <PricingTable />
        
        {/* Social Proof */}
        <div className="mt-20 text-center space-y-6">
          <div className="flex items-center justify-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 border-2 border-gray-900"
                />
              ))}
            </div>
            <span className="text-sm text-gray-400 ml-2">Join 10,000+ lifters</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>4.8 rating</span>
            </div>
            <span>•</span>
            <span>🔒 Secure App Store billing</span>
            <span>•</span>
            <span>📱 iOS & Android</span>
          </div>
        </div>
        
        {/* FAQ */}
        <section className="mt-32">
          <h2 className="text-3xl font-bold text-center mb-12">
            Common questions
          </h2>
          <FAQ items={pricingFAQ} />
        </section>
        
        {/* Final CTA */}
        <div className="text-center mt-20">
          <div className="max-w-2xl mx-auto relative">
            {/* Subtle glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl" />
            
            <div className="relative bg-gradient-to-b from-gray-900/80 to-gray-950/80 backdrop-blur-xl border border-white/5 rounded-2xl p-8 md:p-12">
              <h3 className="text-3xl font-bold mb-4">
                Ready to get stronger?
              </h3>
              <p className="text-gray-400 mb-8 text-lg">
                Start your 7-day free trial. No credit card required.
              </p>
              <a
                href="/download"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download Buli App
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

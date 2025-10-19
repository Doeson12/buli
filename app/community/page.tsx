'use client'

import { EmailCapture } from '@/components/EmailCapture'

export default function CommunityPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Join the Community
          </h1>
          <p className="text-xl text-brand-text-secondary leading-relaxed">
            Connect with lifters worldwide, share your progress, and help shape the future of Buli.
          </p>
        </div>
        
        {/* Discord CTA */}
        <section className="mb-20">
          <div className="card text-center max-w-2xl mx-auto border-2 border-brand-accent-indigo glow-indigo">
            <div className="text-6xl mb-4">💬</div>
            <h2 className="text-3xl font-bold mb-4">Discord Server</h2>
            <p className="text-brand-text-secondary mb-6 leading-relaxed">
              Our most active community. Get real-time help, share PRs, discuss programming, and connect with other Buli users and the dev team.
            </p>
            <a
              href={process.env.NEXT_PUBLIC_DISCORD_URL || 'https://discord.gg/yourcode'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              Join Discord
            </a>
          </div>
        </section>
        
        {/* Social Links */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Follow Us
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <a
              href={process.env.NEXT_PUBLIC_TWITTER_URL || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="card hover:border-brand-accent-teal/30 transition-all group text-center"
            >
              <svg className="w-12 h-12 mx-auto mb-4 text-brand-accent-teal" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              <h3 className="font-semibold mb-2">Twitter</h3>
              <p className="text-sm text-brand-text-secondary">Updates, tips, and community highlights</p>
            </a>
            
            <a
              href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="card hover:border-brand-accent-rose/30 transition-all group text-center"
            >
              <svg className="w-12 h-12 mx-auto mb-4 text-brand-accent-rose" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <h3 className="font-semibold mb-2">Instagram</h3>
              <p className="text-sm text-brand-text-secondary">Workout inspiration and user stories</p>
            </a>
            
            <a
              href="/blog"
              className="card hover:border-brand-accent-indigo/30 transition-all group text-center"
            >
              <svg className="w-12 h-12 mx-auto mb-4 text-brand-accent-indigo" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <h3 className="font-semibold mb-2">Blog</h3>
              <p className="text-sm text-brand-text-secondary">Training guides, science, and product updates</p>
            </a>
          </div>
        </section>
        
        {/* Newsletter */}
        <section className="mb-20">
          <div className="card max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Newsletter</h2>
            <p className="text-brand-text-secondary mb-8 leading-relaxed">
              Monthly training tips, feature announcements, and science breakdowns. No spam, unsubscribe anytime.
            </p>
            
            <EmailCapture 
              context="newsletter"
              placeholder="your@email.com"
              buttonText="Subscribe"
            />
          </div>
        </section>
        
        {/* Code of Conduct */}
        <section>
          <div className="card max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Community Guidelines</h2>
            <p className="text-brand-text-secondary mb-4 leading-relaxed">
              We're building a welcoming space for lifters of all levels. Our community values:
            </p>
            
            <ul className="space-y-3 text-brand-text-secondary">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-brand-accent-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span><strong className="text-brand-text">Respect:</strong> Critique form, not people. Everyone's on their own journey.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-brand-accent-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span><strong className="text-brand-text">Evidence:</strong> Back claims with sources or experience, not bro-science.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-brand-accent-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span><strong className="text-brand-text">Support:</strong> Celebrate PRs, help troubleshoot, share what works.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-brand-accent-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span><strong className="text-brand-text">Safety:</strong> No harassment, hate speech, or unsolicited medical advice.</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}


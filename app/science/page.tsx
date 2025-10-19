import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Science',
  description: 'How Buli uses sports science, progressive overload principles, and adaptive algorithms to optimize your training.',
  openGraph: {
    title: 'The Science Behind Buli',
    description: 'Evidence-based training methodology and adaptive programming explained.',
  },
}

export default function SciencePage() {
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            headline: 'The Science Behind Buli',
            description: 'How adaptive training algorithms optimize progressive overload and recovery.',
            author: {
              '@type': 'Organization',
              name: 'Buli Team',
            },
          }),
        }}
      />
      
      <div className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              The Science Behind Buli
            </h1>
            <p className="text-xl text-brand-text-secondary leading-relaxed">
              Evidence-based training methodology meets adaptive algorithms. Here's how Buli optimizes your progression.
            </p>
          </div>
          
          {/* Adaptive Loop Diagram */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8">The Adaptive Training Loop</h2>
            
            <div className="card">
              <div className="grid md:grid-cols-5 gap-4 text-center">
                <div className="card bg-brand-accent-indigo/10 border-brand-accent-indigo/30">
                  <div className="text-4xl mb-2">📊</div>
                  <h3 className="font-semibold mb-1">Data In</h3>
                  <p className="text-xs text-brand-text-secondary">RPE, volume, recovery</p>
                </div>
                
                <div className="flex items-center justify-center text-brand-text-secondary">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
                
                <div className="card bg-brand-accent-teal/10 border-brand-accent-teal/30">
                  <div className="text-4xl mb-2">🎯</div>
                  <h3 className="font-semibold mb-1">Plan</h3>
                  <p className="text-xs text-brand-text-secondary">Load, sets, reps</p>
                </div>
                
                <div className="flex items-center justify-center text-brand-text-secondary">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
                
                <div className="card bg-brand-accent-rose/10 border-brand-accent-rose/30">
                  <div className="text-4xl mb-2">💪</div>
                  <h3 className="font-semibold mb-1">Session</h3>
                  <p className="text-xs text-brand-text-secondary">Execute & track</p>
                </div>
              </div>
              
              <div className="flex justify-center mt-6">
                <div className="text-center">
                  <svg className="w-8 h-8 mx-auto mb-2 text-brand-accent-indigo animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  <p className="text-sm text-brand-text-secondary">Continuous adaptation</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Progression Rules */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8">Progressive Overload Rules</h2>
            
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-3">
                  <span className="text-brand-accent-indigo">📈</span>
                  Load Progression
                </h3>
                <p className="text-brand-text-secondary mb-4">
                  When you complete all prescribed sets with RPE ≤ 8, load increases by 2.5-5kg for upper body, 5-10kg for lower body movements.
                </p>
                <ul className="space-y-2 text-sm text-brand-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-accent-teal">•</span>
                    <span>Intensity zones: 60-70% (hypertrophy), 75-85% (strength), 85-95% (peak)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-accent-teal">•</span>
                    <span>Auto-adjusts based on estimated 1RM from AMRAP sets</span>
                  </li>
                </ul>
              </div>
              
              <div className="card">
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-3">
                  <span className="text-brand-accent-teal">📊</span>
                  Volume Management
                </h3>
                <p className="text-brand-text-secondary mb-4">
                  Total volume (sets × reps × load) is tracked per muscle group. When volume exceeds maximum recoverable volume (MRV), a deload is triggered.
                </p>
                <ul className="space-y-2 text-sm text-brand-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-accent-teal">•</span>
                    <span>Minimum effective volume (MEV): 10-12 sets/muscle/week</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-accent-teal">•</span>
                    <span>Maximum recoverable volume (MRV): 18-25 sets/muscle/week</span>
                  </li>
                </ul>
              </div>
              
              <div className="card">
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-3">
                  <span className="text-brand-accent-rose">🛑</span>
                  Deload Triggers
                </h3>
                <p className="text-brand-text-secondary mb-4">
                  Automatic deloads preserve long-term progression and prevent overtraining.
                </p>
                <ul className="space-y-2 text-sm text-brand-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-accent-teal">•</span>
                    <span>Scheduled: Every 4-6 weeks (40-50% volume reduction)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-accent-teal">•</span>
                    <span>Reactive: 3+ sessions with RPE ≥ 9 or missed reps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-accent-teal">•</span>
                    <span>User-initiated: Manual deload option in settings</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          
          {/* RPE System */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8">RPE-Based Load Management</h2>
            
            <p className="text-brand-text-secondary mb-6 leading-relaxed">
              Rate of Perceived Exertion (RPE) is a 1-10 scale that quantifies effort. Buli uses RPE to auto-regulate intensity and prevent overreaching.
            </p>
            
            <div className="card">
              <div className="space-y-3">
                {[
                  { rpe: '10', desc: 'Max effort, no more reps possible', color: 'brand-accent-rose' },
                  { rpe: '9', desc: '1 rep left in the tank', color: 'brand-accent-rose' },
                  { rpe: '8', desc: '2-3 reps left (target zone)', color: 'brand-accent-teal' },
                  { rpe: '7', desc: '3-4 reps left', color: 'brand-accent-indigo' },
                  { rpe: '6', desc: '4+ reps left (warm-up)', color: 'brand-text-secondary' },
                ].map((item) => (
                  <div key={item.rpe} className="flex items-center gap-4 p-3 rounded-lg bg-white/5">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-${item.color} bg-${item.color}/10`}>
                      {item.rpe}
                    </div>
                    <p className="text-brand-text-secondary">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* References */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8">References</h2>
            
            <div className="card">
              <ol className="space-y-4 text-sm text-brand-text-secondary">
                <li>
                  <strong className="text-brand-text">1.</strong> Schoenfeld, B. J. (2010). The mechanisms of muscle hypertrophy and their application to resistance training. <em>Journal of Strength and Conditioning Research</em>, 24(10), 2857-2872.
                </li>
                <li>
                  <strong className="text-brand-text">2.</strong> Helms, E. R., et al. (2018). RPE vs. Percentage 1RM loading in periodized programs matched for sets and repetitions. <em>Frontiers in Physiology</em>, 9, 247.
                </li>
                <li>
                  <strong className="text-brand-text">3.</strong> Israetel, M., et al. (2020). <em>Scientific Principles of Strength Training</em>. Juggernaut Training Systems.
                </li>
                <li>
                  <strong className="text-brand-text">4.</strong> Zourdos, M. C., et al. (2016). Novel resistance training-specific rating of perceived exertion scale measuring repetitions in reserve. <em>Journal of Strength and Conditioning Research</em>, 30(1), 267-275.
                </li>
              </ol>
            </div>
          </section>
          
          {/* CTA */}
          <div className="text-center card">
            <h3 className="text-2xl font-bold mb-4">Ready to apply the science?</h3>
            <p className="text-brand-text-secondary mb-6">
              Experience evidence-based training with Buli.
            </p>
            <Link href="/download" className="btn-primary">
              Download Now
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}


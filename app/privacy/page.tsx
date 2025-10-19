import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Buli collects, uses, and protects your data.',
}

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-custom max-w-4xl">
        <h1 className="text-5xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-brand-text-secondary mb-8">Last updated: October 15, 2025</p>
        
        <div className="prose prose-invert max-w-none
          prose-headings:font-bold prose-headings:text-brand-text
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-brand-text-secondary prose-p:leading-relaxed prose-p:mb-4
          prose-a:text-brand-accent-indigo prose-a:no-underline hover:prose-a:underline
          prose-ul:text-brand-text-secondary prose-ul:my-4
          prose-li:my-2
        ">
          <h2>1. Introduction</h2>
          <p>
            Buli App ("we," "us," or "our") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website.
          </p>
          
          <h2>2. Information We Collect</h2>
          
          <h3>2.1 Information You Provide</h3>
          <ul>
            <li><strong>Account Information:</strong> Name, email address (through Apple/Google authentication)</li>
            <li><strong>Profile Data:</strong> Age, weight, height, fitness goals, experience level</li>
            <li><strong>Workout Data:</strong> Exercise selections, sets, reps, loads, RPE ratings, workout history</li>
            <li><strong>Custom Content:</strong> Custom exercises, notes, program modifications</li>
          </ul>
          
          <h3>2.2 Automatically Collected Information</h3>
          <ul>
            <li><strong>Device Information:</strong> Device type, operating system, app version</li>
            <li><strong>Usage Data:</strong> App interactions, feature usage, session duration</li>
            <li><strong>Analytics:</strong> Aggregated, anonymized usage patterns via Plausible (cookieless)</li>
          </ul>
          
          <h3>2.3 Camera & Motion Data</h3>
          <ul>
            <li><strong>Technique Feedback (Pro):</strong> Camera access for form analysis. All processing happens <strong>locally on your device</strong>—no video is uploaded or stored on our servers.</li>
            <li><strong>Motion Sensors:</strong> Accelerometer and gyroscope data for rep counting (processed locally)</li>
          </ul>
          
          <h2>3. How We Use Your Information</h2>
          <p>We use collected information to:</p>
          <ul>
            <li>Generate and adapt your personalized workout programs</li>
            <li>Track your progress and progression</li>
            <li>Provide technique feedback and form analysis</li>
            <li>Improve app features and user experience</li>
            <li>Send service-related notifications (opt-in for marketing)</li>
            <li>Respond to support requests</li>
            <li>Ensure platform security and prevent fraud</li>
          </ul>
          
          <h2>4. Data Storage & Security</h2>
          
          <h3>4.1 iCloud Sync</h3>
          <p>
            Your workout data is stored in your personal iCloud account (iOS) or Google Drive (Android) using end-to-end encryption. We cannot access this data without your credentials.
          </p>
          
          <h3>4.2 Our Servers</h3>
          <p>
            Minimal data (account identifiers, subscription status) is stored on secure servers to enable sync and authentication. All data transmission uses TLS 1.3 encryption.
          </p>
          
          <h3>4.3 Video & Camera Data</h3>
          <p>
            <strong>No video is uploaded.</strong> All technique feedback processing happens locally on your device using on-device machine learning models.
          </p>
          
          <h2>5. Data Sharing & Disclosure</h2>
          <p>We <strong>do not sell</strong> your personal data. We may share data only in these circumstances:</p>
          <ul>
            <li><strong>Service Providers:</strong> Cloud hosting (Vercel), authentication (Apple/Google), payment processing (App Store/Play Store)</li>
            <li><strong>Legal Compliance:</strong> When required by law or to protect rights and safety</li>
            <li><strong>Business Transfers:</strong> In case of merger or acquisition (you'll be notified)</li>
            <li><strong>With Your Consent:</strong> When you explicitly opt-in to share (e.g., social features)</li>
          </ul>
          
          <h2>6. Your Rights & Choices</h2>
          <p>You have the right to:</p>
          <ul>
            <li><strong>Access:</strong> Request a copy of your data (Pro: CSV export in-app)</li>
            <li><strong>Correction:</strong> Update inaccurate data in Settings</li>
            <li><strong>Deletion:</strong> Delete your account and all data in Settings {'->'} Account {'->'} Delete Account</li>
            <li><strong>Portability:</strong> Export your data in CSV format (Pro)</li>
            <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails anytime</li>
          </ul>
          
          <h2>7. Data Retention</h2>
          <ul>
            <li><strong>Active Users:</strong> Data retained while account is active</li>
            <li><strong>Deleted Accounts:</strong> All personal data deleted within 30 days</li>
            <li><strong>Anonymized Analytics:</strong> May be retained indefinitely (no personal identifiers)</li>
          </ul>
          
          <h2>8. Children's Privacy</h2>
          <p>
            Buli is not intended for users under 16. We do not knowingly collect data from children. If you believe a child has provided us with information, contact us to have it deleted.
          </p>
          
          <h2>9. International Data Transfers</h2>
          <p>
            Our servers are located in the EU (Vercel). If you're outside the EU, your data may be transferred and processed internationally with appropriate safeguards (Standard Contractual Clauses).
          </p>
          
          <h2>10. GDPR Compliance (EU Users)</h2>
          <p>If you're in the EU/EEA, you have additional rights under GDPR:</p>
          <ul>
            <li>Right to object to processing</li>
            <li>Right to restrict processing</li>
            <li>Right to lodge a complaint with your data protection authority</li>
          </ul>
          <p>Our legal basis for processing: Consent (you use the app) and Contract (to provide services).</p>
          
          <h2>11. Changes to This Policy</h2>
          <p>
            We may update this policy periodically. Changes will be posted here with an updated "Last updated" date. Continued use after changes constitutes acceptance.
          </p>
          
          <h2>12. Contact Us</h2>
          <p>For privacy questions or to exercise your rights:</p>
          <ul>
            <li><strong>Email:</strong> <a href="mailto:privacy@buli.app">privacy@buli.app</a></li>
            <li><strong>Support:</strong> <Link href="/support">buli.app/support</Link></li>
          </ul>
          
          <div className="mt-12 p-6 rounded-xl bg-white/5 border border-white/10">
            <p className="text-sm text-brand-text-secondary mb-2">
              <strong className="text-brand-text">TL;DR:</strong>
            </p>
            <ul className="text-sm space-y-1">
              <li>• No video uploads—all technique feedback is local</li>
              <li>• Your workout data lives in your iCloud/Google Drive</li>
              <li>• We don't sell your data</li>
              <li>• Export or delete anytime in Settings</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}


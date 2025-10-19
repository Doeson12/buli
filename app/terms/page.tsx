import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using Buli App.',
}

export default function TermsPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-custom max-w-4xl">
        <h1 className="text-5xl font-bold mb-6">Terms of Service</h1>
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
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using Buli App ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part, you may not use our Service.
          </p>
          
          <h2>2. Description of Service</h2>
          <p>
            Buli is an AI-powered fitness coaching application that provides personalized workout programs, progression tracking, and technique feedback. The Service is available via mobile app (iOS, Android) and web.
          </p>
          
          <h2>3. Eligibility</h2>
          <ul>
            <li>You must be at least 16 years old to use Buli</li>
            <li>You represent that all information provided is accurate</li>
            <li>You're responsible for maintaining account security</li>
          </ul>
          
          <h2>4. Account Registration</h2>
          <ul>
            <li>Accounts use Apple or Google authentication</li>
            <li>One account per user; no account sharing</li>
            <li>You're responsible for all activity under your account</li>
            <li>Notify us immediately of unauthorized access</li>
          </ul>
          
          <h2>5. Subscription & Billing</h2>
          
          <h3>5.1 Buli Pro Subscription</h3>
          <ul>
            <li><strong>Free Trial:</strong> 7 days of full access (no credit card required, cancel anytime)</li>
            <li><strong>Billing:</strong> Through App Store/Play Store; recurring monthly ($12.99) or annual ($99.99)</li>
            <li><strong>Renewal:</strong> Auto-renews unless canceled 24h before period ends</li>
            <li><strong>Cancellation:</strong> Manage in iOS/Android subscription settings; access continues until period ends</li>
            <li><strong>Refunds:</strong> Handled by Apple/Google per their policies</li>
          </ul>
          
          <h3>5.2 Price Changes</h3>
          <p>
            We reserve the right to change subscription prices with 30 days' notice. Existing subscribers keep current price until next renewal.
          </p>
          
          <h2>6. User Conduct</h2>
          <p>You agree NOT to:</p>
          <ul>
            <li>Violate any laws or regulations</li>
            <li>Share account credentials</li>
            <li>Reverse engineer or decompile the app</li>
            <li>Use the Service for commercial purposes without permission</li>
            <li>Upload malicious code or interfere with Service operation</li>
            <li>Harass, abuse, or harm other users</li>
            <li>Scrape or extract data via automated means</li>
          </ul>
          
          <h2>7. Health & Safety Disclaimer</h2>
          <p className="font-semibold text-brand-accent-rose">
            IMPORTANT: Buli is NOT a medical device or professional medical advice.
          </p>
          <ul>
            <li>Consult a physician before starting any exercise program</li>
            <li>Stop immediately if you experience pain, dizziness, or discomfort</li>
            <li>The AI coach provides general guidance, not medical diagnosis</li>
            <li>We are not liable for injuries or health issues arising from app use</li>
            <li>Users with medical conditions should seek professional clearance</li>
          </ul>
          
          <h2>8. Intellectual Property</h2>
          
          <h3>8.1 Our IP</h3>
          <p>
            All content, code, designs, algorithms, and trademarks are owned by Buli or licensors. You may not copy, modify, or distribute without permission.
          </p>
          
          <h3>8.2 Your Content</h3>
          <p>
            You retain ownership of your workout data and custom content. By using Buli, you grant us a license to process and display it to provide the Service.
          </p>
          
          <h2>9. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law:
          </p>
          <ul>
            <li>Buli is provided "AS IS" without warranties of any kind</li>
            <li>We are not liable for indirect, incidental, or consequential damages</li>
            <li>Our total liability is limited to the amount you paid in the last 12 months</li>
            <li>Some jurisdictions don't allow liability limitations; check local laws</li>
          </ul>
          
          <h2>10. Indemnification</h2>
          <p>
            You agree to indemnify and hold Buli harmless from claims arising from your use of the Service, violation of Terms, or infringement of third-party rights.
          </p>
          
          <h2>11. Data & Privacy</h2>
          <p>
            Your use is also governed by our <Link href="/privacy">Privacy Policy</Link>, incorporated by reference.
          </p>
          
          <h2>12. Termination</h2>
          
          <h3>12.1 By You</h3>
          <p>
            Delete your account anytime in Settings. Subscription cancellation must be done through App Store/Play Store.
          </p>
          
          <h3>12.2 By Us</h3>
          <p>
            We may suspend or terminate accounts for Terms violations, illegal activity, or prolonged inactivity (1+ year). You'll be notified when possible.
          </p>
          
          <h2>13. Dispute Resolution</h2>
          
          <h3>13.1 Governing Law</h3>
          <p>
            These Terms are governed by the laws of Finland, excluding conflict-of-law provisions.
          </p>
          
          <h3>13.2 Arbitration (Except EU)</h3>
          <p>
            For non-EU users: Disputes will be resolved via binding arbitration. You waive the right to jury trial and class actions.
          </p>
          
          <h3>13.3 EU Users</h3>
          <p>
            EU users retain all rights under local consumer protection laws and may bring disputes in their local courts.
          </p>
          
          <h2>14. Changes to Terms</h2>
          <p>
            We may update these Terms. Material changes will be notified via email or in-app notice 30 days in advance. Continued use after changes constitutes acceptance.
          </p>
          
          <h2>15. Miscellaneous</h2>
          <ul>
            <li><strong>Severability:</strong> Invalid provisions don't affect others</li>
            <li><strong>Waiver:</strong> Failure to enforce doesn't waive future rights</li>
            <li><strong>Assignment:</strong> You can't transfer your account; we can assign our rights</li>
            <li><strong>Entire Agreement:</strong> These Terms + Privacy Policy = complete agreement</li>
          </ul>
          
          <h2>16. Contact</h2>
          <p>
            Questions about these Terms?
          </p>
          <ul>
            <li><strong>Email:</strong> <a href="mailto:legal@buli.app">legal@buli.app</a></li>
            <li><strong>Support:</strong> <Link href="/support">buli.app/support</Link></li>
          </ul>
          
          <div className="mt-12 p-6 rounded-xl bg-white/5 border border-white/10">
            <p className="text-sm text-brand-text-secondary">
              <strong className="text-brand-text">Summary (not legal advice):</strong><br />
              Use Buli responsibly. It's fitness guidance, not medical advice. Consult a doctor before starting. Cancel subscriptions through the App Store. Be respectful in the community. We're not liable for injuries. Read the full Terms above for details.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


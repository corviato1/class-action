'use client';

import { useApp } from '@/context/AppContext';

export default function PrivacyPage() {
  const { } = useApp();

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-8">Last Updated: October 22, 2025</p>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                ClassAction ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
                explains how we collect, use, disclose, and safeguard your information when you use our Platform.
              </p>
              <p className="text-gray-700">
                By using ClassAction, you consent to the data practices described in this Privacy Policy. 
                If you do not agree with our policies, please do not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Personal Information</h3>
              <p className="text-gray-700 mb-4">
                When you create an account or make a pledge, we collect:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Name and contact information (email address, phone number)</li>
                <li>Payment information (processed securely through our payment providers)</li>
                <li>Account credentials (username, password)</li>
                <li>Profile information you choose to provide</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Case Information</h3>
              <p className="text-gray-700 mb-4">
                When submitting a case, we collect:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Case details (title, narrative, jurisdiction, funding goal)</li>
                <li>Supporting documentation and evidence</li>
                <li>Organizer contact information</li>
                <li>Updates and communications about the case</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Automatically Collected Information</h3>
              <p className="text-gray-700 mb-4">
                We automatically collect:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Usage data (pages visited, time spent, features used)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use your information to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Provide Services:</strong> Process pledges, manage cases, facilitate communications</li>
                <li><strong>Account Management:</strong> Create and maintain your account, verify identity</li>
                <li><strong>Payment Processing:</strong> Process transactions and prevent fraud</li>
                <li><strong>Communications:</strong> Send updates, notifications, and marketing (with your consent)</li>
                <li><strong>Platform Improvement:</strong> Analyze usage patterns, improve features, fix bugs</li>
                <li><strong>Legal Compliance:</strong> Comply with legal obligations, enforce our Terms, protect rights</li>
                <li><strong>Customer Support:</strong> Respond to inquiries and provide assistance</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">When We Share Information</h3>
              <p className="text-gray-700 mb-4">
                We may share your information with:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Case Organizers:</strong> Your name and pledge amount are visible to case organizers 
                for transparency (unless you pledge anonymously)</li>
                <li><strong>Payment Processors:</strong> Payment information is shared with our secure payment 
                partners to process transactions</li>
                <li><strong>Legal Counsel:</strong> When a case is funded, relevant information is shared with 
                attorneys handling the litigation</li>
                <li><strong>Service Providers:</strong> Third-party vendors who help us operate the Platform 
                (email services, hosting, analytics)</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or legal process</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong>Consent:</strong> When you explicitly consent to sharing</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">When We Don't Share</h3>
              <p className="text-gray-700 mb-4">
                We do NOT:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Sell your personal information to third parties</li>
                <li>Share your payment information (credit card numbers, bank details) with anyone except our 
                secure payment processors</li>
                <li>Use your data for purposes unrelated to providing our services without your consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>SSL/TLS encryption for data in transit</li>
                <li>Encryption of sensitive data at rest</li>
                <li>Secure escrow accounts with FDIC-insured financial institutions</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls and authentication requirements</li>
                <li>Employee training on data protection practices</li>
              </ul>
              <p className="text-gray-700">
                However, no method of transmission over the Internet is 100% secure. While we strive to protect 
                your information, we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Maintain your login session</li>
                <li>Remember your preferences</li>
                <li>Analyze Platform usage and performance</li>
                <li>Deliver relevant content and advertisements</li>
              </ul>
              <p className="text-gray-700">
                You can control cookies through your browser settings. Disabling cookies may limit your ability 
                to use certain Platform features.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights and Choices</h2>
              <p className="text-gray-700 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and personal information 
                (subject to legal and contractual obligations)</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails using the link in each message</li>
                <li><strong>Data Portability:</strong> Request your data in a portable format</li>
                <li><strong>Object:</strong> Object to certain processing of your information</li>
              </ul>
              <p className="text-gray-700">
                To exercise these rights, contact us at{' '}
                <a href="mailto:privacy@classaction.com" className="text-indigo-600 hover:text-indigo-700">
                  privacy@classaction.com
                </a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We retain your information for as long as:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Your account is active</li>
                <li>Needed to provide services to you</li>
                <li>Required by law or for legitimate business purposes</li>
                <li>Necessary to resolve disputes or enforce agreements</li>
              </ul>
              <p className="text-gray-700">
                After this period, we securely delete or anonymize your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
              <p className="text-gray-700">
                ClassAction is not intended for users under 18 years of age. We do not knowingly collect 
                information from children. If we discover we have collected information from a child, 
                we will delete it immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. International Users</h2>
              <p className="text-gray-700">
                Our servers are located in the United States. If you access the Platform from outside the US, 
                your information may be transferred to, stored, and processed in the US. By using the Platform, 
                you consent to this transfer and processing.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Third-Party Links</h2>
              <p className="text-gray-700">
                Our Platform may contain links to third-party websites. We are not responsible for the 
                privacy practices of these sites. We encourage you to read their privacy policies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to This Privacy Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of significant changes 
                by email or through a notice on the Platform. Your continued use after changes are posted 
                constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have questions or concerns about this Privacy Policy or our data practices, contact us:
              </p>
              <p className="text-gray-700">
                Email: <a href="mailto:privacy@classaction.com" className="text-indigo-600 hover:text-indigo-700">privacy@classaction.com</a>
              </p>
            </section>

            <div className="mt-12 p-6 bg-indigo-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">California Residents</h3>
              <p className="text-sm text-gray-700 mb-3">
                Under the California Consumer Privacy Act (CCPA), California residents have additional rights:
              </p>
              <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
                <li>Right to know what personal information is collected, used, shared, or sold</li>
                <li>Right to delete personal information (with certain exceptions)</li>
                <li>Right to opt-out of the sale of personal information (we do not sell your information)</li>
                <li>Right to non-discrimination for exercising your rights</li>
              </ul>
            </div>

            <div className="mt-6 p-6 bg-green-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">European Union Residents</h3>
              <p className="text-sm text-gray-700 mb-3">
                Under the General Data Protection Regulation (GDPR), EU residents have additional rights:
              </p>
              <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
                <li>Right to access and receive a copy of your personal data</li>
                <li>Right to rectification of inaccurate personal data</li>
                <li>Right to erasure ("right to be forgotten")</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
                <li>Right to withdraw consent at any time</li>
                <li>Right to lodge a complaint with a supervisory authority</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

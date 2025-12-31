'use client';

import { useApp } from '@/context/AppContext';

export default function TermsPage() {
  const { } = useApp();

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-sm text-gray-500 mb-8">Last Updated: October 22, 2025</p>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using ClassAction ("the Platform"), you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our services.
              </p>
              <p className="text-gray-700">
                These Terms constitute a legally binding agreement between you and ClassAction. We reserve the right 
                to modify these Terms at any time. Your continued use of the Platform after changes are posted 
                constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Platform Services</h2>
              <p className="text-gray-700 mb-4">
                ClassAction provides a crowdfunding platform that enables:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Case organizers to submit class action lawsuits for review and funding</li>
                <li>Backers to pledge financial support to approved cases</li>
                <li>Secure escrow management of pledged funds</li>
                <li>Connection between funded cases and qualified legal counsel</li>
                <li>Progress tracking and communication for ongoing cases</li>
              </ul>
              <p className="text-gray-700">
                ClassAction is not a law firm and does not provide legal advice or legal representation. 
                We facilitate funding for legal actions but do not participate in litigation.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts and Responsibilities</h2>
              <p className="text-gray-700 mb-4">
                <strong>Account Creation:</strong> You must provide accurate, complete information when creating 
                an account. You are responsible for maintaining the confidentiality of your account credentials.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Age Requirement:</strong> You must be at least 18 years old to use this Platform.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Prohibited Activities:</strong> You agree not to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Submit false, misleading, or fraudulent case information</li>
                <li>Use the Platform for any illegal purposes</li>
                <li>Attempt to manipulate or interfere with the Platform's operation</li>
                <li>Harass, threaten, or impersonate other users</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Case Submissions</h2>
              <p className="text-gray-700 mb-4">
                <strong>Review Process:</strong> All submitted cases undergo legal review. ClassAction reserves 
                the right to reject any case submission without providing detailed reasons.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Accuracy:</strong> Case organizers warrant that all information submitted is true, 
                accurate, and complete to the best of their knowledge.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>No Guarantee:</strong> Case approval does not guarantee successful funding or 
                favorable legal outcomes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Pledges and Payments</h2>
              <p className="text-gray-700 mb-4">
                <strong>Pledge Obligations:</strong> Pledges constitute a binding commitment to fund a case 
                if it reaches its funding goal within the specified timeframe.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Escrow:</strong> All pledged funds are held in secure escrow until the funding goal 
                is met. If the goal is not met, pledges are automatically refunded.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Platform Fees:</strong> ClassAction charges a 5% platform fee on successfully funded 
                cases. This fee is included in the funding goal amount.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Refund Policy:</strong> Pledges are refundable only if:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>The case does not reach its funding goal</li>
                <li>The case is cancelled or removed by the organizer or ClassAction</li>
                <li>ClassAction determines fraud or misrepresentation has occurred</li>
              </ul>
              <p className="text-gray-700">
                Once a case is funded and litigation begins, pledges are non-refundable.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Disclaimers and Limitations of Liability</h2>
              <p className="text-gray-700 mb-4">
                <strong>No Legal Advice:</strong> ClassAction does not provide legal advice. Consult with 
                a qualified attorney for legal guidance.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>No Guarantee of Outcomes:</strong> We make no guarantees regarding case outcomes, 
                settlement amounts, or timelines.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Platform "As-Is":</strong> The Platform is provided "as is" without warranties of 
                any kind, express or implied.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Limitation of Liability:</strong> ClassAction's liability is limited to the amount 
                of fees paid by you in the 12 months preceding any claim. We are not liable for indirect, 
                incidental, or consequential damages.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                All content on the Platform, including text, graphics, logos, and software, is the property 
                of ClassAction or its licensors and is protected by copyright and other intellectual property laws.
              </p>
              <p className="text-gray-700">
                Case organizers grant ClassAction a non-exclusive license to display and promote their 
                case information on the Platform and in marketing materials.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Dispute Resolution</h2>
              <p className="text-gray-700 mb-4">
                <strong>Arbitration:</strong> Any disputes arising from these Terms or use of the Platform 
                shall be resolved through binding arbitration rather than in court, except where prohibited by law.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Governing Law:</strong> These Terms are governed by the laws of the State of Delaware, 
                without regard to conflict of law provisions.
              </p>
              <p className="text-gray-700">
                <strong>Class Action Waiver:</strong> You agree to resolve disputes on an individual basis 
                and waive the right to participate in class actions against ClassAction (the irony is not lost on us).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Termination</h2>
              <p className="text-gray-700 mb-4">
                ClassAction may suspend or terminate your account at any time for violation of these Terms 
                or for any other reason at our sole discretion.
              </p>
              <p className="text-gray-700">
                Upon termination, your right to use the Platform ceases immediately. Provisions regarding 
                disclaimers, limitations of liability, and dispute resolution survive termination.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Modifications to Service</h2>
              <p className="text-gray-700">
                We reserve the right to modify or discontinue the Platform at any time, with or without notice. 
                We are not liable for any modification, suspension, or discontinuation of services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                For questions about these Terms, please contact us:
              </p>
              <p className="text-gray-700">
                Email: <a href="mailto:legal@classaction.com" className="text-indigo-600 hover:text-indigo-700">legal@classaction.com</a>
              </p>
            </section>

            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                By using ClassAction, you acknowledge that you have read, understood, and agree to be bound by 
                these Terms of Service. If you have any questions or concerns, please contact us before using 
                the Platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

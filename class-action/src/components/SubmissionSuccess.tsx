'use client';

import Link from 'next/link';
import StatusExplainer from './StatusExplainer';

interface SubmissionSuccessProps {
  type: 'case' | 'provider' | 'contract';
}

export default function SubmissionSuccess({ type }: SubmissionSuccessProps) {
  const titles = {
    case: 'Case Submitted Successfully',
    provider: 'Application Submitted Successfully',
    contract: 'Contract Submitted for Review',
  };

  const descriptions = {
    case: 'Your case has been submitted for manual review by our team.',
    provider: 'Your service provider application is now pending approval.',
    contract: 'Your contract has been submitted and requires admin approval before activation.',
  };

  const nextSteps = {
    case: [
      'Our team will review your submission within 5-7 business days',
      'You will receive an email notification when a decision is made',
      'We may contact you if additional information is needed',
      'Approved cases will be listed publicly for funding',
    ],
    provider: [
      'We will verify your credentials and licensing information',
      'An admin will manually review your application',
      'You will receive an email with the decision',
      'Once approved, you can offer services on the platform',
    ],
    contract: [
      'An admin will review the contract terms',
      'Both parties will be notified when the contract is approved',
      'No work should begin until the contract is approved',
      'You may be contacted if modifications are needed',
    ],
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8 text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{titles[type]}</h1>
          <p className="text-gray-600 mb-6">{descriptions[type]}</p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left mb-6">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-medium text-blue-900 mb-1">Manual Review Required</h3>
                <p className="text-sm text-blue-800">
                  All submissions require manual approval by our admin team. This process ensures quality and protects all platform users.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-left">
            <h3 className="font-semibold text-gray-900 mb-3">What Happens Next:</h3>
            <ul className="space-y-2">
              {nextSteps[type].map((step, index) => (
                <li key={index} className="flex items-start text-sm text-gray-600">
                  <span className="text-indigo-600 mr-2 font-medium">{index + 1}.</span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <StatusExplainer currentStep={0} type={type === 'case' ? 'submission' : 'provider'} />

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Return Home
          </Link>
          <Link
            href="/cases"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Browse Cases
          </Link>
        </div>
      </div>
    </div>
  );
}

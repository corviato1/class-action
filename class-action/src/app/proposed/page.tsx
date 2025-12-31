'use client';

import { useApp } from '@/context/AppContext';
import CaseCard from '@/components/CaseCard';

export default function ProposedPage() {
  const { cases } = useApp();
  
  const proposedCases = cases.filter(c => c.status === 'REVIEW');

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Proposed Cases</h1>
          <p className="text-lg text-gray-600">
            Cases currently under review. These will be available for pledges once approved by our team.
          </p>
        </div>

        {proposedCases.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Proposed Cases</h3>
            <p className="text-gray-600 mb-6">
              There are currently no cases under review. You can{' '}
              <a href="/submit" className="text-indigo-600 hover:text-indigo-700 font-medium">
                submit a new case
              </a>{' '}
              for consideration.
            </p>
          </div>
        ) : (
          <>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Under Review</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      These cases are being reviewed by our legal team. Pledging will be enabled once they are approved and moved to live status.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {proposedCases.map((caseData) => (
                <CaseCard key={caseData.id} case={caseData} />
              ))}
            </div>
          </>
        )}

        <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Review Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="bg-yellow-100 text-yellow-800 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mb-3">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Submission</h3>
              <p className="text-gray-600 text-sm">
                A case is submitted through our platform with all required details and documentation.
              </p>
            </div>
            <div>
              <div className="bg-yellow-100 text-yellow-800 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mb-3">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Review</h3>
              <p className="text-gray-600 text-sm">
                Our legal team reviews the case for merit, compliance, and feasibility.
              </p>
            </div>
            <div>
              <div className="bg-yellow-100 text-yellow-800 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mb-3">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Approval</h3>
              <p className="text-gray-600 text-sm">
                Approved cases go live and become available for public funding and support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

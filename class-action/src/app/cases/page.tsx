'use client';

import { useApp } from '@/context/AppContext';
import CaseCard from '@/components/CaseCard';

export default function CasesPage() {
  const { cases } = useApp();
  
  const liveCases = cases.filter(c => c.status === 'LIVE');

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Live Cases</h1>
          <p className="text-lg text-gray-600">
            Browse active class action lawsuits seeking funding. Support cases that matter to you.
          </p>
        </div>

        {liveCases.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Live Cases Yet</h3>
            <p className="text-gray-600">
              Check back soon for new cases, or{' '}
              <a href="/submit" className="text-indigo-600 hover:text-indigo-700 font-medium">
                submit your own case
              </a>{' '}
              for review.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveCases.map((caseData) => (
              <CaseCard key={caseData.id} case={caseData} />
            ))}
          </div>
        )}

        <div className="mt-12 bg-indigo-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mb-3">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Browse Cases</h3>
              <p className="text-gray-600 text-sm">
                Explore active class action lawsuits and read the case details, budgets, and updates.
              </p>
            </div>
            <div>
              <div className="bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mb-3">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Make a Pledge</h3>
              <p className="text-gray-600 text-sm">
                Support a case by pledging funds. Your money is held in escrow until the goal is reached.
              </p>
            </div>
            <div>
              <div className="bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mb-3">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Drive Change</h3>
              <p className="text-gray-600 text-sm">
                When funded, the case proceeds to litigation. Track progress and receive updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

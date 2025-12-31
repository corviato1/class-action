'use client';

import { useApp } from '@/context/AppContext';
import CaseCard from '@/components/CaseCard';
import Link from 'next/link';

export default function HomePage() {
  const { cases } = useApp();
  const liveCases = cases.filter(c => c.status === 'LIVE');

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Crowdfund Justice
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-indigo-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Join forces to fund class action lawsuits and hold corporations accountable. 
              Together, we can afford justice.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                href="/cases"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10"
              >
                Explore Cases
              </Link>
              <Link
                href="/submit"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 md:py-4 md:text-lg md:px-10"
              >
                Submit a Case
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-500">
              Simple, transparent, and effective
            </p>
          </div>
          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
            <div className="text-center">
              <div className="flex justify-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white text-xl font-bold">
                  1
                </div>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Submit or Browse</h3>
              <p className="mt-2 text-base text-gray-500">
                Submit a case for review or browse active lawsuits that need funding.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white text-xl font-bold">
                  2
                </div>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Pledge Support</h3>
              <p className="mt-2 text-base text-gray-500">
                Back cases you believe in with financial pledges to cover legal costs.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white text-xl font-bold">
                  3
                </div>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Track Progress</h3>
              <p className="mt-2 text-base text-gray-500">
                Follow case updates and see how your contribution makes a difference.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Cases Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Active Cases</h2>
            <p className="mt-4 text-lg text-gray-500">
              Support ongoing class action lawsuits
            </p>
          </div>
          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {liveCases.map(caseData => (
              <CaseCard key={caseData.id} case={caseData} />
            ))}
          </div>
          {liveCases.length === 0 && (
            <p className="text-center text-gray-500 mt-8">No active cases at the moment.</p>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Have a case?</span>
            <span className="block text-indigo-200">Submit it for review today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/submit"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Submit a Case
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

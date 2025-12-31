'use client';

import { useApp } from '@/context/AppContext';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import PledgeWidget from '@/components/PledgeWidget';
import Link from 'next/link';

export default function CaseDetailPage() {
  const { cases } = useApp();
  const params = useParams();
  const slug = params.slug as string;
  
  const [refreshKey, setRefreshKey] = useState(0);
  
  const caseData = cases.find(c => c.slug === slug);

  if (!caseData) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Case Not Found</h1>
            <p className="text-gray-600 mb-6">
              The case you're looking for doesn't exist or has been removed.
            </p>
            <Link
              href="/cases"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700"
            >
              Browse All Cases
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const progress = (caseData.raisedCents / caseData.goalCents) * 100;
  const raised = (caseData.raisedCents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const goal = (caseData.goalCents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const statusColors = {
    LIVE: 'bg-green-100 text-green-800',
    REVIEW: 'bg-yellow-100 text-yellow-800',
    DRAFT: 'bg-gray-100 text-gray-800',
    PAUSED: 'bg-orange-100 text-orange-800',
    CLOSED: 'bg-red-100 text-red-800',
    REJECTED: 'bg-red-100 text-red-800',
  };

  const handlePledgeSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="bg-gray-50 min-h-screen" key={refreshKey}>
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-64"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusColors[caseData.status]}`}>
                  {caseData.status}
                </span>
                {caseData.category && (
                  <span className="text-sm text-gray-500">{caseData.category}</span>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{caseData.title}</h1>
              
              <div className="text-sm text-gray-500 mb-6">
                <span className="font-medium">Jurisdiction:</span> {caseData.jurisdiction}
              </div>

              {caseData.status === 'LIVE' && (
                <div className="mb-6">
                  <div className="flex justify-between text-lg mb-2">
                    <span className="font-bold text-gray-900">{raised} raised</span>
                    <span className="text-gray-600">{goal} goal</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-indigo-600 h-3 rounded-full transition-all"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {Math.round(progress)}% funded
                  </p>
                </div>
              )}

              <div className="prose max-w-none">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Case Narrative</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {caseData.narrative}
                </p>
              </div>
            </div>

            {caseData.budgets && caseData.budgets.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Budget Breakdown</h2>
                <div className="space-y-3">
                  {caseData.budgets.map((budget) => (
                    <div key={budget.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                      <span className="text-gray-700">{budget.label}</span>
                      <span className="font-semibold text-gray-900">
                        {(budget.amountCents / 100).toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {caseData.updates && caseData.updates.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Case Updates</h2>
                <div className="space-y-6">
                  {caseData.updates.map((update) => (
                    <div key={update.id} className="border-l-4 border-indigo-600 pl-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-gray-900">{update.title}</h3>
                        <span className="text-sm text-gray-500">
                          {new Date(update.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{update.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            {caseData.status === 'LIVE' && (
              <div className="sticky top-8">
                <PledgeWidget caseId={caseData.id} onPledgeSuccess={handlePledgeSuccess} />
              </div>
            )}
            {caseData.status === 'REVIEW' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-yellow-900 mb-2">Under Review</h3>
                <p className="text-yellow-800 text-sm">
                  This case is currently under review by our team. It will be available for pledges once approved.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

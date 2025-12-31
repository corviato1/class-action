import Link from 'next/link';
import { Case } from '@/types';

interface CaseCardProps {
  case: Case;
}

export default function CaseCard({ case: caseData }: CaseCardProps) {
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

  return (
    <Link href={`/cases/${caseData.slug}`}>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border overflow-hidden cursor-pointer">
        <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[caseData.status]}`}>
              {caseData.status}
            </span>
            {caseData.category && (
              <span className="text-xs text-gray-500">{caseData.category}</span>
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{caseData.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{caseData.narrative}</p>
          <div className="text-sm text-gray-500 mb-4">
            <span className="font-medium">{caseData.jurisdiction}</span>
          </div>
          {caseData.status === 'LIVE' && (
            <>
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-semibold text-gray-900">{raised} raised</span>
                  <span className="text-gray-500">{goal} goal</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                {Math.round(progress)}% funded
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

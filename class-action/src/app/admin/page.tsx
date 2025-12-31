'use client';

import { useApp } from '@/context/AppContext';
import { useState } from 'react';
import StatusBanner from '@/components/StatusBanner';

export default function AdminPage() {
  const { submissions, approveSubmission, rejectSubmission } = useApp();
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showApprovalConfirm, setShowApprovalConfirm] = useState<string | null>(null);
  
  const pendingSubmissions = submissions.filter(s => s.status === 'pending');
  const approvedSubmissions = submissions.filter(s => s.status === 'approved');
  const rejectedSubmissions = submissions.filter(s => s.status === 'rejected');

  const formatCurrency = (cents: number) => {
    return (cents / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const handleApprove = (id: string) => {
    approveSubmission(id);
    setShowApprovalConfirm(null);
  };

  const handleReject = (id: string) => {
    if (!rejectionReason.trim()) {
      return;
    }
    rejectSubmission(id, rejectionReason.trim());
    setRejectingId(null);
    setRejectionReason('');
  };

  const handleStartReject = (id: string) => {
    setRejectingId(id);
    setRejectionReason('');
  };

  const currentSubmissions = activeTab === 'pending' 
    ? pendingSubmissions 
    : activeTab === 'approved' 
      ? approvedSubmissions 
      : rejectedSubmissions;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-lg text-gray-600">Manage case submissions and review pending cases</p>
        </div>

        <StatusBanner 
          status="info"
          title="Manual Review Required"
          message="All submissions require careful review before approval. Approved cases go live immediately for public funding."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <button
            onClick={() => setActiveTab('pending')}
            className={`bg-white rounded-lg shadow-sm p-6 border-l-4 text-left transition-all ${
              activeTab === 'pending' 
                ? 'border-yellow-500 ring-2 ring-yellow-200' 
                : 'border-yellow-500 hover:shadow-md'
            }`}
          >
            <div className="text-3xl font-bold text-gray-900">{pendingSubmissions.length}</div>
            <div className="text-sm text-gray-600 mt-1">Pending Review</div>
          </button>
          <button
            onClick={() => setActiveTab('approved')}
            className={`bg-white rounded-lg shadow-sm p-6 border-l-4 text-left transition-all ${
              activeTab === 'approved' 
                ? 'border-green-500 ring-2 ring-green-200' 
                : 'border-green-500 hover:shadow-md'
            }`}
          >
            <div className="text-3xl font-bold text-gray-900">{approvedSubmissions.length}</div>
            <div className="text-sm text-gray-600 mt-1">Approved</div>
          </button>
          <button
            onClick={() => setActiveTab('rejected')}
            className={`bg-white rounded-lg shadow-sm p-6 border-l-4 text-left transition-all ${
              activeTab === 'rejected' 
                ? 'border-red-500 ring-2 ring-red-200' 
                : 'border-red-500 hover:shadow-md'
            }`}
          >
            <div className="text-3xl font-bold text-gray-900">{rejectedSubmissions.length}</div>
            <div className="text-sm text-gray-600 mt-1">Rejected</div>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              {activeTab === 'pending' && 'Pending Submissions'}
              {activeTab === 'approved' && 'Approved Submissions'}
              {activeTab === 'rejected' && 'Rejected Submissions'}
            </h2>
            <span className="text-sm text-gray-500">
              {currentSubmissions.length} {currentSubmissions.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          
          {currentSubmissions.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-600">
                {activeTab === 'pending' && 'No pending submissions to review'}
                {activeTab === 'approved' && 'No approved submissions yet'}
                {activeTab === 'rejected' && 'No rejected submissions'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {currentSubmissions.map((submission) => (
                <div key={submission.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">
                          {submission.title}
                        </h3>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          submission.status === 'pending' 
                            ? 'bg-yellow-100 text-yellow-800'
                            : submission.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {submission.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {submission.name}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {submission.email}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Goal: {formatCurrency(submission.goalCents)}
                        </span>
                      </div>
                      {submission.category && (
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded">
                          {submission.category}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(submission.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-1">Jurisdiction:</p>
                    <p className="text-sm text-gray-600">{submission.jurisdiction}</p>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-1">Summary:</p>
                    <p className="text-sm text-gray-600">{submission.narrative}</p>
                  </div>
                  
                  {activeTab === 'pending' && (
                    <>
                      {showApprovalConfirm === submission.id ? (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                          <h4 className="font-medium text-green-900 mb-2">Confirm Approval</h4>
                          <p className="text-sm text-green-800 mb-4">
                            This case will immediately go live and be available for public funding. The submitter will receive an email notification.
                          </p>
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleApprove(submission.id)}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                            >
                              Yes, Approve Case
                            </button>
                            <button
                              onClick={() => setShowApprovalConfirm(null)}
                              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : rejectingId === submission.id ? (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                          <h4 className="font-medium text-red-900 mb-2">Rejection Reason (Required)</h4>
                          <p className="text-sm text-red-800 mb-3">
                            Please provide a reason. The submitter will receive this explanation via email.
                          </p>
                          <textarea
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent mb-3"
                            placeholder="Enter the reason for rejection..."
                          />
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleReject(submission.id)}
                              disabled={!rejectionReason.trim()}
                              className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              Confirm Rejection
                            </button>
                            <button
                              onClick={() => {
                                setRejectingId(null);
                                setRejectionReason('');
                              }}
                              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-3 pt-4 border-t border-gray-200">
                          <button
                            onClick={() => setShowApprovalConfirm(submission.id)}
                            className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors flex items-center justify-center gap-2"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Approve
                          </button>
                          <button
                            onClick={() => handleStartReject(submission.id)}
                            className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors flex items-center justify-center gap-2"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Reject
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-green-700 mb-2">Approve If:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Case describes a legitimate legal matter
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Jurisdiction explanation is reasonable
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Funding goal is appropriate for case type
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No prohibited content
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-red-700 mb-2">Reject If:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Submission is spam or nonsensical
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Contains prohibited or illegal content
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Appears to be fraudulent
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Insufficient information to evaluate
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

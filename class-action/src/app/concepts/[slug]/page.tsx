'use client';

import { useApp } from '@/context/AppContext';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import StatusBanner from '@/components/StatusBanner';
import { SERVICE_PROVIDER_LABELS } from '@/types';

export default function ConceptDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { getConceptBySlug, addChatMessage, providers } = useApp();
  
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const concept = getConceptBySlug(slug);

  if (!concept) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Concept Not Found</h1>
          <p className="text-gray-600 mb-6">The concept you're looking for doesn't exist.</p>
          <Link href="/concepts" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Back to Concepts
          </Link>
        </div>
      </div>
    );
  }

  const interestedProviderDetails = concept.interestedProviders
    .map(id => providers.find(p => p.id === id))
    .filter(Boolean);

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const result = addChatMessage(concept.id, userName, message);
    
    if (result.success) {
      setSuccess(result.message);
      setMessage('');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/concepts" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 mb-6">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Concepts
        </Link>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                APPROVED
              </span>
              <span className="inline-block px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded">
                {concept.category}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{concept.title}</h1>
            <p className="text-gray-600 text-lg">{concept.summary}</p>
          </div>
        </div>

        {interestedProviderDetails.length > 0 && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Interested Service Providers</h2>
            </div>
            <div className="p-6">
              <div className="grid gap-4">
                {interestedProviderDetails.map((provider) => provider && (
                  <div key={provider.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                      <span className="text-sm text-indigo-600 font-medium">
                        {SERVICE_PROVIDER_LABELS[provider.type]}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">{provider.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Discussion Wall</h2>
            <span className="text-sm text-gray-500">{concept.chatMessages.length} messages</span>
          </div>
          
          <div className="p-6">
            <StatusBanner 
              status="info"
              title="Community Discussion"
              message="Share your experience, evidence, or questions. Service providers and legal experts may join to discuss next steps."
            />

            <div className="mt-6 space-y-4 max-h-96 overflow-y-auto">
              {concept.chatMessages.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No messages yet. Be the first to start the discussion!
                </div>
              ) : (
                concept.chatMessages.map((msg) => (
                  <div key={msg.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">{msg.userName}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{msg.message}</p>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleSubmitMessage} className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-medium text-gray-900 mb-4">Add to the Discussion</h3>
              
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                  {success}
                </div>
              )}

              <div className="mb-4">
                <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your display name"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Share your thoughts, evidence, or questions..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Post Message
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Contracts & Agreements</h2>
          </div>
          <div className="p-6">
            {concept.contracts.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-2">No contracts yet</p>
                <p className="text-sm text-gray-500">
                  Once discussions progress, service providers will propose contracts for review.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {concept.contracts.map((contract) => (
                  <div key={contract.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{contract.title}</h3>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        contract.status === 'active' ? 'bg-green-100 text-green-800' :
                        contract.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {contract.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{contract.description}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Provider: {contract.providerName}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

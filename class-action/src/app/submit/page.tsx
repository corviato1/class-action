'use client';

import { useApp } from '@/context/AppContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SubmitPage() {
  const { addSubmission } = useApp();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    jurisdiction: '',
    jurisdictionReason: '',
    desiredOutcome: '',
    goalCents: '',
    category: '',
    email: '',
    name: '',
    firmsWanted: '',
    firmsInterested: '',
    firmsCommitted: '',
  });
  
  const [notifications, setNotifications] = useState({
    fundingGoalMet: true,
    firmsRetained: true,
    legalFilingMade: true,
    outcomeAchieved: true,
    milestoneUpdates: false,
  });
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title || formData.title.trim().length < 10) {
      newErrors.title = 'Title must be at least 10 characters.';
    }

    if (!formData.summary || formData.summary.trim().length < 50) {
      newErrors.summary = 'Summary must be at least 50 characters.';
    }

    if (!formData.email || !formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.jurisdiction || formData.jurisdiction.trim().length < 3) {
      newErrors.jurisdiction = 'Please enter a jurisdiction.';
    }

    if (!formData.jurisdictionReason || formData.jurisdictionReason.trim().length < 20) {
      newErrors.jurisdictionReason = 'Please explain why this jurisdiction applies (at least 20 characters).';
    }

    if (!formData.desiredOutcome || formData.desiredOutcome.trim().length < 20) {
      newErrors.desiredOutcome = 'Please describe the desired outcome (at least 20 characters).';
    }

    const goalCents = Math.round(parseFloat(formData.goalCents || '0') * 100);
    if (!formData.goalCents || goalCents < 500000) {
      newErrors.goalCents = 'Funding goal must be at least $5,000';
    }

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Please enter your full name.';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const goalCents = Math.round(parseFloat(formData.goalCents) * 100);
    
    const result = addSubmission({
      title: formData.title,
      narrative: formData.summary,
      jurisdiction: `${formData.jurisdiction} - ${formData.jurisdictionReason}`,
      goalCents,
      category: formData.category,
      email: formData.email,
      name: formData.name,
    });

    setIsSubmitting(false);

    if (result.success) {
      setSuccessMessage(result.message);
      setFormData({
        title: '',
        summary: '',
        jurisdiction: '',
        jurisdictionReason: '',
        desiredOutcome: '',
        goalCents: '',
        category: '',
        email: '',
        name: '',
        firmsWanted: '',
        firmsInterested: '',
        firmsCommitted: '',
      });
      setTimeout(() => {
        router.push('/submit/success');
      }, 2000);
    } else {
      setErrors({ submit: result.message });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Submit a Case</h1>
          <p className="text-lg text-gray-600">
            Have a class action lawsuit that needs funding? Submit your case for review by our legal team.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Data Privacy Breach - Company XYZ 2024"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">Minimum 10 characters</p>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a category</option>
                <option value="Data Privacy">Data Privacy</option>
                <option value="Labor Rights">Labor Rights</option>
                <option value="Consumer Protection">Consumer Protection</option>
                <option value="Environmental">Environmental</option>
                <option value="Securities Fraud">Securities Fraud</option>
                <option value="Product Liability">Product Liability</option>
                <option value="Other">Other</option>
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
              )}
            </div>

            <div>
              <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
                Summary *
              </label>
              <textarea
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                rows={8}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  errors.summary ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe the case, the harm caused, and who is affected..."
              />
              {errors.summary && (
                <p className="mt-1 text-sm text-red-600">{errors.summary}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">Minimum 50 characters. Be detailed and specific.</p>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Possible Jurisdiction</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="jurisdiction" className="block text-sm font-medium text-gray-700 mb-1">
                    Jurisdiction *
                  </label>
                  <input
                    type="text"
                    id="jurisdiction"
                    name="jurisdiction"
                    value={formData.jurisdiction}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.jurisdiction ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., California, United States"
                  />
                  {errors.jurisdiction && (
                    <p className="mt-1 text-sm text-red-600">{errors.jurisdiction}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="jurisdictionReason" className="block text-sm font-medium text-gray-700 mb-1">
                    Explanation Why *
                  </label>
                  <textarea
                    id="jurisdictionReason"
                    name="jurisdictionReason"
                    value={formData.jurisdictionReason}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.jurisdictionReason ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Explain why this jurisdiction is appropriate for this case..."
                  />
                  {errors.jurisdictionReason && (
                    <p className="mt-1 text-sm text-red-600">{errors.jurisdictionReason}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">Minimum 20 characters</p>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="desiredOutcome" className="block text-sm font-medium text-gray-700 mb-1">
                Desired Outcome *
              </label>
              <textarea
                id="desiredOutcome"
                name="desiredOutcome"
                value={formData.desiredOutcome}
                onChange={handleChange}
                rows={4}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  errors.desiredOutcome ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="What relief or outcome are you seeking from this lawsuit? (e.g., monetary compensation, injunctive relief, policy changes...)"
              />
              {errors.desiredOutcome && (
                <p className="mt-1 text-sm text-red-600">{errors.desiredOutcome}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">Minimum 20 characters. Describe the specific relief sought.</p>
            </div>

            <div>
              <label htmlFor="goalCents" className="block text-sm font-medium text-gray-700 mb-1">
                Funding Goal *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  id="goalCents"
                  name="goalCents"
                  min="5000"
                  step="100"
                  value={formData.goalCents}
                  onChange={handleChange}
                  className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    errors.goalCents ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="50000"
                />
              </div>
              {errors.goalCents && (
                <p className="mt-1 text-sm text-red-600">{errors.goalCents}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">Minimum $5,000. Total amount needed for legal costs.</p>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Law Firms</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="firmsWanted" className="block text-sm font-medium text-gray-700 mb-1">
                    Firms Wanted by You
                  </label>
                  <input
                    type="text"
                    id="firmsWanted"
                    name="firmsWanted"
                    value={formData.firmsWanted}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="e.g., Smith & Associates, Johnson Law Group"
                  />
                  <p className="mt-1 text-xs text-gray-500">List law firms you'd prefer to work with (optional)</p>
                </div>

                <div>
                  <label htmlFor="firmsInterested" className="block text-sm font-medium text-gray-700 mb-1">
                    Firms That Are Interested
                  </label>
                  <input
                    type="text"
                    id="firmsInterested"
                    name="firmsInterested"
                    value={formData.firmsInterested}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="e.g., Williams Legal, Davis & Partners"
                  />
                  <p className="mt-1 text-xs text-gray-500">Firms that have expressed interest (optional)</p>
                </div>

                <div>
                  <label htmlFor="firmsCommitted" className="block text-sm font-medium text-gray-700 mb-1">
                    Firms That Will Take On If Chosen
                  </label>
                  <input
                    type="text"
                    id="firmsCommitted"
                    name="firmsCommitted"
                    value={formData.firmsCommitted}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="e.g., Brown Legal Services"
                  />
                  <p className="mt-1 text-xs text-gray-500">Firms committed to taking the case if selected (optional)</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
              <p className="text-sm text-gray-600 mb-4">Choose which updates you'd like to receive throughout the process:</p>
              
              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <span className="text-sm font-medium text-gray-700">Funding goal met</span>
                  <button
                    type="button"
                    onClick={() => handleNotificationToggle('fundingGoalMet')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.fundingGoalMet ? 'bg-indigo-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.fundingGoalMet ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </label>

                <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <span className="text-sm font-medium text-gray-700">Firm(s) retained</span>
                  <button
                    type="button"
                    onClick={() => handleNotificationToggle('firmsRetained')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.firmsRetained ? 'bg-indigo-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.firmsRetained ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </label>

                <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <span className="text-sm font-medium text-gray-700">Legal filing made</span>
                  <button
                    type="button"
                    onClick={() => handleNotificationToggle('legalFilingMade')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.legalFilingMade ? 'bg-indigo-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.legalFilingMade ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </label>

                <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <span className="text-sm font-medium text-gray-700">Outcome achieved</span>
                  <button
                    type="button"
                    onClick={() => handleNotificationToggle('outcomeAchieved')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.outcomeAchieved ? 'bg-indigo-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.outcomeAchieved ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </label>

                <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <span className="text-sm font-medium text-gray-700">Milestone updates</span>
                  <button
                    type="button"
                    onClick={() => handleNotificationToggle('milestoneUpdates')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.milestoneUpdates ? 'bg-indigo-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.milestoneUpdates ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </label>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>
            </div>

            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-800">{errors.submit}</p>
              </div>
            )}

            {successMessage && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-800">{successMessage}</p>
                <p className="text-sm text-green-700 mt-1">Redirecting to proposed cases...</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Case for Review'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Slide {
  title: string;
  description: string;
  features: string[];
  path: string;
  actionLabel: string;
}

const userSlides: Slide[] = [
  {
    title: 'Browse Active Cases',
    description: 'Explore class action lawsuits that are currently seeking funding. Each case shows the funding progress, category, and key details about the legal action.',
    features: [
      'View all live cases with funding goals',
      'See real-time funding progress percentages',
      'Filter by category (Data Privacy, Labor Rights, Consumer Protection)',
      'Quick access to case details and pledge options',
    ],
    path: '/cases',
    actionLabel: 'Explore Cases',
  },
  {
    title: 'Case Details & Pledging',
    description: 'Dive deep into any case to understand the legal basis, affected parties, and how your pledge helps. Make secure pledges starting from just $10.',
    features: [
      'Full case narrative and legal background',
      'Transparent funding breakdown',
      'Simple pledge form with email confirmation',
      'Track your contribution to justice',
    ],
    path: '/cases',
    actionLabel: 'View a Case',
  },
  {
    title: 'Proposed Cases',
    description: 'See cases that have been submitted and are awaiting review. These represent potential class actions that may become active campaigns.',
    features: [
      'View submissions under manual review',
      'Understand the approval process',
      'See what types of cases are being proposed',
      'Learn from examples before submitting your own',
    ],
    path: '/proposed',
    actionLabel: 'See Proposed Cases',
  },
  {
    title: 'Submit Your Case',
    description: 'Have you been wronged? Submit your case proposal for review. Our team evaluates each submission to ensure it meets legal and ethical standards.',
    features: [
      'Step-by-step submission form',
      'Add jurisdiction and legal context',
      'Specify desired outcome and funding goal',
      'Choose notification preferences for updates',
    ],
    path: '/submit',
    actionLabel: 'Submit a Case',
  },
  {
    title: 'Approved Concepts',
    description: 'Browse case concepts that have been approved for community discussion. Join conversations, share evidence, and connect with others affected.',
    features: [
      'Discussion walls for each concept',
      'Connect with fellow affected parties',
      'See interested service providers',
      'Build community before funding begins',
    ],
    path: '/concepts',
    actionLabel: 'Browse Concepts',
  },
  {
    title: 'How It Works',
    description: 'New to crowdfunded class actions? Learn about the entire process from submission to settlement, and understand how your participation makes a difference.',
    features: [
      '4-step process explanation',
      'Understanding funding mechanics',
      'What happens after funding succeeds',
      'Your rights and protections',
    ],
    path: '/how-it-works',
    actionLabel: 'Learn More',
  },
];

const adminSlides: Slide[] = [
  {
    title: 'Admin Dashboard Overview',
    description: 'The central hub for managing all case submissions. Administrators can review, approve, or reject cases with full audit trails.',
    features: [
      'Tab-based filtering (Pending/Approved/Rejected)',
      'Real-time submission queue',
      'Status indicators for quick scanning',
      'Direct access to case details',
    ],
    path: '/admin',
    actionLabel: 'Open Dashboard',
  },
  {
    title: 'Review Guidelines',
    description: 'Every submission is manually reviewed against clear criteria to ensure quality and legitimacy. Admins follow a consistent review process.',
    features: [
      'Legal basis verification checklist',
      'Evidence requirement guidelines',
      'Jurisdiction validation steps',
      'Fraud prevention checks',
    ],
    path: '/admin',
    actionLabel: 'View Guidelines',
  },
  {
    title: 'Approval Process',
    description: 'When a case meets all criteria, admins can approve it with a confirmation dialog. Approved cases move to the concepts stage for community building.',
    features: [
      'Confirmation dialog prevents accidents',
      'One-click approval workflow',
      'Automatic status updates',
      'Submitter notification triggers',
    ],
    path: '/admin',
    actionLabel: 'See Approval Flow',
  },
  {
    title: 'Rejection Workflow',
    description: 'Cases that don\'t meet criteria must be rejected with a reason. This ensures transparency and helps submitters understand how to improve.',
    features: [
      'Required rejection reason field',
      'Constructive feedback guidelines',
      'Rejection reason stored with case',
      'Submitter receives explanation',
    ],
    path: '/admin',
    actionLabel: 'See Rejection Flow',
  },
  {
    title: 'Service Provider Management',
    description: 'Manage law firms, investigators, forensics experts, and security consultants who can assist with cases. Each provider goes through approval.',
    features: [
      '5 provider categories supported',
      'Provider approval workflow',
      'Match providers to relevant concepts',
      'Track provider interest and commitments',
    ],
    path: '/admin',
    actionLabel: 'Manage Providers',
  },
];

function Slideshow({ slides, title, accentColor }: { slides: Slide[]; title: string; accentColor: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slide = slides[currentIndex];

  const goNext = () => setCurrentIndex((i) => (i + 1) % slides.length);
  const goPrev = () => setCurrentIndex((i) => (i - 1 + slides.length) % slides.length);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className={`${accentColor} text-white px-6 py-4`}>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm opacity-90">Slide {currentIndex + 1} of {slides.length}</p>
      </div>
      
      <div className="p-6">
        <div className="min-h-[300px]">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">{slide.title}</h3>
          <p className="text-gray-600 mb-6">{slide.description}</p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-gray-800 mb-3">Key Features:</h4>
            <ul className="space-y-2">
              {slide.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className={`${accentColor.replace('bg-', 'text-')} mt-1`}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href={slide.path}
            className={`inline-block ${accentColor} text-white px-6 py-2 rounded-lg hover:opacity-90 transition font-medium`}
          >
            {slide.actionLabel} →
          </Link>
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t">
          <button
            onClick={goPrev}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>

          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition ${
                  idx === currentIndex ? accentColor : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            Next
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SlideshowsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Platform Feature Demos</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore all the features available on ClassAction. Use the slideshows below to learn about user and admin capabilities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Slideshow
            slides={userSlides}
            title="User Features"
            accentColor="bg-indigo-600"
          />
          <Slideshow
            slides={adminSlides}
            title="Admin Features"
            accentColor="bg-purple-600"
          />
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Case, Pledge, CaseSubmission, ServiceProvider, ServiceProviderType, Concept, ChatMessage } from '@/types';

interface AppContextType {
  cases: Case[];
  pledges: Pledge[];
  submissions: CaseSubmission[];
  providers: ServiceProvider[];
  concepts: Concept[];
  addPledge: (pledge: Omit<Pledge, 'id' | 'createdAt' | 'status'>) => { success: boolean; message: string };
  addSubmission: (submission: Omit<CaseSubmission, 'id' | 'createdAt' | 'status'>) => { success: boolean; message: string };
  approveSubmission: (id: string) => void;
  rejectSubmission: (id: string, reason: string) => void;
  addProvider: (provider: Omit<ServiceProvider, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => { success: boolean; message: string };
  approveProvider: (id: string) => void;
  rejectProvider: (id: string, reason: string) => void;
  addChatMessage: (conceptId: string, userName: string, message: string) => { success: boolean; message: string };
  getConceptBySlug: (slug: string) => Concept | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// 3 Example Cases Pre-populated
const initialCases: Case[] = [
  {
    id: '1',
    slug: 'data-privacy-breach-socialcorp-2024',
    title: 'Data Privacy Breach - SocialCorp 2024',
    narrative: 'In March 2024, SocialCorp Inc., a major social media platform, suffered a massive data breach affecting over 2 million users. Personal information including names, email addresses, phone numbers, and private messages were exposed due to inadequate security measures. Despite knowing about the vulnerability for months, the company failed to act, putting millions at risk of identity theft and fraud. We are seeking damages for affected users and demanding stronger data protection standards.',
    jurisdiction: 'California, United States',
    goalCents: 10000000, // $100,000
    raisedCents: 4500000, // $45,000
    status: 'LIVE',
    visibility: 'PUBLIC',
    category: 'Data Privacy',
    imageUrl: '/api/placeholder/800/400',
    createdAt: new Date('2024-09-01'),
    updatedAt: new Date('2024-10-20'),
    budgets: [
      { id: 'b1', label: 'Legal Filing Fees', amountCents: 2500000 },
      { id: 'b2', label: 'Expert Witness Testimony', amountCents: 3500000 },
      { id: 'b3', label: 'Document Discovery', amountCents: 2000000 },
      { id: 'b4', label: 'Legal Representation', amountCents: 2000000 },
    ],
    updates: [
      {
        id: 'u1',
        title: 'Case Filed Successfully',
        body: 'We have officially filed the class action lawsuit in the Northern District of California. The case number is 3:24-cv-12345.',
        createdAt: new Date('2024-09-15'),
      },
      {
        id: 'u2',
        title: 'Discovery Phase Begins',
        body: 'We\'ve entered the discovery phase and are requesting internal documents from SocialCorp regarding their security practices.',
        createdAt: new Date('2024-10-10'),
      },
    ],
  },
  {
    id: '2',
    slug: 'worker-misclassification-gigdelivery',
    title: 'Worker Misclassification - GigDelivery Inc',
    narrative: 'GigDelivery Inc. has systematically misclassified thousands of delivery drivers as independent contractors rather than employees. This misclassification denies workers essential benefits including minimum wage guarantees, overtime pay, health insurance, paid sick leave, and workers\' compensation. Drivers are forced to work long hours without protections while the company profits from their labor. We\'re fighting to secure proper classification, back pay, and benefits for all affected drivers.',
    jurisdiction: 'New York, United States',
    goalCents: 15000000, // $150,000
    raisedCents: 7850000, // $78,500
    status: 'LIVE',
    visibility: 'PUBLIC',
    category: 'Labor Rights',
    imageUrl: '/api/placeholder/800/400',
    createdAt: new Date('2024-08-15'),
    updatedAt: new Date('2024-10-21'),
    budgets: [
      { id: 'b5', label: 'Economic Analysis', amountCents: 3000000 },
      { id: 'b6', label: 'Legal Filing & Court Fees', amountCents: 3500000 },
      { id: 'b7', label: 'Class Certification', amountCents: 4000000 },
      { id: 'b8', label: 'Trial Preparation', amountCents: 4500000 },
    ],
    updates: [
      {
        id: 'u3',
        title: 'Over 500 Drivers Join Class',
        body: 'We\'ve received strong support from drivers across the tri-state area. Over 500 current and former drivers have joined the class action.',
        createdAt: new Date('2024-09-01'),
      },
      {
        id: 'u4',
        title: 'Company Responds to Complaint',
        body: 'GigDelivery has filed their response. We\'re preparing our rebuttal and gathering additional evidence of misclassification.',
        createdAt: new Date('2024-10-05'),
      },
    ],
  },
  {
    id: '3',
    slug: 'false-advertising-healthsupreme-vitamins',
    title: 'False Advertising - HealthSupreme Vitamins',
    narrative: 'HealthSupreme has been marketing their "Miracle Immunity Boost" vitamins with false and misleading health claims, including promises to "prevent COVID-19" and "cure chronic diseases." These claims are not supported by scientific evidence and violate FDA regulations. Thousands of consumers spent hundreds of dollars on these products based on deceptive marketing. We\'re seeking refunds for affected consumers and demanding the company cease making unsubstantiated health claims.',
    jurisdiction: 'Texas, United States',
    goalCents: 8000000, // $80,000
    raisedCents: 0, // Proposed, not yet funded
    status: 'REVIEW',
    visibility: 'PUBLIC',
    category: 'Consumer Protection',
    imageUrl: '/api/placeholder/800/400',
    createdAt: new Date('2024-10-01'),
    updatedAt: new Date('2024-10-15'),
    budgets: [
      { id: 'b9', label: 'Scientific Expert Analysis', amountCents: 2500000 },
      { id: 'b10', label: 'Advertising Documentation', amountCents: 1500000 },
      { id: 'b11', label: 'Legal Filing Fees', amountCents: 2000000 },
      { id: 'b12', label: 'Class Notification', amountCents: 2000000 },
    ],
    updates: [],
  },
];

const initialProviders: ServiceProvider[] = [
  {
    id: 'provider-1',
    name: 'Smith & Associates Law Firm',
    type: 'law_firm',
    email: 'contact@smithlaw.example.com',
    phone: '(555) 123-4567',
    website: 'https://smithlaw.example.com',
    description: 'Experienced class action law firm specializing in consumer protection and data privacy cases. Over 20 years of experience with multi-million dollar settlements.',
    specialties: ['Consumer Protection', 'Data Privacy', 'Securities Fraud'],
    jurisdictions: ['California', 'New York', 'Texas', 'Federal Courts'],
    status: 'approved',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'provider-2',
    name: 'TechForensics Inc',
    type: 'it_forensics',
    email: 'info@techforensics.example.com',
    description: 'Digital forensics experts specializing in data breach analysis, electronic discovery, and cybersecurity investigations.',
    specialties: ['Data Breach Analysis', 'E-Discovery', 'Malware Analysis'],
    jurisdictions: ['Nationwide'],
    status: 'approved',
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-20'),
  },
  {
    id: 'provider-3',
    name: 'Guardian Investigations',
    type: 'private_investigator',
    email: 'inquiries@guardianinv.example.com',
    description: 'Licensed private investigation firm with expertise in corporate fraud, asset tracing, and witness location services.',
    specialties: ['Corporate Fraud', 'Asset Tracing', 'Background Checks'],
    jurisdictions: ['California', 'Nevada', 'Arizona'],
    status: 'pending',
    createdAt: new Date('2024-10-01'),
    updatedAt: new Date('2024-10-01'),
  },
];

// 2 Approved Concepts Pre-populated
const initialConcepts: Concept[] = [
  {
    id: 'concept-1',
    slug: 'metacritic-review-manipulation',
    title: 'Metacritic Review Manipulation & Consumer Fraud',
    summary: 'Investigating potential manipulation of game and media reviews on Metacritic, where publishers may be paying for favorable scores or suppressing negative reviews. This affects consumer purchasing decisions and constitutes potential false advertising and unfair business practices.',
    category: 'Consumer Protection',
    status: 'approved',
    createdBy: 'Platform Admin',
    createdByEmail: 'admin@classaction.example.com',
    chatMessages: [
      {
        id: 'msg-1',
        conceptId: 'concept-1',
        userId: 'user-1',
        userName: 'GameConsumer2024',
        message: 'I\'ve noticed several games with suspiciously high scores despite overwhelmingly negative user reviews. There seems to be a pattern here.',
        createdAt: new Date('2024-11-01'),
      },
      {
        id: 'msg-2',
        conceptId: 'concept-1',
        userId: 'user-2',
        userName: 'IndustryWatcher',
        message: 'Former reviewer here. I can confirm there\'s pressure from publishers. Would be willing to provide testimony.',
        createdAt: new Date('2024-11-02'),
      },
    ],
    contracts: [],
    interestedProviders: ['provider-1'],
    createdAt: new Date('2024-10-15'),
    updatedAt: new Date('2024-11-02'),
  },
  {
    id: 'concept-2',
    slug: 'kadnea-kaddex-rug-pull',
    title: 'Kadena/Kaddex Token Decline - Directors\' Irresponsible Behavior',
    summary: 'Class action for those who lost money due to the token decline caused by Kadena\'s directors\' irresponsible behavior. Kaddex (formerly associated with the Kadena blockchain ecosystem) is organizing affected investors to seek recovery. If you invested and suffered losses, join the discussion to document your experience and connect with others impacted.',
    category: 'Securities Fraud',
    status: 'approved',
    createdBy: 'Kaddex Community',
    createdByEmail: 'community@classaction.example.com',
    chatMessages: [
      {
        id: 'msg-3',
        conceptId: 'concept-2',
        userId: 'user-3',
        userName: 'KaddexOfficial',
        message: 'If you are interested in joining our class action against Kadena, please comment below. We\'ll be reaching out individually to everyone who lost money due to the token decline and Kadena\'s directors\' irresponsible behavior.',
        createdAt: new Date('2025-01-15'),
      },
      {
        id: 'msg-4',
        conceptId: 'concept-2',
        userId: 'user-4',
        userName: 'TokenHolder2023',
        message: 'I invested in KDA back in 2022 based on the team\'s roadmap promises. The token has lost significant value and the leadership seems to have abandoned key commitments. Count me in.',
        createdAt: new Date('2025-01-16'),
      },
      {
        id: 'msg-5',
        conceptId: 'concept-2',
        userId: 'user-5',
        userName: 'CryptoLegalWatch',
        message: 'Important to document: purchase dates, amounts invested, specific promises made by directors, and any communication from the team. This will be critical evidence.',
        createdAt: new Date('2025-01-17'),
      },
      {
        id: 'msg-6',
        conceptId: 'concept-2',
        userId: 'user-6',
        userName: 'AffectedInvestor',
        message: 'Lost a substantial amount when the token declined. The directors made specific claims about utility and adoption that never materialized. Ready to provide my transaction records.',
        createdAt: new Date('2025-01-18'),
      },
    ],
    contracts: [],
    interestedProviders: ['provider-1', 'provider-2'],
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-18'),
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [cases, setCases] = useState<Case[]>(initialCases);
  const [pledges, setPledges] = useState<Pledge[]>([]);
  const [submissions, setSubmissions] = useState<CaseSubmission[]>([]);
  const [providers, setProviders] = useState<ServiceProvider[]>(initialProviders);
  const [concepts, setConcepts] = useState<Concept[]>(initialConcepts);

  const addPledge = (pledge: Omit<Pledge, 'id' | 'createdAt' | 'status'>) => {
    // Validation
    if (!pledge.email || !pledge.email.includes('@')) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    if (pledge.amountCents < 1000) { // Minimum $10
      return { success: false, message: 'Minimum pledge amount is $10.00' };
    }
    if (!pledge.name || pledge.name.trim().length < 2) {
      return { success: false, message: 'Please enter your full name.' };
    }

    const newPledge: Pledge = {
      ...pledge,
      id: `pledge-${Date.now()}`,
      status: 'SUCCEEDED',
      createdAt: new Date(),
    };

    setPledges(prev => [...prev, newPledge]);
    
    // Update case raised amount
    setCases(prev => prev.map(c => 
      c.id === pledge.caseId 
        ? { ...c, raisedCents: c.raisedCents + pledge.amountCents }
        : c
    ));

    return { success: true, message: 'Thank you! Your pledge has been recorded.' };
  };

  const addSubmission = (submission: Omit<CaseSubmission, 'id' | 'createdAt' | 'status'>) => {
    // Validation
    if (!submission.title || submission.title.trim().length < 10) {
      return { success: false, message: 'Case title must be at least 10 characters.' };
    }
    if (!submission.narrative || submission.narrative.trim().length < 50) {
      return { success: false, message: 'Case narrative must be at least 50 characters.' };
    }
    if (!submission.email || !submission.email.includes('@')) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    if (!submission.jurisdiction || submission.jurisdiction.trim().length < 3) {
      return { success: false, message: 'Please enter a jurisdiction.' };
    }
    if (submission.goalCents < 500000) { // Minimum $5,000
      return { success: false, message: 'Funding goal must be at least $5,000' };
    }

    const newSubmission: CaseSubmission = {
      ...submission,
      id: `submission-${Date.now()}`,
      status: 'pending',
      createdAt: new Date(),
    };

    setSubmissions(prev => [...prev, newSubmission]);
    return { success: true, message: 'Your case has been submitted for admin review!' };
  };

  const approveSubmission = (id: string) => {
    const submission = submissions.find(s => s.id === id);
    if (!submission) return;

    // Create new case from submission
    const newCase: Case = {
      id: `case-${Date.now()}`,
      slug: submission.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: submission.title,
      narrative: submission.narrative,
      jurisdiction: submission.jurisdiction,
      goalCents: submission.goalCents,
      raisedCents: 0,
      status: 'LIVE',
      visibility: 'PUBLIC',
      category: submission.category || 'Other',
      createdAt: new Date(),
      updatedAt: new Date(),
      budgets: [],
      updates: [],
    };

    setCases(prev => [...prev, newCase]);
    setSubmissions(prev => prev.map(s => 
      s.id === id ? { ...s, status: 'approved' as const } : s
    ));
  };

  const rejectSubmission = (id: string, reason: string) => {
    setSubmissions(prev => prev.map(s => 
      s.id === id ? { ...s, status: 'rejected' as const, rejectionReason: reason } : s
    ));
  };

  const addProvider = (provider: Omit<ServiceProvider, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    if (!provider.name || provider.name.trim().length < 3) {
      return { success: false, message: 'Provider name must be at least 3 characters.' };
    }
    if (!provider.email || !provider.email.includes('@')) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    if (!provider.description || provider.description.trim().length < 20) {
      return { success: false, message: 'Description must be at least 20 characters.' };
    }

    const newProvider: ServiceProvider = {
      ...provider,
      id: `provider-${Date.now()}`,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setProviders(prev => [...prev, newProvider]);
    return { success: true, message: 'Your registration has been submitted for admin review!' };
  };

  const approveProvider = (id: string) => {
    setProviders(prev => prev.map(p => 
      p.id === id ? { ...p, status: 'approved' as const, updatedAt: new Date() } : p
    ));
  };

  const rejectProvider = (id: string, reason: string) => {
    setProviders(prev => prev.map(p => 
      p.id === id ? { ...p, status: 'rejected' as const, rejectionReason: reason, updatedAt: new Date() } : p
    ));
  };

  const addChatMessage = (conceptId: string, userName: string, message: string) => {
    if (!userName || userName.trim().length < 2) {
      return { success: false, message: 'Please enter your name.' };
    }
    if (!message || message.trim().length < 3) {
      return { success: false, message: 'Message must be at least 3 characters.' };
    }

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      conceptId,
      userId: `user-${Date.now()}`,
      userName: userName.trim(),
      message: message.trim(),
      createdAt: new Date(),
    };

    setConcepts(prev => prev.map(c => 
      c.id === conceptId 
        ? { ...c, chatMessages: [...c.chatMessages, newMessage], updatedAt: new Date() }
        : c
    ));

    return { success: true, message: 'Message posted successfully!' };
  };

  const getConceptBySlug = (slug: string) => {
    return concepts.find(c => c.slug === slug);
  };

  return (
    <AppContext.Provider value={{
      cases,
      pledges,
      submissions,
      providers,
      concepts,
      addPledge,
      addSubmission,
      approveSubmission,
      rejectSubmission,
      addProvider,
      approveProvider,
      rejectProvider,
      addChatMessage,
      getConceptBySlug,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

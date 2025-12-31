export type CaseStatus = 'DRAFT' | 'REVIEW' | 'LIVE' | 'PAUSED' | 'CLOSED' | 'REJECTED';
export type Visibility = 'PUBLIC' | 'UNLISTED' | 'PRIVATE';
export type PledgeStatus = 'PENDING' | 'SUCCEEDED' | 'REFUNDED' | 'DISPUTED' | 'FAILED';

export type ServiceProviderType = 
  | 'law_firm'
  | 'private_investigator'
  | 'it_forensics'
  | 'physical_forensics'
  | 'security_consultant';

export type ProviderStatus = 'pending' | 'approved' | 'rejected' | 'suspended';

export interface ServiceProvider {
  id: string;
  name: string;
  type: ServiceProviderType;
  email: string;
  phone?: string;
  website?: string;
  description: string;
  specialties: string[];
  jurisdictions: string[];
  status: ProviderStatus;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const SERVICE_PROVIDER_LABELS: Record<ServiceProviderType, string> = {
  law_firm: 'Law Firm',
  private_investigator: 'Private Investigator',
  it_forensics: 'IT Forensics',
  physical_forensics: 'Physical Forensics',
  security_consultant: 'Security Consultant',
};

export type ConceptStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'active';

export interface ChatMessage {
  id: string;
  conceptId: string;
  userId: string;
  userName: string;
  message: string;
  createdAt: Date;
}

export interface Contract {
  id: string;
  conceptId: string;
  providerId: string;
  providerName: string;
  providerType: ServiceProviderType;
  title: string;
  description: string;
  terms: string;
  status: 'draft' | 'pending' | 'approved' | 'active' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface Concept {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  status: ConceptStatus;
  createdBy: string;
  createdByEmail: string;
  chatMessages: ChatMessage[];
  contracts: Contract[];
  interestedProviders: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Case {
  id: string;
  slug: string;
  title: string;
  narrative: string;
  jurisdiction: string;
  goalCents: number;
  raisedCents: number;
  status: CaseStatus;
  visibility: Visibility;
  category?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  budgets?: BudgetItem[];
  updates?: Update[];
}

export interface BudgetItem {
  id: string;
  label: string;
  amountCents: number;
}

export interface Update {
  id: string;
  title: string;
  body: string;
  createdAt: Date;
}

export interface Pledge {
  id: string;
  caseId: string;
  amountCents: number;
  email?: string;
  name?: string;
  status: PledgeStatus;
  createdAt: Date;
}

export interface CaseSubmission {
  id: string;
  title: string;
  narrative: string;
  jurisdiction: string;
  goalCents: number;
  category?: string;
  email: string;
  name: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  createdAt: Date;
}

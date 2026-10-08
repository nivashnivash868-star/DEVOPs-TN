export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  deliverables: string[];
  technologies: string[];
  icon: string;
}

export interface WhyUsPoint {
  step: string;
  title: string;
  description: string;
  detail: string;
  codeSnippet?: string;
  metric?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  activities: string[];
  outcome: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  tags: string[];
  clientType: string;
  timeline: string;
  architecture: string[];
  highlights: string[];
  challenge: string;
  solution: string;
  results: string[];
}

export interface TechCategory {
  category: string;
  description: string;
  items: {
    name: string;
    description: string;
    featured?: boolean;
    categoryBadge: string;
  }[];
}

export interface CapabilityStat {
  title: string;
  subtitle: string;
  description: string;
  metricHighlight: string;
  icon: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budget: string;
  description: string;
}

export type LeadStatus = 'New' | 'Contacted' | 'Proposal Sent' | 'In Progress' | 'Completed' | 'Archived';

export interface ProjectLead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string;
  budget: string;
  description: string;
  createdAt: string;
  status: LeadStatus;
  notes?: string;
  source: 'Contact Form' | 'Quote Modal' | 'Direct Email';
}

export type WorkPhase = 
  | 'Discovery & Planning' 
  | 'UI/UX Design' 
  | 'Development' 
  | 'Testing & QA' 
  | 'DevOps & Deployment' 
  | 'Completed & Handed Over';

export type WorkPriority = 'Critical' | 'High' | 'Medium' | 'Low';

export interface WorkTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface CompanyWorkItem {
  id: string;
  title: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  clientCompany?: string;
  projectType: string;
  contractValue: string;
  phase: WorkPhase;
  priority: WorkPriority;
  progressPercent: number;
  startDate: string;
  targetDeliveryDate: string;
  techStack: string[];
  tasks: WorkTask[];
  notes?: string;
  repoUrl?: string;
  liveUrl?: string;
}


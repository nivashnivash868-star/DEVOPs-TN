import { ProjectLead, LeadStatus } from '../types';
import { BRAND } from '../data/companyData';

const STORAGE_KEY = 'devopstn_leads';

const INITIAL_LEADS: ProjectLead[] = [
  {
    id: 'lead-1001',
    name: 'Karthik Raja',
    email: 'karthik.raja@techstartup.in',
    phone: '+91 98401 23456',
    company: 'FinTrack Analytics',
    projectType: 'Web Application',
    budget: '₹20,000 – ₹30,000',
    description: 'Looking to build a real-time expense and invoicing dashboard with FastAPI backend, React frontend, and PostgreSQL database. Need role-based access for 10 users.',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    status: 'New',
    source: 'Contact Form',
    notes: 'Needs demo within 2 weeks. Interested in Docker deployment.'
  },
  {
    id: 'lead-1002',
    name: 'Dr. S. Meenakshi',
    email: 'hod.cse@enggcollege.edu.in',
    phone: '+91 94432 10987',
    company: 'Engineering College TN',
    projectType: 'DevOps / Cloud',
    budget: '₹15,000 – ₹20,000',
    description: 'Need CI/CD automation pipeline setup on AWS using GitHub Actions and Docker for our student project portal and serverless API gateway.',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    status: 'Contacted',
    source: 'Quote Modal',
    notes: 'Initial scope discussed. Preparing architecture diagram.'
  },
  {
    id: 'lead-1003',
    name: 'Venkatesh Babu',
    email: 'venkat@chennailogistics.com',
    phone: '+91 97890 54321',
    company: 'Chennai Express Logistics',
    projectType: 'AI / Automation',
    budget: '₹20,000 – ₹30,000',
    description: 'Require automated document data extraction from bills of lading & invoices using Python, OCR and OpenAI API with webhook alerts.',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    status: 'Proposal Sent',
    source: 'Contact Form',
    notes: 'Sent formal proposal with milestone pricing.'
  }
];

export const getStoredLeads = (): ProjectLead[] => {
  if (typeof window === 'undefined') return INITIAL_LEADS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_LEADS));
      return INITIAL_LEADS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse stored leads:', e);
    return INITIAL_LEADS;
  }
};

export const saveStoredLeads = (leads: ProjectLead[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  } catch (e) {
    console.error('Failed to save leads to localStorage:', e);
  }
};

export const addLead = (leadInput: Omit<ProjectLead, 'id' | 'createdAt' | 'status'>): ProjectLead => {
  const currentLeads = getStoredLeads();
  const newLead: ProjectLead = {
    ...leadInput,
    id: `lead-${Date.now().toString().slice(-4)}`,
    createdAt: new Date().toISOString(),
    status: 'New'
  };

  const updated = [newLead, ...currentLeads];
  saveStoredLeads(updated);

  // Dispatch custom window event so any open portal updates in real time
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('devopstn_lead_added', { detail: newLead }));
  }

  return newLead;
};

export const updateLeadStatus = (id: string, status: LeadStatus): ProjectLead[] => {
  const current = getStoredLeads();
  const updated = current.map((lead) => (lead.id === id ? { ...lead, status } : lead));
  saveStoredLeads(updated);
  return updated;
};

export const updateLeadNotes = (id: string, notes: string): ProjectLead[] => {
  const current = getStoredLeads();
  const updated = current.map((lead) => (lead.id === id ? { ...lead, notes } : lead));
  saveStoredLeads(updated);
  return updated;
};

export const deleteLead = (id: string): ProjectLead[] => {
  const current = getStoredLeads();
  const updated = current.filter((lead) => lead.id !== id);
  saveStoredLeads(updated);
  return updated;
};

export const generateEmailNotificationUrl = (lead: ProjectLead): string => {
  const subject = encodeURIComponent(`[DEVOPS TN Lead] New ${lead.projectType} Request - ${lead.name}`);
  const body = encodeURIComponent(
`NEW PROJECT REQUEST - DEVOPS TN
==================================================
Client Name    : ${lead.name}
Email          : ${lead.email}
Phone          : ${lead.phone || 'Not provided'}
Company        : ${lead.company || 'Not provided'}
Project Type   : ${lead.projectType}
Budget Range   : ${lead.budget}
Submitted At   : ${new Date(lead.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
Source Channel : ${lead.source}

Project Description & Scope:
--------------------------------------------------
${lead.description}
==================================================
DEVOPS TN • Build. Deploy. Scale.
Official Company Email: ${BRAND.contactEmail}
Company Phone: ${BRAND.contactPhone}
`
  );

  return `mailto:${BRAND.contactEmail}?subject=${subject}&body=${body}`;
};

export const generateClientReplyUrl = (lead: ProjectLead): string => {
  const subject = encodeURIComponent(`Regarding Your DevOps TN Project Request: ${lead.projectType}`);
  const body = encodeURIComponent(
`Dear ${lead.name},

Thank you for reaching out to DEVOPS TN regarding your ${lead.projectType} project.

We have reviewed your preliminary requirements:
"${lead.description.slice(0, 120)}..."

We would love to schedule a brief 15-minute technical discovery call to discuss your architecture, milestone timeline, and budget estimate (${lead.budget}).

Please let us know your availability.

Best regards,

DEVOPS TN Engineering Team
Email: ${BRAND.contactEmail}
Phone / WhatsApp: ${BRAND.contactPhone}
Location: ${BRAND.location}
Website: https://devopstn.com
`
  );

  return `mailto:${lead.email}?cc=${BRAND.contactEmail}&subject=${subject}&body=${body}`;
};

import { CompanyWorkItem, WorkPhase } from '../types';

const WORK_STORAGE_KEY = 'devopstn_work_orders';

const INITIAL_WORK_ITEMS: CompanyWorkItem[] = [
  {
    id: 'work-201',
    title: 'FinTrack SaaS Expense & Invoicing Portal',
    clientName: 'Karthik Raja',
    clientEmail: 'karthik.raja@techstartup.in',
    clientPhone: '+91 98401 23456',
    clientCompany: 'FinTrack Analytics',
    projectType: 'Web Application',
    contractValue: '₹28,000',
    phase: 'Development',
    priority: 'High',
    progressPercent: 65,
    startDate: '2026-10-01',
    targetDeliveryDate: '2026-10-24',
    techStack: ['React', 'FastAPI', 'PostgreSQL', 'Docker', 'Tailwind CSS'],
    tasks: [
      { id: 't1', title: 'Database schema & migration scripts design', completed: true },
      { id: 't2', title: 'JWT Authentication & role-based middleware', completed: true },
      { id: 't3', title: 'Real-time billing dashboard & charts frontend', completed: true },
      { id: 't4', title: 'Automated invoice PDF generation module', completed: false },
      { id: 't5', title: 'Docker containerization & staging deployment', completed: false }
    ],
    notes: 'Sprint 2 in progress. Demo scheduled for Oct 20th.',
    repoUrl: 'https://github.com/nivashnivash868-star/fintrack-portal',
    liveUrl: 'https://fintrack-staging.devopstn.app'
  },
  {
    id: 'work-202',
    title: 'Automated Cloud CI/CD Pipeline & Containerization',
    clientName: 'Dr. S. Meenakshi',
    clientEmail: 'hod.cse@enggcollege.edu.in',
    clientPhone: '+91 94432 10987',
    clientCompany: 'Engineering College TN',
    projectType: 'DevOps / Cloud',
    contractValue: '₹18,500',
    phase: 'DevOps & Deployment',
    priority: 'Critical',
    progressPercent: 85,
    startDate: '2026-09-28',
    targetDeliveryDate: '2026-10-16',
    techStack: ['GitHub Actions', 'Docker', 'AWS ECS', 'Nginx', 'SSL/TLS'],
    tasks: [
      { id: 't1', title: 'Multi-stage Dockerfile optimization for student portal', completed: true },
      { id: 't2', title: 'GitHub Actions workflow for automated test & linting', completed: true },
      { id: 't3', title: 'AWS ECS Fargate task definitions & load balancer setup', completed: true },
      { id: 't4', title: 'Automated SSL cert renewal & zero-downtime rollback', completed: true },
      { id: 't5', title: 'Faculty & admin walkthrough documentation', completed: false }
    ],
    notes: 'Production pipeline verified. Preparing training document.',
    repoUrl: 'https://github.com/nivashnivash868-star/college-cicd-infra'
  },
  {
    id: 'work-203',
    title: 'AI Smart Document OCR & Logistics Parser',
    clientName: 'Venkatesh Babu',
    clientEmail: 'venkat@chennailogistics.com',
    clientPhone: '+91 97890 54321',
    clientCompany: 'Chennai Express Logistics',
    projectType: 'AI / Automation',
    contractValue: '₹25,000',
    phase: 'UI/UX Design',
    priority: 'Medium',
    progressPercent: 35,
    startDate: '2026-10-05',
    targetDeliveryDate: '2026-11-02',
    techStack: ['Python', 'OpenAI API', 'FastAPI', 'Vite React', 'Redis'],
    tasks: [
      { id: 't1', title: 'Sample bill-of-lading dataset collection & analysis', completed: true },
      { id: 't2', title: 'OCR parsing prompt template & validation script', completed: true },
      { id: 't3', title: 'Interactive drag-and-drop batch upload UI', completed: false },
      { id: 't4', title: 'Webhook notification to client internal ERP', completed: false },
      { id: 't5', title: 'End-to-end benchmark & latency tuning', completed: false }
    ],
    notes: 'Client approved prompt test accuracy (99.2%). Building frontend layout.',
    repoUrl: 'https://github.com/nivashnivash868-star/logistics-ocr-ai'
  }
];

export const getStoredWork = (): CompanyWorkItem[] => {
  if (typeof window === 'undefined') return INITIAL_WORK_ITEMS;
  try {
    const raw = localStorage.getItem(WORK_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(WORK_STORAGE_KEY, JSON.stringify(INITIAL_WORK_ITEMS));
      return INITIAL_WORK_ITEMS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse work items:', e);
    return INITIAL_WORK_ITEMS;
  }
};

export const saveStoredWork = (items: CompanyWorkItem[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(WORK_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save work items:', e);
  }
};

export const addWorkItem = (itemInput: Omit<CompanyWorkItem, 'id'>): CompanyWorkItem => {
  const current = getStoredWork();
  const newItem: CompanyWorkItem = {
    ...itemInput,
    id: `work-${Date.now().toString().slice(-4)}`
  };
  const updated = [newItem, ...current];
  saveStoredWork(updated);
  return newItem;
};

export const updateWorkPhase = (id: string, phase: WorkPhase): CompanyWorkItem[] => {
  const current = getStoredWork();
  const updated = current.map((item) => {
    if (item.id !== id) return item;
    let progressPercent = item.progressPercent;
    if (phase === 'Completed & Handed Over') progressPercent = 100;
    else if (phase === 'Discovery & Planning') progressPercent = 15;
    else if (phase === 'UI/UX Design') progressPercent = 35;
    else if (phase === 'Development') progressPercent = 60;
    else if (phase === 'Testing & QA') progressPercent = 80;
    else if (phase === 'DevOps & Deployment') progressPercent = 90;
    return { ...item, phase, progressPercent };
  });
  saveStoredWork(updated);
  return updated;
};

export const updateWorkProgress = (id: string, progressPercent: number): CompanyWorkItem[] => {
  const current = getStoredWork();
  const updated = current.map((item) => (item.id === id ? { ...item, progressPercent } : item));
  saveStoredWork(updated);
  return updated;
};

export const toggleWorkTask = (workId: string, taskId: string): CompanyWorkItem[] => {
  const current = getStoredWork();
  const updated = current.map((item) => {
    if (item.id !== workId) return item;
    const tasks = item.tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t));
    const completedCount = tasks.filter((t) => t.completed).length;
    const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : item.progressPercent;
    return { ...item, tasks, progressPercent };
  });
  saveStoredWork(updated);
  return updated;
};

export const deleteWorkItem = (id: string): CompanyWorkItem[] => {
  const current = getStoredWork();
  const updated = current.filter((item) => item.id !== id);
  saveStoredWork(updated);
  return updated;
};

export const updateWorkNotes = (id: string, notes: string): CompanyWorkItem[] => {
  const current = getStoredWork();
  const updated = current.map((item) => (item.id === id ? { ...item, notes } : item));
  saveStoredWork(updated);
  return updated;
};

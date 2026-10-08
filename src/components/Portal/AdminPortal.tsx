import React, { useState, useEffect, useMemo } from 'react';
import { ProjectLead, LeadStatus, CompanyWorkItem, WorkPhase, WorkPriority } from '../../types';
import { BRAND, PROJECT_TYPES, BUDGET_RANGES } from '../../data/companyData';
import { 
  getStoredLeads, 
  updateLeadStatus, 
  updateLeadNotes, 
  deleteLead, 
  addLead,
  generateEmailNotificationUrl, 
  generateClientReplyUrl 
} from '../../services/leadService';
import {
  getStoredWork,
  addWorkItem,
  updateWorkPhase,
  toggleWorkTask,
  deleteWorkItem,
  updateWorkNotes
} from '../../services/workService';
import { Logo } from '../Logo';
import { useTheme } from '../../context/ThemeContext';
import {
  Inbox,
  Search,
  Filter,
  Download,
  Mail,
  Building,
  Trash2,
  Edit3,
  CheckCircle,
  Clock3,
  Send,
  Plus,
  X,
  Copy,
  Check,
  ArrowLeft,
  LogOut,
  Sun,
  Moon,
  TrendingUp,
  FileText,
  Briefcase,
  CheckSquare,
  Square,
  ExternalLink,
  Code2,
  Sparkles,
  AlertTriangle,
  FolderGit2
} from 'lucide-react';

interface AdminPortalProps {
  onBackToSite: () => void;
  onLogout: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBackToSite, onLogout }) => {
  // Navigation Tabs: 'requests' | 'work'
  const [activeTab, setActiveTab] = useState<'requests' | 'work'>('requests');

  // Leads State
  const [leads, setLeads] = useState<ProjectLead[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [selectedLead, setSelectedLead] = useState<ProjectLead | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [leadNoteDraft, setLeadNoteDraft] = useState('');

  // Work Orders State
  const [workItems, setWorkItems] = useState<CompanyWorkItem[]>([]);
  const [workSearchQuery, setWorkSearchQuery] = useState('');
  const [workPhaseFilter, setWorkPhaseFilter] = useState<string>('ALL');
  const [selectedWork, setSelectedWork] = useState<CompanyWorkItem | null>(null);
  const [isWorkDetailModalOpen, setIsWorkDetailModalOpen] = useState(false);
  const [isAddWorkModalOpen, setIsAddWorkModalOpen] = useState(false);
  const [workNoteDraft, setWorkNoteDraft] = useState('');

  const { theme, toggleTheme } = useTheme();

  // Manual Lead Form State
  const [newLeadData, setNewLeadData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: 'Web Application',
    budget: '₹10,000 – ₹15,000',
    description: '',
    notes: '',
    source: 'Direct Email' as const
  });

  // Manual Work Form State
  const [newWorkData, setNewWorkData] = useState({
    title: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientCompany: '',
    projectType: 'Web Application',
    contractValue: '₹20,000',
    phase: 'Discovery & Planning' as WorkPhase,
    priority: 'High' as WorkPriority,
    progressPercent: 15,
    startDate: new Date().toISOString().slice(0, 10),
    targetDeliveryDate: new Date(Date.now() + 86400000 * 20).toISOString().slice(0, 10),
    techStackStr: 'React, Node.js, PostgreSQL, Tailwind CSS',
    task1: 'Requirement analysis & architecture blueprint',
    task2: 'UI/UX mockups & wireframe approval',
    task3: 'Core business logic & API development',
    task4: 'CI/CD pipeline & container setup',
    notes: '',
    repoUrl: '',
    liveUrl: ''
  });

  // Load leads and work orders
  useEffect(() => {
    setLeads(getStoredLeads());
    setWorkItems(getStoredWork());

    const handleNewLead = () => {
      setLeads(getStoredLeads());
    };

    window.addEventListener('devopstn_lead_added', handleNewLead);
    return () => window.removeEventListener('devopstn_lead_added', handleNewLead);
  }, []);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch = 
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lead.company && lead.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
        lead.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.projectType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lead.phone && lead.phone.includes(searchQuery));

      const matchesStatus = statusFilter === 'ALL' || lead.status === statusFilter;
      const matchesType = typeFilter === 'ALL' || lead.projectType === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [leads, searchQuery, statusFilter, typeFilter]);

  // Filtered Work Items
  const filteredWorkItems = useMemo(() => {
    return workItems.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(workSearchQuery.toLowerCase()) ||
        item.clientName.toLowerCase().includes(workSearchQuery.toLowerCase()) ||
        item.clientEmail.toLowerCase().includes(workSearchQuery.toLowerCase()) ||
        (item.clientCompany && item.clientCompany.toLowerCase().includes(workSearchQuery.toLowerCase())) ||
        item.projectType.toLowerCase().includes(workSearchQuery.toLowerCase());

      const matchesPhase = workPhaseFilter === 'ALL' || item.phase === workPhaseFilter;
      return matchesSearch && matchesPhase;
    });
  }, [workItems, workSearchQuery, workPhaseFilter]);

  // Request Metrics
  const requestMetrics = useMemo(() => {
    const total = leads.length;
    const newCount = leads.filter((l) => l.status === 'New').length;
    const inProgressCount = leads.filter((l) => l.status === 'In Progress' || l.status === 'Proposal Sent' || l.status === 'Contacted').length;
    const completedCount = leads.filter((l) => l.status === 'Completed').length;
    return { total, newCount, inProgressCount, completedCount };
  }, [leads]);

  // Work Metrics
  const workMetrics = useMemo(() => {
    const total = workItems.length;
    const inDev = workItems.filter((w) => w.phase === 'Development' || w.phase === 'DevOps & Deployment' || w.phase === 'UI/UX Design').length;
    const completed = workItems.filter((w) => w.phase === 'Completed & Handed Over').length;
    const critical = workItems.filter((w) => w.priority === 'Critical' || w.priority === 'High').length;
    return { total, inDev, completed, critical };
  }, [workItems]);

  // Lead Status Change
  const handleLeadStatusChange = (id: string, newStatus: LeadStatus) => {
    const updated = updateLeadStatus(id, newStatus);
    setLeads(updated);
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  // Save Lead Notes
  const handleSaveLeadNotes = () => {
    if (!selectedLead) return;
    const updated = updateLeadNotes(selectedLead.id, leadNoteDraft);
    setLeads(updated);
    setSelectedLead({ ...selectedLead, notes: leadNoteDraft });
  };

  // Delete Lead
  const handleDeleteLead = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project request?')) {
      const updated = deleteLead(id);
      setLeads(updated);
      if (selectedLead && selectedLead.id === id) {
        setIsDetailModalOpen(false);
        setSelectedLead(null);
      }
    }
  };

  // Convert Lead to Work Order
  const handleConvertLeadToWork = (lead: ProjectLead) => {
    const newWork = addWorkItem({
      title: `${lead.name}'s ${lead.projectType} Build`,
      clientName: lead.name,
      clientEmail: lead.email,
      clientPhone: lead.phone,
      clientCompany: lead.company,
      projectType: lead.projectType,
      contractValue: lead.budget,
      phase: 'Discovery & Planning',
      priority: 'High',
      progressPercent: 15,
      startDate: new Date().toISOString().slice(0, 10),
      targetDeliveryDate: new Date(Date.now() + 86400000 * 21).toISOString().slice(0, 10),
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Docker'],
      tasks: [
        { id: 't1', title: 'Architecture blueprint & API specification', completed: true },
        { id: 't2', title: 'UI wireframes & frontend prototype', completed: false },
        { id: 't3', title: 'Backend services & database schemas', completed: false },
        { id: 't4', title: 'Automated CI/CD deployment pipeline', completed: false }
      ],
      notes: `Converted from Lead #${lead.id}. Scope: ${lead.description.slice(0, 120)}...`
    });

    handleLeadStatusChange(lead.id, 'In Progress');
    setWorkItems(getStoredWork());
    setIsDetailModalOpen(false);
    setActiveTab('work');
    setSelectedWork(newWork);
    setIsWorkDetailModalOpen(true);
  };

  // Work Phase Change
  const handleWorkPhaseChange = (id: string, phase: WorkPhase) => {
    const updated = updateWorkPhase(id, phase);
    setWorkItems(updated);
    if (selectedWork && selectedWork.id === id) {
      const updatedItem = updated.find((w) => w.id === id);
      if (updatedItem) setSelectedWork(updatedItem);
    }
  };

  // Toggle Work Task
  const handleToggleTask = (workId: string, taskId: string) => {
    const updated = toggleWorkTask(workId, taskId);
    setWorkItems(updated);
    if (selectedWork && selectedWork.id === workId) {
      const updatedItem = updated.find((w) => w.id === workId);
      if (updatedItem) setSelectedWork(updatedItem);
    }
  };

  // Save Work Notes
  const handleSaveWorkNotes = () => {
    if (!selectedWork) return;
    const updated = updateWorkNotes(selectedWork.id, workNoteDraft);
    setWorkItems(updated);
    setSelectedWork({ ...selectedWork, notes: workNoteDraft });
  };

  // Delete Work Item
  const handleDeleteWorkItem = (id: string) => {
    if (window.confirm('Are you sure you want to delete this company work project?')) {
      const updated = deleteWorkItem(id);
      setWorkItems(updated);
      if (selectedWork && selectedWork.id === id) {
        setIsWorkDetailModalOpen(false);
        setSelectedWork(null);
      }
    }
  };

  // Open Lead Details
  const openLeadDetails = (lead: ProjectLead) => {
    setSelectedLead(lead);
    setLeadNoteDraft(lead.notes || '');
    setIsDetailModalOpen(true);
  };

  // Open Work Details
  const openWorkDetails = (item: CompanyWorkItem) => {
    setSelectedWork(item);
    setWorkNoteDraft(item.notes || '');
    setIsWorkDetailModalOpen(true);
  };

  // Copy Lead Helper
  const handleCopyLead = (lead: ProjectLead) => {
    const text = `DevOps TN Project Lead:\nName: ${lead.name}\nEmail: ${lead.email}\nPhone: ${lead.phone || 'N/A'}\nCompany: ${lead.company || 'N/A'}\nType: ${lead.projectType}\nBudget: ${lead.budget}\nDate: ${new Date(lead.createdAt).toLocaleDateString()}\nDescription: ${lead.description}`;
    navigator.clipboard.writeText(text);
    setCopiedId(lead.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Export CSV for Leads
  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Company', 'ProjectType', 'Budget', 'Status', 'Source', 'CreatedAt', 'Description', 'Notes'];
    const rows = filteredLeads.map((l) => [
      `"${l.id}"`,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.email}"`,
      `"${l.phone || ''}"`,
      `"${(l.company || '').replace(/"/g, '""')}"`,
      `"${l.projectType}"`,
      `"${l.budget}"`,
      `"${l.status}"`,
      `"${l.source}"`,
      `"${new Date(l.createdAt).toLocaleString()}"`,
      `"${l.description.replace(/"/g, '""')}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `devopstn_requests_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Manual Lead Submit
  const handleAddLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadData.name || !newLeadData.email || !newLeadData.description) return;

    addLead({
      name: newLeadData.name,
      email: newLeadData.email,
      phone: newLeadData.phone,
      company: newLeadData.company,
      projectType: newLeadData.projectType,
      budget: newLeadData.budget,
      description: newLeadData.description,
      notes: newLeadData.notes,
      source: newLeadData.source
    });

    setIsAddLeadModalOpen(false);
    setNewLeadData({
      name: '',
      email: '',
      phone: '',
      company: '',
      projectType: 'Web Application',
      budget: '₹10,000 – ₹15,000',
      description: '',
      notes: '',
      source: 'Direct Email'
    });
  };

  // Manual Work Project Submit
  const handleAddWorkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkData.title || !newWorkData.clientName || !newWorkData.clientEmail) return;

    const techArray = newWorkData.techStackStr.split(',').map((s) => s.trim()).filter(Boolean);
    const tasks = [
      newWorkData.task1 && { id: 't1', title: newWorkData.task1, completed: false },
      newWorkData.task2 && { id: 't2', title: newWorkData.task2, completed: false },
      newWorkData.task3 && { id: 't3', title: newWorkData.task3, completed: false },
      newWorkData.task4 && { id: 't4', title: newWorkData.task4, completed: false }
    ].filter(Boolean) as { id: string; title: string; completed: boolean }[];

    addWorkItem({
      title: newWorkData.title,
      clientName: newWorkData.clientName,
      clientEmail: newWorkData.clientEmail,
      clientPhone: newWorkData.clientPhone,
      clientCompany: newWorkData.clientCompany,
      projectType: newWorkData.projectType,
      contractValue: newWorkData.contractValue,
      phase: newWorkData.phase,
      priority: newWorkData.priority,
      progressPercent: newWorkData.progressPercent,
      startDate: newWorkData.startDate,
      targetDeliveryDate: newWorkData.targetDeliveryDate,
      techStack: techArray,
      tasks: tasks,
      notes: newWorkData.notes,
      repoUrl: newWorkData.repoUrl,
      liveUrl: newWorkData.liveUrl
    });

    setWorkItems(getStoredWork());
    setIsAddWorkModalOpen(false);
  };

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'New':
        return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800';
      case 'Contacted':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800';
      case 'Proposal Sent':
        return 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800';
      case 'In Progress':
        return 'bg-brand-50 text-brand-700 border-brand-200 dark:bg-brand-950/60 dark:text-brand-300 dark:border-brand-800';
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800';
      case 'Archived':
        return 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getPhaseBadge = (phase: WorkPhase) => {
    switch (phase) {
      case 'Discovery & Planning':
        return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800';
      case 'UI/UX Design':
        return 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950/60 dark:text-pink-300 dark:border-pink-800';
      case 'Development':
        return 'bg-brand-50 text-brand-700 border-brand-200 dark:bg-brand-950/60 dark:text-brand-300 dark:border-brand-800';
      case 'Testing & QA':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800';
      case 'DevOps & Deployment':
        return 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800';
      case 'Completed & Handed Over':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getPriorityBadge = (priority: WorkPriority) => {
    switch (priority) {
      case 'Critical':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300';
      case 'High':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300';
      case 'Medium':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-300';
      case 'Low':
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-300';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-white font-sans transition-colors duration-200">
      
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSite}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Return to Public Website"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2.5">
              <Logo className="h-9" />
              <div className="hidden sm:block border-l border-slate-200 dark:border-slate-700 pl-3">
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-brand-600 dark:text-brand-400 block">
                  Company Management Hub
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  nivashnivash868@gmail.com
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Direct Sync Badge */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Registered Dispatch: nivashnivash868@gmail.com</span>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg border border-rose-200 dark:border-rose-900/60 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Navigation Tabs Bar */}
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-2 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-1.5 w-full sm:w-auto p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
            <button
              onClick={() => setActiveTab('requests')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                activeTab === 'requests'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Inbox className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span>Client Requests &amp; Inquiries</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-brand-500 text-white font-bold">
                {leads.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('work')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                activeTab === 'work'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Active Work &amp; Project Tracker</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-600 text-white font-bold">
                {workItems.length}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {activeTab === 'requests' ? (
              <>
                <button
                  onClick={() => setIsAddLeadModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-semibold text-white bg-brand-600 hover:bg-brand-500 rounded-lg shadow-sm transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Log New Request</span>
                </button>
                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CSV</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsAddWorkModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Work Order</span>
              </button>
            )}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* TAB 1: CLIENT REQUESTS & INQUIRIES VIEW */}
        {/* ========================================================================= */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            
            {/* Request KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-[#111827] rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">Total Requests</span>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Inbox className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {requestMetrics.total}
                </div>
                <p className="text-[11px] text-slate-400 font-mono mt-1">All recorded inquiries</p>
              </div>

              <div className="bg-white dark:bg-[#111827] rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-rose-500 dark:text-rose-400">New / Unread</span>
                  <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                    <Clock3 className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-rose-600 dark:text-rose-400">
                  {requestMetrics.newCount}
                </div>
                <p className="text-[11px] text-slate-400 font-mono mt-1">Require initial review</p>
              </div>

              <div className="bg-white dark:bg-[#111827] rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-brand-600 dark:text-brand-400">In Pipeline</span>
                  <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {requestMetrics.inProgressCount}
                </div>
                <p className="text-[11px] text-slate-400 font-mono mt-1">Contacted / In Progress</p>
              </div>

              <div className="bg-white dark:bg-[#111827] rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Completed</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  {requestMetrics.completedCount}
                </div>
                <p className="text-[11px] text-slate-400 font-mono mt-1">Successfully delivered</p>
              </div>
            </div>

            {/* Filter Toolbar */}
            <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
              
              <div className="relative flex-grow max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search requests by client, company, email, or scope..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Status:</span>
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="ALL">All Statuses ({leads.length})</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Archived">Archived</option>
                </select>

                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 max-w-[180px] truncate"
                >
                  <option value="ALL">All Services</option>
                  {PROJECT_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Requests Table */}
            <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              {filteredLeads.length === 0 ? (
                <div className="text-center py-16 px-4 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                    <Search className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                    No matching project requests found
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try adjusting your search query or filters.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50/80 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      <tr>
                        <th className="py-3.5 px-4 font-semibold">Client / Company</th>
                        <th className="py-3.5 px-4 font-semibold">Project Scope</th>
                        <th className="py-3.5 px-4 font-semibold">Budget</th>
                        <th className="py-3.5 px-4 font-semibold">Status</th>
                        <th className="py-3.5 px-4 font-semibold">Date</th>
                        <th className="py-3.5 px-4 font-semibold text-right">Actions &amp; Dispatch</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                      {filteredLeads.map((lead) => (
                        <tr 
                          key={lead.id}
                          className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors group"
                        >
                          <td className="py-4 px-4 align-top">
                            <div className="font-semibold text-slate-900 dark:text-white text-sm">
                              {lead.name}
                            </div>
                            {lead.company && (
                              <div className="text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                                <Building className="w-3 h-3 shrink-0" />
                                <span>{lead.company}</span>
                              </div>
                            )}
                            <div className="text-slate-400 font-mono text-[11px] mt-1 space-y-0.5">
                              <a 
                                href={`mailto:${lead.email}`}
                                className="hover:text-brand-600 dark:hover:text-brand-400 hover:underline block truncate max-w-[200px]"
                              >
                                {lead.email}
                              </a>
                              {lead.phone && (
                                <a 
                                  href={`tel:${lead.phone}`}
                                  className="hover:text-brand-600 dark:hover:text-brand-400 hover:underline block"
                                >
                                  {lead.phone}
                                </a>
                              )}
                            </div>
                          </td>

                          <td className="py-4 px-4 align-top">
                            <span className="inline-block px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono text-[11px] font-medium border border-slate-200 dark:border-slate-700">
                              {lead.projectType}
                            </span>
                            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1.5 line-clamp-2 max-w-xs leading-relaxed">
                              {lead.description}
                            </p>
                          </td>

                          <td className="py-4 px-4 align-top font-mono font-medium text-slate-800 dark:text-slate-200">
                            {lead.budget}
                          </td>

                          <td className="py-4 px-4 align-top">
                            <select
                              value={lead.status}
                              onChange={(e) => handleLeadStatusChange(lead.id, e.target.value as LeadStatus)}
                              className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-500 ${getStatusBadge(lead.status)}`}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Proposal Sent">Proposal Sent</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                              <option value="Archived">Archived</option>
                            </select>
                            <span className="block text-[10px] text-slate-400 font-mono mt-1">
                              Via {lead.source}
                            </span>
                          </td>

                          <td className="py-4 px-4 align-top text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                            <div>{new Date(lead.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                            <div className="text-[10px] text-slate-400">{new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                          </td>

                          <td className="py-4 px-4 align-top text-right space-x-1">
                            {/* Forward to Company Email */}
                            <a
                              href={generateEmailNotificationUrl(lead)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/60 dark:hover:bg-brand-900/60 text-brand-700 dark:text-brand-300 font-mono text-[11px] font-medium border border-brand-200 dark:border-brand-800 transition-colors"
                              title="Forward this request to company email (nivashnivash868@gmail.com)"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              <span className="hidden xl:inline">Email Copy</span>
                            </a>

                            {/* Reply to Client */}
                            <a
                              href={generateClientReplyUrl(lead)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-mono text-[11px] font-medium transition-colors"
                              title="Compose reply email to client with CC to DevOps TN"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span className="hidden xl:inline">Reply</span>
                            </a>

                            {/* Convert to Work Project */}
                            <button
                              onClick={() => handleConvertLeadToWork(lead)}
                              className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
                              title="Convert to Active Company Work Project"
                            >
                              <Sparkles className="w-4 h-4" />
                            </button>

                            {/* View Full Scope & Notes */}
                            <button
                              onClick={() => openLeadDetails(lead)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                              title="Inspect Lead & Edit Notes"
                            >
                              <FileText className="w-4 h-4" />
                            </button>

                            {/* Copy Summary */}
                            <button
                              onClick={() => handleCopyLead(lead)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                              title="Copy details to clipboard"
                            >
                              {copiedId === lead.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                            </button>

                            {/* Delete Lead */}
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="bg-slate-50/50 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800 px-4 py-3 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-2">
                <div>
                  Showing {filteredLeads.length} of {leads.length} recorded inquiries
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-brand-500" />
                    DEVOPS TN Request Engine
                  </span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: ACTIVE WORK & PROJECT TRACKER VIEW */}
        {/* ========================================================================= */}
        {activeTab === 'work' && (
          <div className="space-y-6">
            
            {/* Work KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-[#111827] rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">Total Work Projects</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <Briefcase className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {workMetrics.total}
                </div>
                <p className="text-[11px] text-slate-400 font-mono mt-1">Client deliverables &amp; contracts</p>
              </div>

              <div className="bg-white dark:bg-[#111827] rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-brand-600 dark:text-brand-400">In Active Build</span>
                  <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                    <Code2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-brand-600 dark:text-brand-400">
                  {workMetrics.inDev}
                </div>
                <p className="text-[11px] text-slate-400 font-mono mt-1">Design, Dev &amp; Cloud Deployment</p>
              </div>

              <div className="bg-white dark:bg-[#111827] rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-rose-500 dark:text-rose-400">High Priority</span>
                  <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-rose-600 dark:text-rose-400">
                  {workMetrics.critical}
                </div>
                <p className="text-[11px] text-slate-400 font-mono mt-1">Upcoming milestones</p>
              </div>

              <div className="bg-white dark:bg-[#111827] rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Delivered</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  {workMetrics.completed}
                </div>
                <p className="text-[11px] text-slate-400 font-mono mt-1">Client signed off</p>
              </div>
            </div>

            {/* Work Filter Bar */}
            <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
              <div className="relative flex-grow max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search work projects by title, client, or technology..."
                  value={workSearchQuery}
                  onChange={(e) => setWorkSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Phase:</span>
                </div>
                <select
                  value={workPhaseFilter}
                  onChange={(e) => setWorkPhaseFilter(e.target.value)}
                  className="text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="ALL">All Phases ({workItems.length})</option>
                  <option value="Discovery & Planning">Discovery & Planning</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Development">Development</option>
                  <option value="Testing & QA">Testing & QA</option>
                  <option value="DevOps & Deployment">DevOps & Deployment</option>
                  <option value="Completed & Handed Over">Completed & Handed Over</option>
                </select>
              </div>
            </div>

            {/* Work Projects Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {filteredWorkItems.map((work) => {
                const completedTasks = work.tasks.filter((t) => t.completed).length;
                return (
                  <div
                    key={work.id}
                    className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Row: Phase + Priority + Contract */}
                      <div className="flex items-center justify-between gap-2 flex-wrap mb-3">
                        <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${getPhaseBadge(work.phase)}`}>
                          {work.phase}
                        </span>
                        
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getPriorityBadge(work.priority)}`}>
                            {work.priority} Priority
                          </span>
                          <span className="text-xs font-mono font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                            {work.contractValue}
                          </span>
                        </div>
                      </div>

                      {/* Title & Client */}
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {work.title}
                      </h3>
                      <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-1">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{work.clientName}</span>
                        {work.clientCompany && <span>• {work.clientCompany}</span>}
                        <span>• {work.projectType}</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4 space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-slate-500 dark:text-slate-400">Milestone Progress</span>
                          <span className="font-bold text-brand-600 dark:text-brand-400">{work.progressPercent}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-brand-600 to-emerald-500 transition-all duration-300 rounded-full"
                            style={{ width: `${work.progressPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* Tasks Checklist */}
                      <div className="mt-4 space-y-2">
                        <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
                          <span>Key Deliverables ({completedTasks}/{work.tasks.length})</span>
                          <span>Due: {work.targetDeliveryDate}</span>
                        </div>
                        <div className="space-y-1.5 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs">
                          {work.tasks.map((task) => (
                            <button
                              key={task.id}
                              onClick={() => handleToggleTask(work.id, task.id)}
                              className="flex items-center gap-2 w-full text-left group hover:text-brand-600 transition-colors"
                            >
                              {task.completed ? (
                                <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                              ) : (
                                <Square className="w-4 h-4 text-slate-400 shrink-0 group-hover:text-brand-500" />
                              )}
                              <span className={`line-clamp-1 ${task.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-700 dark:text-slate-300'}`}>
                                {task.title}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {work.techStack.map((tech) => (
                          <span 
                            key={tech}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {work.repoUrl && (
                          <a
                            href={work.repoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-brand-600 text-xs flex items-center gap-1 font-mono transition-colors"
                            title="Open GitHub Repository"
                          >
                            <FolderGit2 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Repo</span>
                          </a>
                        )}
                        {work.liveUrl && (
                          <a
                            href={work.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-brand-600 text-xs flex items-center gap-1 font-mono transition-colors"
                            title="Open Staging Deployment"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Live</span>
                          </a>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => openWorkDetails(work)}
                          className="px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-800 hover:bg-brand-600 text-white text-xs font-mono font-semibold transition-colors"
                        >
                          Manage Work
                        </button>
                        <button
                          onClick={() => handleDeleteWorkItem(work.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                          title="Delete Work Order"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* MODAL: Work Detail & Phase Manager */}
      {/* ========================================================================= */}
      {isWorkDetailModalOpen && selectedWork && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#111827] rounded-2xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <div className="sticky top-0 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                  Work Order #{selectedWork.id}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {selectedWork.title}
                </h3>
              </div>
              <button
                onClick={() => setIsWorkDetailModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs">
              
              {/* Meta Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 font-mono">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Client</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{selectedWork.clientName}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Contract Value</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">{selectedWork.contractValue}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Target Delivery</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{selectedWork.targetDeliveryDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Overall Progress</span>
                  <span className="font-semibold text-brand-600 dark:text-brand-400">{selectedWork.progressPercent}%</span>
                </div>
              </div>

              {/* Phase Switcher */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Update Project Phase
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(['Discovery & Planning', 'UI/UX Design', 'Development', 'Testing & QA', 'DevOps & Deployment', 'Completed & Handed Over'] as WorkPhase[]).map((phase) => (
                    <button
                      key={phase}
                      onClick={() => handleWorkPhaseChange(selectedWork.id, phase)}
                      className={`px-3 py-2 rounded-xl text-left font-mono text-[11px] border transition-all ${
                        selectedWork.phase === phase
                          ? 'bg-slate-900 dark:bg-brand-600 text-white font-bold border-transparent shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      {phase}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tasks List */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Deliverable Milestones (Click to Toggle)
                </h4>
                <div className="space-y-2 bg-slate-50 dark:bg-slate-900/40 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                  {selectedWork.tasks.map((task) => (
                    <button
                      key={task.id}
                      onClick={() => handleToggleTask(selectedWork.id, task.id)}
                      className="flex items-center gap-2.5 w-full text-left p-2 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors"
                    >
                      {task.completed ? (
                        <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                      <span className={task.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}>
                        {task.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Internal Work Notes */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Engineering Work Notes &amp; Sprint Updates
                  </h4>
                  <button
                    onClick={handleSaveWorkNotes}
                    className="text-xs font-mono text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Save Notes</span>
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={workNoteDraft}
                  onChange={(e) => setWorkNoteDraft(e.target.value)}
                  placeholder="Record sprint updates, branch names, architecture decisions..."
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: Lead Detail & Scope Inspector */}
      {/* ========================================================================= */}
      {isDetailModalOpen && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#111827] rounded-2xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <div className="sticky top-0 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <span className="text-[10px] font-mono text-brand-600 dark:text-brand-400 uppercase tracking-wider block">
                  Lead ID: #{selectedLead.id} • {selectedLead.source}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {selectedLead.name} {selectedLead.company ? `(${selectedLead.company})` : ''}
                </h3>
              </div>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs">
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 font-mono">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Service</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedLead.projectType}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Budget</span>
                  <span className="font-semibold text-brand-600 dark:text-brand-400">{selectedLead.budget}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Status</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedLead.status}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Submitted</span>
                  <span className="text-slate-600 dark:text-slate-400">{new Date(selectedLead.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Contact info */}
              <div className="bg-slate-50 dark:bg-slate-900/40 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Email Address:</span>
                  <a href={`mailto:${selectedLead.email}`} className="text-brand-600 dark:text-brand-400 hover:underline">
                    {selectedLead.email}
                  </a>
                </div>
                {selectedLead.phone && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Phone:</span>
                    <a href={`tel:${selectedLead.phone}`} className="text-slate-900 dark:text-white hover:underline">
                      {selectedLead.phone}
                    </a>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Project Scope &amp; Requirements
                </h4>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-sans leading-relaxed whitespace-pre-wrap">
                  {selectedLead.description}
                </div>
              </div>

              {/* Internal Notes */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Internal Engineering Notes
                  </h4>
                  <button
                    onClick={handleSaveLeadNotes}
                    className="text-xs font-mono text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Save Notes</span>
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={leadNoteDraft}
                  onChange={(e) => setLeadNoteDraft(e.target.value)}
                  placeholder="Record discovery call notes, technical requirements, or quotes..."
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleConvertLeadToWork(selectedLead)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-semibold shadow-sm transition-colors"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Convert to Active Project Work</span>
                  </button>

                  <a
                    href={generateEmailNotificationUrl(selectedLead)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-brand-600 hover:bg-brand-500 text-white font-mono font-semibold shadow-sm transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send to {BRAND.contactEmail}</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: Log New Request */}
      {/* ========================================================================= */}
      {isAddLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#111827] rounded-2xl max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <div className="sticky top-0 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between z-10">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Log New Client Inbound Request
              </h3>
              <button
                onClick={() => setIsAddLeadModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddLeadSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh S."
                    value={newLeadData.name}
                    onChange={(e) => setNewLeadData({ ...newLeadData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Client Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ramesh@example.com"
                    value={newLeadData.email}
                    onChange={(e) => setNewLeadData({ ...newLeadData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Service Type
                  </label>
                  <select
                    value={newLeadData.projectType}
                    onChange={(e) => setNewLeadData({ ...newLeadData, projectType: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    {PROJECT_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Budget Tier
                  </label>
                  <select
                    value={newLeadData.budget}
                    onChange={(e) => setNewLeadData({ ...newLeadData, budget: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    {BUDGET_RANGES.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Project Description / Scope *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe requirements, timeline..."
                  value={newLeadData.description}
                  onChange={(e) => setNewLeadData({ ...newLeadData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddLeadModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-mono font-semibold"
                >
                  Save Inbound Request
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: Create New Work Order */}
      {/* ========================================================================= */}
      {isAddWorkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#111827] rounded-2xl max-w-xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <div className="sticky top-0 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between z-10">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Create New Company Work Order
              </h3>
              <button
                onClick={() => setIsAddWorkModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddWorkSubmit} className="p-6 space-y-4 text-xs">
              
              <div>
                <label className="block font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Project / Work Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI Document Extractor Portal"
                  value={newWorkData.title}
                  onChange={(e) => setNewWorkData({ ...newWorkData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Karthik Raja"
                    value={newWorkData.clientName}
                    onChange={(e) => setNewWorkData({ ...newWorkData, clientName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Client Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="karthik@example.com"
                    value={newWorkData.clientEmail}
                    onChange={(e) => setNewWorkData({ ...newWorkData, clientEmail: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Contract Value
                  </label>
                  <input
                    type="text"
                    placeholder="₹25,000"
                    value={newWorkData.contractValue}
                    onChange={(e) => setNewWorkData({ ...newWorkData, contractValue: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Phase
                  </label>
                  <select
                    value={newWorkData.phase}
                    onChange={(e) => setNewWorkData({ ...newWorkData, phase: e.target.value as WorkPhase })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="Discovery & Planning">Discovery & Planning</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Development">Development</option>
                    <option value="Testing & QA">Testing & QA</option>
                    <option value="DevOps & Deployment">DevOps & Deployment</option>
                    <option value="Completed & Handed Over">Completed & Handed Over</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Priority
                  </label>
                  <select
                    value={newWorkData.priority}
                    onChange={(e) => setNewWorkData({ ...newWorkData, priority: e.target.value as WorkPriority })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="React, FastAPI, PostgreSQL, Docker"
                  value={newWorkData.techStackStr}
                  onChange={(e) => setNewWorkData({ ...newWorkData, techStackStr: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddWorkModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-semibold"
                >
                  Create Work Project
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

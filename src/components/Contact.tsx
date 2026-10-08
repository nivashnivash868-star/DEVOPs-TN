import React, { useState } from 'react';
import { BRAND, PROJECT_TYPES, BUDGET_RANGES } from '../data/companyData';
import { ContactFormData, ProjectLead } from '../types';
import { addLead, generateEmailNotificationUrl } from '../services/leadService';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Mail, 
  Phone,
  MapPin, 
  Clock,
  ExternalLink
} from 'lucide-react';

interface ContactProps {
  initialProjectType?: string;
}

export const Contact: React.FC<ContactProps> = ({ initialProjectType }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: initialProjectType || 'Web Application',
    budget: '₹5,000 – ₹10,000',
    description: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<ProjectLead | null>(null);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Please provide a brief description of your project';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description should be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      // Save to company leads storage
      const lead = addLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        projectType: formData.projectType,
        budget: formData.budget,
        description: formData.description,
        source: 'Contact Form'
      });

      setSubmittedLead(lead);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      projectType: 'Web Application',
      budget: '₹5,000 – ₹10,000',
      description: ''
    });
    setIsSubmitted(false);
    setSubmittedLead(null);
    setErrors({});
  };

  return (
    <section id="contact" className="py-24 bg-[#F8FAFC] dark:bg-[#0B0F19] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-mono font-medium mb-3">
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Start Your Project with DEVOPS TN
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Fill out the project scope form below. We will review your technical requirements and respond with architectural recommendations and a delivery roadmap.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-subtle transition-colors">
            
            {isSubmitted ? (
              <div className="text-center py-8 space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Project Request Received &amp; Logged!
                  </h3>
                  <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                    Request ID: #{submittedLead?.id} • Synced to Company Portal
                  </p>
                </div>
                
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to <span className="font-semibold text-slate-900 dark:text-white">{BRAND.name}</span>. An engineer will review your requirements and respond at <span className="font-mono text-brand-600 dark:text-brand-400">{formData.email}</span> within 24 business hours.
                </p>

                {/* Direct Company Email Dispatch Option */}
                {submittedLead && (
                  <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 max-w-md mx-auto text-left space-y-2">
                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                      Direct Email Forwarding
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Want to send a formatted copy directly to our official engineering inbox?
                    </p>
                    <a
                      href={generateEmailNotificationUrl(submittedLead)}
                      className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-mono font-semibold transition-colors shadow-sm"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send to {BRAND.contactEmail}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    onClick={resetForm}
                    className="px-5 py-2.5 rounded-lg bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-semibold font-mono transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                
                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="e.g. Anand Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all ${
                        errors.name 
                          ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20 dark:bg-rose-950/20' 
                          : 'border-slate-300 dark:border-slate-700 focus:border-brand-500 dark:focus:border-brand-500 focus:ring-brand-100 dark:focus:ring-brand-950'
                      }`}
                      required
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all ${
                        errors.email 
                          ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20 dark:bg-rose-950/20' 
                          : 'border-slate-300 dark:border-slate-700 focus:border-brand-500 dark:focus:border-brand-500 focus:ring-brand-100 dark:focus:ring-brand-950'
                      }`}
                      required
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 2: Phone & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Phone Number <span className="text-slate-400 dark:text-slate-500 text-[10px] font-normal">(Optional)</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 focus:border-brand-500 dark:focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-950 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-company" className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Company / Organization <span className="text-slate-400 dark:text-slate-500 text-[10px] font-normal">(Optional)</span>
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      placeholder="e.g. Acme Tech Pvt Ltd"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 focus:border-brand-500 dark:focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-950 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Row 3: Project Type & Budget Dropdowns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-project-type" className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Project Type
                    </label>
                    <select
                      id="contact-project-type"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 focus:border-brand-500 dark:focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-950 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:outline-none transition-all font-sans"
                    >
                      {PROJECT_TYPES.map((type) => (
                        <option key={type} value={type} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-budget" className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Budget Range
                    </label>
                    <select
                      id="contact-budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 focus:border-brand-500 dark:focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-950 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:outline-none transition-all font-sans"
                    >
                      {BUDGET_RANGES.map((b) => (
                        <option key={b} value={b} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label htmlFor="contact-description" className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Project Description <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="contact-description"
                    rows={4}
                    placeholder="Tell us what you are building, key features, target timeline, or infrastructure requirements..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all ${
                      errors.description 
                        ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20 dark:bg-rose-950/20' 
                        : 'border-slate-300 dark:border-slate-700 focus:border-brand-500 dark:focus:border-brand-500 focus:ring-brand-100 dark:focus:ring-brand-950'
                    }`}
                    required
                  />
                  {errors.description && (
                    <p className="mt-1 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.description}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="contact-submit-btn"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-semibold text-sm shadow-sm transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed group"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Project Request</span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>

          {/* Right Column: Contact Information Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Direct Contact Card */}
            <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-subtle space-y-4 transition-colors">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Direct Contact Information
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Connect directly with our engineering team for technical inquiries or project quotes.
              </p>

              <div className="space-y-3 pt-2">
                
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800">
                  <Mail className="w-4 h-4 text-brand-600 dark:text-brand-400 mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-mono text-slate-400 dark:text-slate-500 block">Official Email</span>
                    <a href={`mailto:${BRAND.contactEmail}`} className="text-xs font-mono font-semibold text-slate-800 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                      {BRAND.contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800">
                  <Phone className="w-4 h-4 text-brand-600 dark:text-brand-400 mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-mono text-slate-400 dark:text-slate-500 block">Direct Contact / WhatsApp</span>
                    <a href={`tel:${BRAND.contactPhoneRaw || '+917550319164'}`} className="text-xs font-mono font-semibold text-slate-800 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                      {BRAND.contactPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800">
                  <MapPin className="w-4 h-4 text-brand-600 dark:text-brand-400 mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-mono text-slate-400 dark:text-slate-500 block">Company Location</span>
                    <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                      {BRAND.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800">
                  <Clock className="w-4 h-4 text-brand-600 dark:text-brand-400 mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-mono text-slate-400 dark:text-slate-500 block">Availability</span>
                    <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                      {BRAND.workingHours}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick Guarantees Box */}
            <div className="bg-slate-900 dark:bg-[#111827] rounded-2xl p-6 text-white border border-slate-800 space-y-3 font-mono">
              <div className="text-xs font-bold text-brand-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>Our Engineering Commitment</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Transparent cost estimations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Full source code ownership</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Documented deployment guides</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

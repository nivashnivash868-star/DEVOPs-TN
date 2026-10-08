import { ServiceItem, WhyUsPoint, ProcessStep, ProjectItem, TechCategory, CapabilityStat } from '../types';

export const BRAND = {
  name: "DEVOPS TN",
  tagline: "Build. Deploy. Scale.",
  location: "Tamil Nadu, India",
  description: "DevOps TN is a technology company focused on building modern digital products, web applications, cloud infrastructure and automated software delivery systems. We combine thoughtful design, engineering discipline and DevOps practices to create reliable technology that solves real problems.",
  contactEmail: "nivashnivash868@gmail.com",
  contactPhone: "+91 75503 19164",
  contactPhoneRaw: "+917550319164",
  workingHours: "Monday – Saturday (IST)",
  responseTime: "Within 24 business hours",
  socials: {
    github: "https://github.com/nivashnivash868-star",
    linkedin: "https://www.linkedin.com/in/nivash-k-105a40373",
    instagram: "https://www.instagram.com/nivash_k_777/",
    youtube: "https://youtube.com/"
  }
};

export const PRIMARY_SERVICES: ServiceItem[] = [
  {
    id: "web-dev",
    title: "Web Development",
    tagline: "High-Performance Modern Web",
    description: "Fast, responsive and scalable websites built for modern businesses.",
    features: [
      "Semantic, accessible HTML & modern CSS architecture",
      "Next.js & React single-page and server-rendered sites",
      "Core Web Vitals optimization and sub-second load times",
      "SEO-ready technical structure and meta hierarchy"
    ],
    deliverables: [
      "Custom responsive web application",
      "Speed & performance audit (95+ Lighthouse score)",
      "Production deployment with SSL & CDN setup",
      "Comprehensive source code & documentation"
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    icon: "Globe"
  },
  {
    id: "web-apps",
    title: "Web Applications",
    tagline: "Workflow-Driven SaaS & Portals",
    description: "Powerful web applications designed around real business workflows.",
    features: [
      "Role-based access control (RBAC) & user auth",
      "Interactive data dashboards and live telemetry",
      "Modular state management and fast API queries",
      "Resilient database schemas and caching layers"
    ],
    deliverables: [
      "Full-stack web application architecture",
      "Secure REST / GraphQL API endpoints",
      "PostgreSQL / MongoDB schema design",
      "Automated unit & integration tests"
    ],
    technologies: ["React", "FastAPI", "Node.js", "PostgreSQL"],
    icon: "LayoutDashboard"
  },
  {
    id: "devops-cicd",
    title: "DevOps & CI/CD",
    tagline: "Zero-Downtime Automated Ship Cycles",
    description: "Automated development and deployment pipelines that ship software faster.",
    features: [
      "Automated build, test, and release pipelines",
      "Docker containerization & multi-stage optimization",
      "Infrastructure as Code (IaC) provisioning",
      "Blue-green and rolling deployment strategies"
    ],
    deliverables: [
      "GitHub Actions / GitLab CI workflow configurations",
      "Production Dockerfiles & compose architectures",
      "Environment secrets and security vault integration",
      "Automated release notes & rollback scripts"
    ],
    technologies: ["Docker", "GitHub Actions", "Git", "CI/CD"],
    icon: "Terminal"
  },
  {
    id: "cloud-solutions",
    title: "Cloud Solutions",
    tagline: "Elastic & Fault-Tolerant Infrastructure",
    description: "Reliable and scalable cloud infrastructure for modern applications.",
    features: [
      "AWS, Vercel & Cloudflare cloud topology design",
      "Auto-scaling compute instances and serverless functions",
      "Managed databases with automated backups & replicas",
      "Global CDN caching and edge compute routing"
    ],
    deliverables: [
      "Cloud architecture diagram & provisioning plan",
      "Multi-region deployment and failover design",
      "Observability with structured logging & metrics",
      "Cloud cost optimization report"
    ],
    technologies: ["AWS", "Vercel", "Cloudflare", "Supabase"],
    icon: "Cloud"
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    tagline: "Purpose-Built Design Systems",
    description: "Clean, intuitive interfaces designed around users and business goals.",
    features: [
      "User research and information architecture mapping",
      "High-fidelity responsive wireframes and interactive prototypes",
      "Design systems with reusable token libraries",
      "Micro-interaction and accessibility compliance"
    ],
    deliverables: [
      "Complete Figma / UI design component library",
      "Interactive click-through prototype",
      "Design tokens (colors, typography, spacing, shadows)",
      "Developer handoff documentation"
    ],
    technologies: ["Design Systems", "Figma", "Accessibility", "Modern UI"],
    icon: "Palette"
  },
  {
    id: "ai-automation",
    title: "AI & Automation",
    tagline: "Productivity-Multiplying Systems",
    description: "Intelligent automation that reduces repetitive work and improves productivity.",
    features: [
      "LLM API integration and automated workflow orchestration",
      "Document parsing, OCR, and automated data extraction",
      "Custom business logic bots and notification webhooks",
      "Computer vision and automated quality control pipelines"
    ],
    deliverables: [
      "AI service pipeline with fallback handling",
      "Automated background workers and queue processing",
      "Prompt engineering and token optimization layer",
      "Real-time analytics and audit logs"
    ],
    technologies: ["Python", "LLM APIs", "FastAPI", "Computer Vision"],
    icon: "Cpu"
  }
];

export const ALL_SERVICES_LIST = [
  "Web Development",
  "Web Application Development",
  "UI/UX Design",
  "DevOps & CI/CD",
  "Cloud Solutions",
  "Software Development",
  "API Development",
  "Database Solutions",
  "Cybersecurity",
  "AI & Automation"
];

export const TECH_STRIP = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Framework" },
  { name: "JavaScript", category: "Language" },
  { name: "TypeScript", category: "Language" },
  { name: "Python", category: "Backend" },
  { name: "FastAPI", category: "API" },
  { name: "Node.js", category: "Runtime" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "Docker", category: "Container" },
  { name: "Git", category: "VCS" },
  { name: "GitHub", category: "CI/CD" },
  { name: "AWS", category: "Cloud" },
  { name: "Vercel", category: "Deployment" }
];

export const WHY_US_POINTS: WhyUsPoint[] = [
  {
    step: "01",
    title: "Understand",
    description: "We understand the business problem before writing code.",
    detail: "We begin every project by deeply examining workflow requirements, user personas, operational bottlenecks, and business objectives. We do not jump into code without clear architectural alignment.",
    metric: "100% Requirement Clarity",
    codeSnippet: `// 01. Discovery & Domain Modeling\ninterface BusinessObjective {\n  problemStatement: string;\n  targetUsers: UserPersona[];\n  expectedThroughput: MetricTarget;\n  securityRequirements: ComplianceStandard[];\n}`
  },
  {
    step: "02",
    title: "Engineer",
    description: "We build scalable and maintainable software.",
    detail: "We write clean, modular, and strongly-typed code backed by structured architecture patterns. Every module is built for long-term maintainability, easy refactoring, and clear maintainer handoff.",
    metric: "Type-Safe & Modular Codebase",
    codeSnippet: `// 02. Strongly-Typed Engineering\nexport const createServiceRouter = <T extends Config>(\n  config: T\n): ApplicationRouter => {\n  return configureMiddleware(config).mountRoutes();\n};`
  },
  {
    step: "03",
    title: "Automate",
    description: "We automate testing, deployment and infrastructure wherever possible.",
    detail: "Manual processes create friction. We implement robust CI/CD pipelines, automated testing, container builds, and Infrastructure-as-Code to ensure consistent, repeatable releases.",
    metric: "Continuous Automated Verification",
    codeSnippet: `// 03. CI/CD Pipeline Automation\non: [push]\njobs:\n  build-and-deploy:\n    steps:\n      - run: npm test && docker build\n      - run: deploy --target=production --zero-downtime`
  },
  {
    step: "04",
    title: "Scale",
    description: "We design systems that can grow with the business.",
    detail: "Whether handling 100 requests or 100,000 requests per minute, our systems are built with stateless compute, efficient caching, database indexing, and elastic cloud autoscaling from day one.",
    metric: "Elastic Autoscaling Architecture",
    codeSnippet: `// 04. Scalable Cloud Topology\nconst ClusterConfig = {\n  autoScale: { minInstances: 2, maxInstances: 20 },\n  caching: { edgeCDN: true, redisCluster: true },\n  resilience: { healthCheckIntervalMs: 5000 }\n};`
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery",
    description: "Understand the idea, requirements and business goals.",
    activities: [
      "Stakeholder interviews & requirement discovery",
      "User persona & workflow mapping",
      "Scope definition and feasibility assessment"
    ],
    outcome: "Clear Project Brief & Milestone Plan"
  },
  {
    step: "02",
    title: "Strategy",
    description: "Define architecture, technology stack and development roadmap.",
    activities: [
      "Technical architecture design & data schema planning",
      "Technology stack selection tailored to performance needs",
      "Sprint planning & milestone definition"
    ],
    outcome: "System Architecture & Roadmap Blueprint"
  },
  {
    step: "03",
    title: "Design",
    description: "Create the UI/UX and user experience.",
    activities: [
      "Wireframing & user journey flows",
      "High-fidelity UI mockups & component styling",
      "Interactive design prototypes & feedback review"
    ],
    outcome: "Polished Figma Design System & Prototypes"
  },
  {
    step: "04",
    title: "Development",
    description: "Build the product using modern technologies.",
    activities: [
      "Modular frontend & backend engineering",
      "Clean API integration and database implementation",
      "Strict TypeScript types and code linting"
    ],
    outcome: "Production-Quality Working Codebase"
  },
  {
    step: "05",
    title: "Testing",
    description: "Test performance, security and reliability.",
    activities: [
      "End-to-end and unit testing validation",
      "Security audit & vulnerability scanning",
      "Cross-browser, mobile responsiveness & load testing"
    ],
    outcome: "Validated, Stable & Secure Release Candidate"
  },
  {
    step: "06",
    title: "Deployment",
    description: "Deploy using modern cloud and CI/CD infrastructure.",
    activities: [
      "Automated CI/CD pipeline triggers",
      "Cloud provisioning (AWS, Vercel, Supabase)",
      "SSL, custom domains, DNS & CDN edge routing"
    ],
    outcome: "Live Production Environment with Zero Downtime"
  },
  {
    step: "07",
    title: "Support",
    description: "Maintain, improve and scale the product.",
    activities: [
      "Infrastructure monitoring & uptime alerting",
      "Performance optimization & routine updates",
      "Feature scaling and ongoing technical support"
    ],
    outcome: "Long-Term Reliability & System Growth"
  }
];

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: "project-01",
    name: "Smart Business Dashboard",
    category: "Web Application",
    shortDescription: "Real-time analytics and enterprise operations dashboard with multi-tenant data isolation and responsive reporting.",
    fullDescription: "An enterprise-grade web application engineered to consolidate fragmented operational metrics into a unified real-time dashboard. Built with React, FastAPI, and PostgreSQL with high-throughput query caching and role-based permissions.",
    image: "dashboard",
    tags: ["React", "FastAPI", "PostgreSQL", "Tailwind CSS", "Docker"],
    clientType: "Enterprise Operations",
    timeline: "6 Weeks Delivery",
    architecture: [
      "React + Vite frontend with modular charting widgets",
      "FastAPI asynchronous backend with OpenAPI documentation",
      "PostgreSQL relational database with indexed query paths",
      "Redis caching layer for instant sub-50ms analytics rendering"
    ],
    highlights: [
      "Sub-50ms query responses across 1M+ transaction records",
      "Granular role-based access control with audit trails",
      "Live data streaming via WebSockets",
      "Exportable PDF and CSV reports with custom filters"
    ],
    challenge: "The client struggled with slow, fragmented SQL reports that took over 12 seconds to run across multi-department databases.",
    solution: "We re-architected the backend with FastAPI async endpoints and materialized views in PostgreSQL, fronted by a responsive React interface with real-time WebSocket feeds.",
    results: [
      "Reduced report generation time from 12s to under 350ms",
      "100% mobile-friendly responsive layout for field managers",
      "Automated daily operational summary generation"
    ]
  },
  {
    id: "project-02",
    name: "AI Automation Platform",
    category: "AI / SaaS",
    shortDescription: "Intelligent document processing and automated workflow system powered by Python and modern LLM APIs.",
    fullDescription: "A productivity automation platform that ingests unstructured business documents, extracts structured data fields, validates business constraints, and updates ERP systems without manual data entry.",
    image: "ai-platform",
    tags: ["Python", "FastAPI", "OpenAI API", "Redis", "Celery"],
    clientType: "FinTech & Logistics",
    timeline: "8 Weeks Delivery",
    architecture: [
      "FastAPI microservice for concurrent file ingestion",
      "Celery task workers with Redis broker for asynchronous background processing",
      "Prompt orchestration layer with schema validation and retry logic",
      "Audit dashboard tracking processing accuracy and token consumption"
    ],
    highlights: [
      "Automated extraction of 40+ invoice and contract fields",
      "Human-in-the-loop validation interface for edge cases",
      "Zero data leakage architecture with strict encryption",
      "Real-time webhook notifications upon batch completion"
    ],
    challenge: "Staff spent over 30 hours per week manually extracting invoice tables, purchase orders, and customs receipts into internal databases.",
    solution: "Engineered a robust AI pipeline using Python, FastAPI, and structured LLM JSON output schemas with Celery background workers for batch processing.",
    results: [
      "Saved 25+ hours of manual data entry per week",
      "Achieved 99.2% extraction accuracy with automated validation rules",
      "Processed 10,000+ documents within the first month"
    ]
  },
  {
    id: "project-03",
    name: "Cloud Deployment Platform",
    category: "DevOps / Cloud",
    shortDescription: "Automated container deployment and infrastructure management pipeline for scalable web applications.",
    fullDescription: "A turnkey cloud infrastructure and CI/CD workflow designed for automated multi-environment staging, continuous security testing, and zero-downtime deployment to AWS using Docker and GitHub Actions.",
    image: "cloud-devops",
    tags: ["Docker", "GitHub Actions", "AWS", "Terraform", "Nginx"],
    clientType: "SaaS Scaleup",
    timeline: "4 Weeks Delivery",
    architecture: [
      "GitHub Actions workflow for automated linting, testing, and Docker builds",
      "Multi-stage Docker images optimized for minimal production footprint",
      "AWS ECS & Application Load Balancer with auto-scaling triggers",
      "SSL termination, Cloudflare edge CDN, and automated daily backups"
    ],
    highlights: [
      "Zero-downtime rolling deployments on code push to main branch",
      "Automated preview environments for pull requests",
      "Real-time infrastructure health and latency monitoring",
      "Container image vulnerability scanning during CI"
    ],
    challenge: "Deployments were done manually via SSH into single servers, causing frequent downtime, deployment delays, and configuration drift.",
    solution: "Designed and implemented an automated CI/CD pipeline with GitHub Actions and containerized orchestration on AWS with automated health checks.",
    results: [
      "Deployment frequency increased from once a week to multiple times daily",
      "Downtime during releases reduced to 0 seconds",
      "Automated rollback triggered within 15 seconds if health checks fail"
    ]
  },
  {
    id: "project-04",
    name: "Modern E-Commerce Engine",
    category: "Web Application",
    shortDescription: "High-performance digital commerce platform with lightning-fast catalog search and frictionless checkout.",
    fullDescription: "A headless commerce application built for maximum conversion, featuring sub-second page transitions, integrated payment gateways, and automated inventory synchronization.",
    image: "ecommerce",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Stripe"],
    clientType: "Retail Brand",
    timeline: "6 Weeks Delivery",
    architecture: [
      "Next.js App Router for dynamic server-side rendering and static page generation",
      "Tailwind CSS for ultra-lightweight, responsive styling",
      "PostgreSQL with full-text search indexing across products",
      "Secure payment orchestration with webhook reconciliation"
    ],
    highlights: [
      "100/100 Core Web Vitals score on mobile and desktop",
      "Instant faceted search and catalog filtering",
      "Automated order notification emails and SMS alerts",
      "Mobile-first checkout experience with 1-click payment support"
    ],
    challenge: "Existing monolithic store had a 4.2s page load time, resulting in high mobile bounce rates and lost checkout conversions.",
    solution: "Rebuilt from the ground up using Next.js, static site generation for product pages, and dynamic edge API routes for checkout and inventory.",
    results: [
      "Page load time improved from 4.2s to 450ms",
      "Mobile conversion rate increased significantly",
      "Zero downtime during seasonal flash sales"
    ]
  }
];

export const TECH_ECOSYSTEM: TechCategory[] = [
  {
    category: "Frontend",
    description: "Modern, reactive, and accessible user interfaces built with performance at the core.",
    items: [
      { name: "React", description: "Component-driven reactive UI library", categoryBadge: "UI Engine", featured: true },
      { name: "Next.js", description: "Server-side rendering & full-stack React framework", categoryBadge: "Framework", featured: true },
      { name: "TypeScript", description: "Strict static typing for robust application code", categoryBadge: "Language", featured: true },
      { name: "JavaScript", description: "Modern ES6+ standard scripting language", categoryBadge: "Language" },
      { name: "Tailwind CSS", description: "Utility-first CSS framework for clean UI architecture", categoryBadge: "Styling", featured: true },
      { name: "HTML5", description: "Semantic, accessible document structure", categoryBadge: "Markup" },
      { name: "CSS3", description: "Modern layouts, flexbox, grid, and animations", categoryBadge: "Styling" }
    ]
  },
  {
    category: "Backend",
    description: "High-throughput, clean REST APIs and asynchronous server architectures.",
    items: [
      { name: "Python", description: "High-performance computing, automation & APIs", categoryBadge: "Language", featured: true },
      { name: "FastAPI", description: "Ultra-fast modern Python async API framework", categoryBadge: "Framework", featured: true },
      { name: "Node.js", description: "Event-driven asynchronous JavaScript runtime", categoryBadge: "Runtime", featured: true },
      { name: "REST APIs", description: "Well-documented, standardized API endpoints", categoryBadge: "Protocol", featured: true }
    ]
  },
  {
    category: "Database",
    description: "Reliable, ACID-compliant relational systems and flexible NoSQL document stores.",
    items: [
      { name: "PostgreSQL", description: "Enterprise-grade relational SQL database", categoryBadge: "Relational", featured: true },
      { name: "MongoDB", description: "Scalable document-oriented NoSQL database", categoryBadge: "Document NoSQL", featured: true },
      { name: "Supabase", description: "Open-source Firebase alternative with PostgreSQL", categoryBadge: "Cloud DB", featured: true }
    ]
  },
  {
    category: "DevOps",
    description: "Automated pipelines, containerization, and repeatable deployment workflows.",
    items: [
      { name: "Docker", description: "Containerization for consistent environments", categoryBadge: "Containers", featured: true },
      { name: "GitHub Actions", description: "Automated CI/CD workflows and automated testing", categoryBadge: "Automation", featured: true },
      { name: "Git", description: "Distributed version control system", categoryBadge: "VCS", featured: true },
      { name: "GitHub", description: "Source code collaboration and code reviews", categoryBadge: "Platform" },
      { name: "CI/CD", description: "Continuous integration & continuous delivery pipelines", categoryBadge: "Practice", featured: true }
    ]
  },
  {
    category: "Cloud",
    description: "Elastic, distributed cloud hosting with global edge delivery and high availability.",
    items: [
      { name: "AWS", description: "Industry-standard cloud infrastructure & services", categoryBadge: "Cloud Provider", featured: true },
      { name: "Vercel", description: "Global edge network & serverless platform", categoryBadge: "Hosting", featured: true },
      { name: "Cloudflare", description: "Global CDN, DNS, security, and edge compute", categoryBadge: "CDN & Edge", featured: true }
    ]
  },
  {
    category: "AI",
    description: "Applied artificial intelligence, LLM orchestration, and intelligent automation.",
    items: [
      { name: "Python", description: "Core data science, ML, and automation runtime", categoryBadge: "Runtime", featured: true },
      { name: "LLM APIs", description: "OpenAI, Anthropic & open LLM integration", categoryBadge: "AI Models", featured: true },
      { name: "Computer Vision", description: "Image processing, OCR, and visual intelligence", categoryBadge: "Vision" },
      { name: "Automation", description: "End-to-end task automation and webhook workflows", categoryBadge: "Workflows", featured: true }
    ]
  }
];

export const CAPABILITY_STATS: CapabilityStat[] = [
  {
    title: "Modern Stack",
    subtitle: "Production-ready technologies",
    description: "Engineered with proven, modern tools like React, TypeScript, FastAPI, and Docker for long-term stability and fast developer iteration.",
    metricHighlight: "Production Ready",
    icon: "Layers"
  },
  {
    title: "Scalable",
    subtitle: "Architecture designed for growth",
    description: "Stateless microservices, indexed relational databases, and auto-scaling cloud compute ready to handle growing business volume effortlessly.",
    metricHighlight: "Elastic Scale",
    icon: "TrendingUp"
  },
  {
    title: "Automated",
    subtitle: "CI/CD and deployment workflows",
    description: "Continuous integration, automated testing suites, and one-click cloud deployment pipelines that eliminate human error and ship faster.",
    metricHighlight: "Zero-Touch CI/CD",
    icon: "GitBranch"
  },
  {
    title: "Secure",
    subtitle: "Security-conscious development",
    description: "Encrypted data in transit and at rest, role-based access control, secure environment variables, and industry-standard security practices.",
    metricHighlight: "Security First",
    icon: "ShieldCheck"
  }
];

export const PROJECT_TYPES = [
  "Website",
  "Web Application",
  "Mobile Application",
  "DevOps / Cloud",
  "UI/UX Design",
  "AI / Automation",
  "Other"
];

export const BUDGET_RANGES = [
  "₹5,000 – ₹10,000",
  "₹10,000 – ₹15,000",
  "₹15,000 – ₹20,000",
  "₹20,000 – ₹30,000",
  "₹30,000+",
  "Not decided"
];

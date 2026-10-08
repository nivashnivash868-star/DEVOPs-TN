# DEVOPS TN — Official Corporate Website

> **Build. Deploy. Scale.**

Modern, production-ready website for **DEVOPS TN**, a technology and software development company based in Tamil Nadu, India.

---

## ⚡ Tech Stack & Architecture

- **Core**: React 19 + TypeScript (Strict Mode)
- **Styling**: Tailwind CSS with custom SaaS/developer tokens, typography, and subtle micro-grids
- **Icons**: Lucide Icons + custom SVGs
- **Build Tool**: Vite 6 (ultra-fast HMR and optimized production bundles)
- **SEO & Meta**: Open Graph metadata, Twitter Cards, Schema.org JSON-LD structured data

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
The application will launch on `http://localhost:3000` (or `http://localhost:3001` if port 3000 is occupied).

### 3. Build for Production
```bash
npm run build
```
Creates an optimized production build in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 📐 Project Structure

```
├── index.html                  # SEO, meta tags, Google Fonts & JSON-LD
├── package.json                # Project dependencies & scripts
├── tailwind.config.js          # Design system, electric blue & slate palette
├── vite.config.ts              # Vite configuration
├── src/
│   ├── main.tsx                # React DOM root entry
│   ├── App.tsx                 # Master layout & state coordinator
│   ├── index.css               # Global styles & tech background utilities
│   ├── types.ts                # Strong TypeScript interfaces
│   ├── data/
│   │   └── companyData.ts      # Centralized data store (easy to update)
│   └── components/
│       ├── Navbar.tsx          # Sticky responsive header with active state
│       ├── Hero.tsx            # Hero with interactive CI/CD & cloud visualizer
│       ├── TechnologyStrip.tsx # Horizontal battle-tested technology strip
│       ├── Services.tsx        # 6 primary service cards + deliverables modal
│       ├── WhyUs.tsx           # 4-step engineering approach & code explorer
│       ├── Process.tsx         # 7-step development lifecycle timeline
│       ├── Projects.tsx        # Filterable projects with mockups & case studies
│       ├── CaseStudyModal.tsx  # In-depth architectural case study modal
│       ├── TechStack.tsx       # Interactive technology ecosystem explorer
│       ├── About.tsx           # Company ethos, location & pillars
│       ├── Stats.tsx           # Capability-based metrics
│       ├── CTA.tsx             # Dark high-impact conversion section
│       ├── Contact.tsx         # Production contact form with validation
│       ├── QuoteModal.tsx      # Instant project quote request modal
│       ├── Footer.tsx          # Official branding, links & copyright
│       └── SocialIcons.tsx     # Clean SVG social media icons
```

---

## ✏️ How to Customize Content

All text, services, projects, and contact details are centralized in:
`src/data/companyData.ts`

- **Update Contact Email/Phone**: Edit `BRAND.contactEmail`, `BRAND.contactPhone`
- **Add / Replace Projects**: Update `FEATURED_PROJECTS` array
- **Modify Services**: Update `PRIMARY_SERVICES` array
- **Change Tech Stack**: Update `TECH_ECOSYSTEM` array

---

## 🛡️ Official Branding Rules

- **Brand Name**: `DEVOPS TN` (Always uppercase)
- **Tagline**: `Build. Deploy. Scale.`
- **Location**: Tamil Nadu, India (Remote collaboration available)

---

© 2026 DevOps TN. All rights reserved.

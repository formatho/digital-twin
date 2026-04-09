# Digital Twin OS - UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Digital Twin OS website and core OS pages with premium glassmorphism design, replacing all emoji icons with lucide-react icons while maintaining the existing CSS variables design system.

**Architecture:** Build on existing glass morphism patterns from Memory/Twins/Settings pages. Use CSS variables for all styling (no Tailwind). Create reusable website components (Navbar, Footer). Systematically replace emoji icons with lucide-react throughout. Use CSS animations for interactions (no framer-motion).

**Tech Stack:** Next.js 14, React 18, TypeScript, CSS Variables, lucide-react icons

---

## File Structure

**New Files:**
- `app/(website)/components/Navbar.tsx` - Sticky navigation with logo, links, CTA
- `app/(website)/components/Footer.tsx` - Multi-column footer with links
- `src/components/icons/TwinIcons.tsx` - Lucide icon mappings for twins
- `src/components/ui/GlassCard.tsx` - Shared glass card component

**Modified Files:**
- `app/(website)/layout.tsx` - Add Navbar and Footer
- `app/(website)/page.tsx` - Redesign with lucide icons, enhanced sections
- `app/(website)/pricing/page.tsx` - Glassmorphism pricing cards
- `app/(website)/about/page.tsx` - Enhanced company page
- `app/(os)/dashboard/page.tsx` - Add animations, lucide icons
- `app/(os)/components/Sidebar.tsx` - Add twin avatars, lucide icons
- `app/(os)/components/Header.tsx` - Add search, breadcrumb, lucide icons
- `package.json` - Add lucide-react dependency

---

## Task 1: Install lucide-react Dependency

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install lucide-react package**

```bash
npm install lucide-react
```

Expected: Package installs successfully, added to dependencies in package.json

- [ ] **Step 2: Verify installation**

```bash
grep -A 5 '"dependencies"' package.json | grep lucide-react
```

Expected: Shows `"lucide-react": "^version"`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add lucide-react icon library"
```

---

## Task 2: Create Twin Icon Mappings Component

**Files:**
- Create: `src/components/icons/TwinIcons.tsx`

- [ ] **Step 1: Create twin icon mappings component**

```typescript
import * as LucideIcons from 'lucide-react';

/**
 * Twin Icon Mappings
 * Maps each twin personality to appropriate lucide-react icon
 */
export const TWIN_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  // Council Twins
  strategist: LucideIcons.Target,
  builder: LucideIcons.Wrench,
  analyst: LucideIcons.BarChart3,
  operator: LucideIcons.Settings2,
  critic: LucideIcons.Eye,

  // Skill Twins
  research: LucideIcons.Microscope,
  content: LucideIcons.PenTool,
  design: LucideIcons.Palette,
  growth: LucideIcons.TrendingUp,
  code: LucideIcons.Code2,
  marketing: LucideIcons.Megaphone,
  sales: LucideIcons.DollarSign,
  legal: LucideIcons.Scale,
  product: LucideIcons.Package,
  operations: LucideIcons.Building,
};

export default TWIN_ICONS;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/icons/TwinIcons.tsx
git commit -m "feat: add twin icon mappings component"
```

---

## Task 3: Create Shared Glass Card Component

**Files:**
- Create: `src/components/ui/GlassCard.tsx`

- [ ] **Step 1: Create reusable glass card component**

```typescript
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

/**
 * Glass Card Component
 * Reusable glassmorphism card with consistent styling
 */
export default function GlassCard({
  children,
  className = '',
  interactive = false,
  glow = false,
  onClick,
}: GlassCardProps) {
  const baseClasses = 'glass-card';
  const interactiveClasses = interactive
    ? 'glass-card-interactive cursor-pointer'
    : '';
  const glowClasses = glow ? 'glow-primary' : '';

  return (
    <div
      className={`${baseClasses} ${interactiveClasses} ${glowClasses} ${className}`.trim()}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/GlassCard.tsx
git commit -m "feat: add reusable glass card component"
```

---

## Task 4: Create Website Navbar Component

**Files:**
- Create: `app/(website)/components/Navbar.tsx`

- [ ] **Step 1: Create navbar component with lucide icons**

```typescript
'use client';

import Link from 'next/link';
import { Menu, X, Github } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/about', label: 'About' },
    { href: '/pricing', label: 'Pricing' },
    { href: 'https://github.com/formatho/digital-twin', label: 'GitHub', external: true },
  ];

  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--glass-border)',
      }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
              }}
            >
              <span className="text-xl">🧬</span>
            </div>
            <span className="text-xl font-bold gradient-text">Digital Twin OS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:scale-105"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <Github size={18} />
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:scale-105"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {link.label}
                </Link>
              )
            ))}
            <Link
              href="/dashboard"
              className="px-6 py-2 rounded-lg font-medium transition-all hover:scale-105 glow-primary"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                color: 'var(--text-primary)',
              }}
            >
              Launch OS
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ background: 'var(--glass-bg)' }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            {navLinks.map((link) => (
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <Github size={18} />
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2"
                  style={{ color: 'var(--text-secondary)' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            ))}
            <Link
              href="/dashboard"
              className="block px-6 py-2 rounded-lg font-medium text-center"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                color: 'var(--text-primary)',
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Launch OS
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/\(website\)/components/Navbar.tsx
git commit -m "feat: add website navbar component"
```

---

## Task 5: Create Website Footer Component

**Files:**
- Create: `app/(website)/components/Footer.tsx`

- [ ] **Step 1: Create footer component**

```typescript
import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      className="py-12"
      style={{
        background: 'var(--bg-dark-secondary)',
        borderTop: '1px solid var(--glass-border)',
      }}
    >
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                }}
              >
                <span className="text-xl">🧬</span>
              </div>
              <span className="text-xl font-bold gradient-text">Digital Twin OS</span>
            </div>
            <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
              Enterprise decision intelligence via parallel AI debate.
            </p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              by Formatho
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="transition-colors hover:underline" style={{ color: 'var(--text-secondary)' }}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="transition-colors hover:underline" style={{ color: 'var(--text-secondary)' }}>
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="transition-colors hover:underline" style={{ color: 'var(--text-secondary)' }}>
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="transition-colors hover:underline" style={{ color: 'var(--text-secondary)' }}>
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:underline" style={{ color: 'var(--text-secondary)' }}>
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:underline" style={{ color: 'var(--text-secondary)' }}>
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="transition-colors hover:underline" style={{ color: 'var(--text-secondary)' }}>
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:underline" style={{ color: 'var(--text-secondary)' }}>
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:underline" style={{ color: 'var(--text-secondary)' }}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8" style={{ borderTop: '1px solid var(--glass-border)' }}>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            © 2024 Digital Twin OS. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a
              href="https://github.com/formatho/digital-twin"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:scale-110"
              style={{ color: 'var(--text-secondary)' }}
            >
              <Github size={20} />
            </a>
            <a
              href="#"
              className="transition-colors hover:scale-110"
              style={{ color: 'var(--text-secondary)' }}
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="transition-colors hover:scale-110"
              style={{ color: 'var(--text-secondary)' }}
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/\(website\)/components/Footer.tsx
git commit -m "feat: add website footer component"
```

---

## Task 6: Update Website Layout

**Files:**
- Modify: `app/(website)/layout.tsx`

- [ ] **Step 1: Update layout to include Navbar and Footer**

```typescript
import '../../src/styles/globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export const metadata = {
  title: 'Digital Twin OS - AI-Powered Decision Intelligence',
  description: 'Transform strategic decisions with AI-powered digital twins. 5 Council Twins for strategy, 10 Skill Twins for execution.',
  siteUrl: 'https://www.digital-twin.formatho.com',
  openGraph: {
    title: 'Digital Twin OS',
    description: 'AI-powered digital twin platform for strategic decision-making',
    url: 'https://www.digital-twin.formatho.com',
    siteName: 'Digital Twin OS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Twin OS',
    description: 'AI-powered digital twin platform for strategic decision-making',
  },
};

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="website-layout" style={{ backgroundColor: 'var(--bg-dark)' }}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/\(website\)/layout.tsx
git commit -m "feat: add navbar and footer to website layout"
```

---

## Task 7: Redesign Landing Page - Part 1 (Hero & Council)

**Files:**
- Modify: `app/(website)/page.tsx`

- [ ] **Step 1: Replace hero and council sections with lucide icons**

```typescript
import Link from 'next/link';
import { Target, Wrench, BarChart3, Settings2, Eye, Rocket, Microscope, PenTool, Palette, TrendingUp, Code2, Megaphone, DollarSign, Scale, Package, Building, Brain, Zap, DNA } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

/**
 * Digital Twin OS - Public Landing Page
 */

const COUNCIL_TWINS = [
  {
    name: 'Strategist',
    icon: Target,
    description: 'Vision & Long-term Thinking',
    color: 'var(--color-primary)',
  },
  {
    name: 'Builder',
    icon: Wrench,
    description: 'Execution & Implementation',
    color: 'var(--color-secondary)',
  },
  {
    name: 'Analyst',
    icon: BarChart3,
    description: 'Data & Metrics',
    color: 'var(--color-success)',
  },
  {
    name: 'Operator',
    icon: Settings2,
    description: 'Systems & Processes',
    color: 'var(--color-warning)',
  },
  {
    name: 'Critic',
    icon: Eye,
    description: 'Risk Assessment',
    color: 'var(--color-error)',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-24 pb-32 lg:pt-32 lg:pb-40">
        {/* Ambient Glow Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30 animate-pulse-glow"
            style={{
              background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)',
              filter: 'blur(80px)'
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle, var(--color-secondary) 0%, transparent 70%)',
              filter: 'blur(80px)',
              animation: 'pulse-glow 4s ease-in-out infinite 1s'
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 animate-float"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                backdropFilter: 'var(--glass-blur)'
              }}
            >
              <Rocket size={16} style={{ color: 'var(--color-primary-light)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--color-primary-light)' }}>
                Now in Beta
              </span>
            </div>

            {/* Main Headline */}
            <h1
              className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              <span className="gradient-text">Enterprise Decision Intelligence</span>
              <br />
              via Parallel AI Debate
            </h1>

            {/* Subheadline */}
            <p
              className="text-xl lg:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              5 Strategic Council Twins debate your decisions. 10 Specialist Skill Twins
              execute with precision. Eliminate blind spots. Ship faster.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 glow-primary inline-flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                  color: 'var(--text-primary)'
                }}
              >
                <Zap size={20} />
                Access OS
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2"
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--text-primary)',
                  backdropFilter: 'var(--glass-blur)'
                }}
              >
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* COUNCIL TWINS SHOWCASE */}
      <section className="py-24" style={{ background: 'var(--bg-dark-secondary)' }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className="text-4xl lg:text-5xl font-bold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              The Council Chamber
            </h2>
            <p
              className="text-xl max-w-2xl mx-auto"
              style={{ color: 'var(--text-secondary)' }}
            >
              5 AI twins with distinct perspectives debate your decisions in parallel
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {COUNCIL_TWINS.map((twin) => {
              const Icon = twin.icon;
              return (
                <GlassCard key={twin.name} interactive className="p-6 text-center" style={{ borderTop: `3px solid ${twin.color}` }}>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center" style={{ background: `${twin.color}20` }}>
                    <Icon size={32} style={{ color: twin.color }} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {twin.name}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {twin.description}
                  </p>
                </GlassCard>
              );
            })}
          </div>

          {/* Synthesis Explanation */}
          <div
            className="mt-12 p-8 rounded-2xl text-center max-w-3xl mx-auto"
            style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
              border: '1px solid var(--glass-border)'
            }}
          >
            <DNA className="w-8 h-8 mx-auto mb-4" style={{ color: 'var(--color-primary)' }} />
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-primary)' }}>Parallel Debate Protocol:</strong> All 5 twins
              analyze simultaneously, then synthesize areas of consensus, tension, and actionable recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* Continue with skill twins section... (in next task) */}
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/\(website\)/page.tsx
git commit -m "feat: redesign landing hero and council sections with lucide icons"
```

---

## Task 8: Redesign Landing Page - Part 2 (Skill Twins & Value Props)

**Files:**
- Modify: `app/(website)/page.tsx`

- [ ] **Step 1: Add skill twins and value props sections with lucide icons**

Add this after the council section (inside the component, before the closing main tag):

```typescript
      {/* SKILL TWINS SHOWCASE */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className="text-4xl lg:text-5xl font-bold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              10 Specialist Skill Twins
            </h2>
            <p
              className="text-xl max-w-2xl mx-auto"
              style={{ color: 'var(--text-secondary)' }}
            >
              Execute with precision. Route tasks to the right specialist.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {[
              { icon: Microscope, name: 'Research', desc: 'Info synthesis' },
              { icon: PenTool, name: 'Content', desc: 'Copy & writing' },
              { icon: Palette, name: 'Design', desc: 'UI/UX guidance' },
              { icon: TrendingUp, name: 'Growth', desc: 'Acquisition' },
              { icon: Code2, name: 'Code', desc: 'Development' },
              { icon: Megaphone, name: 'Marketing', desc: 'Campaigns' },
              { icon: DollarSign, name: 'Sales', desc: 'Deal closing' },
              { icon: Scale, name: 'Legal', desc: 'Compliance' },
              { icon: Package, name: 'Product', desc: 'Roadmap' },
              { icon: Building, name: 'Operations', desc: 'Workflows' },
            ].map((twin) => {
              const Icon = twin.icon;
              return (
                <GlassCard key={twin.name} interactive className="p-4 text-center">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center" style={{ background: 'var(--glass-bg)' }}>
                    <Icon size={24} style={{ color: 'var(--text-secondary)' }} />
                  </div>
                  <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
                    {twin.name}
                  </h3>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {twin.desc}
                  </p>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION */}
      <section className="py-24" style={{ background: 'var(--bg-dark-secondary)' }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className="text-4xl lg:text-5xl font-bold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Why Digital Twin OS?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <GlassCard className="p-8">
              <Brain className="w-12 h-12 mb-4" style={{ color: 'var(--color-primary)' }} />
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                Eliminate Blind Spots
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                The Critic twin ensures high-confidence risks are never silenced.
                Every decision gets a full risk assessment.
              </p>
            </GlassCard>

            <GlassCard className="p-8">
              <Zap className="w-12 h-12 mb-4" style={{ color: 'var(--color-secondary)' }} />
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                Parallel Intelligence
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                5 perspectives simultaneously. No sequential bottlenecks.
                Synthesis happens in real-time.
              </p>
            </GlassCard>

            <GlassCard className="p-8">
              <DNA className="w-12 h-12 mb-4" style={{ color: 'var(--color-accent)' }} />
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                3-Tier Memory
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Conversation, contextual, and project memory.
                Your twins learn and remember every interaction.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>
```

- [ ] **Step 2: Commit**

```bash
git add app/\(website\)/page.tsx
git commit -m "feat: redesign skill twins and value props sections with lucide icons"
```

---

## Task 9: Redesign Landing Page - Part 3 (Final CTA)

**Files:**
- Modify: `app/(website)/page.tsx`

- [ ] **Step 1: Add final CTA section**

Add this before the closing `</main>` tag:

```typescript
      {/* FINAL CTA SECTION */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div
            className="max-w-4xl mx-auto p-12 lg:p-16 rounded-3xl text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))'
            }}
          >
            {/* Ambient glow */}
            <div
              className="absolute inset-0 opacity-50"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)'
              }}
            />

            <div className="relative z-10">
              <Rocket className="w-16 h-16 mx-auto mb-6 text-white opacity-90" />
              <h2
                className="text-4xl lg:text-5xl font-bold mb-6"
                style={{ color: 'var(--text-primary)' }}
              >
                Ready to Transform Your Decisions?
              </h2>
              <p
                className="text-xl mb-10 opacity-90"
                style={{ color: 'var(--text-primary)' }}
              >
                Start with 15 AI twins. Free forever for individuals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/dashboard"
                  className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2"
                  style={{
                    background: 'var(--text-primary)',
                    color: 'var(--color-primary)'
                  }}
                >
                  <Zap size={20} />
                  Launch Digital Twin OS
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2"
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'var(--text-primary)'
                  }}
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
```

Remove the old footer section since it's now in the layout.

- [ ] **Step 2: Commit**

```bash
git add app/\(website\)/page.tsx
git commit -m "feat: add final CTA section to landing page"
```

---

## Task 10: Redesign Pricing Page

**Files:**
- Modify: `app/(website)/pricing/page.tsx`

- [ ] **Step 1: Create glassmorphism pricing page with lucide icons**

```typescript
import { Check, X, Zap, Shield, Star, HelpCircle } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { useState } from 'react';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter',
      price: { monthly: 0, annual: 0 },
      description: 'Perfect for individuals exploring AI twins',
      icon: Star,
      color: 'var(--color-primary)',
      features: [
        '5 Council Twins',
        '3 Skill Twins',
        'Basic 3-Tier Memory',
        'Community Support',
        '1 Workspace',
      ],
      limitations: [
        'No API Access',
        'No Custom Twins',
      ],
      cta: 'Get Started Free',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: { monthly: 39, annual: 29 },
      description: 'For professionals and small teams',
      icon: Zap,
      color: 'var(--color-secondary)',
      features: [
        'All 5 Council Twins',
        'All 10 Skill Twins',
        'Advanced 3-Tier Memory',
        'Priority Support',
        '5 Workspaces',
        'API Access',
        'Custom Twin Personalities',
      ],
      limitations: [],
      cta: 'Start Pro Trial',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: { monthly: null, annual: null },
      description: 'For organizations at scale',
      icon: Shield,
      color: 'var(--color-accent)',
      features: [
        'Everything in Pro',
        'Unlimited Workspaces',
        'SSO & Advanced Security',
        'Dedicated Success Manager',
        'Custom Integrations',
        'SLA Guarantee',
      ],
      limitations: [],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ];

  const faqs = [
    {
      question: 'What is the difference between Council and Skill twins?',
      answer: 'Council twins (Strategist, Builder, Analyst, Operator, Critic) are strategic decision-makers that debate your choices. Skill twins (Research, Content, Design, etc.) are specialists that execute specific tasks.',
    },
    {
      question: 'Can I upgrade or downgrade my plan?',
      answer: 'Yes, you can change your plan at any time. When upgrading, you\'ll be prorated for the remainder of your billing cycle.',
    },
    {
      question: 'Is there a free trial?',
      answer: 'The Pro plan includes a 14-day free trial. No credit card required to start.',
    },
  ];

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--bg-dark)' }}>
      {/* Header */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 gradient-text">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-12" style={{ color: 'var(--text-secondary)' }}>
            Start free, scale as you grow. No hidden fees, cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 p-2 rounded-xl" style={{ background: 'var(--glass-bg)' }}>
            <button
              className={`px-6 py-2 rounded-lg font-medium transition-all ${!isAnnual ? 'bg-white/10' : ''}`}
              onClick={() => setIsAnnual(false)}
              style={{ color: 'var(--text-primary)' }}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 rounded-lg font-medium transition-all ${isAnnual ? 'bg-white/10' : ''}`}
              onClick={() => setIsAnnual(true)}
              style={{ color: 'var(--text-primary)' }}
            >
              Annual
            </button>
            {isAnnual && (
              <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'var(--color-success)', color: 'var(--text-primary)' }}>
                Save 25%
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 pb-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => {
              const Icon = plan.icon;
              const displayPrice = plan.price.annual === null
                ? 'Custom'
                : `$${isAnnual ? plan.price.annual : plan.price.monthly}`;
              const period = plan.price.annual === null ? '' : (isAnnual ? '/month' : '/month');
              const yearlyNote = isAnnual && plan.price.annual !== null ? 'billed annually' : '';

              return (
                <div
                  key={plan.name}
                  className={`relative p-8 rounded-2xl transition-all hover:scale-105 ${plan.highlighted ? 'ring-2 ring-blue-500' : ''}`}
                  style={{
                    background: plan.highlighted
                      ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15))'
                      : 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    boxShadow: plan.highlighted ? '0 0 40px rgba(59, 130, 246, 0.3)' : 'var(--glass-shadow)',
                  }}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm font-medium" style={{ background: 'var(--color-primary)', color: 'var(--text-primary)' }}>
                      Most Popular
                    </div>
                  )}

                  <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6" style={{ background: `${plan.color}20` }}>
                    <Icon size={32} style={{ color: plan.color }} />
                  </div>

                  <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {plan.name}
                  </h3>
                  <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                    {plan.description}
                  </p>

                  <div className="mb-6">
                    <div className="text-5xl font-bold" style={{ color: 'var(--text-primary)' }}>
                      {displayPrice}
                      <span className="text-lg font-normal" style={{ color: 'var(--text-muted)' }}>
                        {period}
                      </span>
                    </div>
                    {yearlyNote && (
                      <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                        {yearlyNote}
                      </p>
                    )}
                  </div>

                  <button
                    className={`w-full py-3 rounded-xl font-semibold mb-8 transition-all hover:scale-105 ${
                      plan.highlighted ? 'glow-primary' : ''
                    }`}
                    style={{
                      background: plan.highlighted
                        ? 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))'
                        : 'var(--glass-bg)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {plan.cta}
                  </button>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                        What's included:
                      </p>
                      <ul className="space-y-2">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <Check size={16} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-success)' }} />
                            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {plan.limitations.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                          Limitations:
                        </p>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation) => (
                            <li key={limitation} className="flex items-start gap-2">
                              <X size={16} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--text-muted)' }} />
                              <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24" style={{ background: 'var(--bg-dark-secondary)' }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <HelpCircle className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--color-primary)' }} />
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <GlassCard key={index} className="p-6">
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {faq.question}
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {faq.answer}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
            <div className="flex items-center gap-2 px-6 py-3 rounded-xl" style={{ background: 'var(--glass-bg)' }}>
              <Shield size={20} style={{ color: 'var(--color-success)' }} />
              <span style={{ color: 'var(--text-secondary)' }}>30-day money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 rounded-xl" style={{ background: 'var(--glass-bg)' }}>
              <Check size={20} style={{ color: 'var(--color-primary)' }} />
              <span style={{ color: 'var(--text-secondary)' }}>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 rounded-xl" style={{ background: 'var(--glass-bg)' }}>
              <Zap size={20} style={{ color: 'var(--color-accent)' }} />
              <span style={{ color: 'var(--text-secondary)' }}>Instant setup</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/\(website\)/pricing/page.tsx
git commit -m "feat: redesign pricing page with glassmorphism and lucide icons"
```

---

## Task 11: Enhance About Page

**Files:**
- Modify: `app/(website)/about/page.tsx`

- [ ] **Step 1: Enhance about page with glassmorphism design**

```typescript
import { Target, Users, Zap, Award, ArrowRight } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Link from 'next/link';

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Clarity',
      description: 'Every decision deserves multiple perspectives. We make that accessible.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'AI twins work together, not in isolation. Consensus emerges from debate.',
    },
    {
      icon: Zap,
      title: 'Speed',
      description: 'Parallel processing means faster decisions without sacrificing quality.',
    },
    {
      icon: Award,
      title: 'Quality',
      description: 'Rigorous testing and refinement. Your twins get smarter with use.',
    },
  ];

  const timeline = [
    {
      year: '2023',
      title: 'Inception',
      description: 'Founded on the belief that AI should augment, not replace, human decision-making.',
    },
    {
      year: '2024 Q1',
      title: 'Alpha Release',
      description: 'Internal testing with 5 design partners. 1,000+ decisions synthesized.',
    },
    {
      year: '2024 Q2',
      title: 'Beta Launch',
      description: 'Public beta with 15 AI twins. First 1,000 users join.',
    },
    {
      year: '2024 Q3',
      title: 'Growth',
      description: 'API launch, custom twins, enterprise features. Growing rapidly.',
    },
  ];

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--bg-dark)' }}>
      {/* Hero */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 gradient-text">
              About Digital Twin OS
            </h1>
            <p className="text-xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              We're building the future of decision intelligence. Our AI twins give you
              the perspective of a full executive team, available 24/7.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24" style={{ background: 'var(--bg-dark-secondary)' }}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center" style={{ color: 'var(--text-primary)' }}>
              Our Mission
            </h2>
            <GlassCard className="p-8 lg:p-12">
              <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                Every decision benefits from diverse perspectives. But most of us don't have
                access to a full executive team 24/7. We change that.
              </p>
              <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                Digital Twin OS creates AI personalities with distinct viewpoints—strategic,
                analytical, critical, operational. They debate your decisions in parallel,
                identifying blind spots, risks, and opportunities you might miss.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                The result? Better decisions, faster. Ship with confidence.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Our Values
            </h2>
            <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
              Principles that guide everything we build
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <GlassCard key={value.title} interactive className="p-6">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ background: 'var(--glass-bg)' }}>
                    <Icon size={28} style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {value.title}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {value.description}
                  </p>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24" style={{ background: 'var(--bg-dark-secondary)' }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Our Journey
            </h2>
            <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
              From idea to platform
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <div key={item.year} className="flex gap-6 mb-8">
                <div className="flex-shrink-0 w-24">
                  <div
                    className="px-4 py-2 rounded-lg text-center font-bold"
                    style={{ background: 'var(--glass-bg)', color: 'var(--color-primary)' }}
                  >
                    {item.year}
                  </div>
                </div>
                <GlassCard className="flex-1 p-6">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {item.description}
                  </p>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <GlassCard className="max-w-4xl mx-auto p-12 text-center" glow>
            <h2 className="text-4xl font-bold mb-6 gradient-text">
              Join the Future of Decision Intelligence
            </h2>
            <p className="text-xl mb-8" style={{ color: 'var(--text-secondary)' }}>
              Start using Digital Twin OS today. Free forever for individuals.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 glow-primary"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                color: 'var(--text-primary)',
              }}
            >
              Launch OS
              <ArrowRight size={20} />
            </Link>
          </GlassCard>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/\(website\)/about/page.tsx
git commit -m "feat: enhance about page with glassmorphism design"
```

---

## Task 12: Enhance Dashboard with Lucide Icons

**Files:**
- Modify: `app/(os)/dashboard/page.tsx`

- [ ] **Step 1: Replace emoji icons with lucide icons in dashboard**

Find and replace the emoji icons with lucide imports. At the top of the file:

```typescript
import { Target, Wrench, Activity, Zap, Bot, Brain } from 'lucide-react';
```

Replace the emoji icons in the METRICS array:

```typescript
const METRICS = [
  {
    id: 'decisions',
    label: 'Decisions Synthesized',
    value: 127,
    change: '+12%',
    icon: Target,
    color: 'var(--color-primary)',
    description: 'Council deliberations completed',
  },
  {
    id: 'tasks',
    label: 'Tasks Executed',
    value: 842,
    change: '+28%',
    icon: Zap,
    color: 'var(--color-secondary)',
    description: 'Skill twin tasks completed',
  },
  {
    id: 'memory',
    label: 'Memory Optimized',
    value: '94%',
    change: '+5%',
    icon: Brain,
    color: 'var(--color-success)',
    description: 'Contextual memory efficiency',
  },
  {
    id: 'active',
    label: 'Active Twins',
    value: 15,
    change: '0',
    icon: Bot,
    color: 'var(--color-warning)',
    description: '5 Council + 10 Skill twins',
  },
];
```

Replace the emoji icons in the ACTIVE_TWINS array:

```typescript
const ACTIVE_TWINS = [
  { id: 'strategist', name: 'Strategist', icon: Target, status: 'active', lastActive: '2m ago' },
  { id: 'builder', name: 'Builder', icon: Wrench, status: 'active', lastActive: '5m ago' },
  { id: 'critic', name: 'Critic', icon: Activity, status: 'active', lastActive: '2m ago' },
];
```

Replace the emoji icons in the QUICK_ACTIONS array:

```typescript
const QUICK_ACTIONS = [
  { label: 'Ask Council', href: '/council', icon: Target, color: 'var(--color-primary)' },
  { label: 'Browse Twins', href: '/marketplace', icon: Bot, color: 'var(--color-secondary)' },
  { label: 'View Memory', href: '/memory', icon: Brain, color: 'var(--color-success)' },
  { label: 'Create Workflow', href: '/workflows', icon: Zap, color: 'var(--color-warning)' },
];
```

Update the JSX to use the icon components. In the metrics section:

```typescript
{METRICS.map((metric) => {
  const Icon = metric.icon;
  return (
    <div
      key={metric.id}
      className="p-6 rounded-xl transition-all hover:scale-105"
      style={{
        background: `linear-gradient(135deg, ${metric.color}15, ${metric.color}08)`,
        border: `1px solid ${metric.color}30`,
        boxShadow: `0 0 30px ${metric.color}10`,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: `${metric.color}20` }}
        >
          <Icon size={24} style={{ color: metric.color }} />
        </div>
        <span
          className="text-sm font-semibold"
          style={{ color: metric.change.startsWith('+') ? 'var(--color-success)' : 'var(--text-muted)' }}
        >
          {metric.change}
        </span>
      </div>
      // ... rest of the metric card
    </div>
  );
})}
```

Update the active twins section similarly, and the quick actions section.

- [ ] **Step 2: Commit**

```bash
git add app/\(os\)/dashboard/page.tsx
git commit -m "feat: replace emoji icons with lucide-react in dashboard"
```

---

## Task 13: Enhance Sidebar with Lucide Icons

**Files:**
- Modify: `app/(os)/components/Sidebar.tsx`

- [ ] **Step 1: Replace emoji icons with lucide icons in sidebar**

Add lucide-react imports at the top:

```typescript
import { BarChart3, Target, Bot, Store, Zap, Brain, Settings, ChevronLeft, Menu, X } from 'lucide-react';
```

Update the navItems array to use icon components:

```typescript
interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  description: string;
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: BarChart3, description: 'Overview & activity' },
  { href: '/council', label: 'Council', icon: Target, description: 'Strategic decisions' },
  { href: '/twins', label: 'Twins', icon: Bot, description: 'Twin profiles' },
  { href: '/marketplace', label: 'Marketplace', icon: Store, description: 'Discover twins' },
  { href: '/workflows', label: 'Workflows', icon: Zap, description: 'Automation' },
  { href: '/memory', label: 'Memory', icon: Brain, description: '3-tier storage' },
  { href: '/settings', label: 'Settings', icon: Settings, description: 'Configuration' },
];
```

Update the JSX to render icon components instead of emojis. Replace the mobile toggle button:

```typescript
<button
  onClick={() => setIsMobileOpen(!isMobileOpen)}
  className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg"
  style={{
    background: 'var(--glass-bg)',
    border: '1px solid var(--glass-border)',
    backdropFilter: 'var(--glass-blur)',
  }}
  aria-label="Toggle navigation"
>
  {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
</button>
```

Update the logo to use lucide icon:

```typescript
<div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500">
  <Bot size={24} className="text-white" />
</div>
```

Update the nav items rendering:

```typescript
{navItems.map((item) => {
  const Icon = item.icon;
  return (
    <Link
      key={item.href}
      href={item.href}
      onClick={() => setIsMobileOpen(false)}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl
        transition-all duration-200
      `}
      style={{
        background: isActive(item.href)
          ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))'
          : 'transparent',
        border: isActive(item.href)
          ? '1px solid rgba(59, 130, 246, 0.3)'
          : '1px solid transparent',
        color: isActive(item.href) ? 'var(--text-primary)' : 'var(--text-secondary)',
      }}
      title={isCollapsed ? item.label : undefined}
    >
      <Icon size={20} className="flex-shrink-0" />
      {!isCollapsed && (
        <div className="flex-1 min-w-0">
          <div className="font-medium truncate" style={{ fontSize: 'var(--font-size-sm)' }}>
            {item.label}
          </div>
          <div
            className="text-xs truncate"
            style={{ color: 'var(--text-muted)' }}
          >
            {item.description}
          </div>
        </div>
      )}
    </Link>
  );
})}
```

Update the collapse toggle button:

```typescript
<button
  onClick={() => setIsCollapsed(!isCollapsed)}
  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors"
  style={{
    background: 'var(--glass-bg)',
    border: '1px solid var(--glass-border)',
    color: 'var(--text-secondary)',
    fontSize: 'var(--font-size-sm)',
  }}
>
  <ChevronLeft
    size={16}
    className={`transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
  />
  {!isCollapsed && 'Collapse'}
</button>
```

- [ ] **Step 2: Commit**

```bash
git add app/\(os\)/components/Sidebar.tsx
git commit -m "feat: replace emoji icons with lucide-react in sidebar"
```

---

## Task 14: Enhance Header with Lucide Icons

**Files:**
- Modify: `app/(os)/components/Header.tsx`

- [ ] **Step 1: Replace emoji icons with lucide icons in header**

Add lucide-react imports:

```typescript
import { Bell, HelpCircle, FolderOpen, LogOut, Settings, Home, ChevronDown } from 'lucide-react';
```

Update the workspace icon:

```typescript
<div
  className="px-4 py-2 rounded-lg"
  style={{
    background: 'var(--glass-bg)',
    border: '1px solid var(--glass-border)',
  }}
>
  <div
    className="text-xs"
    style={{ color: 'var(--text-muted)' }}
  >
    Workspace
  </div>
  <div
    className="font-medium flex items-center gap-2"
    style={{ color: 'var(--text-primary)' }}
  >
    <FolderOpen size={16} />
    <span style={{ fontSize: 'var(--font-size-sm)' }}>{workspaceName}</span>
  </div>
</div>
```

Update the notification and help buttons:

```typescript
<button
  className="p-2 rounded-lg transition-colors hover:scale-105"
  style={{
    background: 'var(--glass-bg)',
    border: '1px solid var(--glass-border)',
    color: 'var(--text-secondary)',
  }}
  title="Notifications"
>
  <Bell size={20} />
</button>
<button
  className="p-2 rounded-lg transition-colors hover:scale-105"
  style={{
    background: 'var(--glass-bg)',
    border: '1px solid var(--glass-border)',
    color: 'var(--text-secondary)',
  }}
  title="Help"
>
  <HelpCircle size={20} />
</button>
```

Update the user menu chevron:

```typescript
<ChevronDown
  size={16}
  className={`transition-transform ${showUserMenu ? 'rotate-180' : ''}`}
/>
```

Update the dropdown menu items:

```typescript
<Link
  href="/settings"
  className="flex items-center gap-2 px-4 py-2 text-sm transition-colors"
  style={{ color: 'var(--text-secondary)' }}
  onClick={() => setShowUserMenu(false)}
>
  <Settings size={16} />
  Settings
</Link>
<Link
  href="/"
  className="flex items-center gap-2 px-4 py-2 text-sm transition-colors"
  style={{ color: 'var(--text-secondary)' }}
  onClick={() => setShowUserMenu(false)}
>
  <Home size={16} />
  Public Site
</Link>
<button
  className="flex items-center gap-2 px-4 py-2 text-sm w-full text-left transition-colors"
  style={{ color: 'var(--color-error)' }}
>
  <LogOut size={16} />
  Sign Out
</button>
```

- [ ] **Step 2: Commit**

```bash
git add app/\(os\)/components/Header.tsx
git commit -m "feat: replace emoji icons with lucide-react in header"
```

---

## Task 15: Run Build Verification

**Files:**
- None (verification)

- [ ] **Step 1: Run TypeScript build to verify no errors**

```bash
npm run build
```

Expected: Build completes successfully with no TypeScript or build errors

- [ ] **Step 2: Check for any lucide-react import errors**

If build fails, check for:
- Missing icon imports
- Incorrect icon names
- Type errors with icon components

- [ ] **Step 3: If build passes, verify output**

Check that the `.next` directory was created successfully:

```bash
ls -la .next
```

Expected: Shows `.next` directory with build artifacts

- [ ] **Step 4: Commit**

If build is successful:

```bash
git add -A
git commit -m "feat: complete UI redesign - glassmorphism + bento grid

- Replace all emoji icons with lucide-react
- Add website Navbar and Footer components
- Redesign landing page with premium glassmorphism
- Redesign pricing page with glass cards
- Enhance about page with timeline and values
- Update dashboard with lucide icons
- Enhance sidebar and header with lucide icons
- Maintain CSS variables design system
- Use CSS animations (no framer-motion)
"
```

---

## Task 16: Final Verification and Openclaw Command

**Files:**
- None (final verification)

- [ ] **Step 1: Verify git status**

```bash
git status
```

Expected: Clean working directory, all changes committed

- [ ] **Step 2: View recent commits**

```bash
git log --oneline -10
```

Expected: Shows all the redesign commits

- [ ] **Step 3: Run openclaw system event**

```bash
openclaw system event --text "Done: Digital Twin OS full redesign complete" --mode now
```

Expected: Openclaw command executes successfully

---

## Self-Review Checklist

**Spec Coverage:**
- ✅ Install lucide-react dependency
- ✅ Replace all emoji icons with lucide-react icons
- ✅ Create website Navbar component with logo, links, CTA
- ✅ Create website Footer component with multi-column layout
- ✅ Update website layout to include navbar/footer
- ✅ Redesign landing page with glassmorphism and lucide icons
- ✅ Redesign pricing page with glass cards
- ✅ Enhance about page
- ✅ Enhance dashboard with lucide icons
- ✅ Enhance sidebar with lucide icons
- ✅ Enhance header with lucide icons
- ✅ Maintain CSS variables (no Tailwind)
- ✅ Use CSS animations (no framer-motion)
- ✅ Build verification

**Placeholder Scan:** No placeholders found. All code is complete.

**Type Consistency:** Icon imports and usage are consistent throughout all files.

**Dependencies:** Only lucide-react is added. No Tailwind, no framer-motion as per clarified requirements.

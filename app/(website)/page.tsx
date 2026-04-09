import Link from 'next/link';
import {
  Rocket,
  Target,
  Wrench,
  BarChart3,
  Settings,
  AlertTriangle,
  Search,
  PenTool,
  Palette,
  TrendingUp,
  Code,
  Megaphone,
  DollarSign,
  Scale,
  Package,
  Building,
  CheckCircle2,
  Menu,
  X,
  ChevronRight,
  ArrowUpRight,
  Zap,
  Brain,
  Shield,
} from 'lucide-react';

/**
 * Digital Twin OS - Public Landing Page
 *
 * Premium SaaS landing page with glassmorphism design
 *
 * @module app/(website)/page
 */

export default function HomePage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--bg-dark)' }}>
      {/* ========================================
          STICKY NAVBAR
          ======================================== */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl border-b transition-all"
           style={{ background: 'rgba(15, 23, 42, 0.8)', borderColor: 'var(--glass-border)' }}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Rocket className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
              <span className="text-xl font-bold gradient-text">Digital Twin OS</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/about" className="text-sm font-medium hover:text-blue-400 transition-colors"
                    style={{ color: 'var(--text-secondary)' }}>
                About
              </Link>
              <Link href="/pricing" className="text-sm font-medium hover:text-blue-400 transition-colors"
                    style={{ color: 'var(--text-secondary)' }}>
                Pricing
              </Link>
              <a
                href="https://github.com/formatho/digital-twin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium hover:text-blue-400 transition-colors"
                style={{ color: 'var(--text-secondary)' }}
              >
                GitHub
              </a>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link
                href="/dashboard"
                className="px-6 py-2 rounded-lg font-semibold text-sm transition-all hover:scale-105 inline-flex items-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                  color: 'var(--text-primary)',
                }}
              >
                Launch OS <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                    style={{ color: 'var(--text-primary)' }}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* ========================================
          HERO SECTION
          ======================================== */}
      <section className="relative overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-30 animate-pulse-glow"
               style={{
                 background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)',
                 filter: 'blur(80px)',
               }} />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-30 animate-pulse-glow"
               style={{
                 background: 'radial-gradient(circle, var(--color-secondary) 0%, transparent 70%)',
                 filter: 'blur(80px)',
                 animationDelay: '1s',
               }} />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full opacity-20 animate-pulse-glow"
               style={{
                 background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)',
                 filter: 'blur(80px)',
                 animationDelay: '2s',
               }} />
        </div>

        <div className="container mx-auto px-6 py-24 lg:py-32 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Beta Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 glass-card">
              <Zap className="w-4 h-4" style={{ color: 'var(--color-warning)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--color-primary-light)' }}>
                Now in Beta
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
                style={{ color: 'var(--text-primary)' }}>
              <span className="gradient-text">Enterprise Decision Intelligence</span>
              <br />
              via Parallel AI Debate
            </h1>

            {/* Subheadline */}
            <p className="text-xl lg:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed"
               style={{ color: 'var(--text-secondary)' }}>
              5 Strategic Council Twins debate your decisions. 10 Specialist Skill Twins
              execute with precision. Eliminate blind spots. Ship faster.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2 glow-primary"
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                  color: 'var(--text-primary)',
                }}
              >
                <Rocket className="w-5 h-5" />
                Access OS
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 glass-card inline-flex items-center justify-center gap-2"
              >
                Request Demo
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          COUNCIL TWINS SHOWCASE
          ======================================== */}
      <section className="py-24" style={{ background: 'var(--bg-dark-secondary)' }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              The Council Chamber
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              5 AI twins with distinct perspectives debate your decisions in parallel
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {/* Strategist */}
            <div className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300 glass-card-interactive"
                 style={{ borderTop: '3px solid var(--color-primary)' }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
                   style={{ background: 'rgba(59, 130, 246, 0.2)' }}>
                <Target className="w-8 h-8" style={{ color: 'var(--color-primary)' }} />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Strategist
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Vision & Long-term Thinking
              </p>
            </div>

            {/* Builder */}
            <div className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300 glass-card-interactive"
                 style={{ borderTop: '3px solid var(--color-secondary)' }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
                   style={{ background: 'rgba(139, 92, 246, 0.2)' }}>
                <Wrench className="w-8 h-8" style={{ color: 'var(--color-secondary)' }} />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Builder
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Execution & Implementation
              </p>
            </div>

            {/* Analyst */}
            <div className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300 glass-card-interactive"
                 style={{ borderTop: '3px solid var(--color-success)' }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
                   style={{ background: 'rgba(16, 185, 129, 0.2)' }}>
                <BarChart3 className="w-8 h-8" style={{ color: 'var(--color-success)' }} />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Analyst
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Data & Metrics
              </p>
            </div>

            {/* Operator */}
            <div className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300 glass-card-interactive"
                 style={{ borderTop: '3px solid var(--color-warning)' }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
                   style={{ background: 'rgba(245, 158, 11, 0.2)' }}>
                <Settings className="w-8 h-8" style={{ color: 'var(--color-warning)' }} />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Operator
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Systems & Processes
              </p>
            </div>

            {/* Critic */}
            <div className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300 glass-card-interactive"
                 style={{ borderTop: '3px solid var(--color-error)' }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
                   style={{ background: 'rgba(239, 68, 68, 0.2)' }}>
                <AlertTriangle className="w-8 h-8" style={{ color: 'var(--color-error)' }} />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Critic
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Risk Assessment
              </p>
            </div>
          </div>

          {/* Synthesis Explanation */}
          <div className="mt-12 p-8 rounded-2xl text-center max-w-3xl mx-auto glass-card">
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-primary)' }}>Parallel Debate Protocol:</strong> All 5 twins
              analyze simultaneously, then synthesize areas of consensus, tension, and actionable recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================
          SKILL TWINS BENTO GRID
          ======================================== */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              10 Specialist Skill Twins
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Execute with precision. Route tasks to the right specialist.
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid md:grid-cols-5 gap-4 max-w-6xl mx-auto auto-rows-[120px]">
            {/* Large card - Research */}
            <div className="md:col-span-2 md:row-span-2 glass-card p-8 hover:scale-105 transition-transform duration-300 glass-card-interactive">
              <Search className="w-12 h-12 mb-4" style={{ color: 'var(--color-accent)' }} />
              <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Research</h3>
              <p className="text-base mb-4" style={{ color: 'var(--text-secondary)' }}>Information synthesis & competitive analysis</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(6, 182, 212, 0.2)', color: 'var(--color-accent)' }}>Market Research</span>
                <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(6, 182, 212, 0.2)', color: 'var(--color-accent)' }}>Competitor Analysis</span>
              </div>
            </div>

            {/* Code */}
            <div className="md:col-span-2 glass-card p-6 hover:scale-105 transition-transform duration-300 glass-card-interactive">
              <Code className="w-10 h-10 mb-3" style={{ color: 'var(--color-primary)' }} />
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Code</h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Development & Engineering</p>
            </div>

            {/* Design */}
            <div className="glass-card p-6 hover:scale-105 transition-transform duration-300 glass-card-interactive">
              <Palette className="w-10 h-10 mb-3" style={{ color: 'var(--color-secondary)' }} />
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Design</h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>UI/UX Guidance</p>
            </div>

            {/* Content */}
            <div className="glass-card p-6 hover:scale-105 transition-transform duration-300 glass-card-interactive">
              <PenTool className="w-10 h-10 mb-3" style={{ color: '#f472b6' }} />
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Content</h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Copy & Writing</p>
            </div>

            {/* Growth */}
            <div className="glass-card p-6 hover:scale-105 transition-transform duration-300 glass-card-interactive">
              <TrendingUp className="w-10 h-10 mb-3" style={{ color: '#34d399' }} />
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Growth</h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Acquisition</p>
            </div>

            {/* Marketing */}
            <div className="glass-card p-6 hover:scale-105 transition-transform duration-300 glass-card-interactive">
              <Megaphone className="w-10 h-10 mb-3" style={{ color: '#fb923c' }} />
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Marketing</h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Campaigns</p>
            </div>

            {/* Sales */}
            <div className="glass-card p-6 hover:scale-105 transition-transform duration-300 glass-card-interactive">
              <DollarSign className="w-10 h-10 mb-3" style={{ color: '#fbbf24' }} />
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Sales</h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Deal Closing</p>
            </div>

            {/* Legal */}
            <div className="glass-card p-6 hover:scale-105 transition-transform duration-300 glass-card-interactive">
              <Scale className="w-10 h-10 mb-3" style={{ color: '#f87171' }} />
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Legal</h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Compliance</p>
            </div>

            {/* Product */}
            <div className="glass-card p-6 hover:scale-105 transition-transform duration-300 glass-card-interactive">
              <Package className="w-10 h-10 mb-3" style={{ color: '#c084fc' }} />
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Product</h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Roadmap</p>
            </div>

            {/* Operations */}
            <div className="glass-card p-6 hover:scale-105 transition-transform duration-300 glass-card-interactive">
              <Building className="w-10 h-10 mb-3" style={{ color: '#38bdf8' }} />
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Operations</h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Workflows</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          VALUE PROPOSITION
          ======================================== */}
      <section className="py-24" style={{ background: 'var(--bg-dark-secondary)' }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Why Digital Twin OS?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="glass-card p-8 hover:scale-105 transition-transform duration-300 glass-card-interactive">
              <div className="w-16 h-16 mb-6 rounded-xl flex items-center justify-center"
                   style={{ background: 'rgba(59, 130, 246, 0.2)' }}>
                <Shield className="w-8 h-8" style={{ color: 'var(--color-primary)' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                Eliminate Blind Spots
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                The Critic twin ensures high-confidence risks are never silenced.
                Every decision gets a full risk assessment.
              </p>
            </div>

            <div className="glass-card p-8 hover:scale-105 transition-transform duration-300 glass-card-interactive">
              <div className="w-16 h-16 mb-6 rounded-xl flex items-center justify-center"
                   style={{ background: 'rgba(139, 92, 246, 0.2)' }}>
                <Zap className="w-8 h-8" style={{ color: 'var(--color-secondary)' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                Parallel Intelligence
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                5 perspectives simultaneously. No sequential bottlenecks.
                Synthesis happens in real-time.
              </p>
            </div>

            <div className="glass-card p-8 hover:scale-105 transition-transform duration-300 glass-card-interactive">
              <div className="w-16 h-16 mb-6 rounded-xl flex items-center justify-center"
                   style={{ background: 'rgba(16, 185, 129, 0.2)' }}>
                <Brain className="w-8 h-8" style={{ color: 'var(--color-success)' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                3-Tier Memory
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Conversation, contextual, and project memory.
                Your twins learn and remember every interaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          HOW IT WORKS
          ======================================== */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              How It Works
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              From idea to execution in minutes
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {[
              {
                step: '01',
                title: 'Describe Your Vision',
                description: 'Tell the AI Project Builder what you want to create. The more detail, the better the council can advise.',
                icon: Rocket,
              },
              {
                step: '02',
                title: 'Council Debate',
                description: '5 Council Twins with distinct perspectives analyze your request in parallel, identifying opportunities and risks.',
                icon: Target,
              },
              {
                step: '03',
                title: 'Review & Approve',
                description: 'Review the Business Requirements Document, Architecture Diagram, and Agent list. Approve, modify, or reject.',
                icon: CheckCircle2,
              },
              {
                step: '04',
                title: 'Automatic Execution',
                description: 'Skill Twins activate with specific tasks. Watch real-time progress as your project builds itself.',
                icon: Code,
              },
            ].map((item, idx) => (
              <div key={idx} className="relative mb-12 last:mb-0">
                <div className="flex gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
                         style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}>
                      <item.icon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <div className="text-sm font-mono mb-2" style={{ color: 'var(--color-primary)' }}>
                      {item.step}
                    </div>
                    <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                      {item.title}
                    </h3>
                    <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                      {item.description}
                    </p>
                  </div>
                </div>
                {idx < 3 && (
                  <div className="absolute left-10 top-20 w-0.5 h-16 -z-10"
                       style={{ background: 'linear-gradient(to bottom, var(--color-primary), transparent)' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          FINAL CTA SECTION
          ======================================== */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto p-12 lg:p-16 rounded-3xl text-center relative overflow-hidden"
               style={{
                 background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
               }}>
            {/* Ambient glow */}
            <div className="absolute inset-0 opacity-50"
                 style={{
                   background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)',
                 }} />

            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                Ready to Transform Your Decisions?
              </h2>
              <p className="text-xl mb-10 opacity-90" style={{ color: 'var(--text-primary)' }}>
                Start with 15 AI twins. Free forever for individuals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/dashboard"
                  className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2"
                  style={{
                    background: 'var(--text-primary)',
                    color: 'var(--color-primary)',
                  }}
                >
                  <Rocket className="w-5 h-5" />
                  Launch Digital Twin OS
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2"
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'var(--text-primary)',
                  }}
                >
                  Learn More
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          FOOTER
          ======================================== */}
      <footer className="py-16" style={{ background: 'var(--bg-dark-secondary)', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Rocket className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
                <span className="text-xl font-bold gradient-text">Digital Twin OS</span>
              </Link>
              <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                Enterprise Decision Intelligence via Parallel AI Debate
              </p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                by Formatho
              </p>
            </div>

            {/* Product Column */}
            <div>
              <h4 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Product</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/dashboard" className="text-sm hover:text-blue-400 transition-colors"
                        style={{ color: 'var(--text-secondary)' }}>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-sm hover:text-blue-400 transition-colors"
                        style={{ color: 'var(--text-secondary)' }}>
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/twins" className="text-sm hover:text-blue-400 transition-colors"
                        style={{ color: 'var(--text-secondary)' }}>
                    AI Twins
                  </Link>
                </li>
                <li>
                  <Link href="/workflows" className="text-sm hover:text-blue-400 transition-colors"
                        style={{ color: 'var(--text-secondary)' }}>
                    Workflows
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h4 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Resources</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/docs" className="text-sm hover:text-blue-400 transition-colors"
                        style={{ color: 'var(--text-secondary)' }}>
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm hover:text-blue-400 transition-colors"
                        style={{ color: 'var(--text-secondary)' }}>
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm hover:text-blue-400 transition-colors"
                        style={{ color: 'var(--text-secondary)' }}>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-sm hover:text-blue-400 transition-colors"
                        style={{ color: 'var(--text-secondary)' }}>
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Company</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://github.com/formatho/digital-twin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-blue-400 transition-colors flex items-center gap-2"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <Code className="w-4 h-4" />
                    GitHub
                  </a>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm hover:text-blue-400 transition-colors"
                        style={{ color: 'var(--text-secondary)' }}>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm hover:text-blue-400 transition-colors"
                        style={{ color: 'var(--text-secondary)' }}>
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm hover:text-blue-400 transition-colors"
                        style={{ color: 'var(--text-secondary)' }}>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
               style={{ borderColor: 'var(--glass-border)' }}>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              © 2024 Digital Twin OS. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="https://github.com/formatho/digital-twin"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="hover:text-blue-400 transition-colors"
                 style={{ color: 'var(--text-muted)' }}>
                <Code className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

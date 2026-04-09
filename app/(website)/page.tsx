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
 * Light theme matching formatho.com design
 *
 * @module app/(website)/page
 */

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ========================================
          STICKY NAVBAR
          ======================================== */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <Rocket className="w-6 h-6 text-blue-600 transition-transform group-hover:scale-110" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Digital Twin OS
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors rounded-lg py-2 px-3">
                About
              </Link>
              <Link href="/pricing" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors rounded-lg py-2 px-3">
                Pricing
              </Link>
              <a
                href="https://github.com/formatho/digital-twin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors rounded-lg py-2 px-3"
              >
                <Code className="w-4 h-4" />
                GitHub
              </a>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link
                href="/dashboard"
                className="px-6 py-2 rounded-lg font-semibold text-sm bg-blue-600 text-white transition-all hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-lg inline-flex items-center gap-2"
              >
                Launch OS <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* ========================================
          HERO SECTION
          ======================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-24 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            {/* Beta Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 bg-blue-50 border border-blue-200">
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-blue-700">
                Now in Beta
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight text-gray-900">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Digital Twin OS
              </span>
              <br />
              Enterprise Decision Intelligence
            </h1>

            {/* Subheadline */}
            <p className="text-xl lg:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed text-gray-600">
              5 Strategic Council Twins debate your decisions. 10 Specialist Skill Twins
              execute with precision. Eliminate blind spots. Ship faster.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="px-8 py-4 rounded-xl font-semibold text-lg bg-blue-600 text-white transition-all hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-lg inline-flex items-center justify-center gap-2"
              >
                <Rocket className="w-5 h-5" />
                Access OS
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-4 rounded-xl font-semibold text-lg bg-white text-gray-700 border border-gray-300 transition-all hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-md inline-flex items-center justify-center gap-2"
              >
                Request Demo
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Stats Bar */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">15</div>
                <div className="text-sm text-gray-600">AI Twins</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">5</div>
                <div className="text-sm text-gray-600">Council Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-600 mb-1">10</div>
                <div className="text-sm text-gray-600">Specialists</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">∞</div>
                <div className="text-sm text-gray-600">Privacy-First</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          HOW IT WORKS
          ======================================== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              How It Works
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-gray-600">
              From idea to execution in minutes
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              {
                step: '01',
                title: 'Describe Your Vision',
                description: 'Tell the AI Project Builder what you want to create. The more detail, the better the council can advise.',
                icon: Rocket,
                color: 'blue',
              },
              {
                step: '02',
                title: 'Council Debate',
                description: '5 Council Twins with distinct perspectives analyze your request in parallel, identifying opportunities and risks.',
                icon: Target,
                color: 'purple',
              },
              {
                step: '03',
                title: 'Review & Approve',
                description: 'Review the Business Requirements Document, Architecture Diagram, and Agent list. Approve, modify, or reject.',
                icon: CheckCircle2,
                color: 'green',
              },
              {
                step: '04',
                title: 'Automatic Execution',
                description: 'Skill Twins activate with specific tasks. Watch real-time progress as your project builds itself.',
                icon: Code,
                color: 'cyan',
              },
            ].map((item) => (
              <div key={item.step} className="relative p-8 bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center bg-${item.color}-100`}>
                      <item.icon className={`w-8 h-8 text-${item.color}-600`} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-mono mb-2 text-gray-400">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          COUNCIL TWINS SHOWCASE
          ======================================== */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              The Council Chamber
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-gray-600">
              5 AI twins with distinct perspectives debate your decisions in parallel
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {/* Strategist */}
            <div className="bg-white p-6 text-center border border-gray-200 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center bg-blue-100">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Strategist
              </h3>
              <p className="text-sm text-gray-600">
                Vision & Long-term Thinking
              </p>
            </div>

            {/* Builder */}
            <div className="bg-white p-6 text-center border border-gray-200 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center bg-purple-100">
                <Wrench className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Builder
              </h3>
              <p className="text-sm text-gray-600">
                Execution & Implementation
              </p>
            </div>

            {/* Analyst */}
            <div className="bg-white p-6 text-center border border-gray-200 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center bg-green-100">
                <BarChart3 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Analyst
              </h3>
              <p className="text-sm text-gray-600">
                Data & Metrics
              </p>
            </div>

            {/* Operator */}
            <div className="bg-white p-6 text-center border border-gray-200 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center bg-amber-100">
                <Settings className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Operator
              </h3>
              <p className="text-sm text-gray-600">
                Systems & Processes
              </p>
            </div>

            {/* Critic */}
            <div className="bg-white p-6 text-center border border-gray-200 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center bg-red-100">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Critic
              </h3>
              <p className="text-sm text-gray-600">
                Risk Assessment
              </p>
            </div>
          </div>

          {/* Synthesis Explanation */}
          <div className="mt-12 p-8 rounded-xl text-center max-w-3xl mx-auto bg-blue-50 border border-blue-200">
            <p className="text-lg text-gray-700">
              <strong className="text-gray-900">Parallel Debate Protocol:</strong> All 5 twins
              analyze simultaneously, then synthesize areas of consensus, tension, and actionable recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================
          SKILL TWINS GRID
          ======================================== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              10 Specialist Skill Twins
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-gray-600">
              Execute with precision. Route tasks to the right specialist.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid md:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {/* Research */}
            <div className="md:col-span-2 bg-white p-8 border border-gray-200 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all">
              <Search className="w-12 h-12 mb-4 text-cyan-600" />
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Research</h3>
              <p className="text-base mb-4 text-gray-600">Information synthesis & competitive analysis</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-cyan-100 text-cyan-700">Market Research</span>
                <span className="text-xs px-2 py-1 rounded-full bg-cyan-100 text-cyan-700">Competitor Analysis</span>
              </div>
            </div>

            {/* Code */}
            <div className="bg-white p-6 border border-gray-200 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all">
              <Code className="w-10 h-10 mb-3 text-blue-600" />
              <h3 className="text-xl font-bold mb-2 text-gray-900">Code</h3>
              <p className="text-sm text-gray-600">Development & Engineering</p>
            </div>

            {/* Design */}
            <div className="bg-white p-6 border border-gray-200 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all">
              <Palette className="w-10 h-10 mb-3 text-purple-600" />
              <h3 className="text-xl font-bold mb-2 text-gray-900">Design</h3>
              <p className="text-sm text-gray-600">UI/UX Guidance</p>
            </div>

            {/* Content */}
            <div className="bg-white p-6 border border-gray-200 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all">
              <PenTool className="w-10 h-10 mb-3 text-pink-500" />
              <h3 className="text-xl font-bold mb-2 text-gray-900">Content</h3>
              <p className="text-sm text-gray-600">Copy & Writing</p>
            </div>

            {/* Growth */}
            <div className="bg-white p-6 border border-gray-200 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all">
              <TrendingUp className="w-10 h-10 mb-3 text-emerald-500" />
              <h3 className="text-xl font-bold mb-2 text-gray-900">Growth</h3>
              <p className="text-sm text-gray-600">Acquisition</p>
            </div>

            {/* Marketing */}
            <div className="bg-white p-6 border border-gray-200 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all">
              <Megaphone className="w-10 h-10 mb-3 text-orange-500" />
              <h3 className="text-xl font-bold mb-2 text-gray-900">Marketing</h3>
              <p className="text-sm text-gray-600">Campaigns</p>
            </div>

            {/* Sales */}
            <div className="bg-white p-6 border border-gray-200 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all">
              <DollarSign className="w-10 h-10 mb-3 text-amber-500" />
              <h3 className="text-xl font-bold mb-2 text-gray-900">Sales</h3>
              <p className="text-sm text-gray-600">Deal Closing</p>
            </div>

            {/* Legal */}
            <div className="bg-white p-6 border border-gray-200 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all">
              <Scale className="w-10 h-10 mb-3 text-red-400" />
              <h3 className="text-xl font-bold mb-2 text-gray-900">Legal</h3>
              <p className="text-sm text-gray-600">Compliance</p>
            </div>

            {/* Product */}
            <div className="bg-white p-6 border border-gray-200 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all">
              <Package className="w-10 h-10 mb-3 text-purple-500" />
              <h3 className="text-xl font-bold mb-2 text-gray-900">Product</h3>
              <p className="text-sm text-gray-600">Roadmap</p>
            </div>

            {/* Operations */}
            <div className="bg-white p-6 border border-gray-200 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all">
              <Building className="w-10 h-10 mb-3 text-sky-500" />
              <h3 className="text-xl font-bold mb-2 text-gray-900">Operations</h3>
              <p className="text-sm text-gray-600">Workflows</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          VALUE PROPOSITION
          ======================================== */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Why Digital Twin OS?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 border border-gray-200 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-16 h-16 mb-6 rounded-xl flex items-center justify-center bg-blue-100">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Eliminate Blind Spots
              </h3>
              <p className="text-gray-600">
                The Critic twin ensures high-confidence risks are never silenced.
                Every decision gets a full risk assessment.
              </p>
            </div>

            <div className="bg-white p-8 border border-gray-200 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-16 h-16 mb-6 rounded-xl flex items-center justify-center bg-purple-100">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Parallel Intelligence
              </h3>
              <p className="text-gray-600">
                5 perspectives simultaneously. No sequential bottlenecks.
                Synthesis happens in real-time.
              </p>
            </div>

            <div className="bg-white p-8 border border-gray-200 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-16 h-16 mb-6 rounded-xl flex items-center justify-center bg-green-100">
                <Brain className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                3-Tier Memory
              </h3>
              <p className="text-gray-600">
                Conversation, contextual, and project memory.
                Your twins learn and remember every interaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          FINAL CTA SECTION
          ======================================== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto p-12 lg:p-16 rounded-3xl text-center bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 text-white">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
              Ready to Transform Your Decisions?
            </h2>
            <p className="text-xl mb-10 opacity-90">
              Start with 15 AI twins. Free forever for individuals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="px-8 py-4 rounded-xl font-semibold text-lg bg-white text-blue-600 transition-all hover:bg-gray-100 hover:-translate-y-0.5 hover:shadow-lg inline-flex items-center justify-center gap-2"
              >
                <Rocket className="w-5 h-5" />
                Launch Digital Twin OS
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 rounded-xl font-semibold text-lg bg-white/10 backdrop-blur text-white border-2 border-white/30 transition-all hover:bg-white/20 hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
              >
                Learn More
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          FOOTER
          ======================================== */}
      <footer className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Rocket className="w-6 h-6 text-blue-600" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Digital Twin OS
                </span>
              </Link>
              <p className="text-sm mb-4 text-gray-600">
                Enterprise Decision Intelligence via Parallel AI Debate
              </p>
              <p className="text-sm text-gray-500">
                by Formatho
              </p>
            </div>

            {/* Product Column */}
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Product</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/dashboard" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/twins" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    AI Twins
                  </Link>
                </li>
                <li>
                  <Link href="/workflows" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    Workflows
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/docs" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Company</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://github.com/formatho/digital-twin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2"
                  >
                    <Code className="w-4 h-4" />
                    GitHub
                  </a>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2024 Digital Twin OS. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="https://github.com/formatho/digital-twin"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-gray-500 hover:text-blue-600 transition-colors">
                <Code className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

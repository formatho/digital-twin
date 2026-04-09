/**
 * AI Project Builder Dashboard
 *
 * The CORE product experience - a magical AI project builder where:
 * 1. User inputs what they want to build
 * 2. Council Twins (5 AI perspectives) debate the request in parallel
 * 3. Business Requirements Document, Architecture Diagram, and Agent Identification are generated
 * 4. User reviews and approves/modifies/rejects
 * 5. Skill Twins execute the plan with real-time progress tracking
 *
 * @module app/(os)/dashboard/page
 */

'use client';

import { useState, useEffect } from 'react';
import {
  Rocket,
  Send,
  CheckCircle2,
  XCircle,
  Edit3,
  FileText,
  Network,
  Users,
  Clock,
  Sparkles,
  Activity,
  Code,
  Palette,
  Target,
  BarChart3,
  Settings,
  AlertCircle
} from 'lucide-react';

// Council Twins - Phase 1 (Always active)
const COUNCIL_TWINS = [
  {
    id: 'strategist',
    name: 'Strategist',
    icon: Target,
    color: '#3b82f6',
    description: 'Vision & Long-term Thinking'
  },
  {
    id: 'builder',
    name: 'Builder',
    icon: Code,
    color: '#8b5cf6',
    description: 'Execution & Implementation'
  },
  {
    id: 'analyst',
    name: 'Analyst',
    icon: BarChart3,
    color: '#10b981',
    description: 'Data & Metrics'
  },
  {
    id: 'operator',
    name: 'Operator',
    icon: Settings,
    color: '#f59e0b',
    description: 'Systems & Processes'
  },
  {
    id: 'critic',
    name: 'Critic',
    icon: AlertCircle,
    color: '#ef4444',
    description: 'Risk Assessment'
  },
];

// Skill Twins - Phase 2 (Activated by council as needed)
const SKILL_TWINS = [
  { id: 'research', name: 'Research', icon: Sparkles, color: '#06b6d4' },
  { id: 'content', name: 'Content', icon: FileText, color: '#f472b6' },
  { id: 'design', name: 'Design', icon: Palette, color: '#a78bfa' },
  { id: 'growth', name: 'Growth', icon: Activity, color: '#34d399' },
  { id: 'code', name: 'Code', icon: Code, color: '#60a5fa' },
];

type ProjectPhase = 'input' | 'council' | 'review' | 'execution' | 'complete';

export default function DashboardPage() {
  const [phase, setPhase] = useState<ProjectPhase>('input');
  const [userInput, setUserInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'brd' | 'architecture' | 'agents'>('brd');

  // Simulated council debate messages
  const [councilMessages, setCouncilMessages] = useState<Array<{
    twinId: string;
    message: string;
    timestamp: Date;
  }>>([]);

  // Active agents in execution phase
  const [activeAgents, setActiveAgents] = useState<Array<{
    id: string;
    name: string;
    task: string;
    status: 'pending' | 'active' | 'completed';
    progress: number;
  }>>([]);

  useEffect(() => {
    if (phase === 'council') {
      // Simulate council debate
      const debateInterval = setInterval(() => {
        const randomTwin = COUNCIL_TWINS[Math.floor(Math.random() * COUNCIL_TWINS.length)];
        const messages = [
          'Analyzing technical feasibility...',
          'Considering long-term scalability implications...',
          'Evaluating user experience requirements...',
          'Assessing potential risks and mitigation strategies...',
          'Identifying key performance metrics...',
          'Mapping out system architecture...',
          'Reviewing security considerations...',
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];

        setCouncilMessages(prev => [...prev, {
          twinId: randomTwin.id,
          message: randomMessage,
          timestamp: new Date(),
        }]);

        // Transition to review after enough messages
        if (councilMessages.length >= 8) {
          clearInterval(debateInterval);
          setTimeout(() => setPhase('review'), 1000);
        }
      }, 800);

      return () => clearInterval(debateInterval);
    }
  }, [phase, councilMessages.length]);

  const handleSubmit = () => {
    if (!userInput.trim()) return;
    setIsSubmitting(true);

    // Simulate processing
    setTimeout(() => {
      setIsSubmitting(false);
      setPhase('council');
      setCouncilMessages([]);
    }, 500);
  };

  const handleApprove = () => {
    setPhase('execution');
    // Activate skill twins
    setActiveAgents([
      { id: 'research', name: 'Research', task: 'Market research & competitor analysis', status: 'active', progress: 65 },
      { id: 'design', name: 'Design', task: 'UI/UX wireframes and prototypes', status: 'active', progress: 40 },
      { id: 'code', name: 'Code', task: 'Frontend implementation with React', status: 'pending', progress: 0 },
      { id: 'content', name: 'Content', task: 'Copywriting and documentation', status: 'pending', progress: 0 },
    ]);
  };

  const handleModify = () => {
    setUserInput('');
    setPhase('input');
  };

  const handleReject = () => {
    setUserInput('');
    setPhase('input');
    setCouncilMessages([]);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-dark)' }}>
      {/* Hero Input Section */}
      {phase === 'input' && (
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-6">
              <Rocket className="w-8 h-8" style={{ color: 'var(--color-primary)' }} />
              <h1 className="text-4xl lg:text-5xl font-bold">
                <span className="gradient-text">AI Project Builder</span>
              </h1>
            </div>
            <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
              5 Council Twins debate your vision. Skill Twins execute with precision.
            </p>
          </div>

          <div
            className="glass-card p-8 mb-8"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
            }}
          >
            <label className="block text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              What do you want to build?
            </label>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Describe your project in detail... (e.g., 'Build me an e-commerce platform with Stripe payments, user authentication, and inventory management')"
              className="glass-input w-full h-48 text-base resize-none"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--glass-border)',
              }}
            />

            <div className="flex items-center justify-between mt-6">
              <div className="flex gap-2">
                {COUNCIL_TWINS.slice(0, 3).map((twin) => {
                  const Icon = twin.icon;
                  return (
                    <div
                      key={twin.id}
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: `${twin.color}20` }}
                      title={twin.name}
                    >
                      <Icon className="w-5 h-5" style={{ color: twin.color }} />
                    </div>
                  );
                })}
                <span className="text-sm ml-2" style={{ color: 'var(--text-muted)' }}>
                  +2 more twins ready
                </span>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!userInput.trim() || isSubmitting}
                className="glass-btn-primary px-8 py-3 rounded-xl font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Activating Council...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Start Council Debate
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>5</div>
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Council Twins</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold" style={{ color: 'var(--color-secondary)' }}>10</div>
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Skill Twins</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold" style={{ color: 'var(--color-success)' }}>∞</div>
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Possibilities</div>
            </div>
          </div>
        </div>
      )}

      {/* Council Debate Phase */}
      {phase === 'council' && (
        <div className="container mx-auto px-6 py-12 max-w-6xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: 'var(--color-success)' }} />
              <h2 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Council Chamber
              </h2>
            </div>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              5 AI twins are debating your request in parallel...
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Council Twins */}
            <div className="lg:col-span-1 space-y-4">
              {COUNCIL_TWINS.map((twin) => {
                const Icon = twin.icon;
                const isActive = councilMessages.some(m => m.twinId === twin.id);
                return (
                  <div
                    key={twin.id}
                    className={`glass-card p-4 transition-all ${
                      isActive ? 'animate-pulse-glow' : ''
                    }`}
                    style={{
                      borderTop: `3px solid ${twin.color}`,
                      opacity: isActive ? 1 : 0.5,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: `${twin.color}20` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: twin.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {twin.name}
                        </div>
                        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          {twin.description}
                        </div>
                      </div>
                      {isActive && (
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: twin.color }} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Debate Feed */}
            <div className="lg:col-span-2 glass-card p-6" style={{ minHeight: '400px' }}>
              <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                Live Discussion
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {councilMessages.length === 0 ? (
                  <div className="text-center py-12" style={{ color: 'var(--text-muted)' }}>
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full border-2 border-dashed animate-spin"
                         style={{ borderColor: 'var(--glass-border)' }} />
                    <p>Initializing Council Twins...</p>
                  </div>
                ) : (
                  councilMessages.map((msg, idx) => {
                    const twin = COUNCIL_TWINS.find(t => t.id === msg.twinId);
                    if (!twin) return null;
                    const Icon = twin.icon;
                    return (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-lg"
                        style={{ background: 'rgba(255, 255, 255, 0.03)' }}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: `${twin.color}20` }}
                        >
                          <Icon className="w-4 h-4" style={{ color: twin.color }} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium" style={{ color: twin.color }}>
                              {twin.name}
                            </span>
                            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                              {msg.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                            {msg.message}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
                {councilMessages.length > 0 && (
                  <div className="flex items-center gap-2 p-3 rounded-lg"
                       style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--color-success)' }} />
                    <span className="text-sm" style={{ color: 'var(--color-success)' }}>
                      Synthesizing consensus and recommendations...
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Phase */}
      {phase === 'review' && (
        <div className="container mx-auto px-6 py-12 max-w-6xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-8 h-8" style={{ color: 'var(--color-success)' }} />
              <h2 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Council Deliberation Complete
              </h2>
            </div>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Review the plan before execution begins
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setSelectedTab('brd')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                selectedTab === 'brd' ? 'glass-btn-primary' : 'glass-btn'
              }`}
            >
              <FileText className="w-5 h-5 inline mr-2" />
              Business Requirements
            </button>
            <button
              onClick={() => setSelectedTab('architecture')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                selectedTab === 'architecture' ? 'glass-btn-primary' : 'glass-btn'
              }`}
            >
              <Network className="w-5 h-5 inline mr-2" />
              Architecture
            </button>
            <button
              onClick={() => setSelectedTab('agents')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                selectedTab === 'agents' ? 'glass-btn-primary' : 'glass-btn'
              }`}
            >
              <Users className="w-5 h-5 inline mr-2" />
              Active Agents
            </button>
          </div>

          {/* Document Panel */}
          <div className="glass-card p-8 mb-8 min-h-96">
            {selectedTab === 'brd' && (
              <div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  Business Requirements Document
                </h3>
                <div className="space-y-4" style={{ color: 'var(--text-secondary)' }}>
                  <div>
                    <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Project Overview</h4>
                    <p>{userInput}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Key Requirements</h4>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Secure user authentication with session management</li>
                      <li>Stripe integration for payment processing</li>
                      <li>Real-time inventory tracking and updates</li>
                      <li>Admin dashboard for order management</li>
                      <li>Responsive design across all devices</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Council Recommendations</h4>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Start with MVP: Product catalog + Checkout + Auth</li>
                      <li>Use Next.js 14 with App Router for optimal performance</li>
                      <li>Implement webhook handlers for Stripe events</li>
                      <li>Consider Redis for session management</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'architecture' && (
              <div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  System Architecture
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="glass-card p-4">
                    <h4 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Frontend</h4>
                    <div className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <div>• Next.js 14 (App Router)</div>
                      <div>• React 18 + TypeScript</div>
                      <div>• Tailwind CSS + Framer Motion</div>
                      <div>• React Query for state</div>
                    </div>
                  </div>
                  <div className="glass-card p-4">
                    <h4 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Backend</h4>
                    <div className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <div>• Next.js API Routes</div>
                      <div>• Stripe API for payments</div>
                      <div>• PostgreSQL + Prisma</div>
                      <div>• NextAuth.js for auth</div>
                    </div>
                  </div>
                  <div className="glass-card p-4">
                    <h4 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Infrastructure</h4>
                    <div className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <div>• Vercel for hosting</div>
                      <div>• Supabase for database</div>
                      <div>• Stripe Webhooks</div>
                      <div>• CDN for static assets</div>
                    </div>
                  </div>
                  <div className="glass-card p-4">
                    <h4 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Security</h4>
                    <div className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <div>• HTTPS everywhere</div>
                      <div>• CSRF protection</div>
                      <div>• Input validation</div>
                      <div>• Rate limiting</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'agents' && (
              <div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  Required Skill Twins
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {SKILL_TWINS.map((twin) => {
                    const Icon = twin.icon;
                    return (
                      <div key={twin.id} className="glass-card p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ background: `${twin.color}20` }}
                          >
                            <Icon className="w-5 h-5" style={{ color: twin.color }} />
                          </div>
                          <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                            {twin.name}
                          </div>
                        </div>
                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                          {twin.id === 'research' && 'Market analysis, competitor research, feature validation'}
                          {twin.id === 'content' && 'Copywriting, documentation, help content'}
                          {twin.id === 'design' && 'UI/UX design, wireframes, prototypes'}
                          {twin.id === 'growth' && 'Growth strategy, user acquisition, analytics'}
                          {twin.id === 'code' && 'Frontend/backend development, testing, deployment'}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Approval Bar */}
          <div className="glass-card p-6">
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={handleApprove}
                className="glass-btn-primary px-8 py-3 rounded-xl font-semibold flex items-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                Approve & Start Building
              </button>
              <button
                onClick={handleModify}
                className="glass-btn px-8 py-3 rounded-xl font-semibold flex items-center gap-2"
              >
                <Edit3 className="w-5 h-5" />
                Modify Request
              </button>
              <button
                onClick={handleReject}
                className="glass-btn px-8 py-3 rounded-xl font-semibold flex items-center gap-2"
                style={{ borderColor: 'var(--color-error)', color: 'var(--color-error)' }}
              >
                <XCircle className="w-5 h-5" />
                Reject Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Execution Phase */}
      {phase === 'execution' && (
        <div className="container mx-auto px-6 py-12 max-w-6xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <Rocket className="w-8 h-8" style={{ color: 'var(--color-primary)' }} />
              <h2 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Execution in Progress
              </h2>
            </div>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Skill Twins are building your project
            </p>
          </div>

          {/* Active Agents Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {activeAgents.map((agent) => {
              const twin = SKILL_TWINS.find(t => t.id === agent.id);
              if (!twin) return null;
              const Icon = twin.icon;
              return (
                <div key={agent.id} className="glass-card p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${twin.color}20`,
                        opacity: agent.status === 'pending' ? 0.5 : 1,
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: twin.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {agent.name}
                        </h3>
                        <span
                          className="text-xs px-2 py-1 rounded-full"
                          style={{
                            background: agent.status === 'completed'
                              ? 'rgba(16, 185, 129, 0.2)'
                              : agent.status === 'active'
                              ? 'rgba(59, 130, 246, 0.2)'
                              : 'rgba(148, 163, 184, 0.2)',
                            color: agent.status === 'completed'
                              ? 'var(--color-success)'
                              : agent.status === 'active'
                              ? 'var(--color-primary)'
                              : 'var(--text-muted)',
                          }}
                        >
                          {agent.status}
                        </span>
                      </div>
                      <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                        {agent.task}
                      </p>

                      {/* Progress Bar */}
                      <div className="mb-2">
                        <div
                          className="h-2 rounded-full"
                          style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                        >
                          <div
                            className="h-2 rounded-full transition-all duration-500"
                            style={{
                              width: `${agent.progress}%`,
                              background: twin.color,
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-muted)' }}>
                        <span>{agent.progress}% complete</span>
                        {agent.status === 'active' && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>~{Math.ceil((100 - agent.progress) / 10)} min remaining</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Overall Progress */}
          <div className="glass-card p-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                Overall Progress
              </h3>
              <span className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                {Math.round(activeAgents.reduce((acc, a) => acc + a.progress, 0) / activeAgents.length)}%
              </span>
            </div>
            <div
              className="h-3 rounded-full"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <div
                className="h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${activeAgents.reduce((acc, a) => acc + a.progress, 0) / activeAgents.length}%`,
                  background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import Link from 'next/link';

/**
 * Digital Twin OS - Public Landing Page
 * 
 * Multi-Skill Pipeline Execution:
 * - Content Twin: Enterprise-grade copy
 * - Marketing Twin: Strategic CTA placement
 * - Design Twin: Glass Morphism aesthetic
 * - Code Twin: Next.js/Tailwind components
 * 
 * @module app/(website)/page
 */

export default function HomePage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--bg-dark)' }}>
      {/* ========================================
          HERO SECTION
          Design: Glass Morphism with gradient background
          Copy: Enterprise Decision Intelligence
          CTA: Primary (Access OS) + Secondary (Request Demo)
          ======================================== */}
      <section className="relative overflow-hidden">
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

        <div className="container mx-auto px-6 py-24 lg:py-32 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                backdropFilter: 'var(--glass-blur)'
              }}
            >
              <span className="text-sm font-medium" style={{ color: 'var(--color-primary-light)' }}>
                🚀 Now in Beta
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

            {/* CTAs - Marketing Twin Strategic Placement */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 glow-primary"
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                  color: 'var(--text-primary)'
                }}
              >
                Access OS →
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
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

      {/* ========================================
          COUNCIL TWINS SHOWCASE
          Design: Glass cards with twin colors
          Content: 5 strategic twins explained
          ======================================== */}
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
            {/* Strategist */}
            <div 
              className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300"
              style={{ borderTop: '3px solid var(--color-primary)' }}
            >
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Strategist
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Vision & Long-term Thinking
              </p>
            </div>

            {/* Builder */}
            <div 
              className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300"
              style={{ borderTop: '3px solid var(--color-secondary)' }}
            >
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Builder
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Execution & Implementation
              </p>
            </div>

            {/* Analyst */}
            <div 
              className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300"
              style={{ borderTop: '3px solid var(--color-success)' }}
            >
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Analyst
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Data & Metrics
              </p>
            </div>

            {/* Operator */}
            <div 
              className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300"
              style={{ borderTop: '3px solid var(--color-warning)' }}
            >
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Operator
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Systems & Processes
              </p>
            </div>

            {/* Critic */}
            <div 
              className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300"
              style={{ borderTop: '3px solid var(--color-error)' }}
            >
              <div className="text-4xl mb-4">🧐</div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Critic
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Risk Assessment
              </p>
            </div>
          </div>

          {/* Synthesis Explanation */}
          <div 
            className="mt-12 p-8 rounded-2xl text-center max-w-3xl mx-auto"
            style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
              border: '1px solid var(--glass-border)'
            }}
          >
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-primary)' }}>Parallel Debate Protocol:</strong> All 5 twins 
              analyze simultaneously, then synthesize areas of consensus, tension, and actionable recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================
          SKILL TWINS SHOWCASE
          Design: Grid layout with category grouping
          Content: 10 specialist twins
          ======================================== */}
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
              { emoji: '🔬', name: 'Research', desc: 'Info synthesis' },
              { emoji: '✍️', name: 'Content', desc: 'Copy & writing' },
              { emoji: '🎨', name: 'Design', desc: 'UI/UX guidance' },
              { emoji: '📈', name: 'Growth', desc: 'Acquisition' },
              { emoji: '💻', name: 'Code', desc: 'Development' },
              { emoji: '📢', name: 'Marketing', desc: 'Campaigns' },
              { emoji: '💰', name: 'Sales', desc: 'Deal closing' },
              { emoji: '⚖️', name: 'Legal', desc: 'Compliance' },
              { emoji: '📦', name: 'Product', desc: 'Roadmap' },
              { emoji: '🏢', name: 'Operations', desc: 'Workflows' },
            ].map((twin) => (
              <div 
                key={twin.name}
                className="glass-card p-4 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="text-3xl mb-2">{twin.emoji}</div>
                <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
                  {twin.name}
                </h3>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {twin.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          VALUE PROPOSITION
          Design: 3-column grid with glass cards
          Content: Key benefits
          ======================================== */}
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
            <div className="glass-card p-8">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                Eliminate Blind Spots
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                The Critic twin ensures high-confidence risks are never silenced. 
                Every decision gets a full risk assessment.
              </p>
            </div>

            <div className="glass-card p-8">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                Parallel Intelligence
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                5 perspectives simultaneously. No sequential bottlenecks. 
                Synthesis happens in real-time.
              </p>
            </div>

            <div className="glass-card p-8">
              <div className="text-4xl mb-4">🧬</div>
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
          FINAL CTA SECTION
          Design: Gradient background with glass card
          Marketing: Conversion-focused
          ======================================== */}
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
                  className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'var(--text-primary)',
                    color: 'var(--color-primary)'
                  }}
                >
                  Launch Digital Twin OS
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
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

      {/* ========================================
          FOOTER
          ======================================== */}
      <footer 
        className="py-12"
        style={{ 
          background: 'var(--bg-dark-secondary)',
          borderTop: '1px solid var(--glass-border)'
        }}
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <span className="text-xl font-bold gradient-text">Digital Twin OS</span>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                by Formatho
              </p>
            </div>
            <div className="flex gap-8">
              <Link href="/about" className="hover:underline" style={{ color: 'var(--text-secondary)' }}>
                About
              </Link>
              <Link href="/pricing" className="hover:underline" style={{ color: 'var(--text-secondary)' }}>
                Pricing
              </Link>
              <a 
                href="https://github.com/formatho/digital-twin" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: 'var(--text-secondary)' }}
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

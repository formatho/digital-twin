import Link from 'next/link';

const councilTwins = [
  { name: 'STRATEGIST', role: 'Vision & Long-term Thinking', color: '#3b82f6', icon: '🎯' },
  { name: 'BUILDER', role: 'Execution & Implementation', color: '#8b5cf6', icon: '🔧' },
  { name: 'ANALYST', role: 'Data & Metrics', color: '#22c55e', icon: '📊' },
  { name: 'OPERATOR', role: 'Systems & Processes', color: '#f59e0b', icon: '⚙️' },
  { name: 'CRITIC', role: 'Risk Assessment & Devil\'s Advocate', color: '#ef4444', icon: '🧐' },
];

const skillTwins = [
  { index: '01', name: 'RESEARCH', desc: 'Information synthesis & competitive analysis' },
  { index: '02', name: 'CONTENT', desc: 'Blog, social, copywriting' },
  { index: '03', name: 'DESIGN', desc: 'UI/UX, creative direction' },
  { index: '04', name: 'GROWTH', desc: 'Acquisition, retention' },
  { index: '05', name: 'CODE', desc: 'Development, debugging' },
  { index: '06', name: 'MARKETING', desc: 'Strategy, campaigns' },
  { index: '07', name: 'SALES', desc: 'Playbooks, closing' },
  { index: '08', name: 'LEGAL', desc: 'Compliance, risk' },
  { index: '09', name: 'PRODUCT', desc: 'Roadmap, requirements' },
  { index: '10', name: 'OPERATIONS', desc: 'Workflows, processes' },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white" style={{ borderRadius: 0 }}>
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-black border-b border-[#333]">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-black tracking-tight text-white">
              DIGITAL TWIN OS
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/about" className="text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors">About</Link>
              <Link href="/pricing" className="text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors">Pricing</Link>
              <a href="https://github.com/formatho/digital-twin" target="_blank" rel="noopener noreferrer" className="text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors">GitHub</a>
            </div>
            <Link href="/dashboard" className="px-6 py-2 text-xs tracking-widest uppercase font-bold bg-white text-black hover:opacity-80 transition-none">
              Access OS
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="py-24 lg:py-40">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl">
            <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-black leading-none tracking-tighter text-white mb-6">
              ENTERPRISE<br />DECISION<br />INTELLIGENCE
            </h1>
            <p className="text-xl lg:text-2xl text-white/50 mb-12 max-w-xl">
              via Parallel AI Debate
            </p>
            <div className="flex gap-4">
              <Link href="/dashboard" className="px-10 py-4 text-sm tracking-widest uppercase font-bold bg-white text-black hover:opacity-80 transition-none inline-flex items-center gap-2">
                Access OS →
              </Link>
              <Link href="/about" className="px-10 py-4 text-sm tracking-widest uppercase font-bold border border-[#333] text-white hover:bg-white hover:text-black transition-colors duration-150 inline-flex items-center gap-2">
                Learn More
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 max-w-4xl border-t border-[#333]">
            <div className="py-6 pr-6 border-r border-[#333]">
              <div className="text-4xl font-black text-white">15</div>
              <div className="text-xs tracking-widest uppercase text-white/40 mt-1">AI Twins</div>
            </div>
            <div className="py-6 px-6 border-r border-[#333]">
              <div className="text-4xl font-black text-white">5</div>
              <div className="text-xs tracking-widest uppercase text-white/40 mt-1">Council Members</div>
            </div>
            <div className="py-6 px-6 border-r border-[#333]">
              <div className="text-4xl font-black text-white">10</div>
              <div className="text-xs tracking-widest uppercase text-white/40 mt-1">Specialists</div>
            </div>
            <div className="py-6 px-6">
              <div className="text-4xl font-black text-white">∞</div>
              <div className="text-xs tracking-widest uppercase text-white/40 mt-1">Privacy-First</div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 border-t border-[#333]">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <p className="text-xs tracking-widest uppercase text-white/40 mb-4">PROCESS</p>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter leading-none">How It Works</h2>
          </div>
          <div className="max-w-4xl grid md:grid-cols-2 gap-0">
            {[
              { step: '01', title: 'Describe Your Vision', desc: 'Tell the AI Project Builder what you want to create.' },
              { step: '02', title: 'Council Debate', desc: '5 Council Twins analyze your request in parallel.' },
              { step: '03', title: 'Review & Approve', desc: 'Review the BRD, Architecture, and Agent list.' },
              { step: '04', title: 'Automatic Execution', desc: 'Skill Twins activate. Watch real-time progress.' },
            ].map((item) => (
              <div key={item.step} className="p-8 border-t border-[#333]">
                <div className="text-5xl font-black text-white/10 font-mono mb-4">{item.step}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/50">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COUNCIL CHAMBER — Brutalist List */}
      <section className="py-24 border-t border-[#333]">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <p className="text-xs tracking-widest uppercase text-white/40 mb-4">GOVERNANCE</p>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter leading-none">The Council Chamber</h2>
          </div>
          <div className="max-w-4xl">
            {councilTwins.map((twin) => (
              <div key={twin.name} className="flex items-center gap-6 py-8 border-t border-[#333]">
                <div className="w-3 h-3 flex-shrink-0" style={{ backgroundColor: twin.color }}></div>
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-black tracking-tighter" style={{ color: twin.color }}>
                    {twin.name}
                  </h3>
                </div>
                <p className="text-sm text-white/50 tracking-widest uppercase">{twin.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 SKILL TWINS — 2-col grid with hover */}
      <section className="py-24 border-t border-[#333]">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <p className="text-xs tracking-widest uppercase text-white/40 mb-4">EXECUTION</p>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter leading-none">10 Specialist Skill Twins</h2>
          </div>
          <div className="max-w-4xl">
            {skillTwins.map((skill) => (
              <div
                key={skill.index}
                className="grid grid-cols-[auto_1fr] md:grid-cols-[200px_1fr] items-center py-6 px-4 border-t border-[#333] hover:bg-white hover:text-black transition-colors duration-150 cursor-pointer"
              >
                <div className="font-mono font-black text-lg tracking-widest">
                  {skill.index} {skill.name}
                </div>
                <div className="text-sm opacity-60">{skill.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY DTOS — Numbered Editorial */}
      <section className="py-24 border-t border-[#333]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 max-w-5xl">
            <div>
              <p className="text-xs tracking-widest uppercase text-white/40 mb-4">VALUE</p>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tighter leading-none">WHY<br />DTOS?</h2>
            </div>
            <div className="space-y-0">
              {[
                { num: '01', title: 'Eliminate Blind Spots', desc: 'The Critic twin ensures high-confidence risks are never silenced. Every decision gets a full risk assessment.' },
                { num: '02', title: 'Parallel Intelligence', desc: '5 perspectives simultaneously. No sequential bottlenecks. Synthesis happens in real-time.' },
                { num: '03', title: '3-Tier Memory', desc: 'Conversation, contextual, and project memory. Your twins learn and remember every interaction.' },
              ].map((item) => (
                <div key={item.num} className="py-8 border-t border-[#333]">
                  <div className="text-5xl font-black text-white/10 font-mono mb-3">{item.num}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/50">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER — Big Statement + Clean Columns */}
      <footer className="border-t border-[#333]">
        {/* Big Statement */}
        <div className="py-24 border-b border-[#333]">
          <div className="container mx-auto px-6">
            <h2 className="text-[clamp(2rem,6vw,5rem)] font-black tracking-tighter leading-none text-white">
              READY TO TRANSFORM<br />YOUR DECISIONS?
            </h2>
            <div className="mt-8 flex gap-4">
              <Link href="/dashboard" className="px-10 py-4 text-sm tracking-widest uppercase font-bold bg-white text-black hover:opacity-80 transition-none">
                Launch OS
              </Link>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="py-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="text-xs tracking-widest uppercase text-white/40 mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><Link href="/dashboard" className="text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors">Dashboard</Link></li>
                  <li><Link href="/pricing" className="text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors">Pricing</Link></li>
                  <li><Link href="/twins" className="text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors">AI Twins</Link></li>
                  <li><Link href="/workflows" className="text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors">Workflows</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs tracking-widest uppercase text-white/40 mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li><Link href="/docs" className="text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors">Documentation</Link></li>
                  <li><Link href="/about" className="text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors">About</Link></li>
                  <li><Link href="/blog" className="text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors">Blog</Link></li>
                  <li><Link href="/support" className="text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors">Support</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs tracking-widest uppercase text-white/40 mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><Link href="/privacy" className="text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors">Terms of Service</Link></li>
                  <li><Link href="/contact" className="text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs tracking-widest uppercase text-white/40 mb-4">Social</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="https://github.com/formatho/digital-twin" target="_blank" rel="noopener noreferrer" className="text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a href="https://x.com/heyformatho" target="_blank" rel="noopener noreferrer" className="text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
                      X / Twitter
                    </a>
                  </li>
                  <li>
                    <a href="https://linkedin.com/company/formatho" target="_blank" rel="noopener noreferrer" className="text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-[#333]">
              <p className="text-xs text-white/30 tracking-widest uppercase">© 2026 Digital Twin OS by Formatho. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

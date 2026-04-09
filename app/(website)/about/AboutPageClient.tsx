'use client';

import Link from 'next/link';
import { Brain, Cpu, Zap, Shield, Users, Rocket, Code2, Database, Globe, Workflow } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Brain,
    title: 'Council Intelligence',
    description: '5 specialized AI twins collaborate on strategic decisions, bringing diverse perspectives to every challenge.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Zap,
    title: 'Skill Twins',
    description: '10 specialist twins handle execution tasks from research to coding, operating with precision and speed.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Database,
    title: 'Contextual Memory',
    description: 'Three-tier memory system ensures twins learn from every interaction and build on shared knowledge.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Your data stays yours. End-to-end encryption and SOC 2 compliance built in from day one.',
    color: 'from-orange-500 to-red-500',
  },
];

const techStack = [
  { name: 'Next.js 14', icon: Code2, description: 'React framework for production' },
  { name: 'TypeScript', icon: Code2, description: 'Type-safe development' },
  { name: 'Tailwind CSS', icon: Workflow, description: 'Utility-first styling' },
  { name: 'Framer Motion', icon: Zap, description: 'Smooth animations' },
  { name: 'PostgreSQL', icon: Database, description: 'Reliable data storage' },
  { name: 'Vector Database', icon: Globe, description: 'Semantic search' },
];

const team = [
  { name: 'Formatho', role: 'Founder & Visionary', bio: 'Building the future of AI-augmented decision making.' },
];

export function AboutPageClient() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--bg-dark)' }}>
      {/* Ambient Background Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.25, 0.35, 0.25],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="container mx-auto px-6 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:scale-105"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              backdropFilter: 'var(--glass-blur)',
              color: 'var(--text-secondary)',
            }}
          >
            <Globe className="w-4 h-4" />
            Back to Home
          </Link>
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div
              className="inline-block px-4 py-2 rounded-full mb-6"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
                border: '1px solid rgba(59, 130, 246, 0.3)',
              }}
            >
              <span className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>
                About Digital Twin OS
              </span>
            </div>
            <h1
              className="text-5xl md:text-7xl font-bold mb-6"
              style={{
                background: 'linear-gradient(135deg, #60a5fa, #a78bfa, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              AI-Powered Decision Intelligence
            </h1>
            <p
              className="text-xl md:text-2xl mb-8 leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Digital Twin OS by Formatho brings strategic decision intelligence to teams through
              collaborative AI twins that think, learn, and execute together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pricing"
                className="px-8 py-4 rounded-xl font-medium text-lg transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                  color: '#ffffff',
                  border: 'none',
                }}
              >
                Get Started Free
              </Link>
              <Link
                href="#how-it-works"
                className="px-8 py-4 rounded-xl font-medium text-lg transition-all hover:scale-105"
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  backdropFilter: 'var(--glass-blur)',
                  color: 'var(--text-primary)',
                }}
              >
                Learn How It Works
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Mission & Vision */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div
              className="p-8 md:p-12 rounded-2xl"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                backdropFilter: 'var(--glass-blur)',
              }}
            >
              <div className="flex items-start gap-6">
                <div
                  className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                  }}
                >
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2
                    className="text-3xl font-bold mb-4"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Our Mission
                  </h2>
                  <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    To democratize access to AI-powered strategic thinking, enabling every team to make
                    better decisions faster. We believe the future of work isn\'t humans versus AI — it\'s
                    humans amplified by AI twins that understand context, learn from experience, and
                    collaborate seamlessly.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                How It Works
              </h2>
              <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
                A powerful collaboration between Council and Skill Twins
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Council */}
              <div
                className="p-8 rounded-2xl"
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  backdropFilter: 'var(--glass-blur)',
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  }}
                >
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ color: 'var(--text-primary)' }}
                >
                  The Council
                </h3>
                <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                  5 Council Twins represent key strategic perspectives, debating decisions from
                  multiple angles to ensure comprehensive analysis.
                </p>
                <div className="space-y-3">
                  {[
                    { name: 'Strategist', color: '#3b82f6', desc: 'Vision & long-term planning' },
                    { name: 'Builder', color: '#8b5cf6', desc: 'Execution feasibility' },
                    { name: 'Analyst', color: '#10b981', desc: 'Data-driven insights' },
                    { name: 'Operator', color: '#f59e0b', desc: 'Systems & processes' },
                    { name: 'Critic', color: '#ef4444', desc: 'Risk assessment' },
                  ].map((twin) => (
                    <div key={twin.name} className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ background: twin.color }}
                      />
                      <div>
                        <div
                          className="font-medium"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {twin.name}
                        </div>
                        <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                          {twin.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skill Twins */}
              <div
                className="p-8 rounded-2xl"
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  backdropFilter: 'var(--glass-blur)',
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{
                    background: 'linear-gradient(135deg, #06b6d4, #10b981)',
                  }}
                >
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Skill Twins
                </h3>
                <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                  10 specialist twins execute tasks with precision, from research and content
                  creation to coding and operations.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Research', 'Content', 'Design', 'Growth',
                    'Code', 'Marketing', 'Sales', 'Legal',
                    'Product', 'Operations'
                  ].map((skill) => (
                    <div
                      key={skill}
                      className="px-3 py-2 rounded-lg text-sm text-center"
                      style={{
                        background: 'var(--bg-dark-tertiary)',
                        border: '1px solid var(--glass-border)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-16">
              <h2
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                Built for Modern Teams
              </h2>
              <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
                Everything you need to amplify your decision-making
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-6 rounded-2xl"
                  style={{
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    backdropFilter: 'var(--glass-blur)',
                  }}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${feature.color}`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {feature.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Tech Stack */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                Built with Modern Technology
              </h2>
              <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
                Leveraging the best tools for performance and reliability
              </p>
            </div>

            <div
              className="p-8 rounded-2xl"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                backdropFilter: 'var(--glass-blur)',
              }}
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {techStack.map((tech) => (
                  <div key={tech.name} className="text-center">
                    <div
                      className="w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center"
                      style={{
                        background: 'var(--bg-dark-tertiary)',
                        border: '1px solid var(--glass-border)',
                      }}
                    >
                      <tech.icon className="w-8 h-8" style={{ color: 'var(--color-primary)' }} />
                    </div>
                    <div
                      className="font-medium mb-1"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {tech.name}
                    </div>
                    <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      {tech.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Team */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                The Team
              </h2>
              <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
                Building the future of AI-augmented work
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="p-6 rounded-2xl text-center"
                  style={{
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    backdropFilter: 'var(--glass-blur)',
                  }}
                >
                  <div
                    className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                    }}
                  >
                    {member.name.charAt(0)}
                  </div>
                  <h3
                    className="text-xl font-bold mb-1"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {member.name}
                  </h3>
                  <div
                    className="text-sm mb-3"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {member.role}
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {member.bio}
                  </p>
                </div>
              ))}
              <div
                className="p-6 rounded-2xl flex items-center justify-center border-2 border-dashed"
                style={{
                  borderColor: 'var(--glass-border)',
                }}
              >
                <div className="text-center">
                  <div
                    className="text-sm mb-2"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Join our team
                  </div>
                  <a
                    href="mailto:careers@formatho.com"
                    className="text-sm font-medium"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    careers@formatho.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div
              className="p-8 md:p-12 rounded-2xl text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                backdropFilter: 'var(--glass-blur)',
              }}
            >
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                Ready to Transform Your Decision-Making?
              </h2>
              <p className="text-xl mb-8" style={{ color: 'var(--text-secondary)' }}>
                Join thousands of teams using Digital Twin OS to make better decisions faster.
              </p>
              <Link
                href="/pricing"
                className="inline-block px-8 py-4 rounded-xl font-medium text-lg transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                  color: '#ffffff',
                  border: 'none',
                }}
              >
                Get Started Free
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-12 border-t" style={{ borderColor: 'var(--glass-border)' }}>
          <div className="text-center">
            <p style={{ color: 'var(--text-muted)' }}>
              &copy; 2026 Digital Twin OS by Formatho. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

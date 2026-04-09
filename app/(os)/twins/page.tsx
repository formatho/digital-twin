/**
 * Twins Management Page
 *
 * Twin roster management dashboard with Glass Morphism design.
 * Displays all 15 twins with status, confidence, and configuration options.
 *
 * @module app/(os)/twins/page
 */

'use client';

import { useState } from 'react';
import GlassWrapper from '../components/GlassWrapper';

// Council Twins
const COUNCIL_TWINS = [
  {
    id: 'strategist', name: 'The Strategist', emoji: '🎯', role: 'Vision & Long-term Thinking',
    colorHex: '#3b82f6', status: 'active' as const, confidence: 0.92, tasksCompleted: 127, lastActive: '2m ago',
    description: 'Analyzes market trends, competitive positioning, and strategic opportunities.',
  },
  {
    id: 'builder', name: 'The Builder', emoji: '🔧', role: 'Execution & Implementation',
    colorHex: '#8b5cf6', status: 'active' as const, confidence: 0.88, tasksCompleted: 203, lastActive: '5m ago',
    description: 'Focuses on implementation feasibility and resource requirements.',
  },
  {
    id: 'analyst', name: 'The Analyst', emoji: '📊', role: 'Data & Metrics',
    colorHex: '#10b981', status: 'active' as const, confidence: 0.95, tasksCompleted: 312, lastActive: '1m ago',
    description: 'Processes data, runs statistical models, validates assumptions.',
  },
  {
    id: 'operator', name: 'The Operator', emoji: '⚙️', role: 'Systems & Processes',
    colorHex: '#f59e0b', status: 'idle' as const, confidence: 0.84, tasksCompleted: 89, lastActive: '2h ago',
    description: 'Evaluates operational bottlenecks and automation opportunities.',
  },
  {
    id: 'critic', name: 'The Critic', emoji: '🧐', role: 'Risk Assessment',
    colorHex: '#ef4444', status: 'active' as const, confidence: 0.91, tasksCompleted: 156, lastActive: '2m ago',
    description: 'Stress-tests assumptions and identifies hidden risks.',
  },
];

// Skill Twins
const SKILL_TWINS = [
  { id: 'research', name: 'Research', emoji: '🔬', category: 'Technical', status: 'active' as const, confidence: 0.94, tasksCompleted: 89, lastActive: '15m ago' },
  { id: 'content', name: 'Content', emoji: '✍️', category: 'Creative', status: 'idle' as const, confidence: 0.87, tasksCompleted: 45, lastActive: '1h ago' },
  { id: 'design', name: 'Design', emoji: '🎨', category: 'Creative', status: 'idle' as const, confidence: 0.82, tasksCompleted: 23, lastActive: '3h ago' },
  { id: 'growth', name: 'Growth', emoji: '📈', category: 'Business', status: 'active' as const, confidence: 0.89, tasksCompleted: 67, lastActive: '30m ago' },
  { id: 'code', name: 'Code', emoji: '💻', category: 'Technical', status: 'active' as const, confidence: 0.93, tasksCompleted: 134, lastActive: '10m ago' },
  { id: 'marketing', name: 'Marketing', emoji: '📢', category: 'Business', status: 'idle' as const, confidence: 0.85, tasksCompleted: 34, lastActive: '2h ago' },
  { id: 'sales', name: 'Sales', emoji: '💰', category: 'Business', status: 'idle' as const, confidence: 0.81, tasksCompleted: 28, lastActive: '4h ago' },
  { id: 'legal', name: 'Legal', emoji: '⚖️', category: 'Operations', status: 'idle' as const, confidence: 0.90, tasksCompleted: 12, lastActive: '1d ago' },
  { id: 'product', name: 'Product', emoji: '📦', category: 'Business', status: 'active' as const, confidence: 0.88, tasksCompleted: 56, lastActive: '45m ago' },
  { id: 'operations', name: 'Operations', emoji: '🏢', category: 'Operations', status: 'idle' as const, confidence: 0.83, tasksCompleted: 41, lastActive: '2h ago' },
];

type Twin = typeof COUNCIL_TWINS[0] | typeof SKILL_TWINS[0];

const STATS = [
  { emoji: '🤖', value: '15', label: 'Total Twins' },
  { emoji: '✅', get value() { return ''; }, label: 'Active Now', id: 'active' },
  { emoji: '📊', label: 'Avg Confidence', id: 'confidence' },
  { emoji: '⚡', label: 'Tasks Completed', id: 'tasks' },
];

export default function TwinsPage() {
  const [selectedTwin, setSelectedTwin] = useState<Twin | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'idle'>('all');

  const filteredCouncilTwins = COUNCIL_TWINS.filter(t => statusFilter === 'all' || t.status === statusFilter);
  const filteredSkillTwins = SKILL_TWINS.filter(t => statusFilter === 'all' || t.status === statusFilter);

  const allTwins = [...COUNCIL_TWINS, ...SKILL_TWINS];
  const totalTasks = allTwins.reduce((sum, t) => sum + t.tasksCompleted, 0);
  const avgConfidence = allTwins.reduce((sum, t) => sum + t.confidence, 0) / allTwins.length;
  const activeCount = allTwins.filter(t => t.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Twin Roster</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage your Digital Twins</p>
        </div>
        <div className="flex gap-2">
          {(['all', 'active', 'idle'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={statusFilter === s ? 'glass-btn-primary px-4 py-2 rounded-lg capitalize' : 'glass-btn px-4 py-2 rounded-lg capitalize'}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassWrapper>
          <div className="text-center">
            <div className="text-3xl mb-2">🤖</div>
            <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>15</div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Total Twins</div>
          </div>
        </GlassWrapper>
        <GlassWrapper>
          <div className="text-center">
            <div className="text-3xl mb-2">✅</div>
            <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{activeCount}</div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Active Now</div>
          </div>
        </GlassWrapper>
        <GlassWrapper>
          <div className="text-center">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{Math.round(avgConfidence * 100)}%</div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Avg Confidence</div>
          </div>
        </GlassWrapper>
        <GlassWrapper>
          <div className="text-center">
            <div className="text-3xl mb-2">⚡</div>
            <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{totalTasks.toLocaleString()}</div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Tasks Completed</div>
          </div>
        </GlassWrapper>
      </div>

      {/* Council Twins Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>🎯 Council Twins</h2>
          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Strategic Decision Makers</span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCouncilTwins.map((twin) => (
            <button
              key={twin.id}
              onClick={() => setSelectedTwin(twin)}
              className="glass-card p-6 text-left transition-all duration-200 cursor-pointer"
              style={{
                border: twin.status === 'active'
                  ? `2px solid ${twin.colorHex}50`
                  : '1px solid var(--glass-border)',
                boxShadow: twin.status === 'active'
                  ? `0 0 30px ${twin.colorHex}20, var(--glass-shadow)`
                  : 'var(--glass-shadow)',
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="text-4xl p-3 rounded-xl"
                  style={{ background: `${twin.colorHex}20` }}
                >
                  {twin.emoji}
                </div>
                <div className={twin.status === 'active' ? 'status-dot-active' : 'status-dot-idle'} />
              </div>
              <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{twin.name}</h3>
              <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>{twin.role}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-16 rounded-full" style={{ background: 'var(--glass-bg)' }}>
                    <div
                      className="h-1.5 rounded-full"
                      style={{
                        width: `${twin.confidence * 100}%`,
                        background: `linear-gradient(90deg, ${twin.colorHex}, ${twin.colorHex}cc)`,
                        boxShadow: `0 0 8px ${twin.colorHex}40`,
                      }}
                    />
                  </div>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{Math.round(twin.confidence * 100)}%</span>
                </div>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{twin.lastActive}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Skill Twins Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>⚡ Skill Twins</h2>
          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Specialist Executors</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredSkillTwins.map((twin) => (
            <button
              key={twin.id}
              onClick={() => setSelectedTwin(twin)}
              className="glass-card p-4 text-left transition-all duration-200 cursor-pointer"
              style={{
                border: twin.status === 'active'
                  ? `1px solid rgba(59, 130, 246, 0.4)`
                  : '1px solid var(--glass-border)',
                boxShadow: twin.status === 'active'
                  ? '0 0 20px rgba(59, 130, 246, 0.1), var(--glass-shadow)'
                  : 'var(--glass-shadow)',
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl">{twin.emoji}</div>
                <div className={twin.status === 'active' ? 'status-dot-active' : 'status-dot-idle'} />
              </div>
              <div className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>{twin.name}</div>
              <div className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>{twin.category}</div>
              <div className="flex items-center justify-between text-xs">
                <span style={{ color: 'var(--text-muted)' }}>{twin.tasksCompleted} tasks</span>
                <span style={{ color: twin.status === 'active' ? 'var(--color-success)' : 'var(--text-muted)' }}>
                  {Math.round(twin.confidence * 100)}%
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Twin Detail Modal */}
      {selectedTwin && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedTwin(null)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-2xl p-8 rounded-2xl glass-card"
            style={{ background: 'var(--bg-dark-secondary)', boxShadow: '0 0 60px rgba(59, 130, 246, 0.15), var(--glass-shadow)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedTwin(null)}
              className="absolute top-4 right-4 text-2xl cursor-pointer"
              style={{ color: 'var(--text-muted)' }}
            >
              ×
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div
                className="text-6xl p-4 rounded-2xl"
                style={{ background: `${('colorHex' in selectedTwin ? selectedTwin.colorHex : '#3b82f6')}20` }}
              >
                {selectedTwin.emoji}
              </div>
              <div>
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{selectedTwin.name}</h2>
                <p style={{ color: 'var(--text-secondary)' }}>
                  {'role' in selectedTwin ? selectedTwin.role : selectedTwin.category}
                </p>
              </div>
            </div>

            {'description' in selectedTwin && (
              <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>{selectedTwin.description}</p>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { value: `${Math.round(selectedTwin.confidence * 100)}%`, label: 'Confidence' },
                { value: `${selectedTwin.tasksCompleted}`, label: 'Tasks' },
                { value: selectedTwin.lastActive, label: 'Last Active' },
              ].map((stat) => (
                <div key={stat.label} className="p-4 rounded-xl text-center" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
                  <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{stat.value}</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                className="flex-1 py-3 rounded-xl font-semibold cursor-pointer transition-all duration-200"
                style={{
                  background: selectedTwin.status === 'active'
                    ? 'rgba(239, 68, 68, 0.15)'
                    : 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                  color: 'var(--text-primary)',
                  border: selectedTwin.status === 'active' ? '1px solid rgba(239, 68, 68, 0.3)' : 'none',
                  boxShadow: selectedTwin.status !== 'active' ? '0 0 20px rgba(59, 130, 246, 0.3)' : 'none',
                }}
              >
                {selectedTwin.status === 'active' ? '⏸️ Deactivate' : '▶️ Activate'}
              </button>
              <button className="glass-btn flex-1 py-3 rounded-xl font-semibold">
                ⚙️ Configure
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

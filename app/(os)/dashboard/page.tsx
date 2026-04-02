/**
 * Main Dashboard Page
 * 
 * Mission control center for Digital Twin OS.
 * Provides high-level overview of active twins, activity, and memory.
 * 
 * Multi-Skill Pipeline:
 * - Product Twin: Dashboard layout architecture
 * - Design Twin: Glass Morphism widgets with ambient glows
 * - Code Twin: Responsive CSS Grid/Flexbox layout
 * - Analyst Twin: Key performance metrics
 * 
 * @module app/(os)/dashboard/page
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Analyst Twin: Key Performance Metrics
const METRICS = [
  {
    id: 'decisions',
    label: 'Decisions Synthesized',
    value: 127,
    change: '+12%',
    emoji: '🎯',
    color: '#3b82f6',
    description: 'Council deliberations completed',
  },
  {
    id: 'tasks',
    label: 'Tasks Executed',
    value: 842,
    change: '+28%',
    emoji: '⚡',
    color: '#8b5cf6',
    description: 'Skill twin tasks completed',
  },
  {
    id: 'memory',
    label: 'Memory Optimized',
    value: '94%',
    change: '+5%',
    emoji: '🧠',
    color: '#10b981',
    description: 'Contextual memory efficiency',
  },
  {
    id: 'active',
    label: 'Active Twins',
    value: 15,
    change: '0',
    emoji: '🤖',
    color: '#f59e0b',
    description: '5 Council + 10 Skill twins',
  },
];

// Active twins in workspace
const ACTIVE_TWINS = [
  { id: 'strategist', name: 'Strategist', emoji: '🎯', status: 'active', lastActive: '2m ago' },
  { id: 'builder', name: 'Builder', emoji: '🔧', status: 'active', lastActive: '5m ago' },
  { id: 'critic', name: 'Critic', emoji: '🧐', status: 'active', lastActive: '2m ago' },
  { id: 'research', name: 'Research', emoji: '🔬', status: 'active', lastActive: '15m ago' },
  { id: 'content', name: 'Content', emoji: '✍️', status: 'idle', lastActive: '1h ago' },
];

// Recent council activity
const RECENT_ACTIVITY = [
  {
    id: 1,
    type: 'council',
    question: 'Should we expand into enterprise sales next quarter?',
    summary: 'Council recommended pilot program with 3-5 design partners',
    twins: ['🎯', '🔧', '🧐'],
    timestamp: '2 minutes ago',
    confidence: 0.77,
  },
  {
    id: 2,
    type: 'skill',
    question: 'Research competitive landscape for AI tools',
    summary: 'Research Twin analyzed 12 competitors, identified 3 key differentiators',
    twins: ['🔬'],
    timestamp: '15 minutes ago',
    confidence: 0.92,
  },
  {
    id: 3,
    type: 'council',
    question: 'Prioritize Q2 product roadmap features',
    summary: 'Council identified 3 high-impact features, flagged 2 risks',
    twins: ['🎯', '📊', '⚙️'],
    timestamp: '1 hour ago',
    confidence: 0.85,
  },
  {
    id: 4,
    type: 'team',
    question: 'Launch marketing campaign for new feature',
    summary: 'Growth Team executed multi-channel campaign strategy',
    twins: ['📈', '📢', '✍️'],
    timestamp: '3 hours ago',
    confidence: 0.88,
  },
];

// Quick actions
const QUICK_ACTIONS = [
  { label: 'Ask Council', href: '/council', emoji: '🎯', color: '#3b82f6' },
  { label: 'Browse Twins', href: '/marketplace', emoji: '🏪', color: '#8b5cf6' },
  { label: 'View Memory', href: '/memory', emoji: '🧠', color: '#10b981' },
  { label: 'Create Workflow', href: '/workflows', emoji: '⚡', color: '#f59e0b' },
];

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetch
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Dashboard
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Mission control for your Digital Twin OS
          </p>
        </div>
        <div 
          className="px-4 py-2 rounded-full text-sm"
          style={{
            background: 'rgba(16, 185, 129, 0.2)',
            color: 'var(--color-success)',
          }}
        >
          <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ background: 'var(--color-success)' }} />
          All Systems Operational
        </div>
      </div>

      {/* Metric Cards (Analyst Twin + Design Twin) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map((metric) => (
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
                className="text-3xl p-3 rounded-xl"
                style={{ background: `${metric.color}20` }}
              >
                {metric.emoji}
              </div>
              <span 
                className="text-sm font-semibold"
                style={{ color: metric.change.startsWith('+') ? 'var(--color-success)' : 'var(--text-muted)' }}
              >
                {metric.change}
              </span>
            </div>
            <div 
              className="text-3xl font-bold mb-1"
              style={{ color: 'var(--text-primary)' }}
            >
              {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
            </div>
            <div 
              className="text-sm font-medium mb-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              {metric.label}
            </div>
            <div 
              className="text-xs"
              style={{ color: 'var(--text-muted)' }}
            >
              {metric.description}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid (Product Twin) */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Activity Feed - Takes 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <div 
            className="p-6 rounded-xl"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
            }}
          >
            <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {QUICK_ACTIONS.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="p-4 rounded-xl text-center transition-all hover:scale-105"
                  style={{
                    background: `${action.color}10`,
                    border: `1px solid ${action.color}30`,
                  }}
                >
                  <div className="text-2xl mb-2">{action.emoji}</div>
                  <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {action.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div 
            className="p-6 rounded-xl"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                Recent Activity
              </h2>
              <Link 
                href="/council"
                className="text-sm"
                style={{ color: 'var(--color-primary)' }}
              >
                View All →
              </Link>
            </div>

            <div className="space-y-4">
              {RECENT_ACTIVITY.map((activity) => (
                <div
                  key={activity.id}
                  className="p-4 rounded-lg transition-all hover:bg-white/5"
                  style={{ background: 'rgba(255, 255, 255, 0.02)' }}
                >
                  <div className="flex items-start gap-4">
                    {/* Twin Emojis */}
                    <div className="flex -space-x-2">
                      {activity.twins.map((emoji, i) => (
                        <div 
                          key={i}
                          className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                          style={{
                            background: 'var(--glass-bg)',
                            border: '2px solid var(--bg-dark-secondary)',
                            marginLeft: i > 0 ? '-8px' : '0',
                          }}
                        >
                          {emoji}
                        </div>
                      ))}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span 
                          className="text-xs px-2 py-1 rounded-full"
                          style={{
                            background: activity.type === 'council' 
                              ? 'rgba(59, 130, 246, 0.2)'
                              : activity.type === 'skill'
                              ? 'rgba(139, 92, 246, 0.2)'
                              : 'rgba(16, 185, 129, 0.2)',
                            color: activity.type === 'council'
                              ? 'var(--color-primary)'
                              : activity.type === 'skill'
                              ? 'var(--color-secondary)'
                              : 'var(--color-success)',
                          }}
                        >
                          {activity.type === 'council' ? 'Council' : activity.type === 'skill' ? 'Skill' : 'Team'}
                        </span>
                        <span 
                          className="text-xs"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {activity.timestamp}
                        </span>
                      </div>
                      <p 
                        className="font-medium mb-1 truncate"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {activity.question}
                      </p>
                      <p 
                        className="text-sm line-clamp-2"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {activity.summary}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <div 
                          className="text-xs"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          Confidence: {Math.round(activity.confidence * 100)}%
                        </div>
                        <div 
                          className="flex-1 h-1 rounded-full"
                          style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                        >
                          <div 
                            className="h-1 rounded-full"
                            style={{ 
                              width: `${activity.confidence * 100}%`,
                              background: activity.confidence > 0.8 
                                ? 'var(--color-success)'
                                : activity.confidence > 0.6
                                ? 'var(--color-warning)'
                                : 'var(--color-error)',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Active Roster */}
        <div className="space-y-6">
          {/* Active Twins */}
          <div 
            className="p-6 rounded-xl"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                Active Roster
              </h2>
              <Link 
                href="/twins"
                className="text-sm"
                style={{ color: 'var(--color-primary)' }}
              >
                Manage →
              </Link>
            </div>

            <div className="space-y-3">
              {ACTIVE_TWINS.map((twin) => (
                <div
                  key={twin.id}
                  className="flex items-center gap-3 p-3 rounded-lg"
                  style={{ background: 'rgba(255, 255, 255, 0.02)' }}
                >
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{
                      background: twin.status === 'active' 
                        ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))'
                        : 'var(--glass-bg)',
                      boxShadow: twin.status === 'active' 
                        ? '0 0 20px rgba(59, 130, 246, 0.3)'
                        : 'none',
                    }}
                  >
                    {twin.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium" style={{ color: 'var(--text-primary)' }}>
                      {twin.name}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {twin.lastActive}
                    </div>
                  </div>
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: twin.status === 'active' 
                        ? 'var(--color-success)'
                        : 'var(--color-warning)',
                      boxShadow: twin.status === 'active' 
                        ? '0 0 10px var(--color-success)'
                        : 'none',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Memory Health */}
          <div 
            className="p-6 rounded-xl"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
            }}
          >
            <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Memory Health
            </h2>

            {/* Conversation Memory */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Conversation
                </span>
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  847 KB
                </span>
              </div>
              <div 
                className="h-2 rounded-full"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              >
                <div 
                  className="h-2 rounded-full"
                  style={{ width: '35%', background: 'var(--color-primary)' }}
                />
              </div>
            </div>

            {/* Contextual Memory */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Contextual
                </span>
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  1.2 MB
                </span>
              </div>
              <div 
                className="h-2 rounded-full"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              >
                <div 
                  className="h-2 rounded-full"
                  style={{ width: '50%', background: 'var(--color-secondary)' }}
                />
              </div>
            </div>

            {/* Project Memory */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Project
                </span>
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  2.4 MB
                </span>
              </div>
              <div 
                className="h-2 rounded-full"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              >
                <div 
                  className="h-2 rounded-full"
                  style={{ width: '75%', background: 'var(--color-success)' }}
                />
              </div>
            </div>

            <Link
              href="/memory"
              className="block mt-4 text-center py-2 rounded-lg text-sm"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'var(--text-secondary)',
              }}
            >
              View Memory →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Memory Page
 * 
 * 3-tier memory visualization with Glass Morphism design.
 * Displays Conversation Buffer, Contextual Workspace, and Project Knowledge Base.
 * 
 * @module app/(os)/memory/page
 */

'use client';

import { useState } from 'react';
import GlassWrapper from '../components/GlassWrapper';

// Memory tiers
const MEMORY_TIERS = [
  {
    id: 'conversation',
    name: 'Conversation Buffer',
    description: 'Session-level temporary storage',
    emoji: '💬',
    color: 'var(--color-primary)',
    utilization: 45,
    maxCapacity: '1 MB',
    currentUsage: '450 KB',
    records: 847,
    retention: '24 hours',
  },
  {
    id: 'contextual',
    name: 'Contextual Workspace',
    description: 'User-level working memory',
    emoji: '🧠',
    color: 'var(--color-secondary)',
    utilization: 68,
    maxCapacity: '10 MB',
    currentUsage: '6.8 MB',
    records: 2341,
    retention: '30 days',
  },
  {
    id: 'project',
    name: 'Project Knowledge Base',
    description: 'Long-term persistent storage',
    emoji: '📚',
    color: 'var(--color-success)',
    utilization: 34,
    maxCapacity: '100 MB',
    currentUsage: '34 MB',
    records: 12584,
    retention: 'Permanent',
  },
];

// Mock memory blocks
const MOCK_MEMORY_BLOCKS = {
  conversation: [
    { id: 1, type: 'query', preview: 'Should we expand into enterprise...', timestamp: '2m ago', twin: '🎯' },
    { id: 2, type: 'response', preview: 'Council recommends pilot program...', timestamp: '2m ago', twin: '📋' },
    { id: 3, type: 'query', preview: 'Analyze competitive landscape...', timestamp: '15m ago', twin: '🔬' },
    { id: 4, type: 'response', preview: 'Research identified 3 key differentiators...', timestamp: '15m ago', twin: '📊' },
    { id: 5, type: 'query', preview: 'Review code for security issues...', timestamp: '1h ago', twin: '💻' },
  ],
  contextual: [
    { id: 1, key: 'user_preferences', type: 'config', size: '12 KB', lastAccess: '5m ago' },
    { id: 2, key: 'twin_activations', type: 'state', size: '45 KB', lastAccess: '2m ago' },
    { id: 3, key: 'workflow_history', type: 'history', size: '128 KB', lastAccess: '1h ago' },
    { id: 4, key: 'council_decisions', type: 'decision', size: '256 KB', lastAccess: '15m ago' },
    { id: 5, key: 'skill_executions', type: 'execution', size: '89 KB', lastAccess: '30m ago' },
  ],
  project: [
    { id: 1, key: 'product_roadmap', type: 'document', size: '1.2 MB', created: 'Mar 15', version: 12 },
    { id: 2, key: 'competitor_analysis', type: 'research', size: '3.4 MB', created: 'Mar 20', version: 8 },
    { id: 3, key: 'technical_architecture', type: 'spec', size: '2.1 MB', created: 'Feb 28', version: 24 },
    { id: 4, key: 'user_research', type: 'insights', size: '890 KB', created: 'Mar 25', version: 5 },
    { id: 5, key: 'growth_metrics', type: 'analytics', size: '4.5 MB', created: 'Jan 10', version: 45 },
  ],
};

export default function MemoryPage() {
  const [selectedTier, setSelectedTier] = useState('conversation');
  const [searchQuery, setSearchQuery] = useState('');

  const currentTier = MEMORY_TIERS.find(t => t.id === selectedTier);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Memory System
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            3-tier contextual memory architecture
          </p>
        </div>
        
        {/* Search */}
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search memory..."
            className="px-4 py-2 rounded-lg"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-primary)',
            }}
          />
        </div>
      </div>

      {/* Memory Tiers Overview */}
      <div className="grid md:grid-cols-3 gap-4">
        {MEMORY_TIERS.map((tier) => (
          <button
            key={tier.id}
            onClick={() => setSelectedTier(tier.id)}
            className={`p-6 rounded-xl text-left transition-all hover:scale-105 ${
              selectedTier === tier.id ? 'ring-2 ring-blue-500' : ''
            }`}
            style={{
              background: selectedTier === tier.id
                ? `linear-gradient(135deg, ${tier.color}20, ${tier.color}10)`
                : 'var(--glass-bg)',
              border: `1px solid ${selectedTier === tier.id ? tier.color : 'var(--glass-border)'}`,
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="text-3xl p-3 rounded-xl"
                style={{ background: `${tier.color}20` }}
              >
                {tier.emoji}
              </div>
              <div>
                <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {tier.name}
                </div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {tier.description}
                </div>
              </div>
            </div>

            {/* Utilization Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Utilization
                </span>
                <span className="text-xs font-medium" style={{ color: tier.color }}>
                  {tier.utilization}%
                </span>
              </div>
              <div 
                className="h-2 rounded-full"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              >
                <div 
                  className="h-2 rounded-full transition-all"
                  style={{ 
                    width: `${tier.utilization}%`,
                    background: tier.color,
                    boxShadow: `0 0 10px ${tier.color}50`,
                  }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <div style={{ color: 'var(--text-muted)' }}>Records</div>
                <div className="font-medium" style={{ color: 'var(--text-primary)' }}>
                  {tier.records.toLocaleString()}
                </div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)' }}>Retention</div>
                <div className="font-medium" style={{ color: 'var(--text-primary)' }}>
                  {tier.retention}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Tier Details */}
      <GlassWrapper>
        <div className="space-y-6">
          {/* Tier Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="text-4xl p-4 rounded-xl"
                style={{ background: `${currentTier?.color}20` }}
              >
                {currentTier?.emoji}
              </div>
              <div>
                <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {currentTier?.name}
                </h2>
                <p style={{ color: 'var(--text-secondary)' }}>
                  {currentTier?.currentUsage} / {currentTier?.maxCapacity} used
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                className="px-4 py-2 rounded-lg"
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--text-primary)',
                }}
              >
                🔄 Refresh
              </button>
              <button
                className="px-4 py-2 rounded-lg"
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                  color: 'var(--text-primary)',
                }}
              >
                🧹 Optimize
              </button>
            </div>
          </div>

          {/* Memory Blocks Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_MEMORY_BLOCKS[selectedTier as keyof typeof MOCK_MEMORY_BLOCKS]?.map((block) => (
              <div
                key={block.id}
                className="p-4 rounded-lg transition-all hover:scale-105"
                style={{
                  background: 'rgba(0, 0, 0, 0.2)',
                  border: '1px solid var(--glass-border)',
                }}
              >
                {selectedTier === 'conversation' && (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{(block as any).twin}</span>
                      <span 
                        className="px-2 py-1 rounded-full text-xs"
                        style={{
                          background: (block as any).type === 'query' 
                            ? 'rgba(59, 130, 246, 0.2)'
                            : 'rgba(16, 185, 129, 0.2)',
                          color: (block as any).type === 'query'
                            ? 'var(--color-primary)'
                            : 'var(--color-success)',
                        }}
                      >
                        {(block as any).type}
                      </span>
                    </div>
                    <p className="text-sm truncate" style={{ color: 'var(--text-primary)' }}>
                      {(block as any).preview}
                    </p>
                    <div className="mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                      {(block as any).timestamp}
                    </div>
                  </>
                )}

                {selectedTier === 'contextual' && (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                        {(block as any).key}
                      </span>
                      <span 
                        className="px-2 py-1 rounded-full text-xs"
                        style={{
                          background: 'var(--glass-bg)',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {(block as any).type}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span style={{ color: 'var(--text-muted)' }}>Size: {(block as any).size}</span>
                      <span style={{ color: 'var(--text-muted)' }}>Last: {(block as any).lastAccess}</span>
                    </div>
                  </>
                )}

                {selectedTier === 'project' && (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                        {(block as any).key}
                      </span>
                      <span 
                        className="px-2 py-1 rounded-full text-xs"
                        style={{
                          background: 'rgba(139, 92, 246, 0.2)',
                          color: 'var(--color-secondary)',
                        }}
                      >
                        v{(block as any).version}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span style={{ color: 'var(--text-muted)' }}>{(block as any).type}</span>
                      <span style={{ color: 'var(--text-muted)' }}>{(block as any).size}</span>
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      Created: {(block as any).created}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </GlassWrapper>

      {/* Memory Health */}
      <div className="grid md:grid-cols-4 gap-4">
        <GlassWrapper>
          <div className="text-center">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              15.8 MB
            </div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Total Usage
            </div>
          </div>
        </GlassWrapper>

        <GlassWrapper>
          <div className="text-center">
            <div className="text-3xl mb-2">📝</div>
            <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              15,772
            </div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Total Records
            </div>
          </div>
        </GlassWrapper>

        <GlassWrapper>
          <div className="text-center">
            <div className="text-3xl mb-2">⚡</div>
            <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              94%
            </div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Optimization Score
            </div>
          </div>
        </GlassWrapper>

        <GlassWrapper>
          <div className="text-center">
            <div className="text-3xl mb-2">🔄</div>
            <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              247
            </div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Active Sessions
            </div>
          </div>
        </GlassWrapper>
      </div>
    </div>
  );
}

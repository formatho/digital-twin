/**
 * Twin Marketplace Page
 * 
 * Interactive marketplace for discovering and activating Skill Twins.
 * 
 * Multi-Skill Pipeline:
 * - Product Twin: Filtering/search mechanics
 * - Design Twin: Glass Morphism twin profile cards
 * - Code Twin: React state + API wiring
 * - Marketing Twin: Compelling microcopy
 * 
 * @module app/(os)/marketplace/page
 */

'use client';

import { useState, useEffect } from 'react';

// Skill Twin categories (Product Twin)
const CATEGORIES = [
  { id: 'all', label: 'All Twins', emoji: '🤖' },
  { id: 'technical', label: 'Technical', emoji: '💻' },
  { id: 'creative', label: 'Creative', emoji: '🎨' },
  { id: 'business', label: 'Business', emoji: '📈' },
  { id: 'analytical', label: 'Analytical', emoji: '📊' },
  { id: 'operational', label: 'Operational', emoji: '🏢' },
];

// Twin interface
interface SkillTwin {
  id: string;
  name: string;
  emoji: string;
  category: string;
  description: string;
  capabilities: string[];
  operationalCapabilities: string[];
  knowledgeBoundaries: {
    domain: string;
    expertise: string[];
    limitations: string[];
  };
  promptSignature: string;
  rating: number;
  usageCount: number;
}

// Twin listing from API
interface TwinListing {
  twin: { id: string; name: string; emoji: string };
  category: string;
  description: string;
  rating: number;
  usageCount: number;
  isActivated: boolean;
  tags: string[];
  capabilities?: string[];
}

export default function MarketplacePage() {
  // State management (Code Twin)
  const [twins, setTwins] = useState<TwinListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTwin, setSelectedTwin] = useState<TwinListing | null>(null);
  const [activationStatus, setActivationStatus] = useState<Record<string, boolean>>({});
  
  // Team assembly state
  const [teamMode, setTeamMode] = useState(false);
  const [selectedTwins, setSelectedTwins] = useState<string[]>([]);
  const [teamName, setTeamName] = useState('');
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);

  // Fetch twins on mount (Code Twin)
  useEffect(() => {
    fetchTwins();
  }, []);

  const fetchTwins = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/marketplace?category=all');
      if (!res.ok) throw new Error('Failed to fetch twins');
      
      const data = await res.json();
      if (data.success && data.data) {
        setTwins(data.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load marketplace');
    } finally {
      setLoading(false);
    }
  };

  // Filter twins (Product Twin)
  const filteredTwins = twins.filter((twin) => {
    const matchesCategory = activeCategory === 'all' || twin.category.toLowerCase() === activeCategory;
    const matchesSearch = !searchQuery || 
      twin.twin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      twin.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Activate twin (Code Twin)
  const handleActivateTwin = async (twinId: string) => {
    try {
      const res = await fetch('/api/marketplace', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'activate',
          twinId,
          userId: 'user-session',
          sessionId: `session-${Date.now()}`,
        }),
      });

      if (!res.ok) throw new Error('Activation failed');
      
      setActivationStatus((prev) => ({ ...prev, [twinId]: true }));
      setSelectedTwin(null);
    } catch (err) {
      console.error('Activation error:', err);
    }
  };

  // Toggle twin selection for team
  const toggleTwinSelection = (twinId: string) => {
    setSelectedTwins((prev) =>
      prev.includes(twinId)
        ? prev.filter((id) => id !== twinId)
        : [...prev, twinId]
    );
  };

  // Create team (Code Twin)
  const handleCreateTeam = async () => {
    if (!teamName.trim() || selectedTwins.length === 0) return;

    setIsCreatingTeam(true);

    try {
      const res = await fetch('/api/marketplace', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'createTeam',
          name: teamName,
          twinIds: selectedTwins,
          userId: 'user-session',
          workflow: 'sequential',
        }),
      });

      if (!res.ok) throw new Error('Team creation failed');

      // Reset team mode
      setTeamMode(false);
      setSelectedTwins([]);
      setTeamName('');
    } catch (err) {
      console.error('Team creation error:', err);
    } finally {
      setIsCreatingTeam(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Twin Marketplace
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Discover and activate specialist twins
          </p>
        </div>

        {/* Team Mode Toggle */}
        <button
          onClick={() => setTeamMode(!teamMode)}
          className="px-4 py-2 rounded-lg font-semibold transition-all"
          style={{
            background: teamMode 
              ? 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))'
              : 'var(--glass-bg)',
            border: teamMode ? 'none' : '1px solid var(--glass-border)',
            color: 'var(--text-primary)',
          }}
        >
          {teamMode ? '✓ Team Mode' : '👥 Create Team'}
        </button>
      </div>

      {/* Team Assembly Bar */}
      {teamMode && (
        <div 
          className="p-6 rounded-xl flex items-center gap-4"
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
            border: '1px solid rgba(59, 130, 246, 0.2)',
          }}
        >
          <div className="flex-1">
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter team name (e.g., Growth Squad)"
              className="w-full px-4 py-2 rounded-lg"
              style={{
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-primary)',
              }}
            />
          </div>
          <div 
            className="px-4 py-2 rounded-lg"
            style={{ background: 'var(--glass-bg)', color: 'var(--text-secondary)' }}
          >
            {selectedTwins.length} twins selected
          </div>
          <button
            onClick={handleCreateTeam}
            disabled={selectedTwins.length === 0 || !teamName.trim() || isCreatingTeam}
            className="px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
            style={{
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
              color: 'var(--text-primary)',
            }}
          >
            {isCreatingTeam ? 'Creating...' : 'Create Team'}
          </button>
        </div>
      )}

      {/* Search & Filter (Product Twin) */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search twins..."
            className="w-full px-4 py-3 rounded-xl"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-primary)',
            }}
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="px-4 py-2 rounded-lg whitespace-nowrap transition-all"
              style={{
                background: activeCategory === cat.id 
                  ? 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))'
                  : 'var(--glass-bg)',
                border: activeCategory === cat.id ? 'none' : '1px solid var(--glass-border)',
                color: 'var(--text-primary)',
              }}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl" style={{ background: 'var(--glass-bg)' }}>
            <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full" />
            <span style={{ color: 'var(--text-secondary)' }}>Loading twins...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div 
          className="text-center py-12 p-6 rounded-xl"
          style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}
        >
          <div className="text-4xl mb-4">⚠️</div>
          <p style={{ color: 'var(--color-error)' }}>{error}</p>
          <button
            onClick={fetchTwins}
            className="mt-4 px-6 py-2 rounded-lg"
            style={{ background: 'var(--glass-bg)', color: 'var(--text-primary)' }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State (Marketing Twin microcopy) */}
      {!loading && !error && filteredTwins.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            No twins found
          </h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            Try adjusting your search or filter to discover more twins.
          </p>
        </div>
      )}

      {/* Twin Grid (Design Twin) */}
      {!loading && !error && filteredTwins.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTwins.map((listing) => {
            const isActivated = activationStatus[listing.twin.id] || listing.isActivated;
            const isSelected = selectedTwins.includes(listing.twin.id);

            return (
              <div
                key={listing.twin.id}
                onClick={() => teamMode ? toggleTwinSelection(listing.twin.id) : setSelectedTwin(listing)}
                className={`p-6 rounded-xl cursor-pointer transition-all hover:scale-105 ${
                  teamMode && isSelected ? 'ring-2 ring-blue-500' : ''
                }`}
                style={{
                  background: isActivated 
                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))'
                    : 'var(--glass-bg)',
                  border: isActivated 
                    ? '1px solid rgba(16, 185, 129, 0.3)'
                    : '1px solid var(--glass-border)',
                }}
              >
                {/* Twin Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{listing.twin.emoji}</div>
                  {isActivated && (
                    <span 
                      className="px-2 py-1 rounded-full text-xs"
                      style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--color-success)' }}
                    >
                      ✓ Active
                    </span>
                  )}
                  {teamMode && isSelected && (
                    <span 
                      className="px-2 py-1 rounded-full text-xs"
                      style={{ background: 'rgba(59, 130, 246, 0.2)', color: 'var(--color-primary)' }}
                    >
                      ✓ Selected
                    </span>
                  )}
                </div>

                {/* Twin Info */}
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {listing.twin.name}
                </h3>
                <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                  {listing.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {listing.tags?.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded-full text-xs"
                      style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-muted)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-muted)' }}>
                  <span>⭐ {listing.rating.toFixed(1)}</span>
                  <span>{listing.usageCount} uses</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Twin Detail Modal */}
      {selectedTwin && !teamMode && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedTwin(null)}
        >
          <div className="absolute inset-0 bg-black/70" />
          <div 
            className="relative w-full max-w-2xl p-8 rounded-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--bg-dark-secondary)',
              border: '1px solid var(--glass-border)',
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedTwin(null)}
              className="absolute top-4 right-4 text-2xl"
              style={{ color: 'var(--text-muted)' }}
            >
              ×
            </button>

            {/* Twin Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="text-6xl">{selectedTwin.twin.emoji}</div>
              <div>
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {selectedTwin.twin.name}
                </h2>
                <p style={{ color: 'var(--text-secondary)' }}>
                  {selectedTwin.category} Twin
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
              {selectedTwin.description}
            </p>

            {/* Capabilities */}
            {selectedTwin.capabilities && selectedTwin.capabilities.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                  ⚡ Capabilities
                </h3>
                <div className="space-y-2">
                  {selectedTwin.capabilities.map((cap, i) => (
                    <div 
                      key={i}
                      className="px-4 py-2 rounded-lg"
                      style={{ background: 'var(--glass-bg)' }}
                    >
                      <span style={{ color: 'var(--text-secondary)' }}>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activate Button (Marketing Twin CTA) */}
            <button
              onClick={() => handleActivateTwin(selectedTwin.twin.id)}
              disabled={activationStatus[selectedTwin.twin.id]}
              className="w-full py-4 rounded-xl font-semibold text-lg transition-all disabled:opacity-50"
              style={{
                background: activationStatus[selectedTwin.twin.id]
                  ? 'rgba(16, 185, 129, 0.3)'
                  : 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                color: 'var(--text-primary)',
              }}
            >
              {activationStatus[selectedTwin.twin.id] ? '✓ Activated in Workspace' : '🎯 Activate Twin in Workspace'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Council Chamber Page
 * 
 * Interactive frontend for the Council Chamber.
 * Allows users to submit queries and view synthesized debate results.
 * 
 * Multi-Skill Pipeline:
 * - Product Twin: User journey state machine
 * - Design Twin: Visual grid with twin cards
 * - Code Twin: React state + API wiring
 * - Content Twin: Loading state microcopy
 * 
 * @module app/(os)/council/page
 */

'use client';

import { useState, useEffect } from 'react';

// Twin profiles from Phase 2 JSON
const COUNCIL_TWINS = [
  { id: 'strategist', name: 'The Strategist', emoji: '🎯', color: '#3b82f6' },
  { id: 'builder', name: 'The Builder', emoji: '🔧', color: '#8b5cf6' },
  { id: 'analyst', name: 'The Analyst', emoji: '📊', color: '#10b981' },
  { id: 'operator', name: 'The Operator', emoji: '⚙️', color: '#f59e0b' },
  { id: 'critic', name: 'The Critic', emoji: '🧐', color: '#ef4444' },
];

// Content Twin: Loading microcopy for each twin
const LOADING_MESSAGES: Record<string, string[]> = {
  strategist: [
    'Analyzing market trends...',
    'Mapping competitive landscape...',
    'Identifying long-term opportunities...',
  ],
  builder: [
    'Assessing implementation feasibility...',
    'Calculating resource requirements...',
    'Designing execution roadmap...',
  ],
  analyst: [
    'Processing data metrics...',
    'Running statistical models...',
    'Validating assumptions with data...',
  ],
  operator: [
    'Evaluating system processes...',
    'Identifying operational bottlenecks...',
    'Designing automation opportunities...',
  ],
  critic: [
    'Stress-testing your assumptions...',
    'Identifying hidden risks...',
    'Playing devil\'s advocate...',
  ],
};

type AppState = 'input' | 'debating' | 'result' | 'error';

interface CouncilResponse {
  requestId: string;
  question: string;
  individualResponses: Array<{
    twinId: string;
    twinName: string;
    emoji: string;
    perspective: string;
    confidence: number;
    keyPoints: string[];
  }>;
  synthesis?: {
    areasOfAgreement: string[];
    areasOfTension: Array<{ twins: string[]; tension: string }>;
    recommendedActions: string[];
    confidenceLevel: string;
  };
}

export default function CouncilChamberPage() {
  const [appState, setAppState] = useState<AppState>('input');
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState<CouncilResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeLoadingTwin, setActiveLoadingTwin] = useState(0);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  useEffect(() => {
    if (appState !== 'debating') return;
    const twinInterval = setInterval(() => {
      setActiveLoadingTwin((prev) => (prev + 1) % COUNCIL_TWINS.length);
    }, 1500);
    const messageInterval = setInterval(() => {
      setLoadingMessageIndex((prev) => (prev + 1) % 3);
    }, 2000);
    return () => { clearInterval(twinInterval); clearInterval(messageInterval); };
  }, [appState]);

  const handleSubmit = async () => {
    if (!question.trim()) return;
    setAppState('debating');
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('/api/council', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: question.trim(), userId: 'user-session', sessionId: `session-${Date.now()}` }),
      });
      if (!res.ok) throw new Error(`API returned ${res.status}`);
      const data = await res.json();
      if (data.success && data.data) {
        setResponse(data.data);
        setAppState('result');
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to summon council');
      setAppState('error');
    }
  };

  const handleReset = () => {
    setQuestion('');
    setResponse(null);
    setError(null);
    setAppState('input');
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Council Chamber</h1>
        <p style={{ color: 'var(--text-secondary)' }}>5 Strategic Twins debate your decisions in parallel</p>
      </div>

      {appState === 'input' && (
        <div className="max-w-2xl mx-auto p-8 rounded-2xl" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
          <label className="block text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Ask the Council</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g., Should we expand into enterprise sales next quarter?"
            className="w-full h-32 p-4 rounded-xl resize-none focus:outline-none"
            style={{ background: 'rgba(0, 0, 0, 0.3)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}
          />
          <button
            onClick={handleSubmit}
            disabled={!question.trim()}
            className="mt-4 w-full py-4 rounded-xl font-semibold text-lg transition-all disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', color: 'var(--text-primary)' }}
          >
            🎯 Summon Council
          </button>
        </div>
      )}

      {appState === 'debating' && (
        <div className="space-y-8">
          <div className="flex justify-center gap-6">
            {COUNCIL_TWINS.map((twin, index) => (
              <div key={twin.id} className={`text-center transition-all ${index === activeLoadingTwin ? 'scale-110' : 'opacity-50'}`}>
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                  style={{
                    background: index === activeLoadingTwin ? `${twin.color}30` : 'var(--glass-bg)',
                    border: `2px solid ${index === activeLoadingTwin ? twin.color : 'var(--glass-border)'}`,
                  }}
                >
                  {twin.emoji}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <span style={{ color: 'var(--text-secondary)' }}>
              {COUNCIL_TWINS[activeLoadingTwin].emoji} {LOADING_MESSAGES[COUNCIL_TWINS[activeLoadingTwin].id][loadingMessageIndex]}
            </span>
          </div>
        </div>
      )}

      {appState === 'error' && (
        <div className="max-w-md mx-auto p-6 rounded-xl text-center" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
          <div className="text-4xl mb-4">⚠️</div>
          <p style={{ color: 'var(--color-error)' }}>{error}</p>
          <button onClick={handleReset} className="mt-4 px-6 py-2 rounded-lg" style={{ background: 'var(--glass-bg)', color: 'var(--text-primary)' }}>Try Again</button>
        </div>
      )}

      {appState === 'result' && response && (
        <div className="space-y-8">
          {response.synthesis && (
            <div className="p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))' }}>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>📋 Council Synthesis</h2>
              <div className="mb-6">
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>✅ Recommended Actions</h3>
                <ol className="space-y-2">
                  {response.synthesis.recommendedActions.map((action, i) => (
                    <li key={i} style={{ color: 'var(--text-secondary)' }}>{i + 1}. {action}</li>
                  ))}
                </ol>
              </div>
              {response.synthesis.areasOfTension.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>⚡ Areas of Tension</h3>
                  {response.synthesis.areasOfTension.map((tension, i) => (
                    <div key={i} className="p-3 rounded-lg mb-2" style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
                      <div style={{ color: 'var(--color-warning)' }}>{tension.twins.join(' vs ')}</div>
                      <div style={{ color: 'var(--text-secondary)' }}>{tension.tension}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {response.individualResponses.map((twinRes) => {
              const twin = COUNCIL_TWINS.find(t => t.id === twinRes.twinId);
              const isCritic = twinRes.twinId === 'critic';
              return (
                <div key={twinRes.twinId} className="p-6 rounded-xl" style={{ background: isCritic ? 'rgba(239, 68, 68, 0.05)' : 'var(--glass-bg)', border: isCritic ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid var(--glass-border)', borderTop: `3px solid ${twin?.color}` }}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{twinRes.emoji}</span>
                    <div>
                      <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>{twinRes.twinName}</div>
                      <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{Math.round(twinRes.confidence * 100)}% confidence</div>
                    </div>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{twinRes.perspective}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center">
            <button onClick={handleReset} className="px-8 py-3 rounded-xl" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}>Ask Another Question</button>
          </div>
        </div>
      )}
    </div>
  );
}

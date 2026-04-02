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

// State machine types
type AppState = 'input' | 'debating' | 'result' | 'error';

interface CouncilResponse {
  requestId: string;
  question: string;
  participants: Array<{ id: string; type: string; name: string; emoji: string }>;
  individualResponses: Array<{
    twinId: string;
    twinName: string;
    emoji: string;
    perspective: string;
    confidence: number;
    keyPoints: string[];
  }>;
  synthesizedOutput: string;
  synthesis?: {
    areasOfAgreement: string[];
    areasOfTension: Array<{ twins: string[]; tension: string }>;
    recommendedActions: string[];
    confidenceLevel: string;
    consensusRatio: number;
  };
  confidence: number;
}

export default function CouncilChamberPage() {
  // State management (Code Twin)
  const [appState, setAppState] = useState<AppState>('input');
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState<CouncilResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeLoadingTwin, setActiveLoadingTwin] = useState(0);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  // Loading animation effect
  useEffect(() => {
    if (appState !== 'debating') return;

    const twinInterval = setInterval(() => {
      setActiveLoadingTwin((prev) => (prev + 1) % COUNCIL_TWINS.length);
    }, 1500);

    const messageInterval = setInterval(() => {
      setLoadingMessageIndex((prev) => (prev + 1) % 3);
    }, 2000);

    return () => {
      clearInterval(twinInterval);
      clearInterval(messageInterval);
    };
  }, [appState]);

  // API fetch logic (Code Twin)
  const handleSubmit = async () => {
    if (!question.trim()) return;

    setAppState('debating');
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('/api/council', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question.trim(),
          userId: 'user-session',
          sessionId: `session-${Date.now()}`,
          includeSynthesis: true,
        }),
      });

      if (!res.ok) {
        throw new Error(`API returned ${res.status}`);
      }

      const data = await res.json();
      
      if (data.success && data.data) {
        setResponse(data.data);
        setAppState('result');
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Council API error:', err);
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
      {/* Header */}
      <div className="text-center">
        <h1 
          className="text-4xl font-bold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          Council Chamber
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          5 Strategic Twins debate your decisions in parallel
        </p>
      </div>

      {/* INPUT STATE */}
      {appState === 'input' && (
        <div 
          className="max-w-2xl mx-auto p-8 rounded-2xl"
          style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
          }}
        >
          <label 
            className="block text-lg font-semibold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Ask the Council
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g., Should we expand into enterprise sales next quarter?"
            className="w-full h-32 p-4 rounded-xl resize-none focus:outline-none focus:ring-2"
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-primary)',
              fontSize: 'var(--font-size-base)',
            }}
          />
          <button
            onClick={handleSubmit}
            disabled={!question.trim()}
            className="mt-4 w-full py-4 rounded-xl font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
              color: 'var(--text-primary)',
            }}
          >
            🎯 Summon Council
          </button>
        </div>
      )}

      {/* DEBATING/LOADING STATE */}
      {appState === 'debating' && (
        <div className="space-y-8">
          {/* Twin avatars with pulse animation */}
          <div className="flex justify-center gap-6">
            {COUNCIL_TWINS.map((twin, index) => (
              <div
                key={twin.id}
                className={`text-center transition-all duration-500 ${
                  index === activeLoadingTwin ? 'scale-110' : 'opacity-50'
                }`}
              >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-2"
                  style={{
                    background: index === activeLoadingTwin 
                      ? `linear-gradient(135deg, ${twin.color}40, ${twin.color}20)`
                      : 'var(--glass-bg)',
                    border: `2px solid ${index === activeLoadingTwin ? twin.color : 'var(--glass-border)'}`,
                    boxShadow: index === activeLoadingTwin 
                      ? `0 0 30px ${twin.color}50`
                      : 'none',
                    animation: index === activeLoadingTwin ? 'pulse 2s infinite' : 'none',
                  }}
                >
                  {twin.emoji}
                </div>
                <div 
                  className="text-xs"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {twin.name.replace('The ', '')}
                </div>
              </div>
            ))}
          </div>

          {/* Loading message (Content Twin microcopy) */}
          <div 
            className="text-center p-6 rounded-xl max-w-md mx-auto"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
            }}
          >
            <div className="animate-pulse">
              <span className="text-2xl mr-2">
                {COUNCIL_TWINS[activeLoadingTwin].emoji}
              </span>
              <span style={{ color: 'var(--text-secondary)' }}>
                {LOADING_MESSAGES[COUNCIL_TWINS[activeLoadingTwin].id][loadingMessageIndex]}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ERROR STATE */}
      {appState === 'error' && (
        <div 
          className="max-w-md mx-auto p-6 rounded-xl text-center"
          style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
          }}
        >
          <div className="text-4xl mb-4">⚠️</div>
          <h3 
            className="text-lg font-semibold mb-2"
            style={{ color: 'var(--color-error)' }}
          >
            Council Summoning Failed
          </h3>
          <p 
            className="text-sm mb-4"
            style={{ color: 'var(--text-secondary)' }}
          >
            {error}
          </p>
          <button
            onClick={handleReset}
            className="px-6 py-2 rounded-lg"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-primary)',
            }}
          >
            Try Again
          </button>
        </div>
      )}

      {/* RESULT STATE */}
      {appState === 'result' && response && (
        <div className="space-y-8">
          {/* Synthesis Summary */}
          {response.synthesis && (
            <div 
              className="p-6 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
                border: '1px solid rgba(59, 130, 246, 0.2)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 
                  className="text-2xl font-bold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  📋 Council Synthesis
                </h2>
                <div 
                  className="px-3 py-1 rounded-full text-sm"
                  style={{
                    background: response.synthesis.confidenceLevel === 'high' 
                      ? 'rgba(16, 185, 129, 0.2)'
                      : response.synthesis.confidenceLevel === 'medium'
                      ? 'rgba(245, 158, 11, 0.2)'
                      : 'rgba(239, 68, 68, 0.2)',
                    color: response.synthesis.confidenceLevel === 'high'
                      ? 'var(--color-success)'
                      : response.synthesis.confidenceLevel === 'medium'
                      ? 'var(--color-warning)'
                      : 'var(--color-error)',
                  }}
                >
                  {response.synthesis.confidenceLevel.toUpperCase()} CONFIDENCE
                </div>
              </div>

              {/* Recommended Actions */}
              <div className="mb-6">
                <h3 
                  className="text-lg font-semibold mb-3"
                  style={{ color: 'var(--text-primary)' }}
                >
                  ✅ Recommended Actions
                </h3>
                <ol className="space-y-2">
                  {response.synthesis.recommendedActions.map((action, i) => (
                    <li 
                      key={i}
                      className="flex items-start gap-2"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <span className="font-bold" style={{ color: 'var(--color-primary)' }}>
                        {i + 1}.
                      </span>
                      {action}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Areas of Agreement */}
              {response.synthesis.areasOfAgreement.length > 0 && (
                <div className="mb-6">
                  <h3 
                    className="text-lg font-semibold mb-3"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    🤝 Areas of Agreement
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {response.synthesis.areasOfAgreement.map((area, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-sm"
                        style={{
                          background: 'rgba(16, 185, 129, 0.2)',
                          color: 'var(--color-success)',
                        }}
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Areas of Tension */}
              {response.synthesis.areasOfTension.length > 0 && (
                <div className="mb-6">
                  <h3 
                    className="text-lg font-semibold mb-3"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    ⚡ Areas of Tension
                  </h3>
                  <div className="space-y-2">
                    {response.synthesis.areasOfTension.map((tension, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg"
                        style={{
                          background: 'rgba(245, 158, 11, 0.1)',
                          border: '1px solid rgba(245, 158, 11, 0.2)',
                        }}
                      >
                        <div 
                          className="text-sm font-medium mb-1"
                          style={{ color: 'var(--color-warning)' }}
                        >
                          {tension.twins.join(' vs ')}
                        </div>
                        <div 
                          className="text-sm"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          {tension.tension}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Individual Twin Perspectives */}
          <div>
            <h2 
              className="text-2xl font-bold mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              🎭 Individual Perspectives
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {response.individualResponses.map((twinResponse) => {
                const twin = COUNCIL_TWINS.find(t => t.id === twinResponse.twinId);
                const isCritic = twinResponse.twinId === 'critic';
                
                return (
                  <div
                    key={twinResponse.twinId}
                    className="p-6 rounded-xl"
                    style={{
                      background: isCritic 
                        ? 'rgba(239, 68, 68, 0.05)'
                        : 'var(--glass-bg)',
                      border: isCritic
                        ? '1px solid rgba(239, 68, 68, 0.2)'
                        : '1px solid var(--glass-border)',
                      borderTop: `3px solid ${twin?.color || 'var(--color-primary)'}`,
                    }}
                  >
                    {/* Twin Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{twinResponse.emoji}</span>
                      <div>
                        <div 
                          className="font-semibold"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {twinResponse.twinName}
                        </div>
                        <div 
                          className="text-xs"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          Confidence: {Math.round(twinResponse.confidence * 100)}%
                        </div>
                      </div>
                    </div>

                    {/* Perspective */}
                    <p 
                      className="text-sm mb-4 leading-relaxed"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {twinResponse.perspective}
                    </p>

                    {/* Key Points */}
                    {twinResponse.keyPoints.length > 0 && (
                      <div className="space-y-1">
                        {twinResponse.keyPoints.map((point, i) => (
                          <div
                            key={i}
                            className="text-xs flex items-start gap-2"
                            style={{ color: 'var(--text-muted)' }}
                          >
                            <span style={{ color: twin?.color }}>•</span>
                            {point}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* New Question Button */}
          <div className="text-center">
            <button
              onClick={handleReset}
              className="px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-primary)',
              }}
            >
              Ask Another Question
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

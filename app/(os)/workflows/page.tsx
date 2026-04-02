/**
 * Automation Workflows Page
 * 
 * Visual workflow builder for chaining Skill Twins into pipelines.
 * 
 * Multi-Skill Pipeline:
 * - Product Twin: Pipeline builder logic (Trigger ➔ Twin 1 ➔ Twin 2 ➔ Output)
 * - Design Twin: Node-based linear UI with Glass Morphism
 * - Code Twin: Complex React state for workflow management
 * - Operations Twin: Pre-built workflow templates
 * 
 * @module app/(os)/workflows/page
 */

'use client';

import { useState, useCallback } from 'react';

// Operations Twin: Pre-built workflow templates
const WORKFLOW_TEMPLATES = [
  {
    id: 'weekly-content',
    name: 'Weekly Content Engine',
    description: 'Generate weekly blog + social content from topic input',
    emoji: '📝',
    color: '#3b82f6',
    steps: [
      { twinId: 'research', name: 'Research', emoji: '🔬', prompt: 'Research trending topics in {topic}' },
      { twinId: 'content', name: 'Content', emoji: '✍️', prompt: 'Write blog post based on research' },
      { twinId: 'design', name: 'Design', emoji: '🎨', prompt: 'Create social media graphics' },
      { twinId: 'marketing', name: 'Marketing', emoji: '📢', prompt: 'Generate distribution strategy' },
    ],
  },
  {
    id: 'competitor-analysis',
    name: 'Competitor Analysis',
    description: 'Deep-dive into competitor landscape with insights',
    emoji: '🔍',
    color: '#8b5cf6',
    steps: [
      { twinId: 'research', name: 'Research', emoji: '🔬', prompt: 'Identify top 5 competitors in {market}' },
      { twinId: 'analyst', name: 'Analyst', emoji: '📊', prompt: 'Analyze competitive positioning' },
      { twinId: 'strategist', name: 'Strategist', emoji: '🎯', prompt: 'Identify strategic opportunities' },
    ],
  },
  {
    id: 'code-review',
    name: 'Code Review Pipeline',
    description: 'Automated code review with security & quality checks',
    emoji: '💻',
    color: '#10b981',
    steps: [
      { twinId: 'code', name: 'Code', emoji: '💻', prompt: 'Review code for best practices' },
      { twinId: 'critic', name: 'Critic', emoji: '🧐', prompt: 'Identify potential security issues' },
      { twinId: 'builder', name: 'Builder', emoji: '🔧', prompt: 'Suggest refactoring improvements' },
    ],
  },
];

// Available twins for selection
const AVAILABLE_TWINS = [
  { id: 'strategist', name: 'Strategist', emoji: '🎯', color: '#3b82f6' },
  { id: 'builder', name: 'Builder', emoji: '🔧', color: '#8b5cf6' },
  { id: 'analyst', name: 'Analyst', emoji: '📊', color: '#10b981' },
  { id: 'operator', name: 'Operator', emoji: '⚙️', color: '#f59e0b' },
  { id: 'critic', name: 'Critic', emoji: '🧐', color: '#ef4444' },
  { id: 'research', name: 'Research', emoji: '🔬', color: '#6366f1' },
  { id: 'content', name: 'Content', emoji: '✍️', color: '#ec4899' },
  { id: 'design', name: 'Design', emoji: '🎨', color: '#f97316' },
  { id: 'growth', name: 'Growth', emoji: '📈', color: '#14b8a6' },
  { id: 'code', name: 'Code', emoji: '💻', color: '#22c55e' },
  { id: 'marketing', name: 'Marketing', emoji: '📢', color: '#a855f7' },
  { id: 'sales', name: 'Sales', emoji: '💰', color: '#fbbf24' },
];

// Workflow step interface
interface WorkflowStep {
  id: string;
  twinId: string;
  name: string;
  emoji: string;
  prompt: string;
  order: number;
  status: 'pending' | 'running' | 'completed' | 'error';
}

// Workflow interface
interface Workflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  trigger: 'manual' | 'scheduled' | 'webhook';
  status: 'draft' | 'running' | 'completed' | 'error';
}

export default function WorkflowsPage() {
  // Code Twin: Complex React state management
  const [workflow, setWorkflow] = useState<Workflow>({
    id: '',
    name: '',
    description: '',
    steps: [],
    trigger: 'manual',
    status: 'draft',
  });
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showTwinSelector, setShowTwinSelector] = useState(false);
  const [editingStep, setEditingStep] = useState<string | null>(null);

  // Code Twin: Add step to workflow
  const addStep = useCallback((twinId: string) => {
    const twin = AVAILABLE_TWINS.find(t => t.id === twinId);
    if (!twin) return;

    const newStep: WorkflowStep = {
      id: `step-${Date.now()}`,
      twinId: twin.id,
      name: twin.name,
      emoji: twin.emoji,
      prompt: '',
      order: workflow.steps.length,
      status: 'pending',
    };

    setWorkflow(prev => ({
      ...prev,
      steps: [...prev.steps, newStep],
    }));

    setShowTwinSelector(false);
    setEditingStep(newStep.id);
  }, [workflow.steps.length]);

  // Code Twin: Remove step from workflow
  const removeStep = useCallback((stepId: string) => {
    setWorkflow(prev => ({
      ...prev,
      steps: prev.steps
        .filter(s => s.id !== stepId)
        .map((s, index) => ({ ...s, order: index })),
    }));
  }, []);

  // Code Twin: Update step prompt
  const updateStepPrompt = useCallback((stepId: string, prompt: string) => {
    setWorkflow(prev => ({
      ...prev,
      steps: prev.steps.map(s =>
        s.id === stepId ? { ...s, prompt } : s
      ),
    }));
  }, []);

  // Code Twin: Reorder steps (move up/down)
  const moveStep = useCallback((stepId: string, direction: 'up' | 'down') => {
    setWorkflow(prev => {
      const steps = [...prev.steps];
      const index = steps.findIndex(s => s.id === stepId);
      if (index === -1) return prev;

      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= steps.length) return prev;

      // Swap steps
      [steps[index], steps[newIndex]] = [steps[newIndex], steps[index]];

      // Update order
      return {
        ...prev,
        steps: steps.map((s, i) => ({ ...s, order: i })),
      };
    });
  }, []);

  // Load template
  const loadTemplate = useCallback((templateId: string) => {
    const template = WORKFLOW_TEMPLATES.find(t => t.id === templateId);
    if (!template) return;

    const steps: WorkflowStep[] = template.steps.map((s, index) => ({
      id: `step-${Date.now()}-${index}`,
      twinId: s.twinId,
      name: s.name,
      emoji: s.emoji,
      prompt: s.prompt,
      order: index,
      status: 'pending',
    }));

    setWorkflow({
      id: `workflow-${Date.now()}`,
      name: template.name,
      description: template.description,
      steps,
      trigger: 'manual',
      status: 'draft',
    });

    setSelectedTemplate(templateId);
  }, []);

  // Run workflow (Product Twin: execution dispatch)
  const runWorkflow = async () => {
    if (workflow.steps.length === 0) return;

    setIsRunning(true);

    // Simulate running each step sequentially
    for (let i = 0; i < workflow.steps.length; i++) {
      const step = workflow.steps[i];
      
      // Mark as running
      setWorkflow(prev => ({
        ...prev,
        steps: prev.steps.map(s =>
          s.id === step.id ? { ...s, status: 'running' } : s
        ),
      }));

      // Simulate execution delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mark as completed
      setWorkflow(prev => ({
        ...prev,
        steps: prev.steps.map(s =>
          s.id === step.id ? { ...s, status: 'completed' } : s
        ),
      }));
    }

    setIsRunning(false);
    setWorkflow(prev => ({ ...prev, status: 'completed' }));
  };

  // Clear workflow
  const clearWorkflow = () => {
    setWorkflow({
      id: '',
      name: '',
      description: '',
      steps: [],
      trigger: 'manual',
      status: 'draft',
    });
    setSelectedTemplate(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Automation Workflows
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Chain Skill Twins into powerful execution pipelines
          </p>
        </div>

        {workflow.steps.length > 0 && (
          <button
            onClick={clearWorkflow}
            className="px-4 py-2 rounded-lg"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-secondary)',
            }}
          >
            Clear Canvas
          </button>
        )}
      </div>

      {/* Template Gallery (Operations Twin) */}
      <div>
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
          🚀 Quick Start Templates
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {WORKFLOW_TEMPLATES.map((template) => (
            <button
              key={template.id}
              onClick={() => loadTemplate(template.id)}
              className={`p-6 rounded-xl text-left transition-all hover:scale-105 ${
                selectedTemplate === template.id ? 'ring-2 ring-blue-500' : ''
              }`}
              style={{
                background: selectedTemplate === template.id
                  ? `linear-gradient(135deg, ${template.color}20, ${template.color}10)`
                  : 'var(--glass-bg)',
                border: `1px solid ${selectedTemplate === template.id ? template.color : 'var(--glass-border)'}`,
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div 
                  className="text-3xl p-3 rounded-xl"
                  style={{ background: `${template.color}20` }}
                >
                  {template.emoji}
                </div>
                <div>
                  <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {template.name}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {template.steps.length} steps
                  </div>
                </div>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {template.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Workflow Builder Canvas (Design Twin + Code Twin) */}
      <div 
        className="p-8 rounded-xl min-h-[400px]"
        style={{
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
            Pipeline Builder
          </h2>
          
          {/* Workflow name input */}
          <input
            type="text"
            value={workflow.name}
            onChange={(e) => setWorkflow(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Workflow name..."
            className="px-4 py-2 rounded-lg"
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-primary)',
            }}
          />
        </div>

        {/* Empty State */}
        {workflow.steps.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Start Building Your Pipeline
            </h3>
            <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
              Select a template above or add steps manually
            </p>
            <button
              onClick={() => setShowTwinSelector(true)}
              className="px-6 py-3 rounded-xl font-semibold"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                color: 'var(--text-primary)',
              }}
            >
              + Add First Step
            </button>
          </div>
        )}

        {/* Pipeline Steps (Linear Vertical - Design Twin) */}
        {workflow.steps.length > 0 && (
          <div className="space-y-4">
            {/* Trigger Node */}
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, var(--color-success), var(--color-primary))',
                }}
              >
                <span className="text-2xl">▶️</span>
              </div>
              <div>
                <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Trigger
                </div>
                <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  Manual execution
                </div>
              </div>
            </div>

            {/* Connection Line */}
            <div className="ml-8 w-0.5 h-8" style={{ background: 'var(--glass-border)' }} />

            {/* Steps */}
            {workflow.steps.map((step, index) => (
              <div key={step.id}>
                <div className="flex items-start gap-4">
                  {/* Step Node */}
                  <div 
                    className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all ${
                      step.status === 'running' ? 'animate-pulse' : ''
                    }`}
                    style={{
                      background: step.status === 'completed'
                        ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(16, 185, 129, 0.1))'
                        : step.status === 'running'
                        ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.1))'
                        : 'var(--glass-bg)',
                      border: `2px solid ${
                        step.status === 'completed'
                          ? 'var(--color-success)'
                          : step.status === 'running'
                          ? 'var(--color-primary)'
                          : 'var(--glass-border)'
                      }`,
                      boxShadow: step.status === 'completed'
                        ? '0 0 20px rgba(16, 185, 129, 0.3)'
                        : step.status === 'running'
                        ? '0 0 20px rgba(59, 130, 246, 0.3)'
                        : 'none',
                    }}
                  >
                    <span className="text-2xl">{step.emoji}</span>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1">
                    <div 
                      className="p-4 rounded-lg"
                      style={{ background: 'rgba(0, 0, 0, 0.2)' }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                          Step {index + 1}: {step.name}
                        </div>
                        <div className="flex gap-2">
                          {/* Move Up */}
                          <button
                            onClick={() => moveStep(step.id, 'up')}
                            disabled={index === 0}
                            className="p-1 rounded disabled:opacity-30"
                            style={{ color: 'var(--text-muted)' }}
                          >
                            ↑
                          </button>
                          {/* Move Down */}
                          <button
                            onClick={() => moveStep(step.id, 'down')}
                            disabled={index === workflow.steps.length - 1}
                            className="p-1 rounded disabled:opacity-30"
                            style={{ color: 'var(--text-muted)' }}
                          >
                            ↓
                          </button>
                          {/* Remove */}
                          <button
                            onClick={() => removeStep(step.id)}
                            className="p-1 rounded"
                            style={{ color: 'var(--color-error)' }}
                          >
                            ✕
                          </button>
                        </div>
                      </div>

                      {/* Prompt Input */}
                      <textarea
                        value={step.prompt}
                        onChange={(e) => updateStepPrompt(step.id, e.target.value)}
                        placeholder="Enter instruction for this twin..."
                        className="w-full p-3 rounded-lg text-sm resize-none"
                        style={{
                          background: 'rgba(0, 0, 0, 0.3)',
                          border: '1px solid var(--glass-border)',
                          color: 'var(--text-primary)',
                        }}
                        rows={2}
                      />

                      {/* Status Indicator */}
                      {step.status !== 'pending' && (
                        <div 
                          className="mt-2 text-xs"
                          style={{
                            color: step.status === 'completed'
                              ? 'var(--color-success)'
                              : step.status === 'running'
                              ? 'var(--color-primary)'
                              : 'var(--color-error)',
                          }}
                        >
                          {step.status === 'completed' && '✓ Completed'}
                          {step.status === 'running' && '⏳ Running...'}
                          {step.status === 'error' && '✕ Error'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Connection Line (Visual feedback - Guardrail 3) */}
                {index < workflow.steps.length - 1 && (
                  <div className="ml-8 w-0.5 h-8 transition-all" style={{ 
                    background: step.status === 'completed' 
                      ? 'var(--color-success)' 
                      : 'var(--glass-border)',
                    boxShadow: step.status === 'completed'
                      ? '0 0 10px rgba(16, 185, 129, 0.3)'
                      : 'none',
                  }} />
                )}
              </div>
            ))}

            {/* Connection Line to Output */}
            <div 
              className="ml-8 w-0.5 h-8 transition-all"
              style={{
                background: workflow.status === 'completed'
                  ? 'var(--color-success)'
                  : 'var(--glass-border)',
              }}
            />

            {/* Output Node */}
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center"
                style={{
                  background: workflow.status === 'completed'
                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(16, 185, 129, 0.1))'
                    : 'var(--glass-bg)',
                  border: `2px solid ${
                    workflow.status === 'completed' ? 'var(--color-success)' : 'var(--glass-border)'
                  }`,
                }}
              >
                <span className="text-2xl">📤</span>
              </div>
              <div>
                <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Output
                </div>
                <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {workflow.status === 'completed' ? 'Pipeline completed' : 'Awaiting execution'}
                </div>
              </div>
            </div>

            {/* Add Step Button */}
            <button
              onClick={() => setShowTwinSelector(true)}
              className="w-full py-4 rounded-xl border-2 border-dashed transition-all hover:border-blue-500"
              style={{
                borderColor: 'var(--glass-border)',
                color: 'var(--text-muted)',
              }}
            >
              + Add Step
            </button>
          </div>
        )}
      </div>

      {/* Execution Controls (Product Twin) */}
      {workflow.steps.length > 0 && (
        <div className="flex justify-center gap-4">
          <button
            onClick={runWorkflow}
            disabled={isRunning || workflow.steps.some(s => !s.prompt.trim())}
            className="px-8 py-4 rounded-xl font-semibold text-lg transition-all disabled:opacity-50"
            style={{
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
              color: 'var(--text-primary)',
            }}
          >
            {isRunning ? (
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Running Pipeline...
              </span>
            ) : (
              '▶️ Run Workflow'
            )}
          </button>
        </div>
      )}

      {/* Twin Selector Modal */}
      {showTwinSelector && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setShowTwinSelector(false)}
        >
          <div className="absolute inset-0 bg-black/70" />
          <div 
            className="relative w-full max-w-2xl p-6 rounded-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--bg-dark-secondary)',
              border: '1px solid var(--glass-border)',
            }}
          >
            <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Select Twin for Step
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {AVAILABLE_TWINS.map((twin) => (
                <button
                  key={twin.id}
                  onClick={() => addStep(twin.id)}
                  className="p-4 rounded-xl text-center transition-all hover:scale-105"
                  style={{
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                  }}
                >
                  <div className="text-3xl mb-2">{twin.emoji}</div>
                  <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {twin.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

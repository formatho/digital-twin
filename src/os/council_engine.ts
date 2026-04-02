/**
 * Digital Twin OS - Council Engine
 * 
 * Manages the 5 strategic council twins and their parallel reasoning.
 * 
 * Council Twins:
 * - 🎯 Strategist: Vision & Long-term thinking
 * - 🔧 Builder: Execution & Implementation
 * - 📊 Analyst: Data & Metrics
 * - ⚙️ Operator: Systems & Processes
 * - 🧐 Critic: Risk Assessment & Devil's Advocate
 * 
 * @module CouncilEngine
 * @version 1.1.0
 * @created April 2, 2026
 */

import type { TwinRef, UserContext, CouncilSynthesis } from './twin_engine';
import type { MemoryEngine } from './memory_engine';

// ============================================================================
// Core Types
// ============================================================================

/**
 * Council twin identifiers
 */
export type CouncilTwinId = 'strategist' | 'builder' | 'analyst' | 'operator' | 'critic';

/**
 * Individual twin response within council
 */
export interface CouncilTwinResponse {
  twinId: CouncilTwinId;
  twinName: string;
  emoji: string;
  perspective: string;
  confidence: number;
  keyPoints: string[];
  timestamp: Date;
}

/**
 * Input payload for council operations
 */
export interface CouncilPayload {
  question: string;
  userContext: UserContext;
  specificTwinId?: CouncilTwinId;
  includeSynthesis?: boolean;
  context?: Record<string, unknown>;
}

/**
 * Full council response
 */
export interface CouncilResponse {
  requestId: string;
  question: string;
  participants: TwinRef[];
  individualResponses: CouncilTwinResponse[];
  synthesizedOutput: string;
  synthesis?: CouncilSynthesis;
  confidence: number;
  timestamp: Date;
}

/**
 * Twin persona configuration
 */
export interface TwinPersona {
  id: CouncilTwinId;
  name: string;
  emoji: string;
  archetype: string;
  role: string;
  primaryFocus: string;
  thinkingStyle: string;
  riskTolerance: 'low' | 'medium' | 'high' | 'very-low';
  timeHorizon: string;
  communicationStyle: string;
  promptSignature: string;
  whenToSummon: string[];
}

// ============================================================================
// Council Twin Definitions
// ============================================================================

/**
 * Default council twin profiles
 * Loaded dynamically at runtime
 */
const DEFAULT_COUNCIL_TWINS: Record<CouncilTwinId, TwinPersona> = {
  strategist: {
    id: 'strategist',
    name: 'The Strategist',
    emoji: '🎯',
    archetype: 'Visionary Leader',
    role: 'Vision, direction, and long-term thinking',
    primaryFocus: 'Long-term goals, market positioning, competitive strategy',
    thinkingStyle: 'First principles, systems thinking',
    riskTolerance: 'medium',
    timeHorizon: '6-24 months',
    communicationStyle: 'Confident, visionary, inspiring',
    promptSignature: `You are The Strategist. Think in terms of vision, market positioning, and 
long-term competitive advantage. Always ask: "What's the 12-month play here?"
Challenge short-term thinking. Focus on sustainable differentiation.`,
    whenToSummon: [
      'Product roadmap decisions',
      'Market positioning questions',
      'Long-term planning',
      'Competitive analysis',
      'Vision alignment',
    ],
  },

  builder: {
    id: 'builder',
    name: 'The Builder',
    emoji: '🔧',
    archetype: 'Pragmatic Executor',
    role: 'Execution, implementation, and technical feasibility',
    primaryFocus: 'Implementation details, technical feasibility, resource constraints',
    thinkingStyle: 'Practical, hands-on, detail-oriented',
    riskTolerance: 'medium',
    timeHorizon: '1-4 weeks',
    communicationStyle: 'Direct, practical, solution-focused',
    promptSignature: `You are The Builder. Focus on implementation reality. What will actually 
break? What resources do we need? How long will this really take?
Always ask: "What's the simplest version that works?"`,
    whenToSummon: [
      'Technical feasibility assessment',
      'Resource planning',
      'Implementation approach',
      'Architecture decisions',
      'Sprint planning',
    ],
  },

  analyst: {
    id: 'analyst',
    name: 'The Analyst',
    emoji: '📊',
    archetype: 'Data-Driven Thinker',
    role: 'Data, metrics, and evidence-based reasoning',
    primaryFocus: 'Metrics, data interpretation, A/B testing, ROI analysis',
    thinkingStyle: 'Quantitative, hypothesis-driven, scientific',
    riskTolerance: 'low',
    timeHorizon: 'Current + historical data',
    communicationStyle: 'Precise, data-backed, cautious',
    promptSignature: `You are The Analyst. Demand evidence. What does the data say? 
Challenge assumptions with numbers. Identify what we don't know.
Always ask: "What would the metrics tell us?"`,
    whenToSummon: [
      'Metric interpretation',
      'A/B test design',
      'Performance analysis',
      'ROI calculations',
      'Data-driven decisions',
    ],
  },

  operator: {
    id: 'operator',
    name: 'The Operator',
    emoji: '⚙️',
    archetype: 'Systems Optimizer',
    role: 'Systems, processes, and operational efficiency',
    primaryFocus: 'Process efficiency, automation, scale, operations',
    thinkingStyle: 'Systems thinking, optimization, automation-first',
    riskTolerance: 'medium',
    timeHorizon: 'Current quarter',
    communicationStyle: 'Organized, systematic, efficiency-focused',
    promptSignature: `You are The Operator. How do we systematize this? What's the process?
Where are the bottlenecks? What can be automated?
Always ask: "How do we make this repeatable and scalable?"`,
    whenToSummon: [
      'Process optimization',
      'Workflow design',
      'Automation opportunities',
      'Scaling challenges',
      'Operational efficiency',
    ],
  },

  critic: {
    id: 'critic',
    name: 'The Critic',
    emoji: '🧐',
    archetype: 'Skeptical Challenger',
    role: 'Risk assessment, devil\'s advocate, and stress-testing',
    primaryFocus: 'Risk identification, assumption challenge, worst-case scenarios',
    thinkingStyle: 'Contrarian, risk-aware, stress-testing',
    riskTolerance: 'very-low',
    timeHorizon: 'Immediate risks + long-term threats',
    communicationStyle: 'Challenging, thorough, protective',
    promptSignature: `You are The Critic. Challenge everything. What could go wrong?
What are we assuming? What's the worst case? Play devil's advocate.
Always ask: "What are we not seeing?"`,
    whenToSummon: [
      'Risk assessment',
      'Decision validation',
      'Assumption testing',
      'Pre-mortem analysis',
      'Strategic challenges',
    ],
  },
};

// ============================================================================
// Council Engine Implementation
// ============================================================================

/**
 * CouncilEngine - Manages the 5 strategic council twins
 * 
 * Responsibilities:
 * - Load and manage council twin personas
 * - Coordinate parallel twin activation
 * - Aggregate and synthesize responses
 */
export class CouncilEngine {
  private twins: Map<CouncilTwinId, TwinPersona>;
  private activeSession: Map<string, CouncilTwinId[]>;
  private memoryEngine?: MemoryEngine;
  private isolationLocks: Map<string, boolean>;

  constructor(memoryEngine?: MemoryEngine) {
    this.twins = new Map();
    this.activeSession = new Map();
    this.memoryEngine = memoryEngine;
    this.isolationLocks = new Map();
    this.loadCouncilTwins();
  }

  /**
   * Load council twin profiles from JSON files
   * Replaces hardcoded COUNCIL_TWINS constant
   */
  private loadCouncilTwins(): void {
    // Load from JSON files via dynamic import
    const twinProfiles = {
      strategist: require('../twins/council/strategist.json'),
      builder: require('../twins/council/builder.json'),
      analyst: require('../twins/council/analyst.json'),
      operator: require('../twins/council/operator.json'),
      critic: require('../twins/council/critic.json'),
    };
    
    this.twins = new Map(Object.entries(twinProfiles) as [CouncilTwinId, TwinPersona][]);
  }

  // ==========================================================================
  // Initialization
  // ==========================================================================

  /**
   * Initialize the council engine
   */
  async initialize(): Promise<void> {
    // Load twin personas from storage if needed
    // For now, using pre-configured twins
  }

  // ==========================================================================
  // Twin Access
  // ==========================================================================

  /**
   * Get all council twins
   */
  getAllTwins(): TwinPersona[] {
    return Array.from(this.twins.values());
  }

  /**
   * Get a specific twin by ID
   */
  getTwin(id: CouncilTwinId): TwinPersona | null {
    return this.twins.get(id) || null;
  }

  /**
   * Get twin references for routing
   */
  getActiveTwins(): TwinRef[] {
    return this.getAllTwins().map(twin => ({
      id: twin.id,
      type: 'council' as const,
      name: twin.name,
      emoji: twin.emoji,
    }));
  }

  /**
   * Get twin persona configuration
   */
  async getTwinPersona(twinId: string): Promise<TwinPersona | null> {
    return this.twins.get(twinId as CouncilTwinId) || null;
  }

  // ==========================================================================
  // Council Operations
  // ==========================================================================

  /**
   * Summon the council for a question
   * Implements parallel reasoning with isolation locks
   */
  async summon(payload: CouncilPayload): Promise<CouncilResponse> {
    const requestId = this.generateRequestId();
    const timestamp = new Date();

    // Single twin mode
    if (payload.specificTwinId) {
      const twin = this.getTwin(payload.specificTwinId);
      if (!twin) {
        throw new Error(`Unknown council twin: ${payload.specificTwinId}`);
      }

      const response: CouncilTwinResponse = {
        twinId: twin.id,
        twinName: twin.name,
        emoji: twin.emoji,
        perspective: `[${twin.name} perspective - LLM invocation pending Day 15]`,
        confidence: 0.5,
        keyPoints: [],
        timestamp,
      };

      return {
        requestId,
        question: payload.question,
        participants: [{
          id: twin.id,
          type: 'council',
          name: twin.name,
          emoji: twin.emoji,
        }],
        individualResponses: [response],
        synthesizedOutput: response.perspective,
        confidence: 0.5,
        timestamp,
      };
    }

    // Full council mode - all 5 twins with parallel execution
    const allTwins = this.getAllTwins();
    const participants: TwinRef[] = allTwins.map(twin => ({
      id: twin.id,
      type: 'council' as const,
      name: twin.name,
      emoji: twin.emoji,
    }));

    // Execute all twins in parallel with isolation
    const individualResponses = await this.executeAllTwins(payload);

    // Synthesize responses if requested
    const synthesis = payload.includeSynthesis 
      ? this.synthesizeResponses(individualResponses)
      : undefined;

    // Calculate overall confidence
    const avgConfidence = individualResponses.reduce((sum, r) => sum + r.confidence, 0) / individualResponses.length;

    // Format synthesized output
    const synthesizedOutput = this.formatSynthesizedOutput(individualResponses, synthesis);

    return {
      requestId,
      question: payload.question,
      participants,
      individualResponses,
      synthesizedOutput,
      synthesis,
      confidence: avgConfidence,
      timestamp,
    };
  }

  // ==========================================================================
  // Parallel Execution Engine
  // ==========================================================================

  /**
   * Execute all 5 council twins in parallel
   * Uses isolation locks to prevent race conditions
   */
  private async executeAllTwins(payload: CouncilPayload): Promise<CouncilTwinResponse[]> {
    const startTime = Date.now();
    const sessionId = payload.userContext.sessionId;

    // Acquire root isolation lock
    const rootLock = `council_${sessionId}`;
    if (this.isolationLocks.has(rootLock)) {
      throw new Error('Council already executing for this session');
    }
    this.isolationLocks.set(rootLock, true);

    try {
      // Create isolated context for each twin using Promise.all
      const promises: Promise<CouncilTwinResponse>[] = [];
      
      for (const twin of this.getAllTwins()) {
        promises.push(this.invokeTwinInIsolation(twin, payload));
      }

      // Execute all twins in parallel
      const responses = await Promise.all(promises);
      
      // Log execution time
      const duration = Date.now() - startTime;
      console.log(`Council execution completed in ${duration}ms`);

      return responses;
    } finally {
      // Release root isolation lock
      this.isolationLocks.delete(rootLock);
    }
  }

  /**
   * Invoke a single twin with isolated context
   */
  private async invokeTwinInIsolation(
    twin: TwinPersona, 
    payload: CouncilPayload
  ): Promise<CouncilTwinResponse> {
    const twinLock = `${payload.userContext.sessionId}_${twin.id}`;
    
    // Check for twin-level lock (should not happen in parallel mode)
    if (this.isolationLocks.has(twinLock)) {
      console.warn(`Twin ${twin.id} already executing - returning placeholder`);
      return this.createPlaceholderResponse(twin);
    }

    try {
      // TODO: Day 15 - Replace with actual LLM invocation
      // For now, return placeholder with twin-specific reasoning hints
      const perspective = this.generatePlaceholderPerspective(twin, payload.question);
      
      return {
        twinId: twin.id,
        twinName: twin.name,
        emoji: twin.emoji,
        perspective,
        confidence: 0.5,
        keyPoints: this.extractPlaceholderKeyPoints(twin),
        timestamp: new Date(),
      };
    } catch (error) {
      console.error(`Twin ${twin.id} execution failed:`, error);
      return this.createPlaceholderResponse(twin);
    }
  }

  /**
   * Create placeholder response for failed twin
   */
  private createPlaceholderResponse(twin: TwinPersona): CouncilTwinResponse {
    return {
      twinId: twin.id,
      twinName: twin.name,
      emoji: twin.emoji,
      perspective: `[${twin.name} perspective - execution pending]`,
      confidence: 0,
      keyPoints: [],
      timestamp: new Date(),
    };
  }

  /**
   * Generate placeholder perspective based on twin persona
   */
  private generatePlaceholderPerspective(twin: TwinPersona, question: string): string {
    return `[${twin.name} perspective on "${question}" - LLM invocation pending Day 15]
    
Focus: ${twin.primaryFocus}
Thinking Style: ${twin.thinkingStyle}
Risk Tolerance: ${twin.riskTolerance}`;
  }

  /**
   * Extract placeholder key points based on twin persona
   */
  private extractPlaceholderKeyPoints(twin: TwinPersona): string[] {
    return [
      `Key consideration from ${twin.name} perspective`,
      `Focus area: ${twin.primaryFocus}`,
    ];
  }

  // ==========================================================================
  // Debate Protocol
  // ==========================================================================

  /**
   * Identify tensions between twin responses
   * Does NOT silence Critic or Operator - highlights unresolved risks
   */
  private identifyTensions(responses: CouncilTwinResponse[]): Array<{
    twins: [string, string];
    tension: string;
  }> {
    const tensions: Array<{ twins: [string, string]; tension: string }> = [];

    // Check for Critic's high-confidence warnings that aren't addressed
    const criticResponse = responses.find(r => r.twinId === 'critic');
    if (criticResponse && criticResponse.confidence > 0.7) {
      // Check if other twins addressed the critic's concerns
      const otherResponses = responses.filter(r => r.twinId !== 'critic');
      const criticPoints = new Set(criticResponse.keyPoints);
      
      for (const response of otherResponses) {
        const addressedPoints = response.keyPoints.filter(p => 
          Array.from(criticPoints).some(cp => cp.includes(p) || p.includes(cp))
        );
        
        if (addressedPoints.length === 0 && criticResponse.keyPoints.length > 0) {
          tensions.push({
            twins: ['Critic', response.twinName],
            tension: `Critic's risk assessment not addressed by ${response.twinName}`,
          });
        }
      }
    }

    // Check for Builder vs Strategist conflicts (pragmatism vs vision)
    const builderResponse = responses.find(r => r.twinId === 'builder');
    const strategistResponse = responses.find(r => r.twinId === 'strategist');
    
    if (builderResponse && strategistResponse) {
      // Look for timeline conflicts
      if (builderResponse.keyPoints.some(p => p.includes('weeks')) &&
          strategistResponse.keyPoints.some(p => p.includes('months'))) {
        tensions.push({
          twins: ['Builder', 'Strategist'],
          tension: 'Timeline mismatch: Builder focuses on weeks, Strategist on months',
        });
      }
    }

    return tensions;
  }

  // ==========================================================================
  // Synthesis Engine
  // ==========================================================================

  /**
   * Synthesize individual twin responses into unified council response
   */
  private synthesizeResponses(responses: CouncilTwinResponse[]): CouncilSynthesis {
    // Extract all key points
    const allKeyPoints: string[] = [];
    for (const response of responses) {
      allKeyPoints.push(...response.keyPoints);
    }

    // Find areas of agreement (points mentioned by multiple twins)
    const pointFrequency = new Map<string, number>();
    for (const point of allKeyPoints) {
      const normalized = point.toLowerCase().trim();
      pointFrequency.set(normalized, (pointFrequency.get(normalized) || 0) + 1);
    }

    const areasOfAgreement = Array.from(pointFrequency.entries())
      .filter(([_, count]) => count >= 2)
      .map(([point]) => point);

    // Identify tensions (Guardrail 2: MUST NOT silence Critic)
    const tensionObjects = this.identifyTensions(responses);
    const areasOfTension = tensionObjects.map(t => `${t.twins.join(' vs ')}: ${t.tension}`);

    // Extract recommended actions
    const recommendedActions: string[] = [];
    for (const response of responses) {
      for (const point of response.keyPoints) {
        const lower = point.toLowerCase();
        if (lower.includes('recommend') || lower.includes('should') || lower.includes('consider')) {
          recommendedActions.push(point);
        }
      }
    }

    // Calculate consensus ratio
    const highConfidenceCount = responses.filter(r => r.confidence > 0.6).length;
    const consensusRatio = highConfidenceCount / responses.length;

    // Determine confidence level
    let confidenceLevel: 'low' | 'medium' | 'high';
    if (consensusRatio >= 0.8 && areasOfTension.length === 0) {
      confidenceLevel = 'high';
    } else if (consensusRatio >= 0.6 || areasOfTension.length <= 2) {
      confidenceLevel = 'medium';
    } else {
      confidenceLevel = 'low';
    }

    // Guardrail 2: If high-confidence critical risk remains unresolved, highlight it
    if (tensionObjects.some(t => t.twins.includes('Critic'))) {
      // Ensure synthesis doesn't hide the tension
      confidenceLevel = confidenceLevel === 'high' ? 'medium' : confidenceLevel;
    }

    return {
      areasOfAgreement,
      areasOfTension,
      recommendedActions,
      confidenceLevel,
      consensusRatio,
    };
  }

  /**
   * Format synthesized output for display
   */
  private formatSynthesizedOutput(
    responses: CouncilTwinResponse[], 
    synthesis?: CouncilSynthesis
  ): string {
    if (!synthesis) {
      return responses.map(r => `**${r.twinName}**: ${r.perspective}`).join('\n\n');
    }

    let output = '## Council Deliberation\n\n';
    
    // Individual perspectives
    for (const response of responses) {
      output += `### ${response.emoji} ${response.twinName}\n${response.perspective}\n\n`;
    }

    // Synthesis
    output += '---\n\n## 📋 Council Synthesis\n\n';
    output += `**Areas of Agreement:**\n`;
    for (const area of synthesis.areasOfAgreement) {
      output += `- ${area}\n`;
    }

    output += `\n**Areas of Tension:**\n`;
    for (const tension of synthesis.areasOfTension) {
      output += `- ${tension}\n`;
    }

    output += `\n**Recommended Actions:**\n`;
    for (const action of synthesis.recommendedActions) {
      output += `${synthesis.recommendedActions.indexOf(action) + 1}. ${action}\n`;
    }

    output += `\n**Council Confidence:** ${synthesis.confidenceLevel} (${Math.round(synthesis.consensusRatio * 100)}% consensus)\n`;

    return output;
  }

  // ==========================================================================
  // Utilities
  // ==========================================================================

  /**
   * Generate unique request ID
   */
  private generateRequestId(): string {
    return `council_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Shutdown engine
   */
  async shutdown(): Promise<void> {
    this.activeSession.clear();
    this.isolationLocks.clear();
  }
}

// ============================================================================
// Factory Function
// ============================================================================

/**
 * Create a configured CouncilEngine instance
 */
export function createCouncilEngine(memoryEngine?: MemoryEngine): CouncilEngine {
  return new CouncilEngine(memoryEngine);
}

// ============================================================================
// Exports
// ============================================================================

export default CouncilEngine;

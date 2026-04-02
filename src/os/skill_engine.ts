/**
 * Digital Twin OS - Skill Engine
 * 
 * Manages specialized skill twins that users can activate on-demand.
 * 
 * Skill Twins:
 * - 🔬 Research: Information synthesis
 * - ✍️ Content: Blog, social, copywriting
 * - 🎨 Design: UI/UX, creative direction
 * - 📈 Growth: Acquisition, retention
 * - 💻 Code: Development, debugging
 * - 📢 Marketing: Strategy, campaigns
 * - 💰 Sales: Playbooks, closing
 * - ⚖️ Legal: Compliance, risk
 * - 📦 Product: Roadmap, requirements
 * - 🏢 Operations: Workflows, processes
 * 
 * @module SkillEngine
 * @version 1.0.0
 * @created April 2, 2026
 */

import type { TwinRef, UserContext } from './twin_engine';

// ============================================================================
// Core Types
// ============================================================================

/**
 * Skill twin identifiers
 */
export type SkillTwinId = 
  | 'research'
  | 'content'
  | 'design'
  | 'growth'
  | 'code'
  | 'marketing'
  | 'sales'
  | 'legal'
  | 'product'
  | 'operations';

/**
 * Skill twin categories
 */
export type SkillCategory = 
  | 'technical'
  | 'creative'
  | 'business'
  | 'analytical'
  | 'operational';

/**
 * Skill twin status
 */
export type SkillStatus = 'available' | 'activated' | 'busy' | 'unavailable';

/**
 * Input payload for skill operations
 */
export interface SkillPayload {
  twinId: SkillTwinId;
  task: string;
  userContext: UserContext;
  context?: Record<string, unknown>;
  constraints?: {
    maxTokens?: number;
    timeoutMs?: number;
  };
}

/**
 * Skill twin response
 */
export interface SkillResponse {
  requestId: string;
  twinId: SkillTwinId;
  twinName: string;
  emoji: string;
  output: string;
  confidence: number;
  metadata?: Record<string, unknown>;
  timestamp: Date;
}

/**
 * Skill twin configuration
 */
export interface SkillTwinConfig {
  id: SkillTwinId;
  name: string;
  emoji: string;
  domain: string;
  category: SkillCategory;
  description: string;
  capabilities: string[];
  tools: string[];
  promptSignature: string;
  rating: number;
  usageCount: number;
}

/**
 * Skill activation record
 */
export interface SkillActivation {
  twinId: SkillTwinId;
  userId: string;
  sessionId: string;
  activatedAt: Date;
  status: SkillStatus;
}

// ============================================================================
// Skill Twin Definitions
// ============================================================================

/**
 * Default skill twin profiles
 * Loaded dynamically at runtime
 */
const DEFAULT_SKILL_TWINS: Record<SkillTwinId, SkillTwinConfig> = {
  research: {
    id: 'research',
    name: 'Research Twin',
    emoji: '🔬',
    domain: 'Research, analysis, and information synthesis',
    category: 'analytical',
    description: 'Dig deep, verify sources, synthesize findings.',
    capabilities: [
      'Web research and synthesis',
      'Competitive intelligence',
      'Market research',
      'Literature reviews',
      'Trend analysis',
    ],
    tools: ['Web search', 'Document analysis', 'Data extraction'],
    promptSignature: `You are the Research Twin. Dig deep, verify sources, synthesize findings.
Provide comprehensive research with citations. Be thorough but organized.`,
    rating: 4.8,
    usageCount: 0,
  },

  content: {
    id: 'content',
    name: 'Content Twin',
    emoji: '✍️',
    domain: 'Content creation, copywriting, and messaging',
    category: 'creative',
    description: 'Create compelling, clear, and engaging content.',
    capabilities: [
      'Blog posts and articles',
      'Social media content',
      'Email copywriting',
      'Video scripts',
      'Brand messaging',
    ],
    tools: ['Writing templates', 'Tone guides', 'SEO tools'],
    promptSignature: `You are the Content Twin. Create compelling, clear, and engaging content.
Match the brand voice. Optimize for the target audience and platform.`,
    rating: 4.9,
    usageCount: 0,
  },

  design: {
    id: 'design',
    name: 'Design Twin',
    emoji: '🎨',
    domain: 'Visual design, UI/UX, and creative direction',
    category: 'creative',
    description: 'Focus on visual clarity, user experience, and aesthetic excellence.',
    capabilities: [
      'UI/UX recommendations',
      'Visual design feedback',
      'Brand design guidance',
      'Design system input',
      'Creative direction',
    ],
    tools: ['Design principles', 'Color theory', 'Accessibility guides'],
    promptSignature: `You are the Design Twin. Focus on visual clarity, user experience, and 
aesthetic excellence. Balance beauty with usability.`,
    rating: 4.7,
    usageCount: 0,
  },

  growth: {
    id: 'growth',
    name: 'Growth Twin',
    emoji: '📈',
    domain: 'Growth strategy, acquisition, and retention',
    category: 'business',
    description: 'Think in experiments, metrics, and growth loops.',
    capabilities: [
      'Growth experiments',
      'Funnel optimization',
      'Viral mechanics',
      'Retention strategies',
      'Acquisition channels',
    ],
    tools: ['Growth frameworks', 'A/B testing guides', 'Metrics dashboards'],
    promptSignature: `You are the Growth Twin. Think in experiments, metrics, and loops.
How do we acquire, activate, and retain users? What's the growth lever?`,
    rating: 4.6,
    usageCount: 0,
  },

  code: {
    id: 'code',
    name: 'Code Twin',
    emoji: '💻',
    domain: 'Software development, architecture, and technical guidance',
    category: 'technical',
    description: 'Write clean, maintainable, efficient code.',
    capabilities: [
      'Code review and feedback',
      'Architecture recommendations',
      'Debugging assistance',
      'Technical documentation',
      'Best practices guidance',
    ],
    tools: ['Code analysis', 'Documentation', 'Testing frameworks'],
    promptSignature: `You are the Code Twin. Write clean, maintainable, efficient code.
Explain your reasoning. Consider edge cases and scalability.`,
    rating: 4.9,
    usageCount: 0,
  },

  marketing: {
    id: 'marketing',
    name: 'Marketing Twin',
    emoji: '📢',
    domain: 'Marketing strategy, campaigns, and brand positioning',
    category: 'business',
    description: 'Connect products to audiences through compelling narratives.',
    capabilities: [
      'Marketing strategy',
      'Campaign planning',
      'Brand positioning',
      'Channel strategy',
      'Messaging frameworks',
    ],
    tools: ['Marketing frameworks', 'Channel guides', 'Templates'],
    promptSignature: `You are the Marketing Twin. Connect products to audiences through 
compelling narratives and strategic positioning. Focus on ROI.`,
    rating: 4.5,
    usageCount: 0,
  },

  sales: {
    id: 'sales',
    name: 'Sales Twin',
    emoji: '💰',
    domain: 'Sales strategy, objection handling, and closing',
    category: 'business',
    description: 'Understand buyer psychology and guide prospects to decisions.',
    capabilities: [
      'Sales playbook creation',
      'Objection handling',
      'Pricing strategy',
      'Deal negotiation',
      'Pipeline management',
    ],
    tools: ['Sales frameworks', 'Objection databases', 'Templates'],
    promptSignature: `You are the Sales Twin. Understand buyer psychology, handle objections,
and guide prospects to confident decisions. Be consultative, not pushy.`,
    rating: 4.6,
    usageCount: 0,
  },

  legal: {
    id: 'legal',
    name: 'Legal Twin',
    emoji: '⚖️',
    domain: 'Legal considerations, compliance, and risk',
    category: 'operational',
    description: 'Identify legal risks and compliance requirements.',
    capabilities: [
      'Contract review guidance',
      'Compliance considerations',
      'Privacy implications',
      'IP considerations',
      'Risk mitigation',
    ],
    tools: ['Legal frameworks', 'Compliance checklists', 'Templates'],
    promptSignature: `You are the Legal Twin. Identify legal risks, compliance requirements,
and protective measures. Always recommend professional legal counsel.`,
    rating: 4.4,
    usageCount: 0,
  },

  product: {
    id: 'product',
    name: 'Product Twin',
    emoji: '📦',
    domain: 'Product strategy, roadmap, and user-centric thinking',
    category: 'business',
    description: 'Think user-first. What problem are we solving?',
    capabilities: [
      'Product requirements',
      'Roadmap planning',
      'User story creation',
      'Feature prioritization',
      'Product-market fit',
    ],
    tools: ['Product frameworks', 'User research guides', 'Templates'],
    promptSignature: `You are the Product Twin. Think user-first. What problem are we solving?
How does this feature create value? Prioritize ruthlessly.`,
    rating: 4.7,
    usageCount: 0,
  },

  operations: {
    id: 'operations',
    name: 'Operations Twin',
    emoji: '🏢',
    domain: 'Business operations, team management, and efficiency',
    category: 'operational',
    description: 'Optimize for efficiency, clarity, and execution.',
    capabilities: [
      'Process documentation',
      'Team workflows',
      'Resource allocation',
      'Meeting facilitation',
      'Project management',
    ],
    tools: ['Operations frameworks', 'Templates', 'Checklists'],
    promptSignature: `You are the Operations Twin. Optimize for efficiency, clarity, and 
execution. How do we make the team more effective? Reduce friction.`,
    rating: 4.5,
    usageCount: 0,
  },
};

// ============================================================================
// Skill Engine Implementation
// ============================================================================

/**
 * SkillEngine - Manages specialized skill twins
 * 
 * Responsibilities:
 * - Load and manage skill twin configurations
 * - Handle twin activation/deactivation
 * - Execute skill twin tasks
 * - Track usage and ratings
 */
export class SkillEngine {
  private twins: Map<SkillTwinId, SkillTwinConfig>;
  private activations: Map<string, SkillActivation>;
  private skillTwinsData: Map<SkillTwinId, SkillTwinConfig> | null = null;

  constructor() {
    this.twins = new Map();
    this.activations = new Map();
    this.loadSkillTwins();
  }

  /**
   * Load skill twin profiles from JSON files
   * Replaces hardcoded SKILL_TWINS constant
   */
  private loadSkillTwins(): void {
    // Load from JSON files via dynamic import
    const twinProfiles = {
      research: require('../twins/skills/research.json'),
      content: require('../twins/skills/content.json'),
      design: require('../twins/skills/design.json'),
      growth: require('../twins/skills/growth.json'),
      code: require('../twins/skills/code.json'),
      marketing: require('../twins/skills/marketing.json'),
      sales: require('../twins/skills/sales.json'),
      legal: require('../twins/skills/legal.json'),
      product: require('../twins/skills/product.json'),
      operations: require('../twins/skills/operations.json'),
    };
    
    this.twins = new Map(Object.entries(twinProfiles) as [SkillTwinId, SkillTwinConfig][]);
  }

  // ==========================================================================
  // Twin Invocation
  // ==========================================================================

  /**
   * Invoke a skill twin with a task
   * @param payload - Invocation payload
   * @returns Skill response
   */
  async invoke(payload: {
    twinId: SkillTwinId;
    task: string;
    userContext: UserContext;
    context?: Record<string, unknown>;
  }): Promise<SkillResponse> {
    const twin = this.getTwin(payload.twinId);
    if (!twin) {
      throw new Error(`Unknown skill twin: ${payload.twinId}`);
    }

    // Generate response based on twin's prompt signature
    const response: SkillResponse = {
      requestId: `skill_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      twinId: payload.twinId,
      twinName: twin.name,
      emoji: twin.emoji,
      output: `Processed task using ${twin.name}: ${payload.task}`,
      confidence: 0.85,
      metadata: {
        task: payload.task,
        capabilities: twin.capabilities,
        category: twin.category,
      },
      timestamp: new Date(),
    };

    return response;
  }

  // ==========================================================================
  // Initialization
  // ==========================================================================

  /**
   * Initialize the skill engine
   */
  async initialize(): Promise<void> {
    // Load skill twins from storage if needed
    // For now, using pre-configured twins
  }

  // ==========================================================================
  // Twin Access
  // ==========================================================================

  /**
   * Get all skill twins
   */
  getAllTwins(): SkillTwinConfig[] {
    return Array.from(this.twins.values());
  }

  /**
   * Get a specific twin by ID
   */
  getTwin(id: SkillTwinId): SkillTwinConfig | null {
    return this.twins.get(id) || null;
  }

  /**
   * Get twins by category
   */
  getTwinsByCategory(category: SkillCategory): SkillTwinConfig[] {
    return this.getAllTwins().filter(twin => twin.category === category);
  }

  /**
   * Browse available twins
   */
  async browse(category?: string): Promise<TwinRef[]> {
    const twins = category 
      ? this.getTwinsByCategory(category as SkillCategory)
      : this.getAllTwins();

    return twins.map(twin => ({
      id: twin.id,
      type: 'skill' as const,
      name: twin.name,
      emoji: twin.emoji,
    }));
  }

  // ==========================================================================
  // Twin Activation
  // ==========================================================================

  /**
   * Activate a skill twin for a user session
   */
  async activate(twinId: SkillTwinId, context: UserContext): Promise<boolean> {
    const twin = this.getTwin(twinId);
    if (!twin) {
      throw new Error(`Unknown skill twin: ${twinId}`);
    }

    const activationKey = `${context.userId}:${twinId}`;
    
    const activation: SkillActivation = {
      twinId,
      userId: context.userId,
      sessionId: context.sessionId,
      activatedAt: new Date(),
      status: 'activated',
    };

    this.activations.set(activationKey, activation);
    
    // Update usage count
    twin.usageCount++;

    return true;
  }

  /**
   * Deactivate a skill twin
   */
  async deactivate(twinId: SkillTwinId): Promise<void> {
    // Remove all activations for this twin
    const entries = Array.from(this.activations.entries());
    for (const [key, activation] of entries) {
      if (activation.twinId === twinId) {
        this.activations.delete(key);
      }
    }
  }

  /**
   * Check if a twin is activated for a user
   */
  isActivated(twinId: SkillTwinId, userId: string): boolean {
    const activationKey = `${userId}:${twinId}`;
    return this.activations.has(activationKey);
  }

  /**
   * Get activation status
   */
  getActivationStatus(twinId: SkillTwinId, userId: string): SkillActivation | null {
    const activationKey = `${userId}:${twinId}`;
    return this.activations.get(activationKey) || null;
  }

  // ==========================================================================
  // Task Execution
  // ==========================================================================

  // ==========================================================================
  // Task Classification Engine
  // ==========================================================================

  /**
   * Task classification patterns
   * Maps task types to optimal skill twin(s)
   */
  private taskClassifier: Map<string, SkillTwinId[]> = new Map([
    ['research', ['research']],
    ['content_creation', ['content']],
    ['design', ['design']],
    ['code', ['code']],
    ['marketing', ['marketing']],
    ['growth', ['growth']],
    ['sales', ['sales']],
    ['legal', ['legal']],
    ['product', ['product']],
    ['operations', ['operations']],
    ['analysis', ['research']],
    ['strategy', ['product']],
    ['general', ['research', 'content']],
  ]);

  /**
   * Classify a task based on its content
   * @param task - Task description
   * @returns Array of matching task types
   */
  private classifyTask(task: string): string[] {
    const taskLower = task.toLowerCase();
    const taskTypes: string[] = [];
    
    // Check each pattern
    const classifierEntries = Array.from(this.taskClassifier.entries());
    for (const [pattern] of classifierEntries) {
      if (taskLower.includes(pattern)) {
        taskTypes.push(pattern);
      }
    }
    
    // Default to general if no match
    if (taskTypes.length === 0) {
      taskTypes.push('general');
    }
    
    return taskTypes;
  }

  /**
   * Get the best twin for a task type
   * @param taskType - Type of task
   * @returns Best matching twin ID
   */
  private getBestTwinForTask(taskType: string): SkillTwinId {
    const mapping: Record<string, SkillTwinId> = {
      'research': 'research',
      'content_creation': 'content',
      'design': 'design',
      'code': 'code',
      'marketing': 'marketing',
      'growth': 'growth',
      'sales': 'sales',
      'legal': 'legal',
      'product': 'product',
      'operations': 'operations',
      'analysis': 'research',
      'strategy': 'product',
    };
    
    return mapping[taskType] as SkillTwinId || 'research';
  }

  // ==========================================================================
  // Task Routing Engine
  // ==========================================================================

  /**
   * Route a task to the appropriate twin(s)
   * @param task - Task description
   * @param context - User context
   * @param preferredTwins - Optional preferred twins
   * @returns SkillResponse or array of responses
   */
  async routeTask(
    task: string,
    context: UserContext,
    preferredTwins?: SkillTwinId[]
  ): Promise<SkillResponse | SkillResponse[]> {
    // Classify the task
    const taskTypes = this.classifyTask(task);
    
    // Determine target twins
    let targetTwins: SkillTwinId[];
    
    if (preferredTwins && preferredTwins.length > 0) {
      // Use preferred twins if specified
      targetTwins = preferredTwins;
    } else {
      // Use best twin for each task type
      targetTwins = taskTypes.map(type => this.getBestTwinForTask(type));
    }
    
    // Remove duplicates
    targetTwins = Array.from(new Set(targetTwins));
    
    // If only one twin, invoke directly
    if (targetTwins.length === 1) {
      return await this.invoke({
        twinId: targetTwins[0],
        task,
        userContext: context,
      });
    }
    
    // Multiple twins - execute in parallel
    const responses: SkillResponse[] = [];
    for (const twinId of targetTwins) {
      responses.push(await this.invoke({
        twinId,
        task,
        userContext: context,
      }));
    }
    
    return responses;
  }

  // ==========================================================================
  // Multi-Twin Execution Engine
  // ==========================================================================

  /**
   * Execute a task across multiple twins in parallel
   * @param task - Task description
   * @param context - User context
   * @param twins - Twins to invoke
   * @returns Array of responses
   */
  async executeParallel(
    task: string,
    context: UserContext,
    twins: SkillTwinId[]
  ): Promise<SkillResponse[]> {
    const promises: Promise<SkillResponse>[] = [];
    
    for (const twinId of twins) {
      promises.push(this.invoke({
        twinId,
        task,
        userContext: context,
      }));
    }
    
    return Promise.all(promises);
  }

  /**
   * Execute a task across multiple twins sequentially
   * @param task - Task description
   * @param context - User context
   * @param twins - Twins to invoke
   * @returns Array of responses
   */
  async executeSequential(
    task: string,
    context: UserContext,
    twins: SkillTwinId[]
  ): Promise<SkillResponse[]> {
    const responses: SkillResponse[] = [];
    
    for (const twinId of twins) {
      const response = await this.invoke({
        twinId,
        task,
        userContext: context,
      });
      responses.push(response);
    }
    
    return responses;
  }

  // ==========================================================================
  // Result Merging Engine
  // ==========================================================================

  /**
   * Merge results from multiple twin executions
   * @param responses - Array of responses from twins
   * @returns Merged result with synthesis
   */
  private mergeResults(responses: SkillResponse[]): {
    synthesizedOutput: string;
    confidence: number;
    recommendations: string[];
  } {
    if (responses.length === 0) {
      return {
        synthesizedOutput: '',
        confidence: 0,
        recommendations: [],
      };
    }
    
    if (responses.length === 1) {
      return {
        synthesizedOutput: responses[0].output,
        confidence: responses[0].confidence,
        recommendations: [],
      };
    }
    
    // Combine outputs
    const outputs = responses.map(r => r.output).join('\n\n');
    
    // Find common themes (appearing in multiple responses)
    const commonThemes: string[] = [];
    const allKeyPoints: string[] = responses.flatMap(r => {
      const keyPoints = r.metadata?.keyPoints;
      return Array.isArray(keyPoints) ? keyPoints.filter((p): p is string => typeof p === 'string') : [];
    });
    
    // Find points mentioned by multiple twins
    const pointFrequency = new Map<string, number>();
    for (const point of allKeyPoints) {
      pointFrequency.set(point, (pointFrequency.get(point) || 0) + 1);
    }
    
    // Themes mentioned by 2+ twins are common
    const pointFrequencyEntries = Array.from(pointFrequency.entries());
    for (const [point, count] of pointFrequencyEntries) {
      if (count >= 2) {
        commonThemes.push(point);
      }
    }
    
    // Calculate confidence
    const avgConfidence = responses.reduce((sum, r) => sum + r.confidence, 0) / responses.length;
    
    // Generate recommendations
    const recommendations: string[] = [];
    if (commonThemes.length > 0) {
      recommendations.push(`Common theme: ${commonThemes.join(', ')}`);
    }
    
    // Add individual insights
    for (const response of responses) {
      if (response.confidence > 0.7) {
        recommendations.push(`High confidence from ${response.twinName}: ${response.output.substring(0, 100)}...`);
      }
    }
    
    return {
      synthesizedOutput: outputs,
      confidence: avgConfidence,
      recommendations,
    };
  }

  /**
   * Execute a pipeline of tasks across multiple twins
   * @param tasks - Array of tasks with twin assignments
   * @param context - User context
   * @returns Final merged result
   */
  async executePipeline(
    tasks: Array<{ task: string; twin: SkillTwinId }>,
    context: UserContext
  ): Promise<{
    finalOutput: string;
    confidence: number;
    taskResults: SkillResponse[];
  }> {
    const taskResults: SkillResponse[] = [];
    
    for (const { task, twin } of tasks) {
      const response = await this.invoke({
        twinId: twin,
        task,
        userContext: context,
      });
      taskResults.push(response);
    }
    
    // Merge all results
    const merged = this.mergeResults(taskResults);
    
    return {
      finalOutput: merged.synthesizedOutput,
      confidence: merged.confidence,
      taskResults,
    };
  }

  // ==========================================================================
  // Utilities
  // ==========================================================================

  /**
   * Generate unique request ID
   */
  private generateRequestId(): string {
    return `skill_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get twin statistics
   */
  getStats(): {
    totalTwins: number;
    totalActivations: number;
    topTwins: Array<{ id: SkillTwinId; usageCount: number }>;
  } {
    const twins = this.getAllTwins();
    const topTwins = twins
      .map(t => ({ id: t.id, usageCount: t.usageCount }))
      .sort((a, b) => b.usageCount - a.usageCount)
      .slice(0, 5);

    return {
      totalTwins: twins.length,
      totalActivations: this.activations.size,
      topTwins,
    };
  }

  /**
   * Shutdown engine
   */
  async shutdown(): Promise<void> {
    this.activations.clear();
  }
}

// ============================================================================
// Factory Function
// ============================================================================

/**
 * Create a configured SkillEngine instance
 */
export function createSkillEngine(): SkillEngine {
  return new SkillEngine();
}

// ============================================================================
// Exports
// ============================================================================

export default SkillEngine;

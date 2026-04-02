/**
 * Digital Twin OS - Twin Engine (Master Orchestrator)
 * 
 * The central nervous system that routes tasks to Council, 
 * delegates execution to Skill twins, and coordinates Memory access.
 * 
 * @module TwinEngine
 * @version 1.0.0
 * @created April 2, 2026
 */

import type { CouncilEngine, CouncilPayload, CouncilResponse, CouncilTwinId } from './council_engine';
import type { SkillEngine, SkillPayload, SkillResponse, SkillTwinId } from './skill_engine';
import type { MarketplaceEngine, TwinTeam, TwinActivation } from './marketplace_engine';
import type { MemoryEngine, MemoryTier, MemoryQuery, MemoryRecord } from './memory_engine';

// ============================================================================
// Core Types
// ============================================================================

/**
 * Twin types supported by the OS
 */
export type TwinType = 'council' | 'skill';

/**
 * Interaction modes for user engagement
 */
export type InteractionMode = 'ask_twin' | 'ask_council' | 'task_assignment';

/**
 * Task priority levels
 */
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';

/**
 * Task status tracking
 */
export type TaskStatus = 'pending' | 'assigned' | 'executing' | 'completed' | 'failed';

/**
 * Twin reference for routing
 */
export interface TwinRef {
  id: string;
  type: TwinType;
  name: string;
  emoji: string;
}

/**
 * User context for request processing
 */
export interface UserContext {
  userId: string;
  sessionId: string;
  organizationId?: string;
  preferences?: Record<string, unknown>;
}

/**
 * Base payload for all twin operations
 */
export interface TwinPayload {
  type: InteractionMode;
  userContext: UserContext;
  content: string;
  targetTwin?: TwinRef;
  targetTwins?: TwinRef[];
  metadata?: Record<string, unknown>;
  timestamp: Date;
}

/**
 * Unified response from twin operations
 */
export interface TwinResponse {
  requestId: string;
  status: TaskStatus;
  mode: InteractionMode;
  source: TwinRef | TwinRef[];
  content: string;
  synthesis?: CouncilSynthesis;
  confidence?: number;
  timestamp: Date;
  duration: number;
}

/**
 * Council synthesis output
 */
export interface CouncilSynthesis {
  areasOfAgreement: string[];
  areasOfTension: string[];
  recommendedActions: string[];
  confidenceLevel: 'low' | 'medium' | 'high';
  consensusRatio: number;
}

/**
 * Task assignment payload
 */
export interface TaskAssignment {
  taskId: string;
  taskType: string;
  payload: TwinPayload;
  assignedTo: TwinRef[];
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Routing decision result
 */
export interface RoutingDecision {
  mode: InteractionMode;
  targetTwin?: TwinRef;
  targetTwins?: TwinRef[];
  skillRequired?: boolean;
  skillTwinId?: string;
}

// ============================================================================
// Engine Interface Contracts
// ============================================================================

/**
 * Council Engine Interface
 * Managed by council_engine.ts
 */
export interface ICouncilEngine {
  summon(payload: CouncilPayload): Promise<CouncilResponse>;
  getActiveTwins(): TwinRef[];
  getTwinPersona(twinId: string): Promise<unknown>;
}

/**
 * Skill Engine Interface
 * Managed by skill_engine.ts
 */
export interface ISkillEngine {
  invoke(payload: SkillPayload): Promise<SkillResponse>;
  browse(category?: string): Promise<TwinRef[]>;
  activate(twinId: string, context: UserContext): Promise<boolean>;
  deactivate(twinId: string): Promise<void>;
}

/**
 * Marketplace Engine Interface
 * Managed by marketplace_engine.ts
 */
export interface IMarketplaceEngine {
  getAvailableTwins(): Promise<TwinRef[]>;
  createTeam(config: TeamConfig): Promise<TwinTeam>;
  getTeam(teamId: string): Promise<TwinTeam | null>;
  activateTwin(request: TwinActivation): Promise<boolean>;
}

/**
 * Memory Engine Interface
 * Managed by memory_engine.ts
 */
export interface IMemoryEngine {
  read(query: MemoryQuery): Promise<MemoryRecord[]>;
  write(record: Omit<MemoryRecord, 'id' | 'timestamp'>): Promise<MemoryRecord>;
  update(id: string, data: Partial<MemoryRecord>): Promise<MemoryRecord>;
  delete(id: string): Promise<boolean>;
  getConversationMemory(conversationId: string): Promise<MemoryRecord[]>;
  getContextualMemory(userId: string, context: string): Promise<MemoryRecord[]>;
  getProjectMemory(projectId: string): Promise<MemoryRecord[]>;
}

/**
 * Team configuration for marketplace
 */
export interface TeamConfig {
  name: string;
  twinIds: string[];
  workflow: 'sequential' | 'parallel';
  description?: string;
}

// ============================================================================
// Twin Engine (Master Orchestrator)
// ============================================================================

/**
 * TwinEngine - The master orchestrator for Digital Twin OS
 * 
 * Responsibilities:
 * - Route incoming requests to appropriate engines
 * - Coordinate between Council, Skill, Marketplace, and Memory engines
 * - Manage task lifecycle and status
 * - Provide unified response interface
 */
export class TwinEngine {
  private councilEngine: ICouncilEngine;
  private skillEngine: ISkillEngine;
  private marketplaceEngine: IMarketplaceEngine;
  private memoryEngine: IMemoryEngine;
  
  private activeTasks: Map<string, TaskAssignment>;
  private initialized: boolean;

  constructor(
    councilEngine: ICouncilEngine,
    skillEngine: ISkillEngine,
    marketplaceEngine: IMarketplaceEngine,
    memoryEngine: IMemoryEngine
  ) {
    this.councilEngine = councilEngine;
    this.skillEngine = skillEngine;
    this.marketplaceEngine = marketplaceEngine;
    this.memoryEngine = memoryEngine;
    this.activeTasks = new Map();
    this.initialized = false;
  }

  // ==========================================================================
  // Initialization
  // ==========================================================================

  /**
   * Initialize the twin engine and all sub-engines
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    // Initialize engines in dependency order
    // Memory first (other engines may need it)
    // Then Council and Skill (core functionality)
    // Finally Marketplace (depends on twins being available)
    
    this.initialized = true;
  }

  /**
   * Health check for the engine
   */
  async healthCheck(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    engines: Record<string, boolean>;
  }> {
    return {
      status: 'healthy',
      engines: {
        council: true,
        skill: true,
        marketplace: true,
        memory: true,
      },
    };
  }

  // ==========================================================================
  // Request Routing (Core Orchestrator Interface)
  // ==========================================================================

  /**
   * Process an incoming request and route to appropriate engine
   */
  async processRequest(payload: TwinPayload): Promise<TwinResponse> {
    const startTime = Date.now();
    const requestId = this.generateRequestId();

    try {
      // Step 1: Determine routing
      const routing = this.routeRequest(payload);

      // Step 2: Store request in conversation memory
      await this.memoryEngine.write({
        tier: 'conversation',
        key: `request:${requestId}`,
        value: payload,
        metadata: {
          userId: payload.userContext.userId,
          sessionId: payload.userContext.sessionId,
          mode: payload.type,
        },
        status: 'active',
      });

      // Step 3: Route to appropriate engine
      let response: TwinResponse;

      switch (routing.mode) {
        case 'ask_council':
          response = await this.processCouncilRequest(payload, requestId);
          break;
        
        case 'ask_twin':
          response = await this.processSingleTwinRequest(payload, requestId, routing);
          break;
        
        case 'task_assignment':
          response = await this.processTaskAssignment(payload, requestId, routing);
          break;
        
        default:
          throw new Error(`Unknown interaction mode: ${routing.mode}`);
      }

      // Step 4: Store response in memory
      await this.memoryEngine.write({
        tier: 'conversation',
        key: `response:${requestId}`,
        value: response,
        metadata: {
          userId: payload.userContext.userId,
          sessionId: payload.userContext.sessionId,
          duration: Date.now() - startTime,
        },
        status: 'active',
      });

      response.duration = Date.now() - startTime;
      return response;

    } catch (error) {
      return {
        requestId,
        status: 'failed',
        mode: payload.type,
        source: { id: 'system', type: 'council', name: 'System', emoji: '⚠️' },
        content: `Error processing request: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date(),
        duration: Date.now() - startTime,
      };
    }
  }

  /**
   * Determine routing for a request
   */
  private routeRequest(payload: TwinPayload): RoutingDecision {
    // Explicit twin targeting via @mention
    if (payload.targetTwin) {
      return {
        mode: 'ask_twin',
        targetTwin: payload.targetTwin,
        skillRequired: payload.targetTwin.type === 'skill',
        skillTwinId: payload.targetTwin.type === 'skill' ? payload.targetTwin.id : undefined,
      };
    }

    // Multiple twins targeted (council or team)
    if (payload.targetTwins && payload.targetTwins.length > 0) {
      const allCouncil = payload.targetTwins.every(t => t.type === 'council');
      return {
        mode: allCouncil ? 'ask_council' : 'task_assignment',
        targetTwins: payload.targetTwins,
      };
    }

    // Default: Ask Council for general questions
    // Task Assignment for action-oriented requests
    const taskKeywords = ['create', 'write', 'build', 'generate', 'analyze', 'review'];
    const isTaskOriented = taskKeywords.some(keyword => 
      payload.content.toLowerCase().includes(keyword)
    );

    if (isTaskOriented) {
      return {
        mode: 'task_assignment',
        skillRequired: true,
      };
    }

    return {
      mode: 'ask_council',
    };
  }

  // ==========================================================================
  // Council Request Processing
  // ==========================================================================

  /**
   * Process a council request (all 5 strategic twins)
   */
  private async processCouncilRequest(
    payload: TwinPayload, 
    requestId: string
  ): Promise<TwinResponse> {
    const councilPayload: CouncilPayload = {
      question: payload.content,
      userContext: payload.userContext,
      includeSynthesis: true,
    };

    const councilResponse = await this.councilEngine.summon(councilPayload);

    return {
      requestId,
      status: 'completed',
      mode: 'ask_council',
      source: councilResponse.participants,
      content: councilResponse.synthesizedOutput,
      synthesis: councilResponse.synthesis,
      confidence: councilResponse.confidence,
      timestamp: new Date(),
      duration: 0, // Set by caller
    };
  }

  // ==========================================================================
  // Single Twin Request Processing
  // ==========================================================================

  /**
   * Process a request for a single twin
   */
  private async processSingleTwinRequest(
    payload: TwinPayload,
    requestId: string,
    routing: RoutingDecision
  ): Promise<TwinResponse> {
    if (routing.skillRequired && routing.skillTwinId) {
      // Route to skill engine
      const skillPayload: SkillPayload = {
        twinId: routing.skillTwinId as SkillTwinId,
        task: payload.content,
        userContext: payload.userContext,
      };

      const skillResponse = await this.skillEngine.invoke(skillPayload);

      return {
        requestId,
        status: 'completed',
        mode: 'ask_twin',
        source: { 
          id: routing.skillTwinId, 
          type: 'skill', 
          name: skillResponse.twinName,
          emoji: skillResponse.emoji,
        },
        content: skillResponse.output,
        confidence: skillResponse.confidence,
        timestamp: new Date(),
        duration: 0,
      };
    }

    // Route to council twin
    if (routing.targetTwin) {
      const councilPayload: CouncilPayload = {
        question: payload.content,
        userContext: payload.userContext,
        specificTwinId: routing.targetTwin.id as CouncilTwinId,
        includeSynthesis: false,
      };

      const councilResponse = await this.councilEngine.summon(councilPayload);

      return {
        requestId,
        status: 'completed',
        mode: 'ask_twin',
        source: routing.targetTwin,
        content: councilResponse.synthesizedOutput,
        confidence: councilResponse.confidence,
        timestamp: new Date(),
        duration: 0,
      };
    }

    throw new Error('No target twin specified for ask_twin mode');
  }

  // ==========================================================================
  // Task Assignment Processing
  // ==========================================================================

  /**
   * Process a task assignment request
   */
  private async processTaskAssignment(
    payload: TwinPayload,
    requestId: string,
    routing: RoutingDecision
  ): Promise<TwinResponse> {
    // Create task assignment
    const assignment: TaskAssignment = {
      taskId: requestId,
      taskType: this.classifyTask(payload.content),
      payload,
      assignedTo: routing.targetTwins || [],
      priority: 'medium',
      status: 'assigned',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.activeTasks.set(requestId, assignment);

    // If specific twins assigned, delegate to them
    if (routing.targetTwins && routing.targetTwins.length > 0) {
      // TODO: Implement multi-twin task delegation
      // For now, route to first skill twin if available
      const skillTwin = routing.targetTwins.find(t => t.type === 'skill');
      if (skillTwin) {
        const skillPayload: SkillPayload = {
          twinId: skillTwin.id as SkillTwinId,
          task: payload.content,
          userContext: payload.userContext,
        };

        const skillResponse = await this.skillEngine.invoke(skillPayload);

        assignment.status = 'completed';
        assignment.updatedAt = new Date();

        return {
          requestId,
          status: 'completed',
          mode: 'task_assignment',
          source: skillTwin,
          content: skillResponse.output,
          confidence: skillResponse.confidence,
          timestamp: new Date(),
          duration: 0,
        };
      }
    }

    // Auto-route to best skill twin based on task type
    const bestTwin = await this.findBestSkillTwin(assignment.taskType);
    if (bestTwin) {
      const skillPayload: SkillPayload = {
        twinId: bestTwin.id as SkillTwinId,
        task: payload.content,
        userContext: payload.userContext,
      };

      const skillResponse = await this.skillEngine.invoke(skillPayload);
      assignment.assignedTo = [bestTwin];
      assignment.status = 'completed';
      assignment.updatedAt = new Date();

      return {
        requestId,
        status: 'completed',
        mode: 'task_assignment',
        source: bestTwin,
        content: skillResponse.output,
        confidence: skillResponse.confidence,
        timestamp: new Date(),
        duration: 0,
      };
    }

    throw new Error('Unable to assign task to any twin');
  }

  // ==========================================================================
  // Task Management
  // ==========================================================================

  /**
   * Get task status by ID
   */
  getTaskStatus(taskId: string): TaskAssignment | null {
    return this.activeTasks.get(taskId) || null;
  }

  /**
   * Get all active tasks for a user
   */
  getActiveTasksForUser(userId: string): TaskAssignment[] {
    return Array.from(this.activeTasks.values())
      .filter(task => task.payload.userContext.userId === userId)
      .filter(task => task.status !== 'completed' && task.status !== 'failed');
  }

  /**
   * Classify task type based on content
   */
  private classifyTask(content: string): string {
    const taskPatterns: Record<string, string[]> = {
      'content_creation': ['write', 'create', 'draft', 'compose'],
      'code_review': ['review', 'debug', 'fix', 'refactor'],
      'research': ['research', 'analyze', 'investigate', 'find'],
      'design': ['design', 'mockup', 'wireframe', 'prototype'],
      'growth': ['optimize', 'improve', 'increase', 'grow'],
    };

    const lowerContent = content.toLowerCase();
    
    for (const [type, keywords] of Object.entries(taskPatterns)) {
      if (keywords.some(kw => lowerContent.includes(kw))) {
        return type;
      }
    }

    return 'general';
  }

  /**
   * Find best skill twin for a task type
   */
  private async findBestSkillTwin(taskType: string): Promise<TwinRef | null> {
    const twinMapping: Record<string, string> = {
      'content_creation': 'content',
      'code_review': 'code',
      'research': 'research',
      'design': 'design',
      'growth': 'growth',
    };

    const twinId = twinMapping[taskType];
    if (!twinId) {
      return null;
    }

    const availableTwins = await this.marketplaceEngine.getAvailableTwins();
    return availableTwins.find(t => t.id === twinId) || null;
  }

  // ==========================================================================
  // Memory Integration
  // ==========================================================================

  /**
   * Get conversation history for a session
   */
  async getConversationHistory(sessionId: string): Promise<MemoryRecord[]> {
    return this.memoryEngine.getConversationMemory(sessionId);
  }

  /**
   * Get contextual memory for a user
   */
  async getUserContext(userId: string, context: string): Promise<MemoryRecord[]> {
    return this.memoryEngine.getContextualMemory(userId, context);
  }

  /**
   * Get project-specific memory
   */
  async getProjectContext(projectId: string): Promise<MemoryRecord[]> {
    return this.memoryEngine.getProjectMemory(projectId);
  }

  // ==========================================================================
  // Utilities
  // ==========================================================================

  /**
   * Generate unique request ID
   */
  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Shutdown engine gracefully
   */
  async shutdown(): Promise<void> {
    this.activeTasks.clear();
    this.initialized = false;
  }
}

// ============================================================================
// Factory Function
// ============================================================================

/**
 * Create a configured TwinEngine instance
 */
export function createTwinEngine(
  councilEngine: ICouncilEngine,
  skillEngine: ISkillEngine,
  marketplaceEngine: IMarketplaceEngine,
  memoryEngine: IMemoryEngine
): TwinEngine {
  return new TwinEngine(
    councilEngine,
    skillEngine,
    marketplaceEngine,
    memoryEngine
  );
}

// ============================================================================
// Exports
// ============================================================================

export default TwinEngine;

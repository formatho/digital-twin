/**
 * Digital Twin OS - Memory Engine
 * 
 * Manages the three-tiered memory system for Digital Twin OS:
 * - Conversation Memory: Session-level, short-term context
 * - Contextual Memory: User-level, medium-term patterns
 * - Project Memory: Long-term, project-specific knowledge
 * 
 * @module MemoryEngine
 * @version 1.0.0
 * @created April 2, 2026
 */

// ============================================================================
// Core Types
// ============================================================================

/**
 * Memory tier types (three-tiered schema from Day 10 spec)
 */
export type MemoryTier = 'conversation' | 'contextual' | 'project';

/**
 * Memory record status
 */
export type MemoryStatus = 'active' | 'archived' | 'deleted';

/**
 * Generic memory record structure
 */
export interface MemoryRecord {
  id: string;
  tier: MemoryTier;
  key: string;
  value: unknown;
  metadata: MemoryMetadata;
  timestamp: Date;
  status: MemoryStatus;
  ttl?: number; // Time-to-live in seconds (optional)
}

/**
 * Memory metadata structure
 */
export interface MemoryMetadata {
  userId?: string;
  sessionId?: string;
  conversationId?: string;
  projectId?: string;
  twinId?: string;
  tags?: string[];
  confidence?: number;
  source?: string;
  [key: string]: unknown;
}

/**
 * Memory query interface
 */
export interface MemoryQuery {
  tier?: MemoryTier;
  userId?: string;
  sessionId?: string;
  conversationId?: string;
  projectId?: string;
  twinId?: string;
  keyPattern?: string;
  tags?: string[];
  limit?: number;
  offset?: number;
  orderBy?: 'timestamp' | 'confidence';
  orderDirection?: 'asc' | 'desc';
  includeArchived?: boolean;
}

/**
 * Conversation memory schema (Tier 1)
 */
export interface ConversationMemory {
  conversationId: string;
  sessionId: string;
  userId: string;
  messages: ConversationMessage[];
  context: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
}

/**
 * Conversation message structure
 */
export interface ConversationMessage {
  id: string;
  role: 'user' | 'twin' | 'system';
  content: string;
  twinId?: string;
  twinName?: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

/**
 * Contextual memory schema (Tier 2)
 */
export interface ContextualMemory {
  userId: string;
  contextKey: string;
  patterns: UserPattern[];
  preferences: Record<string, unknown>;
  insights: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User pattern structure
 */
export interface UserPattern {
  pattern: string;
  frequency: number;
  lastSeen: Date;
  context: string;
}

/**
 * Project memory schema (Tier 3)
 */
export interface ProjectMemory {
  projectId: string;
  name: string;
  description: string;
  knowledge: ProjectKnowledge[];
  decisions: ProjectDecision[];
  milestones: ProjectMilestone[];
  members: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Project knowledge entry
 */
export interface ProjectKnowledge {
  id: string;
  type: 'fact' | 'assumption' | 'constraint' | 'requirement';
  content: string;
  source: string;
  confidence: number;
  createdAt: Date;
}

/**
 * Project decision record
 */
export interface ProjectDecision {
  id: string;
  title: string;
  description: string;
  alternatives: string[];
  rationale: string;
  madeBy: string[];
  madeAt: Date;
  status: 'proposed' | 'accepted' | 'rejected' | 'superseded';
}

/**
 * Project milestone
 */
export interface ProjectMilestone {
  id: string;
  name: string;
  description: string;
  dueDate?: Date;
  completedAt?: Date;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
}

// ============================================================================
// Memory Engine Implementation
// ============================================================================

/**
 * MemoryEngine - Manages the three-tiered memory system
 * 
 * Responsibilities:
 * - Store and retrieve memory records across all tiers
 * - Manage memory lifecycle (creation, archival, deletion)
 * - Provide tier-specific access methods
 * - Handle memory queries and filtering
 */
export class MemoryEngine {
  private conversationStore: Map<string, ConversationMemory>;
  private contextualStore: Map<string, ContextualMemory>;
  private projectStore: Map<string, ProjectMemory>;
  private recordStore: Map<string, MemoryRecord>;

  constructor() {
    this.conversationStore = new Map();
    this.contextualStore = new Map();
    this.projectStore = new Map();
    this.recordStore = new Map();
  }

  // ==========================================================================
  // Initialization
  // ==========================================================================

  /**
   * Initialize the memory engine
   */
  async initialize(): Promise<void> {
    // Initialize storage backends
    // In production, this would connect to databases
  }

  // ==========================================================================
  // Generic Memory Operations
  // ==========================================================================

  /**
   * Read memory records based on query
   */
  async read(query: MemoryQuery): Promise<MemoryRecord[]> {
    let records = Array.from(this.recordStore.values());

    // Filter by tier
    if (query.tier) {
      records = records.filter(r => r.tier === query.tier);
    }

    // Filter by user
    if (query.userId) {
      records = records.filter(r => r.metadata.userId === query.userId);
    }

    // Filter by session
    if (query.sessionId) {
      records = records.filter(r => r.metadata.sessionId === query.sessionId);
    }

    // Filter by conversation
    if (query.conversationId) {
      records = records.filter(r => r.metadata.conversationId === query.conversationId);
    }

    // Filter by project
    if (query.projectId) {
      records = records.filter(r => r.metadata.projectId === query.projectId);
    }

    // Filter by twin
    if (query.twinId) {
      records = records.filter(r => r.metadata.twinId === query.twinId);
    }

    // Filter by key pattern
    if (query.keyPattern) {
      const pattern = new RegExp(query.keyPattern);
      records = records.filter(r => pattern.test(r.key));
    }

    // Filter by tags
    if (query.tags && query.tags.length > 0) {
      records = records.filter(r => 
        r.metadata.tags?.some(tag => query.tags!.includes(tag))
      );
    }

    // Exclude archived by default
    if (!query.includeArchived) {
      records = records.filter(r => r.status === 'active');
    }

    // Sort
    if (query.orderBy) {
      records.sort((a, b) => {
        const aVal = query.orderBy === 'timestamp' ? a.timestamp.getTime() : (a.metadata.confidence || 0);
        const bVal = query.orderBy === 'timestamp' ? b.timestamp.getTime() : (b.metadata.confidence || 0);
        return query.orderDirection === 'desc' ? bVal - aVal : aVal - bVal;
      });
    }

    // Paginate
    if (query.offset) {
      records = records.slice(query.offset);
    }
    if (query.limit) {
      records = records.slice(0, query.limit);
    }

    return records;
  }

  /**
   * Write a new memory record
   */
  async write(record: Omit<MemoryRecord, 'id' | 'timestamp'>): Promise<MemoryRecord> {
    const id = this.generateId();
    const timestamp = new Date();

    const fullRecord: MemoryRecord = {
      ...record,
      id,
      timestamp,
      status: record.status || 'active',
    };

    this.recordStore.set(id, fullRecord);

    // Also update tier-specific stores
    this.updateTierStore(fullRecord);

    return fullRecord;
  }

  /**
   * Update an existing memory record
   */
  async update(id: string, data: Partial<MemoryRecord>): Promise<MemoryRecord> {
    const existing = this.recordStore.get(id);
    if (!existing) {
      throw new Error(`Memory record not found: ${id}`);
    }

    const updated: MemoryRecord = {
      ...existing,
      ...data,
      id: existing.id, // Prevent ID changes
      timestamp: existing.timestamp, // Preserve original timestamp
    };

    this.recordStore.set(id, updated);
    this.updateTierStore(updated);

    return updated;
  }

  /**
   * Delete a memory record
   */
  async delete(id: string): Promise<boolean> {
    const record = this.recordStore.get(id);
    if (!record) {
      return false;
    }

    // Soft delete by default
    record.status = 'deleted';
    this.recordStore.set(id, record);

    return true;
  }

  // ==========================================================================
  // Tier 1: Conversation Memory
  // ==========================================================================

  /**
   * Get conversation memory by ID
   */
  async getConversationMemory(conversationId: string): Promise<MemoryRecord[]> {
    return this.read({
      conversationId,
      tier: 'conversation',
      orderBy: 'timestamp',
      orderDirection: 'asc',
    });
  }

  /**
   * Create or update conversation memory
   */
  async upsertConversationMemory(conversation: Partial<ConversationMemory>): Promise<ConversationMemory> {
    const existing = this.conversationStore.get(conversation.conversationId || '');
    
    if (existing) {
      const updated: ConversationMemory = {
        ...existing,
        ...conversation,
        conversationId: existing.conversationId,
        updatedAt: new Date(),
      };
      this.conversationStore.set(existing.conversationId, updated);
      return updated;
    }

    const newConversation: ConversationMemory = {
      conversationId: conversation.conversationId || this.generateId(),
      sessionId: conversation.sessionId || '',
      userId: conversation.userId || '',
      messages: conversation.messages || [],
      context: conversation.context || {},
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.conversationStore.set(newConversation.conversationId, newConversation);
    return newConversation;
  }

  /**
   * Add message to conversation
   */
  async addConversationMessage(
    conversationId: string, 
    message: Omit<ConversationMessage, 'id' | 'timestamp'>
  ): Promise<ConversationMessage> {
    const conversation = this.conversationStore.get(conversationId);
    if (!conversation) {
      throw new Error(`Conversation not found: ${conversationId}`);
    }

    const fullMessage: ConversationMessage = {
      ...message,
      id: this.generateId(),
      timestamp: new Date(),
    };

    conversation.messages.push(fullMessage);
    conversation.updatedAt = new Date();

    return fullMessage;
  }

  // ==========================================================================
  // Tier 2: Contextual Memory
  // ==========================================================================

  /**
   * Get contextual memory for a user
   */
  async getContextualMemory(userId: string, contextKey?: string): Promise<MemoryRecord[]> {
    const query: MemoryQuery = {
      userId,
      tier: 'contextual',
      orderBy: 'timestamp',
      orderDirection: 'desc',
    };

    if (contextKey) {
      query.keyPattern = contextKey;
    }

    return this.read(query);
  }

  /**
   * Upsert user contextual memory
   */
  async upsertContextualMemory(contextual: Partial<ContextualMemory>): Promise<ContextualMemory> {
    const key = `${contextual.userId}:${contextual.contextKey}`;
    const existing = this.contextualStore.get(key);

    if (existing) {
      const updated: ContextualMemory = {
        ...existing,
        ...contextual,
        userId: existing.userId,
        contextKey: existing.contextKey,
        updatedAt: new Date(),
      };
      this.contextualStore.set(key, updated);
      return updated;
    }

    const newContextual: ContextualMemory = {
      userId: contextual.userId || '',
      contextKey: contextual.contextKey || '',
      patterns: contextual.patterns || [],
      preferences: contextual.preferences || {},
      insights: contextual.insights || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.contextualStore.set(key, newContextual);
    return newContextual;
  }

  /**
   * Add user pattern
   */
  async addUserPattern(
    userId: string, 
    contextKey: string, 
    pattern: Omit<UserPattern, 'lastSeen'>
  ): Promise<void> {
    const key = `${userId}:${contextKey}`;
    const contextual = this.contextualStore.get(key);

    if (contextual) {
      const existingPattern = contextual.patterns.find(p => p.pattern === pattern.pattern);
      
      if (existingPattern) {
        existingPattern.frequency++;
        existingPattern.lastSeen = new Date();
      } else {
        contextual.patterns.push({
          ...pattern,
          lastSeen: new Date(),
        });
      }

      contextual.updatedAt = new Date();
    }
  }

  // ==========================================================================
  // Tier 3: Project Memory
  // ==========================================================================

  /**
   * Get project memory by ID
   */
  async getProjectMemory(projectId: string): Promise<MemoryRecord[]> {
    return this.read({
      projectId,
      tier: 'project',
      orderBy: 'timestamp',
      orderDirection: 'desc',
    });
  }

  /**
   * Create or update project memory
   */
  async upsertProjectMemory(project: Partial<ProjectMemory>): Promise<ProjectMemory> {
    const existing = this.projectStore.get(project.projectId || '');

    if (existing) {
      const updated: ProjectMemory = {
        ...existing,
        ...project,
        projectId: existing.projectId,
        updatedAt: new Date(),
      };
      this.projectStore.set(existing.projectId, updated);
      return updated;
    }

    const newProject: ProjectMemory = {
      projectId: project.projectId || this.generateId(),
      name: project.name || '',
      description: project.description || '',
      knowledge: project.knowledge || [],
      decisions: project.decisions || [],
      milestones: project.milestones || [],
      members: project.members || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.projectStore.set(newProject.projectId, newProject);
    return newProject;
  }

  /**
   * Add project knowledge
   */
  async addProjectKnowledge(
    projectId: string, 
    knowledge: Omit<ProjectKnowledge, 'id' | 'createdAt'>
  ): Promise<ProjectKnowledge> {
    const project = this.projectStore.get(projectId);
    if (!project) {
      throw new Error(`Project not found: ${projectId}`);
    }

    const fullKnowledge: ProjectKnowledge = {
      ...knowledge,
      id: this.generateId(),
      createdAt: new Date(),
    };

    project.knowledge.push(fullKnowledge);
    project.updatedAt = new Date();

    return fullKnowledge;
  }

  /**
   * Add project decision
   */
  async addProjectDecision(
    projectId: string, 
    decision: Omit<ProjectDecision, 'id'>
  ): Promise<ProjectDecision> {
    const project = this.projectStore.get(projectId);
    if (!project) {
      throw new Error(`Project not found: ${projectId}`);
    }

    const fullDecision: ProjectDecision = {
      ...decision,
      id: this.generateId(),
    };

    project.decisions.push(fullDecision);
    project.updatedAt = new Date();

    return fullDecision;
  }

  // ==========================================================================
  // Memory Statistics
  // ==========================================================================

  /**
   * Get memory statistics
   */
  getStats(): {
    totalRecords: number;
    byTier: Record<MemoryTier, number>;
    conversations: number;
    contextual: number;
    projects: number;
  } {
    const records = Array.from(this.recordStore.values());
    
    const byTier: Record<MemoryTier, number> = {
      conversation: 0,
      contextual: 0,
      project: 0,
    };

    for (const record of records) {
      if (record.status === 'active') {
        byTier[record.tier]++;
      }
    }

    return {
      totalRecords: records.filter(r => r.status === 'active').length,
      byTier,
      conversations: this.conversationStore.size,
      contextual: this.contextualStore.size,
      projects: this.projectStore.size,
    };
  }

  // ==========================================================================
  // Utilities
  // ==========================================================================

  /**
   * Update tier-specific store based on record
   */
  private updateTierStore(record: MemoryRecord): void {
    // This is a simplified implementation
    // In production, this would sync with the appropriate tier store
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `mem_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Clear all memory (for testing)
   */
  async clearAll(): Promise<void> {
    this.conversationStore.clear();
    this.contextualStore.clear();
    this.projectStore.clear();
    this.recordStore.clear();
  }

  /**
   * Shutdown engine
   */
  async shutdown(): Promise<void> {
    // Persist any pending data
    // Close connections
  }
}

// ============================================================================
// Factory Function
// ============================================================================

/**
 * Create a configured MemoryEngine instance
 */
export function createMemoryEngine(): MemoryEngine {
  return new MemoryEngine();
}

// ============================================================================
// Exports
// ============================================================================

export default MemoryEngine;

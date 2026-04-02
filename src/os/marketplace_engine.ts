/**
 * Digital Twin OS - Marketplace Engine
 *
 * Manages the twin marketplace where users discover, activate,
 * and compose teams of twins.
 *
 * @module MarketplaceEngine
 * @version 1.0.0
 * @created April 2, 2026
 */

import type { TwinRef, UserContext } from './twin_engine';
import type { IMemoryEngine } from './memory_engine';
import type { SkillTwinId } from './skill_engine';

// ============================================================================
// Core Types
// ============================================================================

/**
 * Twin team workflow mode
 */
export type WorkflowMode = 'sequential' | 'parallel';

/**
 * Twin activation type
 */
export type ActivationType = 'temporary' | 'session' | 'permanent';

/**
 * Twin team configuration
 */
export interface TwinTeam {
  id: string;
  name: string;
  description: string;
  twinIds: string[];
  workflow: WorkflowMode;
  createdBy: string;
  createdAt: Date;
  usageCount: number;
  isPublic: boolean;
}

/**
 * Twin activation request
 */
export interface TwinActivation {
  twinId: string;
  activationType: ActivationType;
  context: {
    userId: string;
    sessionId: string;
    taskContext?: string;
  };
  constraints?: {
    maxTokens?: number;
    timeoutMs?: number;
  };
}

/**
 * Marketplace twin listing
 */
export interface MarketplaceListing {
  twin: TwinRef;
  category: string;
  description: string;
  rating: number;
  usageCount: number;
  isActivated: boolean;
  tags: string[];
}

/**
 * Team configuration for creation
 */
export interface TeamConfig {
  name: string;
  twinIds: string[];
  workflow: WorkflowMode;
  description?: string;
  isPublic?: boolean;
}

/**
 * Pre-configured team template
 */
export interface TeamTemplate {
  id: string;
  name: string;
  description: string;
  twinIds: string[];
  workflow: WorkflowMode;
  useCase: string;
}

// ============================================================================
// Pre-configured Team Templates
// ============================================================================

/**
 * Default twin team templates
 */
export const TEAM_TEMPLATES: TeamTemplate[] = [
  {
    id: 'launch-team',
    name: 'Launch Team',
    description: 'Coordinate product launch activities',
    twinIds: ['content', 'growth', 'marketing'],
    workflow: 'parallel',
    useCase: 'Product launches, feature releases, campaign coordination',
  },
  {
    id: 'product-team',
    name: 'Product Team',
    description: 'Build and ship product features',
    twinIds: ['product', 'design', 'code'],
    workflow: 'sequential',
    useCase: 'Feature development, product planning, design sprints',
  },
  {
    id: 'growth-team',
    name: 'Growth Team',
    description: 'Drive user acquisition and retention',
    twinIds: ['growth', 'marketing', 'content'],
    workflow: 'parallel',
    useCase: 'Growth experiments, acquisition campaigns, retention initiatives',
  },
  {
    id: 'sales-team',
    name: 'Sales Team',
    description: 'Close deals and manage pipeline',
    twinIds: ['sales', 'research', 'legal'],
    workflow: 'sequential',
    useCase: 'Sales playbooks, deal support, contract review',
  },
  {
    id: 'ops-team',
    name: 'Operations Team',
    description: 'Optimize processes and workflows',
    twinIds: ['operations', 'product', 'growth'],
    workflow: 'parallel',
    useCase: 'Process optimization, workflow design, scaling',
  },
];

// ============================================================================
// Marketplace Engine Implementation
// ============================================================================

/**
 * MarketplaceEngine - Manages twin marketplace operations
 *
 * Responsibilities:
 * - List available twins and teams
 * - Handle twin activation
 * - Create and manage twin teams
 * - Track marketplace analytics
 */
export class MarketplaceEngine {
  private teams: Map<string, TwinTeam>;
  private templates: Map<string, TeamTemplate>;
  private userActivations: Map<string, Set<string>>;
  private memoryEngine?: IMemoryEngine;
  private skillTwinProfiles: Map<string, any>;

  // Valid Skill Twin IDs (Guardrail 2: Only predefined twins)
  private static readonly VALID_SKILL_TWINS: SkillTwinId[] = [
    'research', 'content', 'design', 'growth', 'code',
    'marketing', 'sales', 'legal', 'product', 'operations'
  ];

  constructor(memoryEngine?: IMemoryEngine) {
    this.teams = new Map();
    this.templates = new Map(TEAM_TEMPLATES.map(t => [t.id, t]));
    this.userActivations = new Map();
    this.memoryEngine = memoryEngine;
    this.skillTwinProfiles = new Map();
    this.loadSkillTwinProfiles();
  }

  /**
   * Load skill twin profiles from JSON files
   */
  private loadSkillTwinProfiles(): void {
    const profiles = {
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

    this.skillTwinProfiles = new Map(Object.entries(profiles));
  }

  // ==========================================================================
  // Initialization
  // ==========================================================================

  /**
   * Initialize the marketplace engine
   */
  async initialize(): Promise<void> {
    // Load teams from storage if needed
    // Load templates
  }

  // ==========================================================================
  // Twin Listing
  // ==========================================================================

  /**
   * Get all available twins
   *
   * NOTE: This returns twin references. The actual twin configurations
   * are managed by CouncilEngine and SkillEngine.
   */
  async getAvailableTwins(): Promise<TwinRef[]> {
    // Council twins
    const councilTwins: TwinRef[] = [
      { id: 'strategist', type: 'council', name: 'The Strategist', emoji: '🎯' },
      { id: 'builder', type: 'council', name: 'The Builder', emoji: '🔧' },
      { id: 'analyst', type: 'council', name: 'The Analyst', emoji: '📊' },
      { id: 'operator', type: 'council', name: 'The Operator', emoji: '⚙️' },
      { id: 'critic', type: 'council', name: 'The Critic', emoji: '🧐' },
    ];

    // Skill twins
    const skillTwins: TwinRef[] = [
      { id: 'research', type: 'skill', name: 'Research Twin', emoji: '🔬' },
      { id: 'content', type: 'skill', name: 'Content Twin', emoji: '✍️' },
      { id: 'design', type: 'skill', name: 'Design Twin', emoji: '🎨' },
      { id: 'growth', type: 'skill', name: 'Growth Twin', emoji: '📈' },
      { id: 'code', type: 'skill', name: 'Code Twin', emoji: '💻' },
      { id: 'marketing', type: 'skill', name: 'Marketing Twin', emoji: '📢' },
      { id: 'sales', type: 'skill', name: 'Sales Twin', emoji: '💰' },
      { id: 'legal', type: 'skill', name: 'Legal Twin', emoji: '⚖️' },
      { id: 'product', type: 'skill', name: 'Product Twin', emoji: '📦' },
      { id: 'operations', type: 'skill', name: 'Operations Twin', emoji: '🏢' },
    ];

    return [...councilTwins, ...skillTwins];
  }

  /**
   * Get marketplace listings with details
   */
  async getListings(userId?: string): Promise<MarketplaceListing[]> {
    const twins = await this.getAvailableTwins();
    const userActive = userId ? this.userActivations.get(userId) : new Set();

    return twins.map(twin => ({
      twin,
      category: twin.type === 'council' ? 'Council' : 'Skill',
      description: `${twin.name} - ${twin.type} twin`,
      rating: 4.5, // TODO: Real ratings
      usageCount: 0, // TODO: Real usage tracking
      isActivated: userActive ? userActive.has(twin.id) : false,
      tags: [twin.type],
    }));
  }

  // ==========================================================================
  // Discovery Logic (Day 16)
  // ==========================================================================

  /**
   * Browse twins with optional filtering
   * Retrieves twin metadata from JSON profiles
   */
  async browseTwins(options?: {
    category?: 'council' | 'skill' | 'all';
    searchQuery?: string;
    capabilities?: string[];
  }): Promise<MarketplaceListing[]> {
    const category = options?.category || 'all';
    const searchQuery = options?.searchQuery?.toLowerCase();
    const capabilities = options?.capabilities || [];

    let twins = await this.getAvailableTwins();

    // Filter by category
    if (category !== 'all') {
      twins = twins.filter(t => t.type === category);
    }

    // Filter by search query
    if (searchQuery) {
      twins = twins.filter(t =>
        t.name.toLowerCase().includes(searchQuery) ||
        t.id.toLowerCase().includes(searchQuery)
      );
    }

    // Convert to listings with full metadata
    const listings: MarketplaceListing[] = twins.map(twin => {
      const profile = this.skillTwinProfiles.get(twin.id);

      return {
        twin,
        category: twin.type === 'council' ? 'Council' : 'Skill',
        description: profile?.description || `${twin.name} - ${twin.type} twin`,
        rating: profile?.rating || 4.5,
        usageCount: profile?.usageCount || 0,
        isActivated: false,
        tags: profile?.capabilities || [twin.type],
        capabilities: profile?.operationalCapabilities || [],
        knowledgeBoundaries: profile?.knowledgeBoundaries || {},
      };
    });

    // Filter by capabilities if specified
    if (capabilities.length > 0) {
      return listings.filter(listing =>
        capabilities.some(cap =>
          listing.tags?.includes(cap) ||
          listing.capabilities?.includes(cap)
        )
      );
    }

    return listings;
  }

  /**
   * Filter twins by category
   */
  async filterByCategory(category: 'council' | 'skill'): Promise<MarketplaceListing[]> {
    return this.browseTwins({ category });
  }

  /**
   * Get twin details by ID
   */
  async getTwinDetails(twinId: string): Promise<{
    twin: TwinRef;
    profile: any;
    listing: MarketplaceListing;
  } | null> {
    const twins = await this.getAvailableTwins();
    const twin = twins.find(t => t.id === twinId);

    if (!twin) {
      return null;
    }

    const profile = this.skillTwinProfiles.get(twinId);

    return {
      twin,
      profile,
      listing: {
        twin,
        category: twin.type === 'council' ? 'Council' : 'Skill',
        description: profile?.description || `${twin.name} - ${twin.type} twin`,
        rating: profile?.rating || 4.5,
        usageCount: profile?.usageCount || 0,
        isActivated: false,
        tags: profile?.capabilities || [twin.type],
      },
    };
  }

  // ==========================================================================
  // Twin Activation (Day 16)
  // ==========================================================================

  /**
   * Activate a twin for a user
   * Registers activation in ContextualMemory workspace (Guardrail 3)
   */
  async activateTwin(request: TwinActivation): Promise<boolean> {
    const { twinId, context, activationType } = request;
    const { userId, sessionId, taskContext } = context;

    // Validate twin ID (Guardrail 2: Only predefined twins)
    const validTwin = MarketplaceEngine.VALID_SKILL_TWINS.includes(twinId as SkillTwinId) ||
      ['strategist', 'builder', 'analyst', 'operator', 'critic'].includes(twinId);

    if (!validTwin) {
      throw new Error(`Invalid twin ID: ${twinId}. Only predefined twins can be activated.`);
    }

    // Register activation in memory
    if (this.memoryEngine) {
      await this.memoryEngine.write({
        tier: 'contextual',
        key: `twin_activation:${userId}:${twinId}`,
        value: {
          twinId,
          activationType,
          sessionId,
          taskContext,
          activatedAt: new Date().toISOString(),
        },
        metadata: {
          userId,
          type: 'twin_activation',
          twinId,
        },
      });
    }

    // Update local activation state
    if (!this.userActivations.has(userId)) {
      this.userActivations.set(userId, new Set());
    }

    const userActive = this.userActivations.get(userId)!;
    userActive.add(twinId);

    return true;
  }

  /**
   * Deactivate a twin for a user
   */
  async deactivateTwin(twinId: string, userId: string): Promise<boolean> {
    // Update memory
    if (this.memoryEngine) {
      await this.memoryEngine.write({
        tier: 'contextual',
        key: `twin_deactivation:${userId}:${twinId}`,
        value: {
          twinId,
          deactivatedAt: new Date().toISOString(),
        },
        metadata: {
          userId,
          type: 'twin_deactivation',
          twinId,
        },
      });
    }

    // Update local state
    const userActive = this.userActivations.get(userId);
    if (userActive) {
      return userActive.delete(twinId);
    }
    return false;
  }

  /**
   * Get activated twins for a user
   */
  getActivatedTwins(userId: string): string[] {
    const userActive = this.userActivations.get(userId);
    return userActive ? Array.from(userActive) : [];
  }

  // ==========================================================================
  // Team Management (Day 16)
  // ==========================================================================

  /**
   * Create a new twin team
   * Validates that only predefined Skill Twins can be used (Guardrail 2)
   */
  async createTeam(config: TeamConfig & { createdBy: string }): Promise<TwinTeam> {
    // Validate twin IDs (Guardrail 2: Only predefined Skill Twins)
    const invalidTwins = config.twinIds.filter(
      twinId => !MarketplaceEngine.VALID_SKILL_TWINS.includes(twinId as SkillTwinId)
    );

    if (invalidTwins.length > 0) {
      throw new Error(
        `Invalid twin IDs: ${invalidTwins.join(', ')}. ` +
        `Teams can only contain predefined Skill Twins: ${MarketplaceEngine.VALID_SKILL_TWINS.join(', ')}`
      );
    }

    const teamId = this.generateTeamId();

    const team: TwinTeam = {
      id: teamId,
      name: config.name,
      description: config.description || '',
      twinIds: config.twinIds,
      workflow: config.workflow,
      createdBy: config.createdBy,
      createdAt: new Date(),
      usageCount: 0,
      isPublic: config.isPublic || false,
    };

    // Store team in memory
    if (this.memoryEngine) {
      await this.memoryEngine.write({
        tier: 'contextual',
        key: `team:${teamId}`,
        value: team,
        metadata: {
          userId: config.createdBy,
          type: 'twin_team',
          teamId,
        },
      });
    }

    this.teams.set(teamId, team);
    return team;
  }

  /**
   * Create team from template
   */
  async createTeamFromTemplate(
    templateId: string, 
    userId: string,
    customName?: string
  ): Promise<TwinTeam | null> {
    const template = this.templates.get(templateId);
    if (!template) {
      return null;
    }

    return this.createTeam({
      name: customName || template.name,
      twinIds: template.twinIds,
      workflow: template.workflow,
      description: template.description,
      createdBy: userId,
    });
  }

  /**
   * Invoke a team (execute all twins in the team)
   */
  async invokeTeam(teamId: string): Promise<{
    team: TwinTeam;
    twinIds: SkillTwinId[];
    workflow: WorkflowMode;
  } | null> {
    const team = this.teams.get(teamId);
    if (!team) {
      return null;
    }

    // Increment usage
    team.usageCount++;

    return {
      team,
      twinIds: team.twinIds as SkillTwinId[],
      workflow: team.workflow,
    };
  }

  /**
   * Get all team templates
   */
  getTeamTemplates(): TeamTemplate[] {
    return Array.from(this.templates.values());
  }

  /**
   * Get a specific team template
   */
  getTeamTemplate(templateId: string): TeamTemplate | null {
    return this.templates.get(templateId) || null;
  }

  /**
   * Get a team by ID
   */
  async getTeam(teamId: string): Promise<TwinTeam | null> {
    return this.teams.get(teamId) || null;
  }

  /**
   * Get teams created by a user
   */
  getTeamsByUser(userId: string): TwinTeam[] {
    return Array.from(this.teams.values())
      .filter(team => team.createdBy === userId);
  }

  /**
   * Get public teams
   */
  getPublicTeams(): TwinTeam[] {
    return Array.from(this.teams.values())
      .filter(team => team.isPublic);
  }

  /**
   * Update a team
   */
  async updateTeam(teamId: string, updates: Partial<TwinTeam>): Promise<TwinTeam | null> {
    const team = this.teams.get(teamId);
    if (!team) {
      return null;
    }

    const updatedTeam = {
      ...team,
      ...updates,
      id: team.id, // Prevent ID changes
      createdBy: team.createdBy, // Prevent owner changes
      createdAt: team.createdAt, // Prevent timestamp changes
    };

    this.teams.set(teamId, updatedTeam);
    return updatedTeam;
  }

  /**
   * Delete a team
   */
  async deleteTeam(teamId: string): Promise<boolean> {
    return this.teams.delete(teamId);
  }

  /**
   * Increment team usage count
   */
  incrementTeamUsage(teamId: string): void {
    const team = this.teams.get(teamId);
    if (team) {
      team.usageCount++;
    }
  }

  // ==========================================================================
  // Marketplace Analytics
  // ==========================================================================

  /**
   * Get marketplace statistics
   */
  getStats(): {
    totalTwins: number;
    totalTeams: number;
    totalActivations: number;
    topTeams: Array<{ id: string; name: string; usageCount: number }>;
  } {
    const teams = Array.from(this.teams.values());
    const topTeams = teams
      .sort((a, b) => b.usageCount - a.usageCount)
      .slice(0, 5)
      .map(t => ({ id: t.id, name: t.name, usageCount: t.usageCount }));

    let totalActivations = 0;
    for (const activations of this.userActivations.values()) {
      totalActivations += activations.size;
    }

    return {
      totalTwins: 15, // 5 council + 10 skill
      totalTeams: teams.length,
      totalActivations,
      topTeams,
    };
  }

  // ==========================================================================
  // Utilities
  // ==========================================================================

  /**
   * Generate unique team ID
   */
  private generateTeamId(): string {
    return `team_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Shutdown engine
   */
  async shutdown(): Promise<void> {
    this.teams.clear();
    this.userActivations.clear();
  }
}

// ============================================================================
// Factory Function
// ============================================================================

/**
 * Create a configured MarketplaceEngine instance
 */
export function createMarketplaceEngine(memoryEngine?: IMemoryEngine): MarketplaceEngine {
  return new MarketplaceEngine(memoryEngine);
}

// ============================================================================
// Exports
// ============================================================================

export default MarketplaceEngine;

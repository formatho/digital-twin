/**
 * Digital Twin OS - Engine Exports
 * 
 * Central export point for all OS engines.
 * 
 * @module DigitalTwinOS
 * @version 1.0.0
 * @created April 2, 2026
 */

// Core Engines
export { TwinEngine, createTwinEngine } from './twin_engine';
export type {
  TwinType,
  InteractionMode,
  TaskPriority,
  TaskStatus,
  TwinRef,
  UserContext,
  TwinPayload,
  TwinResponse,
  CouncilSynthesis,
  TaskAssignment,
  RoutingDecision,
  ICouncilEngine,
  ISkillEngine,
  IMarketplaceEngine,
  IMemoryEngine,
  TeamConfig,
} from './twin_engine';

export { CouncilEngine, createCouncilEngine, COUNCIL_TWINS } from './council_engine';
export type {
  CouncilTwinId,
  CouncilTwinResponse,
  CouncilPayload,
  CouncilResponse,
  TwinPersona,
} from './council_engine';

export { SkillEngine, createSkillEngine, SKILL_TWINS } from './skill_engine';
export type {
  SkillTwinId,
  SkillCategory,
  SkillStatus,
  SkillPayload,
  SkillResponse,
  SkillTwinConfig,
  SkillActivation,
} from './skill_engine';

export { MarketplaceEngine, createMarketplaceEngine, TEAM_TEMPLATES } from './marketplace_engine';
export type {
  WorkflowMode,
  ActivationType,
  TwinTeam,
  TwinActivation,
  MarketplaceListing,
  TeamTemplate,
} from './marketplace_engine';

export { MemoryEngine, createMemoryEngine } from './memory_engine';
export type {
  MemoryTier,
  MemoryStatus,
  MemoryRecord,
  MemoryMetadata,
  MemoryQuery,
  ConversationMemory,
  ConversationMessage,
  ContextualMemory,
  UserPattern,
  ProjectMemory,
  ProjectKnowledge,
  ProjectDecision,
  ProjectMilestone,
} from './memory_engine';

/**
 * Initialize all engines with default configuration
 */
export async function initializeDigitalTwinOS(): Promise<{
  twinEngine: TwinEngine;
  councilEngine: CouncilEngine;
  skillEngine: SkillEngine;
  marketplaceEngine: MarketplaceEngine;
  memoryEngine: MemoryEngine;
}> {
  const memoryEngine = createMemoryEngine();
  const councilEngine = createCouncilEngine();
  const skillEngine = createSkillEngine();
  const marketplaceEngine = createMarketplaceEngine();
  const twinEngine = createTwinEngine(
    councilEngine,
    skillEngine,
    marketplaceEngine,
    memoryEngine
  );

  await Promise.all([
    memoryEngine.initialize(),
    councilEngine.initialize(),
    skillEngine.initialize(),
    marketplaceEngine.initialize(),
    twinEngine.initialize(),
  ]);

  return {
    twinEngine,
    councilEngine,
    skillEngine,
    marketplaceEngine,
    memoryEngine,
  };
}

// Version info
export const OS_VERSION = '1.0.0';
export const OS_CREATED = '2026-04-02';

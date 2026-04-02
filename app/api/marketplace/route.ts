/**
 * Marketplace API Route Handler
 * 
 * GET /api/marketplace - Browse available twins
 * POST /api/marketplace/activate - Activate a twin
 * POST /api/marketplace/team - Create a twin team
 * GET /api/marketplace/teams - List twin teams
 * 
 * @module app/api/marketplace/route
 */

import { NextRequest, NextResponse } from 'next/server';
import { createMarketplaceEngine } from '@/os/marketplace_engine';
import { createMemoryEngine } from '@/os/memory_engine';
import type { TeamConfig, ActivationType } from '@/os/marketplace_engine';

// Valid Skill Twin IDs for validation (Guardrail 2)
const VALID_SKILL_TWINS = [
  'research', 'content', 'design', 'growth', 'code',
  'marketing', 'sales', 'legal', 'product', 'operations'
];

/**
 * GET /api/marketplace
 * Browse available twins with optional filtering
 * 
 * Query params:
 * - category: 'council' | 'skill' | 'all'
 * - search: string
 * - capabilities: string (comma-separated)
 */
export async function GET(request: NextRequest) {
  try {
    const memoryEngine = createMemoryEngine();
    await memoryEngine.initialize();
    
    const marketplaceEngine = createMarketplaceEngine(memoryEngine);
    await marketplaceEngine.initialize();

    const category = request.nextUrl.searchParams.get('category') as 'council' | 'skill' | 'all' | null;
    const search = request.nextUrl.searchParams.get('search') || undefined;
    const capabilitiesParam = request.nextUrl.searchParams.get('capabilities');
    const capabilities = capabilitiesParam ? capabilitiesParam.split(',') : undefined;

    const listings = await marketplaceEngine.browseTwins({
      category: category || 'all',
      searchQuery: search,
      capabilities,
    });

    return NextResponse.json({
      success: true,
      data: listings,
    });

  } catch (error) {
    console.error('Marketplace API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to browse marketplace',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/marketplace
 * Handle marketplace operations
 * 
 * Actions:
 * - activate: Activate a twin for a user
 * - deactivate: Deactivate a twin
 * - createTeam: Create a twin team
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const action = body.action;

    const memoryEngine = createMemoryEngine();
    await memoryEngine.initialize();
    
    const marketplaceEngine = createMarketplaceEngine(memoryEngine);
    await marketplaceEngine.initialize();

    switch (action) {
      case 'activate':
        return await handleActivate(body, marketplaceEngine);
      
      case 'deactivate':
        return await handleDeactivate(body, marketplaceEngine);
      
      case 'createTeam':
        return await handleCreateTeam(body, marketplaceEngine);
      
      default:
        return NextResponse.json(
          { error: `Invalid action: ${action}. Valid actions: activate, deactivate, createTeam` },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Marketplace API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to process marketplace request',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * Handle twin activation
 */
async function handleActivate(body: any, marketplaceEngine: any) {
  if (!body.twinId) {
    return NextResponse.json(
      { error: 'Missing required field: twinId' },
      { status: 400 }
    );
  }

  if (!body.userId || !body.sessionId) {
    return NextResponse.json(
      { error: 'Missing required fields: userId, sessionId' },
      { status: 400 }
    );
  }

  // Validate twin ID (Guardrail 2)
  const validTwin = VALID_SKILL_TWINS.includes(body.twinId) ||
    ['strategist', 'builder', 'analyst', 'operator', 'critic'].includes(body.twinId);

  if (!validTwin) {
    return NextResponse.json(
      { 
        error: 'Invalid twin ID',
        message: `Valid twin IDs: ${[...VALID_SKILL_TWINS, 'strategist', 'builder', 'analyst', 'operator', 'critic'].join(', ')}`,
      },
      { status: 400 }
    );
  }

  const success = await marketplaceEngine.activateTwin({
    twinId: body.twinId,
    activationType: body.activationType || 'session',
    context: {
      userId: body.userId,
      sessionId: body.sessionId,
      taskContext: body.taskContext,
    },
    constraints: body.constraints,
  });

  return NextResponse.json({
    success,
    data: { twinId: body.twinId, activated: success },
  });
}

/**
 * Handle twin deactivation
 */
async function handleDeactivate(body: any, marketplaceEngine: any) {
  if (!body.twinId || !body.userId) {
    return NextResponse.json(
      { error: 'Missing required fields: twinId, userId' },
      { status: 400 }
    );
  }

  const success = await marketplaceEngine.deactivateTwin(body.twinId, body.userId);

  return NextResponse.json({
    success,
    data: { twinId: body.twinId, deactivated: success },
  });
}

/**
 * Handle twin team creation (Guardrail 2: Only predefined twins)
 */
async function handleCreateTeam(body: any, marketplaceEngine: any) {
  if (!body.name || !body.twinIds || !body.userId) {
    return NextResponse.json(
      { error: 'Missing required fields: name, twinIds, userId' },
      { status: 400 }
    );
  }

  if (!Array.isArray(body.twinIds) || body.twinIds.length === 0) {
    return NextResponse.json(
      { error: 'twinIds must be a non-empty array' },
      { status: 400 }
    );
  }

  // Validate all twin IDs (Guardrail 2)
  const invalidTwins = body.twinIds.filter(
    (id: string) => !VALID_SKILL_TWINS.includes(id)
  );

  if (invalidTwins.length > 0) {
    return NextResponse.json(
      { 
        error: 'Invalid twin IDs in team',
        message: `Invalid: ${invalidTwins.join(', ')}. Valid: ${VALID_SKILL_TWINS.join(', ')}`,
      },
      { status: 400 }
    );
  }

  const team = await marketplaceEngine.createTeam({
    name: body.name,
    twinIds: body.twinIds,
    workflow: body.workflow || 'sequential',
    description: body.description,
    isPublic: body.isPublic,
    createdBy: body.userId,
  });

  return NextResponse.json({
    success: true,
    data: team,
  });
}

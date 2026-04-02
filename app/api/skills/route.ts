/**
 * Skills API Route Handler
 * 
 * GET /api/skills - List available skill twins
 * POST /api/skills - Dispatch task to skill engine
 * POST /api/skills/activate - Activate a skill twin
 * 
 * @module app/api/skills/route
 */

import { NextRequest, NextResponse } from 'next/server';
import { createSkillEngine } from '@/os/skill_engine';
import type { SkillPayload, SkillTwinId } from '@/os/skill_engine';

// Valid Skill Twin IDs for validation
const VALID_SKILL_TWINS: SkillTwinId[] = [
  'research', 'content', 'design', 'growth', 'code',
  'marketing', 'sales', 'legal', 'product', 'operations'
];

/**
 * GET /api/skills
 * Returns list of available skill twins
 */
export async function GET(request: NextRequest) {
  try {
    const skillEngine = createSkillEngine();
    await skillEngine.initialize();
    
    const twins = skillEngine.getAllTwins();
    const category = request.nextUrl.searchParams.get('category');
    
    let filteredTwins = twins;
    if (category) {
      filteredTwins = skillEngine.getTwinsByCategory(category as any);
    }
    
    return NextResponse.json({
      success: true,
      data: filteredTwins.map(twin => ({
        id: twin.id,
        name: twin.name,
        emoji: twin.emoji,
        category: twin.category,
        description: twin.description,
        capabilities: twin.capabilities,
        rating: twin.rating,
      })),
    });

  } catch (error) {
    console.error('Skills API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch skill twins',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/skills
 * Dispatch a task to the skill engine
 * 
 * Request body:
 * - twinId: string - The skill twin to invoke
 * - task: string - The task description
 * - sessionId: string - Session identifier
 * - userId: string - User identifier
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.twinId) {
      return NextResponse.json(
        { error: 'Missing required field: twinId' },
        { status: 400 }
      );
    }

    if (!body.task) {
      return NextResponse.json(
        { error: 'Missing required field: task' },
        { status: 400 }
      );
    }

    if (!body.sessionId || !body.userId) {
      return NextResponse.json(
        { error: 'Missing required fields: sessionId, userId' },
        { status: 400 }
      );
    }

    // Validate twin ID (Guardrail 2)
    if (!VALID_SKILL_TWINS.includes(body.twinId)) {
      return NextResponse.json(
        { 
          error: 'Invalid twin ID',
          message: `Valid twin IDs: ${VALID_SKILL_TWINS.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Instantiate Skill Engine
    const skillEngine = createSkillEngine();
    await skillEngine.initialize();

    // Build payload
    const payload: SkillPayload = {
      twinId: body.twinId,
      task: body.task,
      userContext: {
        userId: body.userId,
        sessionId: body.sessionId,
        organizationId: body.organizationId,
      },
      context: body.context,
      constraints: body.constraints,
    };

    // Invoke skill engine
    const response = await skillEngine.invoke(payload);

    return NextResponse.json({
      success: true,
      data: response,
    });

  } catch (error) {
    console.error('Skills API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to process skill request',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

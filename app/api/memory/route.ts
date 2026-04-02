/**
 * Memory API Route Handler
 * 
 * GET /api/memory - Retrieve contextual memory for active workspace
 * POST /api/memory - Write to memory
 * 
 * @module app/api/memory/route
 */

import { NextRequest, NextResponse } from 'next/server';
import { createMemoryEngine } from '@/os/memory_engine';
import type { MemoryTier, MemoryQuery } from '@/os/memory_engine';

/**
 * GET /api/memory
 * Retrieve memory for the active workspace
 * 
 * Query params:
 * - tier: 'conversation' | 'contextual' | 'project'
 * - userId: string
 * - sessionId: string (for conversation tier)
 * - projectId: string (for project tier)
 * - limit: number
 */
export async function GET(request: NextRequest) {
  try {
    const memoryEngine = createMemoryEngine();
    await memoryEngine.initialize();

    const tier = request.nextUrl.searchParams.get('tier') as MemoryTier | null;
    const userId = request.nextUrl.searchParams.get('userId');
    const sessionId = request.nextUrl.searchParams.get('sessionId');
    const projectId = request.nextUrl.searchParams.get('projectId');
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '50');

    // Build query based on tier
    const query: MemoryQuery = {
      tier: tier || undefined,
      userId: userId || undefined,
      sessionId: sessionId || undefined,
      projectId: projectId || undefined,
      limit,
      orderBy: 'timestamp',
      orderDirection: 'desc',
    };

    // Handle tier-specific queries
    if (tier === 'conversation' && sessionId) {
      const records = await memoryEngine.getConversationMemory(sessionId);
      return NextResponse.json({
        success: true,
        data: records,
        tier: 'conversation',
        sessionId,
      });
    }

    if (tier === 'contextual' && userId) {
      const records = await memoryEngine.getContextualMemory(userId);
      return NextResponse.json({
        success: true,
        data: records,
        tier: 'contextual',
        userId,
      });
    }

    if (tier === 'project' && projectId) {
      const records = await memoryEngine.getProjectMemory(projectId);
      return NextResponse.json({
        success: true,
        data: records,
        tier: 'project',
        projectId,
      });
    }

    // General query
    const records = await memoryEngine.read(query);

    return NextResponse.json({
      success: true,
      data: records,
      query: {
        tier,
        userId,
        sessionId,
        projectId,
        limit,
      },
    });

  } catch (error) {
    console.error('Memory API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to retrieve memory',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/memory
 * Write to memory
 * 
 * Request body:
 * - tier: 'conversation' | 'contextual' | 'project'
 * - key: string
 * - value: any
 * - metadata: object
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.tier) {
      return NextResponse.json(
        { error: 'Missing required field: tier' },
        { status: 400 }
      );
    }

    const validTiers: MemoryTier[] = ['conversation', 'contextual', 'project'];
    if (!validTiers.includes(body.tier)) {
      return NextResponse.json(
        { 
          error: 'Invalid tier',
          message: `Valid tiers: ${validTiers.join(', ')}`,
        },
        { status: 400 }
      );
    }

    if (!body.key || body.value === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: key, value' },
        { status: 400 }
      );
    }

    const memoryEngine = createMemoryEngine();
    await memoryEngine.initialize();

    // Write to memory
    const record = await memoryEngine.write({
      tier: body.tier,
      key: body.key,
      value: body.value,
      metadata: body.metadata || {},
    });

    return NextResponse.json({
      success: true,
      data: record,
    });

  } catch (error) {
    console.error('Memory API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to write memory',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/memory
 * Delete a memory record
 * 
 * Query params:
 * - id: string - Memory record ID
 */
export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Missing required field: id' },
        { status: 400 }
      );
    }

    const memoryEngine = createMemoryEngine();
    await memoryEngine.initialize();

    const success = await memoryEngine.delete(id);

    return NextResponse.json({
      success,
      data: { id, deleted: success },
    });

  } catch (error) {
    console.error('Memory API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to delete memory',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * Council API Route Handler
 * 
 * POST /api/council
 * Triggers the Council Engine debate protocol and returns synthesized response
 * 
 * @module app/api/council/route
 */

import { NextRequest, NextResponse } from 'next/server';
import { createCouncilEngine } from '@/os/council_engine';
import type { CouncilPayload } from '@/os/council_engine';

/**
 * POST /api/council
 * 
 * Request body:
 * - question: string - The question to ask the council
 * - sessionId: string - Session identifier
 * - userId: string - User identifier
 * - specificTwinId?: string - Optional specific twin to query
 * - includeSynthesis?: boolean - Include synthesis in response
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.question) {
      return NextResponse.json(
        { error: 'Missing required field: question' },
        { status: 400 }
      );
    }

    if (!body.sessionId || !body.userId) {
      return NextResponse.json(
        { error: 'Missing required fields: sessionId, userId' },
        { status: 400 }
      );
    }

    // Instantiate Council Engine
    const councilEngine = createCouncilEngine();
    await councilEngine.initialize();

    // Build payload
    const payload: CouncilPayload = {
      question: body.question,
      userContext: {
        userId: body.userId,
        sessionId: body.sessionId,
        organizationId: body.organizationId,
      },
      specificTwinId: body.specificTwinId,
      includeSynthesis: body.includeSynthesis ?? true,
      context: body.context,
    };

    // Trigger Promise.all debate protocol
    const response = await councilEngine.summon(payload);

    return NextResponse.json({
      success: true,
      data: response,
    });

  } catch (error) {
    console.error('Council API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to process council request',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/council
 * Returns available council twins
 */
export async function GET() {
  try {
    const councilEngine = createCouncilEngine();
    await councilEngine.initialize();
    
    const twins = councilEngine.getAllTwins();
    
    return NextResponse.json({
      success: true,
      data: twins.map(twin => ({
        id: twin.id,
        name: twin.name,
        emoji: twin.emoji,
        role: twin.role,
        archetype: twin.archetype,
      })),
    });

  } catch (error) {
    console.error('Council API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch council twins',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

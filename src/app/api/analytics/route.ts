import { NextRequest, NextResponse } from 'next/server';

// Analytics event storage (in production, use a real analytics service)
const events: unknown[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate event structure
    if (!body.event || typeof body.event !== 'string') {
      return NextResponse.json(
        { error: 'Invalid event format' },
        { status: 400 }
      );
    }

    // Add server-side data
    const enrichedEvent = {
      ...body,
      server_timestamp: Date.now(),
      user_agent: request.headers.get('user-agent'),
      referer: request.headers.get('referer'),
    };

    // In development, just log
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics Event]', enrichedEvent);
    }

    // Store event (in production, send to analytics service)
    events.push(enrichedEvent);

    // Keep only last 1000 events in memory (for debugging)
    if (events.length > 1000) {
      events.shift();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to process event' },
      { status: 500 }
    );
  }
}

// GET endpoint for debugging (development only)
export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not available' }, { status: 403 });
  }

  return NextResponse.json({
    total_events: events.length,
    recent_events: events.slice(-20),
  });
}

import { NextRequest, NextResponse } from 'next/server';

// Simple analytics endpoint for beacon tracking
// In production, integrate with your analytics service
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Log analytics events (in production, send to your analytics service)
    console.log('Analytics event:', data);
    
    // You could also store in database or send to external service here
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking analytics:', error);
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    );
  }
}

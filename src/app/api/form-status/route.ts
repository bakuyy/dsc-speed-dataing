import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    console.log('[Form Status API] Checking form status...');
    
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('key', 'session_state')
      .single();

    if (error) {
      console.error('[Form Status API] Error fetching session state:', error);
      // Default to inactive if there's an error
      return NextResponse.json({ 
        isActive: false, 
        error: "Failed to fetch session state",
        message: "Form is currently unavailable",
        sessionState: 'idle'
      });
    }

    const sessionState = data?.value || 'idle';
    const isActive = sessionState === 'form_active';
    
    console.log('[Form Status API] Session state:', { sessionState, isActive });
    
    let message = "Form is currently unavailable";
    if (sessionState === 'form_active') {
      message = "Form is active - you can submit your responses";
    } else if (sessionState === 'matching_in_progress') {
      message = "Form is locked - matching algorithm is running";
    } else if (sessionState === 'matches_released') {
      message = "Form is locked - matches have been released";
    }
    
    return NextResponse.json({ 
      isActive,
      sessionState,
      message
    });
  } catch (error) {
    console.error('[Form Status API] Unexpected error:', error);
    return NextResponse.json({ 
      isActive: false, 
      error: "Internal server error",
      message: "Form is currently unavailable",
      sessionState: 'idle'
    });
  }
} 
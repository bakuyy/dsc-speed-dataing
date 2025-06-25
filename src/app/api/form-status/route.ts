import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    console.log('[Form Status API] Checking form status...');
    
    const { data: settings, error } = await supabase
      .from('settings')
      .select('*')
      .eq('key', 'form_active')
      .single();

    if (error) {
      console.error('[Form Status API] Error fetching form status:', error);
      // Default to inactive if there's an error
      return NextResponse.json({ 
        isActive: false, 
        error: "Failed to fetch form status",
        message: "Form is currently unavailable" 
      });
    }

    const isActive = settings?.value === true || settings?.value === 'true';
    
    console.log('[Form Status API] Form status:', { isActive, setting: settings });
    
    return NextResponse.json({ 
      isActive,
      message: isActive ? "Form is active" : "Form is currently locked"
    });
  } catch (error) {
    console.error('[Form Status API] Unexpected error:', error);
    return NextResponse.json({ 
      isActive: false, 
      error: "Internal server error",
      message: "Form is currently unavailable" 
    });
  }
} 
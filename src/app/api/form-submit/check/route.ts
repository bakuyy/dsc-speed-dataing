import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: "Email parameter is required" }, { status: 400 });
    }

    console.log('[Form Submit Check API] Checking for existing submission:', email);

    // Check if user has already submitted
    const { data, error } = await supabase
      .from('form_responses')
      .select('id, name')
      .eq('email', email)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No record found
        console.log('[Form Submit Check API] No existing submission found');
        return NextResponse.json({ 
          hasSubmitted: false,
          message: "No existing submission found"
        });
      }
      console.error('[Form Submit Check API] Error checking submission:', error);
      return NextResponse.json({ error: "Failed to check submission status" }, { status: 500 });
    }

    console.log('[Form Submit Check API] Existing submission found:', data);
    return NextResponse.json({ 
      hasSubmitted: true,
      submission: data,
      message: "User has already submitted a response"
    });

  } catch (error) {
    console.error('[Form Submit Check API] Unexpected error:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 
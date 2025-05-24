import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';


// function to check if connection to supabase is working or not
// currently doesn't have any tables, so it's just a session check
// test route @ localhost:[port]/api/test-connection

export async function GET() {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      return NextResponse.json({ 
        success: false, 
        error: error.message 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully connected to Supabase',
      data 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to connect to Supabase' 
    }, { status: 500 });
  }
} 
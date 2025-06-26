/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Validate email format
    if (!email || !email.includes('@')) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid email format' 
      });
    }

    // TODO: Add your actual validation logic here
    // For now, we'll just check if the email exists in Supabase
    const { data, error } = await supabase
      .from('users')
      .select('name, role')
      .eq('email', email)
      .single();

    if (error || !data) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid credentials' 
      });
    }

    return NextResponse.json({
      success: true,
      name: data.name,
      role: data.role
    });

  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 });
  }
} 
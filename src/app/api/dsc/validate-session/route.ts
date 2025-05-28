import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { jwtVerify } from 'jose';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ 
        success: false, 
        error: 'No token provided' 
      }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    
    // Verify JWT token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    // Get user data from Supabase
    const { data, error } = await supabase
      .from('users')
      .select('name, role')
      .eq('email', payload.email)
      .single();

    if (error || !data) {
      return NextResponse.json({ 
        success: false, 
        error: 'User not found' 
      }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      name: data.name,
      role: data.role
    });

  } catch (error) {
    console.error('[Session Validation] Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Invalid token' 
    }, { status: 401 });
  }
} 
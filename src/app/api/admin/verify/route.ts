/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    
    console.log('[Admin Verify API] Admin verification attempt');
    
    // Check against server-side environment variable
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    if (password === adminPassword) {
      console.log('[Admin Verify API] Admin password correct');
      
      // Set admin verification cookie
      const response = NextResponse.json({ success: true });
      response.cookies.set({
        name: 'adminVerified',
        value: 'true',
        httpOnly: false,
        path: '/',
        maxAge: 60 * 60 * 24, // 1 day
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      });
      
      return response;
    } else {
      console.log('[Admin Verify API] Admin password incorrect');
      return NextResponse.json({ error: 'Incorrect admin password' }, { status: 401 });
    }
  } catch (error) {
    console.error('[Admin Verify API] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 
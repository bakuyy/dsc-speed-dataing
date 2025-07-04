/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  console.log('[Login API] === LOGIN API CALLED ===');
  console.log('[Login API] Request method:', req.method);
  console.log('[Login API] Request URL:', req.url);
  
  // Add a simple test to verify the API is working
  console.log('[Login API] TEST: API is being called successfully');
  
  const { email, password, secretKey } = await req.json();
  console.log('[Login API] Login attempt for email:', email);
  console.log('[Login API] Environment variables check:', {
    hasServerUrl: !!process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL,
    hasSecretKey: !!process.env.SECRET_KEY,
    serverUrl: process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL
  });

  try {
    console.log('[Login API] Making request to external server:', `${process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL}/api/users/login`);
    
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL}/api/users/login`,
      { email: email.toLowerCase(), password },
      { headers: { "Content-Type": "application/json" } }
    );
    console.log('[Login API] External login successful, user data:', { 
      username: data.username, 
      userStatus: data.userStatus,
      accessToken: data.accessToken ? 'present' : 'not found'
    });

    if (secretKey !== process.env.SECRET_KEY) {
      console.log('[Login API] Invalid secret key');
      return NextResponse.json({ error: "Invalid secret key" }, { status: 401 });
    }

    const response = NextResponse.json({
      name: data.username,
      accessToken: data.accessToken,
      role: data.userStatus
    });

    // Set token cookie
    response.cookies.set({
      name: "token",
      value: data.accessToken,
      httpOnly: false,
      path: "/",
      maxAge: 60 * 60 * 24 * 120, // 120 days
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    // Set role cookie for middleware authentication
    response.cookies.set({
      name: "role",
      value: data.userStatus,
      httpOnly: false,
      path: "/",
      maxAge: 60 * 60 * 24 * 120, // 120 days
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    console.log('[Login API] Token and role set in cookies. Role:', data.userStatus);

    return response;
  } catch (error: any) {
    console.error('[Login API] Login failed:', error);
    
    // Add more detailed error logging
    if (error.response) {
      console.error('[Login API] External server response:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers
      });
    } else if (error.request) {
      console.error('[Login API] No response received from external server:', error.request);
    } else {
      console.error('[Login API] Error setting up request:', error.message);
    }
    
    return NextResponse.json({ error: "Login failed" }, { status: 401 });
  }
}
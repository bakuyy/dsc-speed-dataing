/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  console.log('[User API] === USER API CALLED ===');
  
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const role = cookieStore.get("role")?.value;
  
  console.log('[User API] All cookies:', Array.from(cookieStore.getAll()).map(c => ({ name: c.name, value: c.value ? 'present' : 'not found' })));
  console.log('[User API] Token from cookies:', token ? 'present' : 'not found');
  console.log('[User API] Role from cookies:', role || 'not found');

  if (!token) {
    console.log('[User API] No token found');
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }

  try {
    console.log('[User API] Fetching user data from external API...');
    console.log('[User API] External API URL:', `${process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL}/api/users/user`);
    
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL}/api/users/user`,
      {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 4000,
      },
    );
    console.log('[User API] External API response:', data);
    console.log('[User API] User status/role from external API:', data.userStatus);

    return NextResponse.json(
      {
        id: data.id ?? data._id ?? data.email, 
        name: data.username,
        role: data.userStatus,
        email: data.email,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('[User API] Error fetching user data:', error.response?.status, error.response?.data || error.message);
    
    // Add more detailed error logging
    if (error.response) {
      console.error('[User API] External server response:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers
      });
    } else if (error.request) {
      console.error('[User API] No response received from external server:', error.request);
    } else {
      console.error('[User API] Error setting up request:', error.message);
    }
    
    // Return more specific error messages based on the error
    if (error.response?.status === 401) {
      return NextResponse.json({ message: "Token expired or invalid" }, { status: 401 });
    } else if (error.response?.status === 404) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    } else if (error.code === 'ECONNABORTED') {
      return NextResponse.json({ message: "Request timeout" }, { status: 408 });
    } else {
      return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
  }
}
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const token = (await cookies()).get("token")?.value;
  console.log('[User API] Token from cookies:', token ? 'present' : 'not found');

  if (!token) {
    console.log('[User API] No token found');
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }

  try {
    console.log('[User API] Fetching user data from external API...');
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
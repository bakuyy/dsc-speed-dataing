import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  // Try to get token from cookies first
  let token = (await cookies()).get("token")?.value;
  console.log('[User API] Token from cookies:', token);
  
  // If no token in cookies, try to get it from Authorization header
  if (!token) {
    const authHeader = request.headers.get('authorization');
    console.log('[User API] Authorization header:', authHeader);
    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
      console.log('[User API] Token from Authorization header:', token);
    }
  }
  
  console.log('[User API] Final token:', token);

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

    return NextResponse.json(
      {
        id: data.id ?? data._id ?? data.email, 
        name: data.username,
        role: data.userStatus,
        email: data.email,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('[User API] Error fetching user data:', error);
    return NextResponse.json({ message: "Session expired" }, { status: 401 });
  }
}
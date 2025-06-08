import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

export async function POST(req: Request) {
  const { email, password, secretKey } = await req.json();
  console.log('[Login API] Login attempt for email:', email);

  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL}/api/users/login`,
      { email: email.toLowerCase(), password },
      { headers: { "Content-Type": "application/json" } }
    );
    console.log('[Login API] External login successful, setting token');

    if (secretKey !== process.env.NEXT_PUBLIC_SECRET_KEY) {
      console.log('[Login API] Invalid secret key');
      return NextResponse.json({ error: "Invalid secret key" }, { status: 401 });
    }

    const cookieStore = await cookies();
    cookieStore.set({
      name: "token",
      value: data.accessToken,
      httpOnly: false,
      path: "/",
      maxAge: 60 * 60 * 24 * 120, // 120 days
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    console.log('[Login API] Token set in cookies');

    const response = NextResponse.json({
      name: data.username,
      accessToken: data.accessToken,
      role: data.userStatus
    });

    response.cookies.set({
      name: "token",
      value: data.accessToken,
      httpOnly: false,
      path: "/",
      maxAge: 60 * 60 * 24 * 120,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    console.error('[Login API] Login failed:', error);
    return NextResponse.json({ error: "Login failed" }, { status: 401 });
  }
}
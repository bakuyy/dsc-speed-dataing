import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const role = cookieStore.get('role')?.value;

  return NextResponse.json({
    token: token ? 'present' : 'not found',
    role: role || 'not found',
    allCookies: Object.fromEntries(
      cookieStore.getAll().map(cookie => [cookie.name, cookie.value])
    )
  });
} 
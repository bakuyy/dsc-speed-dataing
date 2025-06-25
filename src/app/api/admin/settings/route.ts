import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const token = (await cookies()).get("token")?.value;
  const role = (await cookies()).get("role")?.value;
  const adminVerified = (await cookies()).get("adminVerified")?.value;

  console.log('[Admin Settings API] Checking admin access:', { token: token ? 'present' : 'not found', role, adminVerified });

  // Check admin authentication
  if (!token) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  if (role !== 'admin') {
    return NextResponse.json({ error: "Unauthorized - Admin access required" }, { status: 403 });
  }

  if (adminVerified !== 'true') {
    return NextResponse.json({ error: "Admin verification required" }, { status: 403 });
  }

  try {
    console.log('[Admin Settings API] Fetching settings...');
    
    const { data: settings, error } = await supabase
      .from('settings')
      .select('*');

    if (error) {
      console.error('[Admin Settings API] Error fetching settings:', error);
      return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
    }

    console.log('[Admin Settings API] Settings fetched successfully:', settings);
    return NextResponse.json({ settings: settings || [] });
  } catch (error) {
    console.error('[Admin Settings API] Unexpected error:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const token = (await cookies()).get("token")?.value;
  const role = (await cookies()).get("role")?.value;
  const adminVerified = (await cookies()).get("adminVerified")?.value;

  console.log('[Admin Settings API] Checking admin access for PUT:', { token: token ? 'present' : 'not found', role, adminVerified });

  // Check admin authentication
  if (!token) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  if (role !== 'admin') {
    return NextResponse.json({ error: "Unauthorized - Admin access required" }, { status: 403 });
  }

  if (adminVerified !== 'true') {
    return NextResponse.json({ error: "Admin verification required" }, { status: 403 });
  }

  try {
    const { key, value } = await request.json();
    
    console.log('[Admin Settings API] Updating setting:', { key, value });

    if (!key || value === undefined) {
      return NextResponse.json({ error: "Key and value are required" }, { status: 400 });
    }

    // First check if the setting exists
    const { data: existingSetting, error: checkError } = await supabase
      .from('settings')
      .select('*')
      .eq('key', key)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('[Admin Settings API] Error checking existing setting:', checkError);
      return NextResponse.json({ error: "Failed to check setting" }, { status: 500 });
    }

    let result;
    if (existingSetting) {
      // Update existing setting
      console.log('[Admin Settings API] Updating existing setting');
      const { data, error } = await supabase
        .from('settings')
        .update({ value: value.toString() })
        .eq('key', key)
        .select();

      if (error) {
        console.error('[Admin Settings API] Error updating setting:', error);
        return NextResponse.json({ error: "Failed to update setting" }, { status: 500 });
      }
      result = data;
    } else {
      // Insert new setting
      console.log('[Admin Settings API] Inserting new setting');
      const { data, error } = await supabase
        .from('settings')
        .insert({ key, value: value.toString() })
        .select();

      if (error) {
        console.error('[Admin Settings API] Error inserting setting:', error);
        return NextResponse.json({ error: "Failed to insert setting" }, { status: 500 });
      }
      result = data;
    }

    console.log('[Admin Settings API] Setting operation successful:', result);
    return NextResponse.json({ success: true, setting: result?.[0] });
  } catch (error) {
    console.error('[Admin Settings API] Unexpected error:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 
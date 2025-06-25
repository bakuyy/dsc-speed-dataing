import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const token = (await cookies()).get("token")?.value;
  const role = (await cookies()).get("role")?.value;
  const adminVerified = (await cookies()).get("adminVerified")?.value;

  console.log('[Debug Settings API] Checking admin access:', { token: token ? 'present' : 'not found', role, adminVerified });

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
    console.log('[Debug Settings API] Checking settings table...');

    // First, let's check if the settings table exists and get its structure
    const { data: settings, error: settingsError } = await supabase
      .from('settings')
      .select('*');

    console.log('[Debug Settings API] Settings table query result:', { settings, error: settingsError });

    if (settingsError) {
      console.error('[Debug Settings API] Error accessing settings table:', settingsError);
      
      // Check if it's an RLS error
      if (settingsError.code === '42501') {
        return NextResponse.json({ 
          error: "Row Level Security (RLS) policy is blocking access to settings table",
          details: settingsError,
          solution: "You need to either: 1) Disable RLS on the settings table, or 2) Create an RLS policy that allows admin access"
        }, { status: 500 });
      }
      
      // Try to create the default settings if table exists but is empty
      if (settingsError.code === 'PGRST116') {
        console.log('[Debug Settings API] Table might be empty, trying to insert default settings...');
        
        const defaultSettings = [
          { key: 'form_active', value: 'true' },
          { key: 'matching_active', value: 'false' },
          { key: 'release_active', value: 'true' }
        ];

        const { data: insertedSettings, error: insertError } = await supabase
          .from('settings')
          .insert(defaultSettings)
          .select();

        if (insertError) {
          console.error('[Debug Settings API] Error inserting default settings:', insertError);
          return NextResponse.json({ 
            error: "Settings table exists but failed to insert default data",
            tableError: settingsError,
            insertError 
          }, { status: 500 });
        }

        console.log('[Debug Settings API] Default settings inserted successfully:', insertedSettings);
        return NextResponse.json({ 
          message: "Default settings created",
          settings: insertedSettings 
        });
      }

      return NextResponse.json({ 
        error: "Settings table not accessible",
        details: settingsError 
      }, { status: 500 });
    }

    // If table exists but is empty, create default settings
    if (!settings || settings.length === 0) {
      console.log('[Debug Settings API] Settings table is empty, creating default settings...');
      
      const defaultSettings = [
        { key: 'form_active', value: 'true' },
        { key: 'matching_active', value: 'false' },
        { key: 'release_active', value: 'true' }
      ];

      const { data: insertedSettings, error: insertError } = await supabase
        .from('settings')
        .insert(defaultSettings)
        .select();

      if (insertError) {
        console.error('[Debug Settings API] Error inserting default settings:', insertError);
        return NextResponse.json({ 
          error: "Failed to insert default settings",
          details: insertError 
        }, { status: 500 });
      }

      console.log('[Debug Settings API] Default settings created:', insertedSettings);
      return NextResponse.json({ 
        message: "Default settings created",
        settings: insertedSettings 
      });
    }

    console.log('[Debug Settings API] Settings table has data:', settings);
    return NextResponse.json({ 
      message: "Settings table accessible",
      settings: settings 
    });

  } catch (error) {
    console.error('[Debug Settings API] Unexpected error:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 
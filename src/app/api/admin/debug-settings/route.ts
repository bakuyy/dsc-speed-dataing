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
    console.log('[Debug Settings API] Fetching database information...');

    // Get session state
    const { data: sessionState, error: sessionError } = await supabase
      .from('settings')
      .select('*')
      .eq('key', 'session_state')
      .single();

    if (sessionError) {
      console.error('[Debug Settings API] Error fetching session state:', sessionError);
    }

    // Get table information
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .order('table_name');

    if (tablesError) {
      console.error('[Debug Settings API] Error fetching tables:', tablesError);
    }

    // Get form responses count
    let formResponsesCount = 0;
    try {
      const { count, error: countError } = await supabase
        .from('form_responses')
        .select('*', { count: 'exact', head: true });

      if (!countError) {
        formResponsesCount = count || 0;
      }
    } catch (error) {
      console.log('[Debug Settings API] form_responses table may not exist');
    }

    // Get matches count
    let matchesCount = 0;
    try {
      const { count, error: countError } = await supabase
        .from('matches')
        .select('*', { count: 'exact', head: true });

      if (!countError) {
        matchesCount = count || 0;
      }
    } catch (error) {
      console.log('[Debug Settings API] matches table may not exist');
    }

    const debugInfo = {
      timestamp: new Date().toISOString(),
      currentSessionState: sessionState?.value || 'not_set',
      sessionStateRecord: sessionState,
      availableTables: tables?.map(t => t.table_name) || [],
      formResponsesCount,
      matchesCount,
      databaseInfo: {
        hasSettingsTable: sessionState !== null,
        hasFormResponsesTable: formResponsesCount >= 0,
        hasMatchesTable: matchesCount >= 0,
        sessionStateExists: sessionState !== null
      }
    };

    console.log('[Debug Settings API] Debug info:', debugInfo);
    return NextResponse.json(debugInfo);

  } catch (error) {
    console.error('[Debug Settings API] Unexpected error:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const token = (await cookies()).get("token")?.value;
  const role = (await cookies()).get("role")?.value;
  const adminVerified = (await cookies()).get("adminVerified")?.value;

  console.log('[Debug Tables API] Checking admin access:', { token: token ? 'present' : 'not found', role, adminVerified });

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
    console.log('[Debug Tables API] Fetching table information...');

    // Try specific table names that might contain form responses
    const possibleResponseTables = [
      'form_responses', 
      'responses', 
      'survey_responses', 
      'user_responses', 
      'submissions',
      'participants',
      'users',
      'matches',
      'form_data',
      'survey_data'
    ];
    
    const responseTableInfo = [];

    for (const tableName of possibleResponseTables) {
      try {
        console.log(`[Debug Tables API] Testing table: ${tableName}`);
        const { data: sampleData, error: sampleError, count } = await supabase
          .from(tableName)
          .select('*', { count: 'exact', head: true })
          .limit(1);

        if (!sampleError) {
          console.log(`[Debug Tables API] Successfully accessed table: ${tableName}, count: ${count}`);
          responseTableInfo.push({
            tableName,
            rowCount: count || 0,
            hasData: (count || 0) > 0,
            sampleColumns: sampleData && sampleData.length > 0 ? Object.keys(sampleData[0]) : [],
            sampleData: sampleData && sampleData.length > 0 ? sampleData[0] : null
          });
        } else {
          console.log(`[Debug Tables API] Error accessing table ${tableName}:`, sampleError.message);
          responseTableInfo.push({
            tableName,
            rowCount: 0,
            hasData: false,
            error: sampleError.message
          });
        }
      } catch (error) {
        console.log(`[Debug Tables API] Exception accessing table ${tableName}:`, error);
        responseTableInfo.push({
          tableName,
          rowCount: 0,
          hasData: false,
          error: 'Table does not exist or access denied'
        });
      }
    }

    // Try to get a few sample rows from tables that have data
    const tablesWithData = responseTableInfo.filter(t => t.hasData);
    const sampleData = {};

    for (const table of tablesWithData) {
      try {
        const { data: rows, error } = await supabase
          .from(table.tableName)
          .select('*')
          .limit(3);

        if (!error && rows) {
          sampleData[table.tableName] = rows;
        }
      } catch (error) {
        console.log(`[Debug Tables API] Error fetching sample data from ${table.tableName}:`, error);
      }
    }

    // Specifically check the settings table
    let settingsInfo = null;
    try {
      console.log('[Debug Tables API] Checking settings table...');
      const { data: settingsData, error: settingsError, count: settingsCount } = await supabase
        .from('settings')
        .select('*', { count: 'exact' });

      if (!settingsError) {
        console.log(`[Debug Tables API] Settings table exists with ${settingsCount} rows`);
        settingsInfo = {
          exists: true,
          rowCount: settingsCount || 0,
          hasData: (settingsCount || 0) > 0,
          data: settingsData || []
        };
      } else {
        console.log(`[Debug Tables API] Error accessing settings table:`, settingsError.message);
        settingsInfo = {
          exists: false,
          error: settingsError.message
        };
      }
    } catch (error) {
      console.log(`[Debug Tables API] Exception accessing settings table:`, error);
      settingsInfo = {
        exists: false,
        error: 'Table does not exist or access denied'
      };
    }

    const result = {
      responseTables: responseTableInfo,
      tablesWithData: tablesWithData.map(t => t.tableName),
      totalTablesTested: possibleResponseTables.length,
      tablesWithDataCount: tablesWithData.length,
      sampleData,
      settingsTable: settingsInfo,
      timestamp: new Date().toISOString()
    };

    console.log('[Debug Tables API] Table information fetched successfully:', result);

    return NextResponse.json(result);
  } catch (error) {
    console.error('[Debug Tables API] Unexpected error:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 
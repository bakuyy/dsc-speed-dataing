import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

export async function POST() {
  const token = (await cookies()).get("token")?.value;
  const role = (await cookies()).get("role")?.value;
  const adminVerified = (await cookies()).get("adminVerified")?.value;

  console.log('[Migrate Database API] Checking admin access:', { token: token ? 'present' : 'not found', role, adminVerified });

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
    console.log('[Migrate Database API] Starting database migration...');

    // 1. Add vector_embedding column to form_responses table
    console.log('[Migrate Database API] Adding vector_embedding column...');
    const { error: alterError } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE form_responses ADD COLUMN IF NOT EXISTS vector_embedding numeric[]'
    });

    if (alterError) {
      console.log('[Migrate Database API] Note: vector_embedding column may already exist or RPC not available');
    }

    // 2. Create curr_matches table
    console.log('[Migrate Database API] Creating curr_matches table...');
    const { error: currMatchesError } = await supabase
      .from('curr_matches')
      .select('id')
      .limit(1);

    if (currMatchesError && currMatchesError.code === '42P01') { // Table doesn't exist
      console.log('[Migrate Database API] curr_matches table does not exist, creating...');
      // We'll need to create it manually since Supabase doesn't support CREATE TABLE via client
      return NextResponse.json({ 
        error: "Manual migration required", 
        message: "Please run the migrate-to-matching-tables.sql script in your Supabase SQL editor",
        steps: [
          "1. Go to your Supabase dashboard",
          "2. Navigate to the SQL editor",
          "3. Copy and paste the contents of migrate-to-matching-tables.sql",
          "4. Execute the script"
        ]
      }, { status: 400 });
    }

    // 3. Create previous_matches table
    console.log('[Migrate Database API] Checking previous_matches table...');
    const { error: prevMatchesError } = await supabase
      .from('previous_matches')
      .select('id')
      .limit(1);

    if (prevMatchesError && prevMatchesError.code === '42P01') { // Table doesn't exist
      console.log('[Migrate Database API] previous_matches table does not exist');
      return NextResponse.json({ 
        error: "Manual migration required", 
        message: "Please run the migrate-to-matching-tables.sql script in your Supabase SQL editor",
        steps: [
          "1. Go to your Supabase dashboard",
          "2. Navigate to the SQL editor", 
          "3. Copy and paste the contents of migrate-to-matching-tables.sql",
          "4. Execute the script"
        ]
      }, { status: 400 });
    }

    // 4. Check if vector_embedding column exists
    console.log('[Migrate Database API] Checking vector_embedding column...');
    const { data: sampleData, error: sampleError } = await supabase
      .from('form_responses')
      .select('vector_embedding')
      .limit(1);

    if (sampleError && sampleError.message.includes('column "vector_embedding" does not exist')) {
      console.log('[Migrate Database API] vector_embedding column does not exist');
      return NextResponse.json({ 
        error: "Manual migration required", 
        message: "Please run the migrate-to-matching-tables.sql script in your Supabase SQL editor",
        steps: [
          "1. Go to your Supabase dashboard",
          "2. Navigate to the SQL editor",
          "3. Copy and paste the contents of migrate-to-matching-tables.sql", 
          "4. Execute the script"
        ]
      }, { status: 400 });
    }

    // 5. Verify all tables exist and have correct structure
    console.log('[Migrate Database API] Verifying database structure...');
    const verification = {
      form_responses: { exists: true, hasVectorEmbedding: true },
      curr_matches: { exists: true },
      previous_matches: { exists: true }
    };

    // Test curr_matches
    try {
      const { data: currData, error: currError } = await supabase
        .from('curr_matches')
        .select('*')
        .limit(1);
      verification.curr_matches.exists = !currError;
    } catch (error) {
      verification.curr_matches.exists = false;
    }

    // Test previous_matches
    try {
      const { data: prevData, error: prevError } = await supabase
        .from('previous_matches')
        .select('*')
        .limit(1);
      verification.previous_matches.exists = !prevError;
    } catch (error) {
      verification.previous_matches.exists = false;
    }

    // Test vector_embedding column
    try {
      const { data: vectorData, error: vectorError } = await supabase
        .from('form_responses')
        .select('vector_embedding')
        .limit(1);
      verification.form_responses.hasVectorEmbedding = !vectorError;
    } catch (error) {
      verification.form_responses.hasVectorEmbedding = false;
    }

    const allTablesExist = verification.curr_matches.exists && 
                          verification.previous_matches.exists && 
                          verification.form_responses.hasVectorEmbedding;

    if (!allTablesExist) {
      return NextResponse.json({ 
        error: "Database migration incomplete", 
        verification,
        message: "Please run the migrate-to-matching-tables.sql script in your Supabase SQL editor"
      }, { status: 400 });
    }

    console.log('[Migrate Database API] Database migration completed successfully!');

    return NextResponse.json({
      success: true,
      message: "Database migration completed successfully",
      verification,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('[Migrate Database API] Unexpected error:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 
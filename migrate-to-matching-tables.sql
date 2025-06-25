-- Migration Script: Add missing tables and columns for matching algorithm
-- Run this in your Supabase SQL editor

-- 1. Add vector_embedding column to form_responses table
ALTER TABLE form_responses 
ADD COLUMN IF NOT EXISTS vector_embedding numeric[];

-- 2. Create curr_matches table for current session matches
CREATE TABLE IF NOT EXISTS curr_matches (
  id SERIAL PRIMARY KEY,
  person1_id INTEGER REFERENCES form_responses(id),
  person2_id INTEGER REFERENCES form_responses(id),
  similarity_score DECIMAL(5,4),
  emoji VARCHAR(10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create previous_matches table for historical matches
CREATE TABLE IF NOT EXISTS previous_matches (
  id SERIAL PRIMARY KEY,
  person1_id INTEGER REFERENCES form_responses(id),
  person2_id INTEGER REFERENCES form_responses(id),
  similarity_score DECIMAL(5,4),
  emoji VARCHAR(10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Disable RLS on new tables for admin access
ALTER TABLE curr_matches DISABLE ROW LEVEL SECURITY;
ALTER TABLE previous_matches DISABLE ROW LEVEL SECURITY;

-- 5. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_curr_matches_persons ON curr_matches(person1_id, person2_id);
CREATE INDEX IF NOT EXISTS idx_previous_matches_persons ON previous_matches(person1_id, person2_id);

-- 6. Verify the setup
SELECT 'Form responses with vector_embedding' as table_name, COUNT(*) as record_count FROM form_responses
UNION ALL
SELECT 'Current matches table' as table_name, COUNT(*) as record_count FROM curr_matches
UNION ALL
SELECT 'Previous matches table' as table_name, COUNT(*) as record_count FROM previous_matches;

-- 7. Show table structures
SELECT 'form_responses columns:' as info;
SELECT column_name, data_type FROM information_schema.columns 
WHERE table_name = 'form_responses' ORDER BY ordinal_position;

SELECT 'curr_matches columns:' as info;
SELECT column_name, data_type FROM information_schema.columns 
WHERE table_name = 'curr_matches' ORDER BY ordinal_position;

SELECT 'previous_matches columns:' as info;
SELECT column_name, data_type FROM information_schema.columns 
WHERE table_name = 'previous_matches' ORDER BY ordinal_position; 
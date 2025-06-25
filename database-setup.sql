-- Database Setup for Speed Dating Application
-- Run this in your Supabase SQL editor

-- 1. Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(255) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create form_responses table
CREATE TABLE IF NOT EXISTS form_responses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  pronouns VARCHAR(50),
  watiam_user_display VARCHAR(255) NOT NULL,
  program VARCHAR(255),
  year VARCHAR(50),
  social_media_links TEXT,
  career TEXT,
  friend_traits TEXT,
  self_desc TEXT,
  goal TEXT,
  fun TEXT,
  music TEXT,
  class_seat VARCHAR(10),
  evil_hobby VARCHAR(10),
  most_likely_to VARCHAR(10),
  caught_watching VARCHAR(10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create matches table
CREATE TABLE IF NOT EXISTS matches (
  id SERIAL PRIMARY KEY,
  user1_id INTEGER REFERENCES form_responses(id),
  user2_id INTEGER REFERENCES form_responses(id),
  similarity_score DECIMAL(5,4),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Insert initial session state
INSERT INTO settings (key, value) 
VALUES ('session_state', 'idle')
ON CONFLICT (key) DO UPDATE SET 
  value = EXCLUDED.value,
  updated_at = NOW();

-- 5. Disable Row Level Security (RLS) on settings table
-- This is needed for the admin API to work properly
ALTER TABLE settings DISABLE ROW LEVEL SECURITY;

-- 6. Enable RLS on other tables (optional, for security)
ALTER TABLE form_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

-- 7. Create basic RLS policies (optional)
-- Allow all operations on form_responses (you can restrict this later)
CREATE POLICY "Allow all operations on form_responses" ON form_responses
  FOR ALL USING (true);

-- Allow all operations on matches (you can restrict this later)
CREATE POLICY "Allow all operations on matches" ON matches
  FOR ALL USING (true);

-- 8. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_settings_key ON settings(key);
CREATE INDEX IF NOT EXISTS idx_form_responses_watiam ON form_responses(watiam_user_display);
CREATE INDEX IF NOT EXISTS idx_matches_users ON matches(user1_id, user2_id);

-- 9. Verify setup
SELECT 'Settings table' as table_name, COUNT(*) as record_count FROM settings
UNION ALL
SELECT 'Form responses table' as table_name, COUNT(*) as record_count FROM form_responses
UNION ALL
SELECT 'Matches table' as table_name, COUNT(*) as record_count FROM matches; 
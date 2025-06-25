-- Initialize Settings Table
-- Run this in your Supabase SQL editor

-- Create settings table if it doesn't exist
CREATE TABLE IF NOT EXISTS settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(255) UNIQUE NOT NULL,
  value TEXT NOT NULL
);

-- Insert initial session state
INSERT INTO settings (key, value) 
VALUES ('session_state', 'idle')
ON CONFLICT (key) DO UPDATE SET 
  value = EXCLUDED.value;

-- Verify the setup
SELECT 'Settings initialized successfully' as status;
SELECT * FROM settings; 
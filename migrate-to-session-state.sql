-- Migration Script: Convert from 3 boolean states to 1 session state
-- Run this in your Supabase SQL editor

-- 1. First, let's see what we currently have
SELECT 'Current settings:' as info;
SELECT * FROM settings WHERE key IN ('form_active', 'matching_active', 'release_active');

-- 2. Determine the current session state based on existing booleans
-- This will help us set the correct initial state
WITH current_state AS (
  SELECT 
    MAX(CASE WHEN key = 'form_active' THEN value::boolean ELSE false END) as form_active,
    MAX(CASE WHEN key = 'matching_active' THEN value::boolean ELSE false END) as matching_active,
    MAX(CASE WHEN key = 'release_active' THEN value::boolean ELSE false END) as release_active
  FROM settings 
  WHERE key IN ('form_active', 'matching_active', 'release_active')
)
SELECT 
  CASE 
    WHEN form_active = true AND matching_active = false AND release_active = false THEN 'form_active'
    WHEN matching_active = true THEN 'matching_in_progress'
    WHEN release_active = true THEN 'matches_released'
    ELSE 'idle'
  END as new_session_state
FROM current_state;

-- 3. Insert the new session_state (this will be the actual migration)
INSERT INTO settings (key, value) 
SELECT 
  'session_state',
  CASE 
    WHEN form_active = true AND matching_active = false AND release_active = false THEN 'form_active'
    WHEN matching_active = true THEN 'matching_in_progress'
    WHEN release_active = true THEN 'matches_released'
    ELSE 'idle'
  END
FROM (
  SELECT 
    MAX(CASE WHEN key = 'form_active' THEN value::boolean ELSE false END) as form_active,
    MAX(CASE WHEN key = 'matching_active' THEN value::boolean ELSE false END) as matching_active,
    MAX(CASE WHEN key = 'release_active' THEN value::boolean ELSE false END) as release_active
  FROM settings 
  WHERE key IN ('form_active', 'matching_active', 'release_active')
) current_state
ON CONFLICT (key) DO UPDATE SET 
  value = EXCLUDED.value,
  updated_at = NOW();

-- 4. Remove the old boolean settings (optional - you can keep them for backup)
-- DELETE FROM settings WHERE key IN ('form_active', 'matching_active', 'release_active');

-- 5. Verify the migration
SELECT 'Migration complete. New session state:' as info;
SELECT * FROM settings WHERE key = 'session_state';

-- 6. Show all current settings
SELECT 'All current settings:' as info;
SELECT * FROM settings ORDER BY key; 
-- Add color column to links table for custom button colors
ALTER TABLE links ADD COLUMN IF NOT EXISTS color TEXT;

-- Add background_color column to profiles for custom background
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS background_color TEXT;

-- Update existing links to have default colors
UPDATE links SET color = NULL WHERE color IS NULL;

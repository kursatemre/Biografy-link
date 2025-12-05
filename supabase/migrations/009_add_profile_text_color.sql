-- Add text_color column to profiles for custom text colors (bio, footer, etc.)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS text_color TEXT;

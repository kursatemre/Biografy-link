-- Add text_color column to links for custom button text colors
ALTER TABLE links ADD COLUMN IF NOT EXISTS text_color TEXT;

-- Add contact information columns to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS whatsapp TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email TEXT;

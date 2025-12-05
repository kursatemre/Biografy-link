-- Add image_url and description columns to links for Shop theme product cards
ALTER TABLE links ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE links ADD COLUMN IF NOT EXISTS description TEXT;

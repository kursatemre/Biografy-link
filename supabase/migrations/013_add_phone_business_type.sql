-- Add phone and business_type columns to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS business_type TEXT;

-- Create index for business_type for potential filtering/analytics
CREATE INDEX IF NOT EXISTS idx_profiles_business_type ON profiles(business_type);

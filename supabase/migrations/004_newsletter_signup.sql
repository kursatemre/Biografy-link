-- Newsletter/Waitlist table for collecting user information
CREATE TABLE IF NOT EXISTS newsletter_signups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    business_type TEXT, -- e-ticaret, influencer, kişisel, blog, vs.
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_signups(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_business_type ON newsletter_signups(business_type);
CREATE INDEX IF NOT EXISTS idx_newsletter_created_at ON newsletter_signups(created_at DESC);

-- RLS policies
ALTER TABLE newsletter_signups ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (sign up)
CREATE POLICY "Anyone can sign up"
    ON newsletter_signups
    FOR INSERT
    WITH CHECK (true);

-- Only authenticated users can view (for admin dashboard later)
CREATE POLICY "Authenticated users can view signups"
    ON newsletter_signups
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_newsletter_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER newsletter_updated_at
    BEFORE UPDATE ON newsletter_signups
    FOR EACH ROW
    EXECUTE FUNCTION update_newsletter_updated_at();

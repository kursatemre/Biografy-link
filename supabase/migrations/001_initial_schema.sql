-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    display_name TEXT,
    bio TEXT,
    avatar_url TEXT,
    theme_id UUID,
    custom_css TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT username_length CHECK (char_length(username) >= 3 AND char_length(username) <= 30),
    CONSTRAINT username_format CHECK (username ~ '^[a-zA-Z0-9_-]+$')
);

-- Create themes table
CREATE TABLE themes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    config JSONB NOT NULL,
    preview_url TEXT,
    is_premium BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create links table
CREATE TABLE links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    icon TEXT,
    position INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT url_format CHECK (url ~ '^https?://')
);

-- Create analytics table
CREATE TABLE analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    link_id UUID REFERENCES links(id) ON DELETE SET NULL,
    event_type TEXT NOT NULL CHECK (event_type IN ('click', 'view')),
    user_agent TEXT,
    ip_address INET,
    country TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_links_profile_id ON links(profile_id);
CREATE INDEX idx_links_position ON links(profile_id, position);
CREATE INDEX idx_analytics_profile_id ON analytics(profile_id);
CREATE INDEX idx_analytics_link_id ON analytics(link_id);
CREATE INDEX idx_analytics_created_at ON analytics(created_at);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_links_updated_at
    BEFORE UPDATE ON links
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE links ENABLE ROW LEVEL SECURITY;
ALTER TABLE themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone"
    ON profiles FOR SELECT
    USING (is_active = true);

CREATE POLICY "Users can insert their own profile"
    ON profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can delete their own profile"
    ON profiles FOR DELETE
    USING (auth.uid() = id);

-- RLS Policies for links
CREATE POLICY "Active links are viewable by everyone"
    ON links FOR SELECT
    USING (
        is_active = true AND
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = links.profile_id
            AND profiles.is_active = true
        )
    );

CREATE POLICY "Users can manage their own links"
    ON links FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = links.profile_id
            AND profiles.id = auth.uid()
        )
    );

-- RLS Policies for themes
CREATE POLICY "Themes are viewable by everyone"
    ON themes FOR SELECT
    USING (true);

-- RLS Policies for analytics
CREATE POLICY "Users can view their own analytics"
    ON analytics FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = analytics.profile_id
            AND profiles.id = auth.uid()
        )
    );

CREATE POLICY "Analytics can be inserted by anyone"
    ON analytics FOR INSERT
    WITH CHECK (true);

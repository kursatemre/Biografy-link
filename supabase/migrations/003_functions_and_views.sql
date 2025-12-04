-- Function to get analytics summary for a profile
CREATE OR REPLACE FUNCTION get_analytics_summary(profile_id_param UUID, days_param INTEGER DEFAULT 30)
RETURNS TABLE (
    total_views BIGINT,
    total_clicks BIGINT,
    views_today BIGINT,
    clicks_today BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        COUNT(*) FILTER (WHERE event_type = 'view') AS total_views,
        COUNT(*) FILTER (WHERE event_type = 'click') AS total_clicks,
        COUNT(*) FILTER (WHERE event_type = 'view' AND created_at >= CURRENT_DATE) AS views_today,
        COUNT(*) FILTER (WHERE event_type = 'click' AND created_at >= CURRENT_DATE) AS clicks_today
    FROM analytics
    WHERE profile_id = profile_id_param
        AND created_at >= NOW() - INTERVAL '1 day' * days_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get link click counts
CREATE OR REPLACE FUNCTION get_link_clicks(profile_id_param UUID, days_param INTEGER DEFAULT 30)
RETURNS TABLE (
    link_id UUID,
    link_title TEXT,
    link_url TEXT,
    clicks BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        l.id AS link_id,
        l.title AS link_title,
        l.url AS link_url,
        COUNT(a.id) AS clicks
    FROM links l
    LEFT JOIN analytics a ON a.link_id = l.id
        AND a.event_type = 'click'
        AND a.created_at >= NOW() - INTERVAL '1 day' * days_param
    WHERE l.profile_id = profile_id_param
    GROUP BY l.id, l.title, l.url
    ORDER BY clicks DESC, l.position;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if username is available
CREATE OR REPLACE FUNCTION is_username_available(username_param TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN NOT EXISTS (
        SELECT 1 FROM profiles WHERE username = username_param
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- You can auto-create a profile here if needed
    -- For now, we'll let users create their profile manually
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();

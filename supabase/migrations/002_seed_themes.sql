-- Insert default themes
INSERT INTO themes (name, description, config, is_premium) VALUES
(
    'Classic',
    'Clean and simple design',
    '{
        "backgroundColor": "#ffffff",
        "textColor": "#1f2937",
        "buttonColor": "#3b82f6",
        "buttonTextColor": "#ffffff",
        "buttonStyle": "rounded",
        "fontFamily": "Inter, sans-serif"
    }'::jsonb,
    false
),
(
    'Dark Mode',
    'Sleek dark theme',
    '{
        "backgroundColor": "#1f2937",
        "textColor": "#f9fafb",
        "buttonColor": "#6366f1",
        "buttonTextColor": "#ffffff",
        "buttonStyle": "rounded",
        "fontFamily": "Inter, sans-serif"
    }'::jsonb,
    false
),
(
    'Gradient',
    'Eye-catching gradient background',
    '{
        "backgroundColor": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "textColor": "#ffffff",
        "buttonColor": "#ffffff",
        "buttonTextColor": "#667eea",
        "buttonStyle": "pill",
        "fontFamily": "Inter, sans-serif"
    }'::jsonb,
    false
),
(
    'Minimalist',
    'Less is more',
    '{
        "backgroundColor": "#fafafa",
        "textColor": "#171717",
        "buttonColor": "#171717",
        "buttonTextColor": "#ffffff",
        "buttonStyle": "square",
        "fontFamily": "Inter, sans-serif"
    }'::jsonb,
    false
),
(
    'Pastel Dream',
    'Soft and colorful',
    '{
        "backgroundColor": "#fef3c7",
        "textColor": "#92400e",
        "buttonColor": "#f59e0b",
        "buttonTextColor": "#ffffff",
        "buttonStyle": "pill",
        "fontFamily": "Inter, sans-serif"
    }'::jsonb,
    true
),
(
    'Ocean',
    'Cool ocean vibes',
    '{
        "backgroundColor": "linear-gradient(135deg, #667eea 0%, #0ea5e9 100%)",
        "textColor": "#ffffff",
        "buttonColor": "#ffffff",
        "buttonTextColor": "#0ea5e9",
        "buttonStyle": "rounded",
        "fontFamily": "Inter, sans-serif"
    }'::jsonb,
    true
);

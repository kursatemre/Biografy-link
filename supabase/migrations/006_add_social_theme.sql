-- Add new Social Media theme
INSERT INTO themes (id, name, description, config, is_premium)
VALUES (
  'social-media',
  'Social Media',
  'Perfect for social media influencers',
  '{
    "backgroundColor": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "textColor": "#ffffff",
    "buttonColor": "#ffffff",
    "buttonTextColor": "#667eea",
    "buttonStyle": "pill",
    "fontFamily": "Inter, sans-serif"
  }'::jsonb,
  false
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  config = EXCLUDED.config,
  is_premium = EXCLUDED.is_premium;

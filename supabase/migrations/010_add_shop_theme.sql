-- Add new Shop theme for e-commerce and product showcases
INSERT INTO themes (name, description, config, is_premium)
VALUES (
  'Shop',
  'Perfect for e-commerce and product showcases',
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
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  config = EXCLUDED.config,
  is_premium = EXCLUDED.is_premium;

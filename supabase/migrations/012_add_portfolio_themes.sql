-- Add 4 new Portfolio themes

-- 1. Creative Portfolio (for designers, content creators)
INSERT INTO themes (name, description, config, is_premium)
VALUES (
  'Creative Portfolio',
  'Perfect for designers and content creators',
  '{
    "backgroundColor": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "textColor": "#ffffff",
    "buttonColor": "#ffffff",
    "buttonTextColor": "#f5576c",
    "buttonStyle": "rounded",
    "fontFamily": "Inter, sans-serif"
  }'::jsonb,
  false
);

-- 2. Minimal Portfolio (for professionals, freelancers)
INSERT INTO themes (name, description, config, is_premium)
VALUES (
  'Minimal Portfolio',
  'Ultra minimal design for professionals',
  '{
    "backgroundColor": "#ffffff",
    "textColor": "#1f2937",
    "buttonColor": "#ffffff",
    "buttonTextColor": "#1f2937",
    "buttonStyle": "square",
    "fontFamily": "Inter, sans-serif"
  }'::jsonb,
  false
);

-- 3. Gallery Portfolio (for photographers, artists)
INSERT INTO themes (name, description, config, is_premium)
VALUES (
  'Gallery Portfolio',
  'Image-focused design for visual artists',
  '{
    "backgroundColor": "#0f172a",
    "textColor": "#f1f5f9",
    "buttonColor": "#1e293b",
    "buttonTextColor": "#f1f5f9",
    "buttonStyle": "square",
    "fontFamily": "Inter, sans-serif"
  }'::jsonb,
  false
);

-- 4. Business Portfolio (for agencies, consultants)
INSERT INTO themes (name, description, config, is_premium)
VALUES (
  'Business Portfolio',
  'Professional design for agencies and consultants',
  '{
    "backgroundColor": "linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)",
    "textColor": "#ffffff",
    "buttonColor": "#ffffff",
    "buttonTextColor": "#1e3a8a",
    "buttonStyle": "square",
    "fontFamily": "Inter, sans-serif"
  }'::jsonb,
  false
);

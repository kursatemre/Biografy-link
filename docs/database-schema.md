# Database Schema Documentation

## Overview

Biografy Link uses Supabase (PostgreSQL) with Row Level Security (RLS) enabled for all tables.

## Tables

### profiles

Stores user profile information and settings.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, references auth.users(id) |
| username | TEXT | Unique username (3-30 chars, alphanumeric + _ -) |
| display_name | TEXT | Display name shown on profile |
| bio | TEXT | User bio/description |
| avatar_url | TEXT | URL to avatar image (Supabase Storage) |
| theme_id | UUID | Selected theme |
| custom_css | TEXT | Custom CSS (premium feature) |
| is_active | BOOLEAN | Profile active status |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

**Indexes:**
- `idx_profiles_username` on username

**RLS Policies:**
- Public profiles (is_active=true) are viewable by everyone
- Users can manage only their own profile

### links

Stores user's links.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| profile_id | UUID | References profiles(id) |
| title | TEXT | Link title/label |
| url | TEXT | Link URL (must start with http:// or https://) |
| icon | TEXT | Optional icon/emoji |
| position | INTEGER | Display order (0-indexed) |
| is_active | BOOLEAN | Link visibility |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

**Indexes:**
- `idx_links_profile_id` on profile_id
- `idx_links_position` on (profile_id, position)

**RLS Policies:**
- Active links from active profiles are viewable by everyone
- Users can manage only their own links

### themes

Pre-defined and custom themes.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | TEXT | Theme name |
| description | TEXT | Theme description |
| config | JSONB | Theme configuration (colors, fonts, etc.) |
| preview_url | TEXT | Preview image URL |
| is_premium | BOOLEAN | Premium theme flag |
| created_at | TIMESTAMPTZ | Creation timestamp |

**Theme Config Structure:**
```json
{
  "backgroundColor": "#ffffff",
  "textColor": "#1f2937",
  "buttonColor": "#3b82f6",
  "buttonTextColor": "#ffffff",
  "buttonStyle": "rounded | square | pill",
  "fontFamily": "Inter, sans-serif",
  "backgroundImage": "optional-gradient-or-url"
}
```

**RLS Policies:**
- All themes are viewable by everyone

### analytics

Tracks page views and link clicks.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| profile_id | UUID | References profiles(id) |
| link_id | UUID | References links(id), nullable |
| event_type | TEXT | 'click' or 'view' |
| user_agent | TEXT | Browser user agent |
| ip_address | INET | Visitor IP address |
| country | TEXT | Visitor country (optional) |
| created_at | TIMESTAMPTZ | Event timestamp |

**Indexes:**
- `idx_analytics_profile_id` on profile_id
- `idx_analytics_link_id` on link_id
- `idx_analytics_created_at` on created_at

**RLS Policies:**
- Users can view only their own analytics
- Anyone can insert analytics (for tracking)

## Functions

### get_analytics_summary(profile_id, days)

Returns analytics summary for a profile.

**Parameters:**
- `profile_id` (UUID): The profile ID
- `days` (INTEGER): Number of days to analyze (default: 30)

**Returns:**
```sql
{
  total_views: BIGINT,
  total_clicks: BIGINT,
  views_today: BIGINT,
  clicks_today: BIGINT
}
```

### get_link_clicks(profile_id, days)

Returns click counts for each link.

**Parameters:**
- `profile_id` (UUID): The profile ID
- `days` (INTEGER): Number of days to analyze (default: 30)

**Returns:**
```sql
[
  {
    link_id: UUID,
    link_title: TEXT,
    link_url: TEXT,
    clicks: BIGINT
  }
]
```

### is_username_available(username)

Checks if a username is available.

**Parameters:**
- `username` (TEXT): Username to check

**Returns:** BOOLEAN

## Security

### Row Level Security (RLS)

All tables have RLS enabled with the following principles:

1. **Public Data**: Active profiles and their active links are publicly viewable
2. **Private Data**: Users can only view/edit their own data
3. **Analytics**: Only profile owners can view their analytics
4. **Themes**: All themes are publicly viewable

### Authentication

- Authentication is handled by Supabase Auth
- User IDs from auth.users are used as profile IDs
- When a user signs up, they must create a profile

## Usage Examples

### Create a Profile

```sql
INSERT INTO profiles (id, username, display_name, bio)
VALUES (auth.uid(), 'johndoe', 'John Doe', 'Welcome to my page!');
```

### Add a Link

```sql
INSERT INTO links (profile_id, title, url, position)
VALUES (auth.uid(), 'My Website', 'https://example.com', 0);
```

### Track a Page View

```sql
INSERT INTO analytics (profile_id, event_type)
VALUES ('profile-uuid', 'view');
```

### Track a Link Click

```sql
INSERT INTO analytics (profile_id, link_id, event_type)
VALUES ('profile-uuid', 'link-uuid', 'click');
```

### Get Analytics

```sql
SELECT * FROM get_analytics_summary('profile-uuid', 7);
SELECT * FROM get_link_clicks('profile-uuid', 30);
```

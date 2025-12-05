export interface Profile {
  id: string
  username: string
  display_name: string | null
  bio: string | null
  avatar_url: string | null
  theme_id: string | null
  custom_css: string | null
  background_color: string | null
  whatsapp: string | null
  phone: string | null
  email: string | null
  text_color: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Link {
  id: string
  profile_id: string
  title: string
  url: string
  icon: string | null
  color: string | null
  text_color: string | null
  position: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Theme {
  id: string
  name: string
  description: string | null
  config: ThemeConfig
  preview_url: string | null
  is_premium: boolean
  created_at: string
}

export interface ThemeConfig {
  backgroundColor: string
  textColor: string
  buttonColor: string
  buttonTextColor: string
  buttonStyle: 'rounded' | 'square' | 'pill'
  fontFamily: string
  backgroundImage?: string
}

export interface Analytics {
  id: string
  link_id?: string
  profile_id: string
  event_type: 'click' | 'view'
  user_agent: string | null
  ip_address: string | null
  country: string | null
  created_at: string
}

export interface AnalyticsSummary {
  total_views: number
  total_clicks: number
  link_clicks: Array<{
    link_id: string
    link_title: string
    clicks: number
  }>
}

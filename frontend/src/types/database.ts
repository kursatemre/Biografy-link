export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          display_name: string | null
          bio: string | null
          avatar_url: string | null
          theme_id: string | null
          custom_css: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          display_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          theme_id?: string | null
          custom_css?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          display_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          theme_id?: string | null
          custom_css?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      links: {
        Row: {
          id: string
          profile_id: string
          title: string
          url: string
          icon: string | null
          position: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          title: string
          url: string
          icon?: string | null
          position?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          title?: string
          url?: string
          icon?: string | null
          position?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      themes: {
        Row: {
          id: string
          name: string
          description: string | null
          config: Json
          preview_url: string | null
          is_premium: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          config: Json
          preview_url?: string | null
          is_premium?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          config?: Json
          preview_url?: string | null
          is_premium?: boolean
          created_at?: string
        }
      }
      analytics: {
        Row: {
          id: string
          link_id: string
          profile_id: string
          event_type: 'click' | 'view'
          user_agent: string | null
          ip_address: string | null
          country: string | null
          created_at: string
        }
        Insert: {
          id?: string
          link_id?: string
          profile_id: string
          event_type: 'click' | 'view'
          user_agent?: string | null
          ip_address?: string | null
          country?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          link_id?: string
          profile_id?: string
          event_type?: 'click' | 'view'
          user_agent?: string | null
          ip_address?: string | null
          country?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

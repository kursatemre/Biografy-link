import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export interface Theme {
  id: string
  name: string
  description: string
  config: {
    backgroundColor: string
    textColor: string
    buttonColor: string
    buttonTextColor: string
    buttonStyle: 'rounded' | 'pill' | 'square'
    fontFamily: string
  }
  is_premium: boolean
  preview_url?: string
}

export function useThemes() {
  const [themes, setThemes] = useState<Theme[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('themes')
          .select('*')
          .order('created_at', { ascending: true })

        if (error) throw error
        setThemes(data || [])
      } catch (error) {
        console.error('Failed to fetch themes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchThemes()
  }, [])

  return { themes, loading }
}

export function useTheme(themeId?: string) {
  const [theme, setTheme] = useState<Theme | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!themeId) {
      // Return default theme
      setTheme({
        id: 'default',
        name: 'Classic',
        description: 'Default theme',
        config: {
          backgroundColor: '#ffffff',
          textColor: '#1f2937',
          buttonColor: '#3b82f6',
          buttonTextColor: '#ffffff',
          buttonStyle: 'rounded',
          fontFamily: 'Inter, sans-serif',
        },
        is_premium: false,
      })
      setLoading(false)
      return
    }

    const fetchTheme = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('themes')
          .select('*')
          .eq('id', themeId)
          .single()

        if (error) throw error
        setTheme(data)
      } catch (error) {
        console.error('Failed to fetch theme:', error)
        // Return default theme on error
        setTheme({
          id: 'default',
          name: 'Classic',
          description: 'Default theme',
          config: {
            backgroundColor: '#ffffff',
            textColor: '#1f2937',
            buttonColor: '#3b82f6',
            buttonTextColor: '#ffffff',
            buttonStyle: 'rounded',
            fontFamily: 'Inter, sans-serif',
          },
          is_premium: false,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchTheme()
  }, [themeId])

  return { theme, loading }
}

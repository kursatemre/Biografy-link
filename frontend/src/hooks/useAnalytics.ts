import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function useAnalytics() {
  const trackProfileView = async (profileId: string) => {
    try {
      await supabase.from('analytics').insert({
        profile_id: profileId,
        event_type: 'view',
        user_agent: navigator.userAgent,
      } as any)
    } catch (error) {
      console.error('Failed to track profile view:', error)
    }
  }

  const trackLinkClick = async (profileId: string, linkId: string) => {
    try {
      await supabase.from('analytics').insert({
        profile_id: profileId,
        link_id: linkId,
        event_type: 'click',
        user_agent: navigator.userAgent,
      } as any)
    } catch (error) {
      console.error('Failed to track link click:', error)
    }
  }

  return {
    trackProfileView,
    trackLinkClick,
  }
}

export function useProfileAnalytics(profileId?: string) {
  const [stats, setStats] = useState({
    totalViews: 0,
    totalClicks: 0,
    linkClicks: [] as { link_id: string; count: number }[],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!profileId) {
      setLoading(false)
      return
    }

    const fetchAnalytics = async () => {
      try {
        setLoading(true)

        // Get total views
        const { count: viewCount } = await supabase
          .from('analytics')
          .select('*', { count: 'exact', head: true })
          .eq('profile_id', profileId)
          .eq('event_type', 'view')

        // Get total clicks
        const { count: clickCount } = await supabase
          .from('analytics')
          .select('*', { count: 'exact', head: true })
          .eq('profile_id', profileId)
          .eq('event_type', 'click')

        // Get clicks per link
        const { data: clickData } = await supabase
          .from('analytics')
          .select('link_id')
          .eq('profile_id', profileId)
          .eq('event_type', 'click')
          .not('link_id', 'is', null)

        // Count clicks per link
        const linkClicksMap = new Map<string, number>()
        clickData?.forEach((item) => {
          if (item.link_id) {
            linkClicksMap.set(item.link_id, (linkClicksMap.get(item.link_id) || 0) + 1)
          }
        })

        const linkClicks = Array.from(linkClicksMap.entries()).map(([link_id, count]) => ({
          link_id,
          count,
        }))

        setStats({
          totalViews: viewCount || 0,
          totalClicks: clickCount || 0,
          linkClicks,
        })
      } catch (error) {
        console.error('Failed to fetch analytics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [profileId])

  return {
    stats,
    loading,
  }
}

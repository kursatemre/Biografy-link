import { supabase } from './supabase'

export async function trackPageView(profileId: string) {
  try {
    await supabase.from('analytics').insert({
      profile_id: profileId,
      event_type: 'view',
      user_agent: navigator.userAgent,
    } as any)
  } catch (error) {
    console.error('Error tracking page view:', error)
  }
}

export async function trackLinkClick(profileId: string, linkId: string, url: string) {
  try {
    // Track in analytics
    await supabase.from('analytics').insert({
      profile_id: profileId,
      link_id: linkId,
      event_type: 'click',
      user_agent: navigator.userAgent,
    } as any)

    // Open link
    window.open(url, '_blank', 'noopener,noreferrer')
  } catch (error) {
    console.error('Error tracking link click:', error)
    // Still open the link even if tracking fails
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}

export async function getAnalyticsSummary(profileId: string, days: number = 30) {
  try {
    const { data, error } = await supabase.rpc('get_analytics_summary', {
      profile_id_param: profileId,
      days_param: days,
    } as any)

    if (error) throw error
    return data?.[0] || null
  } catch (error) {
    console.error('Error fetching analytics summary:', error)
    return null
  }
}

export async function getLinkClicks(profileId: string, days: number = 30) {
  try {
    const { data, error } = await supabase.rpc('get_link_clicks', {
      profile_id_param: profileId,
      days_param: days,
    } as any)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching link clicks:', error)
    return []
  }
}

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Link } from '@/types'

export function useLinks(profileId?: string, includeInactive = false) {
  const [links, setLinks] = useState<Link[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!profileId) {
      setLoading(false)
      return
    }

    const fetchLinks = async () => {
      try {
        setLoading(true)
        let query = supabase
          .from('links')
          .select('*')
          .eq('profile_id', profileId)

        // Only filter by is_active if includeInactive is false
        if (!includeInactive) {
          query = query.eq('is_active', true)
        }

        const { data, error } = await query.order('position', { ascending: true })

        if (error) throw error
        setLinks(data || [])
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchLinks()

    // Subscribe to real-time changes
    const channel = supabase
      .channel('links-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'links',
          filter: `profile_id=eq.${profileId}`,
        },
        () => {
          fetchLinks()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [profileId, includeInactive])

  const addLink = async (link: Omit<Link, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('links')
        .insert(link as any)
        .select()
        .single()

      if (error) throw error
      setLinks((prev) => [...prev, data as Link].sort((a, b) => a.position - b.position))
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err as Error }
    }
  }

  const updateLink = async (id: string, updates: Partial<Link>) => {
    try {
      const { data, error } = await supabase
        .from('links')
        .update(updates as any)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setLinks((prev) =>
        prev.map((link) => (link.id === id ? (data as Link) : link))
      )
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err as Error }
    }
  }

  const deleteLink = async (id: string) => {
    try {
      const { error } = await supabase.from('links').delete().eq('id', id)

      if (error) throw error
      setLinks((prev) => prev.filter((link) => link.id !== id))
      return { error: null }
    } catch (err) {
      return { error: err as Error }
    }
  }

  const reorderLinks = async (newLinks: Link[]) => {
    try {
      // Update positions
      const updates = newLinks.map((link, index) => ({
        id: link.id,
        position: index,
      }))

      for (const update of updates) {
        await supabase
          .from('links')
          .update({ position: update.position } as any)
          .eq('id', update.id)
      }

      setLinks(newLinks)
      return { error: null }
    } catch (err) {
      return { error: err as Error }
    }
  }

  return {
    links,
    loading,
    error,
    addLink,
    updateLink,
    deleteLink,
    reorderLinks,
  }
}

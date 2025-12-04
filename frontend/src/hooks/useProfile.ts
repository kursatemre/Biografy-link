import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Profile } from '@/types'

export function useProfile(userId?: string) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    const fetchProfile = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single()

        if (error) throw error
        setProfile(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [userId])

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!userId) return { error: new Error('No user ID') }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates as any)
        .eq('id', userId)
        .select()
        .single()

      if (error) throw error
      setProfile(data as Profile)
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err as Error }
    }
  }

  const uploadAvatar = async (file: File) => {
    if (!userId) return { error: new Error('No user ID'), url: null }

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${userId}/${Date.now()}.${fileExt}`

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true,
        })

      if (uploadError) throw uploadError

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName)

      const avatarUrl = urlData.publicUrl

      // Update profile with new avatar URL
      await updateProfile({ avatar_url: avatarUrl })

      return { url: avatarUrl, error: null }
    } catch (err) {
      return { url: null, error: err as Error }
    }
  }

  const updateUsername = async (newUsername: string) => {
    if (!userId) return { error: new Error('No user ID'), success: false }

    try {
      // Check if username is already taken
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', newUsername)
        .neq('id', userId)
        .single()

      if (existingProfile) {
        return { error: new Error('Username already taken'), success: false }
      }

      // Update username
      const result = await updateProfile({ username: newUsername })

      if (result.error) {
        return { error: result.error, success: false }
      }

      return { error: null, success: true }
    } catch (err: any) {
      // PGRST116 means no rows found, which is good (username is available)
      if (err.code === 'PGRST116') {
        const result = await updateProfile({ username: newUsername })
        if (result.error) {
          return { error: result.error, success: false }
        }
        return { error: null, success: true }
      }
      return { error: err as Error, success: false }
    }
  }

  return {
    profile,
    loading,
    error,
    updateProfile,
    uploadAvatar,
    updateUsername,
  }
}

export function useProfileByUsername(username?: string) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!username) {
      setLoading(false)
      return
    }

    const fetchProfile = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('username', username)
          .eq('is_active', true)
          .single()

        if (error) throw error
        setProfile(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [username])

  return {
    profile,
    loading,
    error,
  }
}

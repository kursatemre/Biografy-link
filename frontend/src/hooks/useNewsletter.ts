import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface NewsletterSignup {
  full_name: string
  email: string
  phone?: string
  business_type: string
  notes?: string
}

export function useNewsletter() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const signup = async (data: NewsletterSignup) => {
    try {
      setLoading(true)
      setError(null)

      const { error: insertError } = await supabase
        .from('newsletter_signups')
        .insert({
          full_name: data.full_name,
          email: data.email,
          phone: data.phone || null,
          business_type: data.business_type,
          notes: data.notes || null,
        })

      if (insertError) {
        if (insertError.code === '23505') {
          // Unique constraint violation
          throw new Error('Bu email adresi zaten kayıtlı!')
        }
        throw insertError
      }

      return { success: true, error: null }
    } catch (err: any) {
      const errorMessage = err.message || 'Kayıt sırasında bir hata oluştu'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  return {
    signup,
    loading,
    error,
  }
}

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Link2 } from 'lucide-react'

export default function AuthCallbackPage() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the hash fragment from URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1))
        const accessToken = hashParams.get('access_token')
        const refreshToken = hashParams.get('refresh_token')
        const type = hashParams.get('type')

        if (type === 'signup' && accessToken && refreshToken) {
          // Set the session
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          })

          if (error) {
            setError(error.message)
          } else {
            // Redirect to dashboard
            navigate('/dashboard')
          }
        } else if (type === 'recovery') {
          // Password recovery
          navigate('/reset-password')
        } else {
          // Unknown type or missing tokens
          navigate('/auth')
        }
      } catch (err) {
        setError('An error occurred during authentication')
        setTimeout(() => navigate('/auth'), 3000)
      }
    }

    handleCallback()
  }, [navigate])

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="card max-w-md w-full text-center">
          <Link2 className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Authentication Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="card max-w-md w-full text-center">
        <Link2 className="w-12 h-12 text-primary-600 mx-auto mb-4 animate-spin" />
        <h1 className="text-2xl font-bold mb-2">Verifying...</h1>
        <p className="text-gray-600">Please wait while we confirm your email</p>
      </div>
    </div>
  )
}

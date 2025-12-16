import { useState, FormEvent } from 'react'
import { Link2, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { signUp, signIn } = useAuth()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isLogin) {
        // Sign in existing user
        const { error } = await signIn(email, password)
        if (error) {
          setError(error.message)
        } else {
          navigate('/dashboard')
        }
      } else {
        // Sign up new user
        if (!username.trim()) {
          setError('Username is required')
          setLoading(false)
          return
        }

        const { error } = await signUp(email, password, username, phone, businessType)
        if (error) {
          setError(error.message)
        } else {
          // Profile will be created automatically by database trigger
          navigate('/dashboard')
        }
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-purple-50 flex items-center justify-center p-4">
      <div className="card max-w-md w-full">
        <div className="text-center mb-6 sm:mb-8">
          <Link2 className="w-10 h-10 sm:w-12 sm:h-12 text-primary-600 mx-auto mb-3 sm:mb-4" />
          <h1 className="text-xl sm:text-2xl font-bold mb-2">
            {isLogin ? 'Tekrar Hoş Geldin' : 'Hemen Başla'}
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            {isLogin ? 'Hesabına giriş yap' : 'Ücretsiz hesabını oluştur'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kullanıcı Adı *
              </label>
              <input
                type="text"
                className="input"
                placeholder="kullaniciadi"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              className="input"
              placeholder="ornek@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Şifre *
            </label>
            <input
              type="password"
              className="input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              disabled={loading}
            />
          </div>

          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  className="input"
                  placeholder="+90 5XX XXX XX XX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  İş Alanınız
                </label>
                <select
                  className="input"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  disabled={loading}
                >
                  <option value="">Seçiniz</option>
                  <option value="influencer">Influencer / İçerik Üretici</option>
                  <option value="e-commerce">E-Ticaret</option>
                  <option value="freelancer">Freelancer</option>
                  <option value="musician">Müzisyen / Sanatçı</option>
                  <option value="blogger">Blogger / Yazar</option>
                  <option value="business">İşletme Sahibi</option>
                  <option value="personal">Kişisel Kullanım</option>
                  <option value="other">Diğer</option>
                </select>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Yükleniyor...' : (isLogin ? 'Giriş Yap' : 'Hesap Oluştur')}
          </button>
        </form>

        <div className="mt-4 sm:mt-6 text-center">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin)
              setError('')
            }}
            className="text-primary-600 hover:underline text-sm"
            disabled={loading}
          >
            {isLogin
              ? "Hesabın yok mu? Kayıt ol"
              : 'Zaten hesabın var mı? Giriş yap'}
          </button>
        </div>

        <div className="mt-4 sm:mt-6 text-center">
          <a href="/" className="text-gray-600 hover:text-gray-900 text-sm">
            ← Ana sayfaya dön
          </a>
        </div>
      </div>
    </div>
  )
}

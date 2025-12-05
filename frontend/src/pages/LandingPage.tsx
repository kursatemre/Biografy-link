import { Link } from 'react-router-dom'
import { useState, FormEvent } from 'react'
import { Link2, Palette, BarChart3, Eye, MousePointerClick, Zap, CheckCircle2, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useNewsletter } from '@/hooks/useNewsletter'

const themes = [
  {
    name: 'Shop',
    emoji: '🛍️',
    description: 'E-ticaret ve ürün vitrinleri için mükemmel',
    gradient: 'from-purple-400 to-indigo-600',
    features: ['Ürün görselleri', 'Açıklama metni', 'CTA butonları']
  },
  {
    name: 'Social Media',
    emoji: '💜',
    description: 'İnfluencer ve içerik üreticileri için',
    gradient: 'from-pink-400 to-purple-600',
    features: ['Otomatik sosyal medya ikonları', 'Gradient arka plan', 'Pill butonlar']
  },
  {
    name: 'Creative Portfolio',
    emoji: '🎨',
    description: 'Tasarımcılar ve yaratıcılar için',
    gradient: 'from-rose-400 to-pink-600',
    features: ['2 kolonlu grid', 'Hover efektleri', 'Görsel odaklı']
  },
  {
    name: 'Minimal Portfolio',
    emoji: '✨',
    description: 'Profesyoneller ve freelancerlar için',
    gradient: 'from-gray-400 to-gray-600',
    features: ['Ultra minimal', 'Liste düzeni', 'Elegant tipografi']
  },
  {
    name: 'Gallery Portfolio',
    emoji: '📸',
    description: 'Fotoğrafçılar ve görsel sanatçılar için',
    gradient: 'from-slate-700 to-slate-900',
    features: ['Tam genişlik görseller', 'Zoom efekti', 'Dark tema']
  },
  {
    name: 'Business Portfolio',
    emoji: '💼',
    description: 'Ajanslar ve danışmanlar için',
    gradient: 'from-blue-600 to-indigo-700',
    features: ['Case study kartları', 'Profesyonel düzen', 'Border vurgusu']
  }
]

export default function LandingPage() {
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [currentTheme, setCurrentTheme] = useState(0)
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    business_type: '',
  })
  const [success, setSuccess] = useState(false)
  const { signup, loading, error } = useNewsletter()

  const nextTheme = () => {
    setCurrentTheme((prev) => (prev + 1) % themes.length)
  }

  const prevTheme = () => {
    setCurrentTheme((prev) => (prev - 1 + themes.length) % themes.length)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const result = await signup(formData)

    if (result.success) {
      setSuccess(true)
      setFormData({ full_name: '', email: '', phone: '', business_type: '' })
      setTimeout(() => {
        setShowSignupModal(false)
        setSuccess(false)
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-4 sm:py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link2 className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />
            <span className="text-xl sm:text-2xl font-bold text-gray-900">Biografy Link</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/auth" className="text-sm sm:text-base text-gray-600 hover:text-gray-900">
              Giriş Yap
            </Link>
            <button
              onClick={() => setShowSignupModal(true)}
              className="btn btn-primary text-sm sm:text-base px-3 sm:px-4 py-2"
            >
              Ücretsiz Başla
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-10 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Text Content */}
            <div className="text-center lg:text-left">
              <div className="inline-block mb-4 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                🎉 Tamamen Ücretsiz
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Tüm Linkleriniz
                <span className="text-primary-600 block">Tek Bir Yerde</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
                Sosyal medya biyografin için güzel bir landing page oluştur.
                Tüm içeriklerini, ürünlerini ve hizmetlerini tek bir linkte paylaş.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => setShowSignupModal(true)}
                  className="btn btn-primary text-lg px-8 py-3"
                >
                  Hemen Başla
                </button>
                <Link
                  to="/orionsoft5"
                  target="_blank"
                  className="btn btn-secondary text-lg px-8 py-3"
                >
                  Demo'yu Gör
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t">
                <div>
                  <div className="text-3xl font-bold text-primary-600">100%</div>
                  <div className="text-sm text-gray-600">Ücretsiz</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-600">∞</div>
                  <div className="text-sm text-gray-600">Link Limiti</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-600">6+</div>
                  <div className="text-sm text-gray-600">Tema</div>
                </div>
              </div>
            </div>

            {/* Right: Demo Profile */}
            <div className="max-w-md mx-auto w-full">
              <div className="relative">
                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg z-10 animate-bounce">
                  Canlı Demo ✨
                </div>

                {/* Demo Card */}
                <div className="card bg-white p-8 shadow-2xl transform hover:scale-105 transition-transform">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary-400 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                      O
                    </div>
                    <h3 className="text-2xl font-bold mb-2">@orionsoft5</h3>
                    <p className="text-gray-600 mb-6">Software Developer & Content Creator 🚀</p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { icon: '🌐', title: 'My Website', color: 'from-blue-400 to-blue-600' },
                      { icon: '📸', title: 'Instagram', color: 'from-pink-400 to-purple-600' },
                      { icon: '🎥', title: 'YouTube', color: 'from-red-400 to-red-600' },
                      { icon: '🛍️', title: 'Shop', color: 'from-green-400 to-green-600' },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className={`w-full py-4 px-6 bg-gradient-to-r ${item.color} text-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:scale-105`}
                      >
                        <div className="flex items-center justify-center gap-3 font-medium">
                          <span className="text-2xl">{item.icon}</span>
                          <span>{item.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 sm:mt-24 md:mt-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Neden Biografy Link?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              İster influencer, ister e-ticaret sahibi, ister içerik üretici olun,
              tüm ihtiyaçlarınız için güçlü özellikler.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard
              icon={<Link2 className="w-10 h-10" />}
              title="Sınırsız Link"
              description="İstediğiniz kadar link ekleyin. Dilediğiniz gibi düzenleyin, sıralayın."
              color="bg-blue-100 text-blue-600"
            />
            <FeatureCard
              icon={<Palette className="w-10 h-10" />}
              title="6+ Özel Tema"
              description="Classic, Dark Mode, Gradient ve daha fazlası. Her zevke uygun temalar."
              color="bg-purple-100 text-purple-600"
            />
            <FeatureCard
              icon={<BarChart3 className="w-10 h-10" />}
              title="Detaylı Analitik"
              description="Profil görüntüleme ve link tıklama istatistiklerini gerçek zamanlı takip edin."
              color="bg-green-100 text-green-600"
            />
            <FeatureCard
              icon={<Eye className="w-10 h-10" />}
              title="Link Kontrolü"
              description="Linkleri aktif/pasif yapın. Sadece istediğiniz linkler görünsün."
              color="bg-orange-100 text-orange-600"
            />
            <FeatureCard
              icon={<MousePointerClick className="w-10 h-10" />}
              title="Tıklama Takibi"
              description="Her linkin kaç kez tıklandığını görün. Hangi içerik daha popüler anlayın."
              color="bg-pink-100 text-pink-600"
            />
            <FeatureCard
              icon={<Zap className="w-10 h-10" />}
              title="Hızlı & Kolay"
              description="Dakikalar içinde kurun. Kod bilgisi gerektirmez. Hemen kullanmaya başlayın."
              color="bg-yellow-100 text-yellow-600"
            />
          </div>
        </div>

        {/* Theme Carousel */}
        <div className="mt-20 sm:mt-24 md:mt-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              6 Benzersiz Tema
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Her kullanıcı türü için özel tasarlanmış temalar. İşletmenize en uygun olanı seçin.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Carousel */}
            <div className="relative overflow-hidden rounded-2xl">
              {/* Theme Card */}
              <div className={`bg-gradient-to-br ${themes[currentTheme].gradient} p-8 sm:p-12 text-white min-h-[400px] flex flex-col justify-between`}>
                <div>
                  <div className="text-6xl mb-4">{themes[currentTheme].emoji}</div>
                  <h3 className="text-3xl sm:text-4xl font-bold mb-3">{themes[currentTheme].name}</h3>
                  <p className="text-lg sm:text-xl opacity-90 mb-6">{themes[currentTheme].description}</p>

                  <div className="space-y-2">
                    {themes[currentTheme].features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="text-base">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex gap-2 justify-center">
                    {themes.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTheme(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === currentTheme ? 'w-8 bg-white' : 'w-2 bg-white/50'
                        }`}
                        aria-label={`Go to theme ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevTheme}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
                aria-label="Previous theme"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextTheme}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
                aria-label="Next theme"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-20 sm:mt-24 md:mt-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Nasıl Çalışır?
            </h2>
            <p className="text-lg text-gray-600">
              3 basit adımda link sayfanızı oluşturun
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <StepCard
              number="1"
              title="Kayıt Ol"
              description="Formu doldurun, email adresinizi onaylayın. Hepsi bu kadar!"
            />
            <StepCard
              number="2"
              title="Özelleştir"
              description="Linklerinizi ekleyin, tema seçin, profilinizi düzenleyin."
            />
            <StepCard
              number="3"
              title="Paylaş"
              description="Linkini sosyal medya biyografine kopyala, paylaş!"
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 sm:mt-24 md:mt-32">
          <div className="card bg-gradient-to-r from-primary-500 to-purple-600 text-white p-8 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Hemen Başlamaya Hazır Mısın?
            </h2>
            <p className="text-lg sm:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Tamamen ücretsiz. Kredi kartı gerekmez. 2 dakikada kurulum.
            </p>
            <button
              onClick={() => setShowSignupModal(true)}
              className="btn bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-4 font-semibold"
            >
              Şimdi Ücretsiz Başla 🚀
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-20 border-t">
        <div className="text-center text-gray-600">
          <p className="mb-2">&copy; 2024 Biografy Link. Tüm hakları saklıdır.</p>
          <p className="text-sm">
            <Link to="/auth" className="hover:text-primary-600">Giriş Yap</Link>
            {' • '}
            <button onClick={() => setShowSignupModal(true)} className="hover:text-primary-600">
              Kayıt Ol
            </button>
          </p>
        </div>
      </footer>

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowSignupModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {success ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Başarılı! 🎉</h3>
                <p className="text-gray-600">
                  Kaydınız alındı. Yakında sizinle iletişime geçeceğiz.
                </p>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Ücretsiz Başla</h3>
                  <p className="text-gray-600">
                    Bilgilerinizi doldurun, hemen kullanmaya başlayın
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Adınız Soyadınız"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      className="input"
                      placeholder="ornek@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      className="input"
                      placeholder="+90 5XX XXX XX XX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      İş Alanınız *
                    </label>
                    <select
                      className="input"
                      value={formData.business_type}
                      onChange={(e) => setFormData({ ...formData, business_type: e.target.value })}
                      required
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

                  {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full btn btn-primary py-3 text-lg"
                    disabled={loading}
                  >
                    {loading ? 'Kaydediliyor...' : 'Ücretsiz Başla'}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    Devam ederek <a href="#" className="text-primary-600 hover:underline">Kullanım Koşullarını</a> kabul etmiş olursunuz.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}) {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className={`inline-flex p-3 rounded-xl ${color} mb-4`}>{icon}</div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
        {number}
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

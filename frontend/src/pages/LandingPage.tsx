import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Link2, Palette, BarChart3, Eye, MousePointerClick, Zap, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react'
import SEO from '@/components/SEO'

const demoThemes = [
  {
    name: '@shop_demo',
    type: 'Shop',
    title: 'E-Ticaret Mağazası',
    subtitle: 'Ürün vitrinleri için 🛍️',
    gradient: 'from-purple-400 to-indigo-600',
    avatar: 'S',
    links: [
      { icon: '👕', title: 'Kışlık Koleksiyon', desc: 'Sıcak tutan, yumuşak dokulu sezonun favorisi', color: 'from-purple-500 to-pink-600' },
      { icon: '👟', title: 'Spor Ayakkabı', desc: 'Konforlu ve şık tasarım, her adımda rahatlık', color: 'from-blue-500 to-cyan-600' }
    ]
  },
  {
    name: '@influencer_demo',
    type: 'Social Media',
    title: 'Sosyal Medya',
    subtitle: 'İnfluencer & Creator 💜',
    gradient: 'from-pink-400 to-purple-600',
    avatar: 'I',
    links: [
      { icon: '📸', title: 'Instagram', color: 'from-pink-400 to-purple-600' },
      { icon: '🎥', title: 'YouTube', color: 'from-red-400 to-red-600' },
      { icon: '🎵', title: 'TikTok', color: 'from-gray-800 to-gray-900' }
    ]
  },
  {
    name: '@designer_demo',
    type: 'Creative Portfolio',
    title: 'Creative Portfolio',
    subtitle: 'Designer & Artist 🎨',
    gradient: 'from-rose-400 to-pink-600',
    avatar: 'D',
    links: [
      { icon: '🎨', title: 'My Work', color: 'from-rose-400 to-pink-600' },
      { icon: '✏️', title: 'Dribbble', color: 'from-pink-500 to-rose-600' }
    ]
  },
  {
    name: '@pro_demo',
    type: 'Minimal Portfolio',
    title: 'Minimal Professional',
    subtitle: 'Clean & Simple ✨',
    gradient: 'from-gray-400 to-gray-600',
    avatar: 'P',
    links: [
      { icon: '💼', title: 'LinkedIn Profile', color: 'from-blue-600 to-blue-700' },
      { icon: '📧', title: 'Email Me', color: 'from-gray-500 to-gray-700' },
      { icon: '📄', title: 'My Resume', color: 'from-green-500 to-green-700' }
    ]
  },
  {
    name: '@photographer_demo',
    type: 'Gallery Portfolio',
    title: 'Gallery Portfolio',
    subtitle: 'Photographer 📸',
    gradient: 'from-slate-700 to-slate-900',
    avatar: 'G',
    links: [
      { icon: '📷', title: 'Wedding Photos', color: 'from-slate-600 to-slate-800' },
      { icon: '🌅', title: 'Landscapes', color: 'from-orange-500 to-red-600' }
    ]
  },
  {
    name: '@agency_demo',
    type: 'Business Portfolio',
    title: 'Business Portfolio',
    subtitle: 'Agency & Consultant 💼',
    gradient: 'from-blue-600 to-indigo-700',
    avatar: 'A',
    links: [
      { icon: '🚀', title: 'Case Studies', desc: 'Successful projects we delivered', color: 'from-blue-600 to-indigo-700' },
      { icon: '💡', title: 'Our Services', desc: 'Web design, branding & more', color: 'from-purple-600 to-blue-700' }
    ]
  }
]

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
  const [currentTheme, setCurrentTheme] = useState(0)
  const [currentDemoTheme, setCurrentDemoTheme] = useState(0)

  const nextTheme = () => {
    setCurrentTheme((prev) => (prev + 1) % themes.length)
  }

  const prevTheme = () => {
    setCurrentTheme((prev) => (prev - 1 + themes.length) % themes.length)
  }

  const nextDemoTheme = () => {
    setCurrentDemoTheme((prev) => (prev + 1) % demoThemes.length)
  }

  const prevDemoTheme = () => {
    setCurrentDemoTheme((prev) => (prev - 1 + demoThemes.length) % demoThemes.length)
  }

  // Structured Data for SEO (Schema.org)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "TheLinker",
    "url": "https://thelinker-three.vercel.app",
    "description": "Sosyal medya biyografin için profesyonel link-in-bio sayfası oluştur. Instagram, TikTok, YouTube için tek link. 6 tema, sınırsız link, analitik. %100 Ücretsiz!",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "TRY"
    },
    "featureList": [
      "6 Profesyonel Tema",
      "Sınırsız Link Ekleme",
      "Detaylı Analitik",
      "Özel Renkler",
      "Avatar Yükleme",
      "Mobil Uyumlu",
      "SEO Optimizasyonu"
    ],
    "creator": {
      "@type": "Organization",
      "name": "OrionSoft.dev",
      "url": "https://orionsoft.dev"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50">
      <SEO
        title="Ana Sayfa"
        description="Sosyal medya biyografin için profesyonel link-in-bio sayfası oluştur. Instagram, TikTok, YouTube için tek link. 6 tema, sınırsız link, analitik. %100 Ücretsiz!"
        keywords={[
          'linktree türkiye',
          'bio link ücretsiz',
          'sosyal medya link toplama',
          'instagram link ekleme',
          'creator tools',
          'influencer araçları'
        ]}
        structuredData={structuredData}
      />
      {/* Header */}
      <header className="container mx-auto px-4 py-4 sm:py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Link2 className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full"></div>
            </div>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              TheLinker
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/auth" className="text-sm sm:text-base text-gray-600 hover:text-gray-900">
              Giriş Yap
            </Link>
            <Link
              to="/auth"
              className="btn btn-primary text-sm sm:text-base px-3 sm:px-4 py-2"
            >
              Ücretsiz Başla
            </Link>
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
                <Link
                  to="/auth"
                  className="btn btn-primary text-lg px-8 py-3"
                >
                  Hemen Başla
                </Link>
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

            {/* Right: Demo Profile Carousel */}
            <div className="max-w-md mx-auto w-full">
              <div className="relative">
                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg z-10 animate-bounce">
                  Canlı Demo ✨
                </div>

                {/* Demo Card Carousel */}
                <div className="card bg-white p-8 shadow-2xl transition-all relative overflow-hidden">
                  <div className="text-center">
                    <div className={`w-24 h-24 mx-auto mb-4 bg-gradient-to-br ${demoThemes[currentDemoTheme].gradient} rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg`}>
                      {demoThemes[currentDemoTheme].avatar}
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{demoThemes[currentDemoTheme].name}</h3>
                    <p className="text-lg font-medium text-primary-600 mb-2">{demoThemes[currentDemoTheme].title}</p>
                    <p className="text-sm text-gray-600 mb-6">{demoThemes[currentDemoTheme].subtitle}</p>
                  </div>

                  {/* Theme-specific layouts */}
                  {demoThemes[currentDemoTheme].type === 'Shop' && (
                    <div className="space-y-3">
                      {demoThemes[currentDemoTheme].links.map((item, index) => (
                        <div
                          key={index}
                          className={`w-full p-3 bg-gradient-to-r ${item.color} text-white rounded-lg shadow-lg border-2 border-white/30`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-16 h-16 bg-white/20 rounded-md flex items-center justify-center flex-shrink-0">
                              <span className="text-3xl">{item.icon}</span>
                            </div>
                            <div className="flex-1 text-left">
                              <h4 className="font-bold text-base mb-1">{item.title}</h4>
                              {'desc' in item && <p className="text-xs opacity-90">{item.desc}</p>}
                              <span className="text-xs font-semibold mt-1 inline-block">🛍️ Ürünü İncele</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {demoThemes[currentDemoTheme].type === 'Social Media' && (
                    <div className="space-y-3">
                      {demoThemes[currentDemoTheme].links.map((item, index) => (
                        <div
                          key={index}
                          className={`w-full py-4 px-6 bg-gradient-to-r ${item.color} text-white rounded-full shadow-md`}
                        >
                          <div className="flex items-center justify-center gap-3 font-medium">
                            <span className="text-2xl">{item.icon}</span>
                            <span>{item.title}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {demoThemes[currentDemoTheme].type === 'Creative Portfolio' && (
                    <div className="grid grid-cols-2 gap-3">
                      {demoThemes[currentDemoTheme].links.map((item, index) => (
                        <div
                          key={index}
                          className={`bg-gradient-to-br ${item.color} text-white rounded-xl shadow-md overflow-hidden`}
                        >
                          <div className="h-24 flex items-center justify-center bg-white/10">
                            <span className="text-4xl">{item.icon}</span>
                          </div>
                          <div className="p-3 text-center">
                            <h4 className="font-bold text-sm">{item.title}</h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {demoThemes[currentDemoTheme].type === 'Minimal Portfolio' && (
                    <div className="space-y-0">
                      {demoThemes[currentDemoTheme].links.map((item, index) => (
                        <div
                          key={index}
                          className="py-4 border-b border-gray-200 last:border-0"
                        >
                          <div className="flex items-center justify-between text-gray-800">
                            <h4 className="font-semibold">{item.title}</h4>
                            <span className="text-xl opacity-40">{item.icon}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {demoThemes[currentDemoTheme].type === 'Gallery Portfolio' && (
                    <div className="space-y-3">
                      {demoThemes[currentDemoTheme].links.map((item, index) => (
                        <div
                          key={index}
                          className="relative h-32 rounded-lg overflow-hidden"
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                            <span className="text-5xl">{item.icon}</span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                            <h4 className="text-white font-bold">{item.title}</h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {demoThemes[currentDemoTheme].type === 'Business Portfolio' && (
                    <div className="space-y-3">
                      {demoThemes[currentDemoTheme].links.map((item, index) => (
                        <div
                          key={index}
                          className={`bg-gradient-to-r ${item.color} text-white rounded-lg shadow-md border-l-4 border-white p-4`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 bg-white/20 rounded-md flex items-center justify-center flex-shrink-0">
                              <span className="text-2xl">{item.icon}</span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold mb-1">{item.title}</h4>
                              {'desc' in item && <p className="text-xs opacity-80">{item.desc}</p>}
                              <span className="text-xs font-semibold uppercase mt-2 inline-block opacity-60">View →</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Navigation arrows */}
                  <div className="flex items-center justify-between mt-6">
                    <button
                      onClick={prevDemoTheme}
                      className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all"
                      aria-label="Previous demo"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>

                    {/* Dot indicators */}
                    <div className="flex gap-2">
                      {demoThemes.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentDemoTheme(index)}
                          className={`h-2 rounded-full transition-all ${
                            index === currentDemoTheme ? 'w-8 bg-primary-600' : 'w-2 bg-gray-300'
                          }`}
                          aria-label={`Go to demo ${index + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={nextDemoTheme}
                      className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all"
                      aria-label="Next demo"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
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
              Neden TheLinker?
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
            <Link
              to="/auth"
              className="btn bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-4 font-semibold"
            >
              Şimdi Ücretsiz Başla 🚀
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-20 border-t">
        <div className="text-center text-gray-600">
          <p className="mb-2">&copy; 2024 TheLinker. Tüm hakları saklıdır.</p>
          <p className="text-sm mb-4">
            <Link to="/auth" className="hover:text-primary-600">Giriş Yap</Link>
            {' • '}
            <Link to="/auth" className="hover:text-primary-600">
              Kayıt Ol
            </Link>
          </p>
          <p className="text-xs text-gray-500">
            Built with ❤️ by{' '}
            <a
              href="https://orionsoft.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              OrionSoft.dev
            </a>
          </p>
        </div>
      </footer>
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

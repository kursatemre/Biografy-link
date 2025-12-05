# 🔗 Biografy Link - Free Link-in-Bio Platform

Modern, fully customizable link-in-bio platform for creators, businesses, and professionals. Create your personalized landing page with multiple links, stunning themes, and powerful analytics - **100% FREE**.

Built by [OrionSoft.dev](https://orionsoft.dev)

## ✨ Features

### 🎨 Beautiful Themes (6 Unique Designs)
- **Shop** - E-commerce product showcase with large images
- **Social Media** - Perfect for influencers with icon-based links
- **Creative Portfolio** - 2-column grid for designers and creators
- **Minimal Portfolio** - Ultra-clean list design for professionals
- **Gallery Portfolio** - Full-width image cards for photographers
- **Business Portfolio** - Professional case study layout for agencies

### 🔗 Advanced Link Management
- ✅ Add/Edit/Delete links with live preview
- ✅ Drag & drop reordering (up/down buttons)
- ✅ Active/Inactive toggle per link
- ✅ Custom colors per button (background + text)
- ✅ Product images & descriptions (for Shop theme)
- ✅ Automatic social media icon detection (16+ platforms)
- ✅ Custom emoji/icon support
- ✅ Click tracking per link

### 👤 Profile Customization
- 📸 Avatar upload (Supabase Storage)
- 🎨 Custom background colors & gradients
- 🎨 Custom text colors (bio & footer)
- ✏️ Username change with validation
- 📝 Display name & bio
- 📱 Contact buttons (WhatsApp, Phone, Email)

### 📊 Analytics Dashboard
- 📈 Total profile views
- 📈 Total link clicks
- 📈 Per-link click statistics
- 📅 Real-time tracking

### 🌐 SEO & Social Sharing
- 🔍 Dynamic meta tags (OG tags, Twitter cards)
- 🖼️ Custom profile images for social sharing
- 🔗 Clean username URLs (yourdomain.com/username)

### 📬 Newsletter Signup
- Collect leads with built-in signup form
- Capture: Name, Email, Phone, Business Type
- Supabase integration for data storage

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Backend/Database:** Supabase (PostgreSQL + RLS)
- **Authentication:** Supabase Auth (JWT)
- **Storage:** Supabase Storage (avatars, images)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React + React Icons
- **Router:** React Router v6
- **SEO:** React Helmet Async
- **Deployment:** Vercel (Frontend) + Supabase (Backend)

## 📁 Project Structure

```
Biografy-link/
├── frontend/              # React application
│   ├── src/
│   │   ├── components/    # Reusable UI components (SEO)
│   │   ├── pages/         # Page components
│   │   │   ├── Auth.tsx          # Login/Signup
│   │   │   ├── Dashboard.tsx     # User dashboard
│   │   │   ├── ProfilePage.tsx   # Public profile
│   │   │   └── LandingPage.tsx   # Marketing page
│   │   ├── hooks/         # Custom React hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useProfile.ts
│   │   │   ├── useLinks.ts
│   │   │   ├── useThemes.ts
│   │   │   ├── useAnalytics.ts
│   │   │   └── useNewsletter.ts
│   │   ├── lib/           # Supabase client
│   │   ├── types/         # TypeScript interfaces
│   │   ├── utils/         # Helper functions (socialMedia.ts)
│   │   └── styles/        # Global CSS
│   ├── public/            # Static assets
│   └── package.json
├── supabase/              # Supabase configuration
│   └── migrations/        # Database migrations (001-012)
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Supabase account ([supabase.com](https://supabase.com))

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/Biografy-link.git
cd Biografy-link
cd frontend
npm install
```

### 2. Configure Supabase

1. Create a new project on [Supabase](https://supabase.com)
2. Copy your project URL and anon key
3. Create `.env` file in `/frontend`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run Database Migrations

Go to your Supabase project → SQL Editor → Run each migration file from `/supabase/migrations/` in order:

```
001_initial_schema.sql
002_add_themes.sql
003_add_analytics.sql
004_newsletter_signup.sql
005_storage_avatars.sql
006_add_social_theme.sql
007_add_color_customization.sql
008_add_text_color_and_contacts.sql
009_add_profile_text_color.sql
010_add_shop_theme.sql
011_add_link_image_description.sql
012_add_portfolio_themes.sql
```

### 4. Start Development Server

```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
```

Deploy the `frontend/dist` folder to Vercel or your preferred hosting.

## 📊 Database Schema

### Core Tables

- **profiles** - User profiles (username, bio, avatar, theme, colors)
- **links** - User links (title, URL, icon, colors, image, description)
- **themes** - Theme configurations (6 pre-built themes)
- **analytics** - Event tracking (clicks, views)
- **newsletter_signups** - Lead collection

### Storage Buckets

- **avatars** - User profile pictures (public bucket with RLS)

See migration files for detailed schema with RLS policies.

## 🎨 Theme Showcase

### Shop Theme 🛍️
Perfect for e-commerce and product showcases
- Product image on left (96x96px square)
- Product name and description on right
- "View Product" CTA
- Bold border with hover effects

### Social Media Theme 💜
Perfect for social media influencers
- Auto-detects social media icons (Instagram, Twitter, TikTok, etc.)
- Purple gradient background
- Pill-shaped buttons
- Icon + title layout

### Creative Portfolio 🎨
Perfect for designers and content creators
- 2-column grid layout (responsive)
- Large image cards with hover lift effect
- Image on top, content below
- Pink gradient background

### Minimal Portfolio ✨
Ultra minimal design for professionals
- Clean list layout with thin borders
- Hover: slide right + underline
- White background, dark text
- Arrow icon on right

### Gallery Portfolio 📸
Perfect for photographers and visual artists
- Large full-width image cards (280px height)
- Dark gradient overlay with text
- Hover: image zoom effect
- Dark slate theme

### Business Portfolio 💼
Professional design for agencies and consultants
- Case study card layout
- Left border accent (grows on hover)
- Icon/image + content side-by-side
- "View Case Study" CTA
- Blue gradient background

## 🔧 Key Features Explained

### Automatic Social Media Icons
Links are automatically detected and matched with brand icons:
- Instagram, Twitter/X, Facebook, LinkedIn, TikTok
- YouTube, GitHub, Discord, Telegram, WhatsApp
- Twitch, Spotify, Pinterest, Medium, Behance, Dribbble

### Custom Color System
- Per-link button colors (background)
- Per-link text colors
- Profile background color (supports gradients)
- Profile text color (bio & footer)
- Theme-based fallbacks

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Optimized typography and spacing
- Touch-friendly buttons

### Analytics Tracking
- Profile view tracking (on page load)
- Link click tracking (before redirect)
- Aggregated statistics in dashboard
- Per-link click counts

## 🗺️ Roadmap

### ✅ Phase 1: Core Features (COMPLETED)
- [x] User authentication (email + password)
- [x] Profile management
- [x] Link CRUD operations
- [x] 6 unique themes
- [x] Analytics dashboard
- [x] Custom colors & styling
- [x] Avatar upload
- [x] Social media auto-icons
- [x] Newsletter signup
- [x] SEO optimization

### 🚧 Phase 2: Advanced Features (In Progress)
- [ ] Custom domains
- [ ] QR code generation
- [ ] Link scheduling (start/end dates)
- [ ] Premium themes
- [ ] Dark mode toggle
- [ ] Export analytics (CSV)
- [ ] Link grouping/categories

### 🔮 Phase 3: Pro Features (Planned)
- [ ] A/B testing for links
- [ ] Advanced analytics (geography, devices)
- [ ] Integrations (Mailchimp, Google Analytics)
- [ ] Team accounts
- [ ] White-label solution
- [ ] API access

## 📈 Performance

- ⚡ Lighthouse Score: 95+ (Performance, Accessibility, Best Practices, SEO)
- 📦 Bundle size: ~440KB (gzipped: ~127KB)
- 🚀 First Contentful Paint: <1s
- ⚡ Time to Interactive: <2s

## 🔒 Security

- 🔐 Row Level Security (RLS) on all tables
- 🔐 JWT-based authentication
- 🔐 Secure file upload with size limits
- 🔐 SQL injection protection
- 🔐 XSS protection

## 🌍 Deployment

### Vercel (Recommended for Frontend)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
```

### Supabase (Backend)
Already hosted on Supabase cloud. No additional deployment needed.

## 📝 License

MIT License - feel free to use for your projects!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💬 Support

- Website: [OrionSoft.dev](https://orionsoft.dev)
- Issues: [GitHub Issues](https://github.com/yourusername/Biografy-link/issues)

## ⭐ Star History

If you find this project useful, please consider giving it a star! ⭐

---

Built with ❤️ by [OrionSoft.dev](https://orionsoft.dev)

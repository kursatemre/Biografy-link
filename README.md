# 🔗 Biografy Link - Link-in-Bio Platform

Modern, customizable link-in-bio platform for social media profiles. Create your personalized landing page with multiple links, themes, and analytics.

## ✨ Features

- 🎨 **Multiple Themes** - Influencer, E-commerce, Minimalist, Portfolio styles
- 🔗 **Link Management** - Add, edit, reorder, and toggle links
- 📊 **Analytics** - Track clicks and page views
- 👤 **Profile Customization** - Avatar, bio, colors, and styling
- 📱 **Responsive Design** - Perfect on all devices
- 🚀 **Fast & SEO-friendly** - Optimized for performance

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Backend/Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Storage:** Supabase Storage (for avatars/images)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel (Frontend) + Supabase (Backend)

## 📁 Project Structure

```
Biografy-link/
├── frontend/           # React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and Supabase client
│   │   ├── types/         # TypeScript types
│   │   └── styles/        # Global styles
│   ├── public/            # Static assets
│   └── package.json
├── supabase/           # Supabase configuration
│   ├── migrations/        # Database migrations
│   └── seed.sql          # Seed data
└── docs/               # Documentation
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account ([supabase.com](https://supabase.com))

### 1. Clone & Install

```bash
git clone <your-repo-url>
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

Go to your Supabase project → SQL Editor → Run the migrations from `/supabase/migrations/`

### 4. Start Development Server

```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173`

## 📊 Database Schema

### Tables

- **users** - User profiles and settings
- **links** - User's links
- **themes** - Theme configurations
- **analytics** - Click tracking and page views

See `/docs/database-schema.md` for detailed schema.

## 🎯 Roadmap

### Phase 1: MVP (Current)
- [x] Project setup
- [ ] User authentication
- [ ] Link CRUD operations
- [ ] Basic profile page
- [ ] Default theme

### Phase 2: Themes & Customization
- [ ] Multiple theme options
- [ ] Color customization
- [ ] Custom fonts
- [ ] Button styles

### Phase 3: Advanced Features
- [ ] Analytics dashboard
- [ ] Link scheduling
- [ ] Custom domains
- [ ] Premium themes

## 📝 License

MIT License - feel free to use for your projects!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

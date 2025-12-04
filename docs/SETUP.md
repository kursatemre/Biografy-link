# Setup Guide

Complete guide to set up Biografy Link locally and deploy to production.

## Prerequisites

- **Node.js** 18+ and npm/yarn
- **Supabase Account** - [Sign up here](https://supabase.com)
- **Git** for version control

## Local Development Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Biografy-link
```

### 2. Install Dependencies

```bash
cd frontend
npm install
```

### 3. Set Up Supabase

#### 3.1. Create a New Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Fill in:
   - Project Name: `biografy-link`
   - Database Password: (save this securely)
   - Region: Choose closest to you
4. Wait for project to be created (~2 minutes)

#### 3.2. Get Your Supabase Credentials

1. In your Supabase project, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

#### 3.3. Configure Environment Variables

```bash
cd frontend
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_APP_URL=http://localhost:5173
```

### 4. Run Database Migrations

You have two options to run migrations:

#### Option A: Using Supabase Dashboard (Recommended for beginners)

1. Go to your Supabase project
2. Click **SQL Editor** in the left sidebar
3. Click **+ New Query**
4. Copy and paste the content from each migration file in order:
   - `/supabase/migrations/001_initial_schema.sql`
   - `/supabase/migrations/002_seed_themes.sql`
   - `/supabase/migrations/003_functions_and_views.sql`
5. Click **Run** for each migration

#### Option B: Using Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Push migrations
supabase db push
```

### 5. Configure Storage (for avatars)

1. In Supabase Dashboard, go to **Storage**
2. Click **Create a new bucket**
3. Create a bucket named `avatars`
4. Set it to **Public bucket**
5. Add this policy:

```sql
-- Allow anyone to view avatars
CREATE POLICY "Public avatars are viewable by everyone"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

-- Allow authenticated users to upload their own avatar
CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to update their own avatar
CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

### 6. Configure Authentication

1. In Supabase Dashboard, go to **Authentication** → **Settings**
2. Configure the following:

**Email Auth:**
- Enable Email provider
- Disable email confirmation for development (enable for production)

**Site URL:**
- Set to `http://localhost:5173` for development

**Redirect URLs:**
- Add `http://localhost:5173/dashboard`

### 7. Start Development Server

```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173` 🎉

## Testing the Application

### Create Your First Account

1. Go to `http://localhost:5173`
2. Click "Get Started" or "Sign In"
3. Create a new account with email/password
4. After signup, you'll be redirected to create your profile

### Test Features

- [ ] Create a profile with username
- [ ] Add links
- [ ] Reorder links
- [ ] Visit your profile page at `/:username`
- [ ] Toggle link visibility
- [ ] Change themes (when implemented)

## Deployment

### Deploy Frontend to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel

# Follow the prompts
# Set environment variables in Vercel dashboard
```

### Update Supabase Settings for Production

1. Go to **Authentication** → **Settings**
2. Update **Site URL** to your production URL
3. Update **Redirect URLs** to include production URLs

## Troubleshooting

### "Missing Supabase environment variables"

Make sure your `.env` file is in the `/frontend` directory and contains valid values.

### Database migration errors

- Check that you ran migrations in order
- Make sure you have the `uuid-ossp` extension enabled
- Verify you're connected to the correct Supabase project

### RLS Policy errors

If you can't view/edit data:
- Check that RLS policies are applied correctly
- Verify you're authenticated (check `auth.uid()`)
- Check browser console for detailed errors

### Authentication not working

- Verify environment variables are set correctly
- Check Supabase Auth settings
- Clear browser cache and cookies
- Check Site URL and Redirect URLs in Supabase settings

## Next Steps

- [ ] Implement authentication hooks
- [ ] Add drag-and-drop for link reordering
- [ ] Implement theme switching
- [ ] Add analytics dashboard
- [ ] Implement custom domains (premium)
- [ ] Add social media sharing

## Need Help?

- Check the [Supabase Documentation](https://supabase.com/docs)
- Join [Supabase Discord](https://discord.supabase.com)
- Open an issue in this repository

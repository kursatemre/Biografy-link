# Deployment Guide - Vercel

Complete guide to deploy Biografy Link to Vercel.

## Prerequisites

- GitHub account with your repository
- Vercel account (sign up at https://vercel.com)
- Supabase project already set up

## Quick Deploy Steps

### 1. Push Your Code to GitHub

```bash
git add .
git commit -m "chore: prepare for Vercel deployment"
git push
```

### 2. Import to Vercel

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select your **Biografy-link** repository
4. Click **"Import"**

### 3. Configure Project Settings

**Framework Preset:** Vite

**Root Directory:** `./` (leave as default)

**Build Command:** `cd frontend && npm run build`

**Output Directory:** `frontend/dist`

**Install Command:** `cd frontend && npm install`

### 4. Add Environment Variables

Click **"Environment Variables"** and add:

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | `https://yxjkfcchwhcirgphamvq.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4amtmY2Nod2hjaXJncGhhbXZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3OTI2NDUsImV4cCI6MjA4MDM2ODY0NX0.DpPX0vGujMtSUrQafctMIbVCEhGz7PZmitrn79tFMdE` |

**Important:** Add these to **all environments** (Production, Preview, Development)

### 5. Deploy

Click **"Deploy"** button and wait for build to complete (2-3 minutes)

Your app will be live at: `https://your-project-name.vercel.app`

## Update Supabase Settings

After deployment, update your Supabase settings:

1. Go to Supabase Dashboard → **Authentication** → **URL Configuration**
2. Add your Vercel URLs:

**Site URL:**
```
https://your-project-name.vercel.app
```

**Redirect URLs:**
```
https://your-project-name.vercel.app/dashboard
https://your-project-name.vercel.app/auth
http://localhost:5173/dashboard
http://localhost:5173/auth
```

## Custom Domain (Optional)

### Add Custom Domain

1. Go to Vercel Dashboard → Your Project → **Settings** → **Domains**
2. Add your domain (e.g., `biografylink.com`)
3. Follow Vercel's DNS configuration instructions
4. Update Supabase redirect URLs with your custom domain

## Automatic Deployments

Vercel automatically deploys:
- **Production:** When you push to `main` branch
- **Preview:** For pull requests and other branches

## Troubleshooting

### Build Fails

**Error:** "Module not found" or "Cannot find module"
- **Solution:** Make sure all dependencies are in `frontend/package.json`
- Run `cd frontend && npm install` locally to verify

**Error:** "Environment variable not found"
- **Solution:** Check that all `VITE_*` variables are set in Vercel

**Error:** "Command failed: npm run build"
- **Solution:** Run `cd frontend && npm run build` locally to test
- Fix any TypeScript errors

### App Not Loading

**Blank page or 404:**
- Check browser console for errors
- Verify Supabase URL and keys are correct
- Check Vercel deployment logs

**Authentication not working:**
- Verify redirect URLs in Supabase settings
- Make sure to include both production and local URLs
- Check that Site URL matches your Vercel domain

### Database Connection Issues

- Verify `VITE_SUPABASE_URL` is correct
- Verify `VITE_SUPABASE_ANON_KEY` is correct
- Check Supabase project is active
- Verify RLS policies are set up correctly

## Viewing Logs

View deployment logs:
1. Go to Vercel Dashboard
2. Select your project
3. Click on latest deployment
4. View **Build Logs** and **Runtime Logs**

## Redeployment

To redeploy after changes:

```bash
git add .
git commit -m "your commit message"
git push
```

Vercel will automatically detect and deploy!

## Environment-Specific Builds

### Preview Deployments

Preview deployments are created for:
- Pull requests
- Non-production branches

Each preview gets a unique URL: `https://your-project-git-branch-name.vercel.app`

### Production Deployment

Production deployment happens when:
- You push to `main` branch
- You manually trigger deploy from Vercel dashboard

## Performance Optimization

Vercel automatically provides:
- ✅ CDN (Content Delivery Network)
- ✅ Automatic HTTPS
- ✅ Gzip compression
- ✅ Cache optimization
- ✅ Edge network

## Monitoring

Monitor your app:
1. Vercel Dashboard → **Analytics**
2. View:
   - Page views
   - Performance metrics
   - Error rates
   - Top pages

## Cost

**Free Tier includes:**
- Unlimited deployments
- 100GB bandwidth
- 100GB build time
- Custom domains
- Automatic HTTPS

Perfect for this project!

## Support

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- GitHub Issues: Open an issue in your repo

## Next Steps After Deployment

1. ✅ Test all features on production
2. ✅ Share your link: `https://your-project.vercel.app`
3. ✅ Set up custom domain (optional)
4. ✅ Monitor analytics
5. ✅ Add more features!

Happy deploying! 🚀

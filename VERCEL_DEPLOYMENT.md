# Vercel Deployment Guide

## Step 1: Deploy to Vercel

1. **Connect your GitHub repository to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the `holdings-manager-react` folder as the root directory

2. **Configure Build Settings:**
   - **Framework Preset:** Vite
   - **Root Directory:** `holdings-manager-react`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

3. **Add Environment Variables:**
   - Go to Project Settings → Environment Variables
   - Add:
     - `VITE_SUPABASE_URL` = Your Supabase project URL
     - `VITE_SUPABASE_ANON_KEY` = Your Supabase anon key

4. **Deploy!**

## Step 2: Configure Supabase Redirect URLs

**This is critical for OAuth to work!**

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Authentication** → **URL Configuration**
4. Under **Redirect URLs**, add:
   - Your Vercel URL: `https://your-app-name.vercel.app`
   - Your custom domain (if you have one): `https://yourdomain.com`
   - For local development: `http://localhost:5173`, `http://localhost:5174`, `http://localhost:3000`

5. Click **Save**

## Step 3: Test the Deployment

1. Visit your Vercel URL
2. Click "Sign in with Google"
3. You should be redirected back to your Vercel app (not localhost)
4. You should be logged in successfully

## Troubleshooting

### OAuth redirects to localhost
- **Check:** Supabase redirect URLs include your Vercel domain
- **Check:** Environment variables are set correctly in Vercel
- **Check:** You've redeployed after adding environment variables

### Build fails
- **Check:** All dependencies are in `package.json`
- **Check:** TypeScript errors are fixed
- **Check:** Build command is correct: `npm run build`

### Session not persisting
- **Check:** Supabase client configuration in `src/lib/supabase.ts`
- **Check:** `detectSessionInUrl: true` is set


# Supabase OAuth Setup - Critical Steps

## The Problem: Redirects to localhost:3000

If OAuth is redirecting to localhost:3000 even after configuring redirect URLs, check these settings:

## Step 1: Update Site URL in Supabase

**This is the most important step!**

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings** → **API** (or **Authentication** → **URL Configuration**)
4. Find **Site URL** field
5. **Set it to your Vercel URL:** `https://your-app-name.vercel.app`
6. **DO NOT** use localhost here for production
7. Click **Save**

**Important:** The Site URL is used as a fallback if the redirectTo parameter doesn't match allowed URLs.

## Step 2: Configure Redirect URLs

1. Go to **Authentication** → **URL Configuration**
2. Under **Redirect URLs**, add:
   ```
   https://your-app-name.vercel.app
   https://your-app-name.vercel.app/**
   http://localhost:5173
   http://localhost:5174
   http://localhost:3000
   ```
3. Click **Save**

## Step 3: Check Google OAuth Settings

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your project
3. Go to **APIs & Services** → **Credentials**
4. Click on your OAuth 2.0 Client ID
5. Under **Authorized redirect URIs**, make sure you have:
   ```
   https://your-supabase-project.supabase.co/auth/v1/callback
   ```
   (This is the Supabase callback URL, not your app URL)

## Step 4: Verify in Browser Console

After deploying to Vercel:

1. Open your Vercel app in the browser
2. Open Developer Tools (F12) → Console tab
3. Click "Sign in with Google"
4. Check the console logs:
   - Should show: `"Current origin: https://your-app.vercel.app"`
   - Should show: `"Initiating Google OAuth with redirect URL: https://your-app.vercel.app"`
   - If it shows localhost, the app is running locally, not on Vercel

## Step 5: Clear Browser Cache

Sometimes browsers cache OAuth redirects:
1. Clear browser cache and cookies
2. Try in incognito/private mode
3. Or use a different browser

## Common Mistakes

❌ **Setting Site URL to localhost** - This will cause all redirects to go to localhost
✅ **Set Site URL to your production Vercel URL**

❌ **Only adding redirect URLs, not updating Site URL** - Site URL takes precedence
✅ **Update both Site URL and Redirect URLs**

❌ **Testing on localhost but expecting Vercel redirect** - If you're running locally, it will redirect to localhost
✅ **Test on the actual Vercel deployment**

## Quick Checklist

- [ ] Site URL in Supabase = Your Vercel URL
- [ ] Redirect URLs include your Vercel URL
- [ ] Environment variables set in Vercel
- [ ] App is deployed and running on Vercel (not localhost)
- [ ] Browser console shows correct origin
- [ ] Cleared browser cache



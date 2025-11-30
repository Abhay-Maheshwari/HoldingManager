# Fix: Redirect to Localhost After Login

## The Problem
After successfully logging in with Google, you get redirected to `localhost:3000` instead of staying on your Vercel URL.

## Root Cause
The **Site URL** in Supabase is set to `http://localhost:3000`. After OAuth authentication, Supabase uses the Site URL as the default redirect destination.

## The Fix (2 Steps)

### Step 1: Update Supabase Site URL (CRITICAL)

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings** → **API** (or **Authentication** → **URL Configuration**)
4. Find the **Site URL** field (usually at the top)
5. **Change it from:** `http://localhost:3000`
6. **Change it to:** `https://your-app-name.vercel.app` (your actual Vercel URL)
7. Click **Save**

**⚠️ IMPORTANT:** This is the most critical step. The Site URL is used as the default redirect after OAuth.

### Step 2: Verify Redirect URLs

1. Still in Supabase Dashboard
2. Go to **Authentication** → **URL Configuration**
3. Under **Redirect URLs**, make sure you have:
   ```
   https://your-app-name.vercel.app
   https://your-app-name.vercel.app/**
   ```
4. Click **Save**

## After Making Changes

1. **Wait 1-2 minutes** for Supabase to update
2. **Clear your browser cache** or use incognito mode
3. **Test the login again** on your Vercel deployment

## How to Verify It's Fixed

1. Open your Vercel app: `https://your-app-name.vercel.app`
2. Open browser console (F12)
3. Click "Sign in with Google"
4. After logging in, check:
   - ✅ You should stay on `https://your-app-name.vercel.app`
   - ❌ You should NOT be redirected to `localhost:3000`
5. Check console logs - they should show your Vercel URL, not localhost

## Code Changes Made

I've also updated the code to:
- Detect if you're being redirected to localhost on production
- Prevent redirects away from the current origin
- Add better logging to help debug

But the **Site URL in Supabase** must be updated for this to work properly.

## Still Not Working?

If it still redirects to localhost after updating Site URL:

1. **Double-check the Site URL** - Make sure there's no typo
2. **Check browser console** - Look for warnings about redirect URL mismatch
3. **Try incognito mode** - Browser might be caching the old redirect
4. **Wait a few minutes** - Supabase changes can take time to propagate
5. **Verify you're testing on Vercel** - Not on localhost (localhost will redirect to localhost)



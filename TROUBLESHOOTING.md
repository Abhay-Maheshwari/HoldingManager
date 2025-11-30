# OAuth Troubleshooting Guide

## Common Issues and Solutions

### Issue 1: Redirects to localhost instead of Vercel URL

**Solution:**
1. **Check Supabase Redirect URLs:**
   - Go to Supabase Dashboard → Authentication → URL Configuration
   - Make sure your Vercel URL is added: `https://your-app.vercel.app`
   - Also add: `https://your-app.vercel.app/**` (with wildcard)
   - Remove any localhost URLs if you're only testing production

2. **Check Environment Variables in Vercel:**
   - Go to Vercel Project Settings → Environment Variables
   - Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
   - Make sure they're set for **Production**, **Preview**, and **Development**

3. **Redeploy after changes:**
   - After updating Supabase redirect URLs, you may need to wait a few minutes
   - Redeploy your Vercel app to ensure environment variables are loaded

### Issue 2: OAuth callback not processing

**Check the browser console:**
- Open Developer Tools (F12)
- Look for errors in the Console tab
- Check the Network tab for failed requests

**Verify the redirect URL:**
- When you click "Sign in with Google", check the console log
- It should show: "Initiating Google OAuth with redirect URL: https://your-app.vercel.app"
- If it shows localhost, the environment variables might not be loaded

### Issue 3: Session not persisting

**Check:**
1. Browser cookies/localStorage are enabled
2. You're not in incognito/private mode
3. Supabase client configuration has `persistSession: true`

### Issue 4: Build fails on Vercel

**Check:**
1. Root directory is set to `holdings-manager-react` in Vercel
2. Build command: `npm run build`
3. Output directory: `dist`
4. Node version is compatible (Vercel auto-detects, but you can set it in `package.json`)

## Debug Steps

1. **Check current redirect URL:**
   - Open browser console
   - Type: `window.location.origin`
   - This should show your Vercel URL, not localhost

2. **Check Supabase configuration:**
   - Open browser console
   - Check if environment variables are loaded (they're prefixed with VITE_)

3. **Test OAuth flow:**
   - Click "Sign in with Google"
   - Check console for logs
   - After redirect, check if session is created

4. **Verify Supabase redirect URLs:**
   - In Supabase Dashboard, the redirect URL should match exactly:
   - `https://your-app.vercel.app` (no trailing slash)
   - Or use wildcard: `https://your-app.vercel.app/**`

## Quick Fix Checklist

- [ ] Supabase redirect URLs include your Vercel domain
- [ ] Environment variables are set in Vercel
- [ ] Vercel project is redeployed after adding env vars
- [ ] Root directory is set correctly in Vercel
- [ ] No TypeScript/build errors
- [ ] Browser console shows no errors
- [ ] Cookies/localStorage are enabled



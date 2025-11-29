import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { isSupabaseConfigured, getSupabaseClient } from '../lib/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  isConfigured: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [isConfigured, setIsConfigured] = useState(false)

  useEffect(() => {
    const configured = isSupabaseConfigured()
    setIsConfigured(configured)

    if (!configured) {
      setLoading(false)
      return
    }

    try {
      const client = getSupabaseClient()

      // Listen for auth changes (this will handle OAuth callbacks)
      const { data: { subscription } } = client.auth.onAuthStateChange(
        async (event, session) => {
          setSession(session)
          setUser(session?.user ?? null)
          setLoading(false)
          
          // Clean up URL hash after successful authentication
          if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && window.location.hash) {
            // Wait a bit to ensure session is fully processed
            setTimeout(() => {
              window.history.replaceState(null, '', window.location.pathname)
            }, 100)
          }
        }
      )

      // Get initial session (this will also process OAuth callback if hash is present)
      client.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
        
        // Clean up hash if we have a session
        if (session && window.location.hash) {
          setTimeout(() => {
            window.history.replaceState(null, '', window.location.pathname)
          }, 100)
        }
      }).catch(() => {
        setLoading(false)
      })

      return () => subscription.unsubscribe()
    } catch (error) {
      console.error('Supabase initialization error:', error)
      setLoading(false)
    }
  }, [])

  const signInWithGoogle = async () => {
    if (!isConfigured) {
      throw new Error('Supabase is not configured. Please set up environment variables.')
    }
    const client = getSupabaseClient()
    const { error } = await client.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}${window.location.pathname}`
      }
    })
    if (error) {
      console.error('Error signing in with Google:', error.message)
      throw error
    }
  }

  const signOut = async () => {
    if (!isConfigured) {
      return
    }
    const client = getSupabaseClient()
    const { error } = await client.auth.signOut()
    if (error) {
      console.error('Error signing out:', error.message)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, isConfigured, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}


import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { AuthContext } from './authContext'

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      if (mounted) {
        setSession(currentSession)
        setLoading(false)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setLoading(false)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    const metadata = session?.user?.user_metadata
    const requiredFields = ['full_name', 'student_id', 'codeforces_handle', 'department', 'batch']
    if (!session?.user || requiredFields.some((field) => !metadata?.[field])) return

    supabase.from('profiles').upsert({
      id: session.user.id,
      full_name: metadata.full_name,
      student_id: metadata.student_id,
      codeforces_handle: metadata.codeforces_handle,
      department: metadata.department,
      batch: metadata.batch,
      updated_at: new Date().toISOString()
    }, { onConflict: 'id', ignoreDuplicates: true })
  }, [session])

  const signOut = () => supabase.auth.signOut()

  return <AuthContext.Provider value={{ session, user: session?.user ?? null, loading, signOut }}>{children}</AuthContext.Provider>
}
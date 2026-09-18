import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { supabase } from '../lib/supabase'

const ProtectedRoute = () => {
  const { user, loading } = useAuth()
  const location = useLocation()
  const [checkedUserId, setCheckedUserId] = useState(null)
  const [profileExists, setProfileExists] = useState(false)

  useEffect(() => {
    if (!user) return

    let mounted = true
    Promise.all([
      supabase.from('codeforces_verifications').select('user_id').eq('user_id', user.id).maybeSingle(),
      supabase.from('profiles').select('id, codeforces_handle, codeforces_verified').eq('id', user.id).maybeSingle()
    ]).then(([{ data: verification }, { data: profile }]) => {
      if (mounted) {
        setProfileExists(Boolean(verification && profile?.codeforces_verified && profile?.codeforces_handle))
        setCheckedUserId(user.id)
      }
    })

    return () => {
      mounted = false
    }
  }, [user])

  if (loading || (user && checkedUserId !== user.id)) return <div className="container auth-loading">Checking your session...</div>
  if (user && !profileExists) return <Navigate to="/login" replace state={{ from: location, verificationRequired: true }} />
  return user ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />
}

export default ProtectedRoute
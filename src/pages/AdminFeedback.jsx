import { useEffect, useState } from 'react'
import { CheckCircle2, MessageSquare } from 'lucide-react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { supabase } from '../lib/supabase'

const AdminFeedback = () => {
  const { user, loading } = useAuth()
  const [isAdmin, setIsAdmin] = useState(null)
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) return
    const loadFeedback = async () => {
      const { data: admin } = await supabase.from('admin_users').select('user_id').eq('user_id', user.id).maybeSingle()
      setIsAdmin(Boolean(admin))
      if (!admin) return
      const { data, error: queryError } = await supabase.from('feedback').select('id, category, message, created_at, profiles(full_name, student_id)').order('created_at', { ascending: false })
      if (queryError) setError(queryError.message)
      else setItems(data ?? [])
    }
    loadFeedback()
  }, [user])

  if (loading || isAdmin === null) return <div className="container auth-loading">Checking your admin access...</div>
  if (!user || !isAdmin) return <Navigate to="/dashboard" replace />

  return <div className="container feedback-page animate-fade-in"><p className="eyebrow">ADMIN FEEDBACK</p><h1>Student feedback</h1><p className="dashboard-subtitle">Review ideas and reports from the CPWING community.</p>{error && <div className="dashboard-empty-state feedback-error">{error}</div>}{items.length === 0 ? <div className="dashboard-empty-state"><strong>No feedback yet</strong></div> : <div className="feedback-list">{items.map((item) => <article className="glass-panel feedback-item" key={item.id}><div className="feedback-item-header"><div><strong>{item.profiles?.full_name || 'Student'}</strong><small>{item.profiles?.student_id || 'ID unavailable'}</small></div><span>{item.category}</span></div><p>{item.message}</p><time><CheckCircle2 size={14} /> {new Date(item.created_at).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</time></article>)}</div>}</div>
}

export default AdminFeedback
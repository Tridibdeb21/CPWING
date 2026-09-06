import { useEffect, useState } from 'react'
import { BarChart3, Bell, MessageSquare, ShieldCheck, Trophy, Users } from 'lucide-react'
import { Navigate, Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { supabase } from '../lib/supabase'

const AdminDashboard = () => {
  const { user, loading } = useAuth()
  const [isAdmin, setIsAdmin] = useState(null)
  const [stats, setStats] = useState({ students: 0, contests: 0, messages: 0 })
  const [topStudents, setTopStudents] = useState([])
  const [recentChanges, setRecentChanges] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) return
    const loadAdminDashboard = async () => {
      const { data: admin } = await supabase.from('admin_users').select('user_id').eq('user_id', user.id).maybeSingle()
      setIsAdmin(Boolean(admin))
      if (!admin) return

      const [profiles, contests, messages, ratings] = await Promise.all([
        supabase.from('profiles').select('id, full_name, student_id'),
        supabase.from('contests').select('id', { count: 'exact', head: true }),
        supabase.from('admin_messages').select('id', { count: 'exact', head: true }),
        supabase.from('monthly_ratings').select('user_id, month, rating, rating_change, profiles(full_name, student_id)').eq('platform', 'University Contest').order('month', { ascending: false })
      ])
      const queryError = profiles.error || contests.error || messages.error || ratings.error
      if (queryError) setError(queryError.message)
      setStats({ students: profiles.data?.length ?? 0, contests: contests.count ?? 0, messages: messages.count ?? 0 })

      const latestByUser = {}
      for (const rating of ratings.data ?? []) if (!latestByUser[rating.user_id]) latestByUser[rating.user_id] = rating
      setTopStudents(Object.values(latestByUser).sort((a, b) => b.rating - a.rating).slice(0, 5))
      setRecentChanges((ratings.data ?? []).slice(0, 8))
    }
    loadAdminDashboard()
  }, [user])

  if (loading || isAdmin === null) return <div className="container auth-loading">Checking your admin access...</div>
  if (!user || !isAdmin) return <Navigate to="/dashboard" replace />

  return (
    <div className="container dashboard-page animate-fade-in">
      <div className="dashboard-header"><div><p className="eyebrow">ADMIN CONTROL CENTER</p><h1>Admin dashboard</h1><p className="dashboard-subtitle">Monitor students, contests, ratings, and communication.</p></div><ShieldCheck className="admin-dashboard-icon" size={52} /></div>
      {error && <div className="dashboard-empty-state admin-error">{error}</div>}
      <section className="admin-stat-grid"><div className="glass-panel admin-stat"><Users size={22} /><span>Total students</span><strong>{stats.students}</strong></div><div className="glass-panel admin-stat"><Trophy size={22} /><span>Total contests</span><strong>{stats.contests}</strong></div><div className="glass-panel admin-stat"><MessageSquare size={22} /><span>Messages sent</span><strong>{stats.messages}</strong></div></section>
      <section className="admin-data-grid"><article className="glass-panel admin-data-card"><div className="dashboard-card-heading"><BarChart3 size={22} /><h2>Top-rated students</h2></div>{topStudents.length === 0 ? <div className="dashboard-empty-state">No published ratings yet.</div> : <div className="admin-ranking-list">{topStudents.map((student, index) => <div className="admin-ranking-row" key={student.user_id}><strong>#{index + 1}</strong><span>{student.profiles?.full_name || 'Unnamed student'}<small>{student.profiles?.student_id}</small></span><b>{student.rating}</b></div>)}</div>}</article><article className="glass-panel admin-data-card"><div className="dashboard-card-heading"><BarChart3 size={22} /><h2>Recent rating changes</h2></div>{recentChanges.length === 0 ? <div className="dashboard-empty-state">No rating changes yet.</div> : <div className="admin-ranking-list">{recentChanges.map((rating) => <div className="admin-ranking-row" key={`${rating.user_id}-${rating.month}`}><span>{rating.profiles?.full_name || 'Unnamed student'}<small>{rating.month}</small></span><b className={rating.rating_change >= 0 ? 'rating-positive' : 'rating-negative'}>{rating.rating_change >= 0 ? '+' : ''}{rating.rating_change}</b></div>)}</div>}</article></section>
      <div className="admin-action-links"><Link className="btn-primary" to="/admin/contest"><Trophy size={18} /> Manage contest</Link><Link className="btn-secondary" to="/admin/registrations"><Users size={18} /> Participants</Link><Link className="btn-secondary" to="/admin/messages"><MessageSquare size={18} /> Send message</Link><Link className="btn-secondary" to="/admin/notices"><Bell size={18} /> Manage notices</Link><Link className="btn-secondary" to="/admin/feedback"><MessageSquare size={18} /> Student feedback</Link></div>
    </div>
  )
}

export default AdminDashboard
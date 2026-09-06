import { useEffect, useState } from 'react'
import { Bell, Plus, Trash2 } from 'lucide-react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { supabase } from '../lib/supabase'

const AdminNotices = () => {
  const { user, loading } = useAuth()
  const [isAdmin, setIsAdmin] = useState(null)
  const [notices, setNotices] = useState([])
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (!user) return
    const load = async () => {
      const { data: admin } = await supabase.from('admin_users').select('user_id').eq('user_id', user.id).maybeSingle()
      setIsAdmin(Boolean(admin))
      if (!admin) return
      const { data, error: queryError } = await supabase.from('notices').select('id, title, message, active, created_at').order('created_at', { ascending: false })
      if (queryError) setError(queryError.message)
      else setNotices(data ?? [])
    }
    load()
  }, [user])

  const createNotice = async (event) => {
    event.preventDefault()
    setError('')
    setStatus('')
    const { data, error: insertError } = await supabase.from('notices').insert({ created_by: user.id, title, message }).select('id, title, message, active, created_at').single()
    if (insertError) setError(insertError.message)
    else { setNotices([data, ...notices]); setTitle(''); setMessage(''); setStatus('Notice published on the homepage.') }
  }

  const deleteNotice = async (id) => {
    const { error: deleteError } = await supabase.from('notices').delete().eq('id', id)
    if (deleteError) setError(deleteError.message)
    else setNotices(notices.filter((notice) => notice.id !== id))
  }

  if (loading || isAdmin === null) return <div className="container auth-loading">Checking your admin access...</div>
  if (!user || !isAdmin) return <Navigate to="/dashboard" replace />

  return <div className="container dashboard-page animate-fade-in"><p className="eyebrow">ADMIN COMMUNICATIONS</p><h1>Homepage notices</h1><p className="dashboard-subtitle">Publish a short announcement that students will see at the top of Home.</p><form className="glass-panel notice-form" onSubmit={createNotice}><label htmlFor="notice-title">Notice title</label><input id="notice-title" value={title} onChange={(event) => setTitle(event.target.value)} maxLength={120} required placeholder="October contest registration is open" /><label htmlFor="notice-message">Notice message</label><textarea id="notice-message" value={message} onChange={(event) => setMessage(event.target.value)} maxLength={500} rows={4} required placeholder="Register before the contest begins." />{error && <p className="form-message form-error">{error}</p>}{status && <p className="form-message form-success">{status}</p>}<button className="btn-primary" type="submit"><Plus size={18} /> Publish notice</button></form><div className="notice-admin-list">{notices.map((notice) => <article className="glass-panel notice-admin-row" key={notice.id}><div><strong>{notice.title}</strong><span>{notice.message}</span><small>{new Date(notice.created_at).toLocaleString()}</small></div><button className="btn-secondary notice-delete" type="button" onClick={() => deleteNotice(notice.id)} aria-label={`Delete ${notice.title}`}><Trash2 size={17} /></button></article>)}</div></div>
}

export default AdminNotices
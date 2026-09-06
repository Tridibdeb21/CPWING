import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { CheckCircle2, Send } from 'lucide-react'
import { useAuth } from '../context/useAuth'
import { supabase } from '../lib/supabase'

const AdminMessages = () => {
  const { user, loading } = useAuth()
  const [isAdmin, setIsAdmin] = useState(null)
  const [students, setStudents] = useState([])
  const [recipientId, setRecipientId] = useState('')
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    if (!user) return
    const loadAdminData = async () => {
      const [{ data: admin }, { data: profiles, error: profileError }] = await Promise.all([
        supabase.from('admin_users').select('user_id').eq('user_id', user.id).maybeSingle(),
        supabase.from('profiles').select('id, full_name, student_id').order('full_name')
      ])
      setIsAdmin(Boolean(admin))
      if (profileError) setError(profileError.message)
      else setStudents(profiles ?? [])
    }
    loadAdminData()
  }, [user])

  const sendMessage = async (event) => {
    event.preventDefault()
    setSending(true)
    setError('')
    setStatus('')
    const { error: sendError } = await supabase.from('admin_messages').insert({ created_by: user.id, recipient_id: recipientId || null, title, message })
    if (sendError) setError(sendError.message)
    else {
      setStatus('Message sent successfully.')
      setTitle('')
      setMessage('')
    }
    setSending(false)
  }

  if (loading || isAdmin === null) return <div className="container auth-loading">Checking your admin access...</div>
  if (!user) return <Navigate to="/login" replace />
  if (!isAdmin) return <Navigate to="/dashboard" replace />

  return (
    <div className="container dashboard-page animate-fade-in">
      <p className="eyebrow">ADMIN COMMUNICATIONS</p>
      <h1>Send a suggestion</h1>
      <p className="dashboard-subtitle">Send helpful feedback or guidance to one student or everyone.</p>
      <form className="glass-panel message-form" onSubmit={sendMessage}>
        <label htmlFor="recipient">Recipient</label>
        <select id="recipient" value={recipientId} onChange={(event) => setRecipientId(event.target.value)}>
          <option value="">All students</option>
          {students.map((student) => <option key={student.id} value={student.id}>{student.full_name || 'Unnamed student'} ({student.student_id})</option>)}
        </select>
        <label htmlFor="message-title">Title</label>
        <input id="message-title" value={title} onChange={(event) => setTitle(event.target.value)} required maxLength={120} placeholder="Keep practising graph problems" />
        <label htmlFor="message-body">Suggestion</label>
        <textarea id="message-body" value={message} onChange={(event) => setMessage(event.target.value)} required maxLength={2000} rows={7} placeholder="Write your guidance for the student..." />
        {error && <p className="form-message form-error">{error}</p>}
        {status && <p className="form-message form-success"><CheckCircle2 size={16} /> {status}</p>}
        <button className="btn-primary" type="submit" disabled={sending}><Send size={18} /> {sending ? 'Sending...' : 'Send suggestion'}</button>
      </form>
    </div>
  )
}

export default AdminMessages
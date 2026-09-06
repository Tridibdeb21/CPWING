import { useState } from 'react'
import { ArrowLeft, CheckCircle2, Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { supabase } from '../lib/supabase'

const Feedback = () => {
  const { user } = useAuth()
  const [category, setCategory] = useState('General')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  const submitFeedback = async (event) => {
    event.preventDefault()
    setSending(true)
    setStatus('')
    setError('')
    const { error: submitError } = await supabase.from('feedback').insert({ user_id: user.id, category, message })
    if (submitError) setError(submitError.message)
    else { setMessage(''); setStatus('Thank you. Your feedback was sent to the CPWING team.') }
    setSending(false)
  }

  return <div className="container feedback-page animate-fade-in"><p className="eyebrow">HELP US IMPROVE</p><h1>Send feedback</h1><p className="dashboard-subtitle">Share an idea, report a problem, or tell us how your contest experience felt.</p><form className="glass-panel feedback-form" onSubmit={submitFeedback}><label htmlFor="feedback-category">Category</label><select id="feedback-category" value={category} onChange={(event) => setCategory(event.target.value)}><option>General</option><option>Contest</option><option>Learning</option><option>Technical</option></select><label htmlFor="feedback-message">Your feedback</label><textarea id="feedback-message" value={message} onChange={(event) => setMessage(event.target.value)} maxLength={2000} rows={8} required placeholder="Write your feedback here..." />{error && <p className="form-message form-error">{error}</p>}{status && <p className="form-message form-success"><CheckCircle2 size={16} /> {status}</p>}<button className="btn-primary" type="submit" disabled={sending}><Send size={18} /> {sending ? 'Sending...' : 'Send feedback'}</button></form><Link className="history-back" to="/dashboard"><ArrowLeft size={16} /> Back to dashboard</Link></div>
}

export default Feedback
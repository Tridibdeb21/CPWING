import { useEffect, useState } from 'react'
import { CalendarDays, CheckCircle2, UserPlus, UserRound } from 'lucide-react'
import { useAuth } from '../context/useAuth'
import { supabase } from '../lib/supabase'

const ContestRegistration = () => {
  const { user } = useAuth()
  const [contests, setContests] = useState([])
  const [registrations, setRegistrations] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const loadContests = async () => {
      const [{ data: contestData, error: contestError }, { data: registrationData, error: registrationError }] = await Promise.all([
        supabase.from('contests').select('id, name, contest_date, month').eq('status', 'published').order('contest_date', { ascending: false }),
        supabase.from('contest_registrations').select('contest_id').eq('user_id', user.id)
      ])
      if (contestError || registrationError) setError(contestError?.message || registrationError?.message || 'Unable to load contests.')
      else {
        setContests(contestData ?? [])
        setRegistrations(new Set((registrationData ?? []).map((registration) => registration.contest_id)))
      }
      setLoading(false)
    }

    loadContests()
  }, [user.id])

  const register = async (contestId) => {
    setBusy(contestId)
    setError('')
    const { error: registrationError } = await supabase.from('contest_registrations').insert({ contest_id: contestId, user_id: user.id })
    if (registrationError) setError(registrationError.code === '23505' ? 'You are already registered for this contest.' : registrationError.message)
    else setRegistrations(new Set([...registrations, contestId]))
    setBusy('')
  }

  const unregister = async (contestId) => {
    setBusy(contestId)
    setError('')
    const { error: unregisterError } = await supabase.from('contest_registrations').delete().eq('contest_id', contestId).eq('user_id', user.id)
    if (unregisterError) setError(unregisterError.message)
    else setRegistrations((current) => { const next = new Set(current); next.delete(contestId); return next })
    setBusy('')
  }

  const isFinished = (contest) => new Date(contest.contest_date) <= new Date()

  return (
    <div className="container registration-page animate-fade-in">
      <p className="eyebrow">UNIVERSITY CONTESTS</p><h1>Register for a contest</h1><p className="dashboard-subtitle">Reserve your place in upcoming CPWING contests.</p>
      <div className="contest-rules"><strong>Contest rules</strong><span>No AI assistance is allowed during the contest.</span><span>Use of online judges and copied solutions is subject to the contest rules.</span></div>
      {loading ? <div className="auth-loading">Loading contests...</div> : error ? <div className="dashboard-empty-state registration-error">{error}</div> : contests.length === 0 ? <div className="dashboard-empty-state"><strong>No contests available</strong><span>New university contests will appear here when published.</span></div> : <div className="registration-list">{contests.map((contest) => { const registered = registrations.has(contest.id); const finished = isFinished(contest); return <article className={`glass-panel registration-card ${finished ? 'registration-finished' : ''}`} key={contest.id}><div><div className="registration-title-row"><h2>{contest.name}</h2><span className={`contest-status ${finished ? 'contest-status-finished' : 'contest-status-upcoming'}`}>{finished ? 'Finished' : 'Upcoming'}</span></div><span><CalendarDays size={15} />{new Date(contest.contest_date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</span></div>{finished ? <button className="btn-secondary" type="button" disabled>Registration closed</button> : registered ? <div className="registration-actions"><span className="registered-label"><CheckCircle2 size={18} /> Registered</span><button className="btn-secondary unregister-button" type="button" disabled={busy === contest.id} onClick={() => unregister(contest.id)}><UserRound size={16} /> {busy === contest.id ? 'Cancelling...' : 'Unregister'}</button></div> : <button className="btn-primary" type="button" disabled={busy === contest.id} onClick={() => register(contest.id)}><UserPlus size={18} /> {busy === contest.id ? 'Registering...' : 'Register'}</button>}</article>})}</div>}
    </div>
  )
}

export default ContestRegistration
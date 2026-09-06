import { useEffect, useState } from 'react'
import { Check, Users } from 'lucide-react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { supabase } from '../lib/supabase'

const AdminRegistrations = () => {
  const { user, loading } = useAuth()
  const [isAdmin, setIsAdmin] = useState(null)
  const [registrations, setRegistrations] = useState([])
  const [selectedMonth, setSelectedMonth] = useState('all')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) return
    const load = async () => {
      const { data: admin } = await supabase.from('admin_users').select('user_id').eq('user_id', user.id).maybeSingle()
      setIsAdmin(Boolean(admin))
      if (!admin) return
      const { data, error: queryError } = await supabase.from('contest_registrations').select('id, attended, registered_at, contests(name, contest_date, month), profiles(full_name, student_id)').order('registered_at', { ascending: false })
      if (queryError) setError(queryError.message)
      else setRegistrations(data ?? [])
    }
    load()
  }, [user])

  const toggleAttendance = async (registration) => {
    const { error: updateError } = await supabase.from('contest_registrations').update({ attended: !registration.attended }).eq('id', registration.id)
    if (updateError) setError(updateError.message)
    else setRegistrations(registrations.map((item) => item.id === registration.id ? { ...item, attended: !item.attended } : item))
  }

  if (loading || isAdmin === null) return <div className="container auth-loading">Checking your admin access...</div>
  if (!user || !isAdmin) return <Navigate to="/dashboard" replace />

  const months = [...new Set(registrations.map((registration) => registration.contests?.month).filter(Boolean))].sort().reverse()
  const visibleRegistrations = registrations.filter((registration) => selectedMonth === 'all' || registration.contests?.month === selectedMonth)

  return <div className="container registration-page animate-fade-in"><p className="eyebrow">ADMIN CONTESTS</p><h1>Registered participants</h1><p className="dashboard-subtitle">Review registrations and track attendance month by month.</p>{error && <div className="dashboard-empty-state registration-error">{error}</div>}{registrations.length > 0 && <div className="registration-month-filter"><label htmlFor="registration-month">View month<select id="registration-month" value={selectedMonth} onChange={(event) => setSelectedMonth(event.target.value)}><option value="all">All months</option>{months.map((value) => <option key={value} value={value}>{new Date(`${value}T00:00:00`).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</option>)}</select></label><span>{visibleRegistrations.length} participant{visibleRegistrations.length === 1 ? '' : 's'}</span></div>}{registrations.length === 0 ? <div className="dashboard-empty-state"><strong>No registrations yet</strong></div> : visibleRegistrations.length === 0 ? <div className="dashboard-empty-state"><strong>No participants for this month</strong></div> : <div className="registration-admin-list">{visibleRegistrations.map((registration) => <article className="glass-panel registration-admin-row" key={registration.id}><div className="registration-student"><Users size={20} /><span><strong>{registration.profiles?.full_name || 'Unnamed student'}</strong><small>{registration.profiles?.student_id}</small></span></div><div><strong>{registration.contests?.name}</strong><small>{registration.contests?.contest_date ? new Date(registration.contests.contest_date).toLocaleDateString() : ''}</small></div><button className={registration.attended ? 'btn-secondary attendance-done' : 'btn-primary'} type="button" onClick={() => toggleAttendance(registration)}>{registration.attended ? <><Check size={17} /> Attended</> : 'Mark attended'}</button></article>)}</div>}</div>
}

export default AdminRegistrations
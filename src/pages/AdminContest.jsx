import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Calculator, CheckCircle2, Download, Pencil, Trash2, Upload } from 'lucide-react'
import { useAuth } from '../context/useAuth'
import { supabase } from '../lib/supabase'
import { calculateUniversityRatings } from '../utils/universityRating'

const AdminContest = () => {
  const { user, loading } = useAuth()
  const [contest, setContest] = useState({ name: '', date: '', time: '', month: '', duration: '120', capacity: '', rules: '', status: 'published' })
  const [csv, setCsv] = useState('student_id,rank,solved_count,penalty\n')
  const [preview, setPreview] = useState([])
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [isAdmin, setIsAdmin] = useState(null)
  const [availableContests, setAvailableContests] = useState([])
  const [selectedContestId, setSelectedContestId] = useState('')

  useEffect(() => {
    supabase.from('admin_users').select('user_id').eq('user_id', user?.id).maybeSingle().then(({ data }) => setIsAdmin(Boolean(data)))
  }, [user?.id])

  useEffect(() => {
    if (!isAdmin) return
    supabase.from('contests').select('id, name, contest_date, month, duration_minutes, capacity, rules, status').in('status', ['draft', 'published']).order('contest_date', { ascending: true }).then(({ data }) => {
      setAvailableContests(data ?? [])
    })
  }, [isAdmin])

  const createContest = async () => {
    setError('')
    setStatus('')
    if (!contest.name || !contest.date || !contest.time || !contest.month) {
      setError('Enter a contest name, date, time, and rating month first.')
      return
    }
    const contestDate = new Date(`${contest.date}T${contest.time}:00`)
    if (Number.isNaN(contestDate.getTime())) {
      setError('Enter a valid contest date and time.')
      return
    }
    setSaving(true)
    const { data, error: contestError } = await supabase.from('contests').insert({ name: contest.name, contest_date: contestDate.toISOString(), month: `${contest.month}-01`, duration_minutes: Number(contest.duration), capacity: contest.capacity ? Number(contest.capacity) : null, rules: contest.rules || null, status: contest.status }).select('id, name, contest_date, month, duration_minutes, capacity, rules, status').single()
    if (contestError) setError(contestError.message)
    else {
      setAvailableContests([...availableContests, data])
      setSelectedContestId(data.id)
      setStatus('Contest created. Students can now register for it.')
    }
    setSaving(false)
  }

  const editContest = async () => {
    if (!selectedContestId) return setError('Select a contest to edit first.')
    const contestDate = new Date(`${contest.date}T${contest.time}:00`)
    if (!contest.name || Number.isNaN(contestDate.getTime())) return setError('Enter a valid contest name, date, and time.')
    setSaving(true)
    const { data, error: updateError } = await supabase.from('contests').update({ name: contest.name, contest_date: contestDate.toISOString(), month: `${contest.month}-01`, duration_minutes: Number(contest.duration), capacity: contest.capacity ? Number(contest.capacity) : null, rules: contest.rules || null, status: contest.status }).eq('id', selectedContestId).select('id, name, contest_date, month, duration_minutes, capacity, rules, status').single()
    if (updateError) setError(updateError.message)
    else setAvailableContests(availableContests.map((item) => item.id === data.id ? data : item))
    setSaving(false)
  }

  const cancelContest = async () => {
    if (!selectedContestId || !window.confirm('Cancel this contest?')) return
    setSaving(true)
    const { error: cancelError } = await supabase.from('contests').update({ status: 'cancelled', cancelled_at: new Date().toISOString() }).eq('id', selectedContestId)
    if (cancelError) setError(cancelError.message)
    else {
      setAvailableContests(availableContests.filter((item) => item.id !== selectedContestId))
      setSelectedContestId('')
      setStatus('Contest cancelled.')
    }
    setSaving(false)
  }

  const selectContest = (event) => {
    const selected = availableContests.find((item) => item.id === event.target.value)
    setSelectedContestId(event.target.value)
    if (!selected) return
    const date = new Date(selected.contest_date)
    setContest({ name: selected.name, date: date.toISOString().slice(0, 10), time: date.toTimeString().slice(0, 5), month: selected.month.slice(0, 7), duration: String(selected.duration_minutes || 120), capacity: selected.capacity ? String(selected.capacity) : '', rules: selected.rules || '', status: selected.status })
  }

  const exportPreview = () => {
    const header = 'name,student_id,rank,solved_count,penalty,old_rating,rating_change,new_rating'
    const lines = preview.map((row) => [row.full_name, row.studentId, row.rank, row.solvedCount, row.penalty, row.oldRating, row.ratingChange, row.newRating].map((value) => `"${String(value ?? '').replaceAll('"', '""')}"`).join(','))
    const blob = new Blob([[header, ...lines].join('\n')], { type: 'text/csv;charset=utf-8' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'contest-ratings.csv'
    link.click()
    URL.revokeObjectURL(link.href)
  }

  const parseStandings = () => {
    const rows = csv.trim().split('\n').slice(1).map((line) => line.split(',').map((value) => value.trim())).filter((row) => row.length >= 2 && row[0])
    return rows.map(([studentId, rank, solvedCount = '0', penalty = '0']) => ({ studentId, rank: Number(rank), solvedCount: Number(solvedCount), penalty: Number(penalty) })).filter((row) => row.studentId && row.rank > 0)
  }

  const previewRatings = async () => {
    setError('')
    setStatus('')
    const standings = parseStandings()
    if (!selectedContestId || standings.length === 0) {
      setError('Create or select a contest and enter at least one valid standing row.')
      return
    }

    const studentIds = standings.map((row) => row.studentId.toLowerCase())
    const ranks = standings.map((row) => row.rank)
    if (new Set(studentIds).size !== studentIds.length) return setError('The standings contain duplicate student IDs.')
    if (new Set(ranks).size !== ranks.length) return setError('The standings contain duplicate ranks.')

    const { data: profiles, error: profileError } = await supabase.from('profiles').select('id, student_id, full_name')
    if (profiles?.length === 0 && !profileError) return setError('No profiles were returned. Check that your admin user is registered in admin_users and that the admin profile-read policy is enabled.')
    if (profileError) return setError(profileError.message)
    const profileByStudentId = Object.fromEntries((profiles ?? []).map((profile) => [profile.student_id, profile]))
    const allProfiles = profiles ?? []
    const userIds = allProfiles.map((profile) => profile.id)
    const { data: existingRatings, error: ratingError } = await supabase.from('monthly_ratings').select('user_id, rating').in('user_id', userIds).order('month', { ascending: false })
    if (ratingError) return setError(ratingError.message)
    const { data: previousResults, error: resultError } = await supabase.from('contest_results').select('user_id').in('user_id', userIds)
    if (resultError) return setError(resultError.message)
    const latestRating = {}
    for (const rating of existingRatings ?? []) latestRating[rating.user_id] ??= rating.rating
    const contestCounts = (previousResults ?? []).reduce((counts, result) => ({ ...counts, [result.user_id]: (counts[result.user_id] ?? 0) + 1 }), {})
    const participants = standings.map((row) => ({ ...row, ...profileByStudentId[row.studentId], rating: latestRating[profileByStudentId[row.studentId]?.id] ?? 1000, contestsCompleted: contestCounts[profileByStudentId[row.studentId]?.id] ?? 0 })).filter((row) => row.id)
    const participantIds = new Set(participants.map((participant) => participant.id))
    const nonParticipants = allProfiles
      .filter((profile) => !participantIds.has(profile.id))
      .map((profile) => {
        const oldRating = latestRating[profile.id] ?? 1000
        return { ...profile, studentId: profile.student_id, rank: Math.max(...standings.map((row) => row.rank), 0) + 1, solvedCount: 0, penalty: 0, oldRating, ratingChange: -100, newRating: Math.max(0, oldRating - 100), isNonParticipant: true }
      })
    setPreview([...calculateUniversityRatings(participants), ...nonParticipants])
    if (participants.length !== standings.length) setError('Some student IDs were not found in profiles and were excluded.')
  }

  const publishContest = async () => {
    if (preview.length === 0) return
    setSaving(true)
    setError('')
    const rows = preview.map((row) => ({ contest_id: selectedContestId, user_id: row.id, rank: row.rank, solved_count: row.solvedCount, penalty: row.penalty, old_rating: row.oldRating, rating_change: row.ratingChange, new_rating: row.newRating }))
    const { error: resultError } = await supabase.from('contest_results').insert(rows)
    if (!resultError) {
      const selectedContest = availableContests.find((item) => item.id === selectedContestId)
      const monthlyRows = preview.map((row) => ({ user_id: row.id, platform: 'University Contest', month: selectedContest.month, rating: row.newRating, rating_change: row.ratingChange, contest_count: 1, rank: row.rank }))
      const { error: monthlyError } = await supabase.from('monthly_ratings').upsert(monthlyRows, { onConflict: 'user_id,platform,month' })
      if (monthlyError) setError(monthlyError.message)
      else setStatus('Contest published and student ratings updated.')
    } else setError(resultError.message)
    setSaving(false)
  }

  if (loading) return <div className="container auth-loading">Checking your access...</div>
  if (!user) return <Navigate to="/login" replace />
  if (isAdmin === null) return <div className="container auth-loading">Checking your admin access...</div>
  if (!isAdmin) return <Navigate to="/dashboard" replace />

  return (
    <div className="container dashboard-page animate-fade-in">
      <p className="eyebrow">ADMIN CONTEST MANAGER</p>
      <h1>Publish monthly standings</h1>
      <p className="dashboard-subtitle">Create a future contest for registration first. Publish ratings after the contest ends.</p>
      <section className="admin-layout">
        <div className="glass-panel admin-form">
          <label htmlFor="contest-name">Contest name</label>
          <input id="contest-name" value={contest.name} onChange={(event) => setContest({ ...contest, name: event.target.value })} placeholder="September Monthly Contest" />
          <label htmlFor="contest-date">Contest date</label>
          <input id="contest-date" type="date" value={contest.date} onChange={(event) => setContest({ ...contest, date: event.target.value })} />
          <label htmlFor="contest-time">Contest start time</label>
          <input id="contest-time" type="time" value={contest.time} onChange={(event) => setContest({ ...contest, time: event.target.value })} />
          <label htmlFor="contest-duration">Duration (minutes)</label>
          <input id="contest-duration" type="number" min="1" value={contest.duration} onChange={(event) => setContest({ ...contest, duration: event.target.value })} />
          <label htmlFor="contest-capacity">Registration capacity (optional)</label>
          <input id="contest-capacity" type="number" min="1" value={contest.capacity} onChange={(event) => setContest({ ...contest, capacity: event.target.value })} placeholder="Unlimited" />
          <label htmlFor="contest-rules">Contest-specific rules</label>
          <textarea id="contest-rules" value={contest.rules} onChange={(event) => setContest({ ...contest, rules: event.target.value })} rows={3} placeholder="One rule per line" />
          <label htmlFor="contest-status">Status</label>
          <select id="contest-status" value={contest.status} onChange={(event) => setContest({ ...contest, status: event.target.value })}><option value="draft">Draft</option><option value="published">Published</option></select>
          <label htmlFor="contest-month">Rating month</label>
          <input id="contest-month" type="month" value={contest.month} onChange={(event) => setContest({ ...contest, month: event.target.value })} />
          <div className="admin-contest-actions"><button className="btn-secondary" type="button" onClick={createContest} disabled={saving}>Create contest</button><button className="btn-secondary" type="button" onClick={editContest} disabled={saving || !selectedContestId}><Pencil size={16} /> Update selected</button><button className="btn-secondary" type="button" onClick={cancelContest} disabled={saving || !selectedContestId}><Trash2 size={16} /> Cancel selected</button></div>
          <label htmlFor="existing-contest">Contest to rate</label>
          <select id="existing-contest" value={selectedContestId} onChange={selectContest}>
            <option value="">Select a created contest</option>
            {availableContests.map((item) => <option key={item.id} value={item.id}>{item.name} ({new Date(item.contest_date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })})</option>)}
          </select>
          <label htmlFor="standings">Standings CSV</label>
          <textarea id="standings" value={csv} onChange={(event) => setCsv(event.target.value)} rows={10} />
          <p className="dashboard-muted">Format: student_id, rank, solved_count, penalty</p>
          <button className="btn-primary" type="button" onClick={previewRatings}><Calculator size={18} /> Preview ratings</button>
        </div>
        <div className="glass-panel admin-preview">
          <div className="dashboard-card-heading"><Upload size={22} /><h2>Rating preview</h2></div>
          {preview.length === 0 ? <div className="dashboard-empty-state"><span>Preview changes before publishing.</span></div> : <div className="rating-history">{preview.map((row) => <div className="rating-row" key={row.id}><span>{row.full_name || row.studentId}</span><span>{row.oldRating} → <strong>{row.newRating}</strong></span><span className={row.ratingChange >= 0 ? 'rating-positive' : 'rating-negative'}>{row.ratingChange >= 0 ? '+' : ''}{row.ratingChange}</span></div>)}</div>}
          {error && <p className="form-message form-error">{error}</p>}
          {status && <p className="form-message form-success"><CheckCircle2 size={16} /> {status}</p>}
          {preview.length > 0 && <button className="btn-secondary" type="button" onClick={exportPreview}><Download size={17} /> Export preview CSV</button>}
          <button className="btn-primary" type="button" onClick={publishContest} disabled={saving || preview.length === 0}>{saving ? 'Publishing...' : 'Publish ratings'}</button>
        </div>
      </section>
    </div>
  )
}

export default AdminContest
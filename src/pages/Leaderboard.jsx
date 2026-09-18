import { useEffect, useState } from 'react'
import { Filter, Search, Trophy } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { getRatingTier } from '../utils/ratingTier'

const Leaderboard = () => {
  const [profiles, setProfiles] = useState([])
  const [ratings, setRatings] = useState([])
  const [batch, setBatch] = useState('all')
  const [department, setDepartment] = useState('all')
  const [month, setMonth] = useState('latest')
  const [mode, setMode] = useState('university')
  const [search, setSearch] = useState('')
  const [cfRatings, setCfRatings] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadLeaderboard = async () => {
      const [{ data: profileData, error: profileError }, { data: ratingData, error: ratingError }] = await Promise.all([
        supabase.from('public_leaderboard_profiles').select('id, full_name, student_id, department, batch, codeforces_handle'),
        supabase.from('public_university_ratings').select('user_id, month, rating, rating_change, contest_count, platform').order('month', { ascending: false })
      ])
      if (profileError || ratingError) setError(profileError?.message || ratingError?.message || 'Unable to load leaderboard.')
      else {
        setProfiles(profileData ?? [])
        setRatings(ratingData ?? [])
        const handles = (profileData ?? []).map((profile) => profile.codeforces_handle).filter(Boolean)
        if (handles.length) {
          const response = await fetch(`https://codeforces.com/api/user.info?handles=${encodeURIComponent(handles.join(';'))}`)
          const data = await response.json()
          if (data.status === 'OK') setCfRatings(Object.fromEntries(data.result.map((item) => [item.handle.toLowerCase(), item.rating ?? null])))
        }
      }
      setLoading(false)
    }
    loadLeaderboard()
  }, [])

  const months = [...new Set(ratings.map((rating) => rating.month))].sort().reverse()
  const visibleMonth = month === 'latest' ? months[0] : month
  const latestByUser = {}
  for (const rating of ratings) if (rating.month === visibleMonth && !latestByUser[rating.user_id]) latestByUser[rating.user_id] = rating
  const contestCounts = ratings.reduce((counts, rating) => ({ ...counts, [rating.user_id]: (counts[rating.user_id] ?? 0) + (rating.contest_count ?? 0) }), {})
  const rows = profiles.filter((profile) => (batch === 'all' || profile.batch === batch) && (department === 'all' || profile.department === department) && (`${profile.full_name ?? ''} ${profile.student_id ?? ''} ${profile.codeforces_handle ?? ''}`.toLowerCase().includes(search.toLowerCase()))).map((profile) => ({ ...profile, rating: mode === 'codeforces' ? (cfRatings[profile.codeforces_handle?.toLowerCase()] ?? 0) : (latestByUser[profile.id]?.rating ?? 1000), ratingChange: mode === 'codeforces' ? 0 : (latestByUser[profile.id]?.rating_change ?? 0), contestCount: contestCounts[profile.id] ?? 0 })).sort((a, b) => b.rating - a.rating || (a.full_name || '').localeCompare(b.full_name || ''))
  const batches = [...new Set(profiles.map((profile) => profile.batch).filter(Boolean))].sort()
  const departments = [...new Set(profiles.map((profile) => profile.department).filter(Boolean))].sort()

  return (
    <div className="container leaderboard-page animate-fade-in">
      <div className="leaderboard-heading"><div><p className="eyebrow">UNIVERSITY STANDINGS</p><h1>CPWING leaderboard</h1><p className="dashboard-subtitle">See how students are progressing in monthly university contests.</p></div><Trophy className="leaderboard-trophy" size={54} /></div>
      <div className="leaderboard-filters glass-panel"><div className="filter-label"><Filter size={17} /> Filters</div><label>Ranking<select value={mode} onChange={(event) => setMode(event.target.value)}><option value="university">Monthly contest rating</option><option value="codeforces">Codeforces current rating</option></select></label><label className="leaderboard-search"><Search size={15} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, ID, or handle" /></label><label>Batch<select value={batch} onChange={(event) => setBatch(event.target.value)}><option value="all">All batches</option>{batches.map((value) => <option key={value} value={value}>{value}</option>)}</select></label><label>Department<select value={department} onChange={(event) => setDepartment(event.target.value)}><option value="all">All departments</option>{departments.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>{mode === 'university' && <label>Month<select value={month} onChange={(event) => setMonth(event.target.value)}><option value="latest">Latest month</option>{months.map((value) => <option key={value} value={value}>{new Date(`${value}T00:00:00`).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</option>)}</select></label>}</div>
      {loading ? <div className="auth-loading">Loading leaderboard...</div> : error ? <div className="dashboard-empty-state leaderboard-error">{error}</div> : rows.length === 0 ? <div className="dashboard-empty-state">No students match these filters.</div> : <div className="leaderboard-table-wrap glass-panel"><table className="leaderboard-table"><thead><tr><th>Rank</th><th>Student</th><th>Department</th><th>Batch</th><th>{mode === 'university' ? 'Monthly rating' : 'Codeforces rating'}</th><th>Tier</th><th>{mode === 'university' ? 'Change' : 'Handle'}</th><th>Contests</th></tr></thead><tbody>{rows.map((row, index) => { const tier = mode === 'codeforces' && !row.rating ? null : getRatingTier(row.rating); return <tr key={row.id}><td className="leaderboard-rank">{index + 1}</td><td><strong>{row.full_name || 'Unnamed student'}</strong></td><td>{row.department || '-'}</td><td>{row.batch || '-'}</td><td className="leaderboard-rating">{mode === 'codeforces' ? (row.rating || 'Unrated') : row.rating}</td><td>{tier ? <span className="rating-tier" style={{ color: tier.color }}>{tier.name}</span> : 'Unrated'}</td><td className={mode === 'university' ? (row.ratingChange >= 0 ? 'rating-positive' : 'rating-negative') : ''}>{mode === 'university' ? `${row.ratingChange >= 0 ? '+' : ''}${row.ratingChange}` : row.codeforces_handle || '-'}</td><td>{row.contestCount}</td></tr>})}</tbody></table></div>}
    </div>
  )
}

export default Leaderboard
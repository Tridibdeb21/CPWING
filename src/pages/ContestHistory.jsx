import { useEffect, useState } from 'react'
import { ArrowLeft, CalendarDays, History, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { supabase } from '../lib/supabase'

const ContestHistory = () => {
  const { user } = useAuth()
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const loadHistory = async () => {
      const { data, error: queryError } = await supabase.from('contest_results').select('id, rank, solved_count, penalty, old_rating, rating_change, new_rating, contests(name, contest_date, month)').eq('user_id', user.id).order('created_at', { ascending: false })
      if (queryError) setError(queryError.message)
      else setResults(data ?? [])
      setLoading(false)
    }
    loadHistory()
  }, [user.id])

  const visibleResults = results.filter((result) => `${result.contests?.name ?? ''} ${result.rank} ${result.solved_count}`.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="container history-page animate-fade-in">
      <div className="history-heading"><div><p className="eyebrow">YOUR PERFORMANCE</p><h1>Contest history</h1><p className="dashboard-subtitle">Review your university contest results and rating changes.</p></div><History className="history-icon" size={54} /></div>
      <Link className="history-back" to="/dashboard"><ArrowLeft size={16} /> Back to dashboard</Link>
      <label className="history-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search contest history" /></label>
      {loading ? <div className="auth-loading">Loading contest history...</div> : error ? <div className="dashboard-empty-state history-error">{error}</div> : results.length === 0 ? <div className="dashboard-empty-state"><strong>No contest history yet</strong><span>Your results will appear here after an admin publishes a contest.</span></div> : visibleResults.length === 0 ? <div className="dashboard-empty-state"><strong>No matching contests</strong></div> : <div className="history-list">{visibleResults.map((result) => <article className="glass-panel history-card" key={result.id}><div className="history-card-title"><div><h2>{result.contests?.name || 'University contest'}</h2><span><CalendarDays size={15} />{result.contests?.contest_date ? new Date(result.contests.contest_date).toLocaleDateString() : result.contests?.month || 'Date unavailable'}</span></div><div className="history-rank"><small>Rank</small><strong>#{result.rank}</strong></div></div><div className="history-stats"><div><small>Problems solved</small><strong>{result.solved_count}</strong></div><div><small>Penalty</small><strong>{result.penalty}</strong></div><div><small>Rating</small><strong>{result.old_rating} → {result.new_rating}</strong></div><div><small>Change</small><strong className={result.rating_change >= 0 ? 'rating-positive' : 'rating-negative'}>{result.rating_change >= 0 ? '+' : ''}{result.rating_change}</strong></div></div></article>)}</div>}
    </div>
  )
}

export default ContestHistory
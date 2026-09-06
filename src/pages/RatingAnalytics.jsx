import { useEffect, useState } from 'react'
import { ArrowLeft, BarChart3, Flame, Medal, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { supabase } from '../lib/supabase'

const RatingAnalytics = () => {
  const { user } = useAuth()
  const [ratings, setRatings] = useState([])
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadAnalytics = async () => {
      const [{ data: ratingData, error: ratingError }, { data: resultData, error: resultError }] = await Promise.all([
        supabase.from('monthly_ratings').select('month, rating, rating_change').eq('user_id', user.id).eq('platform', 'University Contest').order('month'),
        supabase.from('contest_results').select('rank, contests(month)').eq('user_id', user.id).order('created_at')
      ])
      if (ratingError || resultError) setError(ratingError?.message || resultError?.message || 'Unable to load analytics.')
      else {
        setRatings(ratingData ?? [])
        setResults(resultData ?? [])
      }
      setLoading(false)
    }
    loadAnalytics()
  }, [user.id])

  const bestRank = results.length ? Math.min(...results.map((result) => result.rank)) : '-'
  const averageRank = results.length ? Math.round(results.reduce((total, result) => total + result.rank, 0) / results.length) : '-'
  const participationMonths = new Set(results.map((result) => result.contests?.month).filter(Boolean))
  const maxRating = ratings.length ? Math.max(...ratings.map((rating) => rating.rating)) : 0
  const chartWidth = 760
  const chartHeight = 230
  const chartMin = ratings.length ? Math.min(...ratings.map((rating) => rating.rating)) - 40 : 0
  const chartRange = Math.max(maxRating - chartMin, 1)
  const points = ratings.map((rating, index) => `${ratings.length === 1 ? chartWidth / 2 : (index / (ratings.length - 1)) * chartWidth},${chartHeight - ((rating.rating - chartMin) / chartRange) * (chartHeight - 25)}`).join(' ')

  return <div className="container analytics-page animate-fade-in"><div className="history-heading"><div><p className="eyebrow">PERFORMANCE INSIGHTS</p><h1>Rating analytics</h1><p className="dashboard-subtitle">Understand your progress across university contests.</p></div><BarChart3 className="history-icon" size={54} /></div><Link className="history-back" to="/dashboard"><ArrowLeft size={16} /> Back to dashboard</Link>{loading ? <div className="auth-loading">Loading analytics...</div> : error ? <div className="dashboard-empty-state">{error}</div> : <><section className="analytics-stat-grid"><div className="glass-panel analytics-stat"><Medal size={22} /><span>Best rank</span><strong>#{bestRank}</strong></div><div className="glass-panel analytics-stat"><BarChart3 size={22} /><span>Average rank</span><strong>{averageRank}</strong></div><div className="glass-panel analytics-stat"><Flame size={22} /><span>Participation streak</span><strong>{participationMonths.size} month{participationMonths.size === 1 ? '' : 's'}</strong></div><div className="glass-panel analytics-stat"><TrendingUp size={22} /><span>Personal best</span><strong>{maxRating || '-'}</strong></div></section><section className="analytics-chart-grid"><article className="glass-panel analytics-chart-card"><div className="dashboard-card-heading"><TrendingUp size={22} /><h2>Rating graph</h2></div>{ratings.length === 0 ? <div className="dashboard-empty-state">No rating data yet.</div> : <><div className="line-chart-wrap"><svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-label="Rating history graph" preserveAspectRatio="none"><polyline points={points} fill="none" stroke="var(--accent-blue)" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" /></svg></div><div className="chart-labels">{ratings.map((rating) => <span key={rating.month}>{new Date(`${rating.month}T00:00:00`).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>)}</div></>}</article><article className="glass-panel analytics-chart-card"><div className="dashboard-card-heading"><BarChart3 size={22} /><h2>Monthly change</h2></div>{ratings.length === 0 ? <div className="dashboard-empty-state">No change data yet.</div> : <div className="change-bars">{ratings.map((rating) => <div className="change-bar-item" key={rating.month}><span className={rating.rating_change >= 0 ? 'rating-positive' : 'rating-negative'}>{rating.rating_change >= 0 ? '+' : ''}{rating.rating_change}</span><div className={`change-bar ${rating.rating_change >= 0 ? 'change-bar-positive' : 'change-bar-negative'}`} style={{ height: `${Math.max(12, Math.min(100, Math.abs(rating.rating_change) * 1.5))}%` }} /><small>{new Date(`${rating.month}T00:00:00`).toLocaleDateString('en-US', { month: 'short' })}</small></div>)}</div>}</article></section></>}</div>
}

export default RatingAnalytics
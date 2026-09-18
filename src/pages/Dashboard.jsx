import { createElement, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { supabase } from '../lib/supabase'
import { getRatingTier } from '../utils/ratingTier'
import { Award, BarChart3, Bell, Flame, History, LogOut, Medal, MessageSquare, ShieldCheck, TrendingUp, UserPlus, UserRound } from 'lucide-react'

const Dashboard = () => {
  const { user, signOut } = useAuth()
  const [ratings, setRatings] = useState([])
  const [ratingLoading, setRatingLoading] = useState(true)
  const [ratingError, setRatingError] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [contestResults, setContestResults] = useState([])
  const [profile, setProfile] = useState(null)
  const [registeredContests, setRegisteredContests] = useState([])

  useEffect(() => {
    const loadProfile = async () => {
      const { data } = await supabase.from('profiles').select('full_name, student_id, department, batch, codeforces_handle, avatar_url').eq('id', user.id).maybeSingle()
      setProfile(data)
    }
    loadProfile()
  }, [user.id])

  useEffect(() => {
    const loadRegisteredContests = async () => {
      const { data } = await supabase.from('contest_registrations').select('id, contests(name, contest_date)').eq('user_id', user.id).order('registered_at', { ascending: false })
      setRegisteredContests((data ?? []).filter((registration) => registration.contests && new Date(registration.contests.contest_date) > new Date()))
    }
    loadRegisteredContests()
  }, [user.id])

  useEffect(() => {
    const loadRatings = async () => {
      const { data, error } = await supabase.from('monthly_ratings').select('month, rating, rating_change, contest_count, rank, platform').eq('user_id', user.id).order('month', { ascending: false })
      if (error) setRatingError(error.message)
      else setRatings(data ?? [])
      setRatingLoading(false)
    }

    loadRatings()
  }, [user.id])

  useEffect(() => {
    const loadResults = async () => {
      const { data } = await supabase.from('contest_results').select('rank, rating_change, new_rating, created_at').eq('user_id', user.id).order('created_at', { ascending: true })
      setContestResults(data ?? [])
    }
    loadResults()
  }, [user.id])

  const highestRating = contestResults.length > 0 && contestResults.some((result) => result.new_rating === Math.max(...contestResults.map((item) => item.new_rating)))
  const mostImproved = contestResults.length > 0 && contestResults.some((result) => result.rating_change === Math.max(...contestResults.map((item) => item.rating_change)) && result.rating_change > 0)
  const achievements = [
    { title: 'First contest', description: 'Complete your first contest', unlocked: contestResults.length >= 1, icon: Award },
    { title: 'Top 3 finish', description: 'Finish in the top three', unlocked: contestResults.some((result) => result.rank <= 3), icon: Medal },
    { title: 'Highest rating', description: 'Reach your personal best rating', unlocked: highestRating, icon: TrendingUp },
    { title: 'Most improved', description: 'Earn a positive rating change', unlocked: mostImproved, icon: TrendingUp },
    { title: 'Consistent participation', description: 'Complete three contests', unlocked: contestResults.length >= 3, icon: Flame }
  ]
  const currentRating = ratings[0]?.rating ?? 1000
  const maxRating = ratings.length ? Math.max(...ratings.map((rating) => rating.rating)) : currentRating
  const ratingTier = getRatingTier(currentRating)

  useEffect(() => {
    const checkAdmin = async () => {
      const { data } = await supabase.from('admin_users').select('user_id').eq('user_id', user.id).maybeSingle()
      setIsAdmin(Boolean(data))
    }

    checkAdmin()
  }, [user.id])

  return (
    <div className="container dashboard-page animate-fade-in">
      <section className="profile-summary glass-panel">
        <div className="profile-summary-main">
          <div className="profile-large-avatar">{profile?.avatar_url ? <img src={profile.avatar_url} alt="" /> : <UserRound size={34} />}</div>
          <div><p className="eyebrow">CPWING STUDENT</p><h1>{profile?.full_name || 'Student profile'}</h1><p>{profile?.batch ? `Batch ${profile.batch}` : 'Batch not added'}{profile?.department ? ` · ${profile.department}` : ''}</p></div>
        </div>
        <div className="profile-summary-stats"><div><TrendingUp size={19} /><span>Current rating</span><strong>{currentRating} <em className="rating-tier-inline" style={{ color: ratingTier.color }}>{ratingTier.name}</em></strong></div><div><Award size={19} /><span>Max rating</span><strong>{maxRating}</strong></div><div><UserRound size={19} /><span>Codeforces</span><strong>{profile?.codeforces_handle || 'Not added'}</strong></div></div>
        <div className="profile-registrations"><span>Registered contests</span>{registeredContests.length === 0 ? <small>No upcoming registrations</small> : registeredContests.map((registration) => <div key={registration.id}><strong>{registration.contests.name}</strong><small>{new Date(registration.contests.contest_date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })} · Registered</small></div>)}</div>
      </section>
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">STUDENT DASHBOARD</p>
          <h1>Welcome back</h1>
          <p className="dashboard-subtitle">Your profile and competitive programming progress will live here.</p>
        </div>
        <button className="btn-secondary" type="button" onClick={signOut}><LogOut size={18} /> Sign out</button>
      </div>
      <section className="dashboard-actions">
        <div className="dashboard-section-heading"><span>Quick access</span><small>Keep your contest activity within reach</small></div>
        <div className="dashboard-action-grid">
          <Link className="dashboard-action" to="/contest-history"><History size={19} /><span>Contest history<small>View your results</small></span></Link>
          <Link className="dashboard-action" to="/analytics"><BarChart3 size={19} /><span>Rating analytics<small>Track your progress</small></span></Link>
          <Link className="dashboard-action" to="/contests/register"><UserPlus size={19} /><span>Register for contest<small>Join upcoming events</small></span></Link>
          <Link className="dashboard-action" to="/notifications"><Bell size={19} /><span>Notifications<small>View latest updates</small></span></Link>
          <Link className="dashboard-action" to="/feedback"><MessageSquare size={19} /><span>Send feedback<small>Help improve CPWING</small></span></Link>
          {isAdmin && <Link className="dashboard-action dashboard-action-admin" to="/admin"><ShieldCheck size={19} /><span>Admin dashboard<small>Manage CPWING</small></span></Link>}
        </div>
      </section>

      <section className="dashboard-grid">
        <article className="glass-panel dashboard-card dashboard-profile-card">
          <div className="dashboard-card-heading"><UserRound size={22} /><h2>Personal information</h2></div>
          <p className="dashboard-email">{user.email}</p>
          <p className="dashboard-muted">Your verified student profile is connected to your contest identity.</p>
        </article>
        <article className="glass-panel dashboard-card">
          <div className="dashboard-card-heading"><ShieldCheck size={22} /><h2>Monthly contest rating</h2></div>
          {ratingLoading ? (
            <div className="dashboard-empty-state"><span>Loading rating history...</span></div>
          ) : ratingError ? (
            <div className="dashboard-empty-state"><strong>Unable to load ratings</strong><span>{ratingError}</span></div>
          ) : ratings.length === 0 ? (
            <div className="dashboard-empty-state"><strong>No rating history yet</strong><span>Your university contest ratings will appear here after the admin publishes them.</span></div>
          ) : (
            <div className="rating-history">
              {ratings.map((rating) => (
                <div className="rating-row" key={`${rating.platform}-${rating.month}`}>
                  <span>{new Date(`${rating.month}T00:00:00`).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  <strong>{rating.rating}</strong>
                  <span className={rating.rating_change >= 0 ? 'rating-positive' : 'rating-negative'}>{rating.rating_change >= 0 ? '+' : ''}{rating.rating_change}</span>
                </div>
              ))}
            </div>
          )}
        </article>
      </section>
      <section className="achievements-section"><div className="dashboard-section-heading"><span>Achievements and badges</span><small>Milestones from your contest journey</small></div><div className="achievement-grid">{achievements.map(({ title, description, unlocked, icon }) => <div className={`achievement-badge ${unlocked ? 'achievement-unlocked' : ''}`} key={title}>{createElement(icon, { size: 22 })}<div><strong>{title}</strong><span>{unlocked ? 'Unlocked' : description}</span></div></div>)}</div></section>
    </div>
  )
}

export default Dashboard
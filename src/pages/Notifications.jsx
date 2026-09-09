import { createElement, useEffect, useState } from 'react'
import { Bell, CalendarDays, CheckCircle2, MessageSquare, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { supabase } from '../lib/supabase'
import { markMessagesRead } from '../utils/notificationReadState'

const Notifications = () => {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadNotifications = async () => {
      const [contests, ratings, messages] = await Promise.all([
        supabase.from('contests').select('id, name, contest_date, created_at').eq('status', 'published').order('created_at', { ascending: false }).limit(10),
        supabase.from('monthly_ratings').select('id, month, rating, rating_change, calculated_at').eq('user_id', user.id).eq('platform', 'University Contest').order('calculated_at', { ascending: false }).limit(10),
        supabase.from('admin_messages').select('id, title, message, created_at').or(`recipient_id.is.null,recipient_id.eq.${user.id}`).order('created_at', { ascending: false }).limit(10)
      ])
      const queryError = contests.error || ratings.error || messages.error
      if (queryError) setError(queryError.message)
      else {
        markMessagesRead(user.id, (messages.data ?? []).map((message) => message.id))
        const contestNotifications = (contests.data ?? []).map((contest) => ({ id: `contest-${contest.id}`, type: 'contest', title: 'New contest announcement', detail: contest.name, date: contest.created_at, icon: Trophy, link: '/contests/register' }))
        const ratingNotifications = (ratings.data ?? []).map((rating) => ({ id: `rating-${rating.id}`, type: 'rating', title: 'Rating published', detail: `Your rating is ${rating.rating} (${rating.rating_change >= 0 ? '+' : ''}${rating.rating_change})`, date: rating.calculated_at, icon: CheckCircle2, link: '/analytics' }))
        const messageNotifications = (messages.data ?? []).map((message) => ({ id: `message-${message.id}`, type: 'message', title: 'Admin suggestion received', detail: message.title, date: message.created_at, icon: MessageSquare, link: '/dashboard' }))
        const deadlineNotifications = (contests.data ?? []).filter((contest) => new Date(contest.contest_date) > new Date()).map((contest) => ({ id: `deadline-${contest.id}`, type: 'deadline', title: 'Contest registration deadline', detail: `${contest.name} starts ${new Date(contest.contest_date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}`, date: contest.created_at, icon: CalendarDays, link: '/contests/register' }))
        setNotifications([...contestNotifications, ...ratingNotifications, ...messageNotifications, ...deadlineNotifications].sort((a, b) => new Date(b.date) - new Date(a.date)))
      }
      setLoading(false)
    }
    loadNotifications()
  }, [user.id])

  return <div className="container notifications-page animate-fade-in"><div className="history-heading"><div><p className="eyebrow">STAY IN THE LOOP</p><h1>Notifications</h1><p className="dashboard-subtitle">Contest announcements, rating updates, and messages from CPWING.</p></div><Bell className="history-icon" size={54} /></div><Link className="history-back" to="/dashboard">Back to dashboard</Link>{loading ? <div className="auth-loading">Loading notifications...</div> : error ? <div className="dashboard-empty-state">{error}</div> : notifications.length === 0 ? <div className="dashboard-empty-state"><strong>You are all caught up</strong><span>New updates will appear here.</span></div> : <div className="notification-list">{notifications.map((notification) => <Link className={`glass-panel notification-item notification-${notification.type}`} to={notification.link} key={notification.id}><span className="notification-icon">{createElement(notification.icon, { size: 19 })}</span><span className="notification-content"><strong>{notification.title}</strong><span>{notification.detail}</span><time>{new Date(notification.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</time></span></Link>)}</div>}</div>
}

export default Notifications
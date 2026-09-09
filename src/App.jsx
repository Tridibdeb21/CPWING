import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Bell, ExternalLink, MessageCircle, Terminal, Map, Trophy, BookOpen, Menu, X, Sun, Moon, Layers, Globe, Heart, Swords, PenTool, UserRound } from 'lucide-react'
import { AuthProvider } from './context/AuthProvider'
import { useAuth } from './context/useAuth'
import ProtectedRoute from './components/ProtectedRoute'
import { supabase } from './lib/supabase'
import { getReadMessageIds, markMessagesRead } from './utils/notificationReadState'

// Layout Component
const Navbar = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [profile, setProfile] = React.useState(null);
  const [latestRating, setLatestRating] = React.useState(null);
  const [chatOpen, setChatOpen] = React.useState(false);
  const [mobileAccountOpen, setMobileAccountOpen] = React.useState(false);
  const [chatMessages, setChatMessages] = React.useState([]);
  const [unreadMessageCount, setUnreadMessageCount] = React.useState(0);
  const location = useLocation();
  const { user } = useAuth();

  React.useEffect(() => {
    setIsOpen(false);
    setChatOpen(false);
    setMobileAccountOpen(false);
  }, [location.pathname]);

  React.useEffect(() => {
    if (!user) {
      setProfile(null)
      setLatestRating(null)
      setChatMessages([])
      setUnreadMessageCount(0)
      return
    }

    const loadAccountSummary = async () => {
      const [{ data: profileData }, { data: ratingData }] = await Promise.all([
        supabase.from('profiles').select('full_name, student_id, department, batch, codeforces_handle, avatar_url, github_url, linkedin_url, skills, interests').eq('id', user.id).maybeSingle(),
        supabase.from('monthly_ratings').select('rating, rating_change, month').eq('user_id', user.id).order('month', { ascending: false }).limit(1).maybeSingle()
      ])
      setProfile(profileData)
      setLatestRating(ratingData)
      const { data: messages } = await supabase.from('admin_messages').select('id, title, message, created_at').or(`recipient_id.is.null,recipient_id.eq.${user.id}`).order('created_at', { ascending: true }).limit(50)
      setChatMessages(messages ?? [])
      setUnreadMessageCount((messages ?? []).filter((message) => !getReadMessageIds(user.id).has(message.id)).length)
    }

    loadAccountSummary()
  }, [user]);

  React.useEffect(() => {
    const handleMessagesRead = (event) => {
      if (event.detail?.userId === user?.id) setUnreadMessageCount(0)
    }
    window.addEventListener('cpwing:messages-read', handleMessagesRead)
    return () => window.removeEventListener('cpwing:messages-read', handleMessagesRead)
  }, [user?.id])

  const toggleChat = () => {
    setChatOpen((open) => {
      if (!open && user) {
        markMessagesRead(user.id, chatMessages.map((message) => message.id))
        setUnreadMessageCount(0)
      }
      return !open
    })
    setIsOpen(false)
  }

  const navLinks = [
    { name: 'Home', path: '/', icon: <Terminal size={18} /> },
    { name: 'Learn', path: '/learn', icon: <BookOpen size={18} /> },
    { name: 'Roadmap', path: '/roadmap', icon: <Map size={18} /> },
    { name: 'Online Judges', path: '/online-judges', icon: <Trophy size={18} /> },
    { name: 'Leaderboard', path: '/leaderboard', icon: <Trophy size={18} /> },
    { name: 'Contest History', path: '/contest-history', icon: <Trophy size={18} /> },
    { name: 'Rating Analytics', path: '/analytics', icon: <Trophy size={18} /> },
    { name: 'Notifications', path: '/notifications', icon: <Bell size={18} /> },
    { name: 'Feedback', path: '/feedback', icon: <MessageCircle size={18} /> },
    { name: 'Register Contest', path: '/contests/register', icon: <Trophy size={18} /> },
    { name: 'Blitz', path: '/blitz', icon: <Swords size={18} /> },
    { name: 'Resources', path: '/resources', icon: <Globe size={18} /> },
    { name: 'Whiteboard', path: '/whiteboard', icon: <PenTool size={18} /> },
    { name: 'Gallery', path: '/gallery', icon: <Layers size={18} /> },
    { name: 'Motivation', path: '/motivation', icon: <Heart size={18} /> },
  ];

  const primaryMobileLinks = navLinks.slice(0, 3);
  const secondaryMobileLinks = navLinks.slice(3);
  const primaryDesktopLinks = navLinks.filter(link => ['/','/learn','/roadmap','/leaderboard'].includes(link.path));
  const secondaryDesktopLinks = navLinks.filter(link => !primaryDesktopLinks.includes(link));

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'var(--glass-bg)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--glass-border)', padding: '1rem 0',
      transition: 'background-color 0.4s ease'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '800', fontSize: '1.25rem' }}>
          <img src="/logo.png" alt="ZeroCP Logo" style={{ width: '44px', height: '44px', objectFit: 'contain' }} />
          <span className="text-gradient brand-text">ZeroCP</span>
        </Link>
        
        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: '1.25rem' }} className="desktop-nav">
          {primaryDesktopLinks.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <Link key={link.path} to={link.path} style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
                fontWeight: isActive ? '600' : '500',
                transition: 'color 0.2s ease'
              }}>
                {link.icon}
                {link.name}
              </Link>
            )
          })}

          <div className="desktop-more-menu">
            <button className="desktop-more-trigger" onClick={() => { setIsOpen(prev => !prev); setChatOpen(false) }} aria-expanded={isOpen}>
              <Menu size={17} /> More
            </button>
            {isOpen && <div className="desktop-more-dropdown">{secondaryDesktopLinks.map(link => <Link className="nav-link-with-badge" key={link.path} to={link.path}>{link.icon}{link.name}{link.path === '/notifications' && unreadMessageCount > 0 && <span className="chat-count">{unreadMessageCount}</span>}</Link>)}</div>}
          </div>

          <div className="account-menu">
            <Link to={user ? '/dashboard' : '/login'} aria-label={user ? 'Open dashboard' : 'Sign in'} title={user ? 'Dashboard' : 'Sign in'} style={{ color: location.pathname === '/dashboard' ? 'var(--accent-blue)' : 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}>
              {profile?.avatar_url ? <img className="account-avatar" src={profile.avatar_url} alt="" /> : <UserRound size={19} />}
            </Link>
            {user && (
              <div className="account-popover" role="status">
                <p className="account-popover-label">STUDENT PROFILE</p>
                <strong>{profile?.full_name || 'Profile not completed'}</strong>
                <span>{profile?.student_id || user.email}</span>
                {profile?.department && <span>{profile.department}{profile.batch ? ` · Batch ${profile.batch}` : ''}</span>}
                {profile?.codeforces_handle && <span>CF: {profile.codeforces_handle}</span>}
                {profile?.skills && <span>Skills: {profile.skills}</span>}
                {profile?.interests && <span>Interests: {profile.interests}</span>}
                {(profile?.github_url || profile?.linkedin_url) && <div className="account-socials">{profile.github_url && <a href={profile.github_url} target="_blank" rel="noreferrer" aria-label="GitHub profile">GitHub <ExternalLink size={13} /></a>}{profile.linkedin_url && <a href={profile.linkedin_url} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">LinkedIn <ExternalLink size={13} /></a>}</div>}
                {latestRating && <div className="account-rating"><span>Latest university rating</span><strong>{latestRating.rating} <em className={latestRating.rating_change >= 0 ? 'rating-positive' : 'rating-negative'}>{latestRating.rating_change >= 0 ? '+' : ''}{latestRating.rating_change}</em></strong></div>}
                <Link className="account-popover-link" to="/profile">Edit profile</Link>
              </div>
            )}
          </div>

          {user && <div className="chat-menu"><button className="nav-icon-button" type="button" onClick={toggleChat} aria-label="Open CPWING chat" title="CPWING chat"><MessageCircle size={19} />{unreadMessageCount > 0 && <span className="chat-count">{unreadMessageCount}</span>}</button>{chatOpen && <div className="chat-popover"><div className="chat-popover-header"><strong>CPWING chat</strong><button type="button" onClick={() => setChatOpen(false)} aria-label="Close chat"><X size={16} /></button></div><div className="chat-popover-thread">{chatMessages.length === 0 ? <p className="chat-empty">No messages yet.</p> : chatMessages.map(item => <div className="chat-popover-message" key={item.id}><strong>{item.title}</strong><span>{item.message}</span><time>{new Date(item.created_at).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</time></div>)}</div><Link className="chat-popover-footer" to="/notifications" onClick={() => setChatOpen(false)}>View all updates</Link></div>}</div>}
          
          <button onClick={toggleTheme} style={{ 
            background: 'rgba(128, 128, 128, 0.1)', border: '1px solid var(--glass-border)', 
            color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', 
            alignItems: 'center', padding: '0.5rem', borderRadius: '50%',
            transition: 'all 0.2s ease' 
          }}>
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>

        <div className="mobile-actions" style={{ alignItems: 'center', gap: '0.75rem' }}>
          <div className="mobile-account-menu">
            <button className="nav-icon-button" type="button" onClick={() => setMobileAccountOpen((open) => !open)} aria-expanded={mobileAccountOpen} aria-label={user ? 'Open account menu' : 'Sign in'} title={user ? 'Account menu' : 'Sign in'}>
              {profile?.avatar_url ? <img className="account-avatar" src={profile.avatar_url} alt="" /> : <UserRound size={19} />}
            </button>
            {mobileAccountOpen && <div className="mobile-account-popover">
              <Link to={user ? '/dashboard' : '/login'} onClick={() => setMobileAccountOpen(false)}>{user ? 'Dashboard' : 'Sign in'}</Link>
              {user && <Link to="/profile" onClick={() => setMobileAccountOpen(false)}>Edit profile</Link>}
            </div>}
          </div>
          {user && <div className="mobile-chat-menu"><button className="nav-icon-button" type="button" onClick={toggleChat} aria-label="Open CPWING chat" title="CPWING chat"><MessageCircle size={19} />{unreadMessageCount > 0 && <span className="chat-count">{unreadMessageCount}</span>}</button>{chatOpen && <div className="chat-popover mobile-chat-popover"><div className="chat-popover-header"><strong>CPWING chat</strong><button type="button" onClick={() => setChatOpen(false)} aria-label="Close chat"><X size={16} /></button></div><div className="chat-popover-thread">{chatMessages.length === 0 ? <p className="chat-empty">No messages yet.</p> : chatMessages.map(item => <div className="chat-popover-message" key={item.id}><strong>{item.title}</strong><span>{item.message}</span><time>{new Date(item.created_at).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</time></div>)}</div><Link className="chat-popover-footer" to="/notifications" onClick={() => setChatOpen(false)}>View all updates</Link></div>}</div>}
          <button onClick={toggleTheme} style={{
            background: 'rgba(128, 128, 128, 0.1)', border: '1px solid var(--glass-border)',
            color: 'var(--text-primary)', cursor: 'pointer', display: 'flex',
            alignItems: 'center', padding: '0.5rem', borderRadius: '50%'
          }} aria-label="Toggle theme">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>

      <div className="mobile-quick-links" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', overflowX: 'auto', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
          {primaryMobileLinks.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <Link key={link.path} to={link.path} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap',
                color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
                border: `1px solid ${isActive ? 'var(--accent-blue)' : 'var(--glass-border)'}`,
                borderRadius: '999px', padding: '0.4rem 0.7rem', fontSize: '0.9rem', fontWeight: '600'
              }}>
                {link.icon}
                {link.name}
              </Link>
            )
          })}

          <button onClick={() => setIsOpen(prev => !prev)} style={{
            background: 'rgba(128, 128, 128, 0.12)', border: '1px solid var(--glass-border)',
            color: 'var(--text-primary)', cursor: 'pointer', display: 'inline-flex', whiteSpace: 'nowrap',
            alignItems: 'center', gap: '0.35rem', padding: '0.45rem 0.75rem', borderRadius: '999px', fontWeight: '600'
          }} aria-label="Show more menu">
            {isOpen ? <X size={16} /> : <Menu size={16} />} More
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mobile-drawer" style={{ borderTop: '1px solid var(--glass-border)' }}>
          <div className="container" style={{ display: 'flex', flexDirection: 'column', paddingTop: '0.75rem', paddingBottom: '0.75rem', gap: '0.25rem' }}>
            {secondaryMobileLinks.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link key={link.path} to={link.path} style={{
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                  color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
                  fontWeight: isActive ? '600' : '500',
                  padding: '0.7rem 0.4rem'
                }}>
                  {link.icon}
                  {link.name}
                </Link>
              )
            })}
          </div>
        </div>
      )}

      <style>{`
        .desktop-nav { display: flex; }
        .mobile-drawer { display: none; }
        .mobile-actions { display: none; }
        .mobile-quick-links { display: none; }
        @media (max-width: 768px) { .desktop-nav { display: none !important; } }
        @media (max-width: 768px) { .mobile-actions { display: flex !important; } }
        @media (max-width: 768px) { .mobile-quick-links { display: block !important; } }
        @media (max-width: 768px) { .mobile-drawer { display: block; } }
        @media (max-width: 420px) { .brand-text { display: none !important; } }
      `}</style>
    </nav>
  )
}

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

const Footer = () => (
  <footer style={{ borderTop: '1px solid var(--glass-border)', padding: '3rem 0', marginTop: 'auto' }}>
    <div className="container" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
      <p>© {new Date().getFullYear()} Premier University Computer Club - Competitive Programming Wing.</p>
      <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Empowering students to solve the unsolvable.</p>
      <p style={{ fontSize: '0.875rem', marginTop: '1rem' }}>
        Developers: <a href="https://codeforces.com/profile/ELSE_IF_TRIDIB21" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>Tridib</a> & <a href="https://codeforces.com/profile/Abdullah_78" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>Abdullah</a>
      </p>
    </div>
  </footer>
)

// Pages
import Home from './pages/Home'
import TopicDetail from './pages/TopicDetail'
import Resources from './pages/Resources'
import Gallery from './pages/Gallery'
import Learn from './pages/Learn'
import Motivation from './pages/Motivation'
import Roadmap from './pages/Roadmap'
import RoadmapDetail from './pages/RoadmapDetail'
import Blitz from './pages/Blitz'
import Level0 from './pages/Level0'
import Level1 from './pages/Level1'
import OnlineJudges from './pages/OnlineJudges'
import Contests from './pages/Contests'
import Whiteboard from './pages/Whiteboard'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import AdminContest from './pages/AdminContest'
import AdminMessages from './pages/AdminMessages'
import Leaderboard from './pages/Leaderboard'
import ContestHistory from './pages/ContestHistory'
import AdminDashboard from './pages/AdminDashboard'
import ContestRegistration from './pages/ContestRegistration'
import AdminRegistrations from './pages/AdminRegistrations'
import RatingAnalytics from './pages/RatingAnalytics'
import Notifications from './pages/Notifications'
import AdminNotices from './pages/AdminNotices'
import Feedback from './pages/Feedback'
import AdminFeedback from './pages/AdminFeedback'

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    // Set dark mode as default in localStorage
    localStorage.setItem('theme', 'dark');
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <AuthProvider>
      <Router>
      <ScrollToTop />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/whiteboard" element={<Whiteboard />} />
            <Route path="/online-judges" element={<OnlineJudges />} />
            <Route path="/contests" element={<Contests />} />
            <Route path="/level0" element={<Level0 />} />
            <Route path="/level1" element={<Level1 />} />
            <Route path="/blitz" element={<Blitz />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/motivation" element={<Motivation />} />
            <Route path="/roadmap/:phaseId" element={<RoadmapDetail />} />
            <Route path="/topic/:topicId" element={<TopicDetail />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/contest-history" element={<ContestHistory />} />
              <Route path="/analytics" element={<RatingAnalytics />} />
                            <Route path="/notifications" element={<Notifications />} />
                            <Route path="/feedback" element={<Feedback />} />
              <Route path="/contests/register" element={<ContestRegistration />} />
                <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/registrations" element={<AdminRegistrations />} />
                <Route path="/admin/contest" element={<AdminContest />} />
                <Route path="/admin/messages" element={<AdminMessages />} />
                <Route path="/admin/notices" element={<AdminNotices />} />
                            <Route path="/admin/feedback" element={<AdminFeedback />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
      </Router>
    </AuthProvider>
  )
}

export default App

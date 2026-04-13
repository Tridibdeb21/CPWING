import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Terminal, Map, Trophy, BookOpen, Menu, X, Sun, Moon, Layers, Globe, Heart } from 'lucide-react'

// Layout Component
const Navbar = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Terminal size={18} /> },
    { name: 'Learn', path: '/learn', icon: <BookOpen size={18} /> },
    { name: 'Roadmap', path: '/roadmap', icon: <Map size={18} /> },
    { name: 'Online Judges', path: '/online-judges', icon: <Trophy size={18} /> },
    { name: 'Resources', path: '/resources', icon: <Globe size={18} /> },
    { name: 'Gallery', path: '/gallery', icon: <Layers size={18} /> },
    { name: 'Motivation', path: '/motivation', icon: <Heart size={18} /> },
  ];

  const primaryMobileLinks = navLinks.slice(0, 3);
  const secondaryMobileLinks = navLinks.slice(3);

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
        <div style={{ display: 'flex', gap: '2rem' }} className="desktop-nav">
          {navLinks.map(link => {
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
        .mobile-actions { display: none; }
        .mobile-quick-links { display: none; }
        @media (max-width: 768px) { .desktop-nav { display: none !important; } }
        @media (max-width: 768px) { .mobile-actions { display: flex !important; } }
        @media (max-width: 768px) { .mobile-quick-links { display: block !important; } }
        @media (max-width: 420px) { .brand-text { display: none !important; } }
      `}</style>
    </nav>
  )
}

const Footer = () => (
  <footer style={{ borderTop: '1px solid var(--glass-border)', padding: '3rem 0', marginTop: 'auto' }}>
    <div className="container" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
      <p>© {new Date().getFullYear()} Premier University Computer Club - Competitive Programming Wing.</p>
      <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Empowering students to solve the unsolvable.</p>
    </div>
  </footer>
)

// Pages
import Home from './pages/Home'
import Roadmap from './pages/Roadmap'
import TopicDetail from './pages/TopicDetail'
import Resources from './pages/Resources'
import OnlineJudges from './pages/OnlineJudges'
import Gallery from './pages/Gallery'
import Learn from './pages/Learn'
import Motivation from './pages/Motivation'
import RoadmapDetail from './pages/RoadmapDetail'

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/online-judges" element={<OnlineJudges />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/motivation" element={<Motivation />} />
            <Route path="/roadmap/:phaseId" element={<RoadmapDetail />} />
            <Route path="/topic/:topicId" element={<TopicDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

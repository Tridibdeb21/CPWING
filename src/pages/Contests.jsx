import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ExternalLink, AlertCircle } from 'lucide-react';

const Contests = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContests();
  }, []);

  const fetchContests = async () => {
    try {
      setLoading(true);
      let allContests = [];

      // Fetch Codeforces contests
      try {
        const cfResponse = await fetch('https://codeforces.com/api/contest.list?gym=false');
        const cfData = await cfResponse.json();
        
        if (cfData.status === 'OK') {
          const now = Math.floor(Date.now() / 1000);
          const cfContests = cfData.result
            .filter(contest => contest.startTimeSeconds > now)
            .map(contest => ({
              ...contest,
              platform: 'Codeforces',
              platformUrl: `https://codeforces.com/contests/${contest.id}`
            }));
          
          allContests.push(...cfContests);
        }
      } catch (err) {
        console.error('Error fetching Codeforces:', err);
      }



      // Sort by start time and slice top 15
      const sortedContests = allContests
        .sort((a, b) => a.startTimeSeconds - b.startTimeSeconds)
        .slice(0, 15);

      setContests(sortedContests);
      setError(null);
    } catch (err) {
      console.error('Error fetching contests:', err);
      setError('Failed to fetch contests. Please try again later.');
      setContests([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    });
  };

  const getDurationInMinutes = (seconds) => {
    return Math.floor(seconds / 60);
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getContestTypeColor = (contestName) => {
    if (contestName.includes('Div. 1')) return '#FF6B6B';
    if (contestName.includes('Div. 2')) return '#4ECDC4';
    if (contestName.includes('Div. 3')) return '#95E1D3';
    if (contestName.includes('Div. 4')) return '#FFD93D';
    return '#1F8ACB';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', marginBottom: '1rem' }}>
          <span className="text-gradient">Upcoming CF Contest</span>
        </h1>
        <p style={{ fontSize: 'clamp(1rem, 3.6vw, 1.25rem)', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 2rem' }}>
          Stay updated with upcoming Codeforces contests. Click on any contest to register and participate.
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ 
            display: 'inline-block',
            width: '40px',
            height: '40px',
            border: '4px solid var(--glass-border)',
            borderTop: '4px solid var(--accent-blue)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Loading upcoming CF contests...</p>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      ) : error ? (
        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto', 
          padding: '2rem', 
          background: 'rgba(255, 107, 107, 0.1)', 
          border: '1px solid rgba(255, 107, 107, 0.3)', 
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <AlertCircle size={24} style={{ color: '#FF6B6B' }} />
          <div style={{ textAlign: 'left', color: 'var(--text-primary)' }}>
            <p style={{ margin: 0, fontWeight: 'bold' }}>Unable to Load Contests</p>
            <p style={{ margin: '0.5rem 0 0', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
              {error}
            </p>
          </div>
        </div>
      ) : contests.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem',
          color: 'var(--text-secondary)'
        }}>
          <p>No upcoming CF contests found at the moment.</p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: '1000px', margin: '0 auto' }}
        >
          {contests.map((contest, idx) => (
            <motion.a
              key={contest.id}
              href={contest.platformUrl}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className="glass-panel"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.5rem',
                marginBottom: '1rem',
                textDecoration: 'none',
                color: 'var(--text-primary)',
                transition: 'all 0.3s ease',
                borderLeft: `4px solid ${getContestTypeColor(contest.name)}`,
                cursor: 'pointer'
              }}
              whileHover={{ x: 5 }}
            >
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                  {contest.name}
                </h3>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    <Calendar size={16} />
                    <span>{formatDate(contest.startTimeSeconds)}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    <Clock size={16} />
                    <span>{formatTime(contest.startTimeSeconds)}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    <span style={{ fontWeight: '600' }}>Duration:</span>
                    <span>{formatDuration(contest.durationSeconds)}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '1rem' }}>
                <span style={{ 
                  background: `${getContestTypeColor(contest.name)}20`,
                  color: getContestTypeColor(contest.name),
                  padding: '0.5rem 1rem',
                  borderRadius: '999px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  whiteSpace: 'nowrap'
                }}>
                  Codeforces
                </span>
                <ExternalLink size={20} style={{ color: getContestTypeColor(contest.name), flexShrink: 0 }} />
              </div>
            </motion.a>
          ))}
        </motion.div>
      )}

      <div style={{ 
        maxWidth: '1000px',
        margin: '3rem auto 0',
        padding: '1.5rem',
        background: 'rgba(3, 180, 188, 0.08)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--text-secondary)',
        fontSize: '0.95rem',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0 }}>
          💡 Tip: Register early to avoid any issues. Make sure to check the contest rules and division eligibility before participating!
        </p>
      </div>
    </div>
  );
};

export default Contests;

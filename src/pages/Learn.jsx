import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { guideData } from './guideData';

const Learn = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="container animate-fade-in learn-page" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
      <div className="learn-hero" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', marginBottom: '1rem' }}><span className="text-gradient">Beginner's Guide</span></h1>
        <p style={{ fontSize: 'clamp(1rem, 3.6vw, 1.25rem)', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
          Everything you need to know to kickstart your competitive programming journey, broken down into simple, manageable topics.
        </p>
        <div style={{ marginTop: '1.25rem' }}>
          <Link to="/whiteboard" className="btn-secondary" style={{ padding: '0.8rem 1.2rem', fontWeight: '600' }}>
            Open Dry Run Whiteboard
          </Link>
        </div>
      </div>

      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        animate="visible" 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.5rem', 
          maxWidth: '1200px', 
          margin: '0 auto' 
        }}
      >
        {guideData.map((item, idx) => (
          <motion.div key={item.id} variants={itemVariants}>
            <Link to={`/topic/${item.id}`} className="glass-panel row-link" style={{ 
              display: 'block', 
              padding: 'clamp(1.2rem, 4.5vw, 2.5rem)',
              textDecoration: 'none'
            }}>
              <span className="topic-kicker">Topic {idx + 1}</span>
              <h3 style={{ fontSize: 'clamp(1.25rem, 5vw, 1.75rem)', color: 'var(--text-primary)', margin: '0 0 0.75rem 0', transition: 'color 0.2s' }} className="row-title">
                {item.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.7', fontSize: '1.1rem' }}>
                {item.summary}
              </p>
              <div className="row-cta" style={{ color: 'var(--accent-blue)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '1.05rem' }}>
                Start Learning This Topic →
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <style>{`
        .learn-page {
          font-family: 'Plus Jakarta Sans', 'Inter', 'Segoe UI', sans-serif;
        }
        .learn-hero h1 {
          font-family: 'Sora', 'Plus Jakarta Sans', 'Inter', sans-serif;
          letter-spacing: -0.02em;
        }
        .row-link {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .row-link::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, rgba(255, 144, 114, 0.07), rgba(3, 180, 188, 0.08));
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .row-link:hover {
          border-color: var(--accent-blue) !important;
          background: rgba(59, 130, 246, 0.08) !important;
          transform: translateX(10px) scale(1.005);
        }
        .row-link:hover::before {
          opacity: 1;
        }
        .row-link:hover .row-title {
          color: var(--accent-blue) !important;
        }
        .row-link > * {
          position: relative;
          z-index: 1;
        }
        .topic-kicker {
          display: inline-flex;
          margin-bottom: 0.85rem;
          font-size: 0.82rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 700;
          color: #ffd4c9;
          background: rgba(255, 144, 114, 0.2);
          border: 1px solid rgba(255, 144, 114, 0.35);
          border-radius: 999px;
          padding: 0.32rem 0.68rem;
        }
        [data-theme='light'] .topic-kicker {
          color: #bf4b30;
          background: rgba(255, 144, 114, 0.16);
        }
        .row-cta {
          width: fit-content;
        }
        .row-link:hover .row-cta {
          transform: translateX(2px);
        }
      `}</style>
    </div>
  );
};

export default Learn;

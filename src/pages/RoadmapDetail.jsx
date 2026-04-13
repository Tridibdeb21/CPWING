import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { roadmapData } from './roadmapData';

const RoadmapDetail = () => {
  const { phaseId } = useParams();
  const phase = roadmapData.find(p => p.id === phaseId);

  if (!phase) {
    return <Navigate to="/roadmap" />;
  }

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '4rem', paddingBottom: '6rem', maxWidth: '1200px' }}>
      <Link to="/roadmap" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '2rem', transition: 'color 0.2s' }} className="hover-white">
        <ArrowLeft size={20} /> Back to Roadmap
      </Link>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel roadmap-detail-content"
      >
        <div style={{ marginBottom: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--accent-blue)', marginBottom: '0.5rem' }}>
            {phase.title}
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>{phase.description}</p>
        </div>
        
        <div className="markdown-body">
          <ReactMarkdown>{phase.elaborateContent}</ReactMarkdown>
        </div>
      </motion.div>

      <style>{`
        .hover-white:hover { color: var(--accent-blue) !important; }
        
        .markdown-body {
          color: var(--text-secondary);
          font-size: 1.125rem;
          line-height: 1.8;
        }

        .markdown-body h2 {
          color: var(--text-primary);
          font-size: 2rem;
          margin: 3rem 0 1.5rem 0;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(88, 166, 255, 0.2);
        }

        .markdown-body h3 {
          color: var(--accent-blue);
          font-size: 1.5rem;
          margin: 2rem 0 1rem 0;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .markdown-body h4 {
          color: #FF9072;
          font-size: 1.15rem;
          margin: 1.5rem 0 0.5rem;
          font-weight: 600;
        }

        .markdown-body p {
          margin-bottom: 1.5rem;
        }

        .markdown-body p strong {
          color: var(--text-primary);
          font-weight: 600;
        }

        .markdown-body ul {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }

        .markdown-body li {
          margin-bottom: 0.75rem;
          position: relative;
        }

        .markdown-body li::before {
          content: '•';
          color: var(--accent-blue);
          position: absolute;
          left: -1.25rem;
          font-weight: bold;
        }

        .markdown-body hr {
          border: none;
          border-top: 1px solid rgba(88, 166, 255, 0.15);
          margin: 2.5rem 0;
        }

        /* ── Tables ── */
        .markdown-body table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0 2rem;
          font-size: 1rem;
        }
        .markdown-body th {
          background: rgba(88, 166, 255, 0.12);
          color: #58a6ff;
          padding: 0.75rem 1rem;
          text-align: left;
          border: 1px solid rgba(88, 166, 255, 0.2);
          font-weight: 700;
        }
        .markdown-body td {
          padding: 0.65rem 1rem;
          border: 1px solid rgba(120,120,180,0.15);
          color: var(--text-secondary);
        }
        .markdown-body tr:nth-child(even) td {
          background: rgba(255,255,255,0.03);
        }

        /* ── Code blocks: ALWAYS dark — never affected by theme ── */
        .markdown-body pre {
          background: #0d1117 !important;
          border: 1px solid #30363d !important;
          border-radius: 12px;
          padding: 1.5rem 1.75rem;
          margin: 1.5rem 0 2rem;
          overflow-x: auto;
          position: relative;
          box-shadow: 0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06);
        }

        /* "C++" badge on every code block */
        .markdown-body pre::before {
          content: 'C++';
          position: absolute;
          top: 0.55rem;
          right: 1rem;
          font-size: 0.7rem;
          font-family: 'Courier New', monospace;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #58a6ff;
          opacity: 0.6;
          text-transform: uppercase;
        }

        .markdown-body pre code {
          background: transparent !important;
          padding: 0 !important;
          border: none !important;
          font-family: 'Fira Code', 'JetBrains Mono', 'Courier New', monospace;
          font-size: 0.91rem;
          line-height: 1.75;
          color: #e6edf3 !important;
          display: block;
          white-space: pre;
        }

        /* ── Inline code: dark pill always ── */
        .markdown-body code:not(pre code) {
          font-family: 'Fira Code', 'JetBrains Mono', 'Courier New', monospace;
          background: #161b22 !important;
          color: #79c0ff !important;
          border: 1px solid #30363d;
          padding: 0.15rem 0.45rem;
          border-radius: 6px;
          font-size: 0.88em;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default RoadmapDetail;

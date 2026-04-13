import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { guideData } from './guideData';

const TopicDetail = () => {
  const { topicId } = useParams();
  const topic = guideData.find(t => t.id === topicId);

  if (!topic) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '4rem', paddingBottom: '6rem', maxWidth: '1200px' }}>
      <Link to="/learn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '2rem', transition: 'color 0.2s' }} className="hover-white">
        <ArrowLeft size={20} /> Back to Learn Hub
      </Link>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel markdown-content"
      >
        <h1 style={{ fontSize: '2.5rem', color: 'var(--accent-blue)', marginBottom: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
          {topic.title}
        </h1>
        
        <div style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', lineHeight: '1.8' }} className="markdown-body">
          <ReactMarkdown>{topic.content}</ReactMarkdown>
        </div>
      </motion.div>
      <style>{`
        .hover-white:hover { color: var(--accent-blue) !important; }
        
        .markdown-body {
          color: var(--text-secondary);
        }

        .markdown-body h3 {
          color: #FF9072; /* Warm accent color for subheadings */
          font-size: 1.6rem;
          margin: 2.5rem 0 1rem 0;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255, 144, 114, 0.05);
          padding: 0.75rem 1rem;
          border-left: 4px solid #FF9072;
          borderRadius: 0 8px 8px 0;
        }

        .markdown-body h3::before {
          content: '▸';
          color: #FF9072;
          font-size: 1.25rem;
        }

        .markdown-body ul, .markdown-body ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }

        .markdown-body li {
          margin-bottom: 0.75rem;
        }

        .markdown-body strong {
          color: var(--text-primary);
        }

        .markdown-body h2 {
          color: var(--accent-blue);
          margin: 2rem 0 1rem 0;
          font-size: 2rem;
        }
      `}</style>
    </div>
  );
};

export default TopicDetail;

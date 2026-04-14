import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { guideData } from './guideData';

const getTextFromChildren = (children) => {
  if (typeof children === 'string') {
    return children;
  }
  if (Array.isArray(children)) {
    return children.map(getTextFromChildren).join('');
  }
  if (children && typeof children === 'object' && 'props' in children) {
    return getTextFromChildren(children.props.children);
  }
  return '';
};

const isNumberedHeading = (text = '') => /^\d+\./.test(text.trim());

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
        className="glass-panel markdown-content topic-detail-shell"
      >
        <h1 style={{ fontSize: '2.5rem', color: 'var(--accent-blue)', marginBottom: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
          {topic.title}
        </h1>
        
        <div style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', lineHeight: '1.8' }} className="markdown-body">
          <ReactMarkdown
            components={{
              h2: ({ children }) => <h2 className="learn-main-section">{children}</h2>,
              h3: ({ children }) => {
                const text = getTextFromChildren(children);
                const headingClass = isNumberedHeading(text) ? 'learn-subtopic-heading' : 'learn-topic-heading';
                return <h3 className={headingClass}>{children}</h3>;
              },
              p: ({ children }) => <p className="learn-paragraph">{children}</p>,
              ul: ({ children }) => <ul className="learn-list">{children}</ul>,
              ol: ({ children }) => <ol className="learn-list learn-list-numbered">{children}</ol>,
              li: ({ children }) => <li className="learn-list-item">{children}</li>
            }}
          >
            {topic.content}
          </ReactMarkdown>
        </div>
      </motion.div>
      <style>{`
        .hover-white:hover { color: var(--accent-blue) !important; }

        .topic-detail-shell {
          font-family: 'Plus Jakarta Sans', 'Inter', 'Segoe UI', sans-serif;
        }
        
        .markdown-body {
          color: var(--text-secondary);
          letter-spacing: 0.01em;
        }

        .learn-main-section {
          color: var(--text-primary);
          font-family: 'Sora', 'Plus Jakarta Sans', 'Inter', sans-serif;
          font-size: clamp(1.45rem, 3.8vw, 1.95rem);
          margin: 2.6rem 0 1.2rem;
          border-bottom: 1px solid var(--glass-border);
          padding-bottom: 0.55rem;
        }

        .learn-topic-heading {
          color: var(--accent-blue);
          font-size: clamp(1.18rem, 3.5vw, 1.5rem);
          font-family: 'Sora', 'Plus Jakarta Sans', 'Inter', sans-serif;
          margin: 2.15rem 0 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(3, 180, 188, 0.09);
          padding: 0.75rem 1rem;
          border-left: 4px solid var(--accent-blue);
          border-radius: 0 10px 10px 0;
        }

        .learn-topic-heading::before {
          content: '▸';
          color: var(--accent-blue);
          font-size: 1.25rem;
        }

        .learn-subtopic-heading {
          color: #ff9f87;
          font-size: clamp(1.08rem, 3.2vw, 1.3rem);
          margin: 1.45rem 0 0.72rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(255, 144, 114, 0.08);
          border-left: 3px solid #ff9072;
          border-radius: 0 9px 9px 0;
          padding: 0.65rem 0.95rem;
          margin-left: 1rem;
        }

        .learn-subtopic-heading::before {
          content: '•';
          color: #ff9072;
          font-size: 1.25rem;
        }

        .learn-paragraph {
          margin: 0 0 1rem;
          color: var(--text-secondary);
          font-size: clamp(1rem, 2.8vw, 1.09rem);
          line-height: 1.85;
        }

        .learn-list {
          margin-bottom: 1.25rem;
          padding-left: 1.5rem;
          list-style: disc;
        }

        .learn-list-numbered {
          list-style: decimal;
        }

        .learn-list-item {
          margin-bottom: 0.7rem;
          color: var(--text-secondary);
        }

        .markdown-body strong {
          color: var(--text-primary);
        }

        @media (max-width: 768px) {
          .learn-subtopic-heading {
            margin-left: 0.4rem;
          }
          .learn-main-section {
            margin-top: 2.1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default TopicDetail;
